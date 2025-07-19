"use client"

import * as React from "react"
import { Calendar, Globe, Users, ChevronDown, Edit, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

// Helper to format date (assuming it exists or will be created)
const formatDate = (dateString) => {
    if (!dateString) return "N/A"
    const options = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
}

export default function AssignedDriveCard({ driveData, userRole }) {
    const [isAdminsOpen, setIsAdminsOpen] = React.useState(false)
    const isSuperuser = React.useMemo(() => userRole === "superuser", [userRole])
    const router = useRouter();

    const handleManage = () => {
        router.push(`/dashboard/admin/modify-job?jobId=${driveData.company?._id}`);
    }

    const handleViewDetails = () => {
        router.push(`/job-description?jobId=${driveData.company?._id}`);
    }

    if (driveData)
        return (
            <Card className="w-full p-2 pt-4 max-w-4xl mx-auto hover:shadow-md transition-shadow duration-300">
                <CardHeader className="mb-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-orange-600 to-red-700 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                                {driveData.company?.company.name?.[0]?.toUpperCase() || 'N/A'}
                            </div>
                            <div>
                                <CardTitle className="text-xl font-bold text-gray-900">{driveData.company?.company.name}</CardTitle>
                                <a
                                    href={driveData.company?.company.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
                                >
                                    <Globe className="h-3 w-3" />
                                    Visit Website
                                </a>
                            </div>
                        </div>
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">
                            Assigned
                        </Badge>
                    </div>
                    <CardDescription className="mt-2 text-sm text-gray-600">
                        This drive is currently assigned for management.
                    </CardDescription>
                </CardHeader>
                <CardContent className=" pt-0 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <div>
                                <span className="text-gray-500">Assigned On:</span>
                                <div className="font-medium">{formatDate(driveData.createdAt)}</div>
                            </div>
                        </div>
                        {isSuperuser ? (
                            <div className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-gray-400" />
                                <div>
                                    <span className="text-gray-500">Total Admins:</span>
                                    <div className="font-medium">{driveData.assigned_to?.length}</div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-gray-400" />
                                <div>
                                    <span className="text-gray-500">Assigned By:</span>
                                    <div className="font-medium">{driveData.assigned_by?.name || "N/A"}</div>
                                </div>
                            </div>
                        )}
                    </div>

                    <Collapsible open={isAdminsOpen} onOpenChange={setIsAdminsOpen} className="w-auto ">
                        <CollapsibleTrigger asChild>
                            <Button variant="ghost" className="w-full justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                <div className="flex items-center gap-2">
                                    <Users className="h-4 w-4" />
                                    <span>Show Admins ({driveData.assigned_to.length})</span>
                                </div>
                                <ChevronDown className={`h-4 w-4 transition-transform ${isAdminsOpen ? "rotate-180" : ""}`} />
                            </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-3 space-y-3">
                            <Separator />
                            <div className="flex flex-wrap gap-3">
                                {driveData.assigned_to.map((admin, index) => (
                                    <Card key={admin.employee_id || index} className="px-2 py-1 rounded-sm flex items-center gap-3 bg-gray-50">
                                        <div className="flex flex-col">
                                            <span className="font-medium text-gray-900">{admin.name}</span>
                                            <span className="text-xs text-gray-600">ID: {admin.employee_id}</span>
                                            <span className="text-xs text-blue-600">{admin.email}</span>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </CollapsibleContent>
                    </Collapsible>
                </CardContent>
                <CardFooter className="flex flex-col sm:ml-auto mt-auto sm:flex-row gap-2 p-4 pt-0">
                    {isSuperuser ? (
                        <Button onClick={() => toast("This feature is not available yet.")} className="max-sm:w-full ">
                            <Bell className="w-3 m-auto max-sm:hidden" /> Notify Admins
                        </Button>
                    ) : (
                        <Button onClick={handleManage} className="max-sm:w-full"><Edit className="w-4 h-4" /> Manage</Button>
                    )}
                    <Button onClick={handleViewDetails} variant="outline" className="max-sm:w-full bg-transparent">
                        View Drive Details
                    </Button>
                </CardFooter>
            </Card>
        )
}
