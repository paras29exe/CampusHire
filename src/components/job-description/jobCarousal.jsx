'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Users, Clock3, ExternalLink, LinkIcon } from "lucide-react"
import { formatDate } from "@/utils/client/formatDate"
import ApplySection from "./applySection"

export default function JobRolesCarousel({
    jobRoles,
    jobId,
    isUnpublished,
    isStudent,
    isApplicationOpen,
    jobLinks,
    isUnassigned,
    role // Added role for student/superuser/mentor check
}) {

    const formatTime = (timeString) => {
        if (!timeString) return 'To be Updated'
        const [hours, minutes] = timeString.split(":")
        const hour = Number.parseInt(hours)
        const ampm = hour >= 12 ? "PM" : "AM"
        const displayHour = hour % 12 || 12
        return `${displayHour}:${minutes} ${ampm}`
    }


    return (
        <Card className="rounded-none">
            <CardHeader>
                <CardTitle className="flex text-xl sm:text-2xl items-center gap-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    Available Positions ({jobRoles.length})
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
                        {jobRoles.map((roleData, index) => (
                            <CarouselItem key={roleData._id}>
                                <Card className="border-2 border-blue-100">
                                    <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                                        <CardTitle className="text-2xl text-blue-900">{`0${index + 1} - ${roleData.role}`}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-6 space-y-6">
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                            {/* Left Column */}
                                            <div className="space-y-4">
                                                {/* Package Details */}
                                                <div>
                                                    <h4 className="font-semibold text-gray-900 mb-3">Package Details</h4>
                                                    {roleData.package_details ? (
                                                        <div className="space-y-2 bg-green-50 p-4 rounded-lg border border-green-200">
                                                            <div className="flex justify-between">
                                                                <span className="text-sm text-gray-600">Internship Period:</span>
                                                                <span className="font-medium">{roleData.package_details.internship_period || 'To be announced'}</span>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <span className="text-sm text-gray-600">Stipend:</span>
                                                                <span className="font-medium text-green-700">
                                                                    {roleData.package_details.stipend ? `${roleData.package_details.stipend}` : 'To be announced'}
                                                                </span>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <span className="text-sm text-gray-600">Full-time Package:</span>
                                                                <span className="font-bold text-green-700">{roleData.package_details.package || 'To be announced'}</span>
                                                            </div>
                                                            {roleData.package_details.conditions && (
                                                                <div className="pt-2 border-t border-green-200">
                                                                    <span className="text-xs text-red-600">
                                                                        <strong>Condition:</strong> {roleData.package_details.conditions}
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
                                                    {roleData.round_details ? (
                                                        <div className="space-y-2 bg-orange-50 p-4 rounded-lg border border-orange-200">
                                                            <div className="flex justify-between">
                                                                <span className="text-sm text-gray-600">Round:</span>
                                                                <span className="font-medium">{roleData.round_details.name || 'To be announced'}</span>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <span className="text-sm text-gray-600">Type:</span>
                                                                <Badge variant="outline" className="text-xs capitalize">
                                                                    {roleData.round_details.type || 'To be announced'}
                                                                </Badge>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <span className="text-sm text-gray-600">Date</span>
                                                                <span className="font-medium">
                                                                    {formatDate(roleData?.round_details.date) || 'To be Updated'}
                                                                </span>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <span className="text-sm text-gray-600">Time</span>
                                                                <span className="font-medium">
                                                                    {formatTime(roleData?.round_details.time) || 'To be Updated'}
                                                                </span>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <span className="text-sm text-gray-600">Duration:</span>
                                                                <span className="font-medium">{roleData.round_details.duration || 'To be announced'}</span>
                                                            </div>
                                                            {roleData.round_details.link && (
                                                                <div className="pt-2 border-t border-orange-200">
                                                                    <a
                                                                        href={roleData.round_details.link}
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
                                                        {roleData.skills_required && roleData.skills_required.length > 0 ? (
                                                            roleData.skills_required.map((skill, skillIndex) => (
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
                                                        {roleData.responsibilities && roleData.responsibilities.length > 0 ? (
                                                            roleData.responsibilities.map((responsibility, respIndex) => (
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
                                        <ApplySection
                                            key={roleData._id}
                                            isStudent={isStudent}
                                            isApplicationOpen={isApplicationOpen}
                                            isUnassigned={isUnassigned}
                                            isUnpublished={isUnpublished}
                                            jobId={jobId}
                                            jobLinks={jobLinks}
                                            roleData={roleData}
                                        />
                                    </CardContent>
                                </Card>

                                {!isStudent && (
                                    <div className="space-y-4 mt-12">
                                        <div className="text-center  border-gray-200">
                                            <Users className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                                            <p className="text-gray-600 font-medium mb-2">Student Access Required</p>
                                            <p className="text-sm text-gray-500">
                                                Application links and apply functionality are available only to registered students.
                                            </p>
                                            {(role === 'superuser' || role === 'mentor') && (
                                                <p className="text-xs text-blue-600 mt-2">
                                                    You can manage this position from the admin panel.
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="-left-4" />
                    <CarouselNext className="-right-4" />
                </Carousel>
            </CardContent>
        </Card>
    )
}