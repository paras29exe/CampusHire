"use client"

import { Calendar, MapPin, IndianRupee, Globe, Users, UserPlus, Eye, Trash2, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { formatDate } from "@/utils/client/formatDate"

export default function UnassignedJobCard({jobData}) {

  const handleViewDetails = () => {
    // window.location.href = `/superuser/jobs/${jobData.company.name.toLowerCase().replace(/\s+/g, "-")}`
  }

  const handleAssignToAdmin = () => {
    // window.location.href = `/superuser/jobs/assign/${jobData.company.name.toLowerCase().replace(/\s+/g, "-")}`
  }

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this unassigned job?")) {
      // Delete logic here
      console.log("Deleting unassigned job...")
    }
  }

  const getDaysAgo = (dateString) => {
    const now = new Date()
    const created = new Date(dateString)
    const diffTime = Math.abs(now - created)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const daysAgo = getDaysAgo(jobData.createdAt)

  return (
    <Card className="w-full hover:shadow-md transition-shadow duration-300 border-l-4 border-l-red-500 bg-red-50/30">
      <CardContent className="p-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Left Section - Company and Job Info */}
          <div className="flex-1 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-pink-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                  {jobData.company.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{jobData.company.name}</h3>
                  <a
                    href={jobData.company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
                  >
                    <Globe className="h-3 w-3" />
                    Visit Website
                  </a>
                </div>
              </div>
              <div className="flex gap-2">
                <Badge variant="secondary" className="bg-red-100 text-red-800 border-red-200 flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  UNASSIGNED
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {jobData.job_roles.length} Role{jobData.job_roles.length > 1 ? "s" : ""}
                </Badge>
                {daysAgo > 3 && (
                  <Badge variant="destructive" className="text-xs">
                    {daysAgo} days pending
                  </Badge>
                )}
              </div>
            </div>

            {/* Job Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4 text-gray-400" />
                <div>
                  <span className="text-gray-500">Location:</span>
                  <div className="font-medium">{jobData.job_details.location}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <IndianRupee className="h-4 w-4 text-gray-400" />
                <div>
                  <span className="text-gray-500">Package:</span>
                  <div className="font-medium text-green-600">{jobData.job_details.package}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4 text-gray-400" />
                <div>
                  <span className="text-gray-500">Created:</span>
                  <div className="font-medium">{formatDate(jobData.createdAt)}</div>
                </div>
              </div>
            </div>

            {/* Available Roles Preview */}
            <div className="space-y-1">
              <h4 className="text-sm font-medium text-gray-900">Available Roles:</h4>
              <div className="flex flex-wrap gap-2">
                {jobData.job_roles.map((role, index) => (
                  <Badge key={role._id} variant="outline" className="text-xs">
                    {role.role}
                  </Badge>
                ))}
                {jobData.job_roles.length > 3 && (
                  <Badge variant="outline" className="text-xs text-gray-500">
                    +{jobData.job_roles.length - 3} more
                  </Badge>
                )}
              </div>
            </div>

            {/* Urgency Indicator */}
            {daysAgo > 3 && (
              <div className="flex items-center gap-2 p-2 bg-red-100 rounded-lg border border-red-200">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <p className="text-sm text-red-700">
                  This job has been pending assignment for {daysAgo} days. Please assign to an admin soon.
                </p>
              </div>
            )}
          </div>

          {/* Right Section - Action Buttons */}
          <div className="flex-shrink-0">
            <Separator orientation="vertical" className="hidden lg:block h-16 mx-4" />
            <div className="flex flex-col gap-1.5 w-full lg:w-auto">
              <Button onClick={handleViewDetails} variant="outline" className="w-full lg:w-auto bg-transparent">
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </Button>
              <Button onClick={handleAssignToAdmin} className="w-full lg:w-auto bg-green-600 hover:bg-green-700">
                <UserPlus className="h-4 w-4 mr-2" />
                Assign to Admin
              </Button>
              <Button onClick={handleDelete} variant="destructive" className="w-full lg:w-auto">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
