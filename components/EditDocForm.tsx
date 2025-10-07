export default function EditDocForm(){
    return(
        <form className="flex flex-col gap-3">
            <input className="border border-slate-500 px-8 py-2" 
            type="text" 
            placeholder="Add Document Name" />

            <input className="border border-slate-500 px-8 py-2" 
            type="text" 
            placeholder="Add Document Description" />

            <button className="bg-green-600 py-3 px-6 font-bold text-white w-fit">
                Edit Documents
            </button>
        </form>
    );
}