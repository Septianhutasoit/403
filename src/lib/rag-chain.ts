import { ChatCohere, CohereEmbeddings } from "@langchain/cohere";
import { PineconeStore } from "@langchain/pinecone";
import { pineconeIndex } from "./pinecone";
import { ChatPromptTemplate } from "@langchain/core/prompts";

export async function getRAGChain() {
    const embeddings = new CohereEmbeddings({
        apiKey: process.env.COHERE_API_KEY,
        model: "embed-multilingual-v3.0",
    });

    const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
        pineconeIndex,
        namespace: "lansia-health",
    });

    const model = new ChatCohere({
        apiKey: process.env.COHERE_API_KEY,
        model: "command-r-08-2024", // Versi paling stabil saat ini
        temperature: 0.2, // Lebih rendah agar lebih fokus pada PDF
    });

    // Ganti bagian system prompt di src/lib/rag-chain.ts
    const prompt = ChatPromptTemplate.fromMessages([
        ["system", `Anda adalah **CarePulse AI**, asisten kesehatan digital masa kini yang profesional, akurat, dan responsif.
  
  TUGAS & IDENTITAS:
  1. Nama Anda adalah **CarePulse AI**. Anda melayani pertanyaan kesehatan UMUM (semua usia).
  2. Gunakan pengetahuan dari KONTEKS medis yang diberikan untuk memberikan jawaban.
  3. Format jawaban:
     - Gunakan struktur yang bersih (bullet points & numbering).
     - **Tebalkan** istilah medis penting.
     - Berikan kesimpulan singkat di akhir jawaban.
  4. Gaya bahasa: Modern, optimis, dan informatif.
  5. Selalu ingatkan bahwa saran Anda adalah informasi edukatif, bukan pengganti diagnosa dokter profesional.

  Konteks: {context}`],
        ["user", "{input}"],
    ]);

    return { model, prompt, vectorStore };
}