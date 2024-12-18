import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart2, Star, GitPullRequest } from 'lucide-react'

export default function Features() {
  const features = [
    {
      title: "Repository Summary",
      description: "Get a comprehensive overview of any GitHub repository in seconds.",
      icon: <BarChart2 className="h-8 w-8 text-primary" />
    },
    {
      title: "Star Tracking",
      description: "Monitor star growth and trends for repositories over time.",
      icon: <Star className="h-8 w-8 text-primary" />
    },
    {
      title: "Key Pull Requests",
      description: "Identify and analyze the most impactful pull requests in a project.",
      icon: <GitPullRequest className="h-8 w-8 text-primary" />
    }
  ]

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Powerful Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-0">
          {features.map((feature, index) => (
            <Card key={index} className="transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  {feature.icon}
                  <span className="ml-2">{feature.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

