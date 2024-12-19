'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Textarea } from "../components/ui/textarea"
import { ArrowRight, Book } from 'lucide-react'

interface AnalysisResponse {
  message: string
  url: string
  keyId: string
  analysis: {
    summary: string
    cool_facts: string[]
    technologies: string[]
    purpose: string
  }
}

export default function ApiDemo() {
  const [loading, setLoading] = useState(false)
  const [payload, setPayload] = useState(JSON.stringify({
    githubUrl: "https://github.com/assafelovic/gpt-researcher"
  }, null, 2))
  const [response, setResponse] = useState<AnalysisResponse>({
    message: "GitHub repository analyzed successfully",
    url: "https://github.com/assafelovic/gpt-researcher",
    keyId: "472c6908-4a8e-45cc-b045-17ad5d360834",
    analysis: {
      summary: "GPT Researcher is an autonomous agent designed for comprehensive web and local research, providing detailed and unbiased research reports with citations. It aims to empower individuals and organizations with accurate and factual information through AI.",
      cool_facts: [
        "Utilizes 'planner' and 'execution' agents for research tasks",
        "Generates research reports exceeding 2,000 words",
        "Aggregates over 20 sources for objective conclusions",
        "Offers frontend in lightweight and production-ready versions",
        "Supports JavaScript-enabled web scraping"
      ],
      technologies: [
        "Python",
        "FastAPI",
        "NextJS",
        "Docker"
      ],
      purpose: "To address misinformation, speed, determinism, and reliability in research by offering stable performance and increased speed through parallelized agent work."
    }
  })

  const handleSubmit = async () => {
    try {
      setLoading(true)
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 1500))
      const parsedPayload = JSON.parse(payload)
      // In a real implementation, this would be an actual API call
      setResponse({
        ...response,
        url: parsedPayload.githubUrl,
        keyId: crypto.randomUUID()
      })
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Try It Out</h2>
            <Button variant="outline">
              <Book className="mr-2 h-4 w-4" />
              Documentation
            </Button>
          </div>
          
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Request</CardTitle>
                <CardDescription>
                  Edit the payload and click Send to analyze a GitHub repository
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={payload}
                  onChange={(e) => setPayload(e.target.value)}
                  className="font-mono min-h-[100px]"
                />
                <Button 
                  className="mt-4" 
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? 'Analyzing...' : (
                    <>
                      Send Request
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Response</CardTitle>
                <CardDescription>
                  Analysis results for {response.url}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="pretty" className="w-full">
                  <TabsList>
                    <TabsTrigger value="pretty">Pretty</TabsTrigger>
                    <TabsTrigger value="raw">Raw</TabsTrigger>
                  </TabsList>
                  <TabsContent value="pretty" className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-2">Summary</h3>
                      <p className="text-gray-600">{response.analysis.summary}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Cool Facts</h3>
                      <ul className="list-disc list-inside text-gray-600">
                        {response.analysis.cool_facts.map((fact, index) => (
                          <li key={index}>{fact}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Technologies</h3>
                      <div className="flex flex-wrap gap-2">
                        {response.analysis.technologies.map((tech, index) => (
                          <span 
                            key={index}
                            className="px-2 py-1 bg-primary/10 text-primary rounded-md text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Purpose</h3>
                      <p className="text-gray-600">{response.analysis.purpose}</p>
                    </div>
                  </TabsContent>
                  <TabsContent value="raw">
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-auto">
                      {JSON.stringify(response, null, 2)}
                    </pre>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

