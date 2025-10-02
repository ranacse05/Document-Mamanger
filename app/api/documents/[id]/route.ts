import connectMongoDB from "@/libs/mongodb";
import Document from "@/models/document";
import { NextResponse } from "next/server";

export async function PUT(request: any, { params }: { params: { id: string } }) {
  const { id } = params;
  const { newTitle: title, newDescription: description } = await request.json();

  try {
    await connectMongoDB();
    // Use the $set operator to ensure fields are updated correctly
    await Document.findByIdAndUpdate(id, { $set: { title, description } });
    return NextResponse.json({ message: "Document Updated" }, { status: 200 });
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json({ message: "An error occurred." }, { status: 500 });
  }
}


export async function GET(request: any, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    await connectMongoDB();
    const Details = await Document.findOne({ _id: id});
    return NextResponse.json({ Details }, { status: 200 });
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json({ message: "An error occurred." }, { status: 500 });
  }
}