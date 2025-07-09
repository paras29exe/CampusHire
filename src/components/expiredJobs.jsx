"use client"

import { Calendar, Clock, MapPin, IndianRupee, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/utils/client/formatDate"

function ExpiredDriveCard() {
  const expiredData = {
    companyName: "Amazon India",
    role: "Software Development Engineer",
    package: "₹15-20 LPA",
    location: "Mumbai, Maharashtra",
    expiredOn: "2024-01-20",
  }

  const handleViewDescription = () => {
    window.location.href = `/expired-drives/${expiredData.companyName.toLowerCase().replace(/\s+/g, "-")}`
  }

  return (
    <Card className="w-full max-w-md relative overflow-hidden opacity-75 hover:opacity-90 transition-opacity">
      {/* Diagonal Ribbon */}
      <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden">
        <div className="absolute top-3 right-[-32px] bg-red-500 text-white text-xs font-bold py-1 px-8 rotate-45 shadow-md">
          EXPIRED
        </div>
      </div>

      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-gray-700">{expiredData.companyName}</CardTitle>
        <p className="text-gray-600">{expiredData.role}</p>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <IndianRupee className="h-4 w-4" />
            <span>{expiredData.package}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <MapPin className="h-4 w-4" />
            <span>{expiredData.location}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-red-500">
            <Calendar className="h-4 w-4" />
            <span>Expired on: {formatDate(expiredData.expiredOn)}</span>
          </div>
        </div>

        <Badge variant="destructive" className="w-fit">
          Applications Closed
        </Badge>

        <Button
          onClick={handleViewDescription}
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


export default function ExpiredDrivesDemo() {
  const expiredDrives = [
    {
      companyName: "Amazon India",
      role: "Software Development Engineer",
      package: "₹15-20 LPA",
      location: "Mumbai, Maharashtra",
      expiredOn: "2024-01-20",
    },
    {
      companyName: "Flipkart",
      role: "Product Manager",
      package: "₹12-18 LPA",
      location: "Bangalore, Karnataka",
      expiredOn: "2024-01-15",
    },
    {
      companyName: "Paytm",
      role: "Data Analyst",
      package: "₹8-12 LPA",
      location: "Noida, UP",
      expiredOn: "2024-01-10",
    },
  ]

  return (
    <div className="min-h-screen">
      <div className=" mx-auto space-y-6">
        <Card className="border-none bg-transparent rounded-none shadow-none p-0">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Clock className="h-6 w-6 text-red-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-red-700">Expired Drives</CardTitle>
            <p className="text-red-600">These opportunities have closed for applications</p>
          </CardHeader>
          <CardContent className={"max-sm:p-0"}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {expiredDrives.map((drive, index) => (
                <ExpiredDriveCard key={index} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
