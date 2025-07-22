'use client';

import { Button } from "@/components/ui/button";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "sonner";

export default function ReviewStipendPackage({ parsedData, setPackageSaved = () => { } }) {
    // parsedData.job_roles = [{ role: '', package_details: { stipend: '', package: '' } }]
    // parsedData.job_details.package = "some overall package text"
    const [jobRoles, setJobRoles] = useState(parsedData.job_roles || []);
    const [overallPackage, setOverallPackage] = useState(parsedData.job_details?.package || "");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [actionMessage, setActionMessage] = useState("");

    const handleChange = (index, field, value) => {
        const updated = [...jobRoles];
        updated[index] = {
            ...updated[index],
            package_details: {
                ...updated[index].package_details,
                [field]: value
            }
        };
        setJobRoles(updated);
    };

    const handleSave = async () => {
        try {
            setIsSubmitting(true);
            await axios.put('/api/shared/jobs/update-package', {
                jobRoles,
                jobDetails: {
                    ...parsedData.job_details,
                    package: overallPackage
                }
            }, {
                params: { jobId: parsedData._id }
            });
            toast.success("Package details saved successfully!", { style: { backgroundColor: 'green', color: 'white' } });
            setActionMessage("✅ Package details saved successfully.");
            setPackageSaved(true);
        } catch (error) {
            console.error("Error saving package details:", error);
            toast.error("Failed to update package details.", { style: { backgroundColor: 'red', color: 'white' } });
            setActionMessage("❌ Failed to update package details.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="p-6 space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Review Stipend & Package Details</h1>
                <p className="text-gray-600">Please review and edit the stipend and package details for each role before saving.</p>
            </div>

            {/* Overall package input */}
            <div className="p-4 rounded-2xl shadow bg-white space-y-4">
                <h2 className="text-lg font-semibold">Overall Package</h2>
                <label className="block text-sm font-medium text-gray-700 mb-1">Overall Package Amount / Range</label>
                <input
                    type="text"
                    className="bg-transparent p-2 pr-8 text-sm outline outline-border rounded-sm w-full focus-within:outline-blue-500 focus-within:outline-2"
                    value={overallPackage}
                    onChange={(e) => setOverallPackage(e.target.value)}
                    placeholder="e.g. 6-10 LPA"
                />
            </div>

            <div>
                {/* Individual role-wise package details */}
                <h2 className="text-lg font-semibold pl-4">Role Wise Package</h2>
                <div className="space-y-6">
                    {jobRoles.map((roleObj, index) => (
                        <div key={roleObj._id || index} className="p-4 rounded-2xl shadow bg-white space-y-4">
                            <h2 className="text-lg font-semibold">{index + 1}. {roleObj.role}</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Stipend</label>
                                    <input
                                        type="text"
                                        className="bg-transparent p-2 pr-8 text-sm outline outline-border rounded-sm w-full focus-within:outline-blue-500 focus-within:outline-2"
                                        value={roleObj.package_details.stipend || ""}
                                        onChange={(e) => handleChange(index, "stipend", e.target.value)}
                                        placeholder="e.g. ₹25000/month"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Package</label>
                                    <input
                                        type="text"
                                        className="bg-transparent p-2 pr-8 text-sm outline outline-border rounded-sm w-full focus-within:outline-blue-500 focus-within:outline-2"
                                        value={roleObj.package_details.package || ""}
                                        onChange={(e) => handleChange(index, "package", e.target.value)}
                                        placeholder="e.g. 6 LPA"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


            <div className="flex gap-x-2 justify-end">
                <Button
                    type="button"
                    onClick={handleSave}
                    disabled={isSubmitting}
                    className="ml-auto cursor-pointer"
                >
                    {isSubmitting ? "Saving..." : "Save Details"}
                </Button>
                <Button
                    type="button"
                    onClick={() => {
                        toast("You can Continue to next Step.", { style: { backgroundColor: "green", color: "white" } });
                        setActionMessage("✅ You marked details as already correct.");
                        setPackageSaved(true);
                    }}
                    disabled={isSubmitting}
                    className="bg-green-600 hover:bg-green-700"
                >
                    Already Correct
                </Button>
            </div>

            {actionMessage && (
                <>
                    <p className="text-sm text-foreground font-medium ml-auto w-fit mt-2 mb-0">{actionMessage}</p>
                    {actionMessage.includes("successfully") && (
                        <p className="text-sm text-foreground font-medium ml-auto w-fit my-0">Continue to next Step</p>
                    )}
                </>
            )}
        </div>
    );
}
