import Link from 'next/link'
import { Github } from 'lucide-react'
import LoginButton from './LoginButton'
import ApiKeyDashboardButton from './ApiKeyDashboardButton'

export default function Header() {
  return (
    <header className="w-full py-4 px-4 md:px-6">
      <nav className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center">
            <Github className="h-6 w-6 sm:h-8 sm:w-8 text-primary mr-2" />
            <span className="text-xl sm:text-2xl font-bold text-primary">Xiaoyang</span>
          </div>
          <ul className="hidden md:flex space-x-4 items-center">
            <li><Link href="#features" className="text-gray-600 hover:text-primary">Features</Link></li>
            <li><Link href="#pricing" className="text-gray-600 hover:text-primary">Pricing</Link></li>
            <li><Link href="#" className="text-gray-600 hover:text-primary">Docs</Link></li>
          </ul>
          <div className="flex items-center gap-2">
            <ApiKeyDashboardButton />
            <LoginButton />
          </div>
          <div className="w-full md:hidden mt-4 border-t pt-4">
            <ul className="flex justify-center space-x-6">
              <li><Link href="#features" className="text-sm text-gray-600 hover:text-primary">Features</Link></li>
              <li><Link href="#pricing" className="text-sm text-gray-600 hover:text-primary">Pricing</Link></li>
              <li><Link href="#" className="text-sm text-gray-600 hover:text-primary">Docs</Link></li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}

