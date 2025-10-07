import RemoveBtn from "./RemoveBtn";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";

const getDocs = async () => {
    try {
        const res = await fetch('http://localhost:3000/api/documents', {
            cache: "no-store",
        }); 
        if (!res.ok) {
            throw new Error(`Failed to fetch documents: ${res.status}`);
        }
        const json = await res.json();
        console.log('Fetched documents:', json); // Debugging
        return json;
    } catch (error) {
        console.error("Error loading documents:", error);
        return { Documents: [] };
    }
};

export default async function DocList() {
    const result = await getDocs();
    const documents = result?.Documents || [];

    return (
        <>
            {documents.length === 0 ? (
                <p>No documents found.</p>
            ) : (
                documents.map((t) => (
                    <div
                        key={t._id}
                        className="p-4 border border-slate-300 my-3 flex justify-between gap-5 rounded-b-sm items-start"
                    >
                        <div>
                            <h2 className="font-bold text-2xl">{t.title}</h2>
                            <div>{t.description}</div>
                        </div>
                        <div className="flex gap-2">
                            <RemoveBtn id={t._id} />
                            <Link href={`/editDoc/${t._id}`}>
                                <HiPencilAlt size={24} />
                            </Link>
                        </div>
                    </div>
                ))
            )}
        </>
    );
}