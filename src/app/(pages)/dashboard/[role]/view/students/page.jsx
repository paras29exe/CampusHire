'use client';

import React, { useState } from 'react';
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
import { useRouter, useSearchParams } from 'next/navigation';
import { useInfiniteScroll } from '@/hooks/infiniteScrollHook';


export default function StudentDataTable() {
  const params = useSearchParams();
  const router = useRouter()

  const [course, setCourse] = useState(params.get('course') || '');
  const [branch, setBranch] = useState(params.get('branch') || '');
  const [department, setDepartment] = useState(params.get('department') || '');
  const [searchQuery, setSearchQuery] = useState(params.get('search') || '');

  const [searchTerm, setSearchTerm] = useState(params.get('search') || '');

  const { data: studentsData, isLoading, lastElementRef } = useInfiniteScroll(
    '/api/shared/views/students-data',
    searchTerm,
    setSearchQuery,
    { course, branch, department, search: searchQuery },
    [course, branch, department, searchQuery]
  )

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
                  Found {studentsData.length} student{studentsData.length !== 1 ? 's' : ''} matching "{searchTerm}"
                </p>
              )}
            </div>
            {/* from the components */}
            <FiltersComponent
              course={course}
              setCourse={setCourse}
              branch={branch}
              setBranch={setBranch}
              department={department}
              setDepartment={setDepartment}
            />
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
                      <TableRow className="cursor-default" onClick={() => router.push(`/view-user?uid=${student._id}&role=student`)} key={student.roll_number || index}>
                        <TableCell className="font-medium">{student.roll_number}</TableCell>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>{student.email}</TableCell>
                        <TableCell>{student.course}</TableCell>
                        <TableCell>{student.branch}</TableCell>
                        <TableCell>{student.batch}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    !isLoading && <TableRow>
                      <TableCell colSpan={6} className="text-center text-muted-foreground">
                        No students found matching your search criteria
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