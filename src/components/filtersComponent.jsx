'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { COURSE_OPTIONS } from '@/constants/courses';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useDataStore } from '@/store/store';


export default function FiltersComponent({ setLoading, setStudentsData }) {
    const [courses, setCourses] = useState([...new Set(COURSE_OPTIONS.map(c => c.split("-")[0]))])
    const [branches, setBranches] = useState([])
    const searchParams = useSearchParams()
    const router = useRouter();


    const { watch, setValue } = useForm({
        defaultValues: {
            course: searchParams.get("course") || '', // Get initial values from search params
            branch: searchParams.get("branch") || '',
            department: searchParams.get("department") || '',
        }
    })
    const course = watch("course");
    const branch = watch("branch");
    const department = watch("department");

    function handleCourseChange(course) {
        setValue('course', course);
        setValue('branch', ''); // Reset branch when course changes
        const branches = COURSE_OPTIONS
            .filter(c => c.startsWith(course + "-")) // only match if it's like "B.Tech-XYZ"
            .map(c => c.split("-")[1])

        setBranches(() => branches); // could be [] for plain courses like BCA/MBA
    }

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());
        setLoading(true); // Set loading state when filters change
        setStudentsData([]); // Reset students data when filters change
        (course && course !== 'all') ? params.set('course', course) : params.delete('course');
        (branch && branch !== 'all') ? params.set('branch', branch) : params.delete('branch');
        (department && department !== 'all') ? params.set('department', department) : params.delete('department');

        router.push(`?${params.toString()}`);
    }, [course, branch, department]);


    return (
        <form className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            {/* Course Filter */}
            <div>
                <Label htmlFor="course">Course</Label>
                <Select value={course} onValueChange={(value) => handleCourseChange(value)}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select course" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Courses</SelectItem>
                        {
                            courses.filter(Boolean).map((course, index) => (
                                <SelectItem key={index} value={course}>
                                    {course}
                                </SelectItem>
                            ))
                        }
                    </SelectContent>
                </Select>
            </div>

            {/* Branch Filter */}
            <div>
                <Label>Branch</Label>
                <Select value={branch} onValueChange={(value) => setValue('branch', value)}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select branch" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Branches</SelectItem>
                        {
                            branches.filter(Boolean).map((branch, index) => (
                                <SelectItem key={`${branch}-${index}`} value={branch}>
                                    {branch}
                                </SelectItem>
                            ))
                        }
                    </SelectContent>
                </Select>
            </div>

            {/* Department Filter */}
            <div>
                <Label htmlFor="department">Department</Label>
                <Select value={department} onValueChange={(value) => setValue('department', value)}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Departments</SelectItem>
                        {
                            ['Computer Science', 'Mechanical Engineering', 'Electrical Engineering', 'Civil Engineering'].map((dept) => (
                                <SelectItem key={dept} value={dept}>
                                    {dept}
                                </SelectItem>
                            ))
                        }
                    </SelectContent>
                </Select>
            </div>
        </form>
    );
}