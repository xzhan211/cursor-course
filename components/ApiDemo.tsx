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
  const [error, setError] = useState<string | null>(null)
  const [payload, setPayload] = useState(JSON.stringify({
    githubUrl: "https://github.com/assafelovic/gpt-researcher"
  }, null, 2))
  const [response, setResponse] = useState<AnalysisResponse | null>(null)

  const handleSubmit = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const parsedPayload = JSON.parse(payload)
      
      // Call the actual API endpoint
      const res = await fetch('/api/github-summarizer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Update the demo API key to match the one in the route handler
          'x-api-key': 'demo-api-key'
        },
        body: JSON.stringify(parsedPayload)
      })

      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to analyze repository')
      }

      setResponse(data)
    } catch (err: unknown) {
      console.error('Error:', err)
      setError(err instanceof Error ? err.message : 'Something went wrong')
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
                {error && (
                  <p className="mt-2 text-sm text-red-500">{error}</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Response</CardTitle>
                <CardDescription>
                  Analysis results for {response?.url || 'your repository'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {response ? (
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
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    Submit a request to see the analysis results
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

