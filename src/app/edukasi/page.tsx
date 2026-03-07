"use client";

import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import FloatingChat from "@/components/FloatingChat";
import Link from "next/link";
import Image from "next/image";
import {
    // Ikon dasar
    Heart, ShieldCheck, Activity, Users, BookOpen, Clock, Brain,
    Phone, Video, Calendar, Award, ChevronRight, MessageCircle,
    Bell, TrendingUp, Thermometer, Droplets, Sparkles, ArrowRight,
    Star, CheckCircle, Zap, Coffee, Smile, Shield,

    // Ikon edukasi
    FileText, Download, Search, Filter, Eye, ThumbsUp, Share2,
    Bookmark, Play, Headphones, Printer, User,

    // Ikon kesehatan - HAPUS Lungs, GANTI DENGAN ALTERNATIF
    HeartPulse, Bone, Wind, Apple, Pill, AlertCircle,
    Stethoscope, Syringe, Weight, Cloud,
    Ear, EyeOff, EyeIcon, Microscope,

    // Ikon tambahan untuk kesehatan umum dan pasca operasi
    Bandage,                // Untuk luka/perawatan
    Hospital,               // Untuk rumah sakit
    Ambulance,              // Untuk darurat
    ThermometerSnowflake,   // Untuk demam/dingin
    FlaskConical,           // Untuk laboratorium
    PillBottle,             // Untuk obat-obatan
    Salad,                  // Untuk makanan sehat
    Wheat,                  // Untuk nutrisi
    Citrus,                 // Untuk vitamin C
    Milk,                   // Untuk kalsium
    Fish,                   // Untuk omega-3
    Egg,                    // Untuk protein
    Dumbbell,               // Untuk olahraga
    Footprints,             // Untuk jalan kaki
    HeartHandshake,         // Untuk dukungan
    Trees,                  // Untuk relaksasi/alam
    Moon,                   // Untuk tidur/istirahat
    Sun,                    // Untuk vitamin D/aktivitas luar
    Waves,                  // Untuk terapi air
    Leaf,                   // Untuk herbal/alami
    Bone as BoneIcon        // Untuk tulang (jika konflik)
} from "lucide-react";

export default function EdukasiPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("semua");
    const [selectedSubCategory, setSelectedSubCategory] = useState("umum");
    const [visibleArticles, setVisibleArticles] = useState(6);
    const [isVisible, setIsVisible] = useState({});
    const sectionRefs = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    setIsVisible(prev => ({
                        ...prev,
                        [entry.target.dataset.index]: entry.isIntersecting
                    }));
                });
            },
            { threshold: 0.1 }
        );

        sectionRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, []);

    const fadeInUpClass = (index) =>
        `transition-all duration-1000 transform ${isVisible[index] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`;

    // Kategori edukasi
    const categories = [
        { id: "semua", name: "Semua", icon: <BookOpen className="w-4 h-4" /> },
        { id: "umum", name: "Kesehatan Umum", icon: <Heart className="w-4 h-4" /> },
        { id: "pasca-operasi", name: "Pasca Operasi", icon: <Bandage className="w-4 h-4" /> },
        { id: "nutrisi", name: "Nutrisi & Gizi", icon: <Apple className="w-4 h-4" /> },
        { id: "penyakit", name: "Penyakit Umum", icon: <AlertCircle className="w-4 h-4" /> },
        { id: "obat", name: "Penggunaan Obat", icon: <Pill className="w-4 h-4" /> },
        { id: "aktivitas", name: "Aktivitas Fisik", icon: <Activity className="w-4 h-4" /> },
        { id: "mental", name: "Kesehatan Mental", icon: <Brain className="w-4 h-4" /> }
    ];

    // Sub-kategori untuk Pasca Operasi
    const postOpCategories = [
        { id: "semua", name: "Semua" },
        { id: "jantung", name: "Operasi Jantung" },
        { id: "ortopedi", name: "Operasi Tulang" },
        { id: "abdomen", name: "Operasi Perut" },
        { id: "mata", name: "Operasi Mata" },
        { id: "gigi", name: "Operasi Gigi" },
        { id: "umum", name: "Operasi Umum" }
    ];

    // Data artikel edukasi - DIPERBAIKI DENGAN KONTEN KESEHATAN UMUM DAN PASCA OPERASI
    const articles = [
        // KESEHATAN UMUM
        {
            id: 1,
            title: "Panduan Lengkap Nutrisi untuk Lansia",
            excerpt: "Makanan sehat dan pola gizi seimbang untuk menjaga vitalitas di usia lanjut.",
            category: "nutrisi",
            subCategory: "umum",
            image: "/images/edukasi/nutrisi.jpg",
            author: "dr. Sarah Wijaya, Sp.GK",
            date: "2 Mar 2026",
            readTime: "8 menit",
            views: "2.5K",
            likes: 342,
            featured: true,
            tags: ["Gizi", "Makanan Sehat", "Suplemen", "Lansia"]
        },
        {
            id: 2,
            title: "Mengenal Hipertensi pada Lansia",
            excerpt: "Penyebab, gejala, dan cara mengelola tekanan darah tinggi di usia lanjut.",
            category: "penyakit",
            subCategory: "umum",
            image: "/images/edukasi/hipertensi.jpg",
            author: "dr. Ahmad Hasan, Sp.PD",
            date: "1 Mar 2026",
            readTime: "6 menit",
            views: "3.1K",
            likes: 456,
            featured: true,
            tags: ["Hipertensi", "Tekanan Darah", "Jantung", "Lansia"]
        },
        {
            id: 3,
            title: "Panduan Minum Obat yang Aman untuk Lansia",
            excerpt: "Cara tepat mengonsumsi obat-obatan untuk menghindari efek samping berbahaya.",
            category: "obat",
            subCategory: "umum",
            image: "/images/edukasi/obat.jpg",
            author: "apt. Maria Santoso, M.Farm",
            date: "28 Feb 2026",
            readTime: "5 menit",
            views: "1.8K",
            likes: 234,
            featured: false,
            tags: ["Obat", "Farmasi", "Keamanan", "Lansia"]
        },
        {
            id: 4,
            title: "Olahraga Ringan untuk Lansia",
            excerpt: "Gerakan sederhana yang aman dilakukan untuk menjaga kebugaran tubuh.",
            category: "aktivitas",
            subCategory: "umum",
            image: "/images/edukasi/olahraga.jpg",
            author: "dr. Budi Santoso, Sp.KFR",
            date: "27 Feb 2026",
            readTime: "7 menit",
            views: "2.2K",
            likes: 389,
            featured: true,
            tags: ["Olahraga", "Fisioterapi", "Kebugaran", "Lansia"]
        },
        {
            id: 5,
            title: "Mengatasi Depresi pada Lansia",
            excerpt: "Cara mengenali dan menangani gangguan mental yang sering dialami lansia.",
            category: "mental",
            subCategory: "umum",
            image: "/images/edukasi/depresi.jpg",
            author: "dr. Rina Putri, Sp.KJ",
            date: "26 Feb 2026",
            readTime: "9 menit",
            views: "1.9K",
            likes: 267,
            featured: false,
            tags: ["Mental", "Depresi", "Konseling", "Lansia"]
        },
        {
            id: 6,
            title: "Diabetes Mellitus pada Usia Lanjut",
            excerpt: "Panduan lengkap mengelola diabetes agar tetap produktif dan sehat.",
            category: "penyakit",
            subCategory: "umum",
            image: "/images/edukasi/diabetes.jpg",
            author: "dr. Andi Firmansyah, Sp.PD",
            date: "25 Feb 2026",
            readTime: "10 menit",
            views: "2.8K",
            likes: 412,
            featured: true,
            tags: ["Diabetes", "Gula Darah", "Metabolik", "Lansia"]
        },
        {
            id: 7,
            title: "Suplemen yang Dibutuhkan Lansia",
            excerpt: "Vitamin dan mineral penting untuk menjaga kesehatan di usia senja.",
            category: "nutrisi",
            subCategory: "umum",
            image: "/images/edukasi/suplemen.jpg",
            author: "apt. Dewi Lestari, M.Farm",
            date: "24 Feb 2026",
            readTime: "6 menit",
            views: "1.5K",
            likes: 198,
            featured: false,
            tags: ["Suplemen", "Vitamin", "Mineral", "Lansia"]
        },
        {
            id: 8,
            title: "Mencegah Osteoporosis pada Lansia",
            excerpt: "Langkah-langkah menjaga kepadatan tulang di usia lanjut.",
            category: "aktivitas",
            subCategory: "umum",
            image: "/images/edukasi/osteoporosis.jpg",
            author: "dr. Sari Indah, Sp.OT",
            date: "23 Feb 2026",
            readTime: "7 menit",
            views: "2.0K",
            likes: 278,
            featured: true,
            tags: ["Tulang", "Osteoporosis", "Kalsium", "Lansia"]
        },
        {
            id: 9,
            title: "Cara Merawat Lansia dengan Demensia",
            excerpt: "Panduan bagi keluarga dalam merawat lansia dengan gangguan daya ingat.",
            category: "mental",
            subCategory: "umum",
            image: "/images/edukasi/demensia.jpg",
            author: "dr. Maya Angelina, Sp.S",
            date: "22 Feb 2026",
            readTime: "12 menit",
            views: "3.5K",
            likes: 523,
            featured: true,
            tags: ["Demensia", "Alzheimer", "Perawatan", "Lansia"]
        },

        // PASCA OPERASI - KONTEN BARU
        {
            id: 10,
            title: "Panduan Perawatan Luka Pasca Operasi",
            excerpt: "Cara merawat luka operasi agar cepat kering dan mencegah infeksi.",
            category: "pasca-operasi",
            subCategory: "umum",
            image: "/images/edukasi/pasca-operasi/luka.jpg",
            author: "dr. Budi Santoso, Sp.B",
            date: "5 Mar 2026",
            readTime: "10 menit",
            views: "4.2K",
            likes: 567,
            featured: true,
            tags: ["Luka", "Infeksi", "Perawatan", "Pasca Operasi"]
        },
        {
            id: 11,
            title: "Pemulihan Pasca Operasi Jantung",
            excerpt: "Langkah-langkah penting untuk pemulihan optimal setelah operasi jantung.",
            category: "pasca-operasi",
            subCategory: "jantung",
            image: "/images/edukasi/pasca-operasi/jantung.jpg",
            author: "dr. Ahmad Hasan, Sp.BTKV",
            date: "4 Mar 2026",
            readTime: "15 menit",
            views: "3.8K",
            likes: 489,
            featured: true,
            tags: ["Jantung", "Kardiovaskular", "Rehabilitasi", "Pasca Operasi"]
        },
        {
            id: 12,
            title: "Rehabilitasi Pasca Operasi Tulang",
            excerpt: "Latihan dan perawatan yang tepat setelah operasi ortopedi.",
            category: "pasca-operasi",
            subCategory: "ortopedi",
            image: "/images/edukasi/pasca-operasi/tulang.jpg",
            author: "dr. Sari Indah, Sp.OT",
            date: "3 Mar 2026",
            readTime: "12 menit",
            views: "2.9K",
            likes: 345,
            featured: false,
            tags: ["Tulang", "Ortopedi", "Fisioterapi", "Pasca Operasi"]
        },
        {
            id: 13,
            title: "Nutrisi untuk Pemulihan Pasca Operasi",
            excerpt: "Makanan yang mempercepat penyembuhan dan memulihkan energi setelah operasi.",
            category: "pasca-operasi",
            subCategory: "umum",
            image: "/images/edukasi/pasca-operasi/nutrisi.jpg",
            author: "dr. Sarah Wijaya, Sp.GK",
            date: "2 Mar 2026",
            readTime: "8 menit",
            views: "2.1K",
            likes: 278,
            featured: true,
            tags: ["Nutrisi", "Protein", "Vitamin", "Pasca Operasi"]
        },
        {
            id: 14,
            title: "Perawatan Pasca Operasi Katarak",
            excerpt: "Panduan lengkap merawat mata setelah operasi katarak agar cepat sembuh.",
            category: "pasca-operasi",
            subCategory: "mata",
            image: "/images/edukasi/pasca-operasi/katarak.jpg",
            author: "dr. Rina Putri, Sp.M",
            date: "1 Mar 2026",
            readTime: "7 menit",
            views: "3.2K",
            likes: 412,
            featured: true,
            tags: ["Mata", "Katarak", "Penglihatan", "Pasca Operasi"]
        },
        {
            id: 15,
            title: "Pemulihan Pasca Operasi Hernia",
            excerpt: "Tips dan latihan untuk kembali beraktivitas setelah operasi hernia.",
            category: "pasca-operasi",
            subCategory: "abdomen",
            image: "/images/edukasi/pasca-operasi/hernia.jpg",
            author: "dr. Budi Santoso, Sp.B",
            date: "28 Feb 2026",
            readTime: "9 menit",
            views: "1.9K",
            likes: 234,
            featured: false,
            tags: ["Hernia", "Abdomen", "Pemulihan", "Pasca Operasi"]
        },
        {
            id: 16,
            title: "Manajemen Nyeri Pasca Operasi",
            excerpt: "Cara mengatasi dan mengurangi rasa sakit setelah menjalani operasi.",
            category: "pasca-operasi",
            subCategory: "umum",
            image: "/images/edukasi/pasca-operasi/nyeri.jpg",
            author: "dr. Maya Angelina, Sp.An",
            date: "27 Feb 2026",
            readTime: "11 menit",
            views: "4.5K",
            likes: 612,
            featured: true,
            tags: ["Nyeri", "Manajemen Nyeri", "Obat", "Pasca Operasi"]
        },
        {
            id: 17,
            title: "Pencegahan Infeksi Pasca Operasi",
            excerpt: "Langkah-langkah penting untuk mencegah infeksi pada luka operasi.",
            category: "pasca-operasi",
            subCategory: "umum",
            image: "/images/edukasi/pasca-operasi/infeksi.jpg",
            author: "dr. Andi Firmansyah, Sp.PD",
            date: "26 Feb 2026",
            readTime: "8 menit",
            views: "3.7K",
            likes: 498,
            featured: true,
            tags: ["Infeksi", "Kebersihan", "Luka", "Pasca Operasi"]
        },
        {
            id: 18,
            title: "Latihan Pernapasan Pasca Operasi",
            excerpt: "Teknik pernapasan untuk mempercepat pemulihan dan mencegah komplikasi.",
            category: "pasca-operasi",
            subCategory: "umum",
            image: "/images/edukasi/pasca-operasi/pernapasan.jpg",
            author: "dr. Dewi Lestari, Sp.P",
            date: "25 Feb 2026",
            readTime: "6 menit",
            views: "1.8K",
            likes: 223,
            featured: false,
            tags: ["Pernapasan", "Paru-paru", "Rehabilitasi", "Pasca Operasi"]
        },
        {
            id: 19,
            title: "Perawatan Pasca Operasi Gigi",
            excerpt: "Panduan merawat mulut setelah pencabutan atau operasi gigi.",
            category: "pasca-operasi",
            subCategory: "gigi",
            image: "/images/edukasi/pasca-operasi/gigi.jpg",
            author: "drg. Maria Santoso",
            date: "24 Feb 2026",
            readTime: "5 menit",
            views: "2.3K",
            likes: 287,
            featured: false,
            tags: ["Gigi", "Mulut", "Pencabutan", "Pasca Operasi"]
        },
        {
            id: 20,
            title: "Kembali Bekerja Setelah Operasi",
            excerpt: "Panduan kapan dan bagaimana kembali bekerja dengan aman pasca operasi.",
            category: "pasca-operasi",
            subCategory: "umum",
            image: "/images/edukasi/pasca-operasi/bekerja.jpg",
            author: "dr. Andi Firmansyah, Sp.PD",
            date: "23 Feb 2026",
            readTime: "7 menit",
            views: "2.0K",
            likes: 256,
            featured: false,
            tags: ["Pekerjaan", "Aktivitas", "Produktivitas", "Pasca Operasi"]
        }
    ];

    // Data video edukasi - DIPERBAIKI DENGAN VIDEO PASCA OPERASI
    const videos = [
        {
            id: 1,
            title: "Senam Sehat untuk Lansia",
            duration: "15:30",
            views: "12K",
            category: "umum",
            thumbnail: "/images/edukasi/video1.jpg"
        },
        {
            id: 2,
            title: "Cara Merawat Luka Operasi",
            duration: "8:45",
            views: "8.5K",
            category: "pasca-operasi",
            thumbnail: "/images/edukasi/video2.jpg"
        },
        {
            id: 3,
            title: "Latihan Pasca Operasi Jantung",
            duration: "12:20",
            views: "6.2K",
            category: "pasca-operasi",
            thumbnail: "/images/edukasi/video3.jpg"
        },
        {
            id: 4,
            title: "Panduan Nutrisi Pasca Operasi",
            duration: "10:15",
            views: "5.8K",
            category: "pasca-operasi",
            thumbnail: "/images/edukasi/video4.jpg"
        },
        {
            id: 5,
            title: "Teknik Pernapasan untuk Pemulihan",
            duration: "7:30",
            views: "4.2K",
            category: "pasca-operasi",
            thumbnail: "/images/edukasi/video5.jpg"
        }
    ];

    // Data panduan PDF - DIPERBAIKI DENGAN PANDUAN PASCA OPERASI
    const guides = [
        {
            id: 1,
            title: "Panduan Perawatan Lansia di Rumah",
            pages: 45,
            downloads: "5.2K",
            size: "2.4 MB",
            category: "umum"
        },
        {
            id: 2,
            title: "Panduan Pemulihan Pasca Operasi",
            pages: 52,
            downloads: "4.8K",
            size: "3.1 MB",
            category: "pasca-operasi"
        },
        {
            id: 3,
            title: "Buku Saku Perawatan Luka Operasi",
            pages: 28,
            downloads: "3.9K",
            size: "1.8 MB",
            category: "pasca-operasi"
        },
        {
            id: 4,
            title: "Panduan Nutrisi Pasca Operasi",
            pages: 36,
            downloads: "4.1K",
            size: "2.2 MB",
            category: "pasca-operasi"
        },
        {
            id: 5,
            title: "Latihan Fisik untuk Pemulihan",
            pages: 42,
            downloads: "3.5K",
            size: "2.5 MB",
            category: "pasca-operasi"
        }
    ];

    // Filter artikel berdasarkan kategori dan pencarian
    const filteredArticles = articles.filter(article => {
        // Filter berdasarkan kategori utama
        const matchesCategory = selectedCategory === "semua" || article.category === selectedCategory;

        // Filter berdasarkan sub-kategori (untuk pasca operasi)
        const matchesSubCategory = selectedSubCategory === "semua" ||
            (article.subCategory && article.subCategory === selectedSubCategory);

        // Filter berdasarkan pencarian
        const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
            article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

        // Jika kategori pasca operasi, terapkan kedua filter
        if (selectedCategory === "pasca-operasi") {
            return matchesCategory && matchesSubCategory && matchesSearch;
        }

        return matchesCategory && matchesSearch;
    });

    const featuredArticles = articles.filter(a => a.featured);

    // Filter featured articles berdasarkan kategori yang dipilih
    const filteredFeaturedArticles = selectedCategory === "semua"
        ? featuredArticles
        : featuredArticles.filter(a => a.category === selectedCategory);

    const displayedArticles = filteredArticles.slice(0, visibleArticles);

    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-24 pb-12 px-4 sm:px-6 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                </div>

                <div className="relative max-w-7xl mx-auto">
                    <div className="text-center max-w-3xl mx-auto" data-aos="fade-up">
                        <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                            <Sparkles className="w-4 h-4" />
                            Pusat Edukasi Kesehatan & Pemulihan
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                            Informasi Kesehatan{' '}
                            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                Umum & Pasca Operasi
                            </span>
                        </h1>
                        <p className="text-lg text-slate-600 mb-8">
                            Akses artikel, video, dan panduan terpercaya seputar kesehatan umum
                            dan pemulihan pasca operasi. Dapatkan informasi dari para ahli.
                        </p>

                        {/* Search Bar */}
                        <div className="max-w-2xl mx-auto relative">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Cari artikel, video, atau panduan..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all shadow-lg"
                            />
                        </div>

                        {/* Stats */}
                        <div className="flex flex-wrap justify-center gap-8 mt-12">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-emerald-600">{articles.length}+</div>
                                <div className="text-sm text-slate-500">Artikel</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-emerald-600">{videos.length}+</div>
                                <div className="text-sm text-slate-500">Video Edukasi</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-emerald-600">{guides.length}+</div>
                                <div className="text-sm text-slate-500">Panduan PDF</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-emerald-600">15K+</div>
                                <div className="text-sm text-slate-500">Pembaca</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Access Categories */}
            <section className="py-8 px-4 sm:px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-wrap gap-3 justify-center">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => {
                                    setSelectedCategory(category.id);
                                    setSelectedSubCategory("semua");
                                }}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${selectedCategory === category.id
                                        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg scale-105'
                                        : 'bg-white text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 border border-slate-200'
                                    }`}
                            >
                                {category.icon}
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Sub-categories for Post-Operasi */}
            {selectedCategory === "pasca-operasi" && (
                <section className="py-4 px-4 sm:px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-wrap gap-2 justify-center">
                            {postOpCategories.map((subCat) => (
                                <button
                                    key={subCat.id}
                                    onClick={() => setSelectedSubCategory(subCat.id)}
                                    className={`px-3 py-1.5 rounded-full text-xs transition-all duration-300 ${selectedSubCategory === subCat.id
                                            ? 'bg-emerald-600 text-white'
                                            : 'bg-slate-100 text-slate-600 hover:bg-emerald-100'
                                        }`}
                                >
                                    {subCat.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Featured Articles */}
            <section ref={el => sectionRefs.current[0] = el} data-index="0" className="py-12 px-4 sm:px-6">
                <div className={`max-w-7xl mx-auto ${fadeInUpClass(0)}`}>
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-2xl font-bold">
                                {selectedCategory === "pasca-operasi"
                                    ? "Artikel Pilihan Pasca Operasi"
                                    : "Artikel Pilihan"}
                            </h2>
                            <p className="text-slate-500">Rekomendasi artikel terbaik untuk Anda</p>
                        </div>
                        <Link href={`/edukasi/artikel${selectedCategory !== "semua" ? `?kategori=${selectedCategory}` : ''}`}
                            className="text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
                            Lihat Semua <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredFeaturedArticles.slice(0, 3).map((article, index) => (
                            <Link href={`/edukasi/artikel/${article.id}`} key={article.id}>
                                <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                                    <div className="relative h-48 overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
                                        <div className="w-full h-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                                            <FileText className="w-16 h-16 text-white/30" />
                                        </div>
                                        <div className="absolute top-4 right-4 z-20">
                                            <span className="px-3 py-1 bg-white/90 backdrop-blur rounded-full text-xs font-semibold text-emerald-600">
                                                {article.category === "pasca-operasi" ? "Pasca Operasi" : "Featured"}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="text-xs font-medium px-2 py-1 bg-emerald-50 text-emerald-600 rounded-full">
                                                {categories.find(c => c.id === article.category)?.name || article.category}
                                            </span>
                                            <span className="text-xs text-slate-400 flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {article.readTime}
                                            </span>
                                        </div>
                                        <h3 className="font-bold text-lg mb-2 group-hover:text-emerald-600 transition-colors">
                                            {article.title}
                                        </h3>
                                        <p className="text-slate-500 text-sm mb-4">{article.excerpt}</p>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white text-xs font-bold">
                                                    {article.author.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium">{article.author}</p>
                                                    <p className="text-xs text-slate-400">{article.date}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 text-slate-400">
                                                <span className="text-xs flex items-center gap-1">
                                                    <Eye className="w-3 h-3" /> {article.views}
                                                </span>
                                                <span className="text-xs flex items-center gap-1">
                                                    <ThumbsUp className="w-3 h-3" /> {article.likes}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Main Content Grid */}
            <section className="py-12 px-4 sm:px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column - Articles */}
                        <div className="lg:col-span-2">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold">
                                    {selectedCategory === "pasca-operasi"
                                        ? "Artikel Pasca Operasi"
                                        : "Semua Artikel"}
                                </h2>
                                <div className="flex items-center gap-2">
                                    <Filter className="w-4 h-4 text-slate-400" />
                                    <select className="text-sm border rounded-lg px-3 py-2">
                                        <option>Terbaru</option>
                                        <option>Terpopuler</option>
                                        <option>Terlama</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {displayedArticles.map((article, index) => (
                                    <Link href={`/edukasi/artikel/${article.id}`} key={article.id}>
                                        <div className="group bg-white rounded-2xl p-6 hover:shadow-xl transition-all duration-500 border border-slate-100">
                                            <div className="flex gap-4">
                                                <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex-shrink-0 flex items-center justify-center">
                                                    <FileText className="w-8 h-8 text-white/50" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <span className="text-xs font-medium px-2 py-1 bg-emerald-50 text-emerald-600 rounded-full">
                                                            {categories.find(c => c.id === article.category)?.name || article.category}
                                                        </span>
                                                        {article.tags.slice(0, 2).map((tag, i) => (
                                                            <span key={i} className="text-xs text-slate-400">#{tag}</span>
                                                        ))}
                                                    </div>
                                                    <h3 className="font-bold text-lg mb-2 group-hover:text-emerald-600 transition-colors">
                                                        {article.title}
                                                    </h3>
                                                    <p className="text-slate-500 text-sm mb-3">{article.excerpt}</p>
                                                    <div className="flex items-center gap-4 text-xs text-slate-400">
                                                        <span className="flex items-center gap-1">
                                                            <User className="w-3 h-3" /> {article.author}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <Clock className="w-3 h-3" /> {article.date}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <Eye className="w-3 h-3" /> {article.views}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            {visibleArticles < filteredArticles.length && (
                                <div className="text-center mt-8">
                                    <button
                                        onClick={() => setVisibleArticles(prev => prev + 6)}
                                        className="bg-white border-2 border-emerald-600 text-emerald-600 px-8 py-3 rounded-xl font-semibold hover:bg-emerald-50 transition-all duration-500"
                                    >
                                        Muat Lebih Banyak ({filteredArticles.length - visibleArticles} tersisa)
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Right Column - Sidebar */}
                        <div className="space-y-8">
                            {/* Video Section */}
                            <div className="bg-white rounded-2xl p-6 shadow-lg">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-bold flex items-center gap-2">
                                        <Video className="w-5 h-5 text-emerald-600" />
                                        Video Terbaru
                                    </h3>
                                    <Link href="/edukasi/video" className="text-sm text-emerald-600 hover:text-emerald-700">
                                        Lihat Semua
                                    </Link>
                                </div>
                                <div className="space-y-4">
                                    {videos
                                        .filter(v => selectedCategory === "semua" || v.category === selectedCategory)
                                        .slice(0, 3)
                                        .map((video) => (
                                            <Link href={`/edukasi/video/${video.id}`} key={video.id}>
                                                <div className="group flex gap-3">
                                                    <div className="relative w-24 h-16 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex-shrink-0 overflow-hidden">
                                                        <div className="absolute inset-0 flex items-center justify-center">
                                                            <Play className="w-6 h-6 text-white/70 group-hover:scale-110 transition-transform" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-medium text-sm mb-1 group-hover:text-emerald-600 transition-colors">
                                                            {video.title}
                                                        </h4>
                                                        <div className="flex items-center gap-2 text-xs text-slate-400">
                                                            <span>{video.duration}</span>
                                                            <span>•</span>
                                                            <span>{video.views} views</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                </div>
                            </div>

                            {/* PDF Guides */}
                            <div className="bg-white rounded-2xl p-6 shadow-lg">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-bold flex items-center gap-2">
                                        <BookOpen className="w-5 h-5 text-emerald-600" />
                                        Panduan PDF
                                    </h3>
                                    <Link href="/edukasi/panduan" className="text-sm text-emerald-600 hover:text-emerald-700">
                                        Lihat Semua
                                    </Link>
                                </div>
                                <div className="space-y-4">
                                    {guides
                                        .filter(g => selectedCategory === "semua" || g.category === selectedCategory)
                                        .slice(0, 3)
                                        .map((guide) => (
                                            <div key={guide.id} className="flex items-center justify-between group">
                                                <div>
                                                    <h4 className="font-medium text-sm mb-1">{guide.title}</h4>
                                                    <div className="flex items-center gap-2 text-xs text-slate-400">
                                                        <span>{guide.pages} halaman</span>
                                                        <span>•</span>
                                                        <span>{guide.size}</span>
                                                    </div>
                                                </div>
                                                <button className="p-2 hover:bg-emerald-50 rounded-lg transition-colors">
                                                    <Download className="w-4 h-4 text-emerald-600" />
                                                </button>
                                            </div>
                                        ))}
                                </div>
                            </div>

                            {/* Popular Tags */}
                            <div className="bg-white rounded-2xl p-6 shadow-lg">
                                <h3 className="font-bold mb-4 flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5 text-emerald-600" />
                                    Topik Populer
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {[
                                        "Hipertensi", "Diabetes", "Jantung",
                                        "Pasca Operasi", "Perawatan Luka", "Rehabilitasi",
                                        "Nutrisi", "Olahraga", "Demensia",
                                        "Osteoporosis", "Vitamin", "Obat"
                                    ].map((tag, i) => (
                                        <Link href={`/edukasi/tag/${tag.toLowerCase().replace(/ /g, '-')}`} key={i}>
                                            <span className="px-3 py-1.5 bg-slate-100 hover:bg-emerald-100 text-slate-600 hover:text-emerald-600 rounded-full text-xs transition-colors">
                                                #{tag.toLowerCase().replace(/ /g, '')}
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Quick Tips */}
                            <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl p-6 text-white">
                                <h3 className="font-bold text-lg mb-2">Tips Cepat Pemulihan</h3>
                                <ul className="space-y-2 text-sm text-white/90 mb-4">
                                    <li className="flex items-start gap-2">
                                        <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                        <span>Istirahat cukup minimal 8 jam/hari</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                        <span>Konsumsi protein tinggi untuk pemulihan</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                        <span>Minum air putih minimal 8 gelas/hari</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                        <span>Konsultasi rutin dengan dokter</span>
                                    </li>
                                </ul>
                                <Link href="/edukasi/tips-pemulihan">
                                    <button className="w-full bg-white text-emerald-600 px-4 py-2 rounded-xl font-semibold hover:shadow-lg transition-all">
                                        Lihat Tips Lengkap
                                    </button>
                                </Link>
                            </div>

                            {/* Newsletter */}
                            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 text-white">
                                <h3 className="font-bold text-lg mb-2">Dapatkan Update Terbaru</h3>
                                <p className="text-sm text-white/90 mb-4">
                                    Berlangganan newsletter untuk mendapatkan artikel kesehatan dan tips pemulihan terbaru.
                                </p>
                                <input
                                    type="email"
                                    placeholder="Email Anda"
                                    className="w-full px-4 py-3 rounded-xl mb-3 text-slate-900"
                                />
                                <button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-3 rounded-xl font-semibold hover:shadow-lg transition-all">
                                    Berlangganan
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Health Topics Grid */}
            <section className="py-12 px-4 sm:px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold">Jelajahi Topik Kesehatan</h2>
                        <p className="text-slate-500">Pilih topik yang ingin Anda pelajari lebih lanjut</p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                        {[
                            { icon: <HeartPulse className="w-6 h-6" />, name: "Jantung", count: 12, category: "penyakit" },
                            { icon: <Brain className="w-6 h-6" />, name: "Saraf", count: 8, category: "penyakit" },
                            { icon: <Bone className="w-6 h-6" />, name: "Tulang", count: 10, category: "penyakit" },
                            { icon: <EyeIcon className="w-6 h-6" />, name: "Mata", count: 6, category: "penyakit" },
                            { icon: <Ear className="w-6 h-6" />, name: "Telinga", count: 5, category: "penyakit" },
                            { icon: <Wind className="w-6 h-6" />, name: "Paru-paru", count: 9, category: "penyakit" },
                            { icon: <Bandage className="w-6 h-6" />, name: "Perawatan Luka", count: 15, category: "pasca-operasi" },
                            { icon: <Hospital className="w-6 h-6" />, name: "Pasca Operasi", count: 20, category: "pasca-operasi" },
                            { icon: <Droplets className="w-6 h-6" />, name: "Ginjal", count: 7, category: "penyakit" },
                            { icon: <Thermometer className="w-6 h-6" />, name: "Demam", count: 4, category: "umum" },
                            { icon: <Apple className="w-6 h-6" />, name: "Nutrisi", count: 18, category: "nutrisi" },
                            { icon: <Pill className="w-6 h-6" />, name: "Obat", count: 14, category: "obat" },
                            { icon: <Activity className="w-6 h-6" />, name: "Olahraga", count: 11, category: "aktivitas" },
                            { icon: <Smile className="w-6 h-6" />, name: "Mental", count: 9, category: "mental" },
                            { icon: <HeartHandshake className="w-6 h-6" />, name: "Dukungan", count: 7, category: "umum" },
                            { icon: <Moon className="w-6 h-6" />, name: "Istirahat", count: 6, category: "umum" },
                            { icon: <Leaf className="w-6 h-6" />, name: "Herbal", count: 5, category: "umum" },
                            { icon: <Footprints className="w-6 h-6" />, name: "Jalan Kaki", count: 8, category: "aktivitas" }
                        ].map((topic, i) => (
                            <Link
                                href={`/edukasi?kategori=${topic.category}&topik=${topic.name.toLowerCase()}`}
                                key={i}
                                onClick={() => {
                                    setSelectedCategory(topic.category);
                                    setSearchTerm(topic.name);
                                }}
                            >
                                <div className="bg-slate-50 p-4 rounded-xl text-center hover:bg-emerald-50 hover:shadow-lg transition-all duration-300 group cursor-pointer">
                                    <div className="text-emerald-600 mb-2 group-hover:scale-110 transition-transform">
                                        {topic.icon}
                                    </div>
                                    <p className="font-medium text-sm">{topic.name}</p>
                                    <p className="text-xs text-slate-400">{topic.count} artikel</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-4 sm:px-6 bg-gradient-to-br from-emerald-600 to-teal-600 text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4">Butuh Konsultasi Kesehatan?</h2>
                    <p className="text-lg mb-8 text-white/90">
                        Dokter spesialis kami siap membantu menjawab pertanyaan Anda seputar kesehatan umum dan pemulihan pasca operasi.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/konsultasi">
                            <button className="bg-white text-emerald-600 px-8 py-4 rounded-xl font-bold hover:shadow-2xl hover:scale-105 transition-all duration-500">
                                Konsultasi Sekarang
                            </button>
                        </Link>
                        <Link href="/dokter">
                            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 hover:scale-105 transition-all duration-500">
                                Lihat Dokter Spesialis
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            <FloatingChat />

            <style jsx>{`
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                [data-aos="fade-up"] {
                    transition: all 0.8s ease-out;
                }
            `}</style>
        </main>
    );
}