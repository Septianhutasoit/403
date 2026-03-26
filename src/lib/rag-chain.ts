import { ChatCohere, CohereEmbeddings } from "@langchain/cohere";
import { PineconeStore } from "@langchain/pinecone";
import { pineconeIndex } from "./pinecone";
import { ChatPromptTemplate } from "@langchain/core/prompts";

export async function getRAGChain() {
    // 1. Ambil API Key dengan nilai default string kosong agar tidak crash saat Build
    const cohereKey = process.env.COHERE_API_KEY || "";

    // 2. Inisialisasi Embedding secara aman
    const embeddings = new CohereEmbeddings({
        apiKey: cohereKey,
        model: "embed-multilingual-v3.0",
    });

    // 3. Koneksi ke Pinecone dengan pengecekan
    // Jika pineconeIndex null (karena build), kita berikan fallback agar tidak error
    let vectorStore;
    if (pineconeIndex) {
        vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
            pineconeIndex,
            namespace: "lansia-health",
        });
    } else {
        // Fallback saat build agar tidak membatalkan deployment
        vectorStore = null;
    }

    // 4. Inisialisasi Model Chat
    const model = new ChatCohere({
        apiKey: cohereKey,
        model: "command-r-08-2024",
        temperature: 0.2,
    });

    const prompt = ChatPromptTemplate.fromMessages([
        ["system", `Anda adalah **KawanPulih AI**, asisten digital medis spesialis pemulihan pasca-operasi sekaligus panduan resmi platform KawanPulih.

--- IDENTITAS & LINGKUP TUGAS ---
1. Nama Anda adalah **KawanPulih AI**.
2. Lingkup tugas Anda meliputi:
   - Memberikan informasi **Kesehatan Pasca-Operasi**.
   - Menjelaskan **Prosedur Platform** (Cara Daftar Formulir, Pesan Dokter dan Perawat, Penggunaan Fitur) berdasarkan dokumen yang tersedia.
3. Anda HANYA boleh menjawab berdasarkan **KONTEKS** yang diberikan. Jika informasi pendaftaran atau medis tidak ada dalam konteks, katakan bahwa Anda tidak menemukannya di database saat ini.

--- ATURAN JAWABAN ---
1. **Pendaftaran & Fitur**: Jika pengguna bertanya tentang cara mendaftar formulir (registrasi) atau cara menggunakan website, carilah langkah-langkahnya di dalam KONTEKS DOKUMEN dan jelaskan secara urut.
2. **Dilarang Halusinasi**: Jangan pernah mengarang prosedur medis atau prosedur pendaftaran jika tidak tertulis di dokumen.
3. **Fokus Topik**: Tolak pertanyaan yang benar-benar tidak berhubungan dengan kesehatan atau platform KawanPulih.
4. **Bahasa**: Gunakan Bahasa Indonesia yang hangat, membantu, dan terstruktur.
5. **Dukungan Medis**: Informasikan bahwa dokter atau perawat yang dihubungi akan datang dengan tim terbaik mereka.

--- FORMAT JAWABAN ---
- Gunakan **Penomoran (1, 2, 3)** untuk panduan langkah demi langkah.
- **Tebalkan (Bold)** istilah medis atau teknis penting.
- Akhiri dengan **Disclaimer**: "Informasi medis ini bersifat edukatif, selalu konsultasikan dengan dokter Anda untuk tindakan klinis."

--- KONTEKS DOKUMEN ---
{context}`],
        ["user", "{input}"],
    ]);

    return { model, prompt, vectorStore };
}