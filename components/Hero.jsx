import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className="py-20 bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6">
              Analyze GitHub Repositories with Ease
            </h1>
            <p className="text-xl mb-8">
              Get instant insights into open source projects. Summarize repositories, track stars, and identify important pull requests with our powerful API.
            </p>
            <Button size="lg" className="animate-pulse">
              Start Analyzing <ArrowRight className="ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

