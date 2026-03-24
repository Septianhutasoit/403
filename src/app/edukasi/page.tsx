"use client";

import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import FloatingChat from "@/components/FloatingChat";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
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

    // Kategori edukasi - Warna Hijau
    const categories = [
        { id: "semua", name: "Semua", icon: <BookOpen className="w-4 h-4" />, color: "from-[#233E2E] to-[#3E624C]" },
        { id: "umum", name: "Kesehatan Umum", icon: <Heart className="w-4 h-4" />, color: "from-[#233E2E] to-[#3E624C]" },
        { id: "pasca-operasi", name: "Pasca Operasi", icon: <Bandage className="w-4 h-4" />, color: "from-[#233E2E] to-[#3E624C]" },
        { id: "nutrisi", name: "Nutrisi & Gizi", icon: <Apple className="w-4 h-4" />, color: "from-[#233E2E] to-[#3E624C]" },
        { id: "penyakit", name: "Penyakit Umum", icon: <AlertCircle className="w-4 h-4" />, color: "from-[#233E2E] to-[#3E624C]" },
        { id: "obat", name: "Penggunaan Obat", icon: <Pill className="w-4 h-4" />, color: "from-[#233E2E] to-[#3E624C]" },
        { id: "aktivitas", name: "Aktivitas Fisik", icon: <Activity className="w-4 h-4" />, color: "from-[#233E2E] to-[#3E624C]" },
        { id: "mental", name: "Kesehatan Mental", icon: <Brain className="w-4 h-4" />, color: "from-[#233E2E] to-[#3E624C]" }
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

    // Data artikel edukasi lengkap
    const articles = [
        {
            id: 1,
            title: "Panduan Lengkap Nutrisi untuk Lansia",
            excerpt: "Makanan sehat dan pola gizi seimbang untuk menjaga vitalitas di usia lanjut.",
            category: "nutrisi",
            subCategory: "umum",
            image: "/images/edukasi/nutrisi.jpg",
            author: "dr. Sarah Wijaya, Sp.GK",
            date: "2 Maret 2026",
            readTime: "8 menit",
            views: "2.5K",
            likes: 342,
            featured: true,
            tags: ["Gizi", "Makanan Sehat", "Suplemen", "Lansia"],
            content: `<p>Kesehatan lansia sangat dipengaruhi oleh asupan nutrisi yang tepat. Seiring bertambahnya usia, tubuh mengalami perubahan yang mempengaruhi kebutuhan gizi. Berikut panduan lengkap nutrisi untuk lansia.</p>
            <h2>Kebutuhan Gizi Harian Lansia</h2>
            <ul><li>Kalori: 1.800-2.000 kkal</li><li>Protein: 50-60 gram</li><li>Kalsium: 1.000-1.200 mg</li><li>Vitamin D: 800-1.000 IU</li><li>Air: 6-8 gelas/hari</li></ul>
            <p>Sumber protein terbaik: ikan, ayam tanpa kulit, telur, tahu, tempe. Perbanyak sayur hijau dan buah-buahan segar.</p>`
        },
        {
            id: 2,
            title: "Mengenal Hipertensi pada Lansia",
            excerpt: "Penyebab, gejala, dan cara mengelola tekanan darah tinggi di usia lanjut.",
            category: "penyakit",
            subCategory: "umum",
            image: "/images/edukasi/hipertensi.jpg",
            author: "dr. Ahmad Hasan, Sp.PD",
            date: "1 Maret 2026",
            readTime: "6 menit",
            views: "3.1K",
            likes: 456,
            featured: true,
            tags: ["Hipertensi", "Tekanan Darah", "Jantung", "Lansia"],
            content: `<p>Hipertensi atau tekanan darah tinggi adalah kondisi umum pada lansia. Deteksi dini dan penanganan tepat sangat penting.</p>
            <h2>Pencegahan Hipertensi</h2>
            <ul><li>Kurangi konsumsi garam (<5 gram/hari)</li><li>Olahraga teratur 30 menit/hari</li><li>Jaga berat badan ideal</li><li>Kelola stres dengan baik</li><li>Rutin cek tekanan darah</li></ul>`
        },
        {
            id: 3,
            title: "Panduan Minum Obat yang Aman",
            excerpt: "Cara tepat mengonsumsi obat-obatan untuk menghindari efek samping berbahaya.",
            category: "obat",
            subCategory: "umum",
            image: "/images/edukasi/obat.jpg",
            author: "apt. Maria Santoso, M.Farm",
            date: "28 Februari 2026",
            readTime: "5 menit",
            views: "1.8K",
            likes: 234,
            featured: false,
            tags: ["Obat", "Farmasi", "Keamanan", "Lansia"],
            content: `<p>Konsumsi obat yang tepat sangat penting untuk keselamatan pasien. Berikut panduan minum obat yang aman.</p>
            <h2>Tips Minum Obat Aman</h2>
            <ul><li>Minum obat tepat waktu sesuai resep</li><li>Jangan menghentikan obat tanpa konsultasi</li><li>Baca aturan pakai dengan teliti</li><li>Hindari menggandakan dosis</li><li>Konsultasi jika muncul efek samping</li></ul>`
        },
        {
            id: 4,
            title: "Olahraga Ringan untuk Lansia",
            excerpt: "Gerakan sederhana yang aman dilakukan untuk menjaga kebugaran tubuh.",
            category: "aktivitas",
            subCategory: "umum",
            image: "/images/edukasi/olahraga.jpg",
            author: "dr. Budi Santoso, Sp.KFR",
            date: "27 Februari 2026",
            readTime: "7 menit",
            views: "2.2K",
            likes: 389,
            featured: true,
            tags: ["Olahraga", "Fisioterapi", "Kebugaran", "Lansia"],
            content: `<p>Aktivitas fisik teratur membantu lansia tetap bugar dan mandiri. Berikut rekomendasi olahraga ringan.</p>
            <h2>Jenis Olahraga yang Dianjurkan</h2>
            <ul><li>Jalan kaki 30 menit/hari</li><li>Senam lansia</li><li>Yoga atau tai chi</li><li>Latihan peregangan</li><li>Bersepeda statis</li></ul>`
        },
        {
            id: 5,
            title: "Mengatasi Depresi pada Lansia",
            excerpt: "Cara mengenali dan menangani gangguan mental yang sering dialami lansia.",
            category: "mental",
            subCategory: "umum",
            image: "/images/edukasi/depresi.jpg",
            author: "dr. Rina Putri, Sp.KJ",
            date: "26 Februari 2026",
            readTime: "9 menit",
            views: "1.9K",
            likes: 267,
            featured: false,
            tags: ["Mental", "Depresi", "Konseling", "Lansia"],
            content: `<p>Depresi pada lansia sering tidak terdeteksi. Kenali gejalanya dan segera tangani.</p>
            <h2>Tanda Depresi pada Lansia</h2>
            <ul><li>Kehilangan minat pada aktivitas</li><li>Gangguan tidur</li><li>Perubahan nafsu makan</li><li>Mudah lelah</li><li>Pikiran negatif berlebihan</li></ul>`
        },
        {
            id: 6,
            title: "Diabetes Mellitus pada Lansia",
            excerpt: "Panduan lengkap mengelola diabetes agar tetap produktif dan sehat.",
            category: "penyakit",
            subCategory: "umum",
            image: "/images/edukasi/diabetes.jpg",
            author: "dr. Andi Firmansyah, Sp.PD",
            date: "25 Februari 2026",
            readTime: "10 menit",
            views: "2.8K",
            likes: 412,
            featured: true,
            tags: ["Diabetes", "Gula Darah", "Metabolik", "Lansia"],
            content: `<p>Diabetes pada lansia dapat dikelola dengan baik. Berikut panduan lengkapnya.</p>
            <h2>Manajemen Diabetes</h2>
            <ul><li>Kontrol gula darah rutin</li><li>Pola makan teratur</li><li>Olahraga teratur</li><li>Minum obat tepat waktu</li><li>Cegah komplikasi dengan kontrol rutin</li></ul>`
        },
        {
            id: 7,
            title: "Suplemen untuk Kesehatan Lansia",
            excerpt: "Vitamin dan mineral penting untuk menjaga kesehatan di usia lanjut.",
            category: "nutrisi",
            subCategory: "umum",
            image: "/images/edukasi/suplemen.jpg",
            author: "apt. Dewi Lestari, M.Farm",
            date: "24 Februari 2026",
            readTime: "6 menit",
            views: "1.5K",
            likes: 198,
            featured: false,
            tags: ["Suplemen", "Vitamin", "Mineral", "Lansia"],
            content: `<p>Suplemen dapat membantu memenuhi kebutuhan gizi lansia. Konsultasikan dengan dokter sebelum mengonsumsinya.</p>
            <h2>Suplemen yang Sering Dibutuhkan</h2>
            <ul><li>Vitamin D dan kalsium untuk tulang</li><li>Vitamin B12 untuk energi</li><li>Omega-3 untuk jantung</li><li>Zinc untuk imunitas</li><li>Probiotik untuk pencernaan</li></ul>`
        },
        {
            id: 8,
            title: "Mencegah Osteoporosis pada Lansia",
            excerpt: "Langkah-langkah menjaga kepadatan tulang di usia lanjut.",
            category: "aktivitas",
            subCategory: "umum",
            image: "/images/edukasi/osteoporosis.jpg",
            author: "dr. Sari Indah, Sp.OT",
            date: "23 Februari 2026",
            readTime: "7 menit",
            views: "2.0K",
            likes: 278,
            featured: true,
            tags: ["Tulang", "Osteoporosis", "Kalsium", "Lansia"],
            content: `<p>Osteoporosis dapat dicegah dengan gaya hidup sehat. Berikut langkah-langkahnya.</p>
            <h2>Pencegahan Osteoporosis</h2>
            <ul><li>Konsumsi kalsium 1.200 mg/hari</li><li>Vitamin D dari sinar matahari pagi</li><li>Olahraga beban teratur</li><li>Hindari merokok dan alkohol</li><li>Cek kepadatan tulang rutin</li></ul>`
        },
        {
            id: 9,
            title: "Perawatan Lansia dengan Demensia",
            excerpt: "Panduan bagi keluarga dalam merawat lansia dengan gangguan daya ingat.",
            category: "mental",
            subCategory: "umum",
            image: "/images/edukasi/demensia.jpg",
            author: "dr. Maya Angelina, Sp.S",
            date: "22 Februari 2026",
            readTime: "12 menit",
            views: "3.5K",
            likes: 523,
            featured: true,
            tags: ["Demensia", "Alzheimer", "Perawatan", "Lansia"],
            content: `<p>Merawat lansia dengan demensia membutuhkan kesabaran dan pengetahuan. Berikut panduan untuk keluarga.</p>
            <h2>Tips Merawat Lansia dengan Demensia</h2>
            <ul><li>Ciptakan rutinitas harian</li><li>Bicara dengan lembut dan jelas</li><li>Lingkungan yang aman</li><li>Libatkan dalam aktivitas sederhana</li><li>Jangan membantah, alihkan perhatian</li></ul>`
        },
        {
            id: 10,
            title: "Panduan Perawatan Luka Pasca Operasi",
            excerpt: "Cara merawat luka operasi agar cepat kering dan mencegah infeksi.",
            category: "pasca-operasi",
            subCategory: "umum",
            image: "/images/edukasi/pasca-operasi/luka.jpg",
            author: "dr. Budi Santoso, Sp.B",
            date: "5 Maret 2026",
            readTime: "10 menit",
            views: "4.2K",
            likes: 567,
            featured: true,
            tags: ["Luka", "Infeksi", "Perawatan", "Pasca Operasi"],
            content: `<p>Perawatan luka yang tepat sangat penting untuk mencegah infeksi. Berikut panduan lengkapnya.</p>
            <h2>Langkah Perawatan Luka</h2>
            <ul><li>Cuci tangan sebelum merawat luka</li><li>Bersihkan luka dengan NaCl</li><li>Keringkan dengan tepuk lembut</li><li>Tutup dengan kasa steril</li><li>Ganti balutan rutin</li></ul>
            <div class="bg-red-50 p-4 rounded-lg my-4"><p class="text-red-700"><strong>Tanda Infeksi:</strong> Kemerahan meluas, bengkak, nanah, demam >38°C</p></div>`
        },
        {
            id: 11,
            title: "Pemulihan Pasca Operasi Jantung",
            excerpt: "Langkah-langkah penting untuk pemulihan optimal setelah operasi jantung.",
            category: "pasca-operasi",
            subCategory: "jantung",
            image: "/images/edukasi/pasca-operasi/jantung.jpg",
            author: "dr. Ahmad Hasan, Sp.BTKV",
            date: "4 Maret 2026",
            readTime: "15 menit",
            views: "3.8K",
            likes: 489,
            featured: true,
            tags: ["Jantung", "Kardiovaskular", "Rehabilitasi", "Pasca Operasi"],
            content: `<p>Pemulihan pasca operasi jantung membutuhkan perhatian khusus. Ikuti panduan ini untuk hasil optimal.</p>
            <h2>Fase Pemulihan</h2>
            <ul><li>Fase I (0-2 hari): Istirahat total, monitoring ketat</li><li>Fase II (2-7 hari): Mobilisasi bertahap, perawatan luka</li><li>Fase III (2-6 minggu): Jalan kaki bertahap, rehabilitasi jantung</li><li>Fase IV (>6 minggu): Kembali beraktivitas normal</li></ul>
            <div class="bg-green-50 p-4 rounded-lg my-4"><p class="text-green-700"><strong>Tips:</strong> Ikuti program rehabilitasi jantung untuk pemulihan optimal</p></div>`
        },
        {
            id: 14,
            title: "Perawatan Pasca Operasi Katarak",
            excerpt: "Panduan lengkap merawat mata setelah operasi katarak agar cepat sembuh.",
            category: "pasca-operasi",
            subCategory: "mata",
            image: "/images/edukasi/pasca-operasi/katarak.jpg",
            author: "dr. Rina Putri, Sp.M",
            date: "1 Maret 2026",
            readTime: "7 menit",
            views: "3.2K",
            likes: 412,
            featured: true,
            tags: ["Mata", "Katarak", "Penglihatan", "Pasca Operasi"],
            content: `<p>Operasi katarak adalah prosedur yang aman. Perawatan pasca operasi yang tepat sangat penting.</p>
            <h2>Perawatan Pasca Operasi Katarak</h2>
            <ul><li>Jangan mengucek mata</li><li>Pakai pelindung mata saat tidur</li><li>Tetes mata sesuai jadwal</li><li>Jangan menunduk/membungkuk</li><li>Hindari membaca berlebihan</li></ul>`
        },
        {
            id: 16,
            title: "Pencegahan Infeksi Pasca Operasi",
            excerpt: "Langkah-langkah penting untuk mencegah infeksi pada luka operasi.",
            category: "pasca-operasi",
            subCategory: "umum",
            image: "/images/edukasi/pasca-operasi/infeksi.jpg",
            author: "dr. Andi Firmansyah, Sp.PD",
            date: "26 Februari 2026",
            readTime: "8 menit",
            views: "3.7K",
            likes: 498,
            featured: true,
            tags: ["Infeksi", "Kebersihan", "Luka", "Pasca Operasi"],
            content: `<p>Infeksi pasca operasi dapat dicegah dengan langkah-langkah sederhana. Berikut panduannya.</p>
            <h2>Cegah Infeksi Pasca Operasi</h2>
            <ul><li>Jaga kebersihan luka</li><li>Cuci tangan sebelum menyentuh luka</li><li>Ganti balutan rutin</li><li>Konsumsi makanan bergizi</li><li>Minum antibiotik sesuai resep</li></ul>`
        },
        {
            id: 17,
            title: "Perawatan Pasca Operasi Gigi",
            excerpt: "Panduan merawat mulut setelah pencabutan atau operasi gigi.",
            category: "pasca-operasi",
            subCategory: "gigi",
            image: "/images/edukasi/pasca-operasi/gigi.jpg",
            author: "drg. Maria Santoso",
            date: "24 Februari 2026",
            readTime: "5 menit",
            views: "2.3K",
            likes: 287,
            featured: false,
            tags: ["Gigi", "Mulut", "Pencabutan", "Pasca Operasi"],
            content: `<p>Perawatan pasca operasi gigi yang tepat membantu penyembuhan lebih cepat.</p>
            <h2>Tips Perawatan Pasca Operasi Gigi</h2>
            <ul><li>Kompres dingin untuk mengurangi bengkak</li><li>Hindari makanan keras</li><li>Jangan berkumur 24 jam pertama</li><li>Minum obat sesuai resep</li><li>Istirahat cukup</li></ul>`
        }
    ];

    // Filter artikel berdasarkan kategori dan pencarian
    const filteredArticles = articles.filter(article => {
        const matchesCategory = selectedCategory === "semua" || article.category === selectedCategory;
        const matchesSubCategory = selectedSubCategory === "semua" || article.subCategory === selectedSubCategory;
        const matchesSearch = searchTerm === "" ||
            article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
                    <div className="absolute top-20 right-20 w-96 h-96 bg-[#233E2E]/10 rounded-full blur-2xl animate-pulse-slow"></div>
                    <div className="absolute bottom-20 left-20 w-80 h-80 bg-[#3E624C]/10 rounded-full blur-2xl animate-pulse-slow animation-delay-2000"></div>
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
                                placeholder="Cari artikel, atau panduan..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/90 backdrop-blur border border-white/50 focus:border-[#233E2E] focus:ring-2 focus:ring-[#233E2E]/20 outline-none transition-all shadow-lg text-slate-900"
                            />
                        </div>

                        <div className="flex flex-wrap gap-8 mt-12 animate-slide-up delay-500">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white">{articles.length}+</div>
                                <div className="text-sm text-white/70">Artikel</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white">3+</div>
                                <div className="text-sm text-white/70">Panduan </div>
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
                                        : 'bg-white text-slate-600 hover:bg-[#233E2E]/10 hover:text-[#233E2E] border border-slate-200'
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
                                        ? 'bg-gradient-to-r from-[#233E2E] to-[#3E624C] text-white shadow-lg'
                                        : 'bg-white text-slate-600 hover:bg-[#233E2E]/10 border border-slate-200'
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
                            <h2 className="text-2xl font-bold text-slate-800">
                                {selectedCategory === "pasca-operasi"
                                    ? "Artikel Pilihan Pasca Operasi"
                                    : "Artikel Pilihan"}
                            </h2>
                            <p className="text-slate-500">Rekomendasi artikel terbaik untuk Anda</p>
                        </div>
                        <Link href={`/edukasi/artikel${selectedCategory !== "semua" ? `?kategori=${selectedCategory}` : ''}`}
                            className="text-[#233E2E] hover:text-[#3E624C] flex items-center gap-1 font-medium">
                            Lihat Semua <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredFeaturedArticles.slice(0, 3).map((article, index) => (
                            <Link href={`/edukasi/artikel/${article.id}`} key={article.id}>
                                <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-slate-100">
                                    <div className="relative h-48 overflow-hidden">
                                        <div className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                                            style={{ backgroundImage: `url(${article.image})` }}>
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                                        </div>
                                        <div className="absolute top-4 right-4 z-20">
                                            <span className="px-3 py-1 bg-white/90 backdrop-blur rounded-full text-xs font-semibold text-[#233E2E]">
                                                {article.category === "pasca-operasi" ? "Pasca Operasi" : "Featured"}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="text-xs font-medium px-2 py-1 bg-[#233E2E]/10 text-[#233E2E] rounded-full">
                                                {categories.find(c => c.id === article.category)?.name || article.category}
                                            </span>
                                            <span className="text-xs text-slate-400 flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {article.readTime}
                                            </span>
                                        </div>
                                        <h3 className="font-bold text-lg mb-2 group-hover:text-[#233E2E] transition-colors line-clamp-2">
                                            {article.title}
                                        </h3>
                                        <p className="text-slate-500 text-sm mb-4 line-clamp-2">{article.excerpt}</p>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#233E2E] to-[#3E624C] flex items-center justify-center text-white text-xs font-bold">
                                                    {article.author.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium">{article.author.split(',')[0]}</p>
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
                                <h2 className="text-2xl font-bold text-slate-800">
                                    {selectedCategory === "pasca-operasi"
                                        ? "Artikel Pasca Operasi"
                                        : "Semua Artikel"}
                                </h2>
                                <div className="flex items-center gap-2">
                                    <Filter className="w-4 h-4 text-slate-400" />
                                    <select className="text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#233E2E]">
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
                                                        <span className="text-xs font-medium px-2 py-1 bg-[#233E2E]/10 text-[#233E2E] rounded-full">
                                                            {categories.find(c => c.id === article.category)?.name || article.category}
                                                        </span>
                                                        {article.tags.slice(0, 2).map((tag, i) => (
                                                            <span key={i} className="text-xs text-slate-400">#{tag}</span>
                                                        ))}
                                                    </div>
                                                    <h3 className="font-bold text-lg mb-2 group-hover:text-[#233E2E] transition-colors line-clamp-1">
                                                        {article.title}
                                                    </h3>
                                                    <p className="text-slate-500 text-sm mb-3 line-clamp-2">{article.excerpt}</p>
                                                    <div className="flex items-center gap-4 text-xs text-slate-400">
                                                        <span className="flex items-center gap-1">
                                                            <User className="w-3 h-3" /> {article.author.split(',')[0]}
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
                                        className="bg-white border-2 border-[#233E2E] text-[#233E2E] px-8 py-3 rounded-xl font-semibold hover:bg-[#233E2E]/10 transition-all duration-500"
                                    >
                                        Muat Lebih Banyak ({filteredArticles.length - visibleArticles} tersisa)
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Right Column - Sidebar Informasi Pasca Operasi */}
                        <div className="space-y-8">
                            {/* Info Pasca Operasi - Card Utama */}
                            <div className="bg-gradient-to-br from-[#233E2E]/10 to-[#3E624C]/10 rounded-2xl p-6 shadow-lg border border-[#233E2E]/20">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 bg-[#233E2E]/20 rounded-xl flex items-center justify-center">
                                        <Bandage className="w-6 h-6 text-[#233E2E]" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-slate-800">Perawatan Pasca Operasi</h3>
                                        <p className="text-xs text-[#3E624C]">Panduan Lengkap Pemulihan</p>
                                    </div>
                                </div>

                                <div className="relative h-40 rounded-xl overflow-hidden mb-4">
                                    <img
                                        src="/images/edukasi/pasca-operasi/hero-pasca-ops.jpg"
                                        alt="Perawatan Pasca Operasi"
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                        onError={(e) => e.target.src = "https://placehold.co/600x400/233E2E/white?text=Pasca+Operasi"}
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
                                        <p className="text-lg font-bold text-[#233E2E]">95%</p>
                                        <p className="text-[10px] text-slate-500">Keberhasilan</p>
                                    </div>
                                    <div className="text-center p-2 bg-white/60 rounded-lg">
                                        <p className="text-lg font-bold text-[#233E2E]">500+</p>
                                        <p className="text-[10px] text-slate-500">Pasien</p>
                                    </div>
                                    <div className="text-center p-2 bg-white/60 rounded-lg">
                                        <p className="text-lg font-bold text-[#233E2E]">15+</p>
                                        <p className="text-[10px] text-slate-500">Spesialis</p>
                                    </div>
                                </div>

                                <Link href="/edukasi?kategori=pasca-operasi">
                                    <button className="w-full bg-gradient-to-r from-[#233E2E] to-[#3E624C] text-white py-2 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2">
                                        <BookOpen className="w-4 h-4" />
                                        Lihat Semua Artikel
                                    </button>
                                </Link>
                            </div>

                            {/* Tips Pemulihan Cepat */}
                            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-10 h-10 bg-[#233E2E]/10 rounded-xl flex items-center justify-center">
                                        <Zap className="w-5 h-5 text-[#233E2E]" />
                                    </div>
                                    <h3 className="font-bold text-lg">Tips Pemulihan Cepat</h3>
                                </div>

                                <div className="space-y-3">
                                    {[
                                        { icon: <CheckCircle className="w-4 h-4 text-[#233E2E]" />, text: "Istirahat cukup 8 jam/hari untuk regenerasi sel" },
                                        { icon: <CheckCircle className="w-4 h-4 text-[#233E2E]" />, text: "Konsumsi protein tinggi (ikan, telur, tahu, tempe)" },
                                        { icon: <CheckCircle className="w-4 h-4 text-[#233E2E]" />, text: "Minum air putih 8 gelas/hari cegah dehidrasi" },
                                        { icon: <CheckCircle className="w-4 h-4 text-[#233E2E]" />, text: "Jaga kebersihan luka operasi dengan benar" },
                                        { icon: <CheckCircle className="w-4 h-4 text-[#233E2E]" />, text: "Ikuti jadwal kontrol dan fisioterapi" }
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
                                    <div className="w-10 h-10 bg-[#233E2E]/10 rounded-xl flex items-center justify-center">
                                        <Hospital className="w-5 h-5 text-[#233E2E]" />
                                    </div>
                                    <h3 className="font-bold text-lg">Jenis Operasi</h3>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    {[
                                        { name: "Operasi Jantung", icon: <HeartPulse className="w-4 h-4" /> },
                                        { name: "Operasi Tulang", icon: <Bone className="w-4 h-4" /> },
                                        { name: "Operasi Mata", icon: <EyeIcon className="w-4 h-4" /> },
                                        { name: "Operasi Perut", icon: <Activity className="w-4 h-4" /> },
                                        { name: "Operasi Gigi", icon: <Smile className="w-4 h-4" /> },
                                        { name: "Operasi Saraf", icon: <Brain className="w-4 h-4" /> }
                                    ].map((surgery, i) => (
                                        <Link
                                            key={i}
                                            href={`/edukasi?kategori=pasca-operasi&topik=${surgery.name.toLowerCase().replace(/ /g, '-')}`}
                                            className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 hover:bg-[#233E2E]/10 transition-colors"
                                        >
                                            {surgery.icon}
                                            <span className="text-xs font-medium text-slate-700">{surgery.name}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Konsultasi Gratis */}
                            <div className="bg-gradient-to-r from-[#233E2E] to-[#3E624C] rounded-2xl p-6 text-white">
                                <div className="flex items-center gap-2 mb-3">
                                    <MessageCircle className="w-6 h-6" />
                                    <h3 className="font-bold text-lg">Konsultasi Gratis</h3>
                                </div>
                                <p className="text-sm text-white/90 mb-4">
                                    Konsultasikan kondisi pasca operasi Anda dengan dokter spesialis kami secara gratis.
                                </p>
                                <Link href="/konsultasi">
                                    <button className="w-full bg-white text-[#233E2E] py-2 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2">
                                        <Stethoscope className="w-4 h-4" />
                                        Konsultasi Sekarang
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-4 sm:px-6 bg-gradient-to-br from-[#233E2E] to-[#3E624C] text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4">Butuh Konsultasi Kesehatan?</h2>
                    <p className="text-lg mb-8 text-white/90">
                        Dokter spesialis kami siap membantu menjawab pertanyaan Anda seputar kesehatan umum dan pemulihan pasca operasi.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/konsultasi">
                            <button className="bg-white text-[#233E2E] px-8 py-4 rounded-xl font-bold hover:shadow-2xl hover:scale-105 transition-all duration-500">
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
                                        Kawan<span className="text-[#3E624C]">Pulih</span>
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
                .line-clamp-1 {
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </main>
    );
}