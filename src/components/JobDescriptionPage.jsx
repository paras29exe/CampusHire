"use client"
import { AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"
import axios from "axios"

// Import the new components
import JobHeaderSection from "@/components/job-description/header"
import EligibilityCriteriaSection from "@/components/job-description/eligibilityCriteria"
import MentorsSection from "@/components/job-description/mentor"
import JobRolesCarousel from "@/components/job-description/jobCarousal"
import JobDetailsSection from "@/components/job-description/jobDetails"

export default function JobDescriptionPage({ jobData, role }) {
    const router = useRouter()
    const isStudent = role === 'student'
    const isSuperuser = role === 'superuser'

    const isUnpublished = jobData.status === 'unpublished'
    const isUnassigned = jobData.status === 'unassigned'
    const isActive = jobData.status === 'active'
    const isExpired = jobData.status === 'expired'


    const isApplicationOpen = () => {
        if (!jobData.last_date_to_apply) return false
        return new Date() <= new Date(jobData.last_date_to_apply)
    }

    const getStatusBadge = () => {
        if (isUnassigned) {
            return (
                <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 px-3 py-1">
                    Unassigned - Awaiting Mentor Assignment
                </Badge>
            )
        }
        if (isUnpublished) {
            return (
                <Badge className="bg-orange-100 text-orange-800 border-orange-200 px-3 py-1">
                    Unpublished - Details Being Updated
                </Badge>
            )
        }
        if (isActive) {
            return (
                <Badge className={`px-3 py-1 ${isApplicationOpen() ? "bg-blue-100 text-blue-800 border-blue-200" : "bg-red-100 text-red-800 border-red-200"}`}>
                    {isApplicationOpen() ? "Applications Open" : "Applications Closed"}
                </Badge>
            )
        }
        if (isExpired) {
            return (
                <Badge className="bg-gray-100 text-gray-800 border-gray-200 px-3 py-1">
                    Expired - No Longer Accepting Applications
                </Badge>
            )
        }
        return null
    }

    return (
        <div className="bg-primary-foreground w-full sm:px-4">
            <JobHeaderSection
                company={jobData.company}
                jobRolesCount={jobData.job_roles?.length || 0}
                statusBadge={getStatusBadge()}
                lastDateToApply={jobData.last_date_to_apply}
                isApplicationOpen={isApplicationOpen()}
            />

            <div className="mx-auto py-8 space-y-8">
                {/* Status Alert */}
                {(isUnassigned || isUnpublished) && (
                    <div className="px-5 flex items-center gap-x-3 bg-border/70 rounded-sm py-2">
                        <AlertCircle className="h-4 w-4" />
                        <div >
                            {isUnassigned && (
                                <div>
                                    <strong>This position is currently unassigned.</strong>
                                    {isSuperuser ? " Please assign a mentor to manage this position." : " Details will be available once a mentor is assigned."}
                                </div>
                            )}
                            {isUnpublished && (
                                <div>
                                    <strong>This position is being updated.</strong>
                                    Some details may be incomplete. Please check back later for complete information.
                                </div>
                            )}
                        </div>
                    </div>
                )}

                <EligibilityCriteriaSection
                    eligibilityCriteria={jobData.eligibility_criteria}
                    isUnassigned={isUnassigned}
                    isUnpublished={isUnpublished}
                />

                <MentorsSection
                    assignedTo={jobData.assigned_to}
                    isUnassigned={isUnassigned}
                    isSuperuser={isSuperuser}
                    router={router} // Pass router for navigation
                />

                {jobData.job_roles && jobData.job_roles.length > 0 && (
                    <JobRolesCarousel
                        jobRoles={jobData.job_roles}
                        isUnpublished={isUnpublished}
                        isStudent={isStudent}
                        isApplicationOpen={isApplicationOpen()}
                        jobLinks={jobData.links}
                        isUnassigned={isUnassigned}
                        isSuperuser={isSuperuser}
                        role={role} // Pass down the role for the message
                    />
                )}

                <JobDetailsSection
                    jobDetails={jobData.job_details}
                    isUnpublished={isUnpublished}
                />
            </div>
        </div>
    )
}