'use client';

import { Button } from "@/components/ui/button"
import { Key } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

export default function ApiKeyDashboardButton() {
  const { data: session } = useSession()

  if (!session) {
    return null
  }

  return (
    <Link href="/dashboard">
      <Button variant="outline">
        <Key className="h-4 w-4 mr-2" />
        Manage API Keys
      </Button>
    </Link>
  )
}