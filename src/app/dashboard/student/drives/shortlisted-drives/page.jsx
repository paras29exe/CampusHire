'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import axios from "axios"
import { useEffect, useState } from "react"
import ShortlistedDriveCard from "@/components/student/shortlistedJobCard"
import { Trophy } from "lucide-react"

function page() {
  const [shortlistedDrives, setShortlistedDrives] = useState([])

  useEffect(() => {
    const fetchShortlistedDrives = async () => {
      try {
        const response = await axios.get('/api/student/jobs/shortlisted-jobs')
        setShortlistedDrives(response.data.data)
      } catch (error) {
        console.error("Error fetching shortlisted drives:", error.response?.data?.message || error.message)
      }
    }
    fetchShortlistedDrives()
  }, [])


  return (
    <div className="min-h-screen bg-gradient-to-br p-4">
      <div className="mx-auto space-y-8">
        <Card className="shadow-none bg-gradient-to-r pt-0 border-none outline-none ">
          <CardHeader className="text-center pt-0">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Trophy className="h-8 w-8 text-yellow-600" />
              {/* <Sparkles className="h-6 w-6 text-yellow-500" /> */}
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
              Your Shortlisted Drives
            </CardTitle>
            <p className="text-gray-600 text-lg">Amazing work! You've been selected for these exciting opportunities</p>
          </CardHeader>
          <CardContent className="space-y-4 ">
            {shortlistedDrives.map((jobData, index) => (
              <div key={index}>
                <ShortlistedDriveCard shortlistedData={jobData}/>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default page