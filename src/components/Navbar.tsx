"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Menu, X } from "lucide-react";

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

    // Menutup mobile menu saat route berubah
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    const navItems = [
        { name: "Beranda", href: "/", current: pathname === "/" },
        { name: "Edukasi", href: "/edukasi", current: pathname.startsWith("/edukasi") },
        { name: "Dokter", href: "/dokter", current: pathname.startsWith("/dokter") },
        { name: "Layanan", href: "/layanan", current: pathname.startsWith("/layanan") },
        { name: "Lokasi", href: "/lokasi", current: pathname.startsWith("/lokasi") },
    ];

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled
                    ? "bg-white/90 backdrop-blur-xl border-b border-slate-100/50 shadow-sm"
                    : "bg-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between h-16 sm:h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-1.5 sm:p-2 rounded-xl transform group-hover:scale-110 transition-all duration-500">
                            <Heart className="text-white w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        <span className="text-xl sm:text-2xl font-bold tracking-tight">
                            <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                                Lansia
                            </span>
                            <span className="text-emerald-600">Care</span>
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-1 lg:gap-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 group ${item.current
                                        ? "text-emerald-600 bg-emerald-50"
                                        : "text-slate-600 hover:text-emerald-600 hover:bg-slate-50"
                                    }`}
                            >
                                {item.name}
                                {item.current && (
                                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-emerald-600 rounded-full"></span>
                                )}
                            </Link>
                        ))}

                        <button className="ml-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-2 rounded-full hover:shadow-xl hover:shadow-emerald-200/50 hover:scale-105 transition-all duration-500 font-semibold">
                            Daftar Sekarang
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                        {isMobileMenuOpen ? (
                            <X className="w-6 h-6 text-slate-600" />
                        ) : (
                            <Menu className="w-6 h-6 text-slate-600" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                        }`}
                >
                    <div className="py-4 space-y-2 border-t border-slate-100">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${item.current
                                        ? "bg-emerald-50 text-emerald-600"
                                        : "text-slate-600 hover:bg-slate-50"
                                    }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <button className="w-full mt-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-xl font-semibold">
                            Daftar Sekarang
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}