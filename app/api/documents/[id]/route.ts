import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "@/libs/mongodb";
import Document from "@/models/document";

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    await connectMongoDB();
    const body = await request.json();
    const { newTitle, newDescription } = body;

    // Validate input
    if (!newTitle || !newDescription) {
      return NextResponse.json(
        { error: "newTitle and newDescription are required" },
        { status: 400 }
      );
    }

    // Update document
    const updatedDoc = await Document.findByIdAndUpdate(
      id,
      { $set: { title: newTitle, description: newDescription, updatedAt: new Date() } },
      { new: true }
    );

    if (!updatedDoc) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Document updated", doc: updatedDoc }, { status: 200 });
  } catch (error) {
    console.error("API Route Error:", {
      id,
      body,
      error: error instanceof Error ? error.message : String(error),
    });
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    await connectMongoDB();
    const Details = await Document.findOne({ _id: id });
    if (!Details) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 });
    }
    return NextResponse.json({ Details }, { status: 200 });
  } catch (error) {
    console.error("API Route Error:", {
      id,
      error: error instanceof Error ? error.message : String(error),
    });
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}