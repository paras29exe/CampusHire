"use client"

import AssignedDriveCard from "@/components/assignedDriveCard"

export default function SuperuserAssignedDrivesPage() {
  // Mock data for superuser assigned drives
  const mockAssignedDrives = [
    {
      id: "drive-su-001",
      company: {
        name: "Global Tech Solutions",
        website: "https://globaltech.com",
      },
      status: "assigned",
      assignedDate: "2024-07-01T10:00:00Z",
      assignedAdmins: [
        { name: "Alice Johnson", employee_id: "EMP001", email: "alice@globaltech.com" },
        { name: "Bob Williams", employee_id: "EMP002", email: "bob@globaltech.com" },
        { name: "Charlie Brown", employee_id: "EMP003", email: "charlie@globaltech.com" },
      ],
      assignedBy: { name: "Super Admin", employee_id: "SUP001", email: "super@example.com" },
    },
    {
      id: "drive-su-002",
      company: {
        name: "Innovate Systems Inc.",
        website: "https://innovatesystems.com",
      },
      status: "assigned",
      assignedDate: "2024-07-05T14:30:00Z",
      assignedAdmins: [
        { name: "Diana Prince", employee_id: "EMP004", email: "diana@innovate.com" },
        { name: "Eve Adams", employee_id: "EMP005", email: "eve@innovate.com" },
      ],
      assignedBy: { name: "Super Admin", employee_id: "SUP001", email: "super@example.com" },
    },
  ]

  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold text-center">Superuser: Assigned Drives</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockAssignedDrives.map((drive) => (
          <AssignedDriveCard key={drive.id} driveData={drive} userRole="superuser" />
        ))}
      </div>
    </div>
  )
}
