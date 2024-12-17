import Link from 'next/link'
import { Github } from 'lucide-react'
import LoginButton from './LoginButton'
import ApiKeyDashboardButton from './ApiKeyDashboardButton'

export default function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Github className="h-8 w-8 text-primary mr-2" />
            <span className="text-2xl font-bold text-primary">Xiaoyang</span>
          </div>
          <nav>
            <ul className="flex space-x-4">
              <li><Link href="#features" className="text-gray-600 hover:text-primary">Features</Link></li>
              <li><Link href="#pricing" className="text-gray-600 hover:text-primary">Pricing</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-primary">Docs</Link></li>
            </ul>
          </nav>
          <div className="flex items-center space-x-4">
            <ApiKeyDashboardButton />
            <LoginButton />
          </div>
        </div>
      </div>
    </header>
  )
}

