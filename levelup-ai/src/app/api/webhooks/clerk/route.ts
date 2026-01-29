import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error("CLERK_WEBHOOK_SECRET not set");
    return NextResponse.json(
      { error: "Webhook secret not configured" },
      { status: 500 }
    );
  }

  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return NextResponse.json(
      { error: "Missing svix headers" },
      { status: 400 }
    );
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Webhook verification failed:", err);
    return NextResponse.json(
      { error: "Webhook verification failed" },
      { status: 400 }
    );
  }

  const eventType = evt.type;

  if (eventType === "user.created") {
    const { id, email_addresses, username, first_name, last_name, image_url } =
      evt.data;

    const email = email_addresses[0]?.email_address;
    if (!email) {
      return NextResponse.json(
        { error: "No email found for user" },
        { status: 400 }
      );
    }

    try {
      await db.user.create({
        data: {
          clerkId: id,
          email,
          username: username ?? `user_${id.slice(-8)}`,
          displayName:
            `${first_name ?? ""} ${last_name ?? ""}`.trim() || null,
          avatarUrl: image_url,
        },
      });
    } catch (error) {
      console.error("Failed to create user:", error);
      return NextResponse.json(
        { error: "Failed to create user" },
        { status: 500 }
      );
    }
  }

  if (eventType === "user.updated") {
    const { id, email_addresses, username, first_name, last_name, image_url } =
      evt.data;

    const email = email_addresses[0]?.email_address;

    try {
      await db.user.update({
        where: { clerkId: id },
        data: {
          email: email ?? undefined,
          username: username ?? undefined,
          displayName:
            `${first_name ?? ""} ${last_name ?? ""}`.trim() || null,
          avatarUrl: image_url,
        },
      });
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  }

  if (eventType === "user.deleted") {
    const { id } = evt.data;

    if (id) {
      try {
        await db.user.delete({
          where: { clerkId: id },
        });
      } catch (error) {
        console.error("Failed to delete user:", error);
      }
    }
  }

  return NextResponse.json({ success: true });
}
