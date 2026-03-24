"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import FloatingChat from "@/components/FloatingChat";
import {
    Search, Filter, ChevronRight, ChevronLeft, X, ArrowRight, ChevronUp,
    Video, MessageCircle, Phone, Mail, Calendar,
    Stethoscope, HeartPulse, Bandage, Heart, Bone, Eye, Brain,
    Activity, Microscope, FlaskConical, Lungs, Droplets,
    Star, Clock, Users, Award, MapPin, GraduationCap,
    Sparkles, CheckCircle, Shield, BookOpen, FileText,
    ThumbsUp, Share2, Bookmark, User, Briefcase, Hospital,
    Wifi, WifiOff, CircleCheck, CircleAlert,
    Building, MapPinned,
    Scissors, Syringe, Pill, Ambulance,
    UserRound, UserCog, UsersRound, HeartHandshake,
    CreditCard, Globe, Languages, MailCheck, PhoneCall,
    CalendarDays, Clock3, Medal, Target, TrendingUp,
    Zap, ShieldCheck, Lock, Eye as EyeIcon
} from "lucide-react";

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
    nextAvailable: string;
    verified: boolean;
    ratingCount: number;
    consultationTypes?: string[];
    registrationNumber?: string;
    email?: string;
    phone?: string;
}

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
    nextAvailable: string;
    verified: boolean;
    ratingCount: number;
    serviceArea?: string[];
    registrationNumber?: string;
    email?: string;
    phone?: string;
}

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
    const [visibleDoctors, setVisibleDoctors] = useState(9);
    const [visibleNurses, setVisibleNurses] = useState(9);
    const [activeTab, setActiveTab] = useState<"dokter" | "perawat">("dokter");
    const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const sectionRefs = useRef<(HTMLElement | null)[]>([]);

    // State untuk kontrol modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState<"dokter" | "perawat" | null>(null);
    const modalTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        setIsClient(true);
    }, []);

    // Cleanup timeout dan restore scroll
    useEffect(() => {
        return () => {
            if (modalTimeoutRef.current) {
                clearTimeout(modalTimeoutRef.current);
            }
            document.body.style.overflow = '';
        };
    }, []);

    // Fungsi untuk membuka modal dokter
    const openDoctorModal = (doctor: Doctor) => {
        if (modalTimeoutRef.current) {
            clearTimeout(modalTimeoutRef.current);
        }
        setModalType("dokter");
        setSelectedDoctor(doctor);
        setIsModalOpen(true);
        document.body.style.overflow = 'hidden';
    };

    // Fungsi untuk membuka modal perawat
    const openNurseModal = (nurse: Nurse) => {
        if (modalTimeoutRef.current) {
            clearTimeout(modalTimeoutRef.current);
        }
        setModalType("perawat");
        setSelectedNurse(nurse);
        setIsModalOpen(true);
        document.body.style.overflow = 'hidden';
    };

    // Fungsi untuk menutup modal
    const closeModal = () => {
        setIsModalOpen(false);
        document.body.style.overflow = '';
        modalTimeoutRef.current = setTimeout(() => {
            setSelectedDoctor(null);
            setSelectedNurse(null);
            setModalType(null);
        }, 200);
    };

    const heroSlides = [
        {
            id: 1,
            image: "/images/hero/hero-dokter-1.jpg",
            title: "Konsultasi dengan Tenaga Kesehatan Profesional",
            subtitle: "Lebih dari 50 dokter spesialis dan 30 perawat terlatih siap membantu kesehatan Anda dan keluarga"
        },
        {
            id: 2,
            image: "/images/hero/hero-dokter-2.jpg",
            title: "Perawatan Pasca Operasi Profesional",
            subtitle: "Tim medis berpengalaman siap mendampingi pemulihan Anda dengan perawatan komprehensif"
        },
        {
            id: 3,
            image: "/images/hero/hero-dokter-3.jpg",
            title: "Layanan 24/7 untuk Kesehatan Lansia",
            subtitle: "Konsultasi kapan saja dengan tim medis spesialis penyakit dalam, geriatri, dan perawatan lansia"
        }
    ];

    useEffect(() => {
        if (!isClient) return;
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [heroSlides.length, isClient]);

    useEffect(() => {
        if (!isClient) return;
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 500);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isClient]);

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

    // Dark green color scheme
    const darkGreen = "from-[#1e3a2f] to-[#2d5a45]";
    const darkGreenSolid = "bg-[#1e3a2f]";

    const specialties: Specialty[] = [
        { id: "semua", name: "Semua Spesialis", icon: <Stethoscope className="w-4 h-4" />, color: darkGreen, count: 5 },
        { id: "jantung", name: "Jantung", icon: <Heart className="w-4 h-4" />, color: darkGreen, count: 1 },
        { id: "ortopedi", name: "Ortopedi", icon: <Bone className="w-4 h-4" />, color: darkGreen, count: 2 },
        { id: "mata", name: "Mata", icon: <Eye className="w-4 h-4" />, color: darkGreen, count: 3 },
        { id: "gigi", name: "Gigi", icon: <Sparkles className="w-4 h-4" />, color: darkGreen, count: 4 },
        { id: "anak", name: "Anak", icon: <Activity className="w-4 h-4" />, color: darkGreen, count: 4 },
        { id: "gizi", name: "Gizi Klinik", icon: <FlaskConical className="w-4 h-4" />, color: darkGreen, count: 2 }
    ];

    const nurseSpecialties: Specialty[] = [
        { id: "semua", name: "Semua Perawat", icon: <UserRound className="w-4 h-4" />, color: darkGreen, count: 30 },
        { id: "lansia", name: "Perawat Lansia", icon: <HeartHandshake className="w-4 h-4" />, color: darkGreen, count: 12 },
        { id: "pasca-operasi", name: "Perawat Pasca Operasi", icon: <Bandage className="w-4 h-4" />, color: darkGreen, count: 8 },
        { id: "luka", name: "Perawat Luka", icon: <Scissors className="w-4 h-4" />, color: darkGreen, count: 5 },
        { id: "infus", name: "Perawat Infus", icon: <Syringe className="w-4 h-4" />, color: darkGreen, count: 3 },
        { id: "homecare", name: "Homecare", icon: <Hospital className="w-4 h-4" />, color: darkGreen, count: 6 }
    ];

    const experienceLevels = [
        { id: "semua", name: "Semua Pengalaman" },
        { id: "1-3", name: "1-3 Tahun" },
        { id: "3-5", name: "3-5 Tahun" },
        { id: "5-10", name: "5-10 Tahun" },
        { id: "10+", name: "10+ Tahun" }
    ];

    const priceRanges = [
        { id: "semua", name: "Semua Harga" },
        { id: "0-150", name: "< Rp 150K" },
        { id: "150-250", name: "Rp 150K - 250K" },
        { id: "250-350", name: "Rp 250K - 350K" },
        { id: "350+", name: "> Rp 350K" }
    ];

    const doctors: Doctor[] = [
        {
            id: 101,
            name: "drg. Agia Tessa Andriani, M.Kes., Sp.Ort",
            specialty: "gigi",
            specialtyName: "Gigi",
            subSpecialty: "Spesialis Orthodonti",
            experience: 10,
            experienceYears: "10 tahun",
            patients: "1.200+",
            rating: 4.9,
            reviewCount: 187,
            price: 300000,
            image: "/images/dokter/dokter-gigi-1.jpg",
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
            color: darkGreen,
            badge: "Spesialis Orthodonti",
            available: true,
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
            subSpecialty: "Spesialis Konservasi Gigi",
            experience: 8,
            experienceYears: "8 tahun",
            patients: "900+",
            rating: 4.8,
            reviewCount: 145,
            price: 275000,
            image: "/images/dokter/dokter-gigi-2.jpg",
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
            color: darkGreen,
            badge: "Spesialis Konservasi Gigi",
            available: true,
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
            subSpecialty: "Spesialis Konservasi Gigi",
            experience: 12,
            experienceYears: "12 tahun",
            patients: "1.500+",
            rating: 4.9,
            reviewCount: 234,
            price: 325000,
            image: "/images/dokter/dokter-gigi-3.jpg",
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
            color: darkGreen,
            badge: "Spesialis Konservasi Gigi",
            available: true,
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
            subSpecialty: "Spesialis Orthodonti",
            experience: 9,
            experienceYears: "9 tahun",
            patients: "1.100+",
            rating: 4.8,
            reviewCount: 167,
            price: 300000,
            image: "/images/dokter/dokter-gigi-4.jpg",
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
            color: darkGreen,
            badge: "Spesialis Orthodonti",
            available: false,
            nextAvailable: "Tersedia 2 Hari Lagi",
            verified: true,
            ratingCount: 167,
            consultationTypes: ["Online", "Offline"],
            registrationNumber: "12348/PDGI/2020",
            email: "agis.drg@example.com",
            phone: "+62 812-3456-7893"
        },
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
            image: "/images/dokter/dokter-1.jpg",
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
            about: "Spesialis penyakit dalam dengan fokus pada perawatan lansia dan manajemen penyakit kronis seperti diabetes, hipertensi, dan gangguan metabolik lainnya.",
            achievements: [
                "Best Geriatric Consultant 2023",
                "Peneliti Diabetes pada Lansia",
                "Anggota PERGEMI"
            ],
            languages: ["Indonesia", "Inggris", "Mandarin"],
            color: darkGreen,
            badge: "Konsultan Geriatri",
            available: true,
            nextAvailable: "Tersedia Hari Ini",
            verified: true,
            ratingCount: 325,
            consultationTypes: ["Online", "Offline"],
            registrationNumber: "12345/IDI/2015",
            email: "sarah.dr@example.com",
            phone: "+62 812-3456-7894"
        }
    ];

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
            image: "/images/perawat/perawat-1.jpg",
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
            about: "Perawat profesional dengan pengalaman merawat lansia dengan berbagai kondisi seperti pasca stroke, diabetes, dan demensia.",
            certifications: [
                "Sertifikasi Perawat Lansia",
                "Sertifikasi Perawatan Luka",
                "Basic Life Support (BLS)"
            ],
            languages: ["Indonesia", "Inggris", "Sunda"],
            color: darkGreen,
            badge: "Perawat Lansia",
            available: true,
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
            image: "/images/perawat/perawat-2.jpg",
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
            about: "Perawat spesialis perawatan pasca operasi dengan pengalaman menangani pasien bedah jantung, ortopedi, dan digestif.",
            certifications: [
                "Sertifikasi Perawatan Luka Operasi",
                "Sertifikasi Perawatan Intensif",
                "Basic Life Support (BLS)"
            ],
            languages: ["Indonesia", "Inggris"],
            color: darkGreen,
            badge: "Perawat Pasca Operasi",
            available: true,
            nextAvailable: "Tersedia Besok",
            verified: true,
            ratingCount: 89,
            serviceArea: ["Jakarta Selatan", "Jakarta Pusat"],
            registrationNumber: "12346/PPNI/2019",
            email: "ahmad.ns@example.com",
            phone: "+62 812-3456-7896"
        },
        {
            id: 203,
            name: "Ns. Maria Simanjuntak, S.Kep",
            specialty: "luka",
            specialtyName: "Perawat Luka",
            subSpecialty: "Spesialis Perawatan Luka & Stoma",
            experience: 10,
            experienceYears: "10 tahun",
            patients: "600+",
            rating: 4.9,
            reviewCount: 156,
            price: 225000,
            image: "/images/perawat/perawat-3.jpg",
            schedule: [
                { day: "Senin", hours: "09:00 - 21:00" },
                { day: "Selasa", hours: "09:00 - 21:00" },
                { day: "Rabu", hours: "09:00 - 21:00" },
                { day: "Kamis", hours: "09:00 - 21:00" },
                { day: "Jumat", hours: "09:00 - 21:00" }
            ],
            hospital: "Klinik Perawatan Luka",
            location: "Jakarta Timur",
            branches: ["Jakarta Timur", "Jakarta Utara"],
            education: [
                "Universitas Indonesia - Profesi Ners",
                "Politeknik Kesehatan - D3 Keperawatan"
            ],
            about: "Perawat spesialis perawatan luka dengan pengalaman menangani luka akut, luka kronis, luka diabetes, dan luka tekan.",
            certifications: [
                "Sertifikasi Perawatan Luka (ETN)",
                "Sertifikasi Perawatan Stoma",
                "Advanced Wound Care"
            ],
            languages: ["Indonesia", "Inggris", "Batak"],
            color: darkGreen,
            badge: "Spesialis Perawatan Luka",
            available: true,
            nextAvailable: "Tersedia Hari Ini",
            verified: true,
            ratingCount: 156,
            serviceArea: ["Jakarta Timur", "Jakarta Utara", "Jakarta Pusat"],
            registrationNumber: "12347/PPNI/2017",
            email: "maria.ns@example.com",
            phone: "+62 812-3456-7897"
        }
    ];

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

    const resetFilters = () => {
        setSelectedExperience("semua");
        setSelectedPrice("semua");
        setSelectedSpecialty("semua");
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (!isClient) {
        return (
            <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
                <Navbar />
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-[#1e3a2f] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-slate-600">Memuat...</p>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
            <Navbar />

            {/* Hero Section */}
            <section className="relative h-[600px] sm:h-[650px] lg:h-[700px] flex items-center overflow-hidden">
                <div className="absolute inset-0">
                    {heroSlides.map((slide, index) => (
                        <div
                            key={slide.id}
                            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                                }`}
                        >
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{ backgroundImage: `url(${slide.image})` }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                            </div>
                        </div>
                    ))}
                    <div className="absolute top-20 right-20 w-96 h-96 bg-[#1e3a2f]/10 rounded-full blur-3xl animate-pulse-slow"></div>
                    <div className="absolute bottom-20 left-20 w-80 h-80 bg-[#2d5a45]/10 rounded-full blur-3xl animate-pulse-slow animation-delay-2000"></div>
                </div>

                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
                    {heroSlides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`transition-all duration-500 ${index === currentSlide
                                ? 'w-10 h-2 bg-[#1e3a2f]'
                                : 'w-2 h-2 bg-white/50 hover:bg-white/80'
                                } rounded-full`}
                        />
                    ))}
                </div>

                <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 w-full">
                    <div className="max-w-3xl text-white">
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6 animate-slide-up">
                            <Sparkles className="w-4 h-4" />
                            Tim Medis Profesional
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
                                placeholder="Cari dokter, perawat, spesialisasi, atau rumah sakit..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/90 backdrop-blur border border-white/50 focus:border-[#1e3a2f] focus:ring-2 focus:ring-[#1e3a2f]/20 outline-none transition-all shadow-lg text-slate-900"
                            />
                        </div>

                        <div className="flex flex-wrap gap-8 mt-12 animate-slide-up delay-500">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white">10+</div>
                                <div className="text-sm text-white/70">Dokter Spesialis</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white">10+</div>
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
            </section>

            {/* Info Cards */}
            <section className="py-8 sm:py-10 px-4 sm:px-6 -mt-6 sm:-mt-8 relative z-30">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                        {[
                            { icon: <Medal className="w-5 h-5 sm:w-6 sm:h-6" />, title: "Dokter Spesialis", value: "10+", desc: "Tersedia 24/7", bgColor: "bg-[#1e3a2f]/5" },
                            { icon: <HeartHandshake className="w-5 h-5 sm:w-6 sm:h-6" />, title: "Perawat Profesional", value: "10+", desc: "Berpengalaman", bgColor: "bg-[#1e3a2f]/5" },
                            { icon: <Target className="w-5 h-5 sm:w-6 sm:h-6" />, title: "Tingkat Kepuasan", value: "98%", desc: "Pasien puas", bgColor: "bg-[#1e3a2f]/5" },
                            { icon: <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />, title: "Konsultasi", value: "10K+", desc: "Per bulan", bgColor: "bg-[#1e3a2f]/5" }
                        ].map((item, i) => (
                            <div
                                key={i}
                                className={`${item.bgColor} rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 backdrop-blur-sm hover:-translate-y-1`}
                            >
                                <div className="flex items-center gap-3 sm:gap-4">
                                    <div className={`p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-[#1e3a2f] text-white shadow-lg`}>
                                        {item.icon}
                                    </div>
                                    <div>
                                        <p className="text-xs sm:text-sm text-slate-600">{item.title}</p>
                                        <p className="text-xl sm:text-2xl font-bold text-slate-900">{item.value}</p>
                                        <p className="text-[10px] sm:text-xs text-slate-500">{item.desc}</p>
                                    </div>
                                </div>
                                <div className="h-0.5 bg-gradient-to-r from-transparent via-[#1e3a2f]/30 to-transparent mt-2 animate-pulse" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tab Selector */}
            <section className="py-4 sm:py-6 px-4 sm:px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white/80 backdrop-blur-xl rounded-xl sm:rounded-2xl p-1 sm:p-2 shadow-xl border border-slate-200 inline-flex mx-auto">
                        <button
                            onClick={() => {
                                setActiveTab("dokter");
                                setSelectedSpecialty("semua");
                            }}
                            className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm ${activeTab === "dokter"
                                ? "bg-[#1e3a2f] text-white shadow-lg scale-105"
                                : "text-slate-600 hover:bg-[#1e3a2f]/10"
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
                                ? "bg-[#1e3a2f] text-white shadow-lg scale-105"
                                : "text-slate-600 hover:bg-[#1e3a2f]/10"
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
                            {(activeTab === "dokter" ? specialties : nurseSpecialties).map((specialty) => (
                                <button
                                    key={specialty.id}
                                    onClick={() => setSelectedSpecialty(specialty.id)}
                                    className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-full transition-all duration-300 text-xs sm:text-sm hover:scale-105 ${selectedSpecialty === specialty.id
                                        ? `bg-[#1e3a2f] text-white shadow-lg`
                                        : 'bg-white text-slate-600 hover:bg-[#1e3a2f]/10 hover:text-[#1e3a2f] border border-slate-200'
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
                                className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white border border-slate-200 rounded-lg sm:rounded-xl hover:bg-[#1e3a2f]/5 transition-colors text-xs sm:text-sm shadow-sm"
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
                            <select className="px-2 sm:px-3 py-1.5 sm:py-2 bg-white border border-slate-200 rounded-lg sm:rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a2f] shadow-sm">
                                <option>Rekomendasi</option>
                                <option>Rating Tertinggi</option>
                                <option>Pengalaman Terbanyak</option>
                                <option>Harga Terendah</option>
                                <option>Pasien Terbanyak</option>
                            </select>
                        </div>
                    </div>

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
                                        <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1 sm:mb-2">Pengalaman</label>
                                        <div className="flex flex-wrap gap-1 sm:gap-2">
                                            {experienceLevels.map((exp) => (
                                                <button
                                                    key={exp.id}
                                                    onClick={() => setSelectedExperience(exp.id)}
                                                    className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs transition-all hover:scale-105 ${selectedExperience === exp.id
                                                        ? 'bg-[#1e3a2f] text-white shadow-md'
                                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                                        }`}
                                                >
                                                    {exp.name}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1 sm:mb-2">Rentang Harga</label>
                                        <div className="flex flex-wrap gap-1 sm:gap-2">
                                            {priceRanges.map((price) => (
                                                <button
                                                    key={price.id}
                                                    onClick={() => setSelectedPrice(price.id)}
                                                    className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs transition-all hover:scale-105 ${selectedPrice === price.id
                                                        ? 'bg-[#1e3a2f] text-white shadow-md'
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

            {/* Cards Grid */}
            <section ref={el => { sectionRefs.current[0] = el; }} data-index="0" className="py-6 sm:py-8 px-4 sm:px-6">
                <div className={`max-w-7xl mx-auto ${fadeInUpClass(0)}`}>
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

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {activeTab === "dokter"
                            ? displayedDoctors.map((doctor) => (
                                <div
                                    key={doctor.id}
                                    className="group bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer border border-slate-100 hover:-translate-y-1"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        openDoctorModal(doctor);
                                    }}
                                >
                                    <div className="flex flex-col">
                                        <div className="relative h-48 sm:h-56 overflow-hidden bg-gradient-to-br from-slate-200 to-slate-300">
                                            {doctor.image ? (
                                                <div
                                                    className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                                                    style={{ backgroundImage: `url(${doctor.image})` }}
                                                />
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="w-20 h-20 rounded-full bg-white/80 backdrop-blur flex items-center justify-center shadow-lg">
                                                        <Stethoscope className="w-10 h-10 text-slate-400" />
                                                    </div>
                                                </div>
                                            )}

                                            <div className="absolute top-3 left-3 z-10 flex gap-2">
                                                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold shadow-md backdrop-blur-sm ${doctor.available
                                                    ? "bg-[#1e3a2f]/90 text-white"
                                                    : "bg-orange-500/90 text-white"
                                                    }`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${doctor.available ? "bg-white" : "bg-white"} animate-pulse`} />
                                                    {doctor.available ? "Tersedia" : "Sibuk"}
                                                </span>
                                                <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold bg-[#1e3a2f] text-white shadow-md`}>
                                                    {doctor.badge}
                                                </span>
                                            </div>

                                            {doctor.verified && (
                                                <div className="absolute top-3 right-3 z-10">
                                                    <span className="bg-[#1e3a2f]/90 backdrop-blur-sm text-white p-1.5 rounded-full shadow-lg">
                                                        <CheckCircle className="w-4 h-4" />
                                                    </span>
                                                </div>
                                            )}

                                            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 via-black/40 to-transparent">
                                                <h3 className="text-base font-bold leading-tight mb-1 text-white drop-shadow-lg">
                                                    {doctor.name.length > 35 ? doctor.name.substring(0, 35) + '...' : doctor.name}
                                                </h3>
                                                <p className="text-xs text-white/90 drop-shadow">
                                                    {doctor.subSpecialty}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="p-4">
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                                                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                                    <span className="text-xs font-bold">{doctor.rating}</span>
                                                    <span className="text-[10px] text-slate-500">({doctor.reviewCount})</span>
                                                </div>
                                                <div className="text-sm font-bold text-[#1e3a2f]">
                                                    Rp {doctor.price.toLocaleString('id-ID')}
                                                </div>
                                            </div>

                                            <div className="space-y-2 mb-3">
                                                <div className="flex items-center gap-2 text-xs">
                                                    <Building className="w-3 h-3 text-slate-400" />
                                                    <span className="text-slate-600 truncate">{doctor.hospital}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-xs">
                                                    <MapPin className="w-3 h-3 text-slate-400" />
                                                    <span className="text-slate-600">{doctor.location}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-xs">
                                                    <Users className="w-3 h-3 text-slate-400" />
                                                    <span className="text-slate-600">{doctor.patients} pasien</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-xs">
                                                    <Clock className="w-3 h-3 text-slate-400" />
                                                    <span className="text-slate-600">{doctor.experienceYears}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-[#1e3a2f]">
                                                    <Calendar className="w-3 h-3" />
                                                    <span className="font-medium">{doctor.nextAvailable}</span>
                                                </div>
                                            </div>

                                            <button
                                                className="w-full mt-2 py-2 px-4 bg-slate-50 hover:bg-[#1e3a2f]/10 text-slate-600 hover:text-[#1e3a2f] rounded-lg text-xs font-medium transition-colors duration-300 flex items-center justify-center gap-1"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    openDoctorModal(doctor);
                                                }}
                                            >
                                                <span>Lihat Detail</span>
                                                <ChevronRight className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                            : displayedNurses.map((nurse) => (
                                <div
                                    key={nurse.id}
                                    className="group bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer border border-slate-100 hover:-translate-y-1"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        openNurseModal(nurse);
                                    }}
                                >
                                    <div className="flex flex-col">
                                        <div className="relative h-48 sm:h-56 overflow-hidden bg-gradient-to-br from-slate-200 to-slate-300">
                                            {nurse.image ? (
                                                <div
                                                    className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                                                    style={{ backgroundImage: `url(${nurse.image})` }}
                                                />
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="w-20 h-20 rounded-full bg-white/80 backdrop-blur flex items-center justify-center shadow-lg">
                                                        <UserRound className="w-10 h-10 text-slate-400" />
                                                    </div>
                                                </div>
                                            )}

                                            <div className="absolute top-3 left-3 z-10 flex gap-2">
                                                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold shadow-md backdrop-blur-sm ${nurse.available
                                                    ? "bg-[#1e3a2f]/90 text-white"
                                                    : "bg-orange-500/90 text-white"
                                                    }`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${nurse.available ? "bg-white" : "bg-white"} animate-pulse`} />
                                                    {nurse.available ? "Tersedia" : "Sibuk"}
                                                </span>
                                                <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold bg-[#1e3a2f] text-white shadow-md`}>
                                                    {nurse.badge}
                                                </span>
                                            </div>

                                            {nurse.verified && (
                                                <div className="absolute top-3 right-3 z-10">
                                                    <span className="bg-[#1e3a2f]/90 backdrop-blur-sm text-white p-1.5 rounded-full shadow-lg">
                                                        <CheckCircle className="w-4 h-4" />
                                                    </span>
                                                </div>
                                            )}

                                            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 via-black/40 to-transparent">
                                                <h3 className="text-base font-bold leading-tight mb-1 text-white drop-shadow-lg">
                                                    {nurse.name.length > 35 ? nurse.name.substring(0, 35) + '...' : nurse.name}
                                                </h3>
                                                <p className="text-xs text-white/90 drop-shadow">
                                                    {nurse.subSpecialty}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="p-4">
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                                                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                                    <span className="text-xs font-bold">{nurse.rating}</span>
                                                    <span className="text-[10px] text-slate-500">({nurse.reviewCount})</span>
                                                </div>
                                                <div className="text-sm font-bold text-[#1e3a2f]">
                                                    Rp {nurse.price.toLocaleString('id-ID')}
                                                </div>
                                            </div>

                                            <div className="space-y-2 mb-3">
                                                <div className="flex items-center gap-2 text-xs">
                                                    <Building className="w-3 h-3 text-slate-400" />
                                                    <span className="text-slate-600 truncate">{nurse.hospital}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-xs">
                                                    <MapPinned className="w-3 h-3 text-slate-400" />
                                                    <span className="text-slate-600 truncate">{nurse.serviceArea?.slice(0, 2).join(', ')}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-xs">
                                                    <Users className="w-3 h-3 text-slate-400" />
                                                    <span className="text-slate-600">{nurse.patients} pasien</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-xs">
                                                    <Clock className="w-3 h-3 text-slate-400" />
                                                    <span className="text-slate-600">{nurse.experienceYears}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-[#1e3a2f]">
                                                    <Calendar className="w-3 h-3" />
                                                    <span className="font-medium">{nurse.nextAvailable}</span>
                                                </div>
                                            </div>

                                            <button
                                                className="w-full mt-2 py-2 px-4 bg-slate-50 hover:bg-[#1e3a2f]/10 text-slate-600 hover:text-[#1e3a2f] rounded-lg text-xs font-medium transition-colors duration-300 flex items-center justify-center gap-1"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    openNurseModal(nurse);
                                                }}
                                            >
                                                <span>Lihat Detail</span>
                                                <ChevronRight className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>

                    {activeTab === "dokter" && visibleDoctors < filteredDoctors.length && (
                        <div className="text-center mt-8 sm:mt-10">
                            <button
                                onClick={() => setVisibleDoctors(prev => prev + 9)}
                                className="bg-white border border-[#1e3a2f] text-[#1e3a2f] px-6 sm:px-8 py-2 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold hover:bg-[#1e3a2f]/10 transition-all duration-500 hover:scale-105 hover:shadow-lg"
                            >
                                Muat Lebih Banyak ({filteredDoctors.length - visibleDoctors} dokter)
                            </button>
                        </div>
                    )}

                    {activeTab === "perawat" && visibleNurses < filteredNurses.length && (
                        <div className="text-center mt-8 sm:mt-10">
                            <button
                                onClick={() => setVisibleNurses(prev => prev + 9)}
                                className="bg-white border border-[#1e3a2f] text-[#1e3a2f] px-6 sm:px-8 py-2 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold hover:bg-[#1e3a2f]/10 transition-all duration-500 hover:scale-105 hover:shadow-lg"
                            >
                                Muat Lebih Banyak ({filteredNurses.length - visibleNurses} perawat)
                            </button>
                        </div>
                    )}

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
                {isModalOpen && modalType === "dokter" && selectedDoctor && (
                    <div className="fixed inset-0 z-50 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-screen px-4 py-8">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                                onClick={closeModal}
                            />

                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                                className="relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-3xl max-h-[85vh] overflow-hidden"
                            >
                                {/* Header Image */}
                                <div className="relative h-48 sm:h-56 md:h-64 flex-shrink-0">
                                    {selectedDoctor.image ? (
                                        <>
                                            <div
                                                className="absolute inset-0 bg-cover bg-center"
                                                style={{ backgroundImage: `url(${selectedDoctor.image})` }}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                                        </>
                                    ) : (
                                        <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a2f] to-[#2d5a45] flex items-center justify-center">
                                            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                                                <Stethoscope className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                                            </div>
                                        </div>
                                    )}

                                    <button
                                        onClick={closeModal}
                                        className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10 w-8 h-8 sm:w-10 sm:h-10 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                                    >
                                        <X className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                    </button>

                                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                                        <div className="flex flex-wrap items-center gap-2 mb-2">
                                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${selectedDoctor.available
                                                ? "bg-green-500"
                                                : "bg-orange-500"
                                                }`}>
                                                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                                                {selectedDoctor.available ? "Tersedia" : "Sedang Sibuk"}
                                            </span>
                                            <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-[#1e3a2f]">
                                                {selectedDoctor.badge}
                                            </span>
                                            {selectedDoctor.verified && (
                                                <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-500 rounded-full text-xs font-semibold">
                                                    <CheckCircle className="w-3 h-3" />
                                                    Terverifikasi
                                                </span>
                                            )}
                                        </div>
                                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight">
                                            {selectedDoctor.name}
                                        </h2>
                                        <p className="text-sm sm:text-base text-white/90 mt-1">
                                            {selectedDoctor.subSpecialty}
                                        </p>
                                    </div>
                                </div>

                                {/* Scrollable Content */}
                                <div className="overflow-y-auto p-4 sm:p-6 md:p-8 max-h-[calc(85vh-16rem)]">
                                    {/* Quick Stats */}
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                                        <div className="text-center p-3 bg-slate-50 rounded-xl">
                                            <GraduationCap className="w-5 h-5 text-[#1e3a2f] mx-auto mb-1" />
                                            <div className="text-xs text-slate-500">Pengalaman</div>
                                            <div className="text-sm font-semibold">{selectedDoctor.experienceYears}</div>
                                        </div>
                                        <div className="text-center p-3 bg-slate-50 rounded-xl">
                                            <Users className="w-5 h-5 text-[#1e3a2f] mx-auto mb-1" />
                                            <div className="text-xs text-slate-500">Pasien</div>
                                            <div className="text-sm font-semibold">{selectedDoctor.patients}</div>
                                        </div>
                                        <div className="text-center p-3 bg-slate-50 rounded-xl">
                                            <Star className="w-5 h-5 text-[#1e3a2f] mx-auto mb-1" />
                                            <div className="text-xs text-slate-500">Rating</div>
                                            <div className="text-sm font-semibold">{selectedDoctor.rating} ({selectedDoctor.reviewCount})</div>
                                        </div>
                                        <div className="text-center p-3 bg-slate-50 rounded-xl">
                                            <CreditCard className="w-5 h-5 text-[#1e3a2f] mx-auto mb-1" />
                                            <div className="text-xs text-slate-500">Biaya</div>
                                            <div className="text-sm font-semibold text-[#1e3a2f]">Rp {selectedDoctor.price.toLocaleString('id-ID')}</div>
                                        </div>
                                    </div>

                                    {/* Contact Info */}
                                    <div className="mb-6">
                                        <h3 className="font-semibold text-slate-900 mb-3 text-base border-l-4 border-[#1e3a2f] pl-3">
                                            Informasi Kontak
                                        </h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {selectedDoctor.phone && (
                                                <div className="flex items-center gap-3 p-3 bg-[#1e3a2f]/5 rounded-xl">
                                                    <div className="p-2 bg-[#1e3a2f]/10 rounded-lg">
                                                        <Phone className="w-4 h-4 text-[#1e3a2f]" />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-slate-500">Telepon</p>
                                                        <p className="text-sm font-medium">{selectedDoctor.phone}</p>
                                                    </div>
                                                </div>
                                            )}
                                            {selectedDoctor.email && (
                                                <div className="flex items-center gap-3 p-3 bg-[#1e3a2f]/5 rounded-xl">
                                                    <div className="p-2 bg-[#1e3a2f]/10 rounded-lg">
                                                        <Mail className="w-4 h-4 text-[#1e3a2f]" />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-slate-500">Email</p>
                                                        <p className="text-sm font-medium truncate">{selectedDoctor.email}</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* About */}
                                    <div className="mb-6">
                                        <h3 className="font-semibold text-slate-900 mb-3 text-base border-l-4 border-[#1e3a2f] pl-3">
                                            Tentang Dokter
                                        </h3>
                                        <div className="bg-slate-50 rounded-xl p-4">
                                            <p className="text-sm text-slate-600 leading-relaxed">{selectedDoctor.about}</p>
                                        </div>
                                    </div>

                                    {/* Achievements */}
                                    <div className="mb-6">
                                        <h3 className="font-semibold text-slate-900 mb-3 text-base border-l-4 border-[#1e3a2f] pl-3">
                                            Pencapaian & Sertifikasi
                                        </h3>
                                        <div className="bg-amber-50/30 rounded-xl p-4">
                                            <ul className="space-y-2">
                                                {selectedDoctor.achievements.map((achievement, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                                                        <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                            <Award className="w-3 h-3 text-amber-600" />
                                                        </div>
                                                        <span>{achievement}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Education */}
                                    <div className="mb-6">
                                        <h3 className="font-semibold text-slate-900 mb-3 text-base border-l-4 border-[#1e3a2f] pl-3">
                                            Pendidikan
                                        </h3>
                                        <div className="bg-slate-50 rounded-xl p-4">
                                            <ul className="space-y-2">
                                                {selectedDoctor.education.map((edu, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                                                        <div className="w-5 h-5 rounded-full bg-[#1e3a2f]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                            <GraduationCap className="w-3 h-3 text-[#1e3a2f]" />
                                                        </div>
                                                        <span>{edu}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Hospital & Schedule */}
                                    <div className="mb-6">
                                        <h3 className="font-semibold text-slate-900 mb-3 text-base border-l-4 border-[#1e3a2f] pl-3">
                                            Lokasi & Jadwal Praktek
                                        </h3>
                                        <div className="bg-slate-50 rounded-xl p-4">
                                            <div className="space-y-3 mb-4">
                                                {selectedDoctor.branches ? (
                                                    <div className="flex items-start gap-2">
                                                        <Building className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                                                        <div className="flex flex-wrap gap-2">
                                                            {selectedDoctor.branches.map((branch, i) => (
                                                                <span key={i} className="inline-block px-3 py-1 bg-white rounded-lg text-xs font-medium shadow-sm">
                                                                    {branch}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-2">
                                                        <Building className="w-4 h-4 text-slate-400" />
                                                        <span className="text-sm text-slate-600">{selectedDoctor.hospital}</span>
                                                    </div>
                                                )}

                                                <div className="flex items-center gap-2">
                                                    <MapPin className="w-4 h-4 text-slate-400" />
                                                    <span className="text-sm text-slate-600">{selectedDoctor.location}</span>
                                                </div>
                                            </div>

                                            <div className="border-t border-slate-200 pt-3">
                                                <h4 className="text-xs font-semibold text-slate-700 mb-2">Jadwal Praktek</h4>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                    {selectedDoctor.schedule.map((sched, i) => (
                                                        <div key={i} className="flex items-center justify-between text-xs p-2 bg-white rounded-lg">
                                                            <span className="font-medium text-slate-700">{sched.day}</span>
                                                            <span className="text-slate-500">{sched.hours}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="mt-3 flex items-center gap-2 text-sm text-[#1e3a2f] bg-[#1e3a2f]/10 p-3 rounded-lg">
                                                <Clock className="w-4 h-4" />
                                                <span className="font-medium">Status:</span>
                                                <span>{selectedDoctor.nextAvailable}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Consultation Types */}
                                    {selectedDoctor.consultationTypes && (
                                        <div className="mb-6">
                                            <h3 className="font-semibold text-slate-900 mb-3 text-base border-l-4 border-[#1e3a2f] pl-3">
                                                Jenis Konsultasi
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedDoctor.consultationTypes.map((type, i) => (
                                                    <span key={i} className="px-3 py-1.5 bg-[#1e3a2f]/5 rounded-full text-xs font-medium text-slate-700 border border-[#1e3a2f]/20">
                                                        {type}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Close Button */}
                                    <div className="mt-6 pt-4 border-t border-slate-100">
                                        <button
                                            onClick={closeModal}
                                            className="w-full py-3 px-4 bg-[#1e3a2f] hover:bg-[#2d5a45] text-white rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                                        >
                                            <X className="w-4 h-4" />
                                            <span>Tutup</span>
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                )}
            </AnimatePresence>

            {/* Modal Detail Perawat */}
            <AnimatePresence>
                {isModalOpen && modalType === "perawat" && selectedNurse && (
                    <div className="fixed inset-0 z-50 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-screen px-4 py-8">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                                onClick={closeModal}
                            />

                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                                className="relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-3xl max-h-[85vh] overflow-hidden"
                            >
                                {/* Header Image */}
                                <div className="relative h-48 sm:h-56 md:h-64 flex-shrink-0">
                                    {selectedNurse.image ? (
                                        <>
                                            <div
                                                className="absolute inset-0 bg-cover bg-center"
                                                style={{ backgroundImage: `url(${selectedNurse.image})` }}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                                        </>
                                    ) : (
                                        <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a2f] to-[#2d5a45] flex items-center justify-center">
                                            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                                                <UserRound className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                                            </div>
                                        </div>
                                    )}

                                    <button
                                        onClick={closeModal}
                                        className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10 w-8 h-8 sm:w-10 sm:h-10 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                                    >
                                        <X className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                    </button>

                                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                                        <div className="flex flex-wrap items-center gap-2 mb-2">
                                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${selectedNurse.available
                                                ? "bg-green-500"
                                                : "bg-orange-500"
                                                }`}>
                                                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                                                {selectedNurse.available ? "Tersedia" : "Sedang Sibuk"}
                                            </span>
                                            <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-[#1e3a2f]">
                                                {selectedNurse.badge}
                                            </span>
                                            {selectedNurse.verified && (
                                                <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-500 rounded-full text-xs font-semibold">
                                                    <CheckCircle className="w-3 h-3" />
                                                    Terverifikasi
                                                </span>
                                            )}
                                        </div>
                                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight">
                                            {selectedNurse.name}
                                        </h2>
                                        <p className="text-sm sm:text-base text-white/90 mt-1">
                                            {selectedNurse.subSpecialty}
                                        </p>
                                    </div>
                                </div>

                                {/* Scrollable Content */}
                                <div className="overflow-y-auto p-4 sm:p-6 md:p-8 max-h-[calc(85vh-16rem)]">
                                    {/* Quick Stats */}
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                                        <div className="text-center p-3 bg-slate-50 rounded-xl">
                                            <GraduationCap className="w-5 h-5 text-[#1e3a2f] mx-auto mb-1" />
                                            <div className="text-xs text-slate-500">Pengalaman</div>
                                            <div className="text-sm font-semibold">{selectedNurse.experienceYears}</div>
                                        </div>
                                        <div className="text-center p-3 bg-slate-50 rounded-xl">
                                            <Users className="w-5 h-5 text-[#1e3a2f] mx-auto mb-1" />
                                            <div className="text-xs text-slate-500">Pasien</div>
                                            <div className="text-sm font-semibold">{selectedNurse.patients}</div>
                                        </div>
                                        <div className="text-center p-3 bg-slate-50 rounded-xl">
                                            <Star className="w-5 h-5 text-[#1e3a2f] mx-auto mb-1" />
                                            <div className="text-xs text-slate-500">Rating</div>
                                            <div className="text-sm font-semibold">{selectedNurse.rating} ({selectedNurse.reviewCount})</div>
                                        </div>
                                        <div className="text-center p-3 bg-slate-50 rounded-xl">
                                            <CreditCard className="w-5 h-5 text-[#1e3a2f] mx-auto mb-1" />
                                            <div className="text-xs text-slate-500">Biaya</div>
                                            <div className="text-sm font-semibold text-[#1e3a2f]">Rp {selectedNurse.price.toLocaleString('id-ID')}</div>
                                        </div>
                                    </div>

                                    {/* Contact Info */}
                                    <div className="mb-6">
                                        <h3 className="font-semibold text-slate-900 mb-3 text-base border-l-4 border-[#1e3a2f] pl-3">
                                            Informasi Kontak
                                        </h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {selectedNurse.phone && (
                                                <div className="flex items-center gap-3 p-3 bg-[#1e3a2f]/5 rounded-xl">
                                                    <div className="p-2 bg-[#1e3a2f]/10 rounded-lg">
                                                        <Phone className="w-4 h-4 text-[#1e3a2f]" />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-slate-500">Telepon</p>
                                                        <p className="text-sm font-medium">{selectedNurse.phone}</p>
                                                    </div>
                                                </div>
                                            )}
                                            {selectedNurse.email && (
                                                <div className="flex items-center gap-3 p-3 bg-[#1e3a2f]/5 rounded-xl">
                                                    <div className="p-2 bg-[#1e3a2f]/10 rounded-lg">
                                                        <Mail className="w-4 h-4 text-[#1e3a2f]" />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-slate-500">Email</p>
                                                        <p className="text-sm font-medium truncate">{selectedNurse.email}</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* About */}
                                    <div className="mb-6">
                                        <h3 className="font-semibold text-slate-900 mb-3 text-base border-l-4 border-[#1e3a2f] pl-3">
                                            Tentang Perawat
                                        </h3>
                                        <div className="bg-slate-50 rounded-xl p-4">
                                            <p className="text-sm text-slate-600 leading-relaxed">{selectedNurse.about}</p>
                                        </div>
                                    </div>

                                    {/* Certifications */}
                                    <div className="mb-6">
                                        <h3 className="font-semibold text-slate-900 mb-3 text-base border-l-4 border-[#1e3a2f] pl-3">
                                            Sertifikasi
                                        </h3>
                                        <div className="bg-amber-50/30 rounded-xl p-4">
                                            <ul className="space-y-2">
                                                {selectedNurse.certifications.map((cert, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                                                        <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                            <Award className="w-3 h-3 text-amber-600" />
                                                        </div>
                                                        <span>{cert}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Education */}
                                    <div className="mb-6">
                                        <h3 className="font-semibold text-slate-900 mb-3 text-base border-l-4 border-[#1e3a2f] pl-3">
                                            Pendidikan
                                        </h3>
                                        <div className="bg-slate-50 rounded-xl p-4">
                                            <ul className="space-y-2">
                                                {selectedNurse.education.map((edu, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                                                        <div className="w-5 h-5 rounded-full bg-[#1e3a2f]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                            <GraduationCap className="w-3 h-3 text-[#1e3a2f]" />
                                                        </div>
                                                        <span>{edu}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Location & Schedule */}
                                    <div className="mb-6">
                                        <h3 className="font-semibold text-slate-900 mb-3 text-base border-l-4 border-[#1e3a2f] pl-3">
                                            Lokasi & Jadwal Dinas
                                        </h3>
                                        <div className="bg-slate-50 rounded-xl p-4">
                                            <div className="space-y-3 mb-4">
                                                <div className="flex items-center gap-2">
                                                    <Building className="w-4 h-4 text-slate-400" />
                                                    <span className="text-sm text-slate-600">{selectedNurse.hospital}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <MapPinned className="w-4 h-4 text-slate-400" />
                                                    <span className="text-sm text-slate-600">{selectedNurse.serviceArea?.join(', ')}</span>
                                                </div>
                                            </div>

                                            <div className="border-t border-slate-200 pt-3">
                                                <h4 className="text-xs font-semibold text-slate-700 mb-2">Jadwal Dinas</h4>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                    {selectedNurse.schedule.map((sched, i) => (
                                                        <div key={i} className="flex items-center justify-between text-xs p-2 bg-white rounded-lg">
                                                            <span className="font-medium text-slate-700">{sched.day}</span>
                                                            <span className="text-slate-500">{sched.hours}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="mt-3 flex items-center gap-2 text-sm text-[#1e3a2f] bg-[#1e3a2f]/10 p-3 rounded-lg">
                                                <Clock className="w-4 h-4" />
                                                <span className="font-medium">Status:</span>
                                                <span>{selectedNurse.nextAvailable}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Close Button */}
                                    <div className="mt-6 pt-4 border-t border-slate-100">
                                        <button
                                            onClick={closeModal}
                                            className="w-full py-3 px-4 bg-[#1e3a2f] hover:bg-[#2d5a45] text-white rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                                        >
                                            <X className="w-4 h-4" />
                                            <span>Tutup</span>
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                )}
            </AnimatePresence>

            {/* Why Choose Us */}
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
                                <div className="inline-flex p-2 sm:p-3 md:p-4 bg-[#1e3a2f] rounded-xl sm:rounded-2xl text-white mb-2 sm:mb-3 md:mb-4 group-hover:scale-110 transition-transform">
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
            <section className="py-10 sm:py-12 md:py-16 px-4 sm:px-6 bg-[#1e3a2f] text-white relative overflow-hidden">
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
                        <button className="bg-white text-[#1e3a2f] px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-lg sm:rounded-xl text-xs sm:text-sm md:text-base font-bold hover:shadow-2xl transition-all duration-500 flex items-center justify-center gap-2 hover:scale-105">
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

            {/* Footer */}
            <footer className="bg-slate-900 text-white py-12 sm:py-16 px-4 sm:px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-8">
                        <div>
                            <div className="flex items-center gap-4 mb-8">
                                <div className="relative w-12 h-12 rounded-[20px] overflow-hidden shadow-lg border border-white/5 bg-[#233E2E] flex items-center justify-center">
                                    <img
                                        src="/logo2.png"
                                        alt="GiveCare Logo"
                                        className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <div className="flex flex-col leading-tight">
                                    <span className="text-2xl font-black tracking-tighter text-white">
                                        Kawan<span className="text-[#1e3a2f]">Pulih</span>
                                    </span>
                                </div>
                            </div>
                            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                                Platform kesehatan terpercaya untuk lansia Indonesia. Dampingi orang tua Anda dengan teknologi terkini.
                            </p>
                        </div>

                        {[
                            { title: "Produk", links: [{ name: "Fitur", href: "/layanan" }, { name: "Harga", href: "/harga" }, { name: "FAQ", href: "/faq" }, { name: "Blog", href: "/edukasi" }] },
                            { title: "Perusahaan", links: [{ name: "Tentang", href: "/tentang" }, { name: "Karir", href: "/karir" }, { name: "Kontak", href: "/kontak" }, { name: "Mitra", href: "/mitra" }] },
                            { title: "Dukungan", links: [{ name: "Pusat Bantuan", href: "/bantuan" }, { name: "Privasi", href: "/privasi" }, { name: "Syarat & Ketentuan", href: "/syarat" }, { name: "Keamanan", href: "/keamanan" }] }
                        ].map((section, i) => (
                            <div key={i}>
                                <h4 className="font-bold mb-4">{section.title}</h4>
                                <ul className="space-y-2">
                                    {section.links.map((link, j) => (
                                        <li key={j}>
                                            <Link href={link.href} className="text-slate-400 hover:text-[#1e3a2f] text-sm transition-colors">
                                                {link.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-slate-800 pt-8 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-slate-400 text-sm text-center sm:text-left">© 2026 KawanPulih. Semua Hak Dilindungi.</p>
                        <div className="flex items-center gap-4">
                            {["Twitter", "Facebook", "Instagram", "LinkedIn"].map((social, i) => (
                                <a key={i} href={`https://${social.toLowerCase()}.com`} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#1e3a2f] text-sm transition-colors">
                                    {social}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </footer>

            {/* Scroll to Top Button */}
            {showScrollTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 z-50 p-3 bg-[#1e3a2f] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                >
                    <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
            )}

            <FloatingChat />

            <style jsx>{`
                @keyframes pulse-slow {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.7; }
                }
                .animate-pulse-slow {
                    animation: pulse-slow 4s ease-in-out infinite;
                }
                @keyframes slide-up {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-slide-up {
                    animation: slide-up 0.8s ease-out forwards;
                }
                .animation-delay-100 { animation-delay: 0.1s; }
                .animation-delay-200 { animation-delay: 0.2s; }
                .animation-delay-300 { animation-delay: 0.3s; }
                .animation-delay-500 { animation-delay: 0.5s; }
                .animation-delay-2000 { animation-delay: 2s; }
            `}</style>
        </main>
    );
}