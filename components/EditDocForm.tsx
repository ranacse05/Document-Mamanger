'use client';

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

interface EditDocFormProps {
  id: string;
  title: string;
  description: string;
}

export default function EditDocForm({ id, title = "", description = "" }: EditDocFormProps) {
  const [newTitle, setNewTitle] = useState(title || "");
  const [newDescription, setNewDescription] = useState(description || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  console.log("EditDocForm Props:", { id, title, description });
  console.log("EditDocForm Initial State:", { newTitle, newDescription });

  const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        console.log("Submitting:", { id, newTitle, newDescription });

        setIsSubmitting(true);

        try {
            const res = await fetch(`http://localhost:3000/api/documents/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                newTitle,
                newDescription,
            }),
            });

            if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            console.error("API Error Response:", { status: res.status, statusText: res.statusText, data: errorData });
            throw new Error(`Failed to update document: ${res.status} ${res.statusText}`);
            }

            const responseData = await res.json();
            console.log("Update Successful:", responseData);
            router.push("/");
        } catch (error) {
            console.error("Error updating document:", error);
        } finally {
            setIsSubmitting(false);
        }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        onChange={(e) => setNewTitle(e.target.value)}
        className="border border-slate-500 px-8 py-2"
        type="text"
        value={newTitle}
        placeholder="Add Document Name"
      />

      <input
        onChange={(e) => setNewDescription(e.target.value)}
        className="border border-slate-500 px-8 py-2"
        type="text"
        value={newDescription}
        placeholder="Add Document Description"
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-green-600 py-3 px-6 font-bold text-white w-fit disabled:bg-green-400"
      >
        {isSubmitting ? "Updating..." : "Edit Document"}
      </button>
    </form>
  );
}