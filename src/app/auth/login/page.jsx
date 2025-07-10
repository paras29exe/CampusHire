"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Eye, EyeOff, GraduationCap, LogIn, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import axios from "axios"
import { useRouter } from "next/navigation"

const ROLES = [
  { value: "student", label: "Student" },
  { value: "teacher", label: "Teacher" },
  { value: "admin", label: "Admin" },
  { value: "superuser", label: "Superuser" },
]

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      identifier: "",
      password: "",
      role: "student",
    },
  })

  const selectedRole = watch("role")

  const onSubmit = async (data) => {
    if (!data.role) {
      toast.error("Please select your role")
      return
    }

    try {
      const response = await axios.post(`/api/auth/${data.role}/login`, {
        identifier: data.identifier,
        password: data.password
      })
      toast.success("Login successful!")
      router.replace(`/dashboard/${data.role}`)
    } catch (error) {
      console.error("Login error:", error)
      toast.error("Login failed. Please check your credentials and try again.")
    }
  }

  const getPlaceholderText = () => {
    switch (selectedRole) {
      case "student":
        return "Enter your roll number or email"
      case "teacher":
        return "Enter your employee ID or email"
      case "admin":
      case "superuser":
        return "Enter your username or email"
      default:
        return "Enter your username/email/ID"
    }
  }

  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">CampusHire</h1>
          <p className="text-gray-600 mt-2">Sign in to your account</p>
        </div>

        {/* Login Card */}
        <Card className="shadow-sm border-1">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
              <LogIn className="h-5 w-5" />
              Login
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Role Selection */}
              <div className="space-y-2">
                <Label>Select Role *</Label>
                <Select onValueChange={(value) => setValue("role", value)}>
                  <SelectTrigger className="bg-transparent">
                    <SelectValue placeholder="Choose your role" />
                  </SelectTrigger>
                  <SelectContent>
                    {ROLES.map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-2 h-2 rounded-full ${role.value === "student"
                                ? "bg-blue-500"
                                : role.value === "teacher"
                                  ? "bg-green-500"
                                  : role.value === "admin"
                                    ? "bg-orange-500"
                                    : "bg-purple-500"
                              }`}
                          />
                          {role.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.role && <p className="text-sm text-red-600">{errors.role.message}</p>}
              </div>

              {/* Username/Email/ID Field */}
              <div className="space-y-2">
                <Label>
                  {selectedRole === "student"
                    ? "Roll Number / Email"
                    : selectedRole === "teacher"
                      ? "Employee ID / Email"
                      : "Username / Email"}
                  *
                </Label>
                <Input
                  {...register("identifier", { required: "This field is required" })}
                  placeholder={getPlaceholderText()}
                  className="bg-transparent"
                />
                {errors.identifier && <p className="text-sm text-red-600">{errors.identifier.message}</p>}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label>Password *</Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    {...register("password", { required: "Password is required" })}
                    placeholder="Enter your password"
                    className="bg-transparent pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                  </Button>
                </div>
                {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
              </div>

              {/* Login Button */}
              <Button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 hover:bg-blue-700 mt-6">
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Signing in...
                  </>
                ) : (
                  <>
                    <LogIn className="h-4 w-4 mr-2" />
                    Sign In
                  </>
                )}
              </Button>
            </form>

            {/* Footer */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account? <span className="text-gray-400">Contact your administrator</span>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Role Info */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">Select your role to access the appropriate dashboard and features</p>
        </div>
      </div>
    </div>
  )
}
