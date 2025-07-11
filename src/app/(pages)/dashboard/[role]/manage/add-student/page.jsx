"use client"

import { useForm } from "react-hook-form"
import { UserPlus, ArrowLeft, GraduationCap, Mail, Phone, User, Hash, Building2, Calendar, Trophy, BookOpen } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { COURSE_OPTIONS } from "@/constants/courses"

const COURSES = [...new Set(COURSE_OPTIONS.map(c => c.split("-")[0]))]
const DEPARTMENTS = ["Computer Applications", "Information Technology", "Electronics", "Mechanical", "Civil"]
const BATCHES = ["2024", "2025", "2026", "2027", "2028", "2029", "2030"]

export default function AddStudent() {
    const [branches, setBranches] = useState([])

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isSubmitting },
        reset,
    } = useForm()

    const handleCourseChange = (value) => {
        setValue("course", value)
        // Reset branch, department, and batch when course changes
        setValue("branch", "")
        setValue("department", "")
        setValue("batch", "")

        const branches = COURSE_OPTIONS
            .filter(c => c.startsWith(value + "-")) // only match if it's like "B.Tech-XYZ"
            .map(c => c.split("-")[1])

        setBranches(branches);
    }

    const onSubmit = async (data) => { }

    return (
        <div className="">
            {/* Header Section */}
            <div className="border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-10">
                <div className="mx-auto px-4 py-6 ">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="h-10 w-10">
                                <ArrowLeft className="h-5 w-5" />
                            </Button>
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400">
                                    <GraduationCap className="h-6 w-6" />
                                </div>
                                <div>
                                    <h1 className=" text-lg sm:text-2xl font-bold text-foreground">
                                        Add New Student
                                    </h1>
                                    <p className="text-xs sm:text-sm text-muted-foreground">
                                        Register a new student with complete academic details
                                    </p>
                                </div>
                            </div>
                        </div>
                        <Badge variant="secondary" className="text-sm max-md:hidden px-3 py-1">
                            Student Registration
                        </Badge>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-6xl mx-auto">
                    <Card className="shadow-lg border-0 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm">
                        <CardHeader className="space-y-4 pb-8">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-xl font-semibold">
                                    Student Information
                                </CardTitle>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                                    Required fields
                                </div>
                            </div>
                            <Separator />
                        </CardHeader>

                        <CardContent className="space-y-8">
                            <div className="space-y-8">
                                {/* Basic Information Section */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-2 text-lg font-semibold text-foreground">
                                        <User className="h-5 w-5 text-blue-600" />
                                        Personal Details
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        <div className="space-y-2">
                                            <Label className="text-sm font-medium flex items-center gap-2">
                                                <User className="h-4 w-4" />
                                                Full Name
                                                <span className="text-red-500">*</span>
                                            </Label>
                                            <Input
                                                {...register("name", { required: "Name is required" })}
                                                placeholder="Enter full name"
                                                className="h-11"
                                            />
                                            {errors.name && (
                                                <p className="text-sm text-red-600">{errors.name.message}</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label className="text-sm font-medium flex items-center gap-2">
                                                <Hash className="h-4 w-4" />
                                                Roll Number
                                                <span className="text-red-500">*</span>
                                            </Label>
                                            <Input
                                                {...register("rollno", { required: "Roll number is required" })}
                                                placeholder="Enter roll number"
                                                className="h-11"
                                            />
                                            {errors.rollno && (
                                                <p className="text-sm text-red-600">{errors.rollno.message}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <Separator />

                                {/* Contact Information Section */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-2 text-lg font-semibold text-foreground">
                                        <Mail className="h-5 w-5 text-green-600" />
                                        Contact Information
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        <div className="space-y-2">
                                            <Label className="text-sm font-medium flex items-center gap-2">
                                                <Mail className="h-4 w-4" />
                                                Personal Email
                                                <span className="text-red-500">*</span>
                                            </Label>
                                            <Input
                                                type="email"
                                                {...register("email", {
                                                    required: "Email is required",
                                                    pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
                                                })}
                                                placeholder="Enter personal email"
                                                className="h-11"
                                            />
                                            {errors.email && (
                                                <p className="text-sm text-red-600">{errors.email.message}</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label className="text-sm font-medium flex items-center gap-2">
                                                <Building2 className="h-4 w-4" />
                                                College Email
                                                <span className="text-red-500">*</span>
                                            </Label>
                                            <Input
                                                type="email"
                                                {...register("college_email", {
                                                    required: "College email is required",
                                                    pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
                                                })}
                                                placeholder="Enter college email"
                                                className="h-11"
                                            />
                                            {errors.college_email && (
                                                <p className="text-sm text-red-600">{errors.college_email.message}</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label className="text-sm font-medium flex items-center gap-2">
                                                <Phone className="h-4 w-4" />
                                                Phone Number
                                                <span className="text-red-500">*</span>
                                            </Label>
                                            <Input
                                                {...register("phone", { required: "Phone is required" })}
                                                placeholder="Enter phone number"
                                                className="h-11"
                                            />
                                            {errors.phone && (
                                                <p className="text-sm text-red-600">{errors.phone.message}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <Separator />

                                {/* Academic Information Section */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-2 text-lg font-semibold text-foreground">
                                        <BookOpen className="h-5 w-5 text-purple-600" />
                                        Academic Information
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                        <div className="space-y-2">
                                            <Label className="text-sm font-medium flex items-center gap-2">
                                                <GraduationCap className="h-4 w-4" />
                                                Course
                                                <span className="text-red-500">*</span>
                                            </Label>
                                            <Select onValueChange={(value) => handleCourseChange(value)}>
                                                <SelectTrigger className="h-11">
                                                    <SelectValue placeholder="Select course" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {COURSES.filter(Boolean).map((course) => (
                                                        <SelectItem key={course} value={course}>
                                                            {course}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {errors.course && (
                                                <p className="text-sm text-red-600">{errors.course.message}</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label className="text-sm font-medium flex items-center gap-2">
                                                <BookOpen className="h-4 w-4" />
                                                Branch
                                            </Label>
                                            <Select onValueChange={(value) => setValue("branch", value)}>
                                                <SelectTrigger className="h-11">
                                                    <SelectValue placeholder="Select branch" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {branches.filter(Boolean).map((branch) => (
                                                        <SelectItem key={branch} value={branch}>
                                                            {branch}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-2">
                                            <Label className="text-sm font-medium flex items-center gap-2">
                                                <Building2 className="h-4 w-4" />
                                                Department
                                                <span className="text-red-500">*</span>
                                            </Label>
                                            <Select onValueChange={(value) => setValue("department", value)}>
                                                <SelectTrigger className="h-11">
                                                    <SelectValue placeholder="Select department" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {DEPARTMENTS.map((dept) => (
                                                        <SelectItem key={dept} value={dept}>
                                                            {dept}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {errors.department && (
                                                <p className="text-sm text-red-600">{errors.department.message}</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label className="text-sm font-medium flex items-center gap-2">
                                                <Calendar className="h-4 w-4" />
                                                Batch
                                                <span className="text-red-500">*</span>
                                            </Label>
                                            <Select onValueChange={(value) => setValue("batch", value)}>
                                                <SelectTrigger className="h-11">
                                                    <SelectValue placeholder="Select batch" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {BATCHES.map((batch) => (
                                                        <SelectItem key={batch} value={batch}>
                                                            {batch}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {errors.batch && (
                                                <p className="text-sm text-red-600">{errors.batch.message}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <Separator />

                                {/* Academic Performance Section */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-2 text-lg font-semibold text-foreground">
                                        <Trophy className="h-5 w-5 text-orange-600" />
                                        Academic Performance
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                        <div className="space-y-2">
                                            <Label className="text-sm font-medium flex items-center gap-2">
                                                <Trophy className="h-4 w-4" />
                                                10th Percentage
                                                <span className="text-red-500">*</span>
                                            </Label>
                                            <Input
                                                type="number"
                                                step="0.01"
                                                min="0"
                                                max="100"
                                                {...register("tenth_percentage", {
                                                    required: "10th percentage is required",
                                                    min: { value: 0, message: "Invalid percentage" },
                                                    max: { value: 100, message: "Invalid percentage" },
                                                })}
                                                placeholder="Enter 10th percentage"
                                                className="h-11"
                                            />
                                            {errors.tenth_percentage && (
                                                <p className="text-sm text-red-600">{errors.tenth_percentage.message}</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label className="text-sm font-medium flex items-center gap-2">
                                                <Trophy className="h-4 w-4" />
                                                12th Percentage
                                                <span className="text-red-500">*</span>
                                            </Label>
                                            <Input
                                                type="number"
                                                step="0.01"
                                                min="0"
                                                max="100"
                                                {...register("twelfth_percentage", {
                                                    required: "12th percentage is required",
                                                    min: { value: 0, message: "Invalid percentage" },
                                                    max: { value: 100, message: "Invalid percentage" },
                                                })}
                                                placeholder="Enter 12th percentage"
                                                className="h-11"
                                            />
                                            {errors.twelfth_percentage && (
                                                <p className="text-sm text-red-600">{errors.twelfth_percentage.message}</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label className="text-sm font-medium flex items-center gap-2">
                                                <GraduationCap className="h-4 w-4" />
                                                Graduation Percentage
                                            </Label>
                                            <Input
                                                type="number"
                                                step="0.01"
                                                min="0"
                                                max="100"
                                                {...register("graduation_percentage")}
                                                placeholder="If applicable"
                                                className="h-11"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label className="text-sm font-medium flex items-center gap-2">
                                                <Hash className="h-4 w-4" />
                                                Backlogs
                                            </Label>
                                            <Input
                                                type="number"
                                                min="0"
                                                {...register("backlogs", { min: { value: 0, message: "Invalid number" } })}
                                                defaultValue="0"
                                                placeholder="Number of backlogs"
                                                className="h-11"
                                            />
                                            {errors.backlogs && (
                                                <p className="text-sm text-red-600">{errors.backlogs.message}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <Separator />

                                {/* Submit Button */}
                                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="flex-1 h-11"
                                        onClick={() => reset()}
                                    >
                                        Reset Form
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex-1 h-11"
                                        onClick={handleSubmit(onSubmit)}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                                Adding Student...
                                            </>
                                        ) : (
                                            <>
                                                <UserPlus className="h-4 w-4 mr-2" />
                                                Add Student
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}