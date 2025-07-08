"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
// import { useToast } from "@/hooks/use-toast"
import EligibilityCriteriaSection from "@/components/modify-job/eligibility"
import LinksDateSection from "@/components/modify-job/linksAndDate"
import RoundDetailsSection from "@/components/modify-job/roundDetails"

export default function EditJobPage() {
  const [jobData, setJobData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isPublishing, setIsPublishing] = useState(false)
  const [eligibilityValid, setEligibilityValid] = useState(false)
  const [linksDateValid, setLinksDateValid] = useState(false)
  const [roundDetailsValid, setRoundDetailsValid] = useState(false)
//   const { toast } = useToast()
  const jobId = "job123"

  useEffect(() => {
    fetchJobData()
  }, [])

  const fetchJobData = async () => {
    try {
      const mockData = {
        _id: "job123",
        company: { name: "Microsoft India", website: "https://careers.microsoft.com" },
        eligibility_criteria: {
          batch: ["2024", "2025"],
          cgpa: 7.5,
          courses: ["B.tech-CSE", "B.tech-IT", "MCA"],
        },
        job_roles: [
          {
            _id: "role1",
            role: "Software Development Engineer",
            round_details: {
              name: "Technical Interview",
              type: "online",
              date: "2024-02-15",
              time: "10:00",
              duration: "60",
              link: "https://teams.microsoft.com/interview",
            },
            shortlisted_candidates: [],
          },
          {
            _id: "role2",
            role: "Data Scientist",
            round_details: {
              name: "Case Study Round",
              type: "offline",
              date: "2024-02-18",
              time: "14:00",
              duration: "90",
              link: "",
            },
            shortlisted_candidates: [],
          },
        ],
        links: {
          company_link: "https://careers.microsoft.com/apply",
          college_link: "https://college.edu/placements/microsoft",
        },
        last_date_to_apply: "2024-02-10",
        status: "unPublished",
      }

      await new Promise((resolve) => setTimeout(resolve, 1000))
      setJobData(mockData)
    } catch (error) {
    //   toast({ title: "Error", description: "Failed to load job data", variant: "destructive" })
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoBack = () => window.history.back()

  const handlePublishJob = async () => {
    if (!eligibilityValid || !linksDateValid || !roundDetailsValid) {
    //   toast({
    //     title: "Incomplete Information",
    //     description: "Please complete all sections before publishing the job",
    //     variant: "destructive",
    //   })
      return
    }

    setIsPublishing(true)
    try {
      const response = await fetch(`/api/jobs/${jobId}/publish`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "active" }),
      })
      if (!response.ok) throw new Error()
    //   toast({ title: "Success", description: "Job published successfully! Students can now view and apply." })
      if (jobData) setJobData({ ...jobData, status: "active" })
    } catch {
    //   toast({ title: "Error", description: "Failed to publish job", variant: "destructive" })
    } finally {
      setIsPublishing(false)
    }
  }

  const isAllSectionsValid = eligibilityValid && linksDateValid && roundDetailsValid
  const isJobPublished = jobData?.status === "active"

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading job details...</p>
        </div>
      </div>
    )
  }

  if (!jobData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Job not found</p>
          <Button onClick={handleGoBack} className="mt-4">Go Back</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={handleGoBack}>
                <ArrowLeft className="h-4 w-4 mr-2" /> Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Edit Job Details</h1>
                <p className="text-gray-600">{jobData.company.name}</p>
              </div>
            </div>
            {isJobPublished && (
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="h-5 w-5" />
                <span className="font-medium">Published</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <EligibilityCriteriaSection
              jobId={jobId}
              initialData={jobData.eligibility_criteria}
              onValidationChange={setEligibilityValid}
            />
            <LinksDateSection
              jobId={jobId}
              initialData={{
                companyLink: jobData.links.company_link,
                collegeLink: jobData.links.college_link,
                lastDateToApply: jobData.last_date_to_apply,
              }}
              onValidationChange={setLinksDateValid}
            />
          </div>
          <div>
            <RoundDetailsSection
              jobId={jobId}
              roles={jobData.job_roles.map((role) => ({ _id: role._id, role: role.role }))}
              onValidationChange={setRoundDetailsValid}
            />
          </div>
        </div>

        <div className="mt-8">
          <Card className={`border-2 ${isAllSectionsValid ? "border-green-200 bg-green-50" : "border-orange-200 bg-orange-50"}`}>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {isJobPublished ? "Job Status" : "Ready to Publish?"}
                  </h3>
                  {isJobPublished ? (
                    <p className="text-green-700">This job is currently published and visible to students.</p>
                  ) : isAllSectionsValid ? (
                    <p className="text-green-700">All sections are complete! You can now publish this job.</p>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-orange-700">Please complete all sections before publishing:</p>
                      <ul className="text-sm space-y-1">
                        <li className={`flex items-center gap-2 ${eligibilityValid ? "text-green-600" : "text-red-600"}`}>
                          <div className={`w-2 h-2 rounded-full ${eligibilityValid ? "bg-green-500" : "bg-red-500"}`} />
                          Eligibility Criteria {eligibilityValid ? "✓" : "✗"}
                        </li>
                        <li className={`flex items-center gap-2 ${linksDateValid ? "text-green-600" : "text-red-600"}`}>
                          <div className={`w-2 h-2 rounded-full ${linksDateValid ? "bg-green-500" : "bg-red-500"}`} />
                          Links and Date {linksDateValid ? "✓" : "✗"}
                        </li>
                        <li className={`flex items-center gap-2 ${roundDetailsValid ? "text-green-600" : "text-red-600"}`}>
                          <div className={`w-2 h-2 rounded-full ${roundDetailsValid ? "bg-green-500" : "bg-red-500"}`} />
                          Round Details {roundDetailsValid ? "✓" : "✗"}
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
                {!isJobPublished && (
                  <Button
                    onClick={handlePublishJob}
                    disabled={!isAllSectionsValid || isPublishing}
                    size="lg"
                    className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400"
                  >
                    {isPublishing ? "Publishing..." : "Publish Job"}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
