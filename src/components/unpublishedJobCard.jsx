"use client"

import { Calendar, MapPin, IndianRupee, Users, Eye, Edit, ChevronDown, ExternalLink, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { formatDate } from "@/utils/client/formatDate"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function UnpublishedJobCard({ jobData, userData }) {
  const [isAdminsOpen, setIsAdminsOpen] = useState(false)
  const router = useRouter();

  const handlePublish = () => {
    router.push(`/dashboard/admin/modify-job?jobId=${jobData._id}`);
  }

  const handleManageAdmins = () => {
    router.push(`/dashboard/superuser/assignments/assign-to-admin?jobId=${jobData._id}`);
  }

  // Mock assigned admins data - replace with actual data from jobData.assigned_to


  return (
    <Card className="w-full hover:shadow-md transition-shadow outline-2 duration-300 border-l-4 border-l-orange-500 bg-orange-50/50 ">
      <CardContent className="p-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Left Section - Company and Job Info */}
          <div className="flex-1 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                  {jobData.company.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{jobData.company.name}</h3>
                  <Button onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    window.open(jobData.company.website, '_blank');
                  }} variant="link" className="flex p-0! m-0! h-fit items-center gap-1 text-sm text-blue-600">
                    <ExternalLink className="h-4 w-4 flex-shrink-0" />
                    Visit Website
                    {/* icon */}
                  </Button>
                </div>
              </div>
              <div className="flex gap-2">
                <Badge variant="secondary" className="bg-orange-100 text-orange-800 border-orange-200">
                  UNPUBLISHED
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {jobData.job_roles.length} Role{jobData.job_roles.length > 1 ? "s" : ""}
                </Badge>
              </div>
            </div>

            {/* Job Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4 text-gray-400" />
                <div>
                  <span className="text-gray-500">Location:</span>
                  <div className="font-medium">{jobData.job_details.job_location}</div>
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

            {/* Assigned Admins Collapsible Section */}
            <Collapsible open={isAdminsOpen} onOpenChange={setIsAdminsOpen}>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className=" bg-background justify-between p-2 h-auto">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span className="text-sm font-medium">Show Assigned Admins</span>
                    <Badge variant="secondary" className="ml-1">
                      {jobData.assigned_to?.length}
                    </Badge>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${isAdminsOpen ? "rotate-180" : ""}`}
                  />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-2 pt-2">
                <div className="text-xs text-gray-600 mb-2">Any assigned admin can publish this job</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {jobData.assigned_to?.map((admin) => (
                    <Card key={admin._id} className="p-3 bg-white/50">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">
                            {admin.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-gray-900 truncate">{admin.name}</div>
                          <div className="text-xs text-gray-500">{admin.employee_id}</div>
                          <div className="text-xs text-gray-600 truncate">{admin.email}</div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>

          {/* Right Section - Action Buttons */}
          <div className="flex-shrink-0">
            <Separator orientation="vertical" className="hidden lg:block h-16 mx-4" />
            <div className="flex flex-col gap-1.5 w-full lg:w-auto">
              <Link href={`/job-description?jobId=${jobData._id}`} className="w-full lg:w-auto">
                <Button onClick={() => router.push(`job-description/?jobId=${jobData._id}`)} variant="outline" className="w-full lg:w-auto bg-background">
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
              </Link>
              {userData.role === 'admin' && jobData.assigned_to.some((item) => userData._id == item._id) && (
                <Button onClick={handlePublish} className="w-full cursor-pointer lg:w-auto bg-blue-600 hover:bg-blue-700">
                  <Edit className="h-4 w-4 mr-2" />
                  Publish
                </Button>
              )}
              {
                userData.role === 'superuser' && (
                  <>
                  <Button onClick={handleManageAdmins} className="w-full cursor-pointer lg:w-auto bg-blue-600 hover:bg-blue-700">
                    <Users className="h-4 w-4 mr-2" />
                    Manage Admins
                  </Button>
                  <Button onClick={handleNotify} className="w-full cursor-pointer lg:w-auto bg-blue-600 hover:bg-blue-700">
                    <Mail className="h-4 w-4 mr-2" />
                    Notify Admins
                  </Button>
                  </>
                )
              }
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
