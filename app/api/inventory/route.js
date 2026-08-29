import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const databaseUrl =
      process.env.DATABASE_URL ||
      process.env.STORAGE_URL;

    if (!databaseUrl) {
      throw new Error("Database connection URL is missing.");
    }

    const sql = neon(databaseUrl);

    const inventory = await sql`
      SELECT
        product_id,
        title,
        inventory_type,
        quantity,
        price_cents,
        active
      FROM inventory
      ORDER BY title
    `;

    return NextResponse.json(inventory);
  } catch (error) {
    console.error("Inventory API error:", error);

    return NextResponse.json(
      { error: "Unable to retrieve inventory." },
      { status: 500 }
    );
  }
}