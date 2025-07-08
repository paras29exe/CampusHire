"use client"

import React, { useCallback, useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Upload, Calendar, Users, FileText } from "lucide-react"
import { format } from "date-fns"
// import { useToast } from "@/hooks/use-toast"

export default function RoundDetailsSection({ jobId, roles }) {
    // const { toast } = useToast()
    const [roundDate, setRoundDate] = useState()
    const [selectAll, setSelectAll] = useState(false)
    const [uploadedFile, setUploadedFile] = useState(null)
    const [isDragOver, setIsDragOver] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [selectedRoleId, setSelectedRoleId] = useState("")

    const {
        register,
        handleSubmit,
        watch,
        reset,
        setValue,
        formState: { errors },
    } = useForm({ defaultValues: { roundType: "online" } })

    const onSubmit = async (data) => {
        // if (!data.roleId) return toast({ title: "Error", description: "Select a role", variant: "destructive" })
        // if (!roundDate) return toast({ title: "Error", description: "Pick a date", variant: "destructive" })
        // if (!selectAll && !uploadedFile) return toast({ title: "Error", description: "Upload a file or select all", variant: "destructive" })

        setIsLoading(true)
        try {
            await fetch(`/api/jobs/${jobId}/roles/${data.roleId}/round`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...data, date: roundDate.toISOString() }),
            })

            if (selectAll) {
                await fetch(`/api/jobs/${jobId}/roles/${data.roleId}/shortlist-all`, { method: "PUT" })
            } else {
                const formData = new FormData()
                formData.append("file", uploadedFile)
                await fetch(`/api/jobs/${jobId}/roles/${data.roleId}/shortlist-upload`, {
                    method: "PUT",
                    body: formData,
                })
            }

            // toast({ title: "Success", description: "Round details updated" })
            reset()
            setRoundDate(undefined)
            setUploadedFile(null)
            setSelectAll(false)
        } catch {
            // toast({ title: "Error", description: "Something went wrong", variant: "destructive" })
        } finally {
            setIsLoading(false)
        }
    }

    const handleFileSelect = (e) => setUploadedFile(e.target.files?.[0])

    const handleDrop = useCallback((e) => {
        e.preventDefault()
        setIsDragOver(false)
        const file = e.dataTransfer.files[0]
        if (file?.type.includes("excel") || file?.type === "text/csv") setUploadedFile(file)
        // else toast({ title: "Invalid file", description: "Upload CSV or Excel", variant: "destructive" })
    }, [])

    return (
        <Card>
            <CardHeader>
                <CardTitle>Round Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                        <Label>Select Role</Label>
                        <select {...register("roleId", { required: true })} className="w-full border rounded px-3 py-2">
                            <option value="" defaultChecked>Select a role</option>
                            {roles.map((r) => (
                                <option key={r._id} value={r._id}>{r.role}</option>
                            ))}
                        </select>
                    </div>

                    {/* Show message when no role is selected */}
                    {!watch('roleId') && (
                        <div className="text-center py-8 text-gray-500">
                            <Users className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                            <p>Please select a role to configure round details</p>
                        </div>
                    )}


                    {watch('roleId') && (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Round Name</Label>
                                    <Input {...register("name", { required: true })} placeholder="e.g., Technical Interview" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Round Type</Label>
                                    <select {...register("roundType", { required: true })} className="w-full border rounded px-3 py-2">
                                        <option value="online">Online</option>
                                        <option value="offline">Offline</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Date</Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button type="button" variant="outline" className="w-full justify-start">
                                                <Calendar className="mr-2 h-4 w-4" />
                                                {roundDate ? format(roundDate, "PPP") : "Pick a date"}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <CalendarComponent mode="single" selected={roundDate} onSelect={setRoundDate} initialFocus />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <div className="space-y-2">
                                    <Label>Time</Label>
                                    <Input type="time" {...register("time", { required: true })} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Duration (minutes)</Label>
                                    <Input type="number" {...register("duration", { required: true })} />
                                </div>
                                {watch("roundType") === "online" && (
                                    <div className="space-y-2">
                                        <Label>Round Link</Label>
                                        <Input type="url" {...register("link", { required: true })} />
                                    </div>
                                )}
                            </div>

                            <div className="space-y-4">
                                <Label className="text-base font-semibold">Shortlisted Students *</Label>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="select-all" checked={selectAll} onCheckedChange={(v) => { setSelectAll(v); if (v) setUploadedFile(null) }} />
                                    <Label htmlFor="select-all" className="flex items-center gap-2">
                                        <Users className="h-4 w-4" /> Select All Students
                                    </Label>
                                </div>

                                {!selectAll && (
                                    <div className="space-y-2">
                                        <Label>Upload File</Label>
                                        <div
                                            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${isDragOver ? "border-blue-500 bg-blue-100" : "border-gray-300"}`}
                                            onDragOver={(e) => { e.preventDefault(); setIsDragOver(true) }}
                                            onDragLeave={(e) => { e.preventDefault(); setIsDragOver(false) }}
                                            onDrop={handleDrop}
                                        >
                                            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                                            <div className="text-sm text-gray-600">
                                                Drag & drop your CSV/Excel file, or {" "}
                                                <label className="text-blue-600 hover:text-blue-800 cursor-pointer">
                                                    browse<input type="file" className="hidden" accept=".csv,.xlsx,.xls" onChange={handleFileSelect} />
                                                </label>
                                            </div>
                                            {uploadedFile && (
                                                <div className="mt-4 flex justify-center gap-2 text-sm text-green-600">
                                                    <FileText className="h-4 w-4" /> {uploadedFile.name}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <Button type="submit" disabled={isLoading} className="w-full">
                                {isLoading ? "Saving..." : "Save Round Details"}
                            </Button>
                        </>
                    )}
                </form>
            </CardContent>
        </Card>
    )
}
