import connectMongoDB from "@/libs/mongodb";
import Document from "@/models/document";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { title, description } = await request.json();
        // Call and await the connection function here
        await connectMongoDB(); 

        await Document.create({ title, description });

        return NextResponse.json({ message: "Document Created" }, { status: 201 });
    } catch (error) {
        console.error("API Route Error:", error);
        return NextResponse.json({ message: "An error occurred." }, { status: 500 });
    }
}

export async function GET() {
    try {
        await connectMongoDB(); 
       const Documents = await Document.find();
        return NextResponse.json({ Documents }, { status: 201 });
    } catch (error) {
        console.error("API Route Error:", error);
        return NextResponse.json({ message: "An error occurred." }, { status: 500 });
    }
    
}

export async function DELETE(request: any) {
    const id = request.nextUrl.searchParams.get("id");
    try {
        await connectMongoDB(); 
        await Document.findByIdAndDelete(id);
        return NextResponse.json({ message: "Document Deleted" }, { status: 200 });
    } catch (error) {
        console.error("API Route Error:", error);
        return NextResponse.json({ message: "An error occurred." }, { status: 500 });
    }
    
}