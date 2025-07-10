"use client"

import { useForm } from "react-hook-form"
import { UserPlus, Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

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

export default function AddTeacher({ onSubmit, role }) {

    const { register, handleSubmit, setValue, formState: { errors, isSubmitting } }
        = useForm({
            defaultValues: {
                employee_id: "",
                name: "",
                email: "",
                phone: "",
                department: "",
            },
        })

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-2xl mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <UserPlus className="h-5 w-5" />
                            Add New Teacher
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Employee ID *</Label>
                                    <Input {...register("employee_id", { required: "Employee ID is required" })} />
                                    {errors.employee_id && <p className="text-sm text-red-600">{errors.employee_id.message}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label>Full Name *</Label>
                                    <Input {...register("name", { required: "Name is required" })} />
                                    {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label>Email *</Label>
                                    <Input
                                        type="email"
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
                                        })}
                                    />
                                    {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label>Phone *</Label>
                                    <Input {...register("phone", { required: "Phone is required" })} />
                                    {errors.phone && <p className="text-sm text-red-600">{errors.phone.message}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label>Department *</Label>
                                    <Select onValueChange={(value) => setValue("department", value)}>
                                        <SelectTrigger>
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
                                    {errors.department && <p className="text-sm text-red-600">{errors.department.message}</p>}
                                </div>

                            </div>

                            <Button type="submit" disabled={isSubmitting} className="w-full">
                                {isSubmitting ? "Adding Teacher..." : "Add Teacher"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
