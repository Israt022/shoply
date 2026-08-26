import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Auth handled by backend server at http://localhost:5000/auth" });
}

export async function POST() {
  return NextResponse.json({ message: "Auth handled by backend server at http://localhost:5000/auth" });
}