'use client'
import AppliedJobCard from '@/components/student/appliedJobCard'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import axios from "axios"
import { useEffect, useState } from "react"

function page() {
  const [appliedJobs, setAppliedJobs] = useState([])

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const response = await axios.get('/api/student/jobs/applied-jobs')
        setAppliedJobs(response.data.data)
      } catch (error) {
        console.error("Error fetching applied jobs:", error.response?.data?.message || error.message)
      }
    }
    fetchAppliedJobs()
  }, [])

  return (
    <div className="w-full p-4">
      <div className="w-full max-w-none space-y-4 sm:space-y-6">
        <Card className="w-full p-0 shadow-none border-none bg-background">
          <CardHeader >
            <CardTitle className="text-3xl font-bold text-gray-900 text-center">Applied Drives</CardTitle>
            <CardDescription className="text-sm text-center sm:text-base text-gray-700">Track your job applications and Start Preparing</CardDescription>
          </CardHeader>
          <CardContent className="w-full space-y-2 sm:space-y-4 p-0">
            {appliedJobs.map((job, index) => (
              <div key={index}>
                <AppliedJobCard jobData={job} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default page