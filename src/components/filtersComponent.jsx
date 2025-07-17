'use client';

import { COURSE_OPTIONS } from '@/constants/courses';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';


export default function FiltersComponent({ course, setCourse, branch, setBranch, department, setDepartment }) {
    const [courses, setCourses] = useState([...new Set(COURSE_OPTIONS.map(c => c.split("-")[0]))])
    const [branches, setBranches] = useState([])

    function handleCourseChange(c) {
        
        setCourse(c);
        setBranch(''); // reset branch when course changes
        setDepartment(''); // reset department when course changes
        const branches = COURSE_OPTIONS
            .filter(item => item.startsWith(c + "-")) // only match if it's like "B.Tech-XYZ"
            .map(item => item.split("-")[1])

        setBranches(branches); // could be [] for plain courses like BCA/MBA
    }


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
                <Select value={branch} onValueChange={(value) =>  value !== 'all' ? setBranch(value) : setBranch('')}>
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
                <Select value={department} onValueChange={(value) => value !== 'all' ? setDepartment(value) : setDepartment('')}>
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