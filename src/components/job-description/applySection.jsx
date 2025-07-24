'use client';

import React, { useMemo, useState } from 'react';
import { ExternalLink, FileText, X } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

export default function ApplySection({
    isStudent = false,
    isApplicationOpen = true,
    isUnpublished = false,
    isUnassigned = false,
    jobId = '',
    jobLinks = {},
    roleData = {},
}) {
    const [acknowledged, setAcknowledged] = useState(false);
    const [isApplying, setIsApplying] = useState(false);
    const [disableApply, setDisableApply] = useState(false);

    const handleApplyToRole = async (roleId) => {
        if (!acknowledged) {
            toast("Please acknowledge that you have filled all required details before applying.", {
                style: { backgroundColor: 'red', color: 'white' },
            })
            return
        }
        try {
            setIsApplying(true)
            console.log("Applying to role:", roleId);
            console.log("Job ID:", jobId);

            await axios.post('/api/student/apply', {
                jobId: jobId,
                roleId: roleId,
            })
            toast("Application submitted successfully!", {
                style: { backgroundColor: 'green', color: 'white' },
            })
            setDisableApply(true)
        } catch (error) {
            console.error("Error applying to role:", error.response?.data?.message || error.message);
            toast("An error occurred while applying. Please try again later.", {
                style: { backgroundColor: 'red', color: 'white' },
            })
        } finally {
            setIsApplying(false)
        }
    }

    // Don't show section if user is not a student
    if (!isStudent) return null;

    const hasJobLinks = useMemo(() => jobLinks?.company_link || jobLinks?.college_link, [jobLinks])
    const showApplicationLinks = useMemo(() => isApplicationOpen && hasJobLinks && !isUnpublished && !isUnassigned, [isApplicationOpen, hasJobLinks, isUnpublished, isUnassigned]);
    const hasAlreadyApplied = useMemo(() => (roleData?.status), [roleData]);

    return (
        <div className="space-y-4">
            <Separator />
            {/* Header */}
            <div>
                <div className='flex items-center gap-2'>
                    <FileText className="w-4 h-4" /> <h2 className="text-lg font-bold">Apply Section</h2>
                </div>
                <p className="text-sm mt-1 text-gray-600">
                    Each Section is Mandatory to fill or you will be Blacklisted
                </p>
            </div>

            <Separator />

            <div className="space-y-6">
                {/* Application Closed */}
                {!isApplicationOpen && (
                    <div className="text-sm text-red-600">
                        <X className="aspect-square w-6 inline-block mr-1" />
                        No more Accepting Applications.
                    </div>
                )}

                {/* Links Not Available */}
                {isApplicationOpen && (!hasJobLinks || isUnpublished || isUnassigned) && (
                    <div className="text-sm text-gray-500">
                        Application links will be available once details are updated.
                    </div>
                )}

                {/* Application Available */}
                {showApplicationLinks && !hasAlreadyApplied && (
                    <>
                        {/* Portal Links */}
                        <div className="flex gap-4 flex-wrap">
                            {jobLinks.company_link && (
                                <a
                                    href={jobLinks.company_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                                >
                                    <ExternalLink className="h-4 w-4 mr-2" />
                                    Company Portal
                                </a>
                            )}

                            {jobLinks.college_link && (
                                <a
                                    href={jobLinks.college_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                                >
                                    <ExternalLink className="h-4 w-4 mr-2" />
                                    College Portal
                                </a>
                            )}
                        </div>

                        {/* Acknowledgment and Submit */}
                        <div className="space-y-4">
                            <div className="flex items-start">
                                <input
                                    type="checkbox"
                                    id={`apply-checkbox-${roleData._id}`}
                                    disabled={isApplying || disableApply}
                                    className="mt-1 mr-3 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    checked={acknowledged}
                                    onChange={(e) => setAcknowledged(e.target.checked)}
                                />
                                <label
                                    htmlFor={`apply-checkbox-${roleData._id}`}
                                    className="text-sm text-gray-700 leading-relaxed"
                                >
                                    I acknowledge that I have filled all the required details in above given Portals.
                                    In case of any discrepancies, I will be responsible for the consequences.
                                </label>
                            </div>

                            <Button
                                className="bg-blue-600 hover:bg-blue-700"
                                disabled={!acknowledged || isApplying || disableApply}
                                onClick={() => handleApplyToRole(roleData._id)}
                            >
                                {isApplying ? 'Submitting...' : 'Submit my application'}
                            </Button>
                        </div>
                    </>
                )}

                {/* Already Applied */}
                {hasAlreadyApplied && (
                    <div className="p-4 bg-gray-50 rounded-md">
                        <p className="text-gray-700">
                            You have already applied for this role. Your application status is:{' '}
                            <span className="font-semibold text-gray-900">
                                {roleData.status.toUpperCase()}
                            </span>
                        </p>
                    </div>
                )}
            </div>
        </div >
    );
};
