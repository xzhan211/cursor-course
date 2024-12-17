import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from 'lucide-react'

export default function Pricing() {
  const tiers = [
    {
      name: "Free",
      price: "$0",
      features: [
        "100 API calls per month",
        "Basic repository summary",
        "Star count tracking",
        "Community support"
      ]
    },
    {
      name: "Pro",
      price: "$19",
      features: [
        "1,000 API calls per month",
        "Advanced repository analytics",
        "Historical star data",
        "Pull request importance scoring",
        "Email support"
      ]
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: [
        "Unlimited API calls",
        "Custom integrations",
        "Advanced security features",
        "Dedicated account manager",
        "24/7 phone & email support"
      ]
    }
  ]

  return (
    <section id="pricing" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Simple, Transparent Pricing</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader>
                <CardTitle>{tier.name}</CardTitle>
                <CardDescription>
                  <span className="text-3xl font-bold">{tier.price}</span>
                  {tier.price !== "Custom" && <span className="text-gray-500">/month</span>}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-2">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">{tier.name === "Enterprise" ? "Contact Sales" : "Get Started"}</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

