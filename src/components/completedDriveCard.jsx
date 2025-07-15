"use client"

import * as React from "react"
import { Calendar, Globe, Users, ChevronDown, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link"

// Helper to format date (assuming it exists or will be created)
const formatDate = (dateString) => {
  if (!dateString) return "N/A"
  const options = { year: "numeric", month: "short", day: "numeric" }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

export default function CompletedDriveCard({ driveData, userRole }) {
  const [isAdminsOpen, setIsAdminsOpen] = React.useState(false)

  const isSuperuser = userRole === "superuser"

  return (
    <Card className="w-full max-w-4xl mx-auto hover:shadow-md transition-shadow duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-700 rounded-lg flex items-center justify-center text-white font-bold text-lg">
              {driveData.company.name.charAt(0)}
            </div>
            <div>
              <CardTitle className="text-xl font-bold text-gray-900">{driveData.company.name}</CardTitle>
              <a
                href={driveData.company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
              >
                <Globe className="h-3 w-3" />
                Visit Website
              </a>
            </div>
          </div>
          <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200 flex items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            Completed
          </Badge>
        </div>
        <CardDescription className="mt-2 text-sm text-gray-600">
          This drive has been successfully completed.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-400" />
            <div>
              <span className="text-gray-500">Assigned On:</span>
              <div className="font-medium">{formatDate(driveData.assignedDate)}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-400" />
            <div>
              <span className="text-gray-500">Completed On:</span>
              <div className="font-medium">{formatDate(driveData.completedDate)}</div>
            </div>
          </div>
          {isSuperuser ? (
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-gray-400" />
              <div>
                <span className="text-gray-500">Total Admins:</span>
                <div className="font-medium">{driveData.assignedAdmins.length}</div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-gray-400" />
              <div>
                <span className="text-gray-500">Assigned By:</span>
                <div className="font-medium">{driveData.assignedBy?.name || "N/A"}</div>
              </div>
            </div>
          )}
        </div>

        <Collapsible open={isAdminsOpen} onOpenChange={setIsAdminsOpen} className="w-full">
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>Show Admins ({driveData.assignedAdmins.length})</span>
              </div>
              <ChevronDown className={`h-4 w-4 transition-transform ${isAdminsOpen ? "rotate-180" : ""}`} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-3 space-y-3">
            <Separator />
            <div className="flex flex-wrap gap-3">
              {driveData.assignedAdmins.map((admin) => (
                <Card key={admin.employee_id} className="p-3 flex items-center gap-3 bg-gray-50">
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900">{admin.name}</span>
                    <span className="text-xs text-gray-600">ID: {admin.employee_id}</span>
                    <span className="text-xs text-blue-600">{admin.email}</span>
                  </div>
                </Card>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-2 mt-auto p-4 pt-0">
        <Link href={`/drives/${driveData.id}`} className="w-full">
          <Button variant="outline" className="w-full bg-transparent">
            View Drive Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
