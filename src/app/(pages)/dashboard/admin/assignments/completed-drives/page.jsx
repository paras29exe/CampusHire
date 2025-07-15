"use client"

import CompletedDriveCard from "@/components/completedDriveCard"

export default function AdminCompletedDrivesPage() {
  // Mock data for admin completed drives (assuming this admin is assigned to these)
  const mockCompletedDrives = [
    {
      id: "drive-ad-003",
      company: {
        name: "Gamma Corp",
        website: "https://gammacorp.com",
      },
      status: "completed",
      assignedDate: "2024-06-15T10:00:00Z",
      completedDate: "2024-06-28T15:00:00Z",
      assignedAdmins: [
        { name: "Admin One", employee_id: "ADM001", email: "admin1@gammacorp.com" },
        { name: "Admin Four", employee_id: "ADM004", email: "admin4@gammacorp.com" },
      ],
      assignedBy: { name: "Super Admin", employee_id: "SUP001", email: "super@example.com" },
    },
    {
      id: "drive-ad-004",
      company: {
        name: "Delta Solutions",
        website: "https://deltasolutions.com",
      },
      status: "completed",
      assignedDate: "2024-05-01T14:00:00Z",
      completedDate: "2024-05-18T10:00:00Z",
      assignedAdmins: [
        { name: "Admin One", employee_id: "ADM001", email: "admin1@deltasolutions.com" },
        { name: "Admin Five", employee_id: "ADM005", email: "admin5@deltasolutions.com" },
      ],
      assignedBy: { name: "Super Admin", employee_id: "SUP001", email: "super@example.com" },
    },
  ]

  return (
    <div className="container max-w-7xl mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold text-center">Admin: Completed Drives</h1>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
        {mockCompletedDrives.map((drive) => (
          <CompletedDriveCard key={drive.id} driveData={drive} userRole="admin" />
        ))}
      </div>
    </div>
  )
}
