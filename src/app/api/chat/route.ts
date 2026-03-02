import { NextRequest } from "next/server";
import { LangChainAdapter } from "ai";
import { getRAGChain } from "@/lib/rag-chain";

export async function POST(req: NextRequest) {
    try {
        const { messages } = await req.json();

        // 1. Ambil pesan terakhir dan pastikan dia STRING
        let lastMessage = messages[messages.length - 1].content;
        if (typeof lastMessage !== "string") {
            lastMessage = JSON.stringify(lastMessage);
        }

        const { model, prompt, vectorStore } = await getRAGChain();

        // 2. MENCARI DOKUMEN (Manual)
        // Kita cari dulu dokumennya, lalu ambil teksnya saja
        const retriever = vectorStore.asRetriever({ k: 2 });
        const docs = await retriever.invoke(lastMessage);

        // Gabungkan konten PDF menjadi satu string teks bersih
        const contextText = docs.map(doc => doc.pageContent).join("\n\n");

        // 3. FORMAT PROMPT
        const messagesForModel = await prompt.formatMessages({
            context: contextText,
            input: lastMessage,
        });

        // 4. STREAMING JAWABAN
        // Langsung panggil model.stream agar lebih cepat dan ringan
        const stream = await model.stream(messagesForModel);

        // 5. KIRIM KE UI
        return LangChainAdapter.toDataStreamResponse(stream);

    } catch (error: any) {
        console.error("DEBUG ERROR:", error);
        return new Response(
            JSON.stringify({ error: error.message || "Terjadi kesalahan" }),
            { status: 500 }
        );
    }
}