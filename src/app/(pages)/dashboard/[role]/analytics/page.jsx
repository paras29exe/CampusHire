"use client"

import { useState, useEffect } from "react"
import { BarChart3, Eye, Calendar, Globe, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/utils/client/formatDate"
import axios from "axios"
import { useRouter } from "next/navigation"

export default function Page() {
    const [jobs, setJobs] = useState([])
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                setLoading(true);
                const response = await axios.get('/api/shared/analytics/get-jobs');
                setJobs(response.data.data);
            } catch (error) {
                console.error('Error fetching drives:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, [])


    const getDaysAgo = (dateString) => {
        const now = new Date()
        const posted = new Date(dateString)
        const diffTime = Math.abs(now - posted)
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        return diffDays
    }

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col gap-y-3 items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-3 border-blue-600"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="text-center space-y-4">
                    <div className="flex items-center justify-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                            <BarChart3 className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Job Drive Analytics</h1>
                            <p className="text-gray-600">Track performance and insights for all job drives</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-4">
                        <Badge variant="secondary" className="px-3 py-1">
                            {jobs.length} Total Drives
                        </Badge>
                        <Badge variant="outline" className="px-3 py-1">
                            Analytics Dashboard
                        </Badge>
                    </div>
                </div>

                {/* Jobs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {jobs.map((job) => (
                        <Card key={job._id} className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
                            <CardHeader className="pb-4">
                                <div className="flex items-start justify-between">
                                    <div className="space-y-2">
                                        <CardTitle className="text-xl font-bold text-gray-900 line-clamp-2">{job.company.name}</CardTitle>
                                        <a
                                            href={job.company.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
                                        >
                                            <Globe className="h-3 w-3" />
                                            <span className="truncate">{job.company.website.replace(/^https?:\/\//, "")}</span>
                                        </a>
                                    </div>
                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                                        {job.company.name.charAt(0)}
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                {/* Posted Date */}
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Calendar className="h-4 w-4 text-gray-400" />
                                    <div>
                                        <span className="text-gray-500">Posted on:</span>
                                        <div className="font-medium">{formatDate(job.createdAt)}</div>
                                        <div className="text-xs text-gray-400">{getDaysAgo(job.createdAt)} days ago</div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col gap-y-2 pt-2">
                                    <Button
                                        onClick={() => router.push(`analytics/${job.company.name.toLowerCase()}?jobId=${job._id}`)}
                                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                                    >
                                        <TrendingUp className="h-4 w-4 mr-2" />
                                        View Analytics
                                    </Button>

                                    <Button
                                        onClick={() => `/job-description/?jobId=${job._id}`}
                                        variant="outline"
                                        className="w-full bg-transparent"
                                    >
                                        <Eye className="h-4 w-4 mr-2" />
                                        Full Description
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Empty State */}
                {jobs.length === 0 && (
                    <div className="text-center py-12">
                        <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Job Drives Found</h3>
                        <p className="text-gray-600">There are no job drives available for analytics at the moment.</p>
                    </div>
                )}

            </div>
        </div>
    )
}
