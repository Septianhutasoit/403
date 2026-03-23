"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import FloatingChat from "@/components/FloatingChat";
import {
    Heart, Shield, Activity, Users, BookOpen, Clock, Brain,
    Phone, Video, Calendar, Award, ChevronRight, MessageCircle,
    Bell, TrendingUp, Thermometer, Droplets, Sparkles, ArrowRight,
    Star, CheckCircle, Zap, Coffee, Smile, HeartPulse,
    Bone, Wind, Apple, Pill, AlertCircle, Stethoscope, Syringe,
    Weight, Bandage, Hospital, Ambulance, FlaskConical, Ear,
    Eye, Lungs, Microscope, Salad, Wheat, Footprints, HeartHandshake,
    Scissors, UserRound, GraduationCap, MapPin, Building,
    CreditCard, FileText, Download, Play, CircleCheck,
    ChevronLeft, ChevronUp, Mail, Phone as PhoneIcon,
    Search, ArrowRightCircle, CheckCircle2, CircleDot, Loader2
} from "lucide-react";

export default function LayananPage() {
    const [activeTab, setActiveTab] = useState("semua");
    const [selectedService, setSelectedService] = useState(null);
    const [isVisible, setIsVisible] = useState({});
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const sectionRefs = useRef([]);

    // Scroll to top button visibility
    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 500);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Intersection Observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const index = entry.target.getAttribute('data-index');
                    if (index) {
                        setIsVisible(prev => ({
                            ...prev,
                            [index]: entry.isIntersecting
                        }));
                    }
                });
            },
            { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
        );

        sectionRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, []);

    const fadeInUpClass = (index) =>
        `transition-all duration-1000 transform ${isVisible[index] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`;

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Auto-slide untuk steps
    useEffect(() => {
        const timer = setInterval(() => {
            setActiveStep((prev) => (prev + 1) % 5);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    // Kategori layanan
    const categories = [
        { id: "semua", name: "Semua Layanan", icon: <Sparkles className="w-4 h-4" />, count: 8 },
        { id: "konsultasi", name: "Konsultasi", icon: <Video className="w-4 h-4" />, count: 2 },
        { id: "perawat", name: "Perawat Homecare", icon: <UserRound className="w-4 h-4" />, count: 2 },
        { id: "edukasi", name: "Edukasi", icon: <BookOpen className="w-4 h-4" />, count: 2 },
        { id: "pasca-operasi", name: "Pasca Operasi", icon: <Bandage className="w-4 h-4" />, count: 2 },
    ];

    // Data layanan lengkap dengan penjelasan lebih detail
    const services = [
        // KONSULTASI
        {
            id: 9,
            title: "Perawatan Pasca Operasi Mata (Katarak)",
            description: "Panduan lengkap perawatan mata setelah operasi katarak untuk pemulihan optimal.",
            icon: <Eye className="w-8 h-8" />,
            image: "/images/layanan/mata.jpg",
            color: "from-[#233E2E] to-[#3E624C]",
            bgColor: "bg-[#233E2E]/10",
            category: "pasca-operasi",
            features: [
                "Panduan tetes mata sesuai jadwal",
                "Tips menghindari infeksi",
                "Aturan aktivitas pasca operasi",
                "Jadwal kontrol rutin",
                "Panduan penggunaan pelindung mata"
            ],
            stats: { pasien: "500+", sukses: "98%", pemulihan: "1-2 minggu" },
            price: "Rp 250K - 500K/paket",
            duration: "2-4 minggu",
            benefits: [
                "Pemulihan penglihatan optimal",
                "Cegah komplikasi infeksi",
                "Kembali beraktivitas cepat",
                "Hasil operasi maksimal"
            ],
            suitable: "Pasien pasca operasi katarak, glaukoma, atau operasi refraktif mata"
        },
        {
            id: 2,
            title: "Konsultasi Chat dengan Dokter",
            description: "Tanya jawab dengan dokter melalui chat kapan saja. Cocok untuk pertanyaan ringan.",
            icon: <MessageCircle className="w-8 h-8" />,
            image: "/images/informasi/demensia.jpg",
            color: "from-[#3E624C] to-[#434C47]",
            bgColor: "bg-[#3E624C]/10",
            category: "konsultasi",
            features: [
                "Respon cepat 15 menit",
                "Dokter umum & spesialis",
                "Bisa kirim foto/berkas",
                "Riwayat chat tersimpan"
            ],
            stats: { chat: "5K+/hari", kepuasan: "98%" },
            price: "Rp 50K - 200K",
            duration: "24 jam",
            benefits: [
                "Lebih ekonomis",
                "Bisa tanya kapan saja",
                "Dokumen bisa dilampirkan",
                "Riwayat chat tersimpan"
            ],
            suitable: "Pertanyaan ringan, konsultasi cepat, atau second opinion"
        },

        // PERAWAT HOMECARE
        {
            id: 3,
            title: "Perawat Lansia di Rumah",
            description: "Perawat profesional yang siap merawat lansia di rumah dengan penuh kasih sayang.",
            icon: <HeartHandshake className="w-8 h-8" />,
            image: "/images/layanan/nyeri.jpg",
            color: "from-[#434C47] to-[#233E2E]",
            bgColor: "bg-[#434C47]/10",
            category: "perawat",
            features: [
                "Perawat berpengalaman",
                "Monitor kesehatan harian",
                "Bantuan aktivitas sehari-hari",
                "Laporan perkembangan"
            ],
            stats: { perawat: "30+", pasien: "500+", pengalaman: "5-10 tahun" },
            price: "Rp 175K - 250K/hari",
            duration: "8-24 jam",
            benefits: [
                "Lansia tetap di rumah",
                "Perawat terlatih",
                "Laporan harian",
                "Bisa pilih jadwal"
            ],
            suitable: "Lansia yang membutuhkan pendampingan, bantuan aktivitas sehari-hari, atau monitoring kesehatan"
        },
        {
            id: 4,
            title: "Perawat Pasca Operasi",
            description: "Perawatan intensif di rumah untuk pasien yang baru menjalani operasi.",
            icon: <Bandage className="w-8 h-8" />,
            image: "/images/layanan/luka-operasi.jpg",
            color: "from-[#3C6243] to-[#DBAA28]",
            bgColor: "bg-[#3C6243]/10",
            category: "perawat",
            features: [
                "Perawatan luka operasi",
                "Monitor tanda vital",
                "Bantuan mobilisasi",
                "Manajemen obat"
            ],
            stats: { pasien: "300+", spesialis: "15+", sukses: "99%" },
            price: "Rp 200K - 300K/hari",
            duration: "8-24 jam",
            benefits: [
                "Pemulihan lebih cepat",
                "Cegah infeksi",
                "Bantuan profesional",
                "Koordinasi dengan dokter"
            ],
            suitable: "Pasien baru pulang operasi, perawatan luka, atau rehabilitasi awal"
        },

        {
            id: 5,
            title: "Manajemen Nyeri Pasca Operasi",
            description: "Cara mengatasi rasa sakit pasca operasi dengan aman dan efektif tanpa ketergantungan obat.",
            icon: <AlertCircle className="w-8 h-8" />,
            image: "/images/informasi/osteoporosis.jpg",
            color: "from-[#434C47] to-[#233E2E]",
            bgColor: "bg-[#434C47]/10",
            category: "pasca-operasi",
            features: [
                "Teknik non-farmakologi (kompres, relaksasi)",
                "Panduan penggunaan obat aman",
                "Skala nyeri dan kapan harus konsultasi",
                "Terapi fisik untuk mengurangi nyeri",
                "Posisi tidur nyaman pasca operasi"
            ],
            stats: { pasien: "600+", efektif: "92%", metode: "10+" },
            price: "Rp 100K - 250K/konsultasi",
            duration: "Sesuai kebutuhan",
            benefits: [
                "Nyeri terkontrol optimal",
                "Mobilitas lebih cepat",
                "Kualitas tidur meningkat",
                "Pemulihan lebih nyaman"
            ],
            suitable: "Pasien dengan nyeri sedang-berat pasca operasi"
        },
        {
            id: 6,
            title: "Nutrisi Pemulihan Pasca Operasi",
            description: "Panduan makanan bergizi untuk mempercepat penyembuhan luka dan mengembalikan energi.",
            icon: <Apple className="w-8 h-8" />,
            image: "/images/layanan/nutrisi.jpg",
            color: "from-[#3C6243] to-[#DBAA28]",
            bgColor: "bg-[#3C6243]/10",
            category: "pasca-operasi",
            features: [
                "Menu khusus pasca operasi",
                "Suplemen yang dibutuhkan",
                "Aturan makan bertahap",
                "Pantangan makanan",
                "Resep sehat untuk pemulihan"
            ],
            stats: { pasien: "400+", rekomendasi: "50+", resep: "30+" },
            price: "Rp 150K - 350K/konsultasi",
            duration: "1-3 bulan",
            benefits: [
                "Penyembuhan luka lebih cepat",
                "Kembali berat badan ideal",
                "Energi pulih optimal",
                "Cegah malnutrisi"
            ],
            suitable: "Pasien pasca operasi dengan kebutuhan nutrisi khusus"
        },
        // PASCA OPERASI
        {
            id: 7,
            title: "Program Pemulihan Jantung",
            description: "Program rehabilitasi jantung yang aman dan efektif untuk pasien pasca operasi jantung.",
            icon: <HeartPulse className="w-8 h-8" />,
            image: "/images/layanan/jantung.jpg",
            color: "from-[#434C47] to-[#233E2E]",
            bgColor: "bg-[#434C47]/10",
            category: "pasca-operasi",
            features: [
                "Latihan terstruktur",
                "Monitoring dokter",
                "Konsultasi gizi",
                "Dukungan psikologis"
            ],
            stats: { pasien: "250+", sukses: "95%", durasi: "3-6 bulan" },
            price: "Rp 500K - 1Jt/bulan",
            duration: "3-6 bulan",
            benefits: [
                "Pemulihan optimal",
                "Cegah komplikasi",
                "Pendampingan ahli",
                "Evaluasi berkala"
            ],
            suitable: "Pasien pasca operasi jantung, bypass, atau pemasangan ring"
        },
        {
            id: 8,
            title: "Rehabilitasi Ortopedi",
            description: "Latihan fisioterapi untuk memulihkan mobilitas setelah operasi tulang dan sendi.",
            icon: <Bone className="w-8 h-8" />,
            image: "/images/layanan/tulang.jpg",
            color: "from-[#3C6243] to-[#DBAA28]",
            bgColor: "bg-[#3C6243]/10",
            category: "pasca-operasi",
            features: [
                "Fisioterapis profesional",
                "Latihan di rumah",
                "Alat bantu rehabilitasi",
                "Evaluasi berkala"
            ],
            stats: { pasien: "300+", pemulihan: "90%", sesi: "12-24x" },
            price: "Rp 350K - 600K/sesi",
            duration: "2-4 bulan",
            benefits: [
                "Kembali beraktivitas",
                "Kurangi nyeri",
                "Latihan terarah",
                "Cegah kekakuan"
            ],
            suitable: "Pasien pasca operasi tulang, sendi, atau cedera ortopedi"
        }
    ];

    const filteredServices = activeTab === "semua"
        ? services
        : services.filter(s => s.category === activeTab);

    // Data alur pendaftaran dengan desain lebih baik
    const registrationSteps = [
        {
            id: 1,
            title: "Pilih Layanan",
            description: "Pilih layanan yang sesuai dengan kebutuhan Anda",
            icon: <Search className="w-6 h-6" />,
            color: "from-[#233E2E] to-[#3E624C]",
            details: "Konsultasi, perawat homecare, edukasi, atau pasca operasi"
        },
        {
            id: 2,
            title: "Isi Formulir",
            description: "Lengkapi data diri dan informasi kesehatan",
            icon: <FileText className="w-6 h-6" />,
            color: "from-[#3E624C] to-[#434C47]",
            details: "Data pasien, riwayat kesehatan, dan kebutuhan khusus"
        },
        {
            id: 3,
            title: "Pilih Jadwal",
            description: "Tentukan jadwal konsultasi atau kunjungan",
            icon: <Calendar className="w-6 h-6" />,
            color: "from-[#434C47] to-[#233E2E]",
            details: "Pilih tanggal dan jam yang sesuai dengan kesibukan Anda"
        },
        {
            id: 4,
            title: "Pembayaran",
            description: "Lakukan pembayaran dengan berbagai metode",
            icon: <CreditCard className="w-6 h-6" />,
            color: "from-[#3C6243] to-[#DBAA28]",
            details: "Transfer bank, kartu kredit, e-wallet, atau virtual account"
        },
        {
            id: 5,
            title: "Mulai Layanan",
            description: "Nikmati layanan kesehatan profesional",
            icon: <CheckCircle className="w-6 h-6" />,
            color: "from-[#233E2E] to-[#3E624C]",
            details: "Konsultasi video, kunjungan perawat, atau akses materi edukasi"
        }
    ];

    // Data tahapan pembelajaran
    const learningSteps = [
        {
            id: 1,
            title: "Dasar-dasar Perawatan Lansia",
            description: "Pelajari fundamental merawat lansia dengan benar",
            icon: <Heart className="w-8 h-8" />,
            topics: ["Komunikasi dengan lansia", "Kebutuhan dasar", "Pencegahan jatuh"],
            duration: "4 jam",
            level: "Pemula",
            module: "6 modul",
            certificate: "Ya"
        },
        {
            id: 2,
            title: "Perawatan Pasca Operasi",
            description: "Teknik merawat pasien yang baru operasi",
            icon: <Bandage className="w-8 h-8" />,
            topics: ["Perawatan luka", "Manajemen nyeri", "Mobilisasi dini"],
            duration: "6 jam",
            level: "Menengah",
            module: "8 modul",
            certificate: "Ya"
        },
        {
            id: 3,
            title: "Nutrisi untuk Lansia",
            description: "Panduan gizi seimbang untuk kesehatan optimal",
            icon: <Apple className="w-8 h-8" />,
            topics: ["Kebutuhan gizi", "Menu sehat", "Suplemen"],
            duration: "3 jam",
            level: "Pemula",
            module: "5 modul",
            certificate: "Ya"
        },
        {
            id: 4,
            title: "Manajemen Penyakit Kronis",
            description: "Penanganan diabetes, hipertensi, dan lainnya",
            icon: <Activity className="w-8 h-8" />,
            topics: ["Monitoring gula darah", "Kontrol tekanan darah", "Manajemen obat"],
            duration: "8 jam",
            level: "Lanjutan",
            module: "10 modul",
            certificate: "Ya"
        }
    ];

    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
            <Navbar />

            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-[#233E2E] to-[#3E624C] text-white py-20 px-4 sm:px-6 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 -left-40 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 -right-40 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute inset-0 opacity-10" style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                        backgroundSize: '40px 40px'
                    }}></div>
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                            <Sparkles className="w-4 h-4" />
                            LAYANAN KESEHATAN LENGKAP
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                            Solusi Kesehatan untuk{' '}
                            <span className="text-[#DBAA28]">Lansia dan Keluarga</span>
                        </h1>
                        <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-3xl mx-auto">
                            Dari konsultasi dokter hingga perawatan homecare, semua kebutuhan kesehatan lansia tersedia dalam satu platform
                        </p>

                        {/* Search Bar */}
                        <div className="max-w-2xl mx-auto relative mb-12">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Cari layanan yang Anda butuhkan..."
                                className="w-full pl-12 pr-4 py-4 rounded-full bg-white/95 backdrop-blur border border-white/50 focus:border-[#DBAA28] focus:ring-2 focus:ring-[#DBAA28]/20 outline-none transition-all shadow-lg text-slate-900"
                            />
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white">50+</div>
                                <div className="text-sm text-white/70">Dokter Spesialis</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white">30+</div>
                                <div className="text-sm text-white/70">Perawat Profesional</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white">20+</div>
                                <div className="text-sm text-white/70">Kelas Online</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white">10K+</div>
                                <div className="text-sm text-white/70">Pasien Puas</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Category Tabs dengan Count */}
            <section className="py-8 px-4 sm:px-6 -mt-8 relative z-30">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-white/80 backdrop-blur-xl rounded-2xl p-2 shadow-xl border border-slate-200 inline-flex flex-wrap mx-auto"
                    >
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setActiveTab(category.id)}
                                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 text-xs sm:text-sm ${activeTab === category.id
                                    ? "bg-gradient-to-r from-[#233E2E] to-[#3E624C] text-white shadow-lg scale-105"
                                    : "text-slate-600 hover:bg-[#233E2E]/10"
                                    }`}
                            >
                                <span className="text-lg">{category.icon}</span>
                                <span>{category.name}</span>
                                <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeTab === category.id
                                    ? "bg-white/20 text-white"
                                    : "bg-slate-200 text-slate-600"
                                    }`}>
                                    {category.count}
                                </span>
                            </button>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Services Grid dengan Penjelasan Lebih Detail */}
            <section ref={el => sectionRefs.current[0] = el} data-index="0" className="py-12 px-4 sm:px-6">
                <div className={`max-w-7xl mx-auto ${fadeInUpClass(0)}`}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredServices.map((service, index) => (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ y: -5 }}
                                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer border border-slate-100"
                                onClick={() => setSelectedService(service)}
                            >
                                <div className="relative h-48 overflow-hidden">
                                    <div
                                        className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                                        style={{ backgroundImage: `url(${service.image})` }}
                                    >
                                        <div className={`absolute inset-0 bg-gradient-to-t ${service.color} opacity-70`}></div>
                                    </div>
                                    <div className={`absolute top-4 left-4 bg-gradient-to-br ${service.color} p-3 rounded-xl shadow-lg z-10`}>
                                        <div className="text-white">
                                            {service.icon}
                                        </div>
                                    </div>
                                    <div className="absolute bottom-4 left-4 right-4 text-white">
                                        <h3 className="text-xl font-bold mb-1 drop-shadow-lg">{service.title}</h3>
                                        <p className="text-sm text-white/90 line-clamp-2">{service.description}</p>
                                    </div>
                                </div>
                                <div className="p-5">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="text-xs font-medium px-2 py-1 bg-[#233E2E]/10 text-[#233E2E] rounded-full">
                                            {categories.find(c => c.id === service.category)?.name}
                                        </span>
                                        <span className="text-xs text-slate-500">{service.duration}</span>
                                    </div>

                                    {/* Features */}
                                    <div className="space-y-2 mb-4">
                                        {service.features.slice(0, 2).map((feature, i) => (
                                            <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                                                <CheckCircle className="w-3 h-3 text-[#233E2E] mt-0.5 flex-shrink-0" />
                                                <span>{feature}</span>
                                            </div>
                                        ))}
                                        {service.features.length > 2 && (
                                            <div className="text-xs text-slate-400">
                                                +{service.features.length - 2} fitur lainnya
                                            </div>
                                        )}
                                    </div>

                                    {/* Price */}
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-sm font-bold text-[#233E2E]">{service.price}</span>
                                        <span className="text-xs text-slate-500">{service.duration}</span>
                                    </div>

                                    {/* Stats */}
                                    <div className="flex items-center gap-3 mb-3 text-xs text-slate-500">
                                        {Object.entries(service.stats).map(([key, value], i) => (
                                            <div key={i} className="flex items-center gap-1">
                                                <span className="font-semibold text-slate-700">{value}</span>
                                                <span className="text-slate-400">{key}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex items-center text-[#233E2E] font-medium group-hover:gap-2 transition-all">
                                        <span>Lihat Detail</span>
                                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Alur Pendaftaran dengan Desain Panah Modern */}
            <section ref={el => sectionRefs.current[1] = el} data-index="1" className="py-20 px-4 sm:px-6 bg-white">
                <div className={`max-w-7xl mx-auto ${fadeInUpClass(1)}`}>
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 bg-[#233E2E]/10 text-[#233E2E] px-4 py-2 rounded-full text-sm font-semibold mb-4"
                        >
                            <Sparkles className="w-4 h-4" />
                            CARA MUDAH MENGGUNAKAN LAYANAN
                        </motion.div>
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                            Alur Pendaftaran{' '}
                            <span className="bg-gradient-to-r from-[#233E2E] to-[#3E624C] bg-clip-text text-transparent">
                                Sederhana & Cepat
                            </span>
                        </h2>
                        <p className="text-slate-500 text-lg">
                            Hanya 5 langkah mudah untuk mulai menikmati layanan kesehatan profesional
                        </p>
                    </div>

                    {/* Flow Steps dengan Panah */}
                    <div className="relative">
                        {/* Desktop Flow dengan Panah */}
                        <div className="hidden lg:flex items-center justify-between">
                            {registrationSteps.map((step, index) => (
                                <div key={step.id} className="relative flex-1">
                                    <div className="flex flex-col items-center">
                                        {/* Step Number dengan Animasi */}
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: index * 0.1 }}
                                            className={`relative z-10 w-16 h-16 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white font-bold text-xl shadow-lg mb-4 ${activeStep === index ? 'ring-4 ring-[#DBAA28] ring-offset-4' : ''}`}
                                        >
                                            {step.id}
                                            {activeStep === index && (
                                                <motion.div
                                                    className="absolute inset-0 rounded-full border-4 border-[#DBAA28]"
                                                    initial={{ scale: 0.8, opacity: 0 }}
                                                    animate={{ scale: 1.2, opacity: 0 }}
                                                    transition={{ duration: 1.5, repeat: Infinity }}
                                                />
                                            )}
                                        </motion.div>

                                        {/* Title */}
                                        <h3 className="text-lg font-bold text-center mb-2">{step.title}</h3>

                                        {/* Description */}
                                        <p className="text-sm text-slate-500 text-center max-w-[200px] mb-2">
                                            {step.description}
                                        </p>

                                        {/* Details */}
                                        <p className="text-xs text-slate-400 text-center max-w-[200px]">
                                            {step.details}
                                        </p>
                                    </div>

                                    {/* Panah (kecuali untuk step terakhir) */}
                                    {index < registrationSteps.length - 1 && (
                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 + 0.3 }}
                                            className="absolute top-8 -right-4 z-20"
                                        >
                                            <ArrowRightCircle className="w-8 h-8 text-[#233E2E] fill-[#233E2E]/10" />
                                        </motion.div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Mobile Flow (Grid) */}
                        <div className="lg:hidden grid grid-cols-1 gap-6">
                            {registrationSteps.map((step, index) => (
                                <motion.div
                                    key={step.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-start gap-4"
                                >
                                    <div className={`relative flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white font-bold`}>
                                        {step.id}
                                        {activeStep === index && (
                                            <motion.div
                                                className="absolute inset-0 rounded-full border-2 border-[#DBAA28]"
                                                initial={{ scale: 0.8, opacity: 0 }}
                                                animate={{ scale: 1.2, opacity: 0 }}
                                                transition={{ duration: 1.5, repeat: Infinity }}
                                            />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold mb-1">{step.title}</h3>
                                        <p className="text-sm text-slate-500 mb-1">{step.description}</p>
                                        <p className="text-xs text-slate-400">{step.details}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Progress Line (Desktop) */}
                        <div className="hidden lg:block absolute top-8 left-0 w-full h-0.5 bg-slate-200 -z-10">
                            <motion.div
                                className="h-full bg-gradient-to-r from-[#233E2E] to-[#3E624C]"
                                initial={{ width: "0%" }}
                                animate={{ width: `${(activeStep + 1) * 20}%` }}
                                transition={{ duration: 0.5 }}
                            />
                        </div>
                    </div>

                    {/* CTA Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="text-center mt-16"
                    >
                        <Link href="/daftar">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-gradient-to-r from-[#233E2E] to-[#3E624C] text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-500 inline-flex items-center gap-2 group"
                            >
                                <span>Daftar Sekarang</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Tahapan Pembelajaran dengan Desain Modern */}
            <section ref={el => sectionRefs.current[2] = el} data-index="2" className="py-20 px-4 sm:px-6 bg-gradient-to-b from-slate-50 to-white">
                <div className={`max-w-7xl mx-auto ${fadeInUpClass(2)}`}>
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 bg-[#233E2E]/10 text-[#233E2E] px-4 py-2 rounded-full text-sm font-semibold mb-4"
                        >
                            <GraduationCap className="w-4 h-4" />
                            PROGRAM PEMBELAJARAN
                        </motion.div>
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                            Tingkatkan Pengetahuan{' '}
                            <span className="bg-gradient-to-r from-[#233E2E] to-[#3E624C] bg-clip-text text-transparent">
                                Perawatan Lansia
                            </span>
                        </h2>
                        <p className="text-slate-500 text-lg">
                            Ikuti kelas online kami dan menjadi caregiver profesional
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {learningSteps.map((step, index) => (
                            <motion.div
                                key={step.id}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-100"
                            >
                                <div className="flex flex-col md:flex-row">
                                    {/* Left Side - Icon & Level */}
                                    <div className={`md:w-1/3 p-6 bg-gradient-to-br from-[#233E2E] to-[#3E624C] text-white flex flex-col items-center justify-center`}>
                                        <motion.div
                                            whileHover={{ rotate: 360, scale: 1.1 }}
                                            transition={{ duration: 0.5 }}
                                            className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mb-3"
                                        >
                                            {step.icon}
                                        </motion.div>
                                        <span className="text-sm font-semibold bg-white/20 px-3 py-1 rounded-full mb-2">
                                            {step.level}
                                        </span>
                                        <div className="flex items-center gap-2 text-xs">
                                            <Clock className="w-3 h-3" />
                                            <span>{step.duration}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs mt-1">
                                            <BookOpen className="w-3 h-3" />
                                            <span>{step.module}</span>
                                        </div>
                                    </div>

                                    {/* Right Side - Content */}
                                    <div className="md:w-2/3 p-6">
                                        <h3 className="text-xl font-bold mb-2 group-hover:text-[#233E2E] transition-colors">
                                            {step.title}
                                        </h3>
                                        <p className="text-sm text-slate-500 mb-4">{step.description}</p>

                                        {/* Topics */}
                                        <div className="space-y-2 mb-4">
                                            {step.topics.map((topic, i) => (
                                                <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
                                                    <CheckCircle className="w-4 h-4 text-[#233E2E]" />
                                                    <span>{topic}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Certificate Badge */}
                                        {step.certificate === "Ya" && (
                                            <div className="flex items-center gap-1 mb-3">
                                                <Award className="w-4 h-4 text-[#DBAA28]" />
                                                <span className="text-xs text-[#DBAA28] font-semibold">Sertifikat Resmi</span>
                                            </div>
                                        )}

                                        {/* Action */}
                                        <Link href={`/edukasi/kelas/${step.id}`}>
                                            <motion.button
                                                whileHover={{ x: 5 }}
                                                className="text-[#233E2E] font-medium flex items-center gap-1 group-hover:gap-2 transition-all"
                                            >
                                                Lihat Detail Kelas
                                                <ChevronRight className="w-4 h-4" />
                                            </motion.button>
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="text-center mt-10">
                        <Link href="/edukasi">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-white border-2 border-[#233E2E] text-[#233E2E] px-8 py-3 rounded-xl font-semibold hover:bg-[#233E2E]/5 transition-all duration-500 inline-flex items-center gap-2 group"
                            >
                                Lihat Semua Program
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* FAQ Section dengan Animasi */}
            <section className="py-20 px-4 sm:px-6 bg-white">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Pertanyaan yang Sering Diajukan</h2>
                        <p className="text-slate-500">Temukan jawaban untuk pertanyaan umum seputar layanan kami</p>
                    </div>

                    <div className="space-y-4">
                        {[
                            {
                                q: "Bagaimana cara mendaftar layanan konsultasi?",
                                a: "Anda bisa mendaftar melalui website atau aplikasi kami. Pilih layanan yang diinginkan, isi formulir, pilih jadwal, lakukan pembayaran, dan mulai konsultasi."
                            },
                            {
                                q: "Apakah layanan homecare tersedia 24 jam?",
                                a: "Ya, layanan perawat homecare tersedia 24 jam. Anda bisa memilih jadwal kunjungan sesuai kebutuhan, termasuk untuk layanan darurat."
                            },
                            {
                                q: "Bagaimana cara pembayaran?",
                                a: "Kami menerima berbagai metode pembayaran: transfer bank, kartu kredit, e-wallet (GoPay, OVO, Dana), dan virtual account."
                            },
                            {
                                q: "Apakah ada garansi jika tidak puas dengan layanan?",
                                a: "Kami memberikan garansi kepuasan 100%. Jika Anda tidak puas dengan layanan, kami akan memberikan refund atau penggantian jadwal tanpa biaya tambahan."
                            }
                        ].map((faq, i) => {
                            const [isOpen, setIsOpen] = useState(false);
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-slate-50 rounded-xl overflow-hidden"
                                >
                                    <button
                                        onClick={() => setIsOpen(!isOpen)}
                                        className="w-full p-6 text-left flex items-center justify-between group"
                                    >
                                        <h3 className="font-semibold text-lg group-hover:text-[#233E2E] transition-colors">
                                            {faq.q}
                                        </h3>
                                        <motion.div
                                            animate={{ rotate: isOpen ? 90 : 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-[#233E2E]" />
                                        </motion.div>
                                    </button>
                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="px-6 pb-6"
                                            >
                                                <p className="text-slate-500 text-sm">{faq.a}</p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 sm:px-6 bg-gradient-to-br from-[#233E2E] to-[#3E624C] text-white relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute inset-0 opacity-10" style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                        backgroundSize: '40px 40px'
                    }}></div>
                </div>

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
                    >
                        Siap untuk Mulai?
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg sm:text-xl mb-8 text-white/90 max-w-2xl mx-auto"
                    >
                        Dapatkan layanan kesehatan terbaik untuk lansia tercinta
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Link href="/daftar">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-white text-[#233E2E] px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-500 inline-flex items-center gap-2 group"
                            >
                                <span>Daftar Sekarang</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                        </Link>
                        <Link href="/kontak">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all duration-500"
                            >
                                Hubungi Kami
                            </motion.button>
                        </Link>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-wrap justify-center gap-6 mt-12"
                    >
                        <div className="flex items-center gap-2">
                            <PhoneIcon className="w-4 h-4" />
                            <span className="text-sm">+62 21 1234 5678</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            <span className="text-sm">info@lansiacare.id</span>
                        </div>
                    </motion.div>
                </div>
            </section>

             {/* Footer */}
                              <footer className="bg-slate-900 text-white py-12 sm:py-16 px-4 sm:px-6">
                                <div className="max-w-7xl mx-auto">
                                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-8">
                                    <div>
                                      {/* --- BRANDING FOOTER (VERSI RAPI & PREMIUM) --- */}
                                      <div className="flex items-center gap-4 mb-8">
                                        {/* 1. KOTAK LOGO: Menggunakan object-cover agar gambar memenuhi sudut */}
                                        <div className="relative w-12 h-12 rounded-[20px] overflow-hidden shadow-lg border border-white/5 bg-[#233E2E] flex items-center justify-center">
                                          <img
                                            src="/logo2.png"
                                            alt="GiveCare Logo"
                                            className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                                          />
                                        </div>
                        
                                        {/* 2. TEKS BRANDING: Menggunakan font-black agar lebih kuat */}
                                        <div className="flex flex-col leading-tight">
                                          <span className="text-2xl font-black tracking-tighter text-white">
                                            Kawan<span className="text-emerald-500">Pulih</span>
                                          </span>
                                        </div>
                                      </div>
                                      {/* --- BATAS PERUBAHAN --- */}
                        
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

            {/* Scroll to Top Button */}
            <AnimatePresence>
                {showScrollTop && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={scrollToTop}
                        className="fixed bottom-6 right-6 z-50 p-3 bg-gradient-to-r from-[#233E2E] to-[#3E624C] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                        <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6" />
                    </motion.button>
                )}
            </AnimatePresence>

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
            `}</style>
        </main>
    );
}