"use client"

import { Mail, GraduationCap, Award, AlertTriangle, User, Phone, Calendar, Building, BookOpen, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import ChangePassword from "../changePassword"

const FormField = ({ label, icon: Icon, value, className = "" }) => (
  <div className="space-y-1">
    <Label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
      {Icon && <Icon className="h-4 w-4" />}
      {label}
    </Label>
    <Input disabled value={value} className={`bg-muted/50 border-border focus-visible:ring-ring ${className}`} />
  </div>
)

export default function StudentProfilePage({ userData }) {

  const getInitials = (name) => name.split(" ").map(n => n[0]).join("").toUpperCase()


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
                <AvatarFallback className="text-2xl bg-blue-700 text-primary-foreground font-semibold">
                  {getInitials(userData.name)}
                </AvatarFallback>
              </Avatar>
              <div className="text-center sm:text-left space-y-2">
                <h1 className="text-3xl font-bold text-foreground">{userData.name}</h1>
                <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                  <Badge variant="default"><User className="h-3 w-3 mr-1" />{userData.role.toUpperCase()}</Badge>
                  <Badge variant="outline">{userData.roll_number}</Badge>
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

        {/* Change Password Section */}
        <ChangePassword />
      </div>
    </div>
  )
}