import connectMongoDB from "@/libs/mongodb";
import { NextResponse } from "next/server";

export async function POST(request: string) {

    const {title, description} = awit request.json();
    awit connectMongoDB();
    awit Document.create({title, description});
    return NextResponse.json({message: "Document Created"}, {status:201});
}