"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Eye, EyeOff, GraduationCap, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/store"

const ROLES = [
  { value: "student", label: "Student" },
  { value: "teacher", label: "Teacher" },
  { value: "admin", label: "Admin" },
  { value: "superuser", label: "Superuser" },
]

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const { setUserData, setRole } = useAuthStore()
  const [loading, setLoading] = useState(true)

  const [loginSelecedRole, setLoginSelecedRole] = useState("")

  const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      identifier: "",
      password: "",
      role: "",
    },
  })

  const onSubmit = async (data) => {
    if (!data.role) {
      toast.error("Please select your role")
      return
    }

    setLoading(true)
    try {
      const response = await axios.post(`/api/auth/${data.role}/login`, {
        identifier: data.identifier,
        password: data.password
      })
      toast.success("Login successful!")
      setUserData(response.data.user);
      setRole(response.data.role);
      router.replace(`/dashboard/${data.role}/drives/active-drives`)
    } catch (error) {
      console.error("Login error:", error)
      toast.error("Login failed. Please check your credentials and try again.")
      setLoading(false)
    }
  }

  const getPlaceholderText = () => {
    switch (loginSelecedRole) {
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

  useEffect(() => {
    const autoLogin = async () => {
      setLoading(true)
      try {
        const response = await axios.get('/api/auth/auto-login');
        setUserData(response.data.user);
        setRole(response.data.role);
        router.replace(`/dashboard/${response.data.role}/drives/active-drives`);
      } catch (error) {
        console.error('Error during auto-login:', error.response?.data?.message || error.message);
        // Optionally handle the error, e.g., redirect to login page
        setLoading(false)
      }
    };

    autoLogin();
  }, [])

  if (loading) return (
    <div className="min-h-screen flex flex-col gap-y-3 items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-3 border-blue-600"></div>
      <p>Please wait....</p>
    </div>
  )

  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 overflow-hidden rounded-xl flex items-center justify-center mx-auto mb-4">
            <img src="/logo.png" alt="logo" className="w-full h-full" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">CampusHire</h1>
          <p className="text-gray-600 ">Sign in to your account</p>
        </div>
        <p className="text-sm text-center font-medium text-gray-600 my-2">
          For Testing the product, You can contact on <span><a href="https://linkedin.com/in/paras29exe" target="_blank" className="text-blue-600 mr-1 hover:underline">LinkedIn</a></span>or 
          <span>
          <a
          target="_blank"
            href="mailto:paras.webdev404@gmail.com?subject=Demo%20credentials%20request%20for%20CampusHire&body=Hi%20Paras,%0A%0AI%20came%20across%20your%20project%20CampusHire%20and%20I%E2%80%99m%20really%20impressed%20with%20its%20features%20and%20workflow.%0A%0AI%20would%20like%20to%20request%20demo%20credentials%20to%20explore%20the%20platform%20further.%0A%0APlease%20let%20me%20know%20if%20you%20need%20any%20additional%20information%20from%20my%20side.%0A%0ALooking%20forward%20to%20your%20response.%0A%0AThanks%20%26%20Regards,%0A[Your%20Name]%0A[Your%20Organization%20/%20College]" className="text-blue-600 hover:underline ml-1">Email</a></span> me
          for demo credentials.
        </p>

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
                <Select required onValueChange={(value) => {setLoginSelecedRole(value), setValue('role', value)}} value={loginSelecedRole} defaultValue="">
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
                  {loginSelecedRole === "student"
                    ? "Roll Number / Email"
                    :  "Employee ID / Email"}
                  *
                </Label>
                <input
                  {...register("identifier", { required: "This field is required" })}
                  placeholder={getPlaceholderText()}
                  className="bg-transparent p-2 text-sm outline outline-border rounded-sm w-full focus-within:outline-blue-500 focus-within:outline-2"
                />
                {errors.identifier && <p className="text-sm text-red-600">{errors.identifier.message}</p>}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label>Password *</Label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password", { required: "Password is required" })}
                    placeholder="Enter your password"
                    className="bg-transparent p-2 pr-10 text-sm outline outline-border rounded-sm w-full focus-within:outline-blue-500 focus-within:outline-2"
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
