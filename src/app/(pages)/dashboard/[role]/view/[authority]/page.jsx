'use client';

import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { LoaderCircle, Search } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/store/store';

const superuserApiMap = {
    teacher: '/api/shared/views/teachers-data',
    admin: '/api/shared/views/admins-data',
    superuser: '/api/superuser/views/superusers-data',
}

const otherApiMap = {
    teacher: '/api/shared/views/teachers-data',
    admin: '/api/shared/views/admins-data',
}

export default function StudentDataTable() {
    const [pageNum, setPageNum] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [apiEndpoint, setApiEndpoint] = useState(null);
    const [ authorityData, setAuthorityData ] = useState([]);

    const { role } = useAuthStore()

    const RouteParams = useParams()
    const temp = useMemo(() => RouteParams.authority?.toLowerCase() || 'students', [RouteParams.authority]);
    const authority = useMemo(() => temp.charAt(0).toUpperCase() + temp.slice(1, temp.length - 1), [temp]);

    const params = useSearchParams();
    const router = useRouter();

    const [searchTerm, setSearchTerm] = useState(params.get('search') || '');
    const observer = useRef(null);

    // check if the authority is valid and set the API endpoint accordingly
    useEffect(() => {
        if (!authority) {
            router.replace('/not-found');
            return;
        }
        if (role === 'student') {
            router.replace('/unauthorized');
            return;
        }

        const endpoint = role === 'superuser' ? superuserApiMap[authority.toLowerCase()] : otherApiMap[authority.toLowerCase()];

        if (!endpoint) {
            router.replace('/not-found');
            return;
        }
        setApiEndpoint(endpoint);
    }, [])
    

    // Function to fetch data from the API
    const fetchData = async () => {
        if( !apiEndpoint ) return;
        setLoading(true);
        try {
            const response = await axios.get(apiEndpoint, {
                params: {
                    page: pageNum,
                    search: searchTerm,
                },
            });
            const { data, pagination } = response.data;
            setAuthorityData([...authorityData, ...data]);
            setHasMore(pagination.currentPage < pagination.totalPages);
        } catch (error) {
            setHasMore(false);
            console.error('Error fetching {authority}:', error);
        } finally {
            setLoading(false);
        }
    }

    // my custom debounce search effect that waits for 500ms before making the API call
    const debounceTimeoutRef = useRef(null);

    useEffect(() => {
        if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current);

        const urlParams = new URLSearchParams()
        if (searchTerm) {
            urlParams.set('search', searchTerm);
        } else {
            urlParams.delete('search'); // optional: remove when empty
        }

        setLoading(true); // Set loading state when search term changes
        setAuthorityData([]); // Reset {authority} data on new search

        debounceTimeoutRef.current = setTimeout(() => {
            setPageNum(1); // Reset page number on new search
            router.push(`?${urlParams.toString()}`, { scroll: false });
        }, 1500);

    }, [searchTerm])

    // stores the last record reference for infinite scroll
    // this will be used to trigger the next page fetch when the last record is visible
    const lastRecordReference = useCallback((node) => {
        if (loading || !hasMore) return; // Prevent multiple fetches

        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setPageNum((prev) => prev + 1);
            }
        })

        if (node) observer.current.observe(node);
    }, [loading, hasMore]);

    // fetch data when component mounts or pageNum changes or any filter changes
    useEffect(() => {
        fetchData();
    }, [pageNum, apiEndpoint, searchTerm]);


    return (
        <div className="min-h-screen bg-background sm:p-4 py-4">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold tracking-tight">{authority} Database</h1>
                    <p className="text-muted-foreground">Search and view authority information</p>
                </div>

                {/* Search Card */}
                <Card className="max-sm:rounded-none">
                    <CardHeader>
                        <CardTitle>Search {authority}</CardTitle>
                        <CardDescription>Find {authority} by their EmployeeId/ Name / Email</CardDescription>
                    </CardHeader>
                    <CardContent  >
                        <div>
                            <div className="relative max-w-md">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                                <Input
                                    type="text"
                                    placeholder="Search by roll number/Name....."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>

                            {searchTerm && (
                                <p className="mt-2 text-sm text-muted-foreground">
                                    Found {authorityData.length} authorit{authorityData.length !== 1 ? 'ies' : 'y'} matching "{searchTerm}"
                                </p>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Table Card */}
                <Card className="max-sm:rounded-none">
                    <CardHeader>
                        <CardTitle>{authority} Records</CardTitle>
                        <CardDescription>
                            Total {authority}: {authorityData.length} | Showing: {authorityData.length}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="max-sm:px-1">
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="font-medium">Employee Id</TableHead>
                                        <TableHead className="font-medium">Name</TableHead>
                                        <TableHead className="font-medium">Email</TableHead>
                                        <TableHead className="font-medium">Phone</TableHead>
                                        <TableHead className="font-medium">Department</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {authorityData.length > 0 ? (
                                        authorityData.map((record) => (
                                            <TableRow key={record.employee_id}>
                                                <TableCell className="font-medium">{record.employee_id}</TableCell>
                                                <TableCell>{record.name || 'N/A'}</TableCell>
                                                <TableCell>{record.email || 'N/A'}</TableCell>
                                                <TableCell>{record.phone || 'N/A'}</TableCell>
                                                <TableCell>{record.department || 'N/A'}</TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        !loading && <TableRow>
                                            <TableCell colSpan={6} className="text-center text-muted-foreground">
                                                No {authority || 'Authority'} found matching your search criteria
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                            <div ref={lastRecordReference} className='h-4 my-4 w-full flex justify-center items-center'>
                                {loading && (<LoaderCircle className="animate-spin h-6 w-6 mx-auto" />)}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}