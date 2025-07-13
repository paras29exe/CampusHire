"use client"

import { useForm } from "react-hook-form"
import { UserPlus, ArrowLeft, Building2, Mail, Phone, User, Hash } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

const DEPARTMENTS = [
    "Computer Science",
    "Information Technology",
    "Electronics",
    "Mechanical",
    "Civil",
    "Mathematics",
    "Physics",
    "Chemistry",
    "English",
    "Management",
]

export default function AddAuthority({ onSubmit, role = "teacher" }) {
    const { register, handleSubmit, setValue, formState: { errors, isSubmitting } }
        = useForm({
            defaultValues: {
                employee_id: "",
                name: "",
                email: "",
                phone: "",
                department: "",
                role: role
            },
        })

    const roleTitle = role.charAt(0).toUpperCase() + role.slice(1)

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
            {/* Header Section */}
            <div className="border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-10">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex flex-col sm:pr-6 sm:pl-12 sm:flex-row sm:items-center sm:justify-between gap-4">

                        {/* Left Section: Back Button + Icon + Title */}
                        <div className="flex items-start sm:items-center gap-3">
                            <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                <UserPlus className="h-6 w-6" />
                            </div>
                            <div>
                                <h1 className="text-xl sm:text-2xl font-bold text-foreground">
                                    Add New {roleTitle}
                                </h1>
                                <p className="text-sm text-muted-foreground leading-tight">
                                    Create a new {role} account with complete details
                                </p>
                            </div>
                        </div>

                        {/* Right Section: Badge */}
                        <div className="sm:ml-auto">
                            <Badge variant="secondary" className="text-sm px-3 py-1 w-fit">
                                {roleTitle} Registration
                            </Badge>
                        </div>
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
                                    Personal Information
                                </CardTitle>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                                    Required fields
                                </div>
                            </div>
                            <Separator />
                        </CardHeader>

                        <CardContent className="space-y-8">
                            {/* Role Display */}
                            <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 border border-dashed border-slate-200 dark:border-slate-700">
                                <div className="flex items-center gap-3">
                                    <Building2 className="h-5 w-5 text-primary" />
                                    <div>
                                        <Label className="text-sm font-medium">Assigned Role</Label>
                                        <p className="text-lg font-semibold text-primary mt-1">{roleTitle}</p>
                                    </div>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                                {/* Basic Information */}
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label className="text-sm font-medium flex items-center gap-2">
                                                <Hash className="h-4 w-4" />
                                                Employee ID
                                                <span className="text-red-500">*</span>
                                            </Label>
                                            <Input
                                                {...register("employee_id", { required: "Employee ID is required" })}
                                                placeholder="Enter employee ID"
                                                className="h-11"
                                            />
                                            {errors.employee_id && (
                                                <p className="text-sm text-red-600 flex items-center gap-1">
                                                    {errors.employee_id.message}
                                                </p>
                                            )}
                                        </div>

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
                                                <p className="text-sm text-red-600 flex items-center gap-1">
                                                    {errors.name.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label className="text-sm font-medium flex items-center gap-2">
                                                <Mail className="h-4 w-4" />
                                                Email Address
                                                <span className="text-red-500">*</span>
                                            </Label>
                                            <Input
                                                type="email"
                                                {...register("email", {
                                                    required: "Email is required",
                                                    pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" },
                                                })}
                                                placeholder="Enter email address"
                                                className="h-11"
                                            />
                                            {errors.email && (
                                                <p className="text-sm text-red-600 flex items-center gap-1">
                                                    {errors.email.message}
                                                </p>
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
                                                <p className="text-sm text-red-600 flex items-center gap-1">
                                                    {errors.phone.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                                                <p className="text-sm text-red-600 flex items-center gap-1">
                                                    {errors.department.message}
                                                </p>
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
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex-1 h-11"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                                Adding {roleTitle}...
                                            </>
                                        ) : (
                                            <>
                                                <UserPlus className="h-4 w-4 mr-2" />
                                                Add {roleTitle}
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}