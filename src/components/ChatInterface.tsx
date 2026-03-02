"use client";

import { useChat } from "ai/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, User, Send, Loader2, Trash2, Sparkles, ChevronRight, Zap } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";

// --- KOMPONEN TYPEWRITER ---
const Typewriter = ({ text, speed = 10 }: { text: string; speed?: number }) => {
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        let i = 0;
        setDisplayedText(""); // Reset setiap ada teks baru
        const typingInterval = setInterval(() => {
            if (i < text.length) {
                setDisplayedText(text.slice(0, i + 1));
                i++;
            } else {
                clearInterval(typingInterval);
            }
        }, speed);

        return () => clearInterval(typingInterval);
    }, [text, speed]);

    return (
        <div className="prose prose-sm max-w-none break-words prose-p:leading-relaxed prose-li:my-1 prose-strong:text-emerald-600 [&&]:text-inherit">
            <ReactMarkdown>{displayedText}</ReactMarkdown>
        </div>
    );
};

const STARTER_QUESTIONS = [
    "Bagaimana cara meningkatkan imun tubuh setelah operasi?",
    "Tips pola makan untuk penderita hipertensi",
    "Rekomendasi menjaga kesehatan mental pasca operasi",
    "Cara booking konsultasi dengan dokter spesialis?",
    "Apa tanda komplikasi pasca operasi yang diwaspadai?"
];

export default function ChatInterface() {
    const { messages, input, setInput, handleInputChange, handleSubmit, isLoading, setMessages } = useChat({
        api: "/api/chat",
    });

    const scrollRef = useRef<HTMLDivElement>(null);

    // --- LOGIKA AUTO-SCROLL (MUTATION OBSERVER) ---
    useEffect(() => {
        const scrollToBottom = () => {
            if (scrollRef.current) {
                const viewport = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
                if (viewport) {
                    viewport.scrollTop = viewport.scrollHeight;
                }
            }
        };

        const observer = new MutationObserver(scrollToBottom);
        const viewport = scrollRef.current?.querySelector('[data-radix-scroll-area-viewport]');

        if (viewport) {
            observer.observe(viewport, {
                childList: true,
                subtree: true,
                characterData: true,
            });
        }

        scrollToBottom();
        return () => observer.disconnect();
    }, [messages, isLoading]);

    const handleNewChat = () => {
        setMessages([]);
        setInput("");
    };

    return (
        <div className="flex flex-col h-full w-full bg-white font-sans">
            {/* Header Panel */}
            <div className="px-4 py-3 border-b bg-white/50 backdrop-blur-md flex justify-between items-center shrink-0">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">CarePulse AI Online</span>
                </div>
                <Button variant="ghost" size="sm" onClick={handleNewChat} className="h-8 text-slate-400 hover:text-red-500 gap-1.5 transition-all">
                    <Trash2 size={14} />
                    <span className="text-[10px] font-bold uppercase">Hapus Chat</span>
                </Button>
            </div>

            <ScrollArea className="flex-1 px-4 py-2" ref={scrollRef}>
                <div className="space-y-6 pb-10 pt-4">
                    <AnimatePresence initial={false}>
                        {messages.length === 0 && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center justify-center mt-12 text-center">
                                <div className="w-16 h-16 bg-gradient-to-tr from-emerald-500 to-teal-400 rounded-3xl flex items-center justify-center shadow-2xl shadow-emerald-100 mb-6 rotate-3">
                                    <Zap className="text-white w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-black text-slate-800 tracking-tighter">Intelligence Healthcare</h3>
                                <p className="text-xs text-slate-400 mb-8 max-w-[240px]">Asisten cerdas Anda untuk segala pertanyaan kesehatan medis.</p>

                                <div className="grid grid-cols-1 gap-2 w-full max-w-xs">
                                    {STARTER_QUESTIONS.map((q, i) => (
                                        <button key={i} onClick={() => setInput(q)} className="group flex items-center justify-between p-3.5 text-left text-xs bg-slate-50 hover:bg-emerald-500 hover:text-white rounded-2xl transition-all duration-300">
                                            <span className="font-semibold">{q}</span>
                                            <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {messages.map((m, idx) => (
                            <motion.div
                                key={m.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                            >
                                <div className={`flex gap-3 max-w-[90%] ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                                    <div className={`p-4 rounded-[24px] text-sm shadow-sm relative ${m.role === "user"
                                        ? "bg-slate-900 text-white rounded-tr-none shadow-md shadow-slate-200"
                                        : "bg-white border border-slate-100 text-slate-800 rounded-tl-none shadow-sm"
                                        }`}>

                                        {m.role === "user" ? (
                                            <span className="font-medium whitespace-pre-wrap">{m.content}</span>
                                        ) : (
                                            <div className="relative group">
                                                <Typewriter text={m.content} />

                                                {/* Ikon Animasi di Akhir Teks AI */}
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.5 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: 0.5 }}
                                                    className="flex justify-end items-center mt-3 pt-2 border-t border-emerald-50"
                                                >
                                                    <div className="flex items-center gap-1.5 bg-emerald-50 px-2 py-0.5 rounded-full">
                                                        <span className="text-[9px] font-black text-emerald-600 uppercase tracking-tighter">Verified Response</span>
                                                        <Sparkles size={10} className="text-emerald-500 animate-pulse" />
                                                    </div>
                                                </motion.div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="flex gap-2 items-center bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
                                <Loader2 size={12} className="animate-spin text-emerald-500" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">Thinking</span>
                            </div>
                        </div>
                    )}
                </div>
            </ScrollArea>

            {/* Input Form */}
            <div className="p-4 bg-white border-t">
                <form onSubmit={handleSubmit} className="relative flex items-center max-w-4xl mx-auto">
                    <Input
                        value={input}
                        placeholder="Tanyakan pesan kesehatan..."
                        onChange={handleInputChange}
                        className="flex-1 rounded-2xl h-14 pl-6 pr-16 bg-slate-50 border-none text-base focus-visible:ring-emerald-500 focus-visible:bg-white transition-all shadow-inner"
                    />
                    <Button
                        type="submit"
                        disabled={isLoading || !input}
                        className="absolute right-2 h-10 w-10 rounded-xl bg-emerald-500 hover:bg-slate-900 text-white shadow-xl transition-all duration-500"
                    >
                        <Send size={18} />
                    </Button>
                </form>
            </div>
        </div>
    );
}