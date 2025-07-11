"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Lock, Eye, EyeOff, Save, X, Mail, GraduationCap, Award, AlertTriangle, User, Phone, Calendar, Building, BookOpen, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"

const FormField = ({ label, icon: Icon, value, className = "" }) => (
  <div className="space-y-1">
    <Label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
      {Icon && <Icon className="h-4 w-4" />}
      {label}
    </Label>
    <Input disabled value={value} className={`bg-muted/50 border-border focus-visible:ring-ring ${className}`} />
  </div>
)

const PasswordField = ({ label, show, onToggle, register, errors, name, ...props }) => (
  <div className="space-y-2">
    <Label className="text-sm font-medium text-foreground">{label}</Label>
    <div className="relative">
      <Input
        type={show ? "text" : "password"}
        {...register(name, props.validation)}
        placeholder={props.placeholder}
        className="pr-10 border-border focus-visible:ring-ring"
      />
      <Button type="button" variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-3 hover:bg-transparent" onClick={onToggle}>
        {show ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
      </Button>
    </div>
    {errors[name] && <p className="text-sm text-destructive">{errors[name].message}</p>}
  </div>
)

export default function StudentProfilePage({ userData , onSubmit, handleCancel, isChangingPassword, setIsChangingPassword }) {
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    defaultValues: { oldPassword: "", newPassword: "", confirmPassword: "" }
  })

  const getInitials = (name) => name.split(" ").map(n => n[0]).join("").toUpperCase()

  const handlePasswordSubmit = (data) => {
    setTimeout(() => {
      toast.success("Password changed successfully!")
      setIsChangingPassword(false)
      reset()
    }, 1000)
  }

  const handlePasswordCancel = () => {
    setIsChangingPassword(false)
    reset()
  }

  if (!userData) return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
    </div>
  )

  const contactFields = [
    { label: "Personal Email", icon: Mail, value: userData.email },
    { label: "College Email", icon: Building, value: userData.college_email },
    { label: "Phone Number", icon: Phone, value: userData.phone }
  ]

  const academicFields = [
    { label: "Course", icon: BookOpen, value: userData.course },
    { label: "Branch", value: userData.branch },
    { label: "Department", icon: Building, value: userData.department },
    { label: "Batch", icon: Calendar, value: userData.batch }
  ]

  const performanceFields = [
    { label: "Class 10th", icon: TrendingUp, value: `${userData.tenth_percentage}%` },
    { label: "Class 12th", icon: TrendingUp, value: `${userData.twelfth_percentage}%` },
    { label: "Graduation", icon: GraduationCap, value: userData.graduation_percentage ? `${userData.graduation_percentage}%` : "N/A" },
    { label: "Backlogs", icon: AlertTriangle, value: userData.backlogs, className: userData.backlogs > 0 ? 'text-destructive' : 'text-muted-foreground' }
  ]

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Profile Header */}
        <Card className="overflow-hidden border-border shadow-sm">
          <div className="bg-gradient-to-r from-primary/5 to-primary/10 px-6 py-8">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Avatar className="w-24 h-24 ring-4 ring-background shadow-lg">
                <AvatarFallback className="text-2xl bg-primary text-primary-foreground font-semibold">
                  {getInitials(userData.name)}
                </AvatarFallback>
              </Avatar>
              <div className="text-center sm:text-left space-y-2">
                <h1 className="text-3xl font-bold text-foreground">{userData.name}</h1>
                <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                  <Badge variant="default"><User className="h-3 w-3 mr-1" />{userData.role}</Badge>
                  <Badge variant="outline">{userData.rollno}</Badge>
                  {userData.backlogs > 0 && (
                    <Badge variant="destructive"><AlertTriangle className="h-3 w-3 mr-1" />{userData.backlogs} Backlog{userData.backlogs > 1 ? "s" : ""}</Badge>
                  )}
                </div>
                <p className="text-muted-foreground text-sm">{userData.course} • {userData.department} • Batch {userData.batch}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Contact & Academic Info */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <Card className="border-border shadow-sm">
            <CardHeader><CardTitle className="flex items-center gap-2"><Mail className="h-5 w-5 text-primary" />Contact Information</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {contactFields.map((field, i) => <FormField key={i} {...field} />)}
            </CardContent>
          </Card>

          <Card className="border-border shadow-sm">
            <CardHeader><CardTitle className="flex items-center gap-2"><GraduationCap className="h-5 w-5 text-primary" />Academic Details</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {
                academicFields.map((field, i) => (
                  <FormField key={i} {...field} />
                ))
              }
            </CardContent>
          </Card>
        </div>

        {/* Academic Performance */}
        <Card className="border-border shadow-sm">
          <CardHeader><CardTitle className="flex items-center gap-2"><Award className="h-5 w-5 text-primary" />Academic Performance</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {
              performanceFields.map((field, i) => (
                <FormField key={i} {...field} className={`text-center font-medium ${field.className || ''}`} />
              ))
            }
          </CardContent>
        </Card>

        {/* Password Change */}
        <Card className="border-border shadow-sm">
          <CardHeader><CardTitle className="flex items-center gap-2"><Lock className="h-5 w-5 text-primary" />Security Settings</CardTitle></CardHeader>
          <CardContent>
            {!isChangingPassword ? (
              <div className="text-center py-8">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Lock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Change Password</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">Keep your account secure by changing your password regularly.</p>
                <Button onClick={() => setIsChangingPassword(true)} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Lock className="h-4 w-4 mr-2" />Change Password
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="space-y-4">
                  <PasswordField
                    label="Current Password *"
                    show={showOldPassword}
                    onToggle={() => setShowOldPassword(!showOldPassword)}
                    register={register}
                    errors={errors}
                    name="oldPassword"
                    placeholder="Enter your current password"
                    validation={{ required: "Current password is required" }}
                  />
                  <PasswordField
                    label="New Password *"
                    show={showNewPassword}
                    onToggle={() => setShowNewPassword(!showNewPassword)}
                    register={register}
                    errors={errors}
                    name="newPassword"
                    placeholder="Enter your new password"
                    validation={{ required: "New password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } }}
                  />
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-foreground">Confirm New Password *</Label>
                    <Input
                      type="password"
                      {...register("confirmPassword", {
                        required: "Please confirm your new password",
                        validate: (value, formValues) => value === formValues.newPassword || "Passwords do not match"
                      })}
                      placeholder="Confirm your new password"
                      className="border-border focus-visible:ring-ring"
                    />
                    {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>}
                  </div>
                </div>
                <Separator className="bg-border" />
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    disabled={isSubmitting}
                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                    onClick={handleSubmit(handlePasswordSubmit)}
                  >
                    <Save className="h-4 w-4 mr-2" />{isSubmitting ? "Changing Password..." : "Change Password"}
                  </Button>
                  <Button variant="outline" onClick={handlePasswordCancel} className="flex-1 border-border hover:bg-accent hover:text-accent-foreground">
                    <X className="h-4 w-4 mr-2" />Cancel
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