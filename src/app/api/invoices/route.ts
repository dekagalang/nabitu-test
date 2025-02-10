import { NextResponse } from "next/server";
import clientPromise from "../../../utils/mongodb";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const status = searchParams.get("status");

    const client = await clientPromise;
    const db = client.db("nabitu_db");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let query: any = {};
    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { number: { $regex: search, $options: "i" } },
        ],
      };
    }
    if (status && status !== "all") {
      query.status = status;
    }

    const invoices = await db
      .collection("invoices")
      .find(query)
      .sort({ dueDate: -1 })
      .toArray();

    return NextResponse.json(invoices);
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("nabitu_db");
    const body = await request.json();

    const result = await db.collection("invoices").insertOne(body);

    return NextResponse.json({ id: result.insertedId }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
