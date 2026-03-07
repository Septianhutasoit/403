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

    // Data untuk background slider (akan diganti dengan gambar Anda)
    const heroSlides = [
        {
            id: 1,
            image: "/images/hero/hero-edukasi-1.jpg", // Ganti dengan file gambar Anda
            title: "Edukasi Kesehatan untuk Semua",
            subtitle: "Pelajari cara hidup sehat dan pemulihan pasca operasi"
        },
        {
            id: 2,
            image: "/images/hero/hero-edukasi-2.jpg", // Ganti dengan file gambar Anda
            title: "Panduan Perawatan Pasca Operasi",
            subtitle: "Informasi lengkap untuk pemulihan yang cepat dan aman"
        },
        {
            id: 3,
            image: "/images/hero/hero-edukasi-3.jpg", // Ganti dengan file gambar Anda
            title: "Konsultasi dengan Ahli Kesehatan",
            subtitle: "Dapatkan jawaban dari dokter spesialis terpercaya"
        },
        {
            id: 4,
            image: "/images/hero/hero-edukasi-4.jpg", // Ganti dengan file gambar Anda
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

    // Data artikel edukasi dengan path gambar yang siap diisi
    const articles = [
        // KESEHATAN UMUM
        {
            id: 1,
            title: "Panduan Lengkap Nutrisi untuk Lansia",
            excerpt: "Makanan sehat dan pola gizi seimbang untuk menjaga vitalitas di usia lanjut.",
            category: "nutrisi",
            subCategory: "umum",
            image: "/images/edukasi/nutrisi.jpg", // Ganti dengan file gambar Anda
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
            image: "/images/edukasi/hipertensi.jpg", // Ganti dengan file gambar Anda
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
            image: "/images/edukasi/obat.jpg", // Ganti dengan file gambar Anda
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
            image: "/images/edukasi/olahraga.jpg", // Ganti dengan file gambar Anda
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
            image: "/images/edukasi/depresi.jpg", // Ganti dengan file gambar Anda
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
            image: "/images/edukasi/diabetes.jpg", // Ganti dengan file gambar Anda
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
            image: "/images/edukasi/suplemen.jpg", // Ganti dengan file gambar Anda
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
            image: "/images/edukasi/osteoporosis.jpg", // Ganti dengan file gambar Anda
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
            image: "/images/edukasi/demensia.jpg", // Ganti dengan file gambar Anda
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
            image: "/images/edukasi/pasca-operasi/luka.jpg", // Ganti dengan file gambar Anda
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
            image: "/images/edukasi/pasca-operasi/jantung.jpg", // Ganti dengan file gambar Anda
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
            image: "/images/edukasi/pasca-operasi/tulang.jpg", // Ganti dengan file gambar Anda
            author: "dr. Sari Indah, Sp.OT",
            date: "3 Mar 2026",
            readTime: "12 menit",
            views: "2.9K",
            likes: 345,
            featured: false,
            tags: ["Tulang", "Ortopedi", "Fisioterapi", "Pasca Operasi"]
        },
        {
            id: 14,
            title: "Perawatan Pasca Operasi Katarak",
            excerpt: "Panduan lengkap merawat mata setelah operasi katarak agar cepat sembuh.",
            category: "pasca-operasi",
            subCategory: "mata",
            image: "/images/edukasi/pasca-operasi/katarak.jpg", // Ganti dengan file gambar Anda
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
            image: "/images/edukasi/pasca-operasi/hernia.jpg", // Ganti dengan file gambar Anda
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
            title: "Pencegahan Infeksi Pasca Operasi",
            excerpt: "Langkah-langkah penting untuk mencegah infeksi pada luka operasi.",
            category: "pasca-operasi",
            subCategory: "umum",
            image: "/images/edukasi/pasca-operasi/infeksi.jpg", // Ganti dengan file gambar Anda
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
            title: "Latihan Pernapasan Pasca Operasi",
            excerpt: "Teknik pernapasan untuk mempercepat pemulihan dan mencegah komplikasi.",
            category: "pasca-operasi",
            subCategory: "umum",
            image: "/images/edukasi/pasca-operasi/pernapasan.jpg", // Ganti dengan file gambar Anda
            author: "dr. Dewi Lestari, Sp.P",
            date: "25 Feb 2026",
            readTime: "6 menit",
            views: "1.8K",
            likes: 223,
            featured: false,
            tags: ["Pernapasan", "Paru-paru", "Rehabilitasi", "Pasca Operasi"]
        },
        {
            id: 18,
            title: "Perawatan Pasca Operasi Gigi",
            excerpt: "Panduan merawat mulut setelah pencabutan atau operasi gigi.",
            category: "pasca-operasi",
            subCategory: "gigi",
            image: "/images/edukasi/pasca-operasi/gigi.jpg", // Ganti dengan file gambar Anda
            author: "drg. Maria Santoso",
            date: "24 Feb 2026",
            readTime: "5 menit",
            views: "2.3K",
            likes: 287,
            featured: false,
            tags: ["Gigi", "Mulut", "Pencabutan", "Pasca Operasi"]
        },
        {
            id: 19,
            title: "Kembali Bekerja Setelah Operasi",
            excerpt: "Panduan kapan dan bagaimana kembali bekerja dengan aman pasca operasi.",
            category: "pasca-operasi",
            subCategory: "umum",
            image: "/images/edukasi/pasca-operasi/bekerja.jpg", // Ganti dengan file gambar Anda
            author: "dr. Andi Firmansyah, Sp.PD",
            date: "23 Feb 2026",
            readTime: "7 menit",
            views: "2.0K",
            likes: 256,
            featured: false,
            tags: ["Pekerjaan", "Aktivitas", "Produktivitas", "Pasca Operasi"]
        },
        {
            id: 21,
            title: "Perawatan Jangka Panjang Pasca Operasi",
            excerpt: "Panduan menjaga kesehatan untuk mencegah komplikasi di masa depan.",
            category: "pasca-operasi",
            subCategory: "umum",
            image: "/images/edukasi/pasca-operasi/jangka-panjang.jpg", // Ganti dengan file gambar Anda
            author: "dr. Andi Firmansyah, Sp.PD",
            date: "22 Feb 2026",
            readTime: "9 menit",
            views: "2.7K",
            likes: 334,
            featured: true,
            tags: ["Perawatan", "Jangka Panjang", "Pemulihan", "Pasca Operasi"]
        }
    ];

    // Data video edukasi
    const videos = [
        {
            id: 1,
            title: "Senam Sehat untuk Lansia",
            duration: "15:30",
            views: "12K",
            category: "umum",
            thumbnail: "/images/edukasi/video/video1.jpg" // Ganti dengan file gambar Anda
        },
        {
            id: 2,
            title: "Cara Merawat Luka Operasi",
            duration: "8:45",
            views: "8.5K",
            category: "pasca-operasi",
            thumbnail: "/images/edukasi/video/video2.jpg" // Ganti dengan file gambar Anda
        },
        {
            id: 3,
            title: "Latihan Pasca Operasi Jantung",
            duration: "12:20",
            views: "6.2K",
            category: "pasca-operasi",
            thumbnail: "/images/edukasi/video/video3.jpg" // Ganti dengan file gambar Anda
        }
    ];

    // Data panduan PDF
    const guides = [
        {
            id: 1,
            title: "Panduan Perawatan Lansia di Rumah",
            pages: 45,
            downloads: "5.2K",
            size: "2.4 MB",
            category: "umum",
            cover: "/images/edukasi/guides/guide1.jpg" // Ganti dengan file gambar Anda
        },
        {
            id: 2,
            title: "Panduan Pemulihan Pasca Operasi",
            pages: 52,
            downloads: "4.8K",
            size: "3.1 MB",
            category: "pasca-operasi",
            cover: "/images/edukasi/guides/guide2.jpg" // Ganti dengan file gambar Anda
        },
        {
            id: 3,
            title: "Buku Saku Perawatan Luka Operasi",
            pages: 28,
            downloads: "3.9K",
            size: "1.8 MB",
            category: "pasca-operasi",
            cover: "/images/edukasi/guides/guide3.jpg" // Ganti dengan file gambar Anda
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

    // Hitung total artikel per kategori
    const getCategoryCount = (categoryId) => {
        return articles.filter(a => a.category === categoryId).length;
    };

    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
            <Navbar />

            {/* Hero Section dengan Background Slider */}
            <section className="relative h-[600px] sm:h-[650px] lg:h-[700px] flex items-center overflow-hidden">
                {/* Background Slider */}
                <div className="absolute inset-0">
                    {heroSlides.map((slide, index) => (
                        <div
                            key={slide.id}
                            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                                }`}
                        >
                            {/* Background Image */}
                            <div className="absolute inset-0 bg-cover bg-center"
                                style={{ backgroundImage: `url(${slide.image})` }}>
                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                            </div>

                            {/* Pattern Overlay */}
                            <div className="absolute inset-0 opacity-20"
                                style={{
                                    backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                                    backgroundSize: '40px 40px'
                                }}>
                            </div>
                        </div>
                    ))}

                    {/* Floating Elements */}
                    <div className="absolute top-20 right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
                    <div className="absolute bottom-20 left-20 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl animate-pulse-slow animation-delay-2000"></div>
                </div>

                {/* Slide Indicators */}
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

                {/* Hero Content */}
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

                        {/* Search Bar */}
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

                        {/* Stats */}
                        <div className="flex flex-wrap gap-8 mt-12 animate-slide-up delay-500">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white">{articles.length}+</div>
                                <div className="text-sm text-white/70">Artikel</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white">{videos.length}+</div>
                                <div className="text-sm text-white/70">Video Edukasi</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white">{guides.length}+</div>
                                <div className="text-sm text-white/70">Panduan PDF</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white">15K+</div>
                                <div className="text-sm text-white/70">Pembaca</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
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
                                        {/* Gambar Artikel */}
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
                                                    <div className="relative w-24 h-16 rounded-lg bg-cover bg-center flex-shrink-0 overflow-hidden"
                                                        style={{ backgroundImage: `url(${video.thumbnail})` }}>
                                                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <Play className="w-6 h-6 text-white" />
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
                                                <div className="flex items-center gap-3">
                                                    <div className="w-12 h-12 rounded-lg bg-cover bg-center"
                                                        style={{ backgroundImage: `url(${guide.cover})` }}>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-medium text-sm mb-1">{guide.title}</h4>
                                                        <div className="flex items-center gap-2 text-xs text-slate-400">
                                                            <span>{guide.pages} halaman</span>
                                                            <span>•</span>
                                                            <span>{guide.size}</span>
                                                        </div>
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
                            { icon: <HeartPulse className="w-6 h-6" />, name: "Jantung", count: 12, category: "penyakit", image: "/images/edukasi/topik/jantung.jpg" },
                            { icon: <Brain className="w-6 h-6" />, name: "Saraf", count: 8, category: "penyakit", image: "/images/edukasi/topik/saraf.jpg" },
                            { icon: <Bone className="w-6 h-6" />, name: "Tulang", count: 10, category: "penyakit", image: "/images/edukasi/topik/tulang.jpg" },
                            { icon: <EyeIcon className="w-6 h-6" />, name: "Mata", count: 6, category: "penyakit", image: "/images/edukasi/topik/mata.jpg" },
                            { icon: <Ear className="w-6 h-6" />, name: "Telinga", count: 5, category: "penyakit", image: "/images/edukasi/topik/telinga.jpg" },
                            { icon: <Wind className="w-6 h-6" />, name: "Paru-paru", count: 9, category: "penyakit", image: "/images/edukasi/topik/paru.jpg" },
                            { icon: <Bandage className="w-6 h-6" />, name: "Perawatan Luka", count: 15, category: "pasca-operasi", image: "/images/edukasi/topik/luka.jpg" },
                            { icon: <Hospital className="w-6 h-6" />, name: "Pasca Operasi", count: 20, category: "pasca-operasi", image: "/images/edukasi/topik/operasi.jpg" },
                            { icon: <Droplets className="w-6 h-6" />, name: "Ginjal", count: 7, category: "penyakit", image: "/images/edukasi/topik/ginjal.jpg" },
                            { icon: <Thermometer className="w-6 h-6" />, name: "Demam", count: 4, category: "umum", image: "/images/edukasi/topik/demam.jpg" },
                            { icon: <Apple className="w-6 h-6" />, name: "Nutrisi", count: 18, category: "nutrisi", image: "/images/edukasi/topik/nutrisi.jpg" },
                            { icon: <Pill className="w-6 h-6" />, name: "Obat", count: 14, category: "obat", image: "/images/edukasi/topik/obat.jpg" },
                            { icon: <Activity className="w-6 h-6" />, name: "Olahraga", count: 11, category: "aktivitas", image: "/images/edukasi/topik/olahraga.jpg" },
                            { icon: <Smile className="w-6 h-6" />, name: "Mental", count: 9, category: "mental", image: "/images/edukasi/topik/mental.jpg" },
                            { icon: <HeartHandshake className="w-6 h-6" />, name: "Dukungan", count: 7, category: "umum", image: "/images/edukasi/topik/dukungan.jpg" },
                            { icon: <Moon className="w-6 h-6" />, name: "Istirahat", count: 6, category: "umum", image: "/images/edukasi/topik/istirahat.jpg" },
                            { icon: <Leaf className="w-6 h-6" />, name: "Herbal", count: 5, category: "umum", image: "/images/edukasi/topik/herbal.jpg" },
                            { icon: <Footprints className="w-6 h-6" />, name: "Jalan Kaki", count: 8, category: "aktivitas", image: "/images/edukasi/topik/jalan.jpg" }
                        ].map((topic, i) => (
                            <Link
                                href={`/edukasi?kategori=${topic.category}&topik=${topic.name.toLowerCase()}`}
                                key={i}
                                onClick={() => {
                                    setSelectedCategory(topic.category);
                                    setSearchTerm(topic.name);
                                }}
                            >
                                <div className="relative h-32 rounded-xl overflow-hidden group cursor-pointer">
                                    <div className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                                        style={{ backgroundImage: `url(${topic.image})` }}>
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                                    </div>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                                        <div className="text-emerald-300 mb-1 group-hover:scale-110 transition-transform">
                                            {topic.icon}
                                        </div>
                                        <p className="font-medium text-sm">{topic.name}</p>
                                        <p className="text-xs text-white/70">{topic.count} artikel</p>
                                    </div>
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