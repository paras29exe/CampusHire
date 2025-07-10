"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Lock, Eye, EyeOff, Save, X, Mail, GraduationCap, Award, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"

const mockStudent = {
  name: "Rahul Sharma",
  rollno: "21CSE001",
  email: "rahul.sharma@gmail.com",
  college_email: "21cse001@college.edu",
  phone: "+91 9876543210",
  course: "B.Tech",
  branch: "CSE",
  department: "Computer Science",
  batch: "2025",
  backlogs: 1,
  tenth_percentage: 85.5,
  twelfth_percentage: 78.2,
  graduation_percentage: null,
  role: "userData",
  createdAt: "2021-08-15T10:30:00Z",
}

export default function StudentProfilePage({userData, onSubmit, handleCancel, isChangingPassword, setIsChangingPassword}) {
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { oldPassword: "", newPassword: "", confirmPassword: "" },
  })

  const getInitials = (name) => name.split(" ").map((n) => n[0]).join("").toUpperCase()


  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Profile Card */}
        <Card>
          <CardHeader className="text-center">
            <Avatar className="w-20 h-20 mx-auto mb-4">
              <AvatarFallback className="text-2xl bg-blue-600 text-white">
                {getInitials(userData.name)}
              </AvatarFallback>
            </Avatar>
            <CardTitle className="text-2xl">{userData.name}</CardTitle>
            <div className="flex justify-center gap-2 mt-2">
              <Badge>{userData.role}</Badge>
              <Badge variant="outline">{userData.rollno}</Badge>
              {userData.backlogs > 0 && (
                <Badge variant="destructive" className="flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  {userData.backlogs} Backlog{userData.backlogs > 1 ? "s" : ""}
                </Badge>
              )}
            </div>
          </CardHeader>
        </Card>

        {/* Contact & Academic Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Mail className="h-5 w-5" /> Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input disabled value={userData.email} />
              <Input disabled value={userData.college_email} />
              <Input disabled value={userData.phone} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><GraduationCap className="h-5 w-5" /> Academic Info</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <Input disabled value={userData.course} />
              <Input disabled value={userData.branch} />
              <Input disabled value={userData.department} />
              <Input disabled value={userData.batch} />
            </CardContent>
          </Card>
        </div>

        {/* Academic Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Award className="h-5 w-5" /> Performance</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Input disabled value={`${userData.tenth_percentage}%`} />
            <Input disabled value={`${userData.twelfth_percentage}%`} />
            <Input disabled value={userData.graduation_percentage ? `${userData.graduation_percentage}%` : "N/A"} />
            <Input disabled value={userData.backlogs} />
          </CardContent>
        </Card>

        {/* Change Password */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Lock className="h-5 w-5" /> Change Password</CardTitle>
          </CardHeader>
          <CardContent>
            {!isChangingPassword ? (
              <div className="text-center py-4">
                <p className="text-gray-600 mb-4">Keep your account secure by changing your password regularly</p>
                <Button onClick={() => setIsChangingPassword(true)}>
                  <Lock className="h-4 w-4 mr-2" /> Change Password
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Old Password */}
                <div className="relative">
                  <Label>Current Password *</Label>
                  <Input
                    type={showOldPassword ? "text" : "password"}
                    {...register("oldPassword", { required: "Required" })}
                    placeholder="Current password"
                  />
                  <Button type="button" variant="ghost" size="sm" className="absolute right-0 top-6 px-3"
                    onClick={() => setShowOldPassword(!showOldPassword)}>
                    {showOldPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  {errors.oldPassword && <p className="text-sm text-red-600">{errors.oldPassword.message}</p>}
                </div>

                {/* New Password */}
                <div className="relative">
                  <Label>New Password *</Label>
                  <Input
                    type={showNewPassword ? "text" : "password"}
                    {...register("newPassword", {
                      required: "Required", minLength: { value: 6, message: "Min 6 characters" },
                    })}
                    placeholder="New password"
                  />
                  <Button type="button" variant="ghost" size="sm" className="absolute right-0 top-6 px-3"
                    onClick={() => setShowNewPassword(!showNewPassword)}>
                    {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  {errors.newPassword && <p className="text-sm text-red-600">{errors.newPassword.message}</p>}
                </div>

                {/* Confirm Password */}
                <div>
                  <Label>Confirm Password *</Label>
                  <Input
                    type="password"
                    {...register("confirmPassword", { required: "Required" })}
                    placeholder="Confirm password"
                  />
                  {errors.confirmPassword && <p className="text-sm text-red-600">{errors.confirmPassword.message}</p>}
                </div>

                <Separator />

                <div className="flex gap-2">
                  <Button type="submit" disabled={isSubmitting} className="flex-1">
                    <Save className="h-4 w-4 mr-2" /> {isSubmitting ? "Changing..." : "Change Password"}
                  </Button>
                  <Button type="button" variant="outline" onClick={handleCancel}>
                    <X className="h-4 w-4 mr-2" /> Cancel
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
