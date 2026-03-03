import { NextRequest } from "next/server";
import { LangChainAdapter } from "ai";
import { getRAGChain } from "@/lib/rag-chain";

// Membatasi durasi eksekusi agar tidak terjadi timeout 120 detik di server
export const maxDuration = 30;

export async function POST(req: NextRequest) {
    try {
        const { messages } = await req.json();

        // 1. Ambil pesan terakhir dan bersihkan teksnya
        let lastMessage = messages[messages.length - 1].content;
        if (typeof lastMessage !== "string") {
            lastMessage = JSON.stringify(lastMessage);
        }

        // 2. Ambil komponen mesin AI kita
        const { model, prompt, vectorStore } = await getRAGChain();

        // 3. MENCARI DOKUMEN (Optimasi k=1 agar sangat cepat)
        // Menggunakan k=1 cukup untuk demo lomba agar respon instan keluar
        const retriever = vectorStore.asRetriever({ k: 1 });
        const docs = await retriever.invoke(lastMessage);

        // Gabungkan teks dari PDF (jika ada)
        const contextText = docs.length > 0
            ? docs.map(doc => doc.pageContent).join("\n")
            : "Gunakan pengetahuan umum jika tidak ada di dokumen.";

        // 4. FORMAT PROMPT (Gunakan format sapaan yang sudah kita buat di rag-chain)
        const messagesForModel = await prompt.formatMessages({
            context: contextText,
            input: lastMessage,
        });

        // 5. STREAMING (Langsung panggil stream)
        // Tanpa pembungkus tambahan agar data mentah langsung mengalir ke UI
        const stream = await model.stream(messagesForModel);

        // 6. KIRIM KE UI (Gunakan Adapter Vercel AI SDK)
        return LangChainAdapter.toDataStreamResponse(stream);

    } catch (error: any) {
        console.error("CRITICAL CHAT ERROR:", error);
        return new Response(
            JSON.stringify({
                error: "Maaf, sistem sedang sibuk. Silakan coba beberapa saat lagi.",
                detail: error.message
            }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}