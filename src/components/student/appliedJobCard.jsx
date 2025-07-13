"use client"

import { Calendar, MapPin, IndianRupee, Monitor, Users, Clock, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { formatDate } from "@/utils/client/formatDate"
import Link from "next/link"

export default function AppliedJobCard({ jobData }) {
  const handleViewDescription = () => {
    // Redirect to full job description page
    window.location.href = `/applied-jobs/${jobData.companyName.toLowerCase().replace(/\s+/g, "-")}`
  }

  const getDriveTypeIcon = (type) => {
    return type === "online" ? <Monitor className="h-3 w-3 sm:h-4 sm:w-4" /> : <Users className="h-3 w-3 sm:h-4 sm:w-4" />
  }

  return (
    <Card className="w-full py-0.5 hover:shadow-md transition-shadow duration-300 ">
      <CardContent className="p-4 sm:p-6 relative">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Left Section - Company and Role Info */}
          <div className="flex-1 space-y-6">
            <div>
              <Card className="flex flex-row items-center p-0 border-none outline-none shadow-none gap-4">
                <CardTitle className="text-base sm:text-xl max-sm:max-w-1/2 break-words! hyphens-auto font-bold text-gray-900">{jobData.companyName}</CardTitle>
                <Badge className={`w-fit flex shrink text-wrap whitespace-break-spaces text-center text-xs p-1 bg-orange-600`}>
                  Applied on : {formatDate(jobData.appliedOn)}
                </Badge>
              </Card>
              <h3 className="text-sm sm:text-lg font-semibold text-gray-700 ">Applied for: {jobData.roleApplied}</h3>
            </div>

            {/* Job Details Grid */}
            <div className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mt-3 sm:mt-4">
              <div className="flex *:text-black *:font-bold items-center gap-2 text-xs sm:text-sm text-gray-700">
                <Calendar className="h-3 w-3 sm:h-4 sm:w-4 " />
                <div>
                  <span >Applied:</span>
                  <div className="font-medium">{formatDate(jobData.appliedOn)}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
                <Clock className="h-3 w-3 sm:h-4 sm:w-4 " />
                <div>
                  <span className="">Next Round:</span>
                  <div className="font-medium text-orange-600">{jobData.nextRound || "Will Update Soon"}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
                <IndianRupee className="h-3 w-3 sm:h-4 sm:w-4 " />
                <div>
                  <span className="">Package:</span>
                  <div className="font-medium text-green-600">{jobData.package}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
                <MapPin className="h-3 w-3 sm:h-4 sm:w-4 " />
                <div>
                  <span className="">Location:</span>
                  <div className="font-medium">{jobData.location}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
                {getDriveTypeIcon(jobData.driveType)}
                <div>
                  <span className="">Drive Type:</span>
                  <div className="font-medium capitalize">
                    {jobData.driveType || "Will Update Soon"}
                    <Badge variant="outline" className="ml-2 text-xs">
                      {jobData.driveType}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - CTA Button */}
          <div className="flex-shrink-0">
            <Separator orientation="vertical" className="hidden lg:block h-24 mx-4" />
            <Link href={`/job-description?jobId=${jobData._id}`} className="w-full">
              <Button
                onClick={handleViewDescription}
                className="w-full whitespace-break-spaces lg:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 text-sm"
              >
                <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                View Description
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function AppliedJobsDemo() {
  const appliedJobs = [
    {
      companyName: "Microsoft India",
      roleApplied: "Software Development Engineer",
      appliedOn: "2024-01-10",
      nextRound: "Technical Interview",
      package: "₹15-20 LPA",
      location: "Hyderabad, Telangana",
      driveType: "online",
      status: "in-progress",
    },
    {
      companyName: "Google",
      roleApplied: "Frontend Developer",
      appliedOn: "2024-01-08",
      nextRound: "HR Round",
      package: "₹18-25 LPA",
      location: "Bangalore, Karnataka",
      driveType: "offline",
      status: "selected",
    },
    {
      companyName: "Amazon",
      roleApplied: "Data Scientist",
      appliedOn: "2024-01-05",
      nextRound: "Final Round",
      package: "₹12-18 LPA",
      location: "Mumbai, Maharashtra",
      driveType: "online",
      status: "in-progress",
    },
  ]

}