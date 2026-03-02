import { Pinecone } from "@pinecone-database/pinecone";

if (!process.env.PINECONE_API_KEY) {
    throw new Error("Missing PINECONE_API_KEY");
}

export const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
});

export const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX_NAME!);