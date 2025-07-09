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

const COURSES = ["B.Tech", "M.Tech", "MCA", "BCA", "B.Sc", "M.Sc", "MBA"]
const BRANCHES = ["CSE", "IT", "ECE", "EEE", "MECH", "CIVIL", "AIDS", "DS", "CYBER"]
const DEPARTMENTS = ["Computer Science", "Information Technology", "Electronics", "Mechanical", "Civil"]
const BATCHES = ["2024", "2025", "2026", "2027", "2028"]

export default function AddStudent({onSubmit}) {
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm()

  const watchCourse = watch("course")


  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5" />
              Add New Student
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Full Name *</Label>
                  <Input {...register("name", { required: "Name is required" })} />
                  {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label>Roll Number *</Label>
                  <Input {...register("rollno", { required: "Roll number is required" })} />
                  {errors.rollno && <p className="text-sm text-red-600">{errors.rollno.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label>Password *</Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      {...register("password", {
                        required: "Password is required",
                        minLength: { value: 6, message: "Password must be at least 6 characters" },
                      })}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Personal Email *</Label>
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
                  <Label>College Email *</Label>
                  <Input
                    type="email"
                    {...register("college_email", {
                      required: "College email is required",
                      pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
                    })}
                  />
                  {errors.college_email && <p className="text-sm text-red-600">{errors.college_email.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label>Phone *</Label>
                  <Input {...register("phone", { required: "Phone is required" })} />
                  {errors.phone && <p className="text-sm text-red-600">{errors.phone.message}</p>}
                </div>
              </div>

              {/* Academic Information */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label>Course *</Label>
                  <Select onValueChange={(value) => setValue("course", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select course" />
                    </SelectTrigger>
                    <SelectContent>
                      {COURSES.map((course) => (
                        <SelectItem key={course} value={course}>
                          {course}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.course && <p className="text-sm text-red-600">{errors.course.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label>Branch</Label>
                  <Select onValueChange={(value) => setValue("branch", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select branch" />
                    </SelectTrigger>
                    <SelectContent>
                      {BRANCHES.map((branch) => (
                        <SelectItem key={branch} value={branch}>
                          {branch}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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

                <div className="space-y-2">
                  <Label>Batch *</Label>
                  <Select onValueChange={(value) => setValue("batch", value)}>
                    <SelectTrigger>
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
                  {errors.batch && <p className="text-sm text-red-600">{errors.batch.message}</p>}
                </div>
              </div>

              {/* Academic Performance */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label>10th Percentage *</Label>
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
                  />
                  {errors.tenth_percentage && <p className="text-sm text-red-600">{errors.tenth_percentage.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label>12th Percentage *</Label>
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
                  />
                  {errors.twelfth_percentage && (
                    <p className="text-sm text-red-600">{errors.twelfth_percentage.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Graduation Percentage</Label>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    max="100"
                    {...register("graduation_percentage")}
                    placeholder="If applicable"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Backlogs</Label>
                  <Input
                    type="number"
                    min="0"
                    {...register("backlogs", { min: { value: 0, message: "Invalid number" } })}
                    defaultValue="0"
                  />
                  {errors.backlogs && <p className="text-sm text-red-600">{errors.backlogs.message}</p>}
                </div>
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Adding Student..." : "Add Student"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
