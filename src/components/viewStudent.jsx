"use client"

import { Mail, Phone, GraduationCap, Calendar, Award, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function ViewStudent({ student, loading }) {

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!student) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Student not found</p>
      </div>
    )
  }

  const getInitials = (name) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header Card */}
        <Card>
          <CardHeader className="text-center">
            <Avatar className="w-20 h-20 mx-auto mb-4">
              <AvatarFallback className="text-2xl bg-blue-600 text-white">{getInitials(student.name)}</AvatarFallback>
            </Avatar>
            <CardTitle className="text-2xl">{student.name}</CardTitle>
            <div className="flex items-center justify-center gap-2 mt-2">
              <Badge>{student.role}</Badge>
              <Badge variant="outline">{student.roll_number}</Badge>
              {student.backlogs > 0 && (
                <Badge variant="destructive" className="flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  {student.backlogs} Backlog{student.backlogs > 1 ? "s" : ""}
                </Badge>
              )}
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Mail className="h-4 w-4 text-gray-600" />
                <div>
                  <p className="text-sm text-gray-600">Personal Email</p>
                  <p className="font-medium">{student.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Mail className="h-4 w-4 text-gray-600" />
                <div>
                  <p className="text-sm text-gray-600">College Email</p>
                  <p className="font-medium">{student.college_email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Phone className="h-4 w-4 text-gray-600" />
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-medium">{student.phone}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Academic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Academic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Course</p>
                  <p className="font-medium">{student.course}</p>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Branch</p>
                  <p className="font-medium">{student.branch || "N/A"}</p>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Department</p>
                  <p className="font-medium">{student.department}</p>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Batch</p>
                  <p className="font-medium">{student.batch}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Calendar className="h-4 w-4 text-gray-600" />
                <div>
                  <p className="text-sm text-gray-600">Joined</p>
                  <p className="font-medium">
                    {new Date(student.createdAt).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Academic Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Academic Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-600">10th Grade</p>
                <p className="text-2xl font-bold text-blue-700">{student.tenth_percentage}%</p>
              </div>

              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm text-green-600">12th Grade</p>
                <p className="text-2xl font-bold text-green-700">{student.twelfth_percentage}%</p>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <p className="text-sm text-purple-600">Graduation</p>
                <p className="text-2xl font-bold text-purple-700">
                  {student.graduation_percentage ? `${student.graduation_percentage}%` : "N/A"}
                </p>
              </div>

              <div
                className={`p-4 rounded-lg border ${
                  student.backlogs > 0 ? "bg-red-50 border-red-200" : "bg-green-50 border-green-200"
                }`}
              >
                <p className={`text-sm ${student.backlogs > 0 ? "text-red-600" : "text-green-600"}`}>Backlogs</p>
                <p className={`text-2xl font-bold ${student.backlogs > 0 ? "text-red-700" : "text-green-700"}`}>
                  {student.backlogs}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
