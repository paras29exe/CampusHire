"use client"

import { useEffect, useState } from "react"
import { Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import { toast } from "sonner"
import axios from "axios"

export default function LinksDateSection({ jobId, initialData, onValidationChange }) {
  const [companyLink, setCompanyLink] = useState(initialData?.company_link || "")
  const [collegeLink, setCollegeLink] = useState(initialData?.college_link || "")
  const [lastDateToApply, setLastDateToApply] = useState(initialData?.last_date_to_apply ? new Date(initialData.last_date_to_apply) : null)
  const [loading, setLoading] = useState(false)

  const [errors, setErrors] = useState({
    companyLink: "",
    collegeLink: "",
    lastDateToApply: "",
  })

  const onSubmit = async (e) => {
    e.preventDefault()
    const errs = {
      companyLink: "",
      collegeLink: "",
      lastDateToApply: "",
    }

    const urlRegex = /^https?:\/\/.+/

    if (!urlRegex.test(companyLink.trim())) {
      errs.companyLink = "Enter a valid URL"
    }

    if (!urlRegex.test(collegeLink.trim())) {
      errs.collegeLink = "Enter a valid URL"
    }
    setErrors(errs)

    const valid = !errs.companyLink && !errs.collegeLink && !errs.lastDateToApply
    if (!valid) return

    setLoading(true)
    try {
      const res = await axios.put(`/api/admin/jobs/${jobId}/modify-links-and-date`, {
        company_link: companyLink,
        college_link: collegeLink,
        last_date_to_apply: lastDateToApply.toISOString(),
      })
      toast.success("Links and date updated", {
        style: {
          background: "#f0f4f8",
          color: "#333",
        }
      })
      onValidationChange(true)
    } catch {
      toast.error("Failed to update", {
        style: {
          background: "#f8d7da",
          color: "#721c24",
        },
      })
      onValidationChange(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Links and Application Deadline</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Company Link *</Label>
            <Input
              type="url"
              required
              placeholder="https://company.com/careers"
              value={companyLink}
              onChange={(e) => setCompanyLink(e.target.value)}
            />
            {errors.companyLink && <p className="text-sm text-red-600">{errors.companyLink}</p>}
          </div>

          <div className="space-y-2">
            <Label>College Link *</Label>
            <Input
              type="url"
              required
              placeholder="https://college.edu/job"
              value={collegeLink}
              onChange={(e) => setCollegeLink(e.target.value)}
            />
            {errors.collegeLink && <p className="text-sm text-red-600">{errors.collegeLink}</p>}
          </div>

          <div className="space-y-2">
            <Label>Last Date to Apply *</Label>
            <Input
              type="date"
              required
              value={lastDateToApply ? format(lastDateToApply, "yyyy-MM-dd") : ""}
              onChange={(e) => setLastDateToApply(new Date(e.target.value))}
            />
            {errors.lastDateToApply && <p className="text-sm text-red-600">{errors.lastDateToApply}</p>}
          </div>

          <Button type="submit" className="w-full">
            {
              loading ? "Saving..." : "Save Links and Date"
            }
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
