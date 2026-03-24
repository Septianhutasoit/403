"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import FloatingChat from "@/components/FloatingChat";
import {
    Heart, BookOpen, Clock, Eye, ThumbsUp, Share2, Bookmark,
    ChevronLeft, ChevronRight, User, Calendar, MessageCircle,
    Printer, Download, ArrowLeft, Sparkles, CheckCircle, AlertCircle,
    Stethoscope, Bandage, Apple, Brain, Activity, Pill, HeartPulse,
    Bone, Eye as EyeIcon, Smile, TrendingUp, Star, Award, Shield, Zap,
    ChevronDown, ChevronUp, Twitter, Facebook, Linkedin, Link as LinkIcon
} from "lucide-react";

// Data artikel lengkap sesuai dengan yang ada di halaman edukasi
const articlesData = {
    1: {
        id: 1,
        title: "Panduan Lengkap Nutrisi untuk Lansia",
        excerpt: "Makanan sehat dan pola gizi seimbang untuk menjaga vitalitas di usia lanjut.",
        category: "nutrisi",
        subCategory: "umum",
        image: "/images/edukasi/nutrisi.jpg",
        author: "dr. Sarah Wijaya, Sp.GK",
        authorDesc: "Spesialis Gizi Klinik dengan pengalaman 12 tahun",
        date: "2 Maret 2026",
        readTime: "8 menit",
        views: "2.5K",
        likes: 342,
        tags: ["Gizi", "Makanan Sehat", "Suplemen", "Lansia"],
        content: `<p>Kesehatan lansia sangat dipengaruhi oleh asupan nutrisi yang tepat. Seiring bertambahnya usia, tubuh mengalami perubahan yang mempengaruhi kebutuhan gizi. Berikut panduan lengkap nutrisi untuk lansia.</p>
    <h2>Kebutuhan Gizi Harian Lansia</h2>
    <ul><li>Kalori: 1.800-2.000 kkal</li><li>Protein: 50-60 gram</li><li>Kalsium: 1.000-1.200 mg</li><li>Vitamin D: 800-1.000 IU</li><li>Air: 6-8 gelas/hari</li></ul>
    <p>Sumber protein terbaik: ikan, ayam tanpa kulit, telur, tahu, tempe. Perbanyak sayur hijau dan buah-buahan segar.</p>
    <div class="bg-emerald-50 p-6 rounded-xl my-6 border-l-4 border-emerald-500">
      <h3 class="font-bold text-emerald-800 mb-2 flex items-center gap-2"><Stethoscope className="w-5 h-5" /> Tips dari Dokter</h3>
      <p class="text-emerald-700">"Konsultasikan dengan dokter sebelum mengubah pola makan, terutama jika memiliki kondisi kesehatan tertentu." - dr. Sarah Wijaya, Sp.GK</p>
    </div>`
    },
    2: {
        id: 2,
        title: "Mengenal Hipertensi pada Lansia",
        excerpt: "Penyebab, gejala, dan cara mengelola tekanan darah tinggi di usia lanjut.",
        category: "penyakit",
        subCategory: "umum",
        image: "/images/edukasi/hipertensi.jpg",
        author: "dr. Ahmad Hasan, Sp.PD",
        authorDesc: "Spesialis Penyakit Dalam",
        date: "1 Maret 2026",
        readTime: "6 menit",
        views: "3.1K",
        likes: 456,
        tags: ["Hipertensi", "Tekanan Darah", "Jantung", "Lansia"],
        content: `<p>Hipertensi atau tekanan darah tinggi adalah kondisi umum pada lansia. Deteksi dini dan penanganan tepat sangat penting.</p>
    <h2>Pencegahan Hipertensi</h2>
    <ul><li>Kurangi konsumsi garam (<5 gram/hari)</li><li>Olahraga teratur 30 menit/hari</li><li>Jaga berat badan ideal</li><li>Kelola stres dengan baik</li><li>Rutin cek tekanan darah</li></ul>
    <div class="bg-red-50 p-6 rounded-xl my-6 border-l-4 border-red-500">
      <h3 class="font-bold text-red-800 mb-2 flex items-center gap-2"><AlertCircle className="w-5 h-5" /> Tanda Bahaya</h3>
      <p class="text-red-700">Segera ke dokter jika mengalami: sakit kepala hebat, sesak napas, penglihatan kabur, atau nyeri dada.</p>
    </div>`
    },
    3: {
        id: 3,
        title: "Panduan Minum Obat yang Aman",
        excerpt: "Cara tepat mengonsumsi obat-obatan untuk menghindari efek samping berbahaya.",
        category: "obat",
        subCategory: "umum",
        image: "/images/edukasi/obat.jpg",
        author: "apt. Maria Santoso, M.Farm",
        authorDesc: "Apoteker Klinis",
        date: "28 Februari 2026",
        readTime: "5 menit",
        views: "1.8K",
        likes: 234,
        tags: ["Obat", "Farmasi", "Keamanan", "Lansia"],
        content: `<p>Konsumsi obat yang tepat sangat penting untuk keselamatan pasien. Berikut panduan minum obat yang aman.</p>
    <h2>Tips Minum Obat Aman</h2>
    <ul><li>Minum obat tepat waktu sesuai resep</li><li>Jangan menghentikan obat tanpa konsultasi</li><li>Baca aturan pakai dengan teliti</li><li>Hindari menggandakan dosis</li><li>Konsultasi jika muncul efek samping</li></ul>`
    },
    4: {
        id: 4,
        title: "Olahraga Ringan untuk Lansia",
        excerpt: "Gerakan sederhana yang aman dilakukan untuk menjaga kebugaran tubuh.",
        category: "aktivitas",
        subCategory: "umum",
        image: "/images/edukasi/olahraga.jpg",
        author: "dr. Budi Santoso, Sp.KFR",
        authorDesc: "Spesialis Rehabilitasi Medik",
        date: "27 Februari 2026",
        readTime: "7 menit",
        views: "2.2K",
        likes: 389,
        tags: ["Olahraga", "Fisioterapi", "Kebugaran", "Lansia"],
        content: `<p>Aktivitas fisik teratur membantu lansia tetap bugar dan mandiri. Berikut rekomendasi olahraga ringan.</p>
    <h2>Jenis Olahraga yang Dianjurkan</h2>
    <ul><li>Jalan kaki 30 menit/hari</li><li>Senam lansia</li><li>Yoga atau tai chi</li><li>Latihan peregangan</li><li>Bersepeda statis</li></ul>`
    },
    5: {
        id: 5,
        title: "Mengatasi Depresi pada Lansia",
        excerpt: "Cara mengenali dan menangani gangguan mental yang sering dialami lansia.",
        category: "mental",
        subCategory: "umum",
        image: "/images/edukasi/depresi.jpg",
        author: "dr. Rina Putri, Sp.KJ",
        authorDesc: "Spesialis Kedokteran Jiwa",
        date: "26 Februari 2026",
        readTime: "9 menit",
        views: "1.9K",
        likes: 267,
        tags: ["Mental", "Depresi", "Konseling", "Lansia"],
        content: `<p>Depresi pada lansia sering tidak terdeteksi. Kenali gejalanya dan segera tangani.</p>
    <h2>Tanda Depresi pada Lansia</h2>
    <ul><li>Kehilangan minat pada aktivitas</li><li>Gangguan tidur</li><li>Perubahan nafsu makan</li><li>Mudah lelah</li><li>Pikiran negatif berlebihan</li></ul>`
    },
    6: {
        id: 6,
        title: "Diabetes Mellitus pada Lansia",
        excerpt: "Panduan lengkap mengelola diabetes agar tetap produktif dan sehat.",
        category: "penyakit",
        subCategory: "umum",
        image: "/images/edukasi/diabetes.jpg",
        author: "dr. Andi Firmansyah, Sp.PD",
        authorDesc: "Spesialis Penyakit Dalam",
        date: "25 Februari 2026",
        readTime: "10 menit",
        views: "2.8K",
        likes: 412,
        tags: ["Diabetes", "Gula Darah", "Metabolik", "Lansia"],
        content: `<p>Diabetes pada lansia dapat dikelola dengan baik. Berikut panduan lengkapnya.</p>
    <h2>Manajemen Diabetes</h2>
    <ul><li>Kontrol gula darah rutin</li><li>Pola makan teratur</li><li>Olahraga teratur</li><li>Minum obat tepat waktu</li><li>Cegah komplikasi dengan kontrol rutin</li></ul>`
    },
    7: {
        id: 7,
        title: "Suplemen untuk Kesehatan Lansia",
        excerpt: "Vitamin dan mineral penting untuk menjaga kesehatan di usia lanjut.",
        category: "nutrisi",
        subCategory: "umum",
        image: "/images/edukasi/suplemen.jpg",
        author: "apt. Dewi Lestari, M.Farm",
        authorDesc: "Apoteker Klinis",
        date: "24 Februari 2026",
        readTime: "6 menit",
        views: "1.5K",
        likes: 198,
        tags: ["Suplemen", "Vitamin", "Mineral", "Lansia"],
        content: `<p>Suplemen dapat membantu memenuhi kebutuhan gizi lansia. Konsultasikan dengan dokter sebelum mengonsumsinya.</p>
    <h2>Suplemen yang Sering Dibutuhkan</h2>
    <ul><li>Vitamin D dan kalsium untuk tulang</li><li>Vitamin B12 untuk energi</li><li>Omega-3 untuk jantung</li><li>Zinc untuk imunitas</li><li>Probiotik untuk pencernaan</li></ul>`
    },
    8: {
        id: 8,
        title: "Mencegah Osteoporosis pada Lansia",
        excerpt: "Langkah-langkah menjaga kepadatan tulang di usia lanjut.",
        category: "aktivitas",
        subCategory: "umum",
        image: "/images/edukasi/osteoporosis.jpg",
        author: "dr. Sari Indah, Sp.OT",
        authorDesc: "Spesialis Ortopedi",
        date: "23 Februari 2026",
        readTime: "7 menit",
        views: "2.0K",
        likes: 278,
        tags: ["Tulang", "Osteoporosis", "Kalsium", "Lansia"],
        content: `<p>Osteoporosis dapat dicegah dengan gaya hidup sehat. Berikut langkah-langkahnya.</p>
    <h2>Pencegahan Osteoporosis</h2>
    <ul><li>Konsumsi kalsium 1.200 mg/hari</li><li>Vitamin D dari sinar matahari pagi</li><li>Olahraga beban teratur</li><li>Hindari merokok dan alkohol</li><li>Cek kepadatan tulang rutin</li></ul>`
    },
    9: {
        id: 9,
        title: "Perawatan Lansia dengan Demensia",
        excerpt: "Panduan bagi keluarga dalam merawat lansia dengan gangguan daya ingat.",
        category: "mental",
        subCategory: "umum",
        image: "/images/edukasi/demensia.jpg",
        author: "dr. Maya Angelina, Sp.S",
        authorDesc: "Spesialis Saraf",
        date: "22 Februari 2026",
        readTime: "12 menit",
        views: "3.5K",
        likes: 523,
        tags: ["Demensia", "Alzheimer", "Perawatan", "Lansia"],
        content: `<p>Merawat lansia dengan demensia membutuhkan kesabaran dan pengetahuan. Berikut panduan untuk keluarga.</p>
    <h2>Tips Merawat Lansia dengan Demensia</h2>
    <ul><li>Ciptakan rutinitas harian</li><li>Bicara dengan lembut dan jelas</li><li>Lingkungan yang aman</li><li>Libatkan dalam aktivitas sederhana</li><li>Jangan membantah, alihkan perhatian</li></ul>`
    },
    10: {
        id: 10,
        title: "Panduan Perawatan Luka Pasca Operasi",
        excerpt: "Cara merawat luka operasi agar cepat kering dan mencegah infeksi.",
        category: "pasca-operasi",
        subCategory: "umum",
        image: "/images/edukasi/pasca-operasi/luka.jpg",
        author: "dr. Budi Santoso, Sp.B",
        authorDesc: "Spesialis Bedah Umum",
        date: "5 Maret 2026",
        readTime: "10 menit",
        views: "4.2K",
        likes: 567,
        tags: ["Luka", "Infeksi", "Perawatan", "Pasca Operasi"],
        content: `<p>Perawatan luka yang tepat sangat penting untuk mencegah infeksi. Berikut panduan lengkapnya.</p>
    <h2>Langkah Perawatan Luka</h2>
    <ul><li>Cuci tangan sebelum merawat luka</li><li>Bersihkan luka dengan NaCl</li><li>Keringkan dengan tepuk lembut</li><li>Tutup dengan kasa steril</li><li>Ganti balutan rutin</li></ul>
    <div class="bg-red-50 p-4 rounded-lg my-4"><p class="text-red-700"><strong>Tanda Infeksi:</strong> Kemerahan meluas, bengkak, nanah, demam >38°C</p></div>`
    },
    11: {
        id: 11,
        title: "Pemulihan Pasca Operasi Jantung",
        excerpt: "Langkah-langkah penting untuk pemulihan optimal setelah operasi jantung.",
        category: "pasca-operasi",
        subCategory: "jantung",
        image: "/images/edukasi/pasca-operasi/jantung.jpg",
        author: "dr. Ahmad Hasan, Sp.BTKV",
        authorDesc: "Spesialis Bedah Thorax & Kardiovaskular",
        date: "4 Maret 2026",
        readTime: "15 menit",
        views: "3.8K",
        likes: 489,
        tags: ["Jantung", "Kardiovaskular", "Rehabilitasi", "Pasca Operasi"],
        content: `<p>Pemulihan pasca operasi jantung membutuhkan perhatian khusus. Ikuti panduan ini untuk hasil optimal.</p>
    <h2>Fase Pemulihan</h2>
    <ul><li>Fase I (0-2 hari): Istirahat total, monitoring ketat</li><li>Fase II (2-7 hari): Mobilisasi bertahap, perawatan luka</li><li>Fase III (2-6 minggu): Jalan kaki bertahap, rehabilitasi jantung</li><li>Fase IV (>6 minggu): Kembali beraktivitas normal</li></ul>
    <div class="bg-green-50 p-4 rounded-lg my-4"><p class="text-green-700"><strong>Tips:</strong> Ikuti program rehabilitasi jantung untuk pemulihan optimal</p></div>`
    },
    14: {
        id: 14,
        title: "Perawatan Pasca Operasi Katarak",
        excerpt: "Panduan lengkap merawat mata setelah operasi katarak agar cepat sembuh.",
        category: "pasca-operasi",
        subCategory: "mata",
        image: "/images/edukasi/pasca-operasi/katarak.jpg",
        author: "dr. Rina Putri, Sp.M",
        authorDesc: "Spesialis Mata",
        date: "1 Maret 2026",
        readTime: "7 menit",
        views: "3.2K",
        likes: 412,
        tags: ["Mata", "Katarak", "Penglihatan", "Pasca Operasi"],
        content: `<p>Operasi katarak adalah prosedur yang aman. Perawatan pasca operasi yang tepat sangat penting.</p>
    <h2>Perawatan Pasca Operasi Katarak</h2>
    <ul><li>Jangan mengucek mata</li><li>Pakai pelindung mata saat tidur</li><li>Tetes mata sesuai jadwal</li><li>Jangan menunduk/membungkuk</li><li>Hindari membaca berlebihan</li></ul>
    <div class="bg-blue-50 p-4 rounded-lg my-4"><p class="text-blue-700"><strong>Tips:</strong> Gunakan kacamata hitam saat beraktivitas di luar ruangan selama 1 minggu.</p></div>`
    },
    16: {
        id: 16,
        title: "Pencegahan Infeksi Pasca Operasi",
        excerpt: "Langkah-langkah penting untuk mencegah infeksi pada luka operasi.",
        category: "pasca-operasi",
        subCategory: "umum",
        image: "/images/edukasi/pasca-operasi/infeksi.jpg",
        author: "dr. Andi Firmansyah, Sp.PD",
        authorDesc: "Spesialis Penyakit Dalam",
        date: "26 Februari 2026",
        readTime: "8 menit",
        views: "3.7K",
        likes: 498,
        tags: ["Infeksi", "Kebersihan", "Luka", "Pasca Operasi"],
        content: `<p>Infeksi pasca operasi dapat dicegah dengan langkah-langkah sederhana. Berikut panduannya.</p>
    <h2>Cegah Infeksi Pasca Operasi</h2>
    <ul><li>Jaga kebersihan luka</li><li>Cuci tangan sebelum menyentuh luka</li><li>Ganti balutan rutin</li><li>Konsumsi makanan bergizi</li><li>Minum antibiotik sesuai resep</li></ul>`
    },
    17: {
        id: 17,
        title: "Perawatan Pasca Operasi Gigi",
        excerpt: "Panduan merawat mulut setelah pencabutan atau operasi gigi.",
        category: "pasca-operasi",
        subCategory: "gigi",
        image: "/images/edukasi/pasca-operasi/gigi.jpg",
        author: "drg. Maria Santoso",
        authorDesc: "Dokter Gigi Spesialis Bedah Mulut",
        date: "24 Februari 2026",
        readTime: "5 menit",
        views: "2.3K",
        likes: 287,
        tags: ["Gigi", "Mulut", "Pencabutan", "Pasca Operasi"],
        content: `<p>Perawatan pasca operasi gigi yang tepat membantu penyembuhan lebih cepat.</p>
    <h2>Tips Perawatan Pasca Operasi Gigi</h2>
    <ul><li>Kompres dingin untuk mengurangi bengkak</li><li>Hindari makanan keras</li><li>Jangan berkumur 24 jam pertama</li><li>Minum obat sesuai resep</li><li>Istirahat cukup</li></ul>`
    }
};

// Category colors untuk styling
const categoryColors = {
    nutrisi: { bg: "bg-green-50", text: "text-green-700", border: "border-green-200", icon: <Apple className="w-4 h-4" /> },
    penyakit: { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200", icon: <AlertCircle className="w-4 h-4" /> },
    obat: { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200", icon: <Pill className="w-4 h-4" /> },
    aktivitas: { bg: "bg-teal-50", text: "text-teal-700", border: "border-teal-200", icon: <Activity className="w-4 h-4" /> },
    mental: { bg: "bg-pink-50", text: "text-pink-700", border: "border-pink-200", icon: <Brain className="w-4 h-4" /> },
    "pasca-operasi": { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", icon: <Bandage className="w-4 h-4" /> }
};

export default function ArtikelDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [article, setArticle] = useState(null);
    const [liked, setLiked] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);
    const [showShare, setShowShare] = useState(false);
    const [relatedArticles, setRelatedArticles] = useState([]);
    const [likesCount, setLikesCount] = useState(0);

    useEffect(() => {
        const id = parseInt(params.id);
        const foundArticle = articlesData[id];

        if (foundArticle) {
            setArticle(foundArticle);
            setLikesCount(foundArticle.likes);

            // Cari artikel terkait (kategori sama, id berbeda)
            const related = Object.values(articlesData)
                .filter(a => a.id !== id && a.category === foundArticle.category)
                .slice(0, 3);
            setRelatedArticles(related);
        } else {
            // Jika artikel tidak ditemukan, redirect ke halaman edukasi
            router.push("/edukasi");
        }
    }, [params.id, router]);

    const handleLike = () => {
        if (liked) {
            setLikesCount(likesCount - 1);
        } else {
            setLikesCount(likesCount + 1);
        }
        setLiked(!liked);
    };

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        setShowShare(true);
        setTimeout(() => setShowShare(false), 2000);
    };

    if (!article) {
        return (
            <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
                <Navbar />
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-[#233E2E] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-slate-500">Memuat artikel...</p>
                    </div>
                </div>
                <FloatingChat />
            </main>
        );
    }

    const categoryStyle = categoryColors[article.category] || {
        bg: "bg-emerald-50",
        text: "text-emerald-700",
        border: "border-emerald-200",
        icon: <Heart className="w-4 h-4" />
    };

    const categoryName = {
        nutrisi: "Nutrisi & Gizi",
        penyakit: "Penyakit Umum",
        obat: "Penggunaan Obat",
        aktivitas: "Aktivitas Fisik",
        mental: "Kesehatan Mental",
        "pasca-operasi": "Pasca Operasi"
    }[article.category] || "Kesehatan";

    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
            <Navbar />

            {/* Back Button */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
                <Link
                    href="/edukasi"
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-[#233E2E] transition-colors group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span>Kembali ke Edukasi</span>
                </Link>
            </div>

            {/* Article Header */}
            <div className="relative h-[400px] sm:h-[450px] lg:h-[500px] overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${article.image})` }}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center gap-2 mb-4 flex-wrap">
                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${categoryStyle.bg} ${categoryStyle.text}`}>
                                {categoryStyle.icon}
                                {categoryName}
                            </span>
                            {article.subCategory !== "umum" && (
                                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur">
                                    {article.subCategory === "jantung" && <HeartPulse className="w-3 h-3" />}
                                    {article.subCategory === "ortopedi" && <Bone className="w-3 h-3" />}
                                    {article.subCategory === "mata" && <EyeIcon className="w-3 h-3" />}
                                    {article.subCategory === "gigi" && <Smile className="w-3 h-3" />}
                                    Operasi {article.subCategory.charAt(0).toUpperCase() + article.subCategory.slice(1)}
                                </span>
                            )}
                        </div>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 drop-shadow-lg">
                            {article.title}
                        </h1>
                        <p className="text-lg text-white/90 mb-6 max-w-2xl">
                            {article.excerpt}
                        </p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-white/80">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                                    {article.author.charAt(0)}
                                </div>
                                <div>
                                    <span className="font-medium">{article.author.split(',')[0]}</span>
                                    <p className="text-xs text-white/60">{article.authorDesc || "Tenaga Medis Profesional"}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>{article.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>{article.readTime}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Eye className="w-4 h-4" />
                                <span>{article.views} dibaca</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Article Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        <div
                            className="prose prose-slate max-w-none prose-headings:text-slate-800 prose-p:text-slate-600 prose-strong:text-slate-800 prose-li:text-slate-600 prose-a:text-[#233E2E] prose-img:rounded-xl"
                            dangerouslySetInnerHTML={{ __html: article.content }}
                        />

                        {/* Tags */}
                        <div className="mt-8 pt-6 border-t border-slate-100">
                            <div className="flex items-center gap-2 mb-4">
                                <TrendingUp className="w-4 h-4 text-slate-400" />
                                <span className="text-sm font-medium text-slate-600">Topik terkait:</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {article.tags.map((tag, i) => (
                                    <Link
                                        key={i}
                                        href={`/edukasi/tag/${tag.toLowerCase()}`}
                                        className="px-3 py-1.5 bg-slate-100 hover:bg-[#233E2E]/10 text-slate-600 hover:text-[#233E2E] rounded-full text-xs transition-colors"
                                    >
                                        #{tag.toLowerCase().replace(/ /g, '')}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-6">
                            {/* Action Buttons */}
                            <div className="bg-white rounded-2xl p-4 shadow-lg border border-slate-100">
                                <div className="flex items-center justify-between">
                                    <button
                                        onClick={handleLike}
                                        className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all ${liked ? "bg-red-50 text-red-500" : "hover:bg-slate-50 text-slate-500"
                                            }`}
                                    >
                                        <ThumbsUp className={`w-6 h-6 ${liked ? "fill-red-500" : ""}`} />
                                        <span className="text-xs font-medium">{likesCount}</span>
                                    </button>

                                    <button
                                        onClick={handleShare}
                                        className="flex flex-col items-center gap-1 p-3 rounded-xl hover:bg-slate-50 text-slate-500 transition-all"
                                    >
                                        <Share2 className="w-6 h-6" />
                                        <span className="text-xs font-medium">Bagikan</span>
                                    </button>

                                    <button
                                        onClick={() => setBookmarked(!bookmarked)}
                                        className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all ${bookmarked ? "bg-amber-50 text-amber-500" : "hover:bg-slate-50 text-slate-500"
                                            }`}
                                    >
                                        <Bookmark className={`w-6 h-6 ${bookmarked ? "fill-amber-500" : ""}`} />
                                        <span className="text-xs font-medium">Simpan</span>
                                    </button>

                                    <button
                                        onClick={() => window.print()}
                                        className="flex flex-col items-center gap-1 p-3 rounded-xl hover:bg-slate-50 text-slate-500 transition-all"
                                    >
                                        <Printer className="w-6 h-6" />
                                        <span className="text-xs font-medium">Cetak</span>
                                    </button>
                                </div>
                            </div>

                            {/* Author Info */}
                            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#233E2E] to-[#3E624C] flex items-center justify-center text-white font-bold text-lg">
                                        {article.author.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-800">{article.author.split(',')[0]}</p>
                                        <p className="text-xs text-slate-500">{article.authorDesc || "Tenaga Medis Profesional"}</p>
                                    </div>
                                </div>
                                <p className="text-sm text-slate-600 mb-3">
                                    Dokter spesialis dengan pengalaman lebih dari 10 tahun di bidangnya.
                                </p>
                                <Link href="/dokter">
                                    <button className="w-full text-[#233E2E] text-sm font-medium hover:text-[#3E624C] flex items-center justify-center gap-1">
                                        Lihat Profil
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </Link>
                            </div>

                            {/* Share Success Message */}
                            <AnimatePresence>
                                {showShare && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="bg-green-50 border border-green-200 rounded-xl p-3 text-center"
                                    >
                                        <CheckCircle className="w-5 h-5 text-green-600 mx-auto mb-1" />
                                        <p className="text-xs text-green-700">Link artikel berhasil disalin!</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* Related Articles */}
                {relatedArticles.length > 0 && (
                    <div className="mt-12 pt-8 border-t border-slate-100">
                        <h3 className="text-xl font-bold text-slate-800 mb-6">Artikel Terkait</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {relatedArticles.map((related) => {
                                const relatedStyle = categoryColors[related.category] || categoryColors["pasca-operasi"];
                                return (
                                    <Link href={`/edukasi/artikel/${related.id}`} key={related.id}>
                                        <div className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 border border-slate-100">
                                            <div className="relative h-40 overflow-hidden">
                                                <div
                                                    className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                                                    style={{ backgroundImage: `url(${related.image})` }}
                                                >
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                                </div>
                                                <div className="absolute bottom-3 left-3 text-white">
                                                    <span className={`text-xs px-2 py-1 rounded-full ${relatedStyle.bg} ${relatedStyle.text}`}>
                                                        {related.category === "pasca-operasi" ? "Pasca Operasi" : related.category}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="p-4">
                                                <h4 className="font-bold text-slate-800 mb-1 group-hover:text-[#233E2E] transition-colors line-clamp-2">
                                                    {related.title}
                                                </h4>
                                                <div className="flex items-center gap-2 text-xs text-slate-400">
                                                    <span>{related.readTime}</span>
                                                    <span>•</span>
                                                    <span>{related.views} dibaca</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

            <FloatingChat />
        </main>
    );
}