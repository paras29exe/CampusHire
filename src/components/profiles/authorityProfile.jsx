"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Lock, Eye, EyeOff, Save, X, User, Mail, Phone, Calendar, Building, Hash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { formatDate } from "@/utils/client/formatDate"

export default function AuthorityProfilePage({ userData, onSubmit, handleCancel, isChangingPassword, setIsChangingPassword }) {
  const [showPasswords, setShowPasswords] = useState({ old: false, new: false })

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: { oldPassword: "", newPassword: "", confirmPassword: "" }
  })

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  const getInitials = (name) => name?.split(" ").map((n) => n[0]).join("").toUpperCase()

  const profileFields = [
    { label: "Employee ID", value: userData.employee_id, icon: Hash },
    { label: "Department", value: userData.department, icon: Building },
    { label: "Email", value: userData.email, icon: Mail },
    { label: "Phone", value: userData.phone, icon: Phone },
    { label: "Member Since", value: formatDate(userData.createdAt), icon: Calendar, span: true }
  ]

  const passwordFields = [
    {
      key: "oldPassword",
      label: "Current Password",
      placeholder: "Enter current password",
      validation: { required: "Current password is required" },
      showKey: "old"
    },
    {
      key: "newPassword",
      label: "New Password",
      placeholder: "Enter new password",
      validation: {
        required: "New password is required",
        minLength: { value: 6, message: "Password must be at least 6 characters" }
      },
      showKey: "new"
    },
    {
      key: "confirmPassword",
      label: "Confirm Password",
      placeholder: "Confirm new password",
      validation: { required: "Please confirm your new password" },
      showKey: null
    }
  ]

  return (
    <div className=" p-4">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Enhanced Profile Card */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <div className="relative">
              <Avatar className="w-24 h-24 mx-auto mb-4 ring-4 ring-blue-100">
                <AvatarFallback className="text-5xl bg-blue-400 text-white">
                  {getInitials(userData.name)}
                </AvatarFallback>
              </Avatar>

              <Badge className="px-10 py-2 text-lg bg-accent text-foreground shadow-md">
                {userData.role.toUpperCase()}
              </Badge>
            </div>
            <CardTitle className="sm:text-3xl text-xl font-bold text-foreground underline">{userData.name}</CardTitle>

          </CardHeader>

          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            {profileFields.map(({ label, value, icon: Icon, span }) => (
              <div key={label} className={`group ${span ? 'md:col-span-2' : ''}`}>
                <Label className="text-sm font-medium text-gray-600 mb-2 flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  {label}
                </Label>
                <Input
                  value={value}
                  disabled
                  className="bg-gray-50 border-gray-200 group-hover:bg-gray-100 transition-colors"
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Enhanced Password Change Card */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl text-gray-800">
              <Lock className="h-5 w-5" />
              Security Settings
            </CardTitle>
          </CardHeader>

          <CardContent>
            {!isChangingPassword ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="h-8 w-8 text-blue-600" />
                </div>
                <p className="text-gray-600 mb-6">Keep your account secure by changing your password regularly</p>
                <Button
                  onClick={() => setIsChangingPassword(true)}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md"
                >
                  <Lock className="h-4 w-4 mr-2" />
                  Change Password
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid gap-6">
                  {passwordFields.map(({ key, label, placeholder, validation, showKey }) => (
                    <div key={key} className="relative">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        {label} <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        type={showKey && showPasswords[showKey] ? "text" : "password"}
                        {...register(key, validation)}
                        placeholder={placeholder}
                        className="pr-12"
                      />
                      {showKey && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-8 px-3 hover:bg-transparent"
                          onClick={() => setShowPasswords(prev => ({ ...prev, [showKey]: !prev[showKey] }))}
                        >
                          {showPasswords[showKey] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      )}
                      {errors[key] && (
                        <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                          <X className="h-3 w-3" />
                          {errors[key].message}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                <Separator className="my-6" />

                <div className="flex gap-3">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-md"
                    onClick={handleSubmit(onSubmit)}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {isSubmitting ? "Changing..." : "Change Password"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                    className="hover:bg-gray-50"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}