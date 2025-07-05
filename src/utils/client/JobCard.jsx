"use client"

import { Calendar, MapPin, Globe, Users, IndianRupee } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

function JobCard({ jobData }) {
  const handleApplyNow = () => {
    // Redirect to application page
    window.location.href = `/apply/${jobData.companyName.toLowerCase().replace(/\s+/g, "-")}`
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex flex-wrap items-start justify-between">
          <div className="space-y-1 flex-1 min-w-0">
            <CardTitle className="text-xl text-wrap font-bold text-gray-900 truncate">
              {jobData.companyName}
            </CardTitle>
            <div className="flex items-center gap-1 text-sm text-blue-600">
              <Globe className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">{jobData.website}</span>
            </div>
          </div>
          <Badge variant="secondary" className="flex items-center gap-1 ml-2 flex-shrink-0">
            <Users className="h-3 w-3" />
            {jobData.numberOfRoles} roles
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 flex-1">
        <div className="grid grid-cols-1 gap-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0" />
            <span className="truncate">{jobData.location}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <IndianRupee className="h-4 w-4 text-gray-400 flex-shrink-0" />
            <span className="font-medium">{jobData.package}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-red-600">
            <Calendar className="h-4 w-4 flex-shrink-0" />
            <span>Apply by: {formatDate(jobData.lastDateToApply)}</span>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-900">Available Roles:</h4>
          <div className="flex flex-wrap gap-1">
            {jobData.roles.map((role, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {role}
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

export default function ResponsiveJobCards() {
  // Sample job data - replace with your actual data
  const jobsData = [
    {
      companyName: "TechCorp Solutions",
      website: "www.techcorp.com",
      numberOfRoles: 5,
      location: "Bangalore, Karnataka",
      package: "₹8-12 LPA",
      lastDateToApply: "2024-02-15",
      roles: ["Software Engineer", "Frontend Developer", "Backend Developer", "DevOps Engineer", "QA Engineer"],
    },
    {
      companyName: "InnovateTech",
      website: "www.innovatetech.com",
      numberOfRoles: 3,
      location: "Mumbai, Maharashtra",
      package: "₹10-15 LPA",
      lastDateToApply: "2024-02-20",
      roles: ["Full Stack Developer", "UI/UX Designer", "Product Manager"],
    },
    {
      companyName: "DataSoft Systems",
      website: "www.datasoft.com",
      numberOfRoles: 4,
      location: "Hyderabad, Telangana",
      package: "₹6-10 LPA",
      lastDateToApply: "2024-02-18",
      roles: ["Data Analyst", "Machine Learning Engineer", "Python Developer", "DevOps Engineer"],
    },
    {
      companyName: "CloudTech Industries",
      website: "www.cloudtech.com",
      numberOfRoles: 2,
      location: "Pune, Maharashtra",
      package: "₹12-18 LPA",
      lastDateToApply: "2024-02-25",
      roles: ["Cloud Architect", "Senior Backend Developer"],
    },
    {
      companyName: "NextGen Solutions",
      website: "www.nextgen.com",
      numberOfRoles: 6,
      location: "Chennai, Tamil Nadu",
      package: "₹7-11 LPA",
      lastDateToApply: "2024-02-22",
      roles: ["React Developer", "Node.js Developer", "QA Engineer", "DevOps Engineer", "Scrum Master", "Business Analyst"],
    },
  ]

  return (
    <div className=" w-full p-4">
      <div className=" mx-auto">
        <div className="mb-8 mx-auto w-fit">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Job Opportunities</h1>
          <p className="text-gray-600">Discover your next career opportunity</p>
        </div>
        
        {/* Responsive grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {jobsData.map((job, index) => (
            <JobCard key={index} jobData={job} />
          ))}
        </div>
      </div>
    </div>
  )
}