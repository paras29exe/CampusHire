"use client"

import { useState, useEffect, useMemo } from "react"
import { Briefcase, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import EligibilityCriteriaSection from "@/components/modify-job/eligibility"
import LinksDateSection from "@/components/modify-job/linksAndDate"
import RoundDetailsSection from "@/components/modify-job/roundDetails"
import { toast } from "sonner"
import axios from "axios"
import { useRouter, useSearchParams } from "next/navigation"

// ✅ Import Dialog from ShadCN
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

export default function EditJobPage() {
  const [jobData, setJobData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isPublishing, setIsPublishing] = useState(false)

  const [eligibilityValid, setEligibilityValid] = useState(false)
  const [linksDateValid, setLinksDateValid] = useState(false)

  const [isDialogOpen, setIsDialogOpen] = useState(false) // ✅ state for dialog

  const params = useSearchParams()
  const jobId = params.get("jobId")
  const router = useRouter()

  useEffect(() => {
    const fetchJobData = async () => {
      setIsLoading(true)
      try {
        const response = await axios.get(`/api/views/job-description?jobId=${jobId}`)
        const data = response.data.data
        if (data.eligibility_criteria.courses.length && data.eligibility_criteria.batches.length && data.eligibility_criteria.cgpa !== null) {
          setEligibilityValid(true)
        }
        if (data.links?.company_link && data.links?.college_link && data.last_date_to_apply) {
          setLinksDateValid(true)
        }
        setJobData(data)
      } catch (error) {
        console.error("Failed to fetch job data:", error)
        toast("Failed to load job data", { action: { label: "OK" } })
      } finally {
        setIsLoading(false)
      }
    }
    fetchJobData()
  }, [])

  const handleGoBack = () => window.history.back()

  // ✅ This is triggered after confirmation in dialog
  const handlePublishConfirmed = async () => {
    setIsDialogOpen(false) // close dialog
    if (!eligibilityValid || !linksDateValid) {
      toast("Please complete all sections before publishing", { action: { label: "OK" } })
      return
    }
    setIsPublishing(true)
    try {
      const response = await axios.put(`/api/admin/jobs/${jobId}/publish`)
      toast("Job published successfully!", { action: { label: "OK" } })
      setJobData(response.data.data)
      router.back()
    } catch (error) {
      toast("Failed to publish job: " + (error.response?.data?.message || error.message))
    } finally {
      setIsPublishing(false)
    }
  }

  const isAllSectionsValid = useMemo(() => eligibilityValid && linksDateValid, [eligibilityValid, linksDateValid])
  const isJobPublished = useMemo(() => jobData?.status === "active", [jobData?.status])

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
          <Button onClick={handleGoBack} className="mt-4">
            Go Back
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Briefcase />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Edit Job Details</h1>
                <p className="text-gray-600">{jobData.company.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {isJobPublished && (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-medium">Published</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
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
                company_link: jobData.links?.company_link,
                college_link: jobData.links?.college_link,
                last_date_to_apply: jobData.last_date_to_apply,
              }}
              onValidationChange={setLinksDateValid}
            />
          </div>

          <div>
            <RoundDetailsSection jobId={jobId} roles={jobData.job_roles} />
          </div>
        </div>

        {/* Publish Job Section */}
        <div className="mt-8">
          <Card
            className={`border-2 ${isAllSectionsValid ? "border-green-200 bg-green-50" : "border-orange-200 bg-orange-50"}`}
          >
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {isJobPublished ? "Job Status" : "Ready to Publish?"}
                  </h3>
                  {isJobPublished ? (
                    <p className="text-green-700">This job is currently published and visible to students.</p>
                  ) : isAllSectionsValid ? (
                    <p className="text-green-700">
                      You can publish this job to make it visible to students.
                    </p>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-orange-700">Please complete all sections before publishing:</p>
                      <ul className="text-sm space-y-1">
                        <li className={`flex items-center gap-2 ${eligibilityValid ? "text-green-600" : "text-red-600"}`}>
                          <div className={`w-2 h-2 rounded-full ${eligibilityValid ? "bg-green-500" : "bg-red-500"}`}></div>
                          Eligibility Criteria {eligibilityValid ? "✓" : "✗"}
                        </li>
                        <li className={`flex items-center gap-2 ${linksDateValid ? "text-green-600" : "text-red-600"}`}>
                          <div className={`w-2 h-2 rounded-full ${linksDateValid ? "bg-green-500" : "bg-red-500"}`}></div>
                          Links and Date {linksDateValid ? "✓" : "✗"}
                        </li>
                      </ul>
                    </div>
                  )}
                </div>

                {!isJobPublished && (
                  <Button
                    onClick={() => setIsDialogOpen(true)} // ✅ Open dialog instead of publishing directly
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

      {/* ✅ Dialog Component */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Have You clicked Save?</DialogTitle>
            <DialogDescription className={"text-sm"}>
              Make sure you have clicked the <strong>Save</strong> button in each section (Eligibility, Links & Date, Round Details) to ensure your changes are stored before publishing.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handlePublishConfirmed} disabled={isPublishing} className="bg-green-600 hover:bg-green-700">
              {isPublishing ? "Publishing..." : "Continue to Publish"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
