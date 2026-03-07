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

    // Ikon kesehatan
    HeartPulse, Bone, Wind, Apple, Pill, AlertCircle,
    Stethoscope, Syringe, Weight, Droplet, Cloud,
    Ear, EyeOff, EyeIcon, Lungs, Microscope,

    // Ikon makanan
    Salad, Wheat, Citrus, Milk, Fish, Egg,

    // Ikon olahraga
    Dumbbell, Footprints, Bike,

    // Ikon tambahan
    HeartHandshake, Ambulance, FlaskConical, Trees
} from "lucide-react";

export default function EdukasiPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("semua");
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
        { id: "nutrisi", name: "Nutrisi & Gizi", icon: <Apple className="w-4 h-4" /> },
        { id: "penyakit", name: "Penyakit Umum", icon: <AlertCircle className="w-4 h-4" /> },
        { id: "obat", name: "Penggunaan Obat", icon: <Pill className="w-4 h-4" /> },
        { id: "aktivitas", name: "Aktivitas Fisik", icon: <Activity className="w-4 h-4" /> },
        { id: "mental", name: "Kesehatan Mental", icon: <Brain className="w-4 h-4" /> }
    ];

    // Data artikel edukasi
    const articles = [
        {
            id: 1,
            title: "Panduan Lengkap Nutrisi untuk Lansia",
            excerpt: "Makanan sehat dan pola gizi seimbang untuk menjaga vitalitas di usia lanjut.",
            category: "nutrisi",
            image: "/images/edukasi/nutrisi.jpg",
            author: "dr. Sarah Wijaya, Sp.GK",
            date: "2 Mar 2026",
            readTime: "8 menit",
            views: "2.5K",
            likes: 342,
            featured: true,
            tags: ["Gizi", "Makanan Sehat", "Suplemen"]
        },
        {
            id: 2,
            title: "Mengenal Hipertensi pada Lansia",
            excerpt: "Penyebab, gejala, dan cara mengelola tekanan darah tinggi di usia lanjut.",
            category: "penyakit",
            image: "/images/edukasi/hipertensi.jpg",
            author: "dr. Ahmad Hasan, Sp.PD",
            date: "1 Mar 2026",
            readTime: "6 menit",
            views: "3.1K",
            likes: 456,
            featured: true,
            tags: ["Hipertensi", "Tekanan Darah", "Jantung"]
        },
        {
            id: 3,
            title: "Panduan Minum Obat yang Aman untuk Lansia",
            excerpt: "Cara tepat mengonsumsi obat-obatan untuk menghindari efek samping berbahaya.",
            category: "obat",
            image: "/images/edukasi/obat.jpg",
            author: "apt. Maria Santoso, M.Farm",
            date: "28 Feb 2026",
            readTime: "5 menit",
            views: "1.8K",
            likes: 234,
            featured: false,
            tags: ["Obat", "Farmasi", "Keamanan"]
        },
        {
            id: 4,
            title: "Olahraga Ringan untuk Lansia",
            excerpt: "Gerakan sederhana yang aman dilakukan untuk menjaga kebugaran tubuh.",
            category: "aktivitas",
            image: "/images/edukasi/olahraga.jpg",
            author: "dr. Budi Santoso, Sp.KFR",
            date: "27 Feb 2026",
            readTime: "7 menit",
            views: "2.2K",
            likes: 389,
            featured: true,
            tags: ["Olahraga", "Fisioterapi", "Kebugaran"]
        },
        {
            id: 5,
            title: "Mengatasi Depresi pada Lansia",
            excerpt: "Cara mengenali dan menangani gangguan mental yang sering dialami lansia.",
            category: "mental",
            image: "/images/edukasi/depresi.jpg",
            author: "dr. Rina Putri, Sp.KJ",
            date: "26 Feb 2026",
            readTime: "9 menit",
            views: "1.9K",
            likes: 267,
            featured: false,
            tags: ["Mental", "Depresi", "Konseling"]
        },
        {
            id: 6,
            title: "Diabetes Mellitus pada Usia Lanjut",
            excerpt: "Panduan lengkap mengelola diabetes agar tetap produktif dan sehat.",
            category: "penyakit",
            image: "/images/edukasi/diabetes.jpg",
            author: "dr. Andi Firmansyah, Sp.PD",
            date: "25 Feb 2026",
            readTime: "10 menit",
            views: "2.8K",
            likes: 412,
            featured: true,
            tags: ["Diabetes", "Gula Darah", "Metabolik"]
        },
        {
            id: 7,
            title: "Suplemen yang Dibutuhkan Lansia",
            excerpt: "Vitamin dan mineral penting untuk menjaga kesehatan di usia senja.",
            category: "nutrisi",
            image: "/images/edukasi/suplemen.jpg",
            author: "apt. Dewi Lestari, M.Farm",
            date: "24 Feb 2026",
            readTime: "6 menit",
            views: "1.5K",
            likes: 198,
            featured: false,
            tags: ["Suplemen", "Vitamin", "Mineral"]
        },
        {
            id: 8,
            title: "Mencegah Osteoporosis pada Lansia",
            excerpt: "Langkah-langkah menjaga kepadatan tulang di usia lanjut.",
            category: "aktivitas",
            image: "/images/edukasi/osteoporosis.jpg",
            author: "dr. Sari Indah, Sp.OT",
            date: "23 Feb 2026",
            readTime: "7 menit",
            views: "2.0K",
            likes: 278,
            featured: true,
            tags: ["Tulang", "Osteoporosis", "Kalsium"]
        },
        {
            id: 9,
            title: "Cara Merawat Lansia dengan Demensia",
            excerpt: "Panduan bagi keluarga dalam merawat lansia dengan gangguan daya ingat.",
            category: "mental",
            image: "/images/edukasi/demensia.jpg",
            author: "dr. Maya Angelina, Sp.S",
            date: "22 Feb 2026",
            readTime: "12 menit",
            views: "3.5K",
            likes: 523,
            featured: true,
            tags: ["Demensia", "Alzheimer", "Perawatan"]
        }
    ];

    // Data video edukasi
    const videos = [
        {
            id: 1,
            title: "Senam Sehat untuk Lansia",
            duration: "15:30",
            views: "12K",
            thumbnail: "/images/edukasi/video1.jpg"
        },
        {
            id: 2,
            title: "Cara Cek Tekanan Darah Mandiri",
            duration: "8:45",
            views: "8.5K",
            thumbnail: "/images/edukasi/video2.jpg"
        },
        {
            id: 3,
            title: "Menu Makanan Sehat Lansia",
            duration: "12:20",
            views: "6.2K",
            thumbnail: "/images/edukasi/video3.jpg"
        }
    ];

    // Data panduan PDF
    const guides = [
        {
            id: 1,
            title: "Panduan Perawatan Lansia di Rumah",
            pages: 45,
            downloads: "5.2K",
            size: "2.4 MB"
        },
        {
            id: 2,
            title: "Buku Saku Kesehatan Jantung",
            pages: 32,
            downloads: "3.8K",
            size: "1.8 MB"
        },
        {
            id: 3,
            title: "Resep Makanan Sehat untuk Lansia",
            pages: 28,
            downloads: "4.1K",
            size: "1.5 MB"
        }
    ];

    // Filter artikel berdasarkan kategori dan pencarian
    const filteredArticles = articles.filter(article => {
        const matchesCategory = selectedCategory === "semua" || article.category === selectedCategory;
        const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const featuredArticles = articles.filter(a => a.featured);
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
                            Pusat Edukasi Kesehatan Lansia
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                            Pengetahuan untuk{' '}
                            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                Hidup Lebih Sehat
                            </span>
                        </h1>
                        <p className="text-lg text-slate-600 mb-8">
                            Akses ribuan artikel, video, dan panduan terpercaya seputar kesehatan lansia.
                            Dapatkan informasi dari para ahli kesehatan terkemuka.
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
                                <div className="text-3xl font-bold text-emerald-600">250+</div>
                                <div className="text-sm text-slate-500">Artikel</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-emerald-600">120+</div>
                                <div className="text-sm text-slate-500">Video Edukasi</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-emerald-600">50+</div>
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
                                onClick={() => setSelectedCategory(category.id)}
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

            {/* Featured Articles */}
            <section ref={el => sectionRefs.current[0] = el} data-index="0" className="py-12 px-4 sm:px-6">
                <div className={`max-w-7xl mx-auto ${fadeInUpClass(0)}`}>
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-2xl font-bold">Artikel Pilihan</h2>
                            <p className="text-slate-500">Rekomendasi artikel terbaik untuk Anda</p>
                        </div>
                        <Link href="/edukasi/artikel" className="text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
                            Lihat Semua <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {featuredArticles.slice(0, 3).map((article, index) => (
                            <Link href={`/edukasi/artikel/${article.id}`} key={article.id}>
                                <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                                    <div className="relative h-48 overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
                                        <div className="w-full h-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                                            <FileText className="w-16 h-16 text-white/30" />
                                        </div>
                                        <div className="absolute top-4 right-4 z-20">
                                            <span className="px-3 py-1 bg-white/90 backdrop-blur rounded-full text-xs font-semibold text-emerald-600">
                                                Featured
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="text-xs font-medium px-2 py-1 bg-emerald-50 text-emerald-600 rounded-full">
                                                {categories.find(c => c.id === article.category)?.name}
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
                                <h2 className="text-2xl font-bold">Semua Artikel</h2>
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
                                                            {categories.find(c => c.id === article.category)?.name}
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
                                        Muat Lebih Banyak
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
                                    {videos.map((video) => (
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
                                    {guides.map((guide) => (
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
                                    {["Hipertensi", "Diabetes", "Jantung", "Nutrisi", "Olahraga", "Demensia", "Osteoporosis", "Vitamin", "Obat", "Mental"].map((tag, i) => (
                                        <Link href={`/edukasi/tag/${tag.toLowerCase()}`} key={i}>
                                            <span className="px-3 py-1.5 bg-slate-100 hover:bg-emerald-100 text-slate-600 hover:text-emerald-600 rounded-full text-xs transition-colors">
                                                #{tag}
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Newsletter */}
                            <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl p-6 text-white">
                                <h3 className="font-bold text-lg mb-2">Dapatkan Update Terbaru</h3>
                                <p className="text-sm text-white/90 mb-4">
                                    Berlangganan newsletter untuk mendapatkan artikel dan video terbaru.
                                </p>
                                <input
                                    type="email"
                                    placeholder="Email Anda"
                                    className="w-full px-4 py-3 rounded-xl mb-3 text-slate-900"
                                />
                                <button className="w-full bg-white text-emerald-600 px-4 py-3 rounded-xl font-semibold hover:shadow-lg transition-all">
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
                            { icon: <HeartPulse className="w-6 h-6" />, name: "Jantung", count: 45 },
                            { icon: <Brain className="w-6 h-6" />, name: "Saraf", count: 32 },
                            { icon: <Bone className="w-6 h-6" />, name: "Tulang", count: 28 },
                            { icon: <EyeIcon className="w-6 h-6" />, name: "Mata", count: 23 },
                            { icon: <Ear className="w-6 h-6" />, name: "Telinga", count: 19 },
                            { icon: <Lungs className="w-6 h-6" />, name: "Paru-paru", count: 27 },
                            { icon: <Droplets className="w-6 h-6" />, name: "Ginjal", count: 21 },
                            { icon: <Thermometer className="w-6 h-6" />, name: "Demam", count: 34 },
                            { icon: <Apple className="w-6 h-6" />, name: "Gizi", count: 41 },
                            { icon: <Pill className="w-6 h-6" />, name: "Obat", count: 38 },
                            { icon: <Activity className="w-6 h-6" />, name: "Olahraga", count: 29 },
                            { icon: <Smile className="w-6 h-6" />, name: "Mental", count: 25 }
                        ].map((topic, i) => (
                            <Link href={`/edukasi/topik/${topic.name.toLowerCase()}`} key={i}>
                                <div className="bg-slate-50 p-4 rounded-xl text-center hover:bg-emerald-50 hover:shadow-lg transition-all duration-300 group">
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
                        Dokter spesialis kami siap membantu menjawab pertanyaan Anda seputar kesehatan lansia.
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