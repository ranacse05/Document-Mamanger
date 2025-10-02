import RemoveBtn from "./RemoveBtn";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";

export default function DocList(){
    return(
        <>
        <div className="p-4 border border-slate-300 my-3 flex justify-between gap-5 rounded-b-sm items-start" >
            <div>
                <h2 className="font-bold text-2xl">Document Title</h2>
                <div>Document Description</div>
            </div>
            <div className="flex gap-2">
                <RemoveBtn />
                <Link href={'/editDoc/123'}>
                    <HiPencilAlt size={24} />
                </Link>
            </div>
        </div>
        </>
    )
}