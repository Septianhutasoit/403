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
    Stethoscope, Syringe, Weight, Cloud,
    Ear, EyeOff, EyeIcon, Microscope,

    // Ikon tambahan
    Bandage, Hospital, Ambulance, FlaskConical,
    Salad, Wheat, Citrus, Milk, Fish, Egg,
    Dumbbell, Footprints, HeartHandshake, Trees,
    Moon, Sun, Waves, Leaf, Bone as BoneIcon
} from "lucide-react";

export default function EdukasiPage() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("semua");
    const [selectedSubCategory, setSelectedSubCategory] = useState("semua");
    const [visibleArticles, setVisibleArticles] = useState(6);
    const [isVisible, setIsVisible] = useState({});
    const sectionRefs = useRef([]);

    // Data untuk background slider
    const heroSlides = [
        {
            id: 1,
            image: "/images/hero/hero-edukasi-1.jpg",
            title: "Edukasi Kesehatan untuk Semua",
            subtitle: "Pelajari cara hidup sehat dan pemulihan pasca operasi"
        },
        {
            id: 2,
            image: "/images/hero/hero-edukasi-2.jpg",
            title: "Panduan Perawatan Pasca Operasi",
            subtitle: "Informasi lengkap untuk pemulihan yang cepat dan aman"
        },
        {
            id: 3,
            image: "/images/hero/hero-edukasi-3.jpg",
            title: "Konsultasi dengan Ahli Kesehatan",
            subtitle: "Dapatkan jawaban dari dokter spesialis terpercaya"
        },
        {
            id: 4,
            image: "/images/hero/hero-edukasi-4.jpg",
            title: "Komunitas Peduli Kesehatan",
            subtitle: "Bergabung dengan ribuan orang yang peduli kesehatan"
        }
    ];

    // Auto slide setiap 5 detik
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [heroSlides.length]);

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
        { id: "semua", name: "Semua", icon: <BookOpen className="w-4 h-4" />, color: "from-gray-500 to-gray-600" },
        { id: "umum", name: "Kesehatan Umum", icon: <Heart className="w-4 h-4" />, color: "from-emerald-500 to-emerald-600" },
        { id: "pasca-operasi", name: "Pasca Operasi", icon: <Bandage className="w-4 h-4" />, color: "from-blue-500 to-blue-600" },
        { id: "nutrisi", name: "Nutrisi & Gizi", icon: <Apple className="w-4 h-4" />, color: "from-green-500 to-green-600" },
        { id: "penyakit", name: "Penyakit Umum", icon: <AlertCircle className="w-4 h-4" />, color: "from-orange-500 to-orange-600" },
        { id: "obat", name: "Penggunaan Obat", icon: <Pill className="w-4 h-4" />, color: "from-purple-500 to-purple-600" },
        { id: "aktivitas", name: "Aktivitas Fisik", icon: <Activity className="w-4 h-4" />, color: "from-teal-500 to-teal-600" },
        { id: "mental", name: "Kesehatan Mental", icon: <Brain className="w-4 h-4" />, color: "from-pink-500 to-pink-600" }
    ];

    // Sub-kategori untuk Pasca Operasi
    const postOpCategories = [
        { id: "semua", name: "Semua Operasi" },
        { id: "jantung", name: "Operasi Jantung" },
        { id: "ortopedi", name: "Operasi Tulang" },
        { id: "abdomen", name: "Operasi Perut" },
        { id: "mata", name: "Operasi Mata" },
        { id: "gigi", name: "Operasi Gigi" },
        { id: "umum", name: "Operasi Umum" }
    ];

    // Data artikel edukasi
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
            title: "Mengenal Hipertensi pada Anak",
            excerpt: "Penyebab, gejala, dan cara mengelola tekanan darah tinggi di usia dini.",
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
            title: "Panduan Minum Obat yang Aman",
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
            title: "Mengatasi Depresi pada Anak",
            excerpt: "Cara mengenali dan menangani gangguan mental yang sering dialami untuk diusia Dini.",
            category: "mental",
            subCategory: "umum",
            image: "/images/edukasi/depresi.jpg",
            author: "dr. Rina Putri, Sp.KJ",
            date: "26 Feb 2026",
            readTime: "9 menit",
            views: "1.9K",
            likes: 267,
            featured: false,
            tags: ["Mental", "Depresi", "Konseling", "Anak Anak"]
        },
        {
            id: 6,
            title: "Diabetes Mellitus pada Lansia",
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
            title: "Suplemen untuk Kesehatan Untuk Remaja",
            excerpt: "Vitamin dan mineral penting untuk menjaga kesehatan di usia Remaja.",
            category: "nutrisi",
            subCategory: "umum",
            image: "/images/edukasi/suplemen.jpg",
            author: "apt. Dewi Lestari, M.Farm",
            date: "24 Feb 2026",
            readTime: "6 menit",
            views: "1.5K",
            likes: 198,
            featured: false,
            tags: ["Suplemen", "Vitamin", "Mineral", "Remaja-Dewasa"]
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
            title: "Cara Perawatan Untuk Lansia dengan Demensia",
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

        // PASCA OPERASI
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
            id: 16,
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
            id: 17,
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
        }
    ];

    // Filter artikel berdasarkan kategori dan pencarian
    const filteredArticles = articles.filter(article => {
        const matchesCategory = selectedCategory === "semua" || article.category === selectedCategory;
        const matchesSubCategory = selectedSubCategory === "semua" || article.subCategory === selectedSubCategory;
        const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
            article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

        if (selectedCategory === "pasca-operasi") {
            return matchesCategory && matchesSubCategory && matchesSearch;
        }
        return matchesCategory && matchesSearch;
    });

    const featuredArticles = articles.filter(a => a.featured);
    const filteredFeaturedArticles = selectedCategory === "semua"
        ? featuredArticles
        : featuredArticles.filter(a => a.category === selectedCategory);

    const displayedArticles = filteredArticles.slice(0, visibleArticles);

    const getCategoryCount = (categoryId) => {
        return articles.filter(a => a.category === categoryId).length;
    };

    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
            <Navbar />

            {/* Hero Section dengan Background Slider */}
            <section className="relative h-[600px] sm:h-[650px] lg:h-[700px] flex items-center overflow-hidden">
                <div className="absolute inset-0">
                    {heroSlides.map((slide, index) => (
                        <div
                            key={slide.id}
                            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                                }`}
                        >
                            <div className="absolute inset-0 bg-cover bg-center"
                                style={{ backgroundImage: `url(${slide.image})` }}>
                                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                            </div>
                            <div className="absolute inset-0 opacity-20"
                                style={{
                                    backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                                    backgroundSize: '40px 40px'
                                }}>
                            </div>
                        </div>
                    ))}
                    <div className="absolute top-20 right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
                    <div className="absolute bottom-20 left-20 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl animate-pulse-slow animation-delay-2000"></div>
                </div>

                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
                    {heroSlides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`transition-all duration-500 ${index === currentSlide
                                ? 'w-10 h-2 bg-white'
                                : 'w-2 h-2 bg-white/50 hover:bg-white/80'
                                } rounded-full`}
                        />
                    ))}
                </div>

                <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 w-full">
                    <div className="max-w-3xl text-white">
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6 animate-slide-up">
                            <Sparkles className="w-4 h-4" />
                            Pusat Edukasi Kesehatan & Pemulihan
                            <Sparkles className="w-4 h-4" />
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 animate-slide-up delay-100">
                            {heroSlides[currentSlide].title}
                        </h1>

                        <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl animate-slide-up delay-200">
                            {heroSlides[currentSlide].subtitle}
                        </p>

                        <div className="max-w-2xl relative animate-slide-up delay-300">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Cari artikel, video, atau panduan..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/90 backdrop-blur border border-white/50 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all shadow-lg text-slate-900"
                            />
                        </div>

                        <div className="flex flex-wrap gap-8 mt-12 animate-slide-up delay-500">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white">{articles.length}+</div>
                                <div className="text-sm text-white/70">Artikel</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white">3+</div>
                                <div className="text-sm text-white/70">Video Edukasi</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white">3+</div>
                                <div className="text-sm text-white/70">Panduan PDF</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white">15K+</div>
                                <div className="text-sm text-white/70">Pembaca</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-8 right-8 z-20 hidden lg:block">
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-white/60 text-xs uppercase tracking-wider">Scroll</span>
                        <div className="w-0.5 h-12 bg-white/30 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1/3 bg-white rounded-full animate-bounce"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Access Categories */}
            <section className="py-8 px-4 sm:px-6 -mt-8 relative z-30">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 shadow-xl border border-white/20">
                        <div className="flex flex-wrap gap-3 justify-center">
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => {
                                        setSelectedCategory(category.id);
                                        setSelectedSubCategory("semua");
                                    }}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${selectedCategory === category.id
                                        ? `bg-gradient-to-r ${category.color} text-white shadow-lg scale-105`
                                        : 'bg-white text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 border border-slate-200'
                                        }`}
                                >
                                    {category.icon}
                                    <span className="hidden sm:inline">{category.name}</span>
                                    <span className="text-xs bg-white/20 px-1.5 py-0.5 rounded-full">
                                        {getCategoryCount(category.id)}
                                    </span>
                                </button>
                            ))}
                        </div>
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
                                    className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${selectedSubCategory === subCat.id
                                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                                        : 'bg-white text-slate-600 hover:bg-blue-50 border border-slate-200'
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
                                        <div className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                                            style={{ backgroundImage: `url(${article.image})` }}>
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
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
                                                <div className="w-24 h-24 rounded-xl bg-cover bg-center flex-shrink-0"
                                                    style={{ backgroundImage: `url(${article.image})` }}>
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

                        {/* Right Column - Sidebar (MODIFIKASI: Informasi Pasca Operasi) */}
                        <div className="space-y-8">
                            {/* Info Pasca Operasi - Card Utama */}
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 shadow-lg border border-blue-100">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                        <Bandage className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-slate-800">Perawatan Pasca Operasi</h3>
                                        <p className="text-xs text-blue-600">Panduan Lengkap Pemulihan</p>
                                    </div>
                                </div>

                                <div className="relative h-40 rounded-xl overflow-hidden mb-4">
                                    <img
                                        src="/images/edukasi/pasca-operasi/hero-pasca-ops.jpg"
                                        alt="Perawatan Pasca Operasi"
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                        onError={(e) => e.target.src = "https://placehold.co/600x400/3b82f6/white?text=Pasca+Operasi"}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                    <div className="absolute bottom-3 left-3 text-white text-sm font-semibold">
                                        Pemulihan Optimal Pasca Operasi
                                    </div>
                                </div>

                                <p className="text-sm text-slate-600 mb-4">
                                    Pemulihan pasca operasi adalah proses penting untuk memastikan hasil operasi optimal dan mencegah komplikasi.
                                    Kami menyediakan panduan lengkap untuk membantu Anda melalui setiap tahap pemulihan.
                                </p>

                                <div className="grid grid-cols-3 gap-2 mb-4">
                                    <div className="text-center p-2 bg-white/60 rounded-lg">
                                        <p className="text-lg font-bold text-blue-600">95%</p>
                                        <p className="text-[10px] text-slate-500">Tingkat Keberhasilan</p>
                                    </div>
                                    <div className="text-center p-2 bg-white/60 rounded-lg">
                                        <p className="text-lg font-bold text-blue-600">500+</p>
                                        <p className="text-[10px] text-slate-500">Pasien Terbantu</p>
                                    </div>
                                    <div className="text-center p-2 bg-white/60 rounded-lg">
                                        <p className="text-lg font-bold text-blue-600">15+</p>
                                        <p className="text-[10px] text-slate-500">Dokter Spesialis</p>
                                    </div>
                                </div>

                                <Link href="/edukasi?kategori=pasca-operasi">
                                    <button className="w-full bg-blue-600 text-white py-2 rounded-xl font-semibold hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
                                        <BookOpen className="w-4 h-4" />
                                        Lihat Semua Artikel Pasca Operasi
                                    </button>
                                </Link>
                            </div>

                            {/* Tips Pemulihan Cepat */}
                            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                                        <Zap className="w-5 h-5 text-emerald-600" />
                                    </div>
                                    <h3 className="font-bold text-lg">Tips Pemulihan Cepat</h3>
                                </div>

                                <div className="space-y-3">
                                    {[
                                        { icon: <CheckCircle className="w-4 h-4 text-emerald-600" />, text: "Istirahat cukup 8 jam/hari untuk regenerasi sel" },
                                        { icon: <CheckCircle className="w-4 h-4 text-emerald-600" />, text: "Konsumsi protein tinggi (ikan, telur, tahu, tempe)" },
                                        { icon: <CheckCircle className="w-4 h-4 text-emerald-600" />, text: "Minum air putih 8 gelas/hari cegah dehidrasi" },
                                        { icon: <CheckCircle className="w-4 h-4 text-emerald-600" />, text: "Jaga kebersihan luka operasi dengan benar" },
                                        { icon: <CheckCircle className="w-4 h-4 text-emerald-600" />, text: "Ikuti jadwal kontrol dan fisioterapi" }
                                    ].map((tip, i) => (
                                        <div key={i} className="flex items-start gap-2 text-sm text-slate-600">
                                            {tip.icon}
                                            <span>{tip.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Jenis Operasi yang Ditangani */}
                            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                                        <Hospital className="w-5 h-5 text-purple-600" />
                                    </div>
                                    <h3 className="font-bold text-lg">Jenis Operasi yang Ditangani</h3>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    {[
                                        { name: "Operasi Jantung", icon: <HeartPulse className="w-4 h-4" />, color: "bg-red-50 text-red-600" },
                                        { name: "Operasi Tulang", icon: <Bone className="w-4 h-4" />, color: "bg-amber-50 text-amber-600" },
                                        { name: "Operasi Mata", icon: <EyeIcon className="w-4 h-4" />, color: "bg-blue-50 text-blue-600" },
                                        { name: "Operasi Perut", icon: <Activity className="w-4 h-4" />, color: "bg-emerald-50 text-emerald-600" },
                                        { name: "Operasi Gigi", icon: <Smile className="w-4 h-4" />, color: "bg-cyan-50 text-cyan-600" },
                                        { name: "Operasi Saraf", icon: <Brain className="w-4 h-4" />, color: "bg-purple-50 text-purple-600" }
                                    ].map((surgery, i) => (
                                        <Link
                                            key={i}
                                            href={`/edukasi?kategori=pasca-operasi&topik=${surgery.name.toLowerCase().replace(/ /g, '-')}`}
                                            className={`flex items-center gap-2 p-2 rounded-xl ${surgery.color} hover:scale-105 transition-transform`}
                                        >
                                            {surgery.icon}
                                            <span className="text-xs font-medium">{surgery.name}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Infografis Tahapan Pemulihan */}
                            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white">
                                <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5" />
                                    Tahapan Pemulihan
                                </h3>
                                <div className="space-y-3">
                                    {[
                                        { day: "1-3 Hari", title: "Fase Awal", desc: "Istirahat total, manajemen nyeri" },
                                        { day: "4-14 Hari", title: "Fase Perawatan", desc: "Perawatan luka, mobilisasi ringan" },
                                        { day: "2-6 Minggu", title: "Fase Rehabilitasi", desc: "Fisioterapi, aktivitas bertahap" },
                                        { day: ">6 Minggu", title: "Pemulihan Penuh", desc: "Kembali beraktivitas normal" }
                                    ].map((phase, i) => (
                                        <div key={i} className="flex items-center gap-3 bg-white/10 rounded-xl p-3">
                                            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">
                                                {phase.day}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-sm">{phase.title}</p>
                                                <p className="text-xs text-white/80">{phase.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Konsultasi Gratis */}
                            <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl p-6 text-white">
                                <div className="flex items-center gap-2 mb-3">
                                    <MessageCircle className="w-6 h-6" />
                                    <h3 className="font-bold text-lg">Konsultasi Gratis</h3>
                                </div>
                                <p className="text-sm text-white/90 mb-4">
                                    Konsultasikan kondisi pasca operasi Anda dengan dokter spesialis kami secara gratis.
                                </p>
                                <Link href="/konsultasi">
                                    <button className="w-full bg-white text-emerald-600 py-2 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2">
                                        <Stethoscope className="w-4 h-4" />
                                        Konsultasi Sekarang
                                    </button>
                                </Link>
                            </div>

                            {/* Testimoni Pasien */}
                            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                                        <Star className="w-5 h-5 text-yellow-600" />
                                    </div>
                                    <h3 className="font-bold text-lg">Kata Mereka</h3>
                                </div>

                                <div className="space-y-4">
                                    {[
                                        { name: "Ibu Siti", text: "Panduan perawatan luka sangat membantu proses pemulihan saya.", rating: 5 },
                                        { name: "Bapak Ahmad", text: "Rehabilitasi pasca operasi jantung berjalan lancar.", rating: 5 },
                                        { name: "Ibu Maria", text: "Tim medis sangat perhatian dan profesional.", rating: 5 }
                                    ].map((testimoni, i) => (
                                        <div key={i} className="border-b border-slate-100 last:border-0 pb-3 last:pb-0">
                                            <div className="flex items-center gap-1 mb-1">
                                                {[...Array(testimoni.rating)].map((_, j) => (
                                                    <Star key={j} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                                ))}
                                            </div>
                                            <p className="text-sm text-slate-600 italic">"{testimoni.text}"</p>
                                            <p className="text-xs text-slate-400 mt-1">- {testimoni.name}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
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

            {/* Footer */}
            <footer className="bg-slate-900 text-white py-12 sm:py-16 px-4 sm:px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-8">
                        <div>
                            <div className="flex items-center gap-4 mb-8">
                                <div className="relative w-12 h-12 rounded-[20px] overflow-hidden shadow-lg border border-white/5 bg-[#233E2E] flex items-center justify-center">
                                    <img
                                        src="/logo2.png"
                                        alt="KawanPulih Logo"
                                        className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <div className="flex flex-col leading-tight">
                                    <span className="text-2xl font-black tracking-tighter text-white">
                                        Kawan<span className="text-emerald-500">Pulih</span>
                                    </span>
                                </div>
                            </div>
                            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                                Platform kesehatan terpercaya untuk lansia Indonesia. Dampingi orang tua Anda dengan teknologi terkini.
                            </p>
                        </div>

                        {[
                            {
                                title: "Produk",
                                links: [
                                    { name: "Fitur", href: "/layanan" },
                                    { name: "Harga", href: "/harga" },
                                    { name: "FAQ", href: "/faq" },
                                    { name: "Blog", href: "/edukasi" }
                                ]
                            },
                            {
                                title: "Perusahaan",
                                links: [
                                    { name: "Tentang", href: "/tentang" },
                                    { name: "Karir", href: "/karir" },
                                    { name: "Kontak", href: "/kontak" },
                                    { name: "Mitra", href: "/mitra" }
                                ]
                            },
                            {
                                title: "Dukungan",
                                links: [
                                    { name: "Pusat Bantuan", href: "/bantuan" },
                                    { name: "Privasi", href: "/privasi" },
                                    { name: "Syarat & Ketentuan", href: "/syarat" },
                                    { name: "Keamanan", href: "/keamanan" }
                                ]
                            }
                        ].map((section, i) => (
                            <div key={i}>
                                <h4 className="font-bold mb-4">{section.title}</h4>
                                <ul className="space-y-2">
                                    {section.links.map((link, j) => (
                                        <li key={j}>
                                            <Link href={link.href} className="text-slate-400 hover:text-[#3E624C] text-sm transition-colors">
                                                {link.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-slate-800 pt-8 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-slate-400 text-sm text-center sm:text-left">
                            © 2026 KawanPulih. Semua Hak Dilindungi.
                        </p>
                        <div className="flex items-center gap-4">
                            {[
                                { name: "Twitter", href: "https://twitter.com" },
                                { name: "Facebook", href: "https://facebook.com" },
                                { name: "Instagram", href: "https://instagram.com" },
                                { name: "LinkedIn", href: "https://linkedin.com" }
                            ].map((social, i) => (
                                <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#3E624C] text-sm transition-colors">
                                    {social.name}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </footer>

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
                @keyframes pulse-slow {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.7; }
                }
                .animate-pulse-slow {
                    animation: pulse-slow 4s ease-in-out infinite;
                }
                @keyframes slide-up {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-slide-up {
                    animation: slide-up 0.8s ease-out forwards;
                }
                .animation-delay-100 {
                    animation-delay: 0.1s;
                }
                .animation-delay-200 {
                    animation-delay: 0.2s;
                }
                .animation-delay-300 {
                    animation-delay: 0.3s;
                }
                .animation-delay-500 {
                    animation-delay: 0.5s;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
            `}</style>
        </main>
    );
}