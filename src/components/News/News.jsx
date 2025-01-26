import { useState } from "react"
import React from "react"
export default function ImageUpload() {
  const [text, setText] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Detecting:", text)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">Upload text to detect</h1>
        <h2 className="mt-3 text-3xl font-bold text-gray-900"><span className="text-red-700">Fake</span> or <span className="text-green-700">Real</span></h2>
      </div>

      <div className="mt-12">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <textarea
              rows={6}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 bg-white p-4"
              placeholder="Enter your text..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="rounded-md bg-[#0F70E6] px-8 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Detect
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

