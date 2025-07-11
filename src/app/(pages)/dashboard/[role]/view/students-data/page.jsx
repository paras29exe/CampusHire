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
import FiltersComponent from '@/components/filtersComponent';
import axios from 'axios';
import { useDataStore } from '@/store/store';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';

// Sample student data
// const studentsData = [
//   { rollNo: 'CS2021001', name: 'John Doe', email: 'john.doe@example.com', course: 'B.Tech', branch: 'Computer Science', batch: '2021-2025' },
//   { rollNo: 'CS2021002', name: 'Jane Smith', email: 'jane.smith@example.com', course: 'B.Tech', branch: 'Computer Science', batch: '2021-2025' },
//   { rollNo: 'ME2021001', name: 'Mike Johnson', email: 'mike.johnson@example.com', course: 'B.Tech', branch: 'Mechanical Engineering', batch: '2021-2025' },
//   { rollNo: 'EE2021001', name: 'Sarah Wilson', email: 'sarah.wilson@example.com', course: 'B.Tech', branch: 'Electrical Engineering', batch: '2021-2025' },
//   { rollNo: 'CS2022001', name: 'David Brown', email: 'david.brown@example.com', course: 'B.Tech', branch: 'Computer Science', batch: '2022-2026' },
//   { rollNo: 'CE2021001', name: 'Lisa Davis', email: 'lisa.davis@example.com', course: 'B.Tech', branch: 'Civil Engineering', batch: '2021-2025' },
//   { rollNo: 'CS2021003', name: 'Tom Anderson', email: 'tom.anderson@example.com', course: 'B.Tech', branch: 'Computer Science', batch: '2021-2025' },
//   { rollNo: 'ME2022001', name: 'Emma Thompson', email: 'emma.thompson@example.com', course: 'B.Tech', branch: 'Mechanical Engineering', batch: '2022-2026' },
//   { rollNo: 'EE2022001', name: 'James Wilson', email: 'james.wilson@example.com', course: 'B.Tech', branch: 'Electrical Engineering', batch: '2022-2026' },
//   { rollNo: 'CS2023001', name: 'Sophie Taylor', email: 'sophie.taylor@example.com', course: 'B.Tech', branch: 'Computer Science', batch: '2023-2027' }
// ];

export default function StudentDataTable() {
  const { studentsData, setStudentsData } = useDataStore();
  const [pageNum, setPageNum] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const params = useSearchParams();
  const router = useRouter();

  const course = params.get('course') || '';
  const branch = params.get('branch') || '';
  const department = params.get('department') || '';
  const searchQuery = params.get('search') || '';

  const [searchTerm, setSearchTerm] = useState(params.get('search') || '');
  const observer = useRef(null);

  // Function to fetch data from the API
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/shared/view/view-students', {
        params: {
          page: pageNum,
          search: searchTerm,
          course,
          branch,
          department,
        },
      });
      const { data, pagination } = response.data;
      setStudentsData([...studentsData, ...data]);
      setHasMore(pagination.currentPage < pagination.totalPages);
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  }

  // my custom debounce search effect that waits for 500ms before making the API call
  const debounceTimeoutRef = useRef(null);

  useEffect(() => {
    if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current);

    const existingParams = new URLSearchParams(params.toString())
    if (searchTerm) {
      existingParams.set('search', searchTerm);
    } else {
      existingParams.delete('search'); // optional: remove when empty
    }
    
    setLoading(true); // Set loading state when search term changes
    setStudentsData([]); // Reset students data on new search
    
    debounceTimeoutRef.current = setTimeout(() => {
      setPageNum(1); // Reset page number on new search
      router.push(`?${existingParams.toString()}`, { scroll: false });
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
  }, [pageNum, course, branch, department, searchQuery]);


  return (
    <div className="min-h-screen bg-background sm:p-4 py-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Student Database</h1>
          <p className="text-muted-foreground">Search and view student information</p>
        </div>

        {/* Search Card */}
        <Card className="max-sm:rounded-none">
          <CardHeader>
            <CardTitle>Search Students</CardTitle>
            <CardDescription>Find students by their roll number or name</CardDescription>
          </CardHeader>
          <CardContent  >
            <div>
              <div className="flex">
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
                {/* <Button className="ml-2" onClick={handleSearch}> Search</Button> */}
              </div>

              {searchTerm && (
                <p className="mt-2 text-sm text-muted-foreground">
                  Found {studentsData.length} student{studentsData.length !== 1 ? 's' : ''} matching "{searchTerm}"
                </p>
              )}
            </div>
            {/* from the components */}
            <FiltersComponent loading={loading} setLoading={setLoading} />
          </CardContent>
        </Card>

        {/* Table Card */}
        <Card className="max-sm:rounded-none">
          <CardHeader>
            <CardTitle>Student Records</CardTitle>
            <CardDescription>
              Total Students: {studentsData.length} | Showing: {studentsData.length}
            </CardDescription>
          </CardHeader>
          <CardContent className="max-sm:px-1">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-medium">Roll No</TableHead>
                    <TableHead className="font-medium">Name</TableHead>
                    <TableHead className="font-medium">Email</TableHead>
                    <TableHead className="font-medium">Course</TableHead>
                    <TableHead className="font-medium">Branch</TableHead>
                    <TableHead className="font-medium">Batch</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {studentsData.length > 0 ? (
                    studentsData.map((student) => (
                      <TableRow key={student.rollno}>
                        <TableCell className="font-medium">{student.rollno}</TableCell>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>{student.email}</TableCell>
                        <TableCell>{student.course}</TableCell>
                        <TableCell>{student.branch}</TableCell>
                        <TableCell>{student.batch}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    !loading && <TableRow>
                      <TableCell colSpan={6} className="text-center text-muted-foreground">
                        No students found matching your search criteria
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