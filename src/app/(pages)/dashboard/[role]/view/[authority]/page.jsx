'use client';

import React, { useState, useMemo } from 'react';
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
import { useParams, useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/store/store';
import { useInfiniteScroll } from '@/hooks/infiniteScrollHook';

const superuserApiMap = {
    teacher: '/api/shared/views/teachers-data',
    admin: '/api/shared/views/admins-data',
    superuser: '/api/superuser/views/superusers-data',
}

const otherApiMap = {
    teacher: '/api/shared/views/teachers-data',
    admin: '/api/shared/views/admins-data',
}

export default function AuthorityDataTable() {
    const RouteParams = useParams()
    const temp = useMemo(() => RouteParams.authority?.toLowerCase() || 'students', [RouteParams.authority]);
    const authority = useMemo(() => temp.charAt(0).toUpperCase() + temp.slice(1, temp.length - 1), [temp]);

    const router = useRouter();
    const params = useSearchParams();

    const { role } = useAuthStore();
    const apiEndpoint = useMemo(() => {
        if (role === 'student') router.replace('/unauthorized');

        const endpoint = (role === 'superuser') ? superuserApiMap[authority.toLowerCase()] : otherApiMap[authority.toLowerCase()]

        if (!endpoint) router.replace('/not-found');
        return endpoint;
    }, [role, authority]);


    const [searchTerm, setSearchTerm] = useState(params.get('search') || '');
    const [searchQuery, setSearchQuery] = useState(params.get('search') || '');

    const { data: authorityData, isLoading, hasMore, lastElementRef } = useInfiniteScroll(
        apiEndpoint,
        searchTerm,
        setSearchQuery,
        { search: searchQuery },
        [apiEndpoint, searchQuery, authority]
    )

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
                        <CardDescription>Find {authority} by their Employee-Id/Name/Email</CardDescription>
                    </CardHeader>
                    <CardContent  >
                        <div>
                            <div className="relative max-w-md">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                                <Input
                                    type="text"
                                    placeholder="Search by Name/Email/Employee-id....."
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
                                            <TableRow
                                                key={record.employee_id}
                                                className="cursor-default"
                                                onClick={() => router.push(`/view-user?uid=${record._id}&role=${record.role}`, {scroll: true})}
                                            >
                                                <TableCell className="font-medium">{record.employee_id}</TableCell>
                                                <TableCell>{record.name || 'N/A'}</TableCell>
                                                <TableCell>{record.email || 'N/A'}</TableCell>
                                                <TableCell>{record.phone || 'N/A'}</TableCell>
                                                <TableCell>{record.department || 'N/A'}</TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        !isLoading && <TableRow>
                                            <TableCell colSpan={6} className="text-center text-muted-foreground">
                                                No {authority || 'Authority'} found matching your search criteria
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                            {
                                <div ref={lastElementRef} className="text-center p-4">
                                    {isLoading && <LoaderCircle className="inline-block animate-spin h-6 w-6" />}
                                </div>
                            }
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}