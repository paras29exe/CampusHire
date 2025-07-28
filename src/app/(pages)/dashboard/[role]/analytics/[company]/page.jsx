"use client"

import { useState, useEffect, useMemo } from "react"
import { Users, UserCheck, UserX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import AnalyticsChart from "@/components/analytics/chartData"
import AnalyticsTable from '@/components/analytics/tableData'
import axios from "axios"
import { useSearchParams } from "next/navigation"
import { toast } from "sonner"

export default function JobAnalyticsDetailPage() {
    const [jobData, setJobData] = useState(null)
    const [applicantsData, setApplicantsData] = useState(null)
    const [nonApplicantsData, setNonApplicantsData] = useState(null)
    const [error, setError] = useState(null)

    const [loading, setLoading] = useState(true)
    const [jobdataLoading, setJobDataLoading] = useState(true)
    const [selectedCourse, setSelectedCourse] = useState("all")
    const [selectedBatch, setSelectedBatch] = useState("all")
    const [selectedRole, setSelectedRole] = useState("all")
    const [showApplicants, setShowApplicants] = useState(true)

    const params = useSearchParams()
    const jobId = useMemo(() => params.get('jobId'), [params.toString()])

    useEffect(() => {
        fetchAllData()
    }, [jobId, selectedCourse, selectedBatch, selectedRole])

    const fetchAllData = async () => {
        try {
            setLoading(true)
            const [applicantsResponse, nonApplicantsResponse] = await Promise.all([
                axios.get(`/api/shared/analytics/applicants`, {
                    params: {
                        jobId,
                        roleId: selectedRole !== "all" ? selectedRole : undefined,
                        course: selectedCourse !== "all" ? selectedCourse : undefined,
                        batch: selectedBatch !== "all" ? selectedBatch : undefined,
                    }
                }),
                axios.get(`/api/shared/analytics/non-applicants`, {
                    params: {
                        jobId,
                        roleId: selectedRole !== "all" ? selectedRole : undefined,
                        course: selectedCourse !== "all" ? selectedCourse : undefined,
                        batch: selectedBatch !== "all" ? selectedBatch : undefined,
                    }
                }),
            ])
            setError(null)
            setApplicantsData(applicantsResponse.data.data)
            setNonApplicantsData(nonApplicantsResponse.data.data)
        } catch (error) {
            console.error('Error fetching applicants or non-applicants data:', error.response?.data?.message || error.message)
            setError(error.response?.data?.message)
            toast.error(error.response?.data?.message || "Failed to fetch data", {
                duration: 3000,
                position: "top-center",
                style: {
                    background: "red",
                    color: "white",
                },
            })
        }finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        const fetchJobData = async () => {
            try {
                setJobDataLoading(true)
                const response = await axios.get(`/api/shared/analytics/get-jobdata?jobId=${jobId}`)
                setJobData(response.data.data)
            } catch (error) {
                console.error('Error fetching job data:', error)
            } finally {
                setJobDataLoading(false)
            }
        }
        fetchJobData()
    }, [jobId])


    if (!jobId) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600">No job ID provided</p>
                </div>
            </div>
        )
    }

    if (loading || jobdataLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading job analytics...</p>
                </div>
            </div>
        )
    }

    if (!jobData || !applicantsData || !nonApplicantsData) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600">Failed to load job analytics data. <strong>Error: {error || "internal server error"}</strong></p>
                </div>
            </div>
        )
    }

    const combinedData = {
        applicants: applicantsData.applicants,
        non_applicants: nonApplicantsData.non_applicants,
    }

    return (
        <div className=" bg-gray-50 p-4">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="text-center space-y-4">
                    <div className="flex items-center flex-col sm:flex-row justify-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                            <Users className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">{jobData.company.name}</h1>
                            <p className="text-gray-600">Job Drive Analytics & Student Data</p>
                        </div>
                    </div>
                </div>

                {/* Filters Section */}
                <div className="flex flex-wrap flex-row items-center justify-center gap-4">
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Course</label>
                        <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                            <SelectTrigger className="">
                                <SelectValue placeholder="Select course" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Courses</SelectItem>
                                {jobData.eligibility_criteria.courses.map((course) => (
                                    <SelectItem key={course} value={course}>
                                        {course}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Batch</label>
                        <Select value={selectedBatch} onValueChange={setSelectedBatch}>
                            <SelectTrigger className="">
                                <SelectValue placeholder="Select batch" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Batches</SelectItem>
                                {jobData.eligibility_criteria.batches.map((batch) => (
                                    <SelectItem key={batch} value={batch}>
                                        {batch}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Role</label>
                        <Select value={selectedRole} onValueChange={setSelectedRole}>
                            <SelectTrigger className="">
                                <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Roles</SelectItem>
                                {jobData.job_roles.map((item) => (
                                    <SelectItem key={item.role} value={item._id}>
                                        {item.role}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Chart Section */}
                <AnalyticsChart applicantsData={applicantsData?.groupedByCourse} nonApplicantsData={nonApplicantsData?.groupedByCourse} />

                {/* Toggle Button Section */}
                <div className="flex justify-center">
                    <div className="flex gap-x-2 bg-gray-100 rounded-lg p-1">
                        <Button
                            variant={showApplicants ? "default" : "ghost"}
                            size="sm"
                            onClick={() => setShowApplicants(true)}
                            className={`flex items-center gap-2 outline border ${showApplicants ? "bg-blue-600 text-white" : "text-gray-600"}`}
                        >
                            <UserCheck className="h-4 w-4" />
                            Applicants ({applicantsData.applicants.length})
                        </Button>
                        <Button
                            variant={!showApplicants ? "default" : "ghost"}
                            size="sm"
                            onClick={() => setShowApplicants(false)}
                            className={`flex items-center gap-2 outline border ${!showApplicants ? "bg-red-600 text-white" : "text-gray-600"}`}
                        >
                            <UserX className="h-4 w-4" />
                            Non-Applicants ({nonApplicantsData.non_applicants.length})
                        </Button>
                    </div>
                </div>

                {/* Table Section */}
                <AnalyticsTable
                    data={combinedData}
                    showApplicants={showApplicants}
                    selectedCourse={selectedCourse}
                    selectedBatch={selectedBatch}
                    selectedRole={selectedRole}
                />
            </div>
        </div>
    )
}
