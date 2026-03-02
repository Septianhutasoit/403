import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { Pinecone } from "@pinecone-database/pinecone";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { CohereEmbeddings } from "@langchain/cohere";
import { PineconeStore } from "@langchain/pinecone";
import * as fs from "fs";
import * as path from "path";

async function main() {
    // Pastikan API Key ada
    if (!process.env.PINECONE_API_KEY || !process.env.COHERE_API_KEY) {
        console.error("❌ API Keys tidak ditemukan di .env.local");
        return;
    }

    // 2. Inisialisasi Pinecone
    const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
    const index = pc.Index(process.env.PINECONE_INDEX_NAME!);

    const embeddings = new CohereEmbeddings({
        apiKey: process.env.COHERE_API_KEY,
        model: "embed-multilingual-v3.0",
    });

    const directoryPath = path.join(process.cwd(), "data/knowledge");

    if (!fs.existsSync(directoryPath)) {
        console.log("📁 Folder data/knowledge tidak ditemukan.");
        return;
    }

    const files = fs.readdirSync(directoryPath).filter(file => file.endsWith('.pdf'));

    if (files.length === 0) {
        console.log("ℹ️ Tidak ada file PDF di data/knowledge.");
        return;
    }

    console.log(`🚀 Ditemukan ${files.length} file PDF. Memulai proses...`);

    for (const file of files) {
        console.log(`📄 Memproses: ${file}...`);

        const loader = new PDFLoader(path.join(directoryPath, file));
        const rawDocs = await loader.load();

        const textSplitter = new RecursiveCharacterTextSplitter({
            chunkSize: 1000,
            chunkOverlap: 200,
        });

        const docs = await textSplitter.splitDocuments(rawDocs);
        console.log(`✂️  File ${file} dipecah menjadi ${docs.length} potongan.`);

        console.log(`📤 Mengunggah ke Pinecone...`);
        await PineconeStore.fromDocuments(docs, embeddings, {
            pineconeIndex: index,
            namespace: "lansia-health",
        });
    }

    console.log("✅ Berhasil! Semua dokumen PDF sudah masuk ke database Pinecone.");
}

main().catch((err) => {
    console.error("❌ Gagal melakukan ingestion:", err);
});