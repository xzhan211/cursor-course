import Link from 'next/link'
import { Github } from 'lucide-react'
import LoginButton from './LoginButton'
import ApiKeyDashboardButton from './ApiKeyDashboardButton'

export default function Header() {
  return (
    <header className="w-full py-4 px-4 md:px-6">
      <nav className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center">
          <Github className="h-8 w-8 text-primary mr-2" />
          <span className="text-2xl font-bold text-primary">Xiaoyang</span>
        </div>
        <ul className="flex space-x-4">
          <li><Link href="#features" className="text-gray-600 hover:text-primary">Features</Link></li>
          <li><Link href="#pricing" className="text-gray-600 hover:text-primary">Pricing</Link></li>
          <li><Link href="#" className="text-gray-600 hover:text-primary">Docs</Link></li>
        </ul>
        <div className="flex items-center space-x-4">
          <ApiKeyDashboardButton />
          <LoginButton />
        </div>
      </nav>
    </header>
  )
}

