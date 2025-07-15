"use client"
import { ExternalLink, MapPin, Clock, Calendar, Users, GraduationCap, Award, User, LinkIcon, AlertCircle, Clock3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { formatDate } from "@/utils/client/formatDate"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function JobDescriptionPage({ jobData, role }) {
    const router = useRouter()
    const isStudent = role === 'student'
    const isSuperuser = role === 'superuser'

    const isUnpublished = jobData.status === 'unpublished'
    const isUnassigned = jobData.status === 'unassigned'
    const isActive = jobData.status === 'active'
    const isExpired = jobData.status === 'expired'

    const formatTime = (timeString) => {
        if (!timeString) return 'To be Updated'
        const [hours, minutes] = timeString.split(":")
        const hour = Number.parseInt(hours)
        const ampm = hour >= 12 ? "PM" : "AM"
        const displayHour = hour % 12 || 12
        return `${displayHour}:${minutes} ${ampm}`
    }

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

    const handleApplyToRole = (roleId, roleName) => {
        window.location.href = `/apply/role/${roleId}?company=${jobData.company.name.toLowerCase().replace(/\s+/g, "-")}&role=${roleName.toLowerCase().replace(/\s+/g, "-")}`
    }

    return (
        <div className="bg-primary-foreground w-full sm:px-4">
            {/* Header Section */}
            <div className="bg-primary-foreground border-b shadow-sm">
                <div className=" mx-auto px-6 py-8">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                                    {jobData.company.name.charAt(0)}
                                </div>
                                <div>
                                    <h1 className="text-lg sm:text-3xl font-bold text-gray-900">{jobData.company.name}</h1>
                                    {jobData.company.website && (
                                        <Link
                                            href={jobData.company.website}
                                            className="text-blue-600 hover:text-blue-800 text-xs sm:text-sm flex items-center gap-1 transition-colors"
                                        >
                                            <ExternalLink className="h-4 w-4" />
                                            Visit Company Website
                                        </Link>
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <Badge className="bg-green-100 text-green-800 border-green-200 px-3 py-1">
                                    {jobData.job_roles?.length || 0} Positions Available
                                </Badge>
                                {getStatusBadge()}
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-600">Last Date to Apply</p>
                            <p className={`font-bold text-lg ${jobData.last_date_to_apply
                                ? (isApplicationOpen() ? "text-green-600" : "text-red-600")
                                : "text-gray-500"
                                }`}>
                                {jobData.last_date_to_apply ? formatDate(jobData.last_date_to_apply) : "To be announced"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

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

                {/* Eligibility Criteria - Only show if available */}
                {jobData.eligibility_criteria && !isUnassigned && (
                    <Card className="rounded-none">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <GraduationCap className="h-5 w-5 text-blue-600" />
                                Eligibility Criteria
                                {isUnpublished && (
                                    <Badge variant="outline" className="text-xs">
                                        <Clock3 className="h-3 w-3 mr-1" />
                                        Being Updated
                                    </Badge>
                                )}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <h4 className="font-semibold text-sm text-gray-900">Eligible Batches</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {jobData.eligibility_criteria.batches?.map((batch, index) => (
                                            <Badge key={batch + index} variant="outline" className="text-sm">
                                                {batch}
                                            </Badge>
                                        )) || <span className="text-sm text-gray-500">To be announced</span>}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <h4 className="font-semibold text-sm text-gray-900">Minimum CGPA</h4>
                                    <Badge variant="outline" className="text-sm">
                                        {jobData.eligibility_criteria.cgpa || 0}
                                    </Badge>
                                </div>
                            </div>

                            {jobData.eligibility_criteria.courses && (
                                <div className="space-y-3">
                                    <h4 className="font-semibold text-sm text-gray-900">Eligible Courses </h4>
                                    <div className="space-x-3 space-y-3">
                                        {jobData.eligibility_criteria?.courses.length ? (

                                            jobData.eligibility_criteria.courses.map((course) => (
                                                <Badge key={course} variant="secondary" className="text-xs">
                                                    {course}
                                                </Badge>
                                            )
                                            )
                                        ) : (
                                            <span className="text-sm text-gray-500">To be announced</span>
                                        )
                                        }
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )}

                {/* Mentors Section - Only show if assigned */}
                {jobData.assigned_to && jobData.assigned_to.length > 0 && !isUnassigned && (
                    <Card className="rounded-none">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="h-5 w-5 text-blue-600" />
                                Mentors to Contact
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {jobData.assigned_to.map((mentor, index) => (
                                    <div key={mentor._id || index} onClick={() => router.push(`/view-user?role=admin&userId=${mentor._id}`)} className="flex items-center gap-3 sm:px-4 bg-gray-50 rounded-lg">
                                        <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                                            {mentor?.name?.split(" ")
                                                .map((n) => n[0])
                                                .join("")}
                                        </div>
                                        <div>
                                            <p className="font-medium text-sm sm:text-base text-gray-900">{mentor.name}</p>
                                            <p className="text-xs sm:text-sm text-gray-600">{mentor.department || 'N/A'} Department</p>
                                            <a href={`mailto:${mentor.email}`} className="text-sm text-blue-600 hover:text-blue-800">
                                                {mentor.email}
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Placeholder for unassigned jobs */}
                {isUnassigned && (
                    <Card className="rounded-none">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="h-5 w-5 text-gray-400" />
                                Mentors to Contact
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-center py-8">
                                <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-500">No mentors assigned yet. {isSuperuser ? "Please Assign someone to handle the Proceedings" : "Contact the placement officer for assigning someone"}</p>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Job Roles */}
                {jobData.job_roles && jobData.job_roles.length > 0 && (
                    <Card className="rounded-none">
                        <CardHeader>
                            <CardTitle className="flex text-xl sm:text-2xl items-center gap-2">
                                <Users className="h-5 w-5 text-blue-600" />
                                Available Positions ({jobData.job_roles.length})
                                {isUnpublished && (
                                    <Badge variant="outline" className="text-xs">
                                        <Clock3 className="h-3 w-3 mr-1" />
                                        Details Being Updated
                                    </Badge>
                                )}
                            </CardTitle>
                            <p className="sm:text-sm text-xs text-gray-600">
                                {isUnpublished
                                    ? "Role details are being updated. Some information may be incomplete."
                                    : "Explore different roles and apply to the ones that match your interests"
                                }
                            </p>
                        </CardHeader>
                        <CardContent>
                            <Carousel opts={{
                                align: "start",
                            }} className="w-full">
                                <CarouselContent>
                                    {jobData.job_roles.map((role, index) => (
                                        <CarouselItem key={role._id}>
                                            <Card className="border-2 border-blue-100">
                                                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                                                    <CardTitle className="text-2xl text-blue-900">{`0${index + 1} - ${role.role}`}</CardTitle>
                                                </CardHeader>
                                                <CardContent className="p-6 space-y-6">
                                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                                        {/* Left Column */}
                                                        <div className="space-y-4">
                                                            {/* Package Details */}
                                                            <div>
                                                                <h4 className="font-semibold text-gray-900 mb-3">Package Details</h4>
                                                                {role.package_details ? (
                                                                    <div className="space-y-2 bg-green-50 p-4 rounded-lg border border-green-200">
                                                                        <div className="flex justify-between">
                                                                            <span className="text-sm text-gray-600">Internship Period:</span>
                                                                            <span className="font-medium">{role.package_details.internship_period || 'To be announced'}</span>
                                                                        </div>
                                                                        <div className="flex justify-between">
                                                                            <span className="text-sm text-gray-600">Stipend:</span>
                                                                            <span className="font-medium text-green-700">
                                                                                {role.package_details.stipend ? `₹${role.package_details.stipend}` : 'To be announced'}
                                                                            </span>
                                                                        </div>
                                                                        <div className="flex justify-between">
                                                                            <span className="text-sm text-gray-600">Full-time Package:</span>
                                                                            <span className="font-bold text-green-700">{role.package_details.package || 'To be announced'}</span>
                                                                        </div>
                                                                        {role.package_details.conditions && (
                                                                            <div className="pt-2 border-t border-green-200">
                                                                                <span className="text-xs text-red-600">
                                                                                    <strong>Condition:</strong> {role.package_details.conditions}
                                                                                </span>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                ) : (
                                                                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                                                        <p className="text-sm text-gray-500">Package details will be updated soon.</p>
                                                                    </div>
                                                                )}
                                                            </div>

                                                            {/* Round Details */}
                                                            <div>
                                                                <h4 className="font-semibold text-gray-900 mb-3">Next Round Details</h4>
                                                                {role.round_details ? (
                                                                    <div className="space-y-2 bg-orange-50 p-4 rounded-lg border border-orange-200">
                                                                        <div className="flex justify-between">
                                                                            <span className="text-sm text-gray-600">Round:</span>
                                                                            <span className="font-medium">{role.round_details.name || 'To be announced'}</span>
                                                                        </div>
                                                                        <div className="flex justify-between">
                                                                            <span className="text-sm text-gray-600">Type:</span>
                                                                            <Badge variant="outline" className="text-xs capitalize">
                                                                                {role.round_details.type || 'To be announced'}
                                                                            </Badge>
                                                                        </div>
                                                                        <div className="flex justify-between">
                                                                            <span className="text-sm text-gray-600">Date</span>
                                                                            <span className="font-medium">
                                                                                {formatDate(role?.round_details.date) || 'To be Updated'}
                                                                            </span>
                                                                        </div>
                                                                        <div className="flex justify-between">
                                                                            <span className="text-sm text-gray-600">Time</span>
                                                                            <span className="font-medium">
                                                                                {formatTime(role?.round_details.time) || 'To be Updated'}
                                                                            </span>
                                                                        </div>
                                                                        <div className="flex justify-between">
                                                                            <span className="text-sm text-gray-600">Duration:</span>
                                                                            <span className="font-medium">{role.round_details.duration || 'To be announced'}</span>
                                                                        </div>
                                                                        {role.round_details.link && (
                                                                            <div className="pt-2 border-t border-orange-200">
                                                                                <a
                                                                                    href={role.round_details.link}
                                                                                    target="_blank"
                                                                                    rel="noopener noreferrer"
                                                                                    className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                                                                                >
                                                                                    <LinkIcon className="h-3 w-3" />
                                                                                    Join Interview Link
                                                                                </a>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                ) : (
                                                                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                                                        <p className="text-sm text-gray-500">Round details will be updated soon.</p>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>

                                                        {/* Right Column */}
                                                        <div className="space-y-6">
                                                            <div>
                                                                <h4 className="font-semibold text-gray-900 mb-3">Required Skills</h4>
                                                                <ul className="space-y-2">
                                                                    {role.skills_required && role.skills_required.length > 0 ? (
                                                                        role.skills_required.map((skill, skillIndex) => (
                                                                            <li key={skillIndex} className="flex items-start gap-2 text-sm text-gray-700">
                                                                                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                                                                                {skill}
                                                                            </li>
                                                                        ))
                                                                    ) : (
                                                                        <li className="text-sm text-gray-500">Skills will be updated soon.</li>
                                                                    )}
                                                                </ul>
                                                            </div>
                                                            <div>
                                                                <h4 className="font-semibold text-gray-900 mb-3">Key Responsibilities</h4>
                                                                <ul className="space-y-2">
                                                                    {role.responsibilities && role.responsibilities.length > 0 ? (
                                                                        role.responsibilities.map((responsibility, respIndex) => (
                                                                            <li key={respIndex} className="flex items-start gap-2 text-sm text-gray-700">
                                                                                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                                                                                {responsibility}
                                                                            </li>
                                                                        ))
                                                                    ) : (
                                                                        <li className="text-sm text-gray-500">Responsibilities will be updated soon.</li>
                                                                    )}
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Apply Section - Only show for students and if active */}
                                                    {isStudent && (
                                                        <>
                                                            <Separator />
                                                            <div className="space-y-4">
                                                                <div className="flex flex-wrap gap-4">
                                                                    {jobData.links?.company_link && (
                                                                        <Button variant="outline" asChild>
                                                                            <a href={jobData.links.company_link} target="_blank" rel="noopener noreferrer">
                                                                                <ExternalLink className="h-4 w-4 mr-2" />
                                                                                Company Portal
                                                                            </a>
                                                                        </Button>
                                                                    )}
                                                                    {jobData.links?.college_link && (
                                                                        <Button variant="outline" asChild>
                                                                            <a href={jobData.links.college_link} target="_blank" rel="noopener noreferrer">
                                                                                <ExternalLink className="h-4 w-4 mr-2" />
                                                                                College Portal
                                                                            </a>
                                                                        </Button>
                                                                    )}
                                                                    {!jobData.links && (isUnpublished || isUnassigned) && (
                                                                        <div className="text-sm text-gray-500">
                                                                            Application links will be available once details are updated.
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </>
                                                    )}
                                                </CardContent>

                                            </Card>
                                            {!isStudent && (
                                                <>
                                                    {/* <Separator /> */}
                                                    <div className="space-y-4 mt-12">
                                                        <div className="text-center  border-gray-200">
                                                            <Users className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                                                            <p className="text-gray-600 font-medium mb-2">Student Access Required</p>
                                                            <p className="text-sm text-gray-500">
                                                                Application links and apply functionality are available only to registered students.
                                                            </p>
                                                            {(isSuperuser || role === 'mentor') && (
                                                                <p className="text-xs text-blue-600 mt-2">
                                                                    You can manage this position from the admin panel.
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </>
                                            )}
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious className="-left-4" />
                                <CarouselNext className="-right-4" />
                            </Carousel>
                        </CardContent>
                    </Card>
                )}

                {/* Job Details */}
                {jobData.job_details && (
                    <Card className="rounded-none">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Award className="h-5 w-5 text-blue-600" />
                                Job Details
                                {isUnpublished && (
                                    <Badge variant="outline" className="text-xs">
                                        <Clock3 className="h-3 w-3 mr-1" />
                                        Being Updated
                                    </Badge>
                                )}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div className="flex text-xs sm:text-sm items-center gap-3 sm:p-3 p-2 bg-gray-50 rounded-lg">
                                    <MapPin className="h-5 w-5 text-gray-600" />
                                    <div>
                                        <p className="text-gray-600">Location</p>
                                        <p className="font-medium">{jobData.job_details.job_location || 'To be announced'}</p>
                                    </div>
                                </div>

                                <div className="flex text-xs sm:text-sm items-center gap-3 sm:p-3 p-2 bg-gray-50 rounded-lg">
                                    <Clock className="h-5 w-5 text-gray-600" />
                                    <div>
                                        <p className="text-gray-600">Shift Timing</p>
                                        <p className="font-medium">{jobData.job_details.shift_timing || 'Will be initimated By the Company'}</p>
                                    </div>
                                </div>

                                <div className="flex text-xs sm:text-sm items-center gap-3 sm:p-3 p-2 bg-gray-50 rounded-lg">
                                    <Calendar className="h-5 w-5 text-gray-600" />
                                    <div>
                                        <p className="text-gray-600">Joining Date</p>
                                        <p className="font-medium">{jobData.job_details.date_of_joining || 'Will be initimated By the Company'}</p>
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            <div>
                                <h4 className="font-semibold text-gray-900 mb-4">Placement Process</h4>
                                {jobData.job_details.placement_process && jobData.job_details.placement_process.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                        {jobData.job_details.placement_process.map((step, index) => (
                                            <div key={index} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                                                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                                    {index + 1}
                                                </div>
                                                <span className="text-sm font-medium text-blue-900">{step}</span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-500">Placement process details will be updated soon.</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
}