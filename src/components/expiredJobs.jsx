"use client"

import { Calendar, MapPin, IndianRupee, ExternalLink, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/utils/client/formatDate"
import { useRouter } from "next/navigation"

export default function ExpiredDriveCard({ jobData }) {
  const router = useRouter();
  return (
    <Card onClick={() => router.push(`/job-description?jobId=${jobData._id}`)} className="w-full max-w-md relative overflow-hidden opacity-75 hover:opacity-90 transition-opacity">
      {/* Diagonal Ribbon */}
      <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden">
        <div className="absolute top-3 right-[-32px] bg-red-500 text-white text-xs font-bold py-1 px-8 rotate-45 shadow-md">
          EXPIRED
        </div>
      </div>

      <CardHeader className="pb-3 flex flex-row justify-between">
        <div className="flex flex-col">
          <CardTitle className="text-lg text-gray-700">{jobData.company.name}</CardTitle>
          <p className="text-gray-600">{jobData.company.website}</p>
        </div>
        <Badge className="bg-red-500 text-white text-xs font-semibold mt-2">
          <Users className="h-4 w-4 mr-1" />
          {jobData.total_roles} Roles
        </Badge>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <IndianRupee className="h-4 w-4" />
            <span>{jobData.job_details.package}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <MapPin className="h-4 w-4" />
            <span>{jobData.job_details.job_location}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-red-500">
            <Calendar className="h-4 w-4" />
            <span>Expired on: {formatDate(jobData.last_date_to_apply)}</span>
          </div>
        </div>

        <Badge variant="destructive" className="w-fit">
          Applications Closed
        </Badge>

        <Button
          variant="outline"
          className="w-full text-gray-600 border-gray-300 bg-transparent"
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          See Full Description
        </Button>
      </CardContent>
    </Card>
  )
}
