"use client"

import { Mail, Phone, Calendar, Building, Hash } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/utils/client/formatDate"
import ChangePassword from "../changePassword"

export default function AuthorityProfilePage({ userData }) {
  
  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }
  
  const profileFields = [
    { label: "Employee ID", value: userData.employee_id, icon: Hash },
    { label: "Department", value: userData.department || "N/A", icon: Building },
    { label: "Email", value: userData.email, icon: Mail },
    { label: "Phone", value: userData.phone, icon: Phone },
    { label: "Member Since", value: formatDate(userData.createdAt), icon: Calendar, span: true }
  ]

  const getInitials = (name) => name?.split(" ").map((n) => n[0]).join("").toUpperCase()

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

        <ChangePassword />
      </div>
    </div>
  )
}