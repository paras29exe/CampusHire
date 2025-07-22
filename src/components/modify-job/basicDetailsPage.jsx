"use client"

import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import EligibilityCriteriaSection from "@/components/modify-job/eligibility"
import LinksDateSection from "@/components/modify-job/linksAndDate"
import { toast } from "sonner"
import axios from "axios"

// ✅ Import Dialog from ShadCN
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import ReviewStipendPackage from "@/components/reviewStipendPackage"

export default function EditBasicDetails({jobData, setSelectedTab, eligibilityValid, linksDateValid, setEligibilityValid, setLinksDateValid, isJobPublished, isAllSectionsValid}) {
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false) // ✅ state for dialog

  useEffect(() => {
      try {
        const data = jobData
        if (data.eligibility_criteria.courses.length && data.eligibility_criteria.batches.length && data.eligibility_criteria.cgpa !== null) {
          setEligibilityValid(true)
        }
        if (data.links?.company_link && data.links?.college_link && data.last_date_to_apply) {
          setLinksDateValid(true)
        }
      } catch (error) {
        console.error("Failed to fetch job data:", error)
        toast("Failed to load job data", { action: { label: "OK" } })
      } finally {
        setIsLoading(false)
      }
  }, [])

  const handleGoBack = () => window.history.back()

  // ✅ This is triggered after confirmation in dialog
  const handleContinue = async () => {
    setIsDialogOpen(false) // close dialog
    if (!eligibilityValid || !linksDateValid) {
      toast("Please complete all sections before publishing", { action: { label: "OK" } })
      return
    }
    setSelectedTab("rounds") // switch to rounds tab
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
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
    <div className="min-h-screen ">

      {/* Content */}
      <div className="max-w-7xl mx-auto pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <EligibilityCriteriaSection
              jobId={jobData._id}
              initialData={jobData.eligibility_criteria}
              onValidationChange={setEligibilityValid}
            />
            <LinksDateSection
              jobId={jobData._id}
              initialData={{
                company_link: jobData.links?.company_link,
                college_link: jobData.links?.college_link,
                last_date_to_apply: jobData.last_date_to_apply,
              }}
              onValidationChange={setLinksDateValid}
            />
          </div>

          <Card>
            <ReviewStipendPackage parsedData={jobData} />
          </Card>
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
                    {isJobPublished ? jobData.status.toUpperCase() : "Ready to Save?"}
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
                    disabled={!isAllSectionsValid}
                    size="lg"
                    className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400"
                  >
                    Next Step
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
              Make sure you have clicked the <strong>Save</strong> button in each section (Eligibility, Links & Date, Package Section) to ensure your changes are stored before publishing.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleContinue} className="bg-green-600 hover:bg-green-700">
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
