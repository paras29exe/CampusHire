'use client'

import JobCard from "@/components/activeJobCard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useStudentJobsStore } from "@/store/store"
import axios from "axios"
import { useEffect, useState } from "react"

function page() {
  // Sample job data - replace with your actual data
  // const jobsData = [
  //   {
  //     companyName: "TechCorp Solutions",
  //     website: "www.techcorp.com",
  //     numberOfRoles: 5,
  //     location: "Bangalore, Karnataka",
  //     package: "₹8-12 LPA",
  //     lastDateToApply: "2024-02-15",
  //     roles: ["Software Engineer", "Frontend Developer", "Backend Developer", "DevOps Engineer", "QA Engineer"],
  //   },
  //   {
  //     companyName: "InnovateTech",
  //     website: "www.innovatetech.com",
  //     numberOfRoles: 3,
  //     location: "Mumbai, Maharashtra",
  //     package: "₹10-15 LPA",
  //     lastDateToApply: "2024-02-20",
  //     roles: ["Full Stack Developer", "UI/UX Designer", "Product Manager"],
  //   },
  //   {
  //     companyName: "DataSoft Systems",
  //     website: "www.datasoft.com",
  //     numberOfRoles: 4,
  //     location: "Hyderabad, Telangana",
  //     package: "₹6-10 LPA",
  //     lastDateToApply: "2024-02-18",
  //     roles: ["Data Analyst", "Machine Learning Engineer", "Python Developer", "DevOps Engineer"],
  //   },
  //   {
  //     companyName: "CloudTech Industries",
  //     website: "www.cloudtech.com",
  //     numberOfRoles: 2,
  //     location: "Pune, Maharashtra",
  //     package: "₹12-18 LPA",
  //     lastDateToApply: "2024-02-25",
  //     roles: ["Cloud Architect", "Senior Backend Developer"],
  //   },
  //   {
  //     companyName: "NextGen Solutions",
  //     website: "www.nextgen.com",
  //     numberOfRoles: 6,
  //     location: "Chennai, Tamil Nadu",
  //     package: "₹7-11 LPA",
  //     lastDateToApply: "2024-02-22",
  //     roles: ["React Developer", "Node.js Developer", "QA Engineer", "DevOps Engineer", "Scrum Master", "Business Analyst"],
  //   },
  // ]

  const { activeJobs, setActiveJobs } = useStudentJobsStore();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('/api/student/jobs/active-jobs');
        setActiveJobs(response.data.data);

        console.log("Active jobs fetched successfully:", response.data.data);
      } catch (error) {
        console.error(error.response?.data.message || "Failed to fetch active jobs");
      }
    };
    if(!activeJobs.length) fetchJobs();
  }, [ ]);
  

  return (
    <div className=" w-full p-4">
      <div className=" mx-auto">
        <Card className="w-full p-0 shadow-none border-none bg-background">
          <CardHeader >
            <CardTitle className="text-3xl font-bold text-gray-900 text-center">Job Opportunities</CardTitle>
            <CardDescription className="text-sm text-center sm:text-base text-gray-600">Discover your next career opportunity</CardDescription>
          </CardHeader>

          {/* Responsive grid layout */}
          <CardContent className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 p-0 gap-6">
            {activeJobs?.map((job, index) => (
              <JobCard key={index} jobData={job} />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default page