import { useState, useRef } from "react"
import React from "react"
import { storage, ID } from "../Lib/Appwrite";

export default function VideoUpload() {
  const [dragActive, setDragActive] = useState(false)
  const [videoUrl, setVideoUrl] = useState("")
  const [urlInput, setUrlInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const inputRef = useRef(null)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith("video/")) {
      await handleFile(file)
    }
  }

  const handleChange = async (e) => {
    e.preventDefault()
    if (e.target.files?.[0]) {
      await handleFile(e.target.files[0])
    }
  }

  const handleFile = async (file) => {
    setIsLoading(true)
    setUploadProgress(0)
    try {
      // Upload to Appwrite Storage
      const response = await storage.createFile(
        "videos", // Replace with your bucket ID
        ID.unique(),
        file,
        [],
        onProgress,
      )

      // Get video URL
      const fileUrl = storage.getFileView("videos", response.$id)
      setVideoUrl(fileUrl)
      console.log("Video uploaded successfully:", response)
    } catch (error) {
      console.error("Error uploading video:", error)
      alert("Error uploading video. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const onProgress = (progress) => {
    setUploadProgress(Math.round((progress.loaded / progress.total) * 100))
  }

  const handlePaste = async (e) => {
    const items = e.clipboardData?.items
    if (items) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("video") !== -1) {
          const file = items[i].getAsFile()
          await handleFile(file)
          break
        }
      }
    }
  }

  const handleUrlSubmit = async (e) => {
    e.preventDefault()
    if (urlInput) {
      setIsLoading(true)
      try {
        setVideoUrl(urlInput)
        // Here you would typically validate and process the URL
        console.log("Processing URL:", urlInput)
      } catch (error) {
        console.error("Error processing URL:", error)
      } finally {
        setIsLoading(false)
        setUrlInput("")
      }
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">Upload a video to detect</h1>
        <h2 className="mt-3 text-3xl font-bold text-gray-900"><span className="text-red-700">Fake</span> or <span className="text-green-700">Real</span></h2>
      </div>

      <div className="mt-12">
        <div
          className={`relative border-2 border-dashed rounded-lg p-12 text-center ${
            dragActive ? "border-blue-600 bg-blue-50" : "border-gray-300"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onPaste={handlePaste}
        >
          <input ref={inputRef} type="file" className="hidden" accept="video/*" onChange={handleChange} />

          {videoUrl ? (
            <div className="space-y-4">
              <video src={videoUrl} controls className="max-h-64 mx-auto rounded-lg" />
              <button onClick={() => setVideoUrl("")} className="text-sm text-red-600 hover:text-red-500">
                Remove video
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <button
                onClick={() => inputRef.current?.click()}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Upload Video"}
              </button>
              <p className="text-sm text-gray-600">
                or drop a file,
                <br />
                paste video or{" "}
                <button
                  onClick={() => document.getElementById("urlInput").focus()}
                  className="text-blue-600 hover:text-blue-500"
                >
                  URL
                </button>
              </p>
            </div>
          )}

          {isLoading && (
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">{uploadProgress}% uploaded</p>
            </div>
          )}
        </div>

        <form onSubmit={handleUrlSubmit} className="mt-4">
          <div className="flex gap-2">
            <input
              id="urlInput"
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="Paste video URL here"
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              disabled={!urlInput || isLoading}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

