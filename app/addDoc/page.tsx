'use client'

import { useRouter } from 'next/navigation'
import { useState } from "react"

export default function AddDoc() {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!title || !description) {
            alert("Title & Description are required!")
            return
        }
            
        try {
            const res = await fetch("http://localhost:3000/api/documents", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ title, description }),
            })
            
            if (res.ok) {
                router.push('/') // Use router.push instead of redirect
                // Alternatively, you can use:
                // router.refresh() // if you want to refresh the current page data
                // router.replace('/') // if you want to replace history entry
            } else {
                throw new Error("Failed to create a document")
            }
        } catch (error) {
            console.log("Error creating document:", error)
            alert("Failed to create document. Please try again.")
        }
    }
    
    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className="border border-blue-500 px-8 py-2"
                type="text"
                placeholder="Add Document Name"
            />
            <input
                onChange={(e) => setDescription(e.target.value)}
                value={description} // Fixed: was set to title instead of description
                className="border border-blue-500 px-8 py-2"
                type="text"
                placeholder="Add Document Description"
            />
            <button 
                type="submit" 
                className="bg-green-600 py-3 px-6 font-bold text-white w-fit"
            >
                Add Documents
            </button>
        </form>
    )
}