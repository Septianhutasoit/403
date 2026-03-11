"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import FloatingChat from "@/components/FloatingChat";
import {
    // Navigation & Actions
    Search, Filter, ChevronRight, ChevronLeft, X, ArrowRight, ChevronUp,

    // Communication
    Video, MessageCircle, Phone, Mail, Calendar,

    // Medical Icons
    Stethoscope, HeartPulse, Bandage, Heart, Bone, Eye, Brain,
    Activity, Microscope, FlaskConical, Lungs, Droplets,

    // UI Icons
    Star, Clock, Users, Award, MapPin, GraduationCap,
    Sparkles, CheckCircle, Shield, BookOpen, FileText,
    ThumbsUp, Share2, Bookmark, User, Briefcase, Hospital,

    // Status Icons
    Wifi, WifiOff, CircleCheck, CircleAlert,

    // Building & Location
    Building, MapPinned,

    // Medical Staff Icons
    Scissors, Syringe, Pill, Ambulance,
    UserRound, UserCog, UsersRound, HeartHandshake,

    // Additional Icons
    CreditCard, Globe, Languages, MailCheck, PhoneCall,
    CalendarDays, Clock3, Medal, Target, TrendingUp,
    Zap, ShieldCheck, Lock, Eye as EyeIcon
} from "lucide-react";

// Tipe data untuk dokter
interface Doctor {
    id: number;
    name: string;
    specialty: string;
    specialtyName: string;
    subSpecialty: string;
    experience: number;
    experienceYears: string;
    patients: string;
    rating: number;
    reviewCount: number;
    price: number;
    image: string;
    schedule: { day: string; hours: string }[];
    hospital: string;
    location: string;
    branches?: string[];
    education: string[];
    about: string;
    achievements: string[];
    languages: string[];
    color: string;
    badge: string;
    available: boolean;
    videoConsult: boolean;
    chatConsult: boolean;
    hospitalVisit: boolean;
    nextAvailable: string;
    verified: boolean;
    ratingCount: number;
    consultationTypes?: string[];
    registrationNumber?: string;
    email?: string;
    phone?: string;
}

// Tipe data untuk perawat
interface Nurse {
    id: number;
    name: string;
    specialty: string;
    specialtyName: string;
    subSpecialty: string;
    experience: number;
    experienceYears: string;
    patients: string;
    rating: number;
    reviewCount: number;
    price: number;
    image: string;
    schedule: { day: string; hours: string }[];
    hospital: string;
    location: string;
    branches?: string[];
    education: string[];
    about: string;
    certifications: string[];
    languages: string[];
    color: string;
    badge: string;
    available: boolean;
    videoConsult: boolean;
    chatConsult: boolean;
    homeVisit: boolean;
    nextAvailable: string;
    verified: boolean;
    ratingCount: number;
    serviceArea?: string[];
    registrationNumber?: string;
    email?: string;
    phone?: string;
}

// Tipe data untuk specialty
interface Specialty {
    id: string;
    name: string;
    icon: JSX.Element;
    color: string;
    count: number;
}

export default function DokterPage() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSpecialty, setSelectedSpecialty] = useState("semua");
    const [selectedExperience, setSelectedExperience] = useState("semua");
    const [selectedPrice, setSelectedPrice] = useState("semua");
    const [showFilter, setShowFilter] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
    const [selectedNurse, setSelectedNurse] = useState<Nurse | null>(null);
    const [visibleDoctors, setVisibleDoctors] = useState(4);
    const [visibleNurses, setVisibleNurses] = useState(4);
    const [activeTab, setActiveTab] = useState<"dokter" | "perawat">("dokter");
    const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const sectionRefs = useRef<(HTMLElement | null)[]>([]);

    // Set isClient to true after mount to prevent hydration mismatch
    useEffect(() => {
        setIsClient(true);
    }, []);

    // Data untuk background slider
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

    // Auto slide setiap 5 detik - hanya di client
    useEffect(() => {
        if (!isClient) return;

        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [heroSlides.length, isClient]);

    // Scroll to top button visibility - hanya di client
    useEffect(() => {
        if (!isClient) return;

        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 500);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isClient]);

    // Intersection Observer untuk animasi scroll - hanya di client
    useEffect(() => {
        if (!isClient) return;

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
            { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
        );

        sectionRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, [isClient]);

    const fadeInUpClass = (index: number): string =>
        `transition-all duration-1000 transform ${isVisible[index] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`;

    // Data spesialisasi dokter
    const specialties: Specialty[] = [
        { id: "semua", name: "Semua Spesialis", icon: <Stethoscope className="w-4 h-4" />, color: "from-slate-500 to-slate-600", count: 52 },
        { id: "penyakit-dalam", name: "Penyakit Dalam", icon: <HeartPulse className="w-4 h-4" />, color: "from-emerald-500 to-teal-500", count: 12 },
        { id: "bedah", name: "Bedah", icon: <Bandage className="w-4 h-4" />, color: "from-blue-500 to-cyan-500", count: 8 },
        { id: "jantung", name: "Jantung", icon: <Heart className="w-4 h-4" />, color: "from-red-500 to-pink-500", count: 6 },
        { id: "ortopedi", name: "Ortopedi", icon: <Bone className="w-4 h-4" />, color: "from-amber-500 to-orange-500", count: 5 },
        { id: "saraf", name: "Saraf", icon: <Brain className="w-4 h-4" />, color: "from-purple-500 to-violet-500", count: 4 },
        { id: "mata", name: "Mata", icon: <Eye className="w-4 h-4" />, color: "from-indigo-500 to-blue-500", count: 3 },
        { id: "gigi", name: "Gigi", icon: <Sparkles className="w-4 h-4" />, color: "from-cyan-500 to-teal-500", count: 4 },
        { id: "anak", name: "Anak", icon: <Activity className="w-4 h-4" />, color: "from-green-500 to-emerald-500", count: 4 },
        { id: "gizi", name: "Gizi Klinik", icon: <FlaskConical className="w-4 h-4" />, color: "from-lime-500 to-green-500", count: 3 }
    ];

    // Data spesialisasi perawat
    const nurseSpecialties: Specialty[] = [
        { id: "semua", name: "Semua Perawat", icon: <UserRound className="w-4 h-4" />, color: "from-slate-500 to-slate-600", count: 30 },
        { id: "lansia", name: "Perawat Lansia", icon: <HeartHandshake className="w-4 h-4" />, color: "from-emerald-500 to-teal-500", count: 12 },
        { id: "pasca-operasi", name: "Perawat Pasca Operasi", icon: <Bandage className="w-4 h-4" />, color: "from-blue-500 to-cyan-500", count: 8 },
        { id: "luka", name: "Perawat Luka", icon: <Scissors className="w-4 h-4" />, color: "from-amber-500 to-orange-500", count: 5 },
        { id: "infus", name: "Perawat Infus", icon: <Syringe className="w-4 h-4" />, color: "from-purple-500 to-violet-500", count: 3 },
        { id: "homecare", name: "Homecare", icon: <Hospital className="w-4 h-4" />, color: "from-teal-500 to-cyan-500", count: 6 }
    ];

    // Data filter pengalaman
    const experienceLevels = [
        { id: "semua", name: "Semua Pengalaman" },
        { id: "1-3", name: "1-3 Tahun" },
        { id: "3-5", name: "3-5 Tahun" },
        { id: "5-10", name: "5-10 Tahun" },
        { id: "10+", name: "10+ Tahun" }
    ];

    // Data filter harga
    const priceRanges = [
        { id: "semua", name: "Semua Harga" },
        { id: "0-150", name: "< Rp 150K" },
        { id: "150-250", name: "Rp 150K - 250K" },
        { id: "250-350", name: "Rp 250K - 350K" },
        { id: "350+", name: "> Rp 350K" }
    ];

    // Data dokter (gambar dikosongkan, nanti diisi)
    const doctors: Doctor[] = [
        // GIGI
        {
            id: 101,
            name: "drg. Agia Tessa Andriani, M.Kes., Sp.Ort",
            specialty: "gigi",
            specialtyName: "Gigi",
            subSpecialty: "SPESIALIS ORTHODONTI",
            experience: 10,
            experienceYears: "10 tahun",
            patients: "1.200+",
            rating: 4.9,
            reviewCount: 187,
            price: 300000,
            image: "", // Kosong, nanti diisi
            schedule: [
                { day: "Senin", hours: "09:00 - 17:00" },
                { day: "Selasa", hours: "09:00 - 17:00" },
                { day: "Rabu", hours: "09:00 - 17:00" },
                { day: "Kamis", hours: "09:00 - 17:00" },
                { day: "Jumat", hours: "09:00 - 17:00" }
            ],
            hospital: "AUDY Dental",
            location: "Depok & Cipete",
            branches: ["AUDY Dental Depok", "AUDY Dental Cipete"],
            education: [
                "Universitas Indonesia - Spesialis Orthodonti",
                "Universitas Indonesia - Dokter Gigi"
            ],
            about: "Spesialis orthodonti dengan pengalaman dalam perawatan kawat gigi dan aligner untuk berbagai usia, termasuk lansia dengan kebutuhan khusus.",
            achievements: [
                "Certified Invisalign Provider",
                "Anggota PDGI"
            ],
            languages: ["Indonesia", "Inggris"],
            color: "from-cyan-500 to-teal-500",
            badge: "Spesialis Orthodonti",
            available: true,
            videoConsult: true,
            chatConsult: true,
            hospitalVisit: true,
            nextAvailable: "Tersedia Hari Ini",
            verified: true,
            ratingCount: 187,
            consultationTypes: ["Online", "Offline", "Home Visit"],
            registrationNumber: "12345/PDGI/2020",
            email: "agia.drg@example.com",
            phone: "+62 812-3456-7890"
        },
        {
            id: 102,
            name: "drg. Agiditya Primaska",
            specialty: "gigi",
            specialtyName: "Gigi",
            subSpecialty: "Sp.KG (Konservasi Gigi)",
            experience: 8,
            experienceYears: "8 tahun",
            patients: "900+",
            rating: 4.8,
            reviewCount: 145,
            price: 275000,
            image: "",
            schedule: [
                { day: "Senin", hours: "10:00 - 18:00" },
                { day: "Selasa", hours: "10:00 - 18:00" },
                { day: "Rabu", hours: "10:00 - 18:00" },
                { day: "Kamis", hours: "10:00 - 18:00" },
                { day: "Jumat", hours: "10:00 - 18:00" }
            ],
            hospital: "AUDY Dental",
            location: "Gading Serpong",
            branches: ["AUDY Dental Gading Serpong"],
            education: [
                "Universitas Indonesia - Spesialis Konservasi Gigi",
                "Universitas Indonesia - Dokter Gigi"
            ],
            about: "Spesialis konservasi gigi dengan fokus pada perawatan tambal gigi, saluran akar, dan perawatan gigi lansia.",
            achievements: [
                "Certified Endodontist",
                "Anggota PDGI"
            ],
            languages: ["Indonesia", "Inggris"],
            color: "from-cyan-500 to-teal-500",
            badge: "Spesialis Konservasi Gigi",
            available: true,
            videoConsult: true,
            chatConsult: true,
            hospitalVisit: true,
            nextAvailable: "Tersedia Besok",
            verified: true,
            ratingCount: 145,
            consultationTypes: ["Online", "Offline"],
            registrationNumber: "12346/PDGI/2021",
            email: "agiditya.drg@example.com",
            phone: "+62 812-3456-7891"
        },
        {
            id: 103,
            name: "drg. Agustina Fortunata",
            specialty: "gigi",
            specialtyName: "Gigi",
            subSpecialty: "SPESIALIS KONSERVASI GIGI",
            experience: 12,
            experienceYears: "12 tahun",
            patients: "1.500+",
            rating: 4.9,
            reviewCount: 234,
            price: 325000,
            image: "",
            schedule: [
                { day: "Senin", hours: "08:00 - 16:00" },
                { day: "Selasa", hours: "08:00 - 16:00" },
                { day: "Rabu", hours: "08:00 - 16:00" },
                { day: "Kamis", hours: "08:00 - 16:00" },
                { day: "Jumat", hours: "08:00 - 16:00" }
            ],
            hospital: "AUDY Dental",
            location: "Gading Serpong",
            branches: ["AUDY Dental Gading Serpong"],
            education: [
                "Universitas Gadjah Mada - Spesialis Konservasi Gigi",
                "Universitas Gadjah Mada - Dokter Gigi"
            ],
            about: "Spesialis konservasi gigi dengan pengalaman dalam perawatan gigi kompleks dan rehabilitasi gigi pada pasien lansia.",
            achievements: [
                "Fellowship Esthetic Dentistry - Korea",
                "Anggota PDGI"
            ],
            languages: ["Indonesia", "Inggris", "Korea"],
            color: "from-cyan-500 to-teal-500",
            badge: "Spesialis Konservasi Gigi",
            available: true,
            videoConsult: true,
            chatConsult: true,
            hospitalVisit: true,
            nextAvailable: "Tersedia Hari Ini",
            verified: true,
            ratingCount: 234,
            consultationTypes: ["Online", "Offline"],
            registrationNumber: "12347/PDGI/2019",
            email: "agustina.drg@example.com",
            phone: "+62 812-3456-7892"
        },
        {
            id: 104,
            name: "drg. Agis Tessa Andriani, M.Kes., Sp.Ort",
            specialty: "gigi",
            specialtyName: "Gigi",
            subSpecialty: "SPESIALIS ORTHODONTI",
            experience: 9,
            experienceYears: "9 tahun",
            patients: "1.100+",
            rating: 4.8,
            reviewCount: 167,
            price: 300000,
            image: "",
            schedule: [
                { day: "Selasa", hours: "09:00 - 17:00" },
                { day: "Rabu", hours: "09:00 - 17:00" },
                { day: "Kamis", hours: "09:00 - 17:00" },
                { day: "Jumat", hours: "09:00 - 17:00" },
                { day: "Sabtu", hours: "09:00 - 15:00" }
            ],
            hospital: "AUDY Dental",
            location: "Karawang",
            branches: ["AUDY Dental Karawang"],
            education: [
                "Universitas Padjadjaran - Spesialis Orthodonti",
                "Universitas Padjadjaran - Dokter Gigi"
            ],
            about: "Spesialis orthodonti yang berpengalaman dalam perawatan gigi tidak rata dan perawatan pra-prostodontik untuk lansia.",
            achievements: [
                "Certified Orthodontist",
                "Anggota PDGI"
            ],
            languages: ["Indonesia", "Inggris", "Sunda"],
            color: "from-cyan-500 to-teal-500",
            badge: "Spesialis Orthodonti",
            available: false,
            videoConsult: true,
            chatConsult: true,
            hospitalVisit: true,
            nextAvailable: "Tersedia 2 Hari Lagi",
            verified: true,
            ratingCount: 167,
            consultationTypes: ["Online", "Offline"],
            registrationNumber: "12348/PDGI/2020",
            email: "agis.drg@example.com",
            phone: "+62 812-3456-7893"
        },
        // PENYAKIT DALAM
        {
            id: 1,
            name: "dr. Sarah Wijaya, Sp.PD",
            specialty: "penyakit-dalam",
            specialtyName: "Penyakit Dalam",
            subSpecialty: "Konsultan Geriatri (Lansia)",
            experience: 15,
            experienceYears: "15 tahun",
            patients: "2.500+",
            rating: 4.9,
            reviewCount: 325,
            price: 250000,
            image: "",
            schedule: [
                { day: "Senin", hours: "09:00 - 17:00" },
                { day: "Selasa", hours: "09:00 - 17:00" },
                { day: "Rabu", hours: "09:00 - 17:00" },
                { day: "Kamis", hours: "09:00 - 17:00" },
                { day: "Jumat", hours: "09:00 - 17:00" }
            ],
            hospital: "RS Siloam",
            location: "Jakarta Selatan",
            branches: ["RS Siloam Semanggi", "Klinik Siloam Kebayoran"],
            education: [
                "Universitas Indonesia - Spesialis Penyakit Dalam (2015)",
                "Universitas Indonesia - Dokter Umum (2010)"
            ],
            about: "Spesialis penyakit dalam dengan fokus pada perawatan lansia dan manajemen penyakit kronis seperti diabetes, hipertensi, dan gangguan metabolik lainnya. Berpengalaman dalam menangani pasien geriatri dengan pendekatan holistik.",
            achievements: [
                "Best Geriatric Consultant 2023",
                "Peneliti Diabetes pada Lansia",
                "Anggota PERGEMI"
            ],
            languages: ["Indonesia", "Inggris", "Mandarin"],
            color: "from-emerald-500 to-teal-500",
            badge: "Konsultan Geriatri",
            available: true,
            videoConsult: true,
            chatConsult: true,
            hospitalVisit: true,
            nextAvailable: "Tersedia Hari Ini",
            verified: true,
            ratingCount: 325,
            consultationTypes: ["Online", "Offline"],
            registrationNumber: "12345/IDI/2015",
            email: "sarah.dr@example.com",
            phone: "+62 812-3456-7894"
        }
    ];

    // Data perawat (gambar dikosongkan, nanti diisi)
    const nurses: Nurse[] = [
        {
            id: 201,
            name: "Ns. Siti Aisyah, S.Kep",
            specialty: "lansia",
            specialtyName: "Perawat Lansia",
            subSpecialty: "Spesialis Perawatan Lansia",
            experience: 8,
            experienceYears: "8 tahun",
            patients: "450+",
            rating: 4.9,
            reviewCount: 112,
            price: 175000,
            image: "",
            schedule: [
                { day: "Senin", hours: "08:00 - 20:00" },
                { day: "Selasa", hours: "08:00 - 20:00" },
                { day: "Rabu", hours: "08:00 - 20:00" },
                { day: "Kamis", hours: "08:00 - 20:00" },
                { day: "Jumat", hours: "08:00 - 20:00" }
            ],
            hospital: "Homecare Indonesia",
            location: "Jakarta Selatan",
            branches: ["Jakarta Selatan", "Jakarta Pusat"],
            education: [
                "Universitas Indonesia - Profesi Ners",
                "Politeknik Kesehatan - D3 Keperawatan"
            ],
            about: "Perawat profesional dengan pengalaman merawat lansia dengan berbagai kondisi seperti pasca stroke, diabetes, dan demensia. Terlatih dalam perawatan luka dan manajemen obat.",
            certifications: [
                "Sertifikasi Perawat Lansia",
                "Sertifikasi Perawatan Luka",
                "Basic Life Support (BLS)"
            ],
            languages: ["Indonesia", "Inggris", "Sunda"],
            color: "from-emerald-500 to-teal-500",
            badge: "Perawat Lansia",
            available: true,
            videoConsult: true,
            chatConsult: true,
            homeVisit: true,
            nextAvailable: "Tersedia Hari Ini",
            verified: true,
            ratingCount: 112,
            serviceArea: ["Jakarta Selatan", "Jakarta Pusat", "Jakarta Barat"],
            registrationNumber: "12345/PPNI/2018",
            email: "siti.ns@example.com",
            phone: "+62 812-3456-7895"
        },
        {
            id: 202,
            name: "Ns. Ahmad Fauzi, S.Kep",
            specialty: "pasca-operasi",
            specialtyName: "Perawat Pasca Operasi",
            subSpecialty: "Spesialis Perawatan Pasca Operasi",
            experience: 6,
            experienceYears: "6 tahun",
            patients: "380+",
            rating: 4.8,
            reviewCount: 89,
            price: 200000,
            image: "",
            schedule: [
                { day: "Senin", hours: "07:00 - 19:00" },
                { day: "Selasa", hours: "07:00 - 19:00" },
                { day: "Rabu", hours: "07:00 - 19:00" },
                { day: "Kamis", hours: "07:00 - 19:00" },
                { day: "Jumat", hours: "07:00 - 19:00" }
            ],
            hospital: "RS Siloam",
            location: "Jakarta Selatan",
            branches: ["RS Siloam", "Klinik Siloam"],
            education: [
                "Universitas Airlangga - Profesi Ners",
                "Politeknik Kesehatan - D3 Keperawatan"
            ],
            about: "Perawat spesialis perawatan pasca operasi dengan pengalaman menangani pasien bedah jantung, ortopedi, dan digestif. Terlatih dalam perawatan luka operasi dan manajemen drain.",
            certifications: [
                "Sertifikasi Perawatan Luka Operasi",
                "Sertifikasi Perawatan Intensif",
                "Basic Life Support (BLS)"
            ],
            languages: ["Indonesia", "Inggris"],
            color: "from-blue-500 to-cyan-500",
            badge: "Perawat Pasca Operasi",
            available: true,
            videoConsult: true,
            chatConsult: true,
            homeVisit: true,
            nextAvailable: "Tersedia Besok",
            verified: true,
            ratingCount: 89,
            serviceArea: ["Jakarta Selatan", "Jakarta Pusat"],
            registrationNumber: "12346/PPNI/2019",
            email: "ahmad.ns@example.com",
            phone: "+62 812-3456-7896"
        }
    ];

    // Filter berdasarkan tipe dan kriteria
    const filteredDoctors = doctors.filter(doctor => {
        if (activeTab !== "dokter") return false;

        const matchesSpecialty = selectedSpecialty === "semua" || doctor.specialty === selectedSpecialty;
        const matchesSearch = searchTerm === "" ||
            doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doctor.specialtyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doctor.subSpecialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doctor.hospital.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesExperience = selectedExperience === "semua" ||
            (selectedExperience === "1-3" && doctor.experience >= 1 && doctor.experience < 3) ||
            (selectedExperience === "3-5" && doctor.experience >= 3 && doctor.experience < 5) ||
            (selectedExperience === "5-10" && doctor.experience >= 5 && doctor.experience < 10) ||
            (selectedExperience === "10+" && doctor.experience >= 10);

        const matchesPrice = selectedPrice === "semua" ||
            (selectedPrice === "0-150" && doctor.price <= 150000) ||
            (selectedPrice === "150-250" && doctor.price > 150000 && doctor.price <= 250000) ||
            (selectedPrice === "250-350" && doctor.price > 250000 && doctor.price <= 350000) ||
            (selectedPrice === "350+" && doctor.price > 350000);

        return matchesSpecialty && matchesSearch && matchesExperience && matchesPrice;
    });

    const filteredNurses = nurses.filter(nurse => {
        if (activeTab !== "perawat") return false;

        const matchesSpecialty = selectedSpecialty === "semua" || nurse.specialty === selectedSpecialty;
        const matchesSearch = searchTerm === "" ||
            nurse.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            nurse.specialtyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            nurse.subSpecialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
            nurse.hospital.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesExperience = selectedExperience === "semua" ||
            (selectedExperience === "1-3" && nurse.experience >= 1 && nurse.experience < 3) ||
            (selectedExperience === "3-5" && nurse.experience >= 3 && nurse.experience < 5) ||
            (selectedExperience === "5-10" && nurse.experience >= 5 && nurse.experience < 10) ||
            (selectedExperience === "10+" && nurse.experience >= 10);

        const matchesPrice = selectedPrice === "semua" ||
            (selectedPrice === "0-150" && nurse.price <= 150000) ||
            (selectedPrice === "150-250" && nurse.price > 150000 && nurse.price <= 250000) ||
            (selectedPrice === "250-350" && nurse.price > 250000 && nurse.price <= 350000) ||
            (selectedPrice === "350+" && nurse.price > 350000);

        return matchesSpecialty && matchesSearch && matchesExperience && matchesPrice;
    });

    const displayedDoctors = filteredDoctors.slice(0, visibleDoctors);
    const displayedNurses = filteredNurses.slice(0, visibleNurses);

    // Handler untuk reset filter
    const resetFilters = () => {
        setSelectedExperience("semua");
        setSelectedPrice("semua");
        setSelectedSpecialty("semua");
    };

    // Scroll to top function
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Jangan render apa pun sampai client-side mount untuk mencegah hydration mismatch
    if (!isClient) {
        return (
            <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
                <Navbar />
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-slate-600">Memuat...</p>
                    </div>
                </div>
            </main>
        );
    }

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
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{ backgroundImage: `url(${slide.image})` }}
                            >
                                {/* Overlay Gradient - Sama dengan edukasi */}
                                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                            </div>

                            {/* Pattern Overlay - Sama dengan edukasi */}
                            <div
                                className="absolute inset-0 opacity-20"
                                style={{
                                    backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                                    backgroundSize: '40px 40px'
                                }}
                            />
                        </div>
                    ))}

                    {/* Floating Elements - Sama dengan edukasi */}
                    <div className="absolute top-20 right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
                    <div className="absolute bottom-20 left-20 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl animate-pulse-slow animation-delay-2000"></div>
                </div>

                {/* Slide Indicators - Sama dengan edukasi */}
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
                        {/* Badge - Sama dengan edukasi */}
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6 animate-slide-up">
                            <Sparkles className="w-4 h-4" />
                            Tim Medis Profesional
                            <Sparkles className="w-4 h-4" />
                        </div>

                        {/* Title - Dinamis dari slider */}
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 animate-slide-up delay-100">
                            {heroSlides[currentSlide].title}
                        </h1>

                        {/* Subtitle - Dinamis dari slider */}
                        <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl animate-slide-up delay-200">
                            {heroSlides[currentSlide].subtitle}
                        </p>

                        {/* Search Bar - Sama dengan edukasi */}
                        <div className="max-w-2xl relative animate-slide-up delay-300">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Cari dokter, perawat, spesialisasi, atau rumah sakit..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/90 backdrop-blur border border-white/50 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all shadow-lg text-slate-900"
                            />
                        </div>

                        {/* Stats - Sama dengan edukasi */}
                        <div className="flex flex-wrap gap-8 mt-12 animate-slide-up delay-500">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white">50+</div>
                                <div className="text-sm text-white/70">Dokter Spesialis</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white">30+</div>
                                <div className="text-sm text-white/70">Perawat Profesional</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white">12+</div>
                                <div className="text-sm text-white/70">Spesialisasi</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white">24/7</div>
                                <div className="text-sm text-white/70">Layanan</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator - Sama dengan edukasi */}
                <div className="absolute bottom-8 right-8 z-20 hidden lg:block">
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-white/60 text-xs uppercase tracking-wider">Scroll</span>
                        <div className="w-0.5 h-12 bg-white/30 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1/3 bg-white rounded-full animate-bounce"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Info Cards Section - Animasi Informasi */}
            <section className="py-8 sm:py-10 px-4 sm:px-6 -mt-6 sm:-mt-8 relative z-30">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                        {[
                            {
                                icon: <Medal className="w-5 h-5 sm:w-6 sm:h-6" />,
                                title: "Dokter Spesialis",
                                value: "50+",
                                desc: "Tersedia 24/7",
                                color: "from-emerald-500 to-teal-500",
                                bgColor: "bg-emerald-50"
                            },
                            {
                                icon: <HeartHandshake className="w-5 h-5 sm:w-6 sm:h-6" />,
                                title: "Perawat Profesional",
                                value: "30+",
                                desc: "Berpengalaman",
                                color: "from-blue-500 to-cyan-500",
                                bgColor: "bg-blue-50"
                            },
                            {
                                icon: <Target className="w-5 h-5 sm:w-6 sm:h-6" />,
                                title: "Tingkat Kepuasan",
                                value: "98%",
                                desc: "Pasien puas",
                                color: "from-purple-500 to-pink-500",
                                bgColor: "bg-purple-50"
                            },
                            {
                                icon: <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />,
                                title: "Konsultasi",
                                value: "10K+",
                                desc: "Per bulan",
                                color: "from-orange-500 to-red-500",
                                bgColor: "bg-orange-50"
                            }
                        ].map((item, i) => (
                            <div
                                key={i}
                                className={`${item.bgColor} rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 backdrop-blur-sm hover:-translate-y-1`}
                            >
                                <div className="flex items-center gap-3 sm:gap-4">
                                    <div className={`p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-gradient-to-r ${item.color} text-white shadow-lg`}>
                                        {item.icon}
                                    </div>
                                    <div>
                                        <p className="text-xs sm:text-sm text-slate-600">{item.title}</p>
                                        <p className="text-xl sm:text-2xl font-bold text-slate-900">{item.value}</p>
                                        <p className="text-[10px] sm:text-xs text-slate-500">{item.desc}</p>
                                    </div>
                                </div>
                                <div className="h-0.5 bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent mt-2 animate-pulse" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tab Selector: Dokter / Perawat */}
            <section className="py-4 sm:py-6 px-4 sm:px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white/80 backdrop-blur-xl rounded-xl sm:rounded-2xl p-1 sm:p-2 shadow-xl border border-slate-200 inline-flex mx-auto">
                        <button
                            onClick={() => {
                                setActiveTab("dokter");
                                setSelectedSpecialty("semua");
                            }}
                            className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm ${activeTab === "dokter"
                                    ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg scale-105"
                                    : "text-slate-600 hover:bg-emerald-50"
                                }`}
                        >
                            <Stethoscope className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span>Dokter Spesialis ({doctors.length})</span>
                        </button>
                        <button
                            onClick={() => {
                                setActiveTab("perawat");
                                setSelectedSpecialty("semua");
                            }}
                            className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm ${activeTab === "perawat"
                                    ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg scale-105"
                                    : "text-slate-600 hover:bg-blue-50"
                                }`}
                        >
                            <UserRound className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span>Perawat Profesional ({nurses.length})</span>
                        </button>
                    </div>
                </div>
            </section>

            {/* Quick Access Specialties */}
            <section className="py-3 sm:py-4 px-4 sm:px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-md border border-slate-100">
                        <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center">
                            {(activeTab === "dokter" ? specialties : nurseSpecialties).map((specialty, index) => (
                                <button
                                    key={specialty.id}
                                    onClick={() => setSelectedSpecialty(specialty.id)}
                                    className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-full transition-all duration-300 text-xs sm:text-sm hover:scale-105 ${selectedSpecialty === specialty.id
                                            ? `bg-gradient-to-r ${specialty.color} text-white shadow-lg`
                                            : 'bg-white text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 border border-slate-200'
                                        }`}
                                >
                                    <span className="w-3 h-3 sm:w-4 sm:h-4">{specialty.icon}</span>
                                    <span className="hidden sm:inline">{specialty.name}</span>
                                    <span className="text-[10px] sm:text-xs bg-white/20 px-1 sm:px-1.5 py-0.5 rounded-full">
                                        {specialty.count}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Filter Bar */}
            <section className="py-3 sm:py-4 px-4 sm:px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4">
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setShowFilter(!showFilter)}
                                className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white border border-slate-200 rounded-lg sm:rounded-xl hover:bg-slate-50 transition-colors text-xs sm:text-sm shadow-sm"
                            >
                                <Filter className="w-3 h-3 sm:w-4 sm:h-4" />
                                <span>Filter</span>
                                <ChevronRight className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 ${showFilter ? 'rotate-90' : ''
                                    }`} />
                            </button>

                            {(selectedExperience !== "semua" || selectedPrice !== "semua") && (
                                <button
                                    onClick={resetFilters}
                                    className="flex items-center gap-1 px-2 sm:px-3 py-1.5 sm:py-2 bg-red-50 text-red-600 rounded-lg sm:rounded-xl text-xs sm:text-sm hover:bg-red-100 transition-colors"
                                >
                                    <X className="w-3 h-3" />
                                    <span className="hidden sm:inline">Reset Filter</span>
                                </button>
                            )}
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-xs sm:text-sm text-slate-500">Urutkan:</span>
                            <select className="px-2 sm:px-3 py-1.5 sm:py-2 bg-white border border-slate-200 rounded-lg sm:rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm">
                                <option>Rekomendasi</option>
                                <option>Rating Tertinggi</option>
                                <option>Pengalaman Terbanyak</option>
                                <option>Harga Terendah</option>
                                <option>Pasien Terbanyak</option>
                            </select>
                        </div>
                    </div>

                    {/* Filter Options */}
                    <AnimatePresence>
                        {showFilter && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-3 sm:mt-4 p-3 sm:p-4 bg-white rounded-xl sm:rounded-2xl border border-slate-200 overflow-hidden shadow-lg"
                            >
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                    <div>
                                        <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1 sm:mb-2">
                                            Pengalaman
                                        </label>
                                        <div className="flex flex-wrap gap-1 sm:gap-2">
                                            {experienceLevels.map((exp) => (
                                                <button
                                                    key={exp.id}
                                                    onClick={() => setSelectedExperience(exp.id)}
                                                    className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs transition-all hover:scale-105 ${selectedExperience === exp.id
                                                            ? 'bg-emerald-600 text-white shadow-md'
                                                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                                        }`}
                                                >
                                                    {exp.name}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1 sm:mb-2">
                                            Rentang Harga
                                        </label>
                                        <div className="flex flex-wrap gap-1 sm:gap-2">
                                            {priceRanges.map((price) => (
                                                <button
                                                    key={price.id}
                                                    onClick={() => setSelectedPrice(price.id)}
                                                    className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs transition-all hover:scale-105 ${selectedPrice === price.id
                                                            ? 'bg-emerald-600 text-white shadow-md'
                                                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                                        }`}
                                                >
                                                    {price.name}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>

            {/* Cards Grid Section */}
            <section ref={el => { sectionRefs.current[0] = el; }} data-index="0" className="py-6 sm:py-8 px-4 sm:px-6">
                <div className={`max-w-7xl mx-auto ${fadeInUpClass(0)}`}>
                    {/* Results Info */}
                    <div className="flex items-center justify-between mb-4 sm:mb-6">
                        <p className="text-xs sm:text-sm text-slate-500">
                            Menampilkan{' '}
                            <span className="font-semibold text-slate-900">
                                {activeTab === "dokter" ? displayedDoctors.length : displayedNurses.length}
                            </span>{' '}
                            dari{' '}
                            <span className="font-semibold text-slate-900">
                                {activeTab === "dokter" ? filteredDoctors.length : filteredNurses.length}
                            </span>{' '}
                            {activeTab === "dokter" ? "dokter" : "perawat"}
                        </p>
                    </div>

                    {/* Cards Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                        {activeTab === "dokter"
                            ? displayedDoctors.map((doctor, index) => (
                                <div
                                    key={doctor.id}
                                    className="group bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer border border-slate-100 hover:-translate-y-1"
                                    onClick={() => setSelectedDoctor(doctor)}
                                >
                                    <div className="flex flex-col">
                                        {/* Card Header with Image */}
                                        <div className="relative h-40 sm:h-44 md:h-48 overflow-hidden bg-gradient-to-br from-slate-200 to-slate-300">
                                            {doctor.image ? (
                                                <div
                                                    className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                                                    style={{ backgroundImage: `url(${doctor.image})` }}
                                                >
                                                    <div className={`absolute inset-0 bg-gradient-to-t ${doctor.color} opacity-70`} />
                                                </div>
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/80 backdrop-blur flex items-center justify-center">
                                                        <Stethoscope className="w-8 h-8 sm:w-10 sm:h-10 text-slate-400" />
                                                    </div>
                                                </div>
                                            )}

                                            {/* Badges */}
                                            <div className="absolute top-2 sm:top-3 left-2 sm:left-3 z-10 flex gap-1 sm:gap-2">
                                                <span className={`inline-flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold ${doctor.available
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-orange-100 text-orange-700"
                                                    }`}>
                                                    <span className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full ${doctor.available ? "bg-green-600" : "bg-orange-600"
                                                        } animate-pulse`} />
                                                    {doctor.available ? "Tersedia" : "Sibuk"}
                                                </span>
                                                <span className={`inline-block px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold bg-gradient-to-r ${doctor.color} text-white shadow-md`}>
                                                    {doctor.badge}
                                                </span>
                                            </div>

                                            {doctor.verified && (
                                                <div className="absolute top-2 sm:top-3 right-2 sm:right-3 z-10">
                                                    <span className="bg-blue-100 text-blue-600 p-1 rounded-full shadow-lg">
                                                        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                                                    </span>
                                                </div>
                                            )}

                                            {/* Doctor Info Overlay */}
                                            <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3 text-white">
                                                <h3 className="text-sm sm:text-base md:text-lg font-bold leading-tight mb-0.5 sm:mb-1 drop-shadow-lg">
                                                    {doctor.name.length > 30 ? doctor.name.substring(0, 30) + '...' : doctor.name}
                                                </h3>
                                                <p className="text-[10px] sm:text-xs text-white/90 drop-shadow">
                                                    {doctor.subSpecialty.length > 25 ? doctor.subSpecialty.substring(0, 25) + '...' : doctor.subSpecialty}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Card Body */}
                                        <div className="p-3 sm:p-4">
                                            {/* Rating & Stats */}
                                            <div className="flex items-center justify-between mb-2 sm:mb-3">
                                                <div className="flex items-center gap-1 sm:gap-2">
                                                    <div className="flex items-center gap-0.5 sm:gap-1 bg-yellow-50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg">
                                                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                                        <span className="text-xs sm:text-sm font-bold">{doctor.rating}</span>
                                                        <span className="text-[8px] sm:text-xs text-slate-500">({doctor.reviewCount})</span>
                                                    </div>
                                                    <div className="flex items-center gap-0.5 sm:gap-1 bg-blue-50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg">
                                                        <Users className="w-3 h-3 text-blue-600" />
                                                        <span className="text-[10px] sm:text-xs font-semibold">{doctor.patients}</span>
                                                    </div>
                                                </div>
                                                <div className="text-xs sm:text-sm font-bold text-emerald-600">
                                                    Rp {doctor.price.toLocaleString('id-ID')}
                                                </div>
                                            </div>

                                            {/* Branch/Hospital Info */}
                                            <div className="mb-2 sm:mb-3 space-y-1 sm:space-y-1.5">
                                                <div className="flex items-start gap-1 sm:gap-2">
                                                    <Building className="w-3 h-3 text-slate-400 flex-shrink-0 mt-0.5" />
                                                    <div className="flex flex-wrap gap-0.5 sm:gap-1">
                                                        {doctor.branches?.slice(0, 2).map((branch, i) => (
                                                            <span key={i} className="inline-block px-1 sm:px-1.5 py-0.5 bg-slate-100 rounded text-[8px] sm:text-xs">
                                                                {branch}
                                                            </span>
                                                        ))}
                                                        {doctor.branches && doctor.branches.length > 2 && (
                                                            <span className="inline-block px-1 sm:px-1.5 py-0.5 bg-slate-100 rounded text-[8px] sm:text-xs">
                                                                +{doctor.branches.length - 2}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-1 sm:gap-2">
                                                    <MapPin className="w-3 h-3 text-slate-400" />
                                                    <span className="text-[10px] sm:text-xs text-slate-600">{doctor.location}</span>
                                                </div>
                                                <div className="flex items-center gap-1 sm:gap-2 text-emerald-600">
                                                    <Clock className="w-3 h-3" />
                                                    <span className="text-[10px] sm:text-xs font-medium">{doctor.nextAvailable}</span>
                                                </div>
                                            </div>

                                            {/* Service Badges */}
                                            <div className="flex flex-wrap gap-1 mb-2 sm:mb-3">
                                                {doctor.videoConsult && (
                                                    <span className="inline-flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full text-[8px] sm:text-xs font-medium shadow-sm hover:scale-105 transition-transform">
                                                        <Video className="w-2 h-2 sm:w-3 sm:h-3" />
                                                        <span className="hidden sm:inline">Video Call</span>
                                                    </span>
                                                )}
                                                {doctor.chatConsult && (
                                                    <span className="inline-flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-full text-[8px] sm:text-xs font-medium shadow-sm hover:scale-105 transition-transform">
                                                        <MessageCircle className="w-2 h-2 sm:w-3 sm:h-3" />
                                                        <span className="hidden sm:inline">Chat</span>
                                                    </span>
                                                )}
                                                {doctor.hospitalVisit && (
                                                    <span className="inline-flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 bg-purple-50 text-purple-600 rounded-full text-[8px] sm:text-xs font-medium shadow-sm hover:scale-105 transition-transform">
                                                        <Hospital className="w-2 h-2 sm:w-3 sm:h-3" />
                                                        <span className="hidden sm:inline">Kunjungan</span>
                                                    </span>
                                                )}
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex gap-1 sm:gap-2">
                                                <button className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-semibold hover:shadow-lg transition-all duration-500 flex items-center justify-center gap-1 hover:scale-105">
                                                    <Video className="w-3 h-3 sm:w-4 sm:h-4" />
                                                    <span className="hidden sm:inline">Video Call</span>
                                                </button>
                                                <button className="flex-1 border border-blue-600 text-blue-600 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center gap-1 hover:scale-105">
                                                    <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                                                    <span className="hidden sm:inline">Chat</span>
                                                </button>
                                                <button className="p-1.5 sm:p-2 border border-slate-200 rounded-lg sm:rounded-xl hover:bg-slate-50 transition-colors hover:scale-105">
                                                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-slate-600" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                            : displayedNurses.map((nurse, index) => (
                                <div
                                    key={nurse.id}
                                    className="group bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer border border-slate-100 hover:-translate-y-1"
                                    onClick={() => setSelectedNurse(nurse)}
                                >
                                    <div className="flex flex-col">
                                        {/* Card Header with Image */}
                                        <div className="relative h-40 sm:h-44 md:h-48 overflow-hidden bg-gradient-to-br from-slate-200 to-slate-300">
                                            {nurse.image ? (
                                                <div
                                                    className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                                                    style={{ backgroundImage: `url(${nurse.image})` }}
                                                >
                                                    <div className={`absolute inset-0 bg-gradient-to-t ${nurse.color} opacity-70`} />
                                                </div>
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/80 backdrop-blur flex items-center justify-center">
                                                        <UserRound className="w-8 h-8 sm:w-10 sm:h-10 text-slate-400" />
                                                    </div>
                                                </div>
                                            )}

                                            {/* Badges */}
                                            <div className="absolute top-2 sm:top-3 left-2 sm:left-3 z-10 flex gap-1 sm:gap-2">
                                                <span className={`inline-flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold ${nurse.available
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-orange-100 text-orange-700"
                                                    }`}>
                                                    <span className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full ${nurse.available ? "bg-green-600" : "bg-orange-600"
                                                        } animate-pulse`} />
                                                    {nurse.available ? "Tersedia" : "Sibuk"}
                                                </span>
                                                <span className={`inline-block px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold bg-gradient-to-r ${nurse.color} text-white shadow-md`}>
                                                    {nurse.badge}
                                                </span>
                                            </div>

                                            {nurse.verified && (
                                                <div className="absolute top-2 sm:top-3 right-2 sm:right-3 z-10">
                                                    <span className="bg-blue-100 text-blue-600 p-1 rounded-full shadow-lg">
                                                        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                                                    </span>
                                                </div>
                                            )}

                                            {/* Nurse Info Overlay */}
                                            <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3 text-white">
                                                <h3 className="text-sm sm:text-base md:text-lg font-bold leading-tight mb-0.5 sm:mb-1 drop-shadow-lg">
                                                    {nurse.name.length > 30 ? nurse.name.substring(0, 30) + '...' : nurse.name}
                                                </h3>
                                                <p className="text-[10px] sm:text-xs text-white/90 drop-shadow">
                                                    {nurse.subSpecialty.length > 25 ? nurse.subSpecialty.substring(0, 25) + '...' : nurse.subSpecialty}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Card Body */}
                                        <div className="p-3 sm:p-4">
                                            {/* Rating & Stats */}
                                            <div className="flex items-center justify-between mb-2 sm:mb-3">
                                                <div className="flex items-center gap-1 sm:gap-2">
                                                    <div className="flex items-center gap-0.5 sm:gap-1 bg-yellow-50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg">
                                                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                                        <span className="text-xs sm:text-sm font-bold">{nurse.rating}</span>
                                                        <span className="text-[8px] sm:text-xs text-slate-500">({nurse.reviewCount})</span>
                                                    </div>
                                                    <div className="flex items-center gap-0.5 sm:gap-1 bg-blue-50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg">
                                                        <Users className="w-3 h-3 text-blue-600" />
                                                        <span className="text-[10px] sm:text-xs font-semibold">{nurse.patients}</span>
                                                    </div>
                                                </div>
                                                <div className="text-xs sm:text-sm font-bold text-emerald-600">
                                                    Rp {nurse.price.toLocaleString('id-ID')}
                                                </div>
                                            </div>

                                            {/* Service Area Info */}
                                            <div className="mb-2 sm:mb-3 space-y-1 sm:space-y-1.5">
                                                <div className="flex items-start gap-1 sm:gap-2">
                                                    <MapPinned className="w-3 h-3 text-slate-400 flex-shrink-0 mt-0.5" />
                                                    <span className="text-[10px] sm:text-xs text-slate-600">
                                                        {nurse.serviceArea?.slice(0, 2).join(', ')}
                                                        {nurse.serviceArea && nurse.serviceArea.length > 2 && ' ...'}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-1 sm:gap-2 text-emerald-600">
                                                    <Clock className="w-3 h-3" />
                                                    <span className="text-[10px] sm:text-xs font-medium">{nurse.nextAvailable}</span>
                                                </div>
                                            </div>

                                            {/* Service Badges */}
                                            <div className="flex flex-wrap gap-1 mb-2 sm:mb-3">
                                                {nurse.videoConsult && (
                                                    <span className="inline-flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full text-[8px] sm:text-xs font-medium shadow-sm hover:scale-105 transition-transform">
                                                        <Video className="w-2 h-2 sm:w-3 sm:h-3" />
                                                        <span className="hidden sm:inline">Video Call</span>
                                                    </span>
                                                )}
                                                {nurse.chatConsult && (
                                                    <span className="inline-flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-full text-[8px] sm:text-xs font-medium shadow-sm hover:scale-105 transition-transform">
                                                        <MessageCircle className="w-2 h-2 sm:w-3 sm:h-3" />
                                                        <span className="hidden sm:inline">Chat</span>
                                                    </span>
                                                )}
                                                {nurse.homeVisit && (
                                                    <span className="inline-flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 bg-purple-50 text-purple-600 rounded-full text-[8px] sm:text-xs font-medium shadow-sm hover:scale-105 transition-transform">
                                                        <Hospital className="w-2 h-2 sm:w-3 sm:h-3" />
                                                        <span className="hidden sm:inline">Home Visit</span>
                                                    </span>
                                                )}
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex gap-1 sm:gap-2">
                                                <button className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-semibold hover:shadow-lg transition-all duration-500 flex items-center justify-center gap-1 hover:scale-105">
                                                    <Video className="w-3 h-3 sm:w-4 sm:h-4" />
                                                    <span className="hidden sm:inline">Video Call</span>
                                                </button>
                                                <button className="flex-1 border border-emerald-600 text-emerald-600 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-semibold hover:bg-emerald-50 transition-colors flex items-center justify-center gap-1 hover:scale-105">
                                                    <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                                                    <span className="hidden sm:inline">Chat</span>
                                                </button>
                                                <button className="p-1.5 sm:p-2 border border-slate-200 rounded-lg sm:rounded-xl hover:bg-slate-50 transition-colors hover:scale-105">
                                                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-slate-600" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>

                    {/* Load More Button */}
                    {activeTab === "dokter" && visibleDoctors < filteredDoctors.length && (
                        <div className="text-center mt-6 sm:mt-8">
                            <button
                                onClick={() => setVisibleDoctors(prev => prev + 4)}
                                className="bg-white border border-emerald-600 text-emerald-600 px-6 sm:px-8 py-2 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold hover:bg-emerald-50 transition-all duration-500 hover:scale-105 hover:shadow-lg"
                            >
                                Muat Lebih Banyak ({filteredDoctors.length - visibleDoctors} dokter)
                            </button>
                        </div>
                    )}

                    {activeTab === "perawat" && visibleNurses < filteredNurses.length && (
                        <div className="text-center mt-6 sm:mt-8">
                            <button
                                onClick={() => setVisibleNurses(prev => prev + 4)}
                                className="bg-white border border-blue-600 text-blue-600 px-6 sm:px-8 py-2 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold hover:bg-blue-50 transition-all duration-500 hover:scale-105 hover:shadow-lg"
                            >
                                Muat Lebih Banyak ({filteredNurses.length - visibleNurses} perawat)
                            </button>
                        </div>
                    )}

                    {/* No Results */}
                    {activeTab === "dokter" && filteredDoctors.length === 0 && (
                        <div className="text-center py-8 sm:py-12">
                            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-slate-100 rounded-full mb-3 sm:mb-4">
                                <Search className="w-6 h-6 sm:w-8 sm:h-8 text-slate-400" />
                            </div>
                            <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-1 sm:mb-2">Dokter Tidak Ditemukan</h3>
                            <p className="text-xs sm:text-sm text-slate-500">Coba gunakan kata kunci atau filter yang berbeda</p>
                        </div>
                    )}

                    {activeTab === "perawat" && filteredNurses.length === 0 && (
                        <div className="text-center py-8 sm:py-12">
                            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-slate-100 rounded-full mb-3 sm:mb-4">
                                <Search className="w-6 h-6 sm:w-8 sm:h-8 text-slate-400" />
                            </div>
                            <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-1 sm:mb-2">Perawat Tidak Ditemukan</h3>
                            <p className="text-xs sm:text-sm text-slate-500">Coba gunakan kata kunci atau filter yang berbeda</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Modal Detail Dokter */}
            <AnimatePresence>
                {selectedDoctor && (
                    <div className="fixed inset-0 z-50 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                            <div
                                className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                                onClick={() => setSelectedDoctor(null)}
                            />

                            <div
                                className="inline-block align-bottom bg-white rounded-2xl sm:rounded-3xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl w-full"
                            >
                                {/* Header Image */}
                                <div className="relative h-48 sm:h-56 md:h-64 bg-gradient-to-br from-slate-200 to-slate-300">
                                    {selectedDoctor.image ? (
                                        <div
                                            className="absolute inset-0 bg-cover bg-center"
                                            style={{ backgroundImage: `url(${selectedDoctor.image})` }}
                                        >
                                            <div className={`absolute inset-0 bg-gradient-to-t ${selectedDoctor.color} opacity-80`} />
                                        </div>
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/80 backdrop-blur flex items-center justify-center">
                                                <Stethoscope className="w-10 h-10 sm:w-12 sm:h-12 text-slate-400" />
                                            </div>
                                        </div>
                                    )}

                                    <button
                                        onClick={() => setSelectedDoctor(null)}
                                        className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-white/20 backdrop-blur p-1.5 sm:p-2 rounded-full hover:bg-white/30 transition-colors z-10"
                                    >
                                        <X className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                    </button>

                                    {/* Doctor Info Overlay */}
                                    <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 text-white z-10">
                                        <div className="flex items-center gap-2 mb-1 sm:mb-2">
                                            <span className={`inline-flex items-center gap-1 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold ${selectedDoctor.available
                                                    ? "bg-green-500"
                                                    : "bg-orange-500"
                                                }`}>
                                                <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-white animate-pulse" />
                                                {selectedDoctor.available ? "Tersedia" : "Sedang Sibuk"}
                                            </span>
                                            <span className={`inline-block px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold bg-gradient-to-r ${selectedDoctor.color}`}>
                                                {selectedDoctor.badge}
                                            </span>
                                            {selectedDoctor.verified && (
                                                <span className="inline-flex items-center gap-1 px-2 sm:px-3 py-0.5 sm:py-1 bg-blue-500 rounded-full text-[10px] sm:text-xs font-semibold">
                                                    <CheckCircle className="w-3 h-3" />
                                                    Terverifikasi
                                                </span>
                                            )}
                                        </div>
                                        <h2 className="text-base sm:text-lg md:text-2xl font-bold mb-0.5 sm:mb-1">{selectedDoctor.name}</h2>
                                        <p className="text-xs sm:text-sm text-white/90">{selectedDoctor.subSpecialty}</p>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-4 sm:p-5 md:p-6 max-h-[60vh] overflow-y-auto">
                                    {/* Quick Stats */}
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-4 sm:mb-5 md:mb-6">
                                        <div className="text-center p-2 sm:p-3 bg-slate-50 rounded-lg sm:rounded-xl">
                                            <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 mx-auto mb-1" />
                                            <div className="text-[10px] sm:text-xs text-slate-500">Pengalaman</div>
                                            <div className="text-xs sm:text-sm font-semibold">{selectedDoctor.experienceYears}</div>
                                        </div>
                                        <div className="text-center p-2 sm:p-3 bg-slate-50 rounded-lg sm:rounded-xl">
                                            <Users className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 mx-auto mb-1" />
                                            <div className="text-[10px] sm:text-xs text-slate-500">Pasien</div>
                                            <div className="text-xs sm:text-sm font-semibold">{selectedDoctor.patients}</div>
                                        </div>
                                        <div className="text-center p-2 sm:p-3 bg-slate-50 rounded-lg sm:rounded-xl">
                                            <Star className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 mx-auto mb-1" />
                                            <div className="text-[10px] sm:text-xs text-slate-500">Rating</div>
                                            <div className="text-xs sm:text-sm font-semibold">{selectedDoctor.rating} ({selectedDoctor.reviewCount})</div>
                                        </div>
                                        <div className="text-center p-2 sm:p-3 bg-slate-50 rounded-lg sm:rounded-xl">
                                            <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 mx-auto mb-1" />
                                            <div className="text-[10px] sm:text-xs text-slate-500">Biaya</div>
                                            <div className="text-xs sm:text-sm font-semibold">Rp {selectedDoctor.price.toLocaleString('id-ID')}</div>
                                        </div>
                                    </div>

                                    {/* Contact Info */}
                                    <div className="mb-4 sm:mb-5 md:mb-6 p-3 sm:p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl">
                                        <h3 className="font-semibold text-slate-900 mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                                            <PhoneCall className="w-4 h-4 text-emerald-600" />
                                            Kontak & Informasi
                                        </h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                                            {selectedDoctor.phone && (
                                                <div className="flex items-center gap-2 text-xs sm:text-sm">
                                                    <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600" />
                                                    <span>{selectedDoctor.phone}</span>
                                                </div>
                                            )}
                                            {selectedDoctor.email && (
                                                <div className="flex items-center gap-2 text-xs sm:text-sm">
                                                    <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600" />
                                                    <span className="truncate">{selectedDoctor.email}</span>
                                                </div>
                                            )}
                                            {selectedDoctor.registrationNumber && (
                                                <div className="flex items-center gap-2 text-xs sm:text-sm">
                                                    <ShieldCheck className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600" />
                                                    <span>STR: {selectedDoctor.registrationNumber}</span>
                                                </div>
                                            )}
                                            {selectedDoctor.languages && (
                                                <div className="flex items-center gap-2 text-xs sm:text-sm">
                                                    <Globe className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600" />
                                                    <span>{selectedDoctor.languages.join(', ')}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* About */}
                                    <div className="mb-4 sm:mb-5 md:mb-6">
                                        <h3 className="font-semibold text-slate-900 mb-2 flex items-center gap-2 text-sm sm:text-base">
                                            <User className="w-4 h-4 text-emerald-600" />
                                            Tentang Dokter
                                        </h3>
                                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{selectedDoctor.about}</p>
                                    </div>

                                    {/* Achievements */}
                                    <div className="mb-4 sm:mb-5 md:mb-6">
                                        <h3 className="font-semibold text-slate-900 mb-2 flex items-center gap-2 text-sm sm:text-base">
                                            <Award className="w-4 h-4 text-yellow-600" />
                                            Pencapaian & Sertifikasi
                                        </h3>
                                        <ul className="space-y-1 sm:space-y-2">
                                            {selectedDoctor.achievements.map((achievement, i) => (
                                                <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600">
                                                    <Award className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                                                    {achievement}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Education */}
                                    <div className="mb-4 sm:mb-5 md:mb-6">
                                        <h3 className="font-semibold text-slate-900 mb-2 flex items-center gap-2 text-sm sm:text-base">
                                            <GraduationCap className="w-4 h-4 text-emerald-600" />
                                            Pendidikan
                                        </h3>
                                        <ul className="space-y-1 sm:space-y-2">
                                            {selectedDoctor.education.map((edu, i) => (
                                                <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600">
                                                    <GraduationCap className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                                                    {edu}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Hospital & Schedule */}
                                    <div className="mb-4 sm:mb-5 md:mb-6 p-3 sm:p-4 bg-slate-50 rounded-xl">
                                        <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2 text-sm sm:text-base">
                                            <Hospital className="w-4 h-4 text-emerald-600" />
                                            Lokasi & Jadwal
                                        </h3>

                                        <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4">
                                            {selectedDoctor.branches ? (
                                                <div className="flex items-start gap-2">
                                                    <Building className="w-3 h-3 sm:w-4 sm:h-4 text-slate-400 flex-shrink-0 mt-1" />
                                                    <div className="flex flex-wrap gap-1">
                                                        {selectedDoctor.branches.map((branch, i) => (
                                                            <span key={i} className="inline-block px-2 py-1 bg-white rounded-lg text-[10px] sm:text-xs font-medium shadow-sm">
                                                                {branch}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2">
                                                    <Building className="w-3 h-3 sm:w-4 sm:h-4 text-slate-400" />
                                                    <span className="text-xs sm:text-sm text-slate-600">{selectedDoctor.hospital}</span>
                                                </div>
                                            )}

                                            <div className="flex items-center gap-2">
                                                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-slate-400" />
                                                <span className="text-xs sm:text-sm text-slate-600">{selectedDoctor.location}</span>
                                            </div>
                                        </div>

                                        <h4 className="text-xs sm:text-sm font-medium mb-2">Jadwal Praktek</h4>
                                        <div className="space-y-1 sm:space-y-2">
                                            {selectedDoctor.schedule.map((sched, i) => (
                                                <div key={i} className="flex items-center justify-between text-xs sm:text-sm">
                                                    <span className="text-slate-600">{sched.day}</span>
                                                    <span className="font-medium">{sched.hours}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-3 flex items-center gap-2 text-xs sm:text-sm text-emerald-600 bg-emerald-50 p-2 rounded-lg">
                                            <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                                            {selectedDoctor.nextAvailable}
                                        </div>
                                    </div>

                                    {/* Consultation Types */}
                                    {selectedDoctor.consultationTypes && (
                                        <div className="mb-4 sm:mb-5 md:mb-6">
                                            <h3 className="font-semibold text-slate-900 mb-2 flex items-center gap-2 text-sm sm:text-base">
                                                <Video className="w-4 h-4 text-emerald-600" />
                                                Jenis Konsultasi
                                            </h3>
                                            <div className="flex flex-wrap gap-1 sm:gap-2">
                                                {selectedDoctor.consultationTypes.map((type, i) => (
                                                    <span key={i} className="px-2 sm:px-3 py-1 bg-slate-100 rounded-full text-[10px] sm:text-xs text-slate-600">
                                                        {type}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Action Buttons */}
                                    <div className="flex gap-2 sm:gap-3 mt-4 sm:mt-5 md:mt-6">
                                        <button className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold hover:shadow-lg transition-all duration-500 flex items-center justify-center gap-2 hover:scale-105">
                                            <Video className="w-4 h-4 sm:w-5 sm:h-5" />
                                            Video Call
                                        </button>
                                        <button className="flex-1 bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 hover:scale-105">
                                            <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                                            Chat
                                        </button>
                                        <button className="p-2 sm:p-3 border border-slate-200 rounded-lg sm:rounded-xl hover:bg-slate-50 transition-colors hover:scale-105">
                                            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </AnimatePresence>

            {/* Modal Detail Perawat */}
            <AnimatePresence>
                {selectedNurse && (
                    <div className="fixed inset-0 z-50 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                            <div
                                className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                                onClick={() => setSelectedNurse(null)}
                            />

                            <div
                                className="inline-block align-bottom bg-white rounded-2xl sm:rounded-3xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl w-full"
                            >
                                {/* Header Image */}
                                <div className="relative h-48 sm:h-56 md:h-64 bg-gradient-to-br from-slate-200 to-slate-300">
                                    {selectedNurse.image ? (
                                        <div
                                            className="absolute inset-0 bg-cover bg-center"
                                            style={{ backgroundImage: `url(${selectedNurse.image})` }}
                                        >
                                            <div className={`absolute inset-0 bg-gradient-to-t ${selectedNurse.color} opacity-80`} />
                                        </div>
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/80 backdrop-blur flex items-center justify-center">
                                                <UserRound className="w-10 h-10 sm:w-12 sm:h-12 text-slate-400" />
                                            </div>
                                        </div>
                                    )}

                                    <button
                                        onClick={() => setSelectedNurse(null)}
                                        className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-white/20 backdrop-blur p-1.5 sm:p-2 rounded-full hover:bg-white/30 transition-colors z-10"
                                    >
                                        <X className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                    </button>

                                    {/* Nurse Info Overlay */}
                                    <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 text-white z-10">
                                        <div className="flex items-center gap-2 mb-1 sm:mb-2">
                                            <span className={`inline-flex items-center gap-1 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold ${selectedNurse.available
                                                    ? "bg-green-500"
                                                    : "bg-orange-500"
                                                }`}>
                                                <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-white animate-pulse" />
                                                {selectedNurse.available ? "Tersedia" : "Sedang Sibuk"}
                                            </span>
                                            <span className={`inline-block px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold bg-gradient-to-r ${selectedNurse.color}`}>
                                                {selectedNurse.badge}
                                            </span>
                                            {selectedNurse.verified && (
                                                <span className="inline-flex items-center gap-1 px-2 sm:px-3 py-0.5 sm:py-1 bg-blue-500 rounded-full text-[10px] sm:text-xs font-semibold">
                                                    <CheckCircle className="w-3 h-3" />
                                                    Terverifikasi
                                                </span>
                                            )}
                                        </div>
                                        <h2 className="text-base sm:text-lg md:text-2xl font-bold mb-0.5 sm:mb-1">{selectedNurse.name}</h2>
                                        <p className="text-xs sm:text-sm text-white/90">{selectedNurse.subSpecialty}</p>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-4 sm:p-5 md:p-6 max-h-[60vh] overflow-y-auto">
                                    {/* Quick Stats */}
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-4 sm:mb-5 md:mb-6">
                                        <div className="text-center p-2 sm:p-3 bg-slate-50 rounded-lg sm:rounded-xl">
                                            <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 mx-auto mb-1" />
                                            <div className="text-[10px] sm:text-xs text-slate-500">Pengalaman</div>
                                            <div className="text-xs sm:text-sm font-semibold">{selectedNurse.experienceYears}</div>
                                        </div>
                                        <div className="text-center p-2 sm:p-3 bg-slate-50 rounded-lg sm:rounded-xl">
                                            <Users className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 mx-auto mb-1" />
                                            <div className="text-[10px] sm:text-xs text-slate-500">Pasien</div>
                                            <div className="text-xs sm:text-sm font-semibold">{selectedNurse.patients}</div>
                                        </div>
                                        <div className="text-center p-2 sm:p-3 bg-slate-50 rounded-lg sm:rounded-xl">
                                            <Star className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 mx-auto mb-1" />
                                            <div className="text-[10px] sm:text-xs text-slate-500">Rating</div>
                                            <div className="text-xs sm:text-sm font-semibold">{selectedNurse.rating} ({selectedNurse.reviewCount})</div>
                                        </div>
                                        <div className="text-center p-2 sm:p-3 bg-slate-50 rounded-lg sm:rounded-xl">
                                            <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 mx-auto mb-1" />
                                            <div className="text-[10px] sm:text-xs text-slate-500">Biaya</div>
                                            <div className="text-xs sm:text-sm font-semibold">Rp {selectedNurse.price.toLocaleString('id-ID')}</div>
                                        </div>
                                    </div>

                                    {/* Contact Info */}
                                    <div className="mb-4 sm:mb-5 md:mb-6 p-3 sm:p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl">
                                        <h3 className="font-semibold text-slate-900 mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                                            <PhoneCall className="w-4 h-4 text-emerald-600" />
                                            Kontak & Informasi
                                        </h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                                            {selectedNurse.phone && (
                                                <div className="flex items-center gap-2 text-xs sm:text-sm">
                                                    <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600" />
                                                    <span>{selectedNurse.phone}</span>
                                                </div>
                                            )}
                                            {selectedNurse.email && (
                                                <div className="flex items-center gap-2 text-xs sm:text-sm">
                                                    <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600" />
                                                    <span className="truncate">{selectedNurse.email}</span>
                                                </div>
                                            )}
                                            {selectedNurse.registrationNumber && (
                                                <div className="flex items-center gap-2 text-xs sm:text-sm">
                                                    <ShieldCheck className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600" />
                                                    <span>STR: {selectedNurse.registrationNumber}</span>
                                                </div>
                                            )}
                                            {selectedNurse.languages && (
                                                <div className="flex items-center gap-2 text-xs sm:text-sm">
                                                    <Globe className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600" />
                                                    <span>{selectedNurse.languages.join(', ')}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* About */}
                                    <div className="mb-4 sm:mb-5 md:mb-6">
                                        <h3 className="font-semibold text-slate-900 mb-2 flex items-center gap-2 text-sm sm:text-base">
                                            <User className="w-4 h-4 text-emerald-600" />
                                            Tentang Perawat
                                        </h3>
                                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{selectedNurse.about}</p>
                                    </div>

                                    {/* Certifications */}
                                    <div className="mb-4 sm:mb-5 md:mb-6">
                                        <h3 className="font-semibold text-slate-900 mb-2 flex items-center gap-2 text-sm sm:text-base">
                                            <Award className="w-4 h-4 text-yellow-600" />
                                            Sertifikasi
                                        </h3>
                                        <ul className="space-y-1 sm:space-y-2">
                                            {selectedNurse.certifications.map((cert, i) => (
                                                <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600">
                                                    <Award className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                                                    {cert}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Education */}
                                    <div className="mb-4 sm:mb-5 md:mb-6">
                                        <h3 className="font-semibold text-slate-900 mb-2 flex items-center gap-2 text-sm sm:text-base">
                                            <GraduationCap className="w-4 h-4 text-emerald-600" />
                                            Pendidikan
                                        </h3>
                                        <ul className="space-y-1 sm:space-y-2">
                                            {selectedNurse.education.map((edu, i) => (
                                                <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600">
                                                    <GraduationCap className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                                                    {edu}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Hospital & Schedule */}
                                    <div className="mb-4 sm:mb-5 md:mb-6 p-3 sm:p-4 bg-slate-50 rounded-xl">
                                        <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2 text-sm sm:text-base">
                                            <Hospital className="w-4 h-4 text-emerald-600" />
                                            Lokasi & Jadwal
                                        </h3>

                                        <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4">
                                            {selectedNurse.branches ? (
                                                <div className="flex items-start gap-2">
                                                    <Building className="w-3 h-3 sm:w-4 sm:h-4 text-slate-400 flex-shrink-0 mt-1" />
                                                    <div className="flex flex-wrap gap-1">
                                                        {selectedNurse.branches.map((branch, i) => (
                                                            <span key={i} className="inline-block px-2 py-1 bg-white rounded-lg text-[10px] sm:text-xs font-medium shadow-sm">
                                                                {branch}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2">
                                                    <Building className="w-3 h-3 sm:w-4 sm:h-4 text-slate-400" />
                                                    <span className="text-xs sm:text-sm text-slate-600">{selectedNurse.hospital}</span>
                                                </div>
                                            )}

                                            <div className="flex items-center gap-2">
                                                <MapPinned className="w-3 h-3 sm:w-4 sm:h-4 text-slate-400" />
                                                <span className="text-xs sm:text-sm text-slate-600">
                                                    Area Layanan: {selectedNurse.serviceArea?.join(', ')}
                                                </span>
                                            </div>
                                        </div>

                                        <h4 className="text-xs sm:text-sm font-medium mb-2">Jadwal Praktik</h4>
                                        <div className="space-y-1 sm:space-y-2">
                                            {selectedNurse.schedule.map((sched, i) => (
                                                <div key={i} className="flex items-center justify-between text-xs sm:text-sm">
                                                    <span className="text-slate-600">{sched.day}</span>
                                                    <span className="font-medium">{sched.hours}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-3 flex items-center gap-2 text-xs sm:text-sm text-emerald-600 bg-emerald-50 p-2 rounded-lg">
                                            <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                                            {selectedNurse.nextAvailable}
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-2 sm:gap-3 mt-4 sm:mt-5 md:mt-6">
                                        <button className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold hover:shadow-lg transition-all duration-500 flex items-center justify-center gap-2 hover:scale-105">
                                            <Video className="w-4 h-4 sm:w-5 sm:h-5" />
                                            Video Call
                                        </button>
                                        <button className="flex-1 bg-emerald-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 hover:scale-105">
                                            <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                                            Chat
                                        </button>
                                        <button className="p-2 sm:p-3 border border-slate-200 rounded-lg sm:rounded-xl hover:bg-slate-50 transition-colors hover:scale-105">
                                            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </AnimatePresence>

            {/* Why Choose Us Section */}
            <section ref={el => { sectionRefs.current[1] = el; }} data-index="1" className="py-10 sm:py-12 md:py-16 px-4 sm:px-6 bg-white">
                <div className={`max-w-7xl mx-auto ${fadeInUpClass(1)}`}>
                    <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-12">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 md:mb-4">Mengapa Memilih Tim Medis Kami?</h2>
                        <p className="text-xs sm:text-sm md:text-base text-slate-500">Tenaga medis profesional dengan pengalaman dan kredibilitas terjamin</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
                        {[
                            { icon: <Award className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />, title: "Terlisensi", desc: "Semua tenaga medis memiliki lisensi resmi dan terdaftar" },
                            { icon: <Users className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />, title: "Berpengalaman", desc: "Rata-rata pengalaman 8+ tahun di bidangnya" },
                            { icon: <Shield className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />, title: "Terpercaya", desc: "99% pasien puas dengan layanan konsultasi" },
                            { icon: <Clock className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />, title: "Responsif", desc: "Respon cepat 24/7 untuk kebutuhan darurat" }
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="text-center p-4 sm:p-5 md:p-6 bg-slate-50 rounded-xl sm:rounded-2xl hover:shadow-xl transition-all duration-500 group hover:-translate-y-1"
                            >
                                <div className="inline-flex p-2 sm:p-3 md:p-4 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl sm:rounded-2xl text-white mb-2 sm:mb-3 md:mb-4 group-hover:scale-110 transition-transform">
                                    {item.icon}
                                </div>
                                <h3 className="text-sm sm:text-base md:text-lg font-bold mb-1 sm:mb-2">{item.title}</h3>
                                <p className="text-xs sm:text-sm text-slate-500">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-10 sm:py-12 md:py-16 px-4 sm:px-6 bg-gradient-to-br from-emerald-600 to-teal-600 text-white relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse-slow"></div>
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse-slow animation-delay-2000"></div>
                </div>

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 md:mb-4">
                        Butuh Bantuan Memilih Tenaga Medis?
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg mb-6 sm:mb-8 text-white/90">
                        Tim kami siap membantu Anda menemukan dokter atau perawat yang tepat sesuai dengan kebutuhan kesehatan Anda
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                        <button className="bg-white text-emerald-600 px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-lg sm:rounded-xl text-xs sm:text-sm md:text-base font-bold hover:shadow-2xl transition-all duration-500 flex items-center justify-center gap-2 hover:scale-105">
                            <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span>Hubungi Kami</span>
                        </button>
                        <button className="border border-white text-white px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-lg sm:rounded-xl text-xs sm:text-sm md:text-base font-bold hover:bg-white/10 transition-all duration-500 flex items-center justify-center gap-2 hover:scale-105">
                            <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span>Kirim Pesan</span>
                        </button>
                    </div>
                </div>
            </section>

            {/* Scroll to Top Button */}
            {showScrollTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 z-50 p-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                >
                    <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
            )}

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