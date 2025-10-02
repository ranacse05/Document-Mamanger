import Link from "next/link";

export default function Navbar(){

    return(
        <nav className="flex justify-between items-center bg-blue-300 px-8 py-3">
            <Link className="text-blue-900 font-bold" href={'/'}>Doc Manager</Link>
            <Link className="bg-white p-2 rounded-sm" href={'/addDoc'}>Add Document</Link>
        </nav>
    )
}