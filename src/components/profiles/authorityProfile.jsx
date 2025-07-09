"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Lock, Eye, EyeOff, Save, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"


export default function AuthorityProfilePage({ userData, onSubmit, handleCancel }) {
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })


  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  const getInitials = (name) => name.split(" ").map((n) => n[0]).join("").toUpperCase()

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto space-y-6">

        {/* Profile Card */}
        <Card>
          <CardHeader className="text-center">
            <Avatar className="w-20 h-20 mx-auto mb-4">
              <AvatarFallback className="text-2xl bg-blue-600 text-white">
                {getInitials(userData.name)}
              </AvatarFallback>
            </Avatar>
            <CardTitle className="text-2xl">{userData.name}</CardTitle>
            <Badge className="w-fit mx-auto">{userData.role}</Badge>
          </CardHeader>

          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm text-gray-600">Employee ID</Label>
              <Input value={userData.employee_id} disabled />
            </div>
            <div>
              <Label className="text-sm text-gray-600">Department</Label>
              <Input value={userData.department} disabled />
            </div>
            <div>
              <Label className="text-sm text-gray-600">Email</Label>
              <Input value={userData.email} disabled />
            </div>
            <div>
              <Label className="text-sm text-gray-600">Phone</Label>
              <Input value={userData.phone} disabled />
            </div>
            <div className="md:col-span-2">
              <Label className="text-sm text-gray-600">Member Since</Label>
              <Input
                value={new Date(userData.createdAt).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                disabled
              />
            </div>
          </CardContent>
        </Card>

        {/* Change Password */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Change Password
            </CardTitle>
          </CardHeader>

          <CardContent>
            {!isChangingPassword ? (
              <div className="text-center py-4">
                <p className="text-gray-600 mb-4">Keep your account secure by changing your password regularly</p>
                <Button onClick={() => setIsChangingPassword(true)}>
                  <Lock className="h-4 w-4 mr-2" />
                  Change Password
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                {/* Old Password */}
                <div className="relative">
                  <Label>Current Password *</Label>
                  <Input
                    type={showOldPassword ? "text" : "password"}
                    {...register("oldPassword", { required: "Current password is required" })}
                    placeholder="Enter current password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-6 px-3"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                  >
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
                      required: "New password is required",
                      minLength: { value: 6, message: "Password must be at least 6 characters" },
                    })}
                    placeholder="Enter new password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-6 px-3"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  {errors.newPassword && <p className="text-sm text-red-600">{errors.newPassword.message}</p>}
                </div>

                {/* Confirm Password */}
                <div>
                  <Label>Confirm Password *</Label>
                  <Input
                    type="password"
                    {...register("confirmPassword", { required: "Please confirm your new password" })}
                    placeholder="Confirm new password"
                  />
                  {errors.confirmPassword && <p className="text-sm text-red-600">{errors.confirmPassword.message}</p>}
                </div>

                <Separator />

                <div className="flex gap-2">
                  <Button type="submit" disabled={isSubmitting} className="flex-1">
                    <Save className="h-4 w-4 mr-2" />
                    {isSubmitting ? "Changing..." : "Change Password"}
                  </Button>
                  <Button type="button" variant="outline" onClick={handleCancel}>
                    <X className="h-4 w-4 mr-2" />
                    Cancel
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
