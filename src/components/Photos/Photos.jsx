import React from "react"
import { useState, useCallback } from "react"
import { Client, Storage, ID } from "appwrite"
import { useDropzone } from "react-dropzone"

// Initialize Appwrite
const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1") // Replace with your Appwrite endpoint
    .setProject("6786b37a000e1a5e8c68") // Replace with your project ID

const storage = new Storage(client)

function ImageUpload() {
    const [isUploading, setIsUploading] = useState(false)
    const [error, setError] = useState(null)
    const [preview, setPreview] = useState(null)

    const uploadImage = async (file) => {
        try {
            setIsUploading(true)
            setError(null)

            // Create preview URL
            const previewUrl = URL.createObjectURL(file)
            setPreview(previewUrl)

            // Upload to Appwrite
            await storage.createFile(
                '6786b37a000e1a5e8c68', // Replace with your bucket ID
                ID.unique(),
                file,
            )

            // You can add additional processing here
            console.log("File uploaded successfully")
        } catch (err) {
            setError(err.message)
            console.error("Upload failed:", err)
        } finally {
            setIsUploading(false)
        }
    }

    const uploadFromUrl = async (url) => {
        try {
            setIsUploading(true)
            setError(null)
            setPreview(url)

            const response = await fetch(url)
            const blob = await response.blob()
            const file = new File([blob], "image.jpg", { type: blob.type })

            await uploadImage(file)
        } catch (err) {
            setError(err.message)
            console.error("URL upload failed:", err)
        }
    }

    const onDrop = useCallback(
        async (acceptedFiles) => {
            if (acceptedFiles?.length) {
                await uploadImage(acceptedFiles[0])
            }
        },
        [uploadImage],
    ) // Added uploadImage to dependencies

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "image/*": [".png", ".jpg", ".jpeg", ".gif"],
        },
        multiple: false,
    })

    const handlePaste = useCallback(
        async (e) => {
            const items = e.clipboardData.items
            for (const item of items) {
                if (item.type.indexOf("image") === 0) {
                    const file = item.getAsFile()
                    await uploadImage(file)
                    break
                }
            }
        },
        [uploadImage],
    ) // Added uploadImage to dependencies

    return (
        <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Upload an image to detect</h1>
                <h2 className="text-4xl font-bold text-gray-900"><span className="text-red-700">Fake</span> or <span className="text-green-700">Real</span></h2>
            </div>

            <div className="mt-12">
                <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-lg p-12 ${isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
                        }`}
                    onPaste={handlePaste}
                >
                    <input {...getInputProps()} />
                    <div className="text-center">
                        <button
                            type="button"
                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Upload Image
                        </button>
                        <p className="mt-2 text-sm text-gray-600">
                            or drop a file, paste image or{" "}
                            <button
                                type="button"
                                className="text-blue-600 hover:text-blue-500"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    const url = prompt("Enter image URL:")
                                    if (url) uploadFromUrl(url)
                                }}
                            >
                                URL
                            </button>
                        </p>
                    </div>
                </div>

                {isUploading && (
                    <div className="mt-4 text-center">
                        <div className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-blue-500 transition ease-in-out duration-150">
                            <svg
                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                            Uploading...
                        </div>
                    </div>
                )}

                {error && <div className="mt-4 text-center text-red-600">{error}</div>}

                {preview && (
                    <div className="mt-8">
                        <img
                            src={preview || "/placeholder.svg"}
                            alt="Preview"
                            className="w-auto h-auto mx-auto rounded-lg shadow-lg"
                        />
                    </div>
                )}
            </div>
        </div>
    )
}


export default function App() {
    return (
        <div className="min-h-screen bg-white flex flex-col">
            <main className="flex-1">
                <ImageUpload />
            </main>
        </div>
    )
}

