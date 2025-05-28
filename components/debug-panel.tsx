"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { debugAllContent } from "@/lib/simple-storage"

export default function DebugPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const [debugInfo, setDebugInfo] = useState<Record<string, any>>({})

  const handleDebug = () => {
    // Get all localStorage items
    const items: Record<string, any> = {}

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key) {
        try {
          const value = localStorage.getItem(key)
          items[key] = value ? JSON.parse(value) : null
        } catch (error) {
          items[key] = `[Error parsing: ${error}]`
        }
      }
    }

    setDebugInfo(items)
    setIsOpen(true)

    // Also log to console
    debugAllContent()
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button onClick={handleDebug} variant="outline" className="bg-white/80 backdrop-blur-sm">
          Debug Content
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl max-h-[80vh] overflow-auto">
        <CardHeader className="sticky top-0 bg-white z-10">
          <div className="flex justify-between items-center">
            <CardTitle>Debug Information</CardTitle>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Close
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <h3 className="text-lg font-medium mb-2">localStorage Content:</h3>
          <pre className="bg-gray-100 p-4 rounded-md overflow-auto max-h-[60vh]">
            {JSON.stringify(debugInfo, null, 2)}
          </pre>
        </CardContent>
      </Card>
    </div>
  )
}
