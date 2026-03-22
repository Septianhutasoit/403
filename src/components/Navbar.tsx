"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            // Jika scroll lebih dari 20px, ganti state
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navItems = [
        { name: "Beranda", href: "/" },
        { name: "Edukasi", href: "/edukasi" },
        { name: "Dokter", href: "/dokter" },
        { name: "Layanan", href: "/layanan" },
        { name: "Kontak", href: "/kontak" },
    ];

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled
                    ? "bg-white/95 backdrop-blur-sm border-b border-slate-100 py-2 shadow-sm"
                    : "bg-transparent py-4"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 sm:px-8">
                <div className="flex items-center justify-between h-12 sm:h-14">

                    {/* --- LOGO AREA --- */}
                    <Link href="/" className="flex items-center gap-3 group">
                        {/* PEMBUNGKUS LOGO: Menggunakan rounded-2xl agar sudut tumpul tapi tidak bulat sempurna */}
                        <div className={`relative w-10 h-10 sm:w-11 sm:h-11 overflow-hidden rounded-2xl transition-all duration-500 shadow-sm flex items-center justify-center ${isScrolled
                                ? "border border-slate-100 bg-white"
                                : "border border-white/20 bg-white/5"
                            }`}>
                            <img
                                src={isScrolled ? "/logo1.png" : "/logo2.png"}
                                alt="Logo"
                                // object-cover agar gambar mengisi ruang dengan rapi
                                className="w-full h-full object-cover transform transition-transform group-hover:scale-110"
                            />
                        </div>

                        {/* Bagian Teks */}
                        <div className="flex flex-col">
                            <span className={`text-xl font-black tracking-tighter leading-tight transition-colors duration-500 ${isScrolled ? "text-slate-900" : "text-white"
                                }`}>
                                Kawan<span className="text-emerald-500">Pulih</span>
                            </span>
                            <span className={`text-[9px] font-bold uppercase tracking-widest leading-none transition-opacity duration-500 ${isScrolled ? "text-slate-400" : "text-white/60"
                                }`}>
                                Medical AI
                            </span>
                        </div>
                    </Link>
                    
                    {/* --- DESKTOP MENU --- */}
                    <div className="hidden md:flex items-center gap-2 lg:gap-4">
                        <div className="flex items-center gap-1 lg:gap-2 mr-2">
                            {navItems.map((item) => {
                                const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));

                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`relative px-4 py-2 text-[13px] font-bold tracking-wide transition-all duration-300 ${isActive
                                                ? "text-emerald-500"
                                                : isScrolled
                                                    ? "text-slate-600 hover:text-emerald-500"
                                                    : "text-white/90 hover:text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]"
                                            }`}
                                    >
                                        {item.name}
                                        {isActive && (
                                            <motion.div
                                                layoutId="nav-indicator"
                                                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                            />
                                        )}
                                    </Link>
                                );
                            })}
                        </div>

                        {/* CTA Button Ramping */}
                        <button className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 flex items-center gap-2 group shadow-lg ${isScrolled
                                ? "bg-slate-900 text-white hover:bg-emerald-600"
                                : "bg-emerald-500 text-white hover:bg-white hover:text-emerald-600"
                            }`}>
                            Daftar
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                    {/* --- MOBILE TOGGLE --- */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className={`md:hidden p-2 rounded-xl transition-colors ${isScrolled ? "text-slate-600 hover:bg-slate-100" : "text-white hover:bg-white/10"
                            }`}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* --- MOBILE MENU --- */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-b border-slate-100 overflow-hidden"
                    >
                        <div className="p-6 space-y-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="block text-lg font-bold text-slate-700 hover:text-emerald-600"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <button className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold">
                                Daftar Sekarang
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}