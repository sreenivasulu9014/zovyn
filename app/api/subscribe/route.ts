import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const subscribersFilePath = path.join(process.cwd(), "data", "subscribers.json");

function readSubscribers() {
  try {
    const raw = fs.readFileSync(subscribersFilePath, "utf8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writeSubscribers(data: any[]) {
  try {
    fs.writeFileSync(subscribersFilePath, JSON.stringify(data, null, 2), "utf8");
  } catch (err) {
    console.error("Failed to write subscribers", err);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { contact, category } = body;

    if (!contact || contact.trim().length < 5) {
      return NextResponse.json({ error: "Invalid contact information" }, { status: 400 });
    }

    const subscribers = readSubscribers();
    const type = contact.includes("@") ? "email" : "whatsapp";

    // Deduplicate
    const exists = subscribers.some((s: any) => s.contact.toLowerCase() === contact.toLowerCase());
    if (!exists) {
      subscribers.push({
        id: `sub_${Date.now()}`,
        contact: contact.trim(),
        type,
        category: category || "all",
        createdAt: new Date().toISOString(),
      });
      writeSubscribers(subscribers);
    }

    return NextResponse.json({ success: true, message: "Subscription active" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Internal error" }, { status: 500 });
  }
}
