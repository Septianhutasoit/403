"use client";

import Navbar from "@/components/Navbar";
import FloatingChat from "@/components/FloatingChat";
import Link from "next/link";
import { BookOpen, Video, FileText, ChevronRight } from "lucide-react";

export default function EdukasiPage() {
    return (
        <main className="min-h-screen bg-slate-50">
            <Navbar />

            <div className="pt-24 px-4 sm:px-6 max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Pusat Edukasi Kesehatan Lansia</h1>

                {/* Konten edukasi */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Link href="/edukasi/artikel">
                        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all">
                            <FileText className="w-12 h-12 text-emerald-600 mb-4" />
                            <h2 className="text-xl font-bold mb-2">Artikel Kesehatan</h2>
                            <p className="text-slate-500 mb-4">Baca artikel kesehatan terbaru dari para ahli</p>
                            <span className="text-emerald-600 flex items-center gap-1">
                                Lihat Semua <ChevronRight className="w-4 h-4" />
                            </span>
                        </div>
                    </Link>

                    <Link href="/edukasi/video">
                        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all">
                            <Video className="w-12 h-12 text-emerald-600 mb-4" />
                            <h2 className="text-xl font-bold mb-2">Video Edukasi</h2>
                            <p className="text-slate-500 mb-4">Tonton video penjelasan seputar kesehatan lansia</p>
                            <span className="text-emerald-600 flex items-center gap-1">
                                Lihat Semua <ChevronRight className="w-4 h-4" />
                            </span>
                        </div>
                    </Link>

                    <Link href="/edukasi/panduan">
                        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all">
                            <BookOpen className="w-12 h-12 text-emerald-600 mb-4" />
                            <h2 className="text-xl font-bold mb-2">Panduan PDF</h2>
                            <p className="text-slate-500 mb-4">Unduh panduan lengkap perawatan lansia</p>
                            <span className="text-emerald-600 flex items-center gap-1">
                                Lihat Semua <ChevronRight className="w-4 h-4" />
                            </span>
                        </div>
                    </Link>
                </div>
            </div>

            <FloatingChat />
        </main>
    );
}