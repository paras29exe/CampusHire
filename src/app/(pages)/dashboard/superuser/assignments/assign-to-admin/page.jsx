"use client"

import { useState, useEffect, } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import { ArrowLeft, Calendar, Globe, IndianRupee, Users } from "lucide-react"
import axios from "axios"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader } from "@/components/ui/dialog"
import { toast } from "sonner"
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog"

export default function page() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const jobId = searchParams.get("jobId")
    const [job, setJob] = useState(null)
    const [admins, setAdmins] = useState([])
    const [selected, setSelected] = useState([])
    const [loading, setLoading] = useState(true)
    const [dialogOpen, setDialogOpen] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [jobResponse, adminsResponse] = await Promise.all([
                    axios.get(`/api/views/job-description?jobId=${jobId}`),
                    axios.get('/api/shared/views/admins-data')
                ])
                console.log("Job Data:", jobResponse.data.data)
                console.log("Admins Data:", adminsResponse.data.data)
                setJob(jobResponse.data.data)
                setAdmins(adminsResponse.data.data)
            } catch (error) {
                console.error("Error fetching job or admins data:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [jobId])

    const handleSelect = (id) => {
        setSelected(prev =>
            prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
        )
    }

    const handleConfirm = () => {
        if (selected.length === 0) {
            toast("Missing details.", {
                description: "Please select at least one admin to assign this job.",
                style: { backgroundColor: "#f8d7da", color: "#721c24" },
                action: { label: "OK" }
            })
        }
        else {
            setDialogOpen(true)
        }
    }

    const confirmAssignment = async () => {
        if (!selected.length)
            return toast("Please select at least one admin to assign this job.", {
                style: { backgroundColor: "#f8d7da", color: "#721c24" },
                action: { label: "OK" }
            })

        setLoading(true)
        try {
            await axios.post(`/api/superuser/jobs/assign-job-to-admins?jobId=${jobId}`, {
                adminIds: selected
            })
            router.push(`/dashboard/superuser/assignments/assigned`)
            toast("Job assigned successfully!")
        } catch (error) {
            console.error("Error assigning job:", error)
            toast("Failed to assign job. Please try again.", {
                style: { backgroundColor: "#f8d7da", color: "#721c24" },
                action: { label: "OK" }
            })
        } finally {
            setLoading(false)
        }

    }

    const formatDate = d => new Date(d).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })

    if (loading) return (
        <div className="min-h-screen flex flex-col gap-y-3 items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-3 border-blue-600"></div>
        </div>
    )

    return (
        <div className="container mx-auto p-4 sm:p-6">
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Are you sure you want to assign this drive?</DialogTitle>
                        <DialogDescription>
                            This action will assign the job to the selected admins. They will be able to manage this job and its applicants.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline" onClick={() => setDialogOpen(false)}>
                                Cancel
                            </Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button
                                onClick={confirmAssignment}
                                className="bg-blue-600 hover:bg-blue-700 text-white"
                            >
                                Yes, I&apos;m sure
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <div className="flex flex-wrap items-center gap-x-4">
                <Button variant="ghost" onClick={() => router.back()} className="mb-6 flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" /> Back
                </Button>

                <h1 className="text-3xl font-bold mb-8">{`Assign Job: ${job.company.name}`}</h1>

            </div>

            <div className=" p-6 ">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                        {job.company.name[0]}
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold">{job.company.name}</h3>
                        <a href={job.company.website} target="_blank" className="text-blue-600 hover:underline flex gap-1">
                            <Globe className="h-4 w-4" /> Visit Website
                        </a>
                    </div>
                </div>

                <Separator className="my-4" />

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                    <Info icon={<Calendar />} label="Created" value={formatDate(job.createdAt)} />
                    <Info icon={<IndianRupee />} label="Package" value={job.job_details.package} />
                    <Info icon={<Users />} label="Roles" value={`${job.job_roles.length} Role(s)`} />
                </div>

                <div className="mt-4">
                    <h4 className="text-base font-semibold mb-2">Available Roles:</h4>
                    <div className="flex flex-wrap gap-2">
                        {job.job_roles.map(r => (
                            <Badge key={r._id} variant="secondary">{r.role}</Badge>
                        ))}
                    </div>
                </div>

                <Separator className="my-6" />

                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="w-full sm:w-auto">
                                Select Admins ({selected.length})
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-[250px] p-0">
                            <Command>
                                <CommandInput placeholder="Search admins..." />
                                <CommandList>
                                    <CommandEmpty>No admins found.</CommandEmpty>
                                    <CommandGroup>
                                        {admins.map(a => (
                                            <CommandItem key={a._id} onSelect={() => handleSelect(a._id)}>
                                                <Checkbox checked={selected.includes(a._id)} onCheckedChange={() => handleSelect(a._id)} />
                                                <Label className="ml-2">{`${a.name} (${a.employee_id})`}</Label>
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Button onClick={handleConfirm} className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
                        Confirm Assignment
                    </Button>
                </div>
            </div>
        </div>
    )
}

function Info({ icon, label, value }) {
    return (
        <div className="flex items-center gap-2">
            <div className="text-gray-500">{icon}</div>
            <div>
                <span className="text-gray-600">{label}:</span>
                <div className="font-semibold">{value}</div>
            </div>
        </div>
    )
}
