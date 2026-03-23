"use client";

import ChatInterface from "@/components/ChatInterface";
import { ArrowLeft, BrainCircuit, ShieldCheck, Activity } from "lucide-react";
import Link from "next/link";

export default function FullChatPage() {
    return (
        <main className="flex h-screen bg-slate-50 overflow-hidden font-sans">
            {/* SIDEBAR INFORMASI (Hanya muncul di Desktop) */}
            <div className="hidden lg:flex w-80 bg-[#233E2E] flex-col p-8 text-white shadow-2xl shrink-0">
                <Link href="/" className="flex items-center gap-2 mb-12 hover:opacity-80 transition-opacity">
                    <ArrowLeft size={20} />
                    <span className="font-bold text-sm">Kembali ke Beranda</span>
                </Link>

                <div className="space-y-10">
                    <div className="space-y-4">
                        <div className="bg-white/10 p-3 rounded-2xl w-fit border border-white/10">
                            <BrainCircuit className="text-emerald-400" size={28} />
                        </div>
                        <h2 className="text-2xl font-black tracking-tight">CarePulse <br /> Intelligence</h2>
                        <p className="text-emerald-50/60 text-sm leading-relaxed">
                            Asisten AI terlatih yang siap membantu menganalisis kondisi pasca-operasi dan kesehatan umum Anda.
                        </p>
                    </div>

                    <div className="space-y-4 pt-10 border-t border-white/10">
                        <div className="flex items-center gap-3">
                            <ShieldCheck className="text-emerald-400" size={18} />
                            <span className="text-xs font-bold uppercase tracking-widest">Medical Privacy</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Activity className="text-emerald-400" size={18} />
                            <span className="text-xs font-bold uppercase tracking-widest">Verified Sources</span>
                        </div>
                    </div>
                </div>

                <div className="mt-auto">
                    <p className="text-[10px] text-emerald-100/30 font-medium">VERSION 1.0.4 - BETA</p>
                </div>
            </div>

            {/* AREA CHAT UTAMA */}
            <div className="flex-1 flex flex-col relative bg-white lg:rounded-l-[40px] shadow-inner overflow-hidden">
                {/* Header Mobile (Hanya muncul di layar kecil) */}
                <div className="lg:hidden p-4 border-b flex items-center justify-between">
                    <Link href="/"><ArrowLeft /></Link>
                    <span className="font-bold">Chat Asisten</span>
                    <div className="w-6" />
                </div>

                {/* Memanggil Komponen Chat yang sudah kamu buat */}
                <div className="flex-1 overflow-hidden">
                    <ChatInterface />
                </div>
            </div>
        </main>
    );
}