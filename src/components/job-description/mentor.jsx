import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User, AlertCircle } from "lucide-react"

export default function MentorsSection({ assignedTo, isUnassigned, isSuperuser, router }) {
    if (isUnassigned) {
        return (
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
        )
    }

    if (!assignedTo || assignedTo.length === 0) return null

    return (
        <Card className="rounded-none">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-blue-600" />
                    Mentors to Contact
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {assignedTo.map((mentor, index) => (
                        <div key={mentor._id || index} onClick={() => router.push(`/view-user?role=admin&uid=${mentor._id}`)} className="flex items-center gap-3 sm:px-4 bg-gray-50 rounded-lg cursor-pointer">
                            <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                                {mentor?.name?.split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                            </div>
                            <div>
                                <p className="font-medium text-sm sm:text-base text-gray-900">{mentor.name}</p>
                                <p className="text-xs sm:text-sm text-gray-600">{mentor.department || 'N/A'} Department</p>
                                <a href={`mailto:${mentor.email}`} className="text-sm text-blue-600 hover:text-blue-800" onClick={(e) => e.stopPropagation()}>
                                    {mentor.email}
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}