"use client"
import { ExternalLink, MapPin, Clock, Calendar, Users, GraduationCap, Award, User, LinkIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { formatDate } from "@/utils/client/formatDate"
import Link from "next/link"

export default function JobDescriptionPage({ jobData }) {
    // const jobData = {
    //     company: {
    //         name: "Microsoft India",
    //         website: "https://careers.microsoft.com",
    //     },
    //     eligibility_criteria: {
    //         batch: ["2024", "2025"], // Array of strings
    //         courses: {
    //             "B.Tech": ["Computer Science", "Information Technology", "Electronics", "AIDS", "Data Science"],
    //             "M.Tech": ["Computer Science", "Software Engineering"],
    //             MCA: ["MCA"], // null means all branches
    //             "B.Sc": ["Computer Science", "Information Technology"],
    //         },
    //         cgpa: 7.5, // Number
    //     },
    //     job_roles: [
    //         {
    //             _id: "role1",
    //             role: "Software Development Engineer",
    //             skills_required: ["JavaScript", "React", "Node.js", "Python", "SQL", "Git", "AWS"],
    //             responsibilities: [
    //                 "Develop and maintain web applications using modern frameworks",
    //                 "Collaborate with cross-functional teams to deliver high-quality software",
    //                 "Write clean, maintainable, and efficient code",
    //                 "Participate in code reviews and technical discussions",
    //                 "Debug and resolve technical issues",
    //             ],
    //             package_details: {
    //                 internship_period: "6 months",
    //                 stipend: "50000",
    //                 package: "12-15",
    //                 conditions: "Performance-based increment after probation period",
    //             },
    //             round_details: {
    //                 name: "Technical Interview",
    //                 type: "online",
    //                 date: "2024-02-15",
    //                 time: "10:00",
    //                 duration: "60 minutes",
    //                 link: "https://teams.microsoft.com/interview-link-1",
    //             },
    //         },
    //         {
    //             _id: "role2",
    //             role: "Data Scientist",
    //             skills_required: ["Python", "R", "Machine Learning", "SQL", "Tableau", "Statistics", "TensorFlow"],
    //             responsibilities: [
    //                 "Analyze large datasets to extract meaningful insights",
    //                 "Build and deploy machine learning models",
    //                 "Create data visualizations and reports",
    //                 "Collaborate with business teams to understand requirements",
    //                 "Optimize data processing pipelines",
    //             ],
    //             package_details: {
    //                 internship_period: "6 months",
    //                 stipend: "55000",
    //                 package: "14-18",
    //                 conditions: "Certification in relevant technologies preferred",
    //             },
    //             round_details: {
    //                 name: "Case Study Round",
    //                 type: "offline",
    //                 date: "2024-02-18",
    //                 time: "14:00",
    //                 duration: "90 minutes",
    //                 link: null,
    //             },
    //         },
    //         {
    //             _id: "role3",
    //             role: "Product Manager",
    //             skills_required: ["Product Strategy", "Market Research", "Analytics", "Communication", "Agile", "SQL"],
    //             responsibilities: [
    //                 "Define product roadmap and strategy",
    //                 "Conduct market research and competitive analysis",
    //                 "Work with engineering teams to deliver features",
    //                 "Analyze product metrics and user feedback",
    //                 "Coordinate with stakeholders across departments",
    //             ],
    //             package_details: {
    //                 internship_period: "6 months",
    //                 stipend: "60000",
    //                 package: "15-20",
    //                 conditions: "MBA preferred but not mandatory",
    //             },
    //             round_details: {
    //                 name: "HR Interview",
    //                 type: "online",
    //                 date: "2024-02-20",
    //                 time: "11:30",
    //                 duration: "45 minutes",
    //                 link: "https://zoom.us/interview-link-3",
    //             },
    //         },
    //     ],
    //     job_details: {
    //         job_location: "Bangalore, Hyderabad, Mumbai",
    //         shift_timing: "9:00 AM - 6:00 PM (Flexible working hours)",
    //         date_of_joining: "July 2024",
    //         placement_process: [
    //             "Online Application Screening",
    //             "Online Assessment Test",
    //             "Technical Interview Round 1",
    //             "Technical Interview Round 2",
    //             "HR Interview",
    //             "Final Selection",
    //         ],
    //     },
    //     assigned_to: [
    //         { _id: "mentor1", name: "Dr. Rajesh Kumar", email: "rajesh.kumar@college.edu", department: "CSE" },
    //         { _id: "mentor2", name: "Prof. Priya Sharma", email: "priya.sharma@college.edu", department: "IT" },
    //     ],
    //     links: {
    //         company_link: "https://careers.microsoft.com/apply/sde-2024",
    //         college_link: "https://college.edu/placements/microsoft-2024",
    //     },
    //     last_date_to_apply: "2024-02-10",
    //     status: "active",
    // }

    const handleApplyToRole = (roleId, roleName) => {
        window.location.href = `/apply/role/${roleId}?company=${jobData.company.name.toLowerCase().replace(/\s+/g, "-")}&role=${roleName.toLowerCase().replace(/\s+/g, "-")}`
    }


    const formatTime = (timeString) => {
        // const [hours, minutes] = timeString.split(":")
        // const hour = Number.parseInt(hours)
        // const ampm = hour >= 12 ? "PM" : "AM"
        // const displayHour = hour % 12 || 12
        // return `${displayHour}:${minutes} ${ampm}`
        return true
    }

    const isApplicationOpen = () => {
        return new Date() <= new Date(jobData.last_date_to_apply)
    }

    return (
        <div className="bg-primary-foreground">
            {/* Header Section */}
            <div className="bg-primary-foreground border-b shadow-sm">
                <div className="max-w-6xl mx-auto px-6 py-8">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                                    {jobData.company.name.charAt(0)}
                                </div>
                                <div>
                                    <h1 className="text-lg sm:text-3xl font-bold text-gray-900">{jobData.company.name}</h1>
                                    <Link
                                        href={jobData.company.website}
                                        
                                        className="text-blue-600 hover:text-blue-800 text-xs sm:text-sm flex items-center gap-1 transition-colors"
                                    >
                                        <ExternalLink className="h-4 w-4" />
                                        Visit Company Website
                                    </Link>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <Badge className="bg-green-100 text-green-800 border-green-200 px-3 py-1">
                                    {jobData.job_roles.length} Positions Available
                                </Badge>
                                <Badge
                                    className={`px-3 py-1 ${isApplicationOpen() ? "bg-blue-100 text-blue-800 border-blue-200" : "bg-red-100 text-red-800 border-red-200"}`}
                                >
                                    {isApplicationOpen() ? "Applications Open" : "Applications Closed"}
                                </Badge>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-600">Last Date to Apply</p>
                            <p className={`font-bold text-lg ${isApplicationOpen() ? "text-green-600" : "text-red-600"}`}>
                                {formatDate(jobData.last_date_to_apply)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className=" mx-auto  py-8 space-y-8">
                {/* Eligibility Criteria */}
                <Card className="rounded-none">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <GraduationCap className="h-5 w-5 text-blue-600" />
                            Eligibility Criteria
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <h4 className="font-semibold text-sm text-gray-900">Eligible Batches</h4>
                                <div className="flex flex-wrap gap-2">
                                    {jobData.eligibility_criteria.batch.map((batch, index) => (
                                        <Badge key={index} variant="outline" className="text-sm">
                                            {batch}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <h4 className="font-semibold text-sm text-gray-900">Minimum CGPA</h4>
                                <Badge variant="outline" className="text-sm">
                                    {jobData.eligibility_criteria.cgpa}
                                </Badge>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <h4 className="font-semibold text-sm text-gray-900">Eligible Courses & Branches</h4>
                            <div className="space-x-3 space-y-3">
                                {Object.entries(jobData.eligibility_criteria.courses).map(([course, branches]) => {
                                    // If branches is null or same as course
                                    if (!branches || (branches.length === 1 && branches[0] === course)) {
                                        return (
                                            <Badge
                                                key={course}
                                                className="bg-blue-100 text-blue-800 border-blue-200 w-fit"
                                            >
                                                {course}
                                            </Badge>
                                        );
                                    }

                                    return branches.map((branch, index) => (
                                        <Badge
                                            key={`${course}-${branch}-${index}`}
                                            className="bg-blue-100 text-blue-800 border-blue-200 w-fit"
                                        >
                                            {`${course} - ${branch}`}
                                        </Badge>
                                    ));
                                })}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Mentors to Contact */}
                <Card className="rounded-none">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <User className="h-5 w-5 text-blue-600" />
                            Mentors to Contact
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {jobData.assigned_to.map((mentor) => (
                                <div key={mentor._id} className="flex items-center gap-3 sm:px-4 bg-gray-50 rounded-lg">
                                    <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                                        {mentor?.name?.split(" ")
                                            .map((n) => n[0])
                                            .join("")}
                                    </div>
                                    <div>
                                        <p className="font-medium text-sm sm:text-base text-gray-900">{mentor.name}</p>
                                        <p className="text-xs sm:text-sm text-gray-600">{mentor.department} Department</p>
                                        <a href={`mailto:${mentor.email}`} className="text-sm text-blue-600 hover:text-blue-800">
                                            {mentor.email}
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Job Roles Carousel */}
                <Card className="rounded-none">
                    <CardHeader>
                        <CardTitle className="flex text-xl sm:text-2xl items-center gap-2">
                            <Users className="h-5 w-5 text-blue-600" />
                            Available Positions ({jobData.job_roles.length})
                        </CardTitle>
                        <p className="sm:text-sm text-xs text-gray-600">Explore different roles and apply to the ones that match your interests</p>
                    </CardHeader>
                    <CardContent className="px-5 ">
                        <Carousel opts={{
                            align: "start",
                            // loop: true,
                        }} className="max-w-none">
                            <CarouselContent>
                                {jobData.job_roles.map((role, index) => (
                                    <CarouselItem key={role._id}>
                                        <Card className="border-2 border-blue-100">
                                            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                                                <CardTitle className="text-2xl text-blue-900">{ `0${index+1} - ${role.role}`}</CardTitle>
                                            </CardHeader>
                                            <CardContent className="p-6 space-y-6">
                                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                                    {/* Left Column */}
                                                    <div className="space-y-4">
                                                        <div>
                                                            <h4 className="font-semibold text-gray-900 mb-3">Package Details</h4>
                                                            <div className="space-y-2 bg-green-50 p-4 rounded-lg border border-green-200">
                                                                <div className="flex justify-between">
                                                                    <span className="text-sm text-gray-600">Internship Period:</span>
                                                                    <span className="font-medium">{role.package_details.internship_period}</span>
                                                                </div>
                                                                <div className="flex justify-between">
                                                                    <span className="text-sm text-gray-600">Stipend:</span>
                                                                    <span className="font-medium text-green-700">
                                                                        ₹{role.package_details.stipend}
                                                                    </span>
                                                                </div>
                                                                <div className="flex justify-between">
                                                                    <span className="text-sm text-gray-600">Full-time Package:</span>
                                                                    <span className="font-bold text-green-700">{role.package_details.package} </span>
                                                                </div>
                                                                {role.package_details.conditions && (
                                                                    <div className="pt-2 border-t border-green-200">
                                                                        <span className="text-xs text-green-600">{role.package_details.conditions}</span>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>

                                                        {/* Round Details */}
                                                        <div>
                                                            <h4 className="font-semibold text-gray-900 mb-3">Next Round Details</h4>
                                                            <div className="space-y-2 bg-orange-50 p-4 rounded-lg border border-orange-200">
                                                                <div className="flex justify-between">
                                                                    <span className="text-sm text-gray-600">Round:</span>
                                                                    <span className="font-medium">{role.round_details?.name}</span>
                                                                </div>
                                                                <div className="flex justify-between">
                                                                    <span className="text-sm text-gray-600">Type:</span>
                                                                    <Badge variant="outline" className="text-xs capitalize">
                                                                        {role.round_details?.type}
                                                                    </Badge>
                                                                </div>
                                                                <div className="flex justify-between">
                                                                    <span className="text-sm text-gray-600">Date & Time:</span>
                                                                    <span className="font-medium">
                                                                        {formatDate(role.round_details?.date)} at {formatTime(role.round_details?.time)}
                                                                    </span>
                                                                </div>
                                                                <div className="flex justify-between">
                                                                    <span className="text-sm text-gray-600">Duration:</span>
                                                                    <span className="font-medium">{role.round_details?.duration}</span>
                                                                </div>
                                                                {role.round_details?.link && (
                                                                    <div className="pt-2 border-t border-orange-200">
                                                                        <a
                                                                            href={role.round_details?.link}
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
                                                        </div>
                                                    </div>

                                                    {/* Right Column */}
                                                    <div className="space-y-6">
                                                        <div>
                                                            <h4 className="font-semibold text-gray-900 mb-3">Required Skills</h4>
                                                            <div className="flex flex-col flex-wrap gap-2">
                                                                {/* {role.skills_required.map((skill, skillIndex) => (
                                                                    <Badge key={skillIndex} variant="secondary" className="text-xs">
                                                                        {skill}
                                                                    </Badge>
                                                                ))} */}
                                                                {role.responsibilities.map((responsibility, respIndex) => (
                                                                    <li key={respIndex} className="flex items-start gap-2 text-sm text-gray-700">
                                                                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                                                                        {responsibility}
                                                                    </li>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <h4 className="font-semibold text-gray-900 mb-3">Key Responsibilities</h4>
                                                            <ul className="space-y-2">
                                                                {role.responsibilities.map((responsibility, respIndex) => (
                                                                    <li key={respIndex} className="flex items-start gap-2 text-sm text-gray-700">
                                                                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                                                                        {responsibility}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Apply Section for this Role */}
                                                <Separator />
                                                <div className="space-y-4">
                                                    <div className="flex flex-wrap gap-4">
                                                        <Button variant="outline" asChild>
                                                            <a href={jobData.links?.company_link} target="_blank" rel="noopener noreferrer">
                                                                <ExternalLink className="h-4 w-4 mr-2" />
                                                                Company Portal
                                                            </a>
                                                        </Button>
                                                        <Button variant="outline" asChild>
                                                            <a href={jobData.links?.college_link} target="_blank" rel="noopener noreferrer">
                                                                <ExternalLink className="h-4 w-4 mr-2" />
                                                                College Portal
                                                            </a>
                                                        </Button>
                                                        {/* <Button
                                                            onClick={() => handleApplyToRole(role._id, role.role)}
                                                            disabled={!isApplicationOpen()}
                                                            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400"
                                                        >
                                                            {isApplicationOpen() ? `Apply for ${role.role}` : "Applications Closed"}
                                                        </Button> */}
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="-left-4" />
                            <CarouselNext className="-right-4" />
                        </Carousel>
                    </CardContent>
                </Card>

                {/* Job Details */}
                <Card className="rounded-none">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Award className="h-5 w-5 text-blue-600" />
                            Job Details
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="flex text-xs sm:text-sm items-center gap-3 sm:p-3 p-2 bg-gray-50 rounded-lg">
                                <MapPin className="h-5 w-5 text-gray-600" />
                                <div>
                                    <p className="text-gray-600">Location</p>
                                    <p className="font-medium">{jobData.job_details.job_location}</p>
                                </div>
                            </div>

                            <div className="flex text-xs sm:text-sm items-center gap-3 sm:p-3 p-2 bg-gray-50 rounded-lg">
                                <Clock className="h-5 w-5 text-gray-600" />
                                <div>
                                    <p className="text-gray-600">Shift Timing</p>
                                    <p className="font-medium">{jobData.job_details.shift_timing}</p>
                                </div>
                            </div>

                            <div className="flex text-xs sm:text-sm items-center gap-3 sm:p-3 p-2 bg-gray-50 rounded-lg">
                                <Calendar className="h-5 w-5 text-gray-600" />
                                <div>
                                    <p className="text-gray-600">Joining Date</p>
                                    <p className="font-medium">{jobData.job_details.date_of_joining}</p>
                                </div>
                            </div>
                        </div>

                        <Separator />

                        <div>
                            <h4 className="font-semibold text-gray-900 mb-4">Placement Process</h4>
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
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
