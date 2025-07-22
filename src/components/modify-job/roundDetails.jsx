"use client"

import React, { useState, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Upload, Users, FileText, ShieldAlertIcon } from "lucide-react"
import { format } from "date-fns"
import axios from "axios"
import { toast } from "sonner"

export default function RoundDetailsSection({ jobId, roles, setRoundDetailsValid, isPublished }) {
    const [roundDate, setRoundDate] = useState()
    const [selectAll, setSelectAll] = useState(false)
    const [uploadedFile, setUploadedFile] = useState(null)
    const [isDragOver, setIsDragOver] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [publishWithoutDetails, setPublishWithoutDetails] = useState(false)

    // State for all form fields
    const [roleId, setRoleId] = useState("")
    const [name, setName] = useState("")
    const [roundNumber, setRoundNumber] = useState("")
    const [roundType, setRoundType] = useState("online")
    const [time, setTime] = useState("")
    const [duration, setDuration] = useState("")
    const [link, setLink] = useState("")

    const resetForm = () => {
        setRoleId("")
        setName("")
        setRoundType("online")
        setTime("")
        setDuration("")
        setLink("")
        setRoundDate(undefined)
        setUploadedFile(null)
        setSelectAll(false)
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        // validations
        if (!roleId) {
            toast("Select a role to submit", { action: { label: "OK" } })
            return
        }
        if (!selectAll && !uploadedFile) {
            toast("Upload a file or select all", { action: { label: "OK" }, style: { background: "red", color: "white" } })
            return
        }

        setIsLoading(true)
        try {
            const formData = new FormData()
            formData.append("round_details", JSON.stringify({
                name,
                type: roundType,
                time,
                duration,
                link,
                date: roundDate,
            }))
            formData.append('select_all', selectAll)
            formData.append("shortlisted_candidates", uploadedFile);

            await axios.put(`/api/admin/jobs/${jobId}/modify-role-details/modify-round-details?roleId=${roleId}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            toast.success("Round details updated successfully", { style: { background: "#f0f4f8", color: "#333", }, action: { label: "OK" } })
            setRoundDetailsValid(true)
        } catch (err) {
            console.error(err)
            toast(err.response?.data?.message || "Failed to update round details", {
                style: { background: "#f8d7da", color: "#721c24", }
            })
        } finally {
            setIsLoading(false)
        }
    }

    const handleFileSelect = (e) => {
        setUploadedFile(e.target.files?.[0])
    }

    const handleDrop = useCallback((e) => {
        e.preventDefault()
        setIsDragOver(false)
        const file = e.dataTransfer.files[0]
        if (file?.type.includes("excel") || file?.type === "text/csv") {
            setUploadedFile(file)
        } else {
            toast("Upload CSV or Excel", { action: { label: "OK" } })
        }
    }, [])

    return (
        <Card>
            <CardHeader>
                <CardTitle>Update Round Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <form onSubmit={onSubmit} className="space-y-6">
                    {!isPublished &&
                        <div className="flex items-center space-x-2">
                         <Checkbox
                            id="without-details"
                            className={"border-black"}
                            checked={publishWithoutDetails}
                            onCheckedChange={(v) => {
                                setPublishWithoutDetails(v)
                                if (v) {
                                    setRoleId("")
                                    setRoundDetailsValid(true)
                                    resetForm()
                                }
                            }}
                        />
                        <Label htmlFor="without-details" className="flex items-center gap-2">
                            <ShieldAlertIcon className="h-4 w-4" /> Publish without Changes
                        </Label>
                    </div>}
                    {!publishWithoutDetails && (
                        <>
                            <div className="space-y-2">
                                <Label>Select Role</Label>
                                <select
                                    value={roleId}
                                    onChange={(e) => setRoleId(e.target.value)}
                                    className="w-full border rounded px-3 py-2"
                                >
                                    <option value="">Select a role</option>
                                    {roles.map((r) => (
                                        <option key={r._id} value={r._id}>
                                            {r.role}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {!roleId && (
                                <div className="text-center py-8 text-gray-500">
                                    <Users className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                                    <p>Please select a role to configure round details or Select Publish without details for listing it as Active Drive</p>
                                </div>
                            )}

                            {roleId && (
                                <>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Round Number *</Label>
                                            <Input value={roundNumber} required onChange={(e) => setRoundNumber(e.target.value)} placeholder="e.g., 1 or 2 or 3" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Round Name *</Label>
                                            <Input value={name} required onChange={(e) => setName(e.target.value)} placeholder="e.g., Technical Interview" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Round Type *</Label>
                                            <select
                                                value={roundType}
                                                onChange={(e) => setRoundType(e.target.value)}
                                                required
                                                className="w-full border rounded px-3 py-2"
                                            >
                                                <option value="online">Online</option>
                                                <option value="offline">Offline</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Date *</Label>
                                            <Input
                                                type="date"
                                                value={roundDate ? format(roundDate, "yyyy-MM-dd") : ""}
                                                onChange={(e) => setRoundDate(new Date(e.target.value))}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Time (optional)</Label>
                                            <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Duration(Optional)</Label>
                                            <Input placeholder='e.g. 1H 20min / 50min' value={duration} onChange={(e) => setDuration(e.target.value)} />
                                        </div>
                                        {roundType === "online" && (
                                            <div className="space-y-2">
                                                <Label>Round Link(If Available)</Label>
                                                <Input type="url" value={link} onChange={(e) => setLink(e.target.value)} />
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-4">
                                        <Label className="text-base font-semibold">Shortlisted Students *</Label>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="select-all"
                                                className=" border-black"
                                                checked={selectAll}
                                                onCheckedChange={(v) => {
                                                    setSelectAll(v)
                                                    if (v) setUploadedFile(null)
                                                }}
                                            />
                                            <Label htmlFor="select-all" className="flex items-center gap-2">
                                                <Users className="h-4 w-4" /> Select All Students
                                            </Label>
                                        </div>

                                        {!selectAll && (
                                            <div className="space-y-2">
                                                <Label>Upload File</Label>
                                                <div
                                                    className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${isDragOver ? "border-blue-500 bg-blue-100" : "border-gray-300"
                                                        }`}
                                                    onDragOver={(e) => {
                                                        e.preventDefault()
                                                        setIsDragOver(true)
                                                    }}
                                                    onDragLeave={(e) => {
                                                        e.preventDefault()
                                                        setIsDragOver(false)
                                                    }}
                                                    onDrop={handleDrop}
                                                >
                                                    <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                                                    <div className="text-sm text-gray-600">
                                                        Drag & drop CSV/Excel file, or{" "}
                                                        <label className="text-blue-600 hover:text-blue-800 cursor-pointer">
                                                            browse
                                                            <input
                                                                id="file-input"
                                                                type="file"
                                                                className="hidden"
                                                                accept=".csv,.xlsx,.xls"
                                                                onChange={handleFileSelect}
                                                            />
                                                        </label>
                                                        <h2 className="mt-2"> <strong>Note: File must have a field named "roll number" exactly in all small characters</strong></h2>
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
                        </>
                    )}

                </form>
            </CardContent>
        </Card>
    )
}
