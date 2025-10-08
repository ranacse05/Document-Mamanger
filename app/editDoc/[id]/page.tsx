import EditDocForm from "@/components/EditDocForm";

interface Document {
  _id: string;
  title: string;
  description: string;
}

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const getDoc = async (id: string): Promise<Document | null> => {
  try {
    const res = await fetch(`http://localhost:3000/api/documents/${id}`, {
      cache: "no-store",
    });

    console.log("API Response Status:", res.status, res.statusText);
    if (!res.ok) {
      throw new Error(`Failed to fetch document: ${res.statusText}`);
    }

    const data = await res.json();
    console.log("Raw API Response:", data);

    // Handle different response structures
    const doc = data.Details || data.doc || data;

    // Validate the document
    if (!doc || !doc._id) {
      console.error("Invalid document: missing ID or document", doc);
      throw new Error("Invalid document structure");
    }

    // Normalize to ensure title and description are strings
    const normalizedDoc: Document = {
      _id: doc._id,
      title: typeof doc.title === "string" ? doc.title : "",
      description: typeof doc.description === "string" ? doc.description : "",
    };

    console.log("Normalized Document:", normalizedDoc);
    return normalizedDoc;
  } catch (error) {
    console.error("Error fetching document:", error);
    return null;
  }
};

export default async function EditDoc({ params }: PageProps) {
  const { id } = await params;
  console.log("Document ID:", id);

  const doc = await getDoc(id);

  if (!doc) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">Failed to load document</div>
      </div>
    );
  }

  const { title, description } = doc;
  console.log("Document Data for Form:", { id, title, description });

  return <EditDocForm key={id} id={id} title={title} description={description} />;
}