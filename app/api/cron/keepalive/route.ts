import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import { sendTelegramMessage } from "@/lib/telegram";

export async function GET(request: Request) {
  try {
    const auth = request.headers.get("authorization");

    if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { data, error } = await supabaseServer
      .from("keepalive")
      .insert({
        source: "vercel-cron",
      })
      .select()
      .single();

    if (error) {
      await sendTelegramMessage(
        `❌ KEEPALIVE FAILED\n${JSON.stringify(error, null, 2)}`
      );

      return NextResponse.json(
        { success: false, error },
        { status: 500 }
      );
    }

    await sendTelegramMessage(
      `✅ KEEPALIVE OK

ID: ${data.id}
Created: ${data.created_at}
Source: ${data.source}`
    );

    return NextResponse.json({
      success: true,
      row: data,
    });
  } catch (err) {
    const message =
      err instanceof Error ? err.stack ?? err.message : String(err);

    await sendTelegramMessage(`❌ EXCEPTION\n${message}`);

    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}