"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Maximize2, Minimize2, Bot, Sparkles } from "lucide-react";
import ChatInterface from "./ChatInterface";

export default function FloatingChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const toggleChat = () => {
        setIsOpen(!isOpen);
        if (isOpen) setIsFullscreen(false);
    };

    const toggleFullscreen = () => setIsFullscreen(!isFullscreen);

    return (
        <>
            {/* --- TOMBOL BUBBLE (FAB) --- */}
            {!isOpen && (
                <motion.button
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleChat}
                    className="fixed bottom-8 right-8 w-16 h-16 bg-white rounded-full shadow-[0_15px_50px_-10px_rgba(16,185,129,0.4)] flex items-center justify-center z-50 border-2 border-emerald-100 group"
                >
                    <div className="relative w-11 h-11 flex items-center justify-center pointer-events-none">
                        <img
                            src="/chat-icon.png"
                            alt="AI Assistant"
                            className="w-full h-full object-contain transition-all duration-300 group-hover:scale-110"
                        />
                    </div>

                    {/* Badge AI Modern */}
                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-emerald-600 to-teal-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow-md border-2 border-white animate-bounce">
                        AI
                    </span>

                    {/* Efek Glow di belakang */}
                    <div className="absolute inset-0 rounded-full bg-emerald-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>
            )}

            {/* --- OVERLAY CHAT WINDOW --- */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ y: 50, opacity: 0, scale: 0.95 }}
                        animate={{
                            y: 0,
                            opacity: 1,
                            scale: 1,
                            width: isFullscreen ? "100%" : "420px",
                            height: isFullscreen ? "100%" : "650px",
                            bottom: isFullscreen ? 0 : "32px",
                            right: isFullscreen ? 0 : "32px",
                            borderRadius: isFullscreen ? "0px" : "28px"
                        }}
                        exit={{ y: 50, opacity: 0, scale: 0.95 }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed z-[100] bg-white shadow-[0_30px_100px_-20px_rgba(0,0,0,0.2)] border border-slate-100 flex flex-col overflow-hidden"
                    >
                        {/* Header Chat Modern */}
                        <div className="bg-emerald-600 px-5 py-4 flex items-center justify-between text-white shrink-0 shadow-lg">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-md">
                                    <Bot size={20} className="text-white" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-bold text-sm tracking-tight leading-none">Asisten CarePulse AI</span>
                                    <span className="text-[10px] opacity-70 flex items-center gap-1 mt-1">
                                        <div className="w-1.5 h-1.5 bg-green-300 rounded-full animate-pulse" /> Online & Active
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={toggleFullscreen}
                                    className="p-2 hover:bg-white/20 rounded-xl transition-all"
                                    title="Layar Penuh"
                                >
                                    {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                                </button>
                                <button
                                    onClick={toggleChat}
                                    className="p-2 hover:bg-white/20 rounded-xl transition-all"
                                    title="Tutup"
                                >
                                    <X size={18} />
                                </button>
                            </div>  
                        </div>

                        {/* Isi Chat */}
                        <div className="flex-1 relative overflow-hidden bg-[#F8FAFC]">
                            <ChatInterface />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Background Dimmer saat Fullscreen */}
            {isOpen && isFullscreen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[90]"
                />
            )}
        </>
    );
}