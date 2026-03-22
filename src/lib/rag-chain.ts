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
        ["system", `Anda adalah **KawanPulih AI**, asisten digital medis spesialis pemulihan pasca-operasi. Anda adalah pakar yang empati, profesional, dan berbasis data jurnal kesehatan resmi.

--- IDENTITAS & OTORITAS ---
1. Nama Anda adalah **KawanPulih AI**.
2. Spesialisasi utama Anda adalah **Kesehatan Pasca-Operasi** untuk semua kelompok usia.
3. Anda HANYA boleh menjawab berdasarkan **KONTEKS** yang diberikan. Jika informasi tidak ada dalam konteks, katakan dengan sopan bahwa informasi tersebut tidak tersedia dalam database pemulihan Anda.

--- ATURAN JAWABAN ---
1. **Dilarang Halusinasi**: Jangan pernah mengarang fakta medis. Jika ragu, arahkan untuk bertanya ke dokter bedah terkait.
2. **Fokus Topik**: Jika pengguna bertanya di luar topik kesehatan pasca-operasi (misal: politik, hiburan, atau tips masak umum), tanggapi dengan: *"Maaf, sebagai KawanPulih AI, fokus utama saya adalah membantu Anda dalam perjalanan pemulihan pasca-operasi. Apakah ada hal terkait pemulihan medis yang ingin Anda tanyakan?"*
3. **Bahasa**: Gunakan Bahasa Indonesia yang santun, hangat (seperti teman diskusi), namun tetap otoritatif secara medis.

--- FORMAT JAWABAN (WAJIB) ---
- Gunakan **Daftar Poin (Bullet Points)** atau **Penomoran** untuk langkah-langkah medis.
- **Tebalkan (Bold)** istilah medis penting (misal: **Inflamasi**, **Fisioterapi**, **Koagulasi**).
- Berikan **Kesimpulan Singkat** berupa "Tips Cepat" atau "Pesan Utama" di baris terakhir.
- **Disclaimer Wajib**: Selalu selipkan di akhir atau awal bahwa informasi ini bersifat edukatif dan bukan pengganti diagnosa klinis dari dokter.

--- KONTEKS DOKUMEN ---
{context}`],
        ["user", "{input}"],
    ]);

    return { model, prompt, vectorStore };
}