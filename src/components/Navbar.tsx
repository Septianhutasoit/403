"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Menu, X, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
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
        { name: "Lokasi", href: "/lokasi" },
    ];

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled
                    ? "bg-white/90 backdrop-blur-sm border-b border-slate-100/50 py-3"
                    : "bg-transparent py-2"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 sm:px-8">
                <div className="flex items-center justify-between h-12 sm:h-14">

                    {/* --- LOGO --- */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="bg-emerald-600 p-2 rounded-xl shadow-lg shadow-emerald-200 transform group-hover:scale-110 transition-all duration-500">
                            <Heart className="text-white w-6 h-6" fill="currentColor" />
                        </div>
                        <span className="text-xl sm:text-2xl font-bold tracking-tight">
                            <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                                Give
                            </span>
                            <span className="text-emerald-600">Care</span>
                        </span>
                    </Link>

                    {/* --- DESKTOP MENU --- */}
                    <div className="hidden md:flex items-center gap-2 lg:gap-4">
                        <div className="flex items-center gap-1 lg:gap-2 mr-4">
                            {navItems.map((item) => {
                                // Logika mengecek menu mana yang sedang aktif
                                const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));

                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`relative px-4 py-2 text-sm font-semibold transition-all duration-300 ${isActive ? "text-emerald-600" : "text-slate-500 hover:text-emerald-600"
                                            }`}
                                    >
                                        {item.name}
                                        {/* INDIKATOR TITIK (DOT) HALUS */}
                                        {isActive && (
                                            <motion.div
                                                layoutId="nav-indicator"
                                                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-emerald-600 rounded-full"
                                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                            />
                                        )}
                                    </Link>
                                );
                            })}
                        </div>

                        {/* CTA Button Modern (Satu warna/hitam bersih) */}
                        <button className="bg-slate-900 text-white px-7 py-2.5 rounded-full text-sm font-bold hover:bg-emerald-600 hover:shadow-xl hover:shadow-emerald-200 transition-all duration-300 flex items-center gap-2 group">
                            Daftar Sekarang
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                    {/* --- MOBILE BUTTON --- */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 rounded-xl hover:bg-slate-100 transition-colors"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* --- MOBILE MENU --- */}
            <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out bg-white border-b ${isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}>
                <div className="p-6 space-y-4">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="block text-lg font-bold text-slate-700 hover:text-emerald-600 transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {item.name}
                        </Link>
                    ))}
                    <button className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold">
                        Daftar Sekarang
                    </button>
                </div>
            </div>
        </nav>
    );
}