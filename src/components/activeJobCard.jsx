"use client"

import { Calendar, MapPin, Globe, Users, IndianRupee, Group, ListChecks } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { formatDate } from "@/utils/client/formatDate"

function ActiveJobCard({ jobData }) {
  const handleApplyNow = () => {
    // Redirect to application page
    window.location.href = `/apply/${jobData.companyName.toLowerCase().replace(/\s+/g, "-")}`
  }

   jobData = {
    ...jobData,
    job_details: {
      ...jobData.job_details,
      package: "Not Disclosed",
    }
  }

  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex flex-wrap items-start justify-between">
          <div className="space-y-1 flex-1 min-w-0">
            <CardTitle className="text-xl text-wrap font-bold text-gray-900 truncate">
              {jobData.company.name}
            </CardTitle>
            <Button variant="link" className="flex p-0! m-0! h-fit items-center gap-1 text-sm text-blue-600">
              <Globe className="h-4 w-4 flex-shrink-0" />
              {jobData.company.website}
            </Button>
          </div>
          <Badge variant="secondary" className="flex bg-green-600 text-white items-center gap-1 ml-2 flex-shrink-0">
            <Users className="h-3 w-3" />
            {jobData.job_roles?.length || 0} roles
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 flex-1">
        <div className="grid grid-cols-1 gap-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0" />
            <span className="truncate">{jobData.job_details?.job_location}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-black">
            <IndianRupee className="h-4 w-4 flex-shrink-0" />
            <span className="font-medium">{jobData.job_details?.package}</span>
          </div>

          <div className="flex items-center gap-2 text-sm font-bold text-red-600">
            <Calendar className="h-4 w-4 flex-shrink-0" />
            <span>Apply by: {formatDate(jobData.last_date_to_apply)}</span>
          </div>

          <div className="flex items-center gap-2 text-sm ">
            <Users className="h-4 w-4 flex-shrink-0" />
            <span>Batch:</span>
            {
              jobData.eligibility_criteria.batch.map((batch, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {batch}
                </Badge>
              ))
            }
          </div>
          <div className="flex items-center gap-2 text-sm ">
            <ListChecks className="h-4 w-4 flex-shrink-0" />
            <span>Min. CGPA: {jobData.eligibility_criteria.cgpa}  </span>
          </div>

        </div>

        <Separator />

        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-900">Available Roles:</h4>
          <div className="flex flex-wrap gap-1">
            {jobData.job_roles.map((role, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {role.role}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-4 mt-auto">
        
        <Button onClick={handleApplyNow} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
          Apply Now
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ActiveJobCard