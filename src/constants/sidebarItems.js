import { Briefcase, PersonStanding, ShieldHalf, Crown, Users, UserRoundCheck, Upload, BarChart2, ClipboardList, FolderPlus, UserPlus, Database, Settings, FileText, TrendingUp, Clock, CheckCircle, XCircle, AlertCircle, GraduationCap, Building } from "lucide-react";

const ROUTES = {
    STUDENT: {
        DASHBOARD: '/dashboard/student',
        DRIVES: {
            ACTIVE: '/dashboard/student/drives/active-drives',
            APPLIED: '/dashboard/student/drives/applied-drives',
            EXPIRED: '/dashboard/student/drives/expired-drives',
            SHORTLISTED: '/dashboard/student/drives/shortlisted-drives'
        },
        MENTOR: '/dashboard/student/mentor'
    },
    TEACHER: {
        DASHBOARD: '/dashboard/teacher',
        DRIVES: {
            ACTIVE: '/dashboard/teacher/drives/active-drives',
            UNPUBLISHED: '/dashboard/teacher/drives/unpublished-drives',
            EXPIRED: '/dashboard/teacher/drives/expired-drives',
            ANALYTICS: '/dashboard/teacher/drives/job-analytics'
        },
        STUDENTS: {
            ADD: '/dashboard/teacher/students/add-student',
            MY_STUDENTS: '/dashboard/teacher/view/my-students',
            BULK_UPLOAD: '/dashboard/teacher/bulk-upload'
        },
        FACULTY: {
            ADMINS: '/dashboard/teacher/view/admins',
            TEACHERS: '/dashboard/teacher/view/teachers'
        }
    },
    ADMIN: {
        DASHBOARD: '/dashboard/admin',
        DRIVES: {
            ACTIVE: '/dashboard/admin/drives/active-drives',
            UNPUBLISHED: '/dashboard/admin/drives/unpublished-drives',
            EXPIRED: '/dashboard/admin/drives/expired-drives',
            INCOMPLETE: '/dashboard/admin/drives/incomplete-drives',
            ANALYTICS: '/dashboard/admin/drives/job-analytics'
        },
        STUDENTS: {
            ADD: '/dashboard/admin/students/add-student',
            VIEW_ALL: '/dashboard/admin/view/students',
            BULK_UPLOAD: '/dashboard/admin/students/bulk-upload'
        },
        FACULTY: {
            ADD_TEACHER: '/dashboard/admin/faculty/add-teacher',
            ALL_TEACHERS: '/dashboard/admin/view/teachers',
            ALL_ADMINS: '/dashboard/admin/view/admins'
        },
        ASSIGNMENTS: {
            PENDING: '/dashboard/admin/assignments/pending-assignments',
            COMPLETED: '/dashboard/admin/assignments/completed-assignments'
        }
    },
    SUPERUSER: {
        DASHBOARD: '/dashboard/superuser',
        DRIVES: {
            ACTIVE: '/dashboard/superuser/drives/active-drives',
            UNPUBLISHED: '/dashboard/superuser/drives/unpublished-drives',
            EXPIRED: '/dashboard/superuser/drives/expired-drives',
            UNASSIGNED: '/dashboard/superuser/drives/unassigned-drives',
            ANALYTICS: '/dashboard/superuser/analytics'
        },
        JOB_MANAGEMENT: {
            POST_FROM_PDF: '/dashboard/superuser/post-new-drive',
            ASSIGN_TO_ADMIN: '/dashboard/superuser/drives/assign-drive-to-admin'
        },
        STUDENTS: {
            ADD: '/dashboard/superuser/manage/add-student',
            VIEW_ALL: '/dashboard/superuser/view/students'
        },
        TEACHERS: {
            ADD: '/dashboard/superuser/manage/add-teacher',
            VIEW_ALL: '/dashboard/superuser/view/teachers'
        },
        ADMINS: {
            ADD: '/dashboard/superuser/manage/add-admin',
            VIEW_ALL: '/dashboard/superuser/view/admins'
        },
        SUPERUSERS: {
            ADD: '/dashboard/superuser/manage/add-superuser',
            VIEW_ALL: '/dashboard/superuser/view/superusers'
        },
        ASSIGNMENTS: {
            PENDING: '/dashboard/superuser/assignments/pending-assignments',
            COMPLETED: '/dashboard/superuser/assignments/completed-assignments'
        }
    }
};

export function getSidebarItems(role) {
    const items = {
        student: [
            {
                title: 'Job Drives',
                icon: <Briefcase className="w-5 h-5" />,
                subItems: [
                    { 
                        title: 'Active Drives', 
                        href: ROUTES.STUDENT.DRIVES.ACTIVE,
                        icon: <TrendingUp className="w-4 h-4" />,
                        description: 'View all currently active job drives'
                    },
                    { 
                        title: 'Applied Drives', 
                        href: ROUTES.STUDENT.DRIVES.APPLIED,
                        icon: <CheckCircle className="w-4 h-4" />,
                        description: 'Track your job applications'
                    },
                    { 
                        title: 'Shortlisted Drives', 
                        href: ROUTES.STUDENT.DRIVES.SHORTLISTED,
                        icon: <FileText className="w-4 h-4" />,
                        description: 'Drives where you\'ve been shortlisted'
                    },
                    { 
                        title: 'Expired Drives', 
                        href: ROUTES.STUDENT.DRIVES.EXPIRED,
                        icon: <Clock className="w-4 h-4" />,
                        description: 'View past job drives'
                    }
                ]
            },
            { 
                title: 'Mentor Support', 
                icon: <PersonStanding className="w-5 h-5" />, 
                href: ROUTES.STUDENT.MENTOR,
                description: 'Connect with your assigned mentor'
            }
        ],

        teacher: [
            {
                title: 'Drive Management',
                icon: <Briefcase className="w-5 h-5" />,
                subItems: [
                    { 
                        title: 'Active Drives', 
                        href: ROUTES.TEACHER.DRIVES.ACTIVE,
                        icon: <TrendingUp className="w-4 h-4" />
                    },
                    { 
                        title: 'Unpublished Drives', 
                        href: ROUTES.TEACHER.DRIVES.UNPUBLISHED,
                        icon: <AlertCircle className="w-4 h-4" />
                    },
                    { 
                        title: 'Expired Drives', 
                        href: ROUTES.TEACHER.DRIVES.EXPIRED,
                        icon: <Clock className="w-4 h-4" />
                    }
                ]
            },
            {
                title: 'Student Management',
                icon: <Users className="w-5 h-5" />,
                subItems: [
                    { 
                        title: 'Add Student', 
                        href: ROUTES.TEACHER.STUDENTS.ADD,
                        icon: <UserPlus className="w-4 h-4" />
                    },
                    { 
                        title: 'My Students', 
                        href: ROUTES.TEACHER.STUDENTS.MY_STUDENTS,
                        icon: <GraduationCap className="w-4 h-4" />
                    }
                ]
            },
            {
                title: 'Faculty Directory',
                icon: <UserRoundCheck className="w-5 h-5" />,
                subItems: [
                    { 
                        title: 'View Admins', 
                        href: ROUTES.TEACHER.FACULTY.ADMINS,
                        icon: <ShieldHalf className="w-4 h-4" />
                    },
                    { 
                        title: 'View Teachers', 
                        href: ROUTES.TEACHER.FACULTY.TEACHERS,
                        icon: <UserRoundCheck className="w-4 h-4" />
                    }
                ]
            },
            { 
                title: 'Bulk Upload', 
                icon: <Upload className="w-5 h-5" />, 
                href: ROUTES.TEACHER.STUDENTS.BULK_UPLOAD,
                description: 'Upload multiple students at once'
            },
            { 
                title: 'Job Analytics', 
                icon: <BarChart2 className="w-5 h-5" />, 
                href: ROUTES.TEACHER.DRIVES.ANALYTICS,
                description: 'View job drive performance metrics'
            }
        ],

        admin: [
            {
                title: 'Drive Management',
                icon: <Briefcase className="w-5 h-5" />,
                subItems: [
                    { 
                        title: 'Active Drives', 
                        href: ROUTES.ADMIN.DRIVES.ACTIVE,
                        icon: <TrendingUp className="w-4 h-4" />
                    },
                    { 
                        title: 'Unpublished Drives', 
                        href: ROUTES.ADMIN.DRIVES.UNPUBLISHED,
                        icon: <AlertCircle className="w-4 h-4" />
                    },
                    { 
                        title: 'Expired Drives', 
                        href: ROUTES.ADMIN.DRIVES.EXPIRED,
                        icon: <Clock className="w-4 h-4" />
                    },
                    { 
                        title: 'Incomplete Drives', 
                        href: ROUTES.ADMIN.DRIVES.INCOMPLETE,
                        icon: <XCircle className="w-4 h-4" />
                    }
                ]
            },
            { 
                title: 'Job Analytics', 
                icon: <BarChart2 className="w-5 h-5" />, 
                href: ROUTES.ADMIN.DRIVES.ANALYTICS,
                description: 'Comprehensive job placement analytics'
            },
            {
                title: 'Assignment Management',
                icon: <ClipboardList className="w-5 h-5" />,
                subItems: [
                    { 
                        title: 'Pending Assignments', 
                        href: ROUTES.ADMIN.ASSIGNMENTS.PENDING,
                        icon: <Clock className="w-4 h-4" />
                    },
                    { 
                        title: 'Completed Assignments', 
                        href: ROUTES.ADMIN.ASSIGNMENTS.COMPLETED,
                        icon: <CheckCircle className="w-4 h-4" />
                    }
                ]
            },
            {
                title: 'Student Management',
                icon: <Users className="w-5 h-5" />,
                subItems: [
                    { 
                        title: 'Add Student', 
                        href: ROUTES.ADMIN.STUDENTS.ADD,
                        icon: <UserPlus className="w-4 h-4" />
                    },
                    { 
                        title: 'All Students', 
                        href: ROUTES.ADMIN.STUDENTS.VIEW_ALL,
                        icon: <Database className="w-4 h-4" />
                    }
                ]
            },
            {
                title: 'Faculty Management',
                icon: <UserRoundCheck className="w-5 h-5" />,
                subItems: [
                    { 
                        title: 'Add Teacher', 
                        href: ROUTES.ADMIN.FACULTY.ADD_TEACHER,
                        icon: <UserPlus className="w-4 h-4" />
                    },
                    { 
                        title: 'All Teachers', 
                        href: ROUTES.ADMIN.FACULTY.ALL_TEACHERS,
                        icon: <UserRoundCheck className="w-4 h-4" />
                    },
                    { 
                        title: 'All Admins', 
                        href: ROUTES.ADMIN.FACULTY.ALL_ADMINS,
                        icon: <ShieldHalf className="w-4 h-4" />
                    }
                ]
            },
            { 
                title: 'Bulk Operations', 
                icon: <Upload className="w-5 h-5" />, 
                href: ROUTES.ADMIN.STUDENTS.BULK_UPLOAD,
                description: 'Bulk upload students and data'
            }
        ],

        superuser: [
            {
                title: 'Drive Management',
                icon: <Briefcase className="w-5 h-5" />,
                subItems: [
                    { 
                        title: 'Active Drives', 
                        href: ROUTES.SUPERUSER.DRIVES.ACTIVE,
                        icon: <TrendingUp className="w-4 h-4" />
                    },
                    { 
                        title: 'Unpublished Drives', 
                        href: ROUTES.SUPERUSER.DRIVES.UNPUBLISHED,
                        icon: <AlertCircle className="w-4 h-4" />
                    },
                    { 
                        title: 'Expired Drives', 
                        href: ROUTES.SUPERUSER.DRIVES.EXPIRED,
                        icon: <Clock className="w-4 h-4" />
                    },
                ]
            },
            { 
                title: 'Unassigned Drives', 
                href: ROUTES.SUPERUSER.DRIVES.UNASSIGNED,
                icon: <XCircle className="w-4 h-4" />
            },
            { 
                title: 'Post New Drive (PDF)', 
                href: ROUTES.SUPERUSER.JOB_MANAGEMENT.POST_FROM_PDF,
                icon: <FileText className="w-4 h-4" />
            },
            { 
                title: 'Job Analytics', 
                icon: <BarChart2 className="w-5 h-5" />, 
                href: ROUTES.SUPERUSER.DRIVES.ANALYTICS,
                description: 'System-wide job placement analytics'
            },
            {
                title: 'Student Management',
                icon: <Users className="w-5 h-5" />,
                subItems: [
                    { 
                        title: 'Add Student', 
                        href: ROUTES.SUPERUSER.STUDENTS.ADD,
                        icon: <UserPlus className="w-4 h-4" />
                    },
                    { 
                        title: 'All Students', 
                        href: ROUTES.SUPERUSER.STUDENTS.VIEW_ALL,
                        icon: <Database className="w-4 h-4" />
                    }
                ]
            },
            {
                title: 'Teacher Management',
                icon: <UserRoundCheck className="w-5 h-5" />,
                subItems: [
                    { 
                        title: 'Add Teacher', 
                        href: ROUTES.SUPERUSER.TEACHERS.ADD,
                        icon: <UserPlus className="w-4 h-4" />
                    },
                    { 
                        title: 'All Teachers', 
                        href: ROUTES.SUPERUSER.TEACHERS.VIEW_ALL,
                        icon: <UserRoundCheck className="w-4 h-4" />
                    }
                ]
            },
            {
                title: 'Admin Management',
                icon: <ShieldHalf className="w-5 h-5" />,
                subItems: [
                    { 
                        title: 'Add Admin', 
                        href: ROUTES.SUPERUSER.ADMINS.ADD,
                        icon: <UserPlus className="w-4 h-4" />
                    },
                    { 
                        title: 'All Admins', 
                        href: ROUTES.SUPERUSER.ADMINS.VIEW_ALL,
                        icon: <ShieldHalf className="w-4 h-4" />
                    }
                ]
            },
            {
                title: 'SuperUser Management',
                icon: <Crown className="w-5 h-5" />,
                subItems: [
                    { 
                        title: 'Add SuperUser', 
                        href: ROUTES.SUPERUSER.SUPERUSERS.ADD,
                        icon: <UserPlus className="w-4 h-4" />
                    },
                    { 
                        title: 'All SuperUsers', 
                        href: ROUTES.SUPERUSER.SUPERUSERS.VIEW_ALL,
                        icon: <Crown className="w-4 h-4" />
                    }
                ]
            },
            {
                title: 'Assignment Management',
                icon: <ClipboardList className="w-5 h-5" />,
                subItems: [
                    { 
                        title: 'Pending Assignments', 
                        href: ROUTES.SUPERUSER.ASSIGNMENTS.PENDING,
                        icon: <Clock className="w-4 h-4" />
                    },
                    { 
                        title: 'Completed Assignments', 
                        href: ROUTES.SUPERUSER.ASSIGNMENTS.COMPLETED,
                        icon: <CheckCircle className="w-4 h-4" />
                    }
                ]
            }
        ]
    };

    return items[role] || [];
}