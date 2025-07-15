"use client"

import AssignedDriveCard from "@/components/assignedDriveCard"

export default function AdminAssignedDrivesPage() {
  // Mock data for admin assigned drives (assuming this admin is assigned to these)
  const mockAssignedDrives = [
    {
      id: "drive-ad-001",
      company: {
        name: "Alpha Corp",
        website: "https://alphacorp.com",
      },
      status: "assigned",
      assignedDate: "2024-07-08T09:00:00Z",
      assignedAdmins: [
        { name: "Admin One", employee_id: "ADM001", email: "admin1@alphacorp.com" },
        { name: "Admin Two", employee_id: "ADM002", email: "admin2@alphacorp.com" },
      ],
      assignedBy: { name: "Super Admin", employee_id: "SUP001", email: "super@example.com" },
    },
    {
      id: "drive-ad-002",
      company: {
        name: "Beta Solutions",
        website: "https://betasolutions.com",
      },
      status: "assigned",
      assignedDate: "2024-07-12T11:00:00Z",
      assignedAdmins: [
        { name: "Admin One", employee_id: "ADM001", email: "admin1@betasolutions.com" },
        { name: "Admin Three", employee_id: "ADM003", email: "admin3@betasolutions.com" },
      ],
      assignedBy: { name: "Super Admin", employee_id: "SUP001", email: "super@example.com" },
    },
  ]

  return (
    <div className="container max-w-7xl mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold text-center">Admin: Assigned Drives</h1>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
        {mockAssignedDrives.map((drive) => (
          <AssignedDriveCard key={drive.id} driveData={drive} userRole="admin" />
        ))}
      </div>
    </div>
  )
}
