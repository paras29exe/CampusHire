"use client"

import { Calendar, MapPin, IndianRupee, Globe, Users, UserPlus, Eye, Trash2, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { formatDate } from "@/utils/client/formatDate"
import Link from "next/link"

export default function UnassignedJobCard({ jobData }) {

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
    <Card className="w-full border-l-4 border-l-red-500 bg-red-50/30 hover:shadow-md transition-shadow duration-300">
      <CardContent className="p-4">
        <div className="flex flex-col lg:flex-row justify-between gap-6">
          {/* Left Side: Job Details */}
          <div className="flex-1 space-y-4">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-600 to-pink-600 text-white flex items-center justify-center font-bold text-lg">
                  {jobData.company.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{jobData.company.name}</h3>
                  <a
                    href={jobData.company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
                  >
                    <Globe className="h-3 w-3" />
                    Visit Website
                  </a>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="bg-red-100 text-red-800 border-red-200">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  UNASSIGNED
                </Badge>
                <Badge variant="outline">
                  <Users className="h-3 w-3 mr-1" />
                  {jobData.job_roles.length} Role{jobData.job_roles.length > 1 ? "s" : ""}
                </Badge>
                <Badge variant="destructive" className="text-xs">
                  Pending from {daysAgo} days
                </Badge>
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-600">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                <div>
                  <span className="text-gray-500">Location:</span>
                  <div className="font-medium">{jobData.job_details.job_location}</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <IndianRupee className="h-4 w-4 text-gray-400 mt-0.5" />
                <div>
                  <span className="text-gray-500">Package:</span>
                  <div className="font-medium text-green-600">{jobData.job_details.package}</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Calendar className="h-4 w-4 text-gray-400 mt-0.5" />
                <div>
                  <span className="text-gray-500">Created:</span>
                  <div className="font-medium">{formatDate(jobData.createdAt)}</div>
                </div>
              </div>
            </div>

            {/* Roles */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-1">Available Roles:</h4>
              <div className="flex flex-wrap gap-2">
                {jobData.job_roles.slice(0, 3).map((role) => (
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
              <div className="flex items-start gap-2 p-3 bg-red-100 rounded-lg border border-red-200">
                <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />
                <p className="text-sm text-red-700">
                  This job has been pending assignment for {daysAgo} days. Please assign to an admin soon.
                </p>
              </div>
            )}
          </div>

          {/* Right Side: Actions */}
          <div className="flex flex-col gap-2 lg:items-end w-full lg:w-auto">
            <Link href={`/job-description?jobId=${jobData._id}`} className="w-full lg:w-auto">
              <Button onClick={handleViewDetails} variant="outline" className="w-full lg:w-auto">
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </Button>
            </Link>
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
      </CardContent>
    </Card>

  )
}
