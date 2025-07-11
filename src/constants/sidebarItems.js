import { Briefcase, PersonStanding, ShieldHalf, Crown, Users, UserRoundCheck, Upload, BarChart2, ClipboardList, FolderPlus } from "lucide-react";

export function getSidebarItems(role) {
    const items = {
        student: [
            {
                title: 'Drives',
                icon: <Briefcase />,
                subItems: [
                    { title: 'Active Drives', href: 'active-drives' },
                    { title: 'Applied Drives', href: 'applied-drives' },
                    { title: 'Expired Drives', href: 'expired-drives' },
                    { title: 'Shortlisted Drives', href: 'shortlisted-drives' },
                ]
            },
            { title: 'Mentor', icon: <PersonStanding />, href: '/dashboard/student/mentor' }
        ],

        teacher: [
            {
                title: 'Drives',
                icon: <Briefcase />,
                subItems: [
                    { title: 'Active Drives', href: 'active-drives' },
                    { title: 'Unpublished Drives', href: 'unpublished-drives' },
                    { title: 'Expired Drives', href: 'expired-drives' }
                ]
            },
            {
                title: 'Students',
                icon: <Users />,
                subItems: [
                    { title: 'Add Student', href: 'add-student' },
                    { title: 'My Students', href: 'my-students' }
                ]
            },
            {
                title: 'Faculty',
                icon: <UserRoundCheck />,
                subItems: [
                    { title: 'Admins', href: 'admins' },
                    { title: 'Teachers', href: 'teachers' }
                ]
            },
            { title: 'Add Bulk Students', icon: <Upload />, href: 'add-bulk-students' },
            { title: 'Drives Analytics', icon: <BarChart2 />, href: 'drives-analytics' }
        ],

        admin: [
            {
                title: 'Drives',
                icon: <Briefcase />,
                subItems: [
                    { title: 'Active Drives', href: 'active-drives' },
                    { title: 'Unpublished Drives', href: 'unpublished-drives' },
                    { title: 'Expired Drives', href: 'expired-drives' },
                    { title: 'Incomplete Drives', href: 'incomplete-drives' }
                ]
            },
            { title: 'Drives Analytics', icon: <BarChart2 />, href: 'drives-analytics' },
            {
                title: 'Manage Assignments',
                icon: <ClipboardList />,
                subItems: [
                    { title: 'Pending Assignments', href: 'pending-assignments' },
                    { title: 'Completed Assignments', href: 'completed-assignments' }
                ]
            },
            {
                title: 'Students',
                icon: <Users />,
                subItems: [
                    { title: 'Add Student', href: 'add-student' },
                    { title: 'Students Data', href: 'view-students' }
                ]
            },
            {
                title: 'Faculty',
                icon: <UserRoundCheck />,
                subItems: [
                    { title: 'Add Teacher', href: 'add-teacher' },
                    { title: 'All Teachers', href: 'all-teachers' },
                    { title: 'All Admins', href: 'all-admins' }
                ]
            },
            { title: 'Add Bulk Students', icon: <Upload />, href: 'add-bulk-students' },

        ],

        superuser: [
            {
                title: 'Drives',
                icon: <Briefcase />,
                subItems: [
                    { title: 'Active Drives', href: 'active-drives' },
                    { title: 'Unpublished Drives', href: 'unpublished-drives' },
                    { title: 'Expired Drives', href: 'expired-drives' },
                    { title: 'Incomplete Drives', href: 'incomplete-drives' },
                ]
            },
            {
                title: 'Job Management',
                icon: <FolderPlus />,
                subItems: [
                    { title: 'Post Drive (via PDF)', href: 'post-drive-from-pdf' },
                    { title: 'Assign Drive to Admin', href: 'assign-drive' }
                ]
            },
            {
                title: 'Drives Analytics',
                icon: <BarChart2 />,
                href: 'drives-analytics',
            },
            {
                title: 'Students',
                icon: <Users />,
                subItems: [
                    { title: 'Add Student', href: 'add-student' },
                    { title: 'All Students', href: 'View-students' },
                ]
            },
            {
                title: 'Teachers',
                icon: <UserRoundCheck />,
                subItems: [
                    { title: 'Add Teacher', href: 'add-teacher' },
                    { title: 'All Teachers', href: 'all-teachers' },
                ]
            },
            {
                title: 'Admins',
                icon: <ShieldHalf />,
                subItems: [
                    { title: 'Add Admin', href: 'add-admin' },
                    { title: 'All Admins', href: 'all-admins' },
                ]
            },
            {
                title: 'SuperUsers',
                icon: <Crown />,
                subItems: [
                    { title: 'Add SuperUser', href: 'add-superuser' },
                    { title: 'All SuperUsers', href: 'all-superusers' },
                ]
            },
            {
                title: 'Manage Assignments',
                icon: <ClipboardList />,
                subItems: [
                    { title: 'Pending Assignments', href: 'pending-assignments' },
                    { title: 'Completed Assignments', href: 'completed-assignments' },
                ]
            }
        ]
    };

    return items[role] || [];
}