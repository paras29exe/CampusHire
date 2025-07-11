'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/store/store'
import { usePathname, useRouter } from 'next/navigation'

export default function RoleLayout({ children }) {
  const { role: loggedInRole } = useAuthStore()
  const router = useRouter()
  const pathname = usePathname()

  const urlRole = pathname.split('/')[2]
  const allowedRoles = ['student', 'teacher', 'admin', 'superuser']

  useEffect(() => {
    if (!urlRole || !allowedRoles.includes(urlRole)) {
      router.replace('/not-found')
      return
    }

    if (loggedInRole && urlRole !== loggedInRole) {
      router.replace('/unauthorized')
    }
  }, [urlRole, loggedInRole])

  if (!urlRole || !allowedRoles.includes(urlRole)) return null
  if (!loggedInRole || urlRole !== loggedInRole) return null

  return <>{children}</>
}
