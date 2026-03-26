import { Pinecone } from "@pinecone-database/pinecone";

// Kita ambil key secara halus, jangan langsung mematikan aplikasi jika kosong
const apiKey = process.env.PINECONE_API_KEY || "";
const indexName = process.env.PINECONE_INDEX_NAME || "";

export const pinecone = new Pinecone({
    apiKey: apiKey,
});

// Kita hanya menginisialisasi index jika kuncinya ada
// Ini mencegah error saat Vercel sedang melakukan 'Static Optimization'
export const pineconeIndex = apiKey && indexName
    ? pinecone.Index(indexName)
    : (null as any);