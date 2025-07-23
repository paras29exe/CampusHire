import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/utils/client/formatDate"

export default function JobHeaderSection({ company, jobRolesCount, statusBadge, lastDateToApply, isApplicationOpen }) {
    return (
        <div className="bg-primary-foreground border-b shadow-sm">
            <div className=" mx-auto px-6 py-8">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                                {company.name.charAt(0)}
                            </div>
                            <div>
                                <h1 className="text-lg sm:text-3xl font-bold text-gray-900">{company.name}</h1>
                                {company.website && (
                                    <Link
                                        href={company.website}
                                        target="_blank"
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
                                {jobRolesCount} Positions Available
                            </Badge>
                            {statusBadge}
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-gray-600">Last Date to Apply</p>
                        <p className={`font-bold text-lg ${lastDateToApply
                            ? (isApplicationOpen ? "text-green-600" : "text-red-600")
                            : "text-gray-500"
                            }`}>
                            {lastDateToApply ? formatDate(lastDateToApply) : "To be announced"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}