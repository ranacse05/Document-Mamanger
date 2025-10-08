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
    
    if (!res.ok) {
      throw new Error('Failed to fetch document');
    }

    const data = await res.json();
    return data.doc || data; 
  } catch (error) {
    console.log("Error fetching document:", error);
    return null;
  }
}

export default async function EditDoc({ params }: PageProps) {
  
  const { id } = await params;
  const doc = await getDoc(id);
  
  if (!doc) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">Failed to load document</div>
      </div>
    );
  }

  const { title, description } = doc;
  console.log("from page.tsx ");
  console.log(doc);

  return (
    <EditDocForm id={id} title={title} description={description} />
  );
}