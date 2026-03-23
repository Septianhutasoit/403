"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import FloatingChat from "@/components/FloatingChat";
import {
    User, Mail, Phone, Calendar, MapPin, FileText, Heart,
    Stethoscope, Bandage, Home, CheckCircle, ArrowRight,
    Sparkles, Shield, MessageCircle, Clock, Award, PhoneCall,
    AlertCircle, Loader2, Send, Zap, UserCheck
} from "lucide-react";

// ============================================
// KONFIGURASI WHATSAPP DOKTER
// GANTI DENGAN NOMOR WHATSAPP ANDA
// ============================================
const DOCTOR_WHATSAPP = "6285184175515"; // Contoh: 628123456789 (tanpa + atau spasi)

export default function DaftarPage() {
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submittedData, setSubmittedData] = useState(null);
    const [errors, setErrors] = useState({});

    // Form Data
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        nik: "",
        birthDate: "",
        gender: "",
        address: "",
        city: "",
        serviceType: "",
        doctorSpecialty: "",
        complaint: "",
        preferredDate: "",
        preferredTime: "",
        emergencyContact: "",
        emergencyPhone: "",
        agreeTerms: false
    });

    // Options
    const serviceOptions = [
        { id: "konsultasi", name: "Konsultasi Dokter", icon: <Stethoscope className="w-5 h-5" />, desc: "Konsultasi online dengan dokter spesialis" },
        { id: "homecare", name: "Homecare", icon: <Home className="w-5 h-5" />, desc: "Perawat datang ke rumah" },
        { id: "pasca-operasi", name: "Pasca Operasi", icon: <Bandage className="w-5 h-5" />, desc: "Perawatan pemulihan pasca operasi" }
    ];

    const doctorSpecialties = [
        { id: "umum", name: "Dokter Umum" },
        { id: "jantung", name: "Spesialis Jantung" },
        { id: "saraf", name: "Spesialis Saraf" },
        { id: "ortopedi", name: "Spesialis Tulang" },
        { id: "mata", name: "Spesialis Mata" }
    ];

    const cityOptions = ["Jakarta", "Surabaya", "Bandung", "Medan", "Yogyakarta", "Semarang", "Makassar", "Palembang", "Lainnya"];
    const timeOptions = ["08:00 - 09:00", "09:00 - 10:00", "10:00 - 11:00", "13:00 - 14:00", "14:00 - 15:00", "15:00 - 16:00", "19:00 - 20:00"];

    const validateStep = (step) => {
        const newErrors = {};

        if (step === 1) {
            if (!formData.fullName) newErrors.fullName = "Nama lengkap harus diisi";
            if (!formData.email) newErrors.email = "Email harus diisi";
            else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email tidak valid";
            if (!formData.phone) newErrors.phone = "Nomor telepon harus diisi";
            if (!formData.nik) newErrors.nik = "NIK harus diisi";
            else if (!/^\d{16}$/.test(formData.nik)) newErrors.nik = "NIK harus 16 digit angka";
            if (!formData.birthDate) newErrors.birthDate = "Tanggal lahir harus diisi";
            if (!formData.gender) newErrors.gender = "Jenis kelamin harus dipilih";
            if (!formData.address) newErrors.address = "Alamat harus diisi";
            if (!formData.city) newErrors.city = "Kota harus dipilih";
        }

        if (step === 2) {
            if (!formData.serviceType) newErrors.serviceType = "Pilih jenis layanan";
            if (formData.serviceType === "konsultasi" && !formData.doctorSpecialty) {
                newErrors.doctorSpecialty = "Pilih spesialisasi dokter";
            }
            if (!formData.complaint) newErrors.complaint = "Keluhan harus diisi";
            if (!formData.preferredDate) newErrors.preferredDate = "Pilih tanggal konsultasi";
            if (!formData.preferredTime) newErrors.preferredTime = "Pilih waktu konsultasi";
            if (!formData.emergencyContact) newErrors.emergencyContact = "Nama kontak darurat harus diisi";
            if (!formData.emergencyPhone) newErrors.emergencyPhone = "Nomor kontak darurat harus diisi";
        }

        if (step === 3) {
            if (!formData.agreeTerms) newErrors.agreeTerms = "Anda harus menyetujui syarat dan ketentuan";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(currentStep + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handlePrev = () => {
        setCurrentStep(currentStep - 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    // ============================================
    // LOGIKA UTAMA: WHATSAPP REDIRECT
    // ============================================
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateStep(3)) return;

        setIsSubmitting(true);

        // Data yang akan dikirim
        const serviceName = serviceOptions.find(s => s.id === formData.serviceType)?.name || formData.serviceType;
        const specialtyName = doctorSpecialties.find(d => d.id === formData.doctorSpecialty)?.name || formData.doctorSpecialty;

        // Format pesan WhatsApp yang informatif
        const waMessage = `*Pendaftaran KawanPulih* 🏥

Halo Dokter,

Saya *${formData.fullName}* telah mendaftar untuk layanan kesehatan di KawanPulih.

📋 *Data Pasien:*
• Nama: ${formData.fullName}
• Telepon: ${formData.phone}
• Email: ${formData.email}
• Alamat: ${formData.address}, ${formData.city}

🏥 *Informasi Kesehatan:*
• Jenis Layanan: ${serviceName}
${specialtyName ? `• Spesialisasi: ${specialtyName}` : ''}
• Keluhan: ${formData.complaint}
• Jadwal Konsultasi: ${formData.preferredDate} (${formData.preferredTime})

📞 *Kontak Darurat:*
• Nama: ${formData.emergencyContact}
• Telepon: ${formData.emergencyPhone}

Mohon bantuan untuk konfirmasi jadwal konsultasi. Terima kasih.

*— KawanPulih Medical AI*`;

        // Simpan data ke localStorage untuk dashboard
        const newRegistration = {
            id: Date.now(),
            ...formData,
            serviceName,
            specialtyName,
            submittedAt: new Date().toLocaleString('id-ID'),
            status: "pending"
        };

        const existing = localStorage.getItem('registrations');
        const registrations = existing ? JSON.parse(existing) : [];
        registrations.push(newRegistration);
        localStorage.setItem('registrations', JSON.stringify(registrations));

        // Simpan data untuk ditampilkan di popup
        setSubmittedData(newRegistration);

        // Redirect ke WhatsApp
        const whatsappUrl = `https://wa.me/${DOCTOR_WHATSAPP}?text=${encodeURIComponent(waMessage)}`;
        window.open(whatsappUrl, '_blank');

        setIsSubmitting(false);
        setIsSubmitted(true);

        // Reset form setelah submit
        setFormData({
            fullName: "", email: "", phone: "", nik: "", birthDate: "", gender: "", address: "", city: "",
            serviceType: "", doctorSpecialty: "", complaint: "", preferredDate: "", preferredTime: "",
            emergencyContact: "", emergencyPhone: "", agreeTerms: false
        });
        setCurrentStep(1);
    };

    const steps = [
        { number: 1, title: "Data Diri", icon: <User className="w-5 h-5" /> },
        { number: 2, title: "Kebutuhan", icon: <Heart className="w-5 h-5" /> },
        { number: 3, title: "Konfirmasi", icon: <CheckCircle className="w-5 h-5" /> }
    ];

    // Popup Sukses
    if (isSubmitted && submittedData) {
        return (
            <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
                <Navbar />
                <div className="flex items-center justify-center min-h-[80vh] px-4 py-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center max-w-md mx-auto bg-white rounded-3xl shadow-xl p-8 border border-slate-100"
                    >
                        <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-10 h-10 text-green-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">Pendaftaran Berhasil!</h2>
                        <p className="text-slate-500 mb-4">
                            Terima kasih <span className="font-semibold text-[#233E2E]">{submittedData.fullName}</span>
                        </p>

                        {/* Informasi Selanjutnya */}
                        <div className="bg-blue-50 rounded-xl p-4 mb-6 text-left">
                            <p className="text-sm text-blue-800 font-medium mb-2 flex items-center gap-2">
                                <Zap className="w-4 h-4" />
                                Yang akan dilakukan selanjutnya:
                            </p>
                            <ul className="text-xs text-blue-700 space-y-2">
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-500">✓</span>
                                    <span>WhatsApp akan terbuka dengan pesan otomatis ke dokter</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-500">✓</span>
                                    <span>Dokter akan membalas dalam 1x24 jam</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-500">✓</span>
                                    <span>Konfirmasi jadwal konsultasi melalui WhatsApp</span>
                                </li>
                            </ul>
                        </div>

                        <div className="flex flex-col gap-3">
                            <Link href="/dashboard">
                                <button className="w-full bg-gradient-to-r from-[#233E2E] to-[#3E624C] text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2">
                                    <UserCheck className="w-5 h-5" />
                                    Lihat Dashboard Pasien
                                </button>
                            </Link>
                            <Link href="/">
                                <button className="w-full border border-slate-300 text-slate-600 py-3 rounded-xl font-semibold hover:bg-slate-50 transition-all">
                                    Kembali ke Beranda
                                </button>
                            </Link>
                        </div>

                        <p className="text-xs text-slate-400 mt-4">
                            Data pendaftaran telah tersimpan di dashboard untuk referensi.
                        </p>
                    </motion.div>
                </div>
                <FloatingChat />
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
            <Navbar />

            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-[#233E2E] to-[#3E624C] text-white py-16 px-4 sm:px-6 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 -left-40 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 -right-40 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                            <Sparkles className="w-4 h-4" />
                            KONSULTASI GRATIS
                        </div>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                            Daftar Konsultasi{' '}
                            <span className="text-[#DBAA28]">Kesehatan</span>
                        </h1>
                        <p className="text-white/90 text-lg max-w-2xl mx-auto">
                            Isi formulir di bawah ini. Setelah mendaftar, Anda akan langsung terhubung dengan dokter via WhatsApp.
                        </p>
                        <div className="flex items-center justify-center gap-4 mt-4 text-sm text-white/80">
                            <span className="flex items-center gap-1"><MessageCircle className="w-4 h-4" /> Respon Cepat</span>
                            <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 24/7</span>
                            <span className="flex items-center gap-1"><Award className="w-4 h-4" /> Gratis</span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Progress Steps */}
            <section className="py-6 px-4 sm:px-6 -mt-6 relative z-30">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 shadow-lg border border-white/20">
                        <div className="flex items-center justify-between">
                            {steps.map((step, index) => (
                                <div key={step.number} className="flex-1">
                                    <div className="flex flex-col items-center">
                                        <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm
                      transition-all duration-500
                      ${currentStep > step.number
                                                ? "bg-[#233E2E] text-white"
                                                : currentStep === step.number
                                                    ? "bg-gradient-to-r from-[#233E2E] to-[#3E624C] text-white ring-4 ring-[#233E2E]/20 scale-110"
                                                    : "bg-slate-200 text-slate-500"}
                    `}>
                                            {currentStep > step.number ? <CheckCircle className="w-5 h-5" /> : step.number}
                                        </div>
                                        <span className="text-xs text-slate-500 mt-2 hidden sm:block">{step.title}</span>
                                    </div>
                                    {index < steps.length - 1 && (
                                        <div className="hidden sm:block flex-1 h-0.5 bg-slate-200 mt-5 -ml-2 -mr-2">
                                            <div className={`h-full bg-[#233E2E] transition-all duration-500 ${currentStep > step.number ? "w-full" : "w-0"
                                                }`} />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Form Section */}
            <section className="py-8 px-4 sm:px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 border border-slate-100">
                        <form onSubmit={handleSubmit}>
                            <AnimatePresence mode="wait">
                                {/* Step 1: Data Diri */}
                                {currentStep === 1 && (
                                    <motion.div
                                        key="step1"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-5"
                                    >
                                        <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                            <User className="w-5 h-5 text-[#233E2E]" />
                                            Data Diri
                                        </h2>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-2">Nama Lengkap *</label>
                                                <input
                                                    type="text"
                                                    name="fullName"
                                                    value={formData.fullName}
                                                    onChange={handleChange}
                                                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#233E2E] ${errors.fullName ? "border-red-500" : "border-slate-200"}`}
                                                    placeholder="Nama lengkap"
                                                />
                                                {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-2">Email *</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#233E2E] ${errors.email ? "border-red-500" : "border-slate-200"}`}
                                                    placeholder="email@example.com"
                                                />
                                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-2">Nomor Telepon *</label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#233E2E] ${errors.phone ? "border-red-500" : "border-slate-200"}`}
                                                    placeholder="+62 812-3456-7890"
                                                />
                                                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-2">NIK *</label>
                                                <input
                                                    type="text"
                                                    name="nik"
                                                    value={formData.nik}
                                                    onChange={handleChange}
                                                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#233E2E] ${errors.nik ? "border-red-500" : "border-slate-200"}`}
                                                    placeholder="16 digit angka"
                                                    maxLength={16}
                                                />
                                                {errors.nik && <p className="text-red-500 text-xs mt-1">{errors.nik}</p>}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-2">Tanggal Lahir *</label>
                                                <input
                                                    type="date"
                                                    name="birthDate"
                                                    value={formData.birthDate}
                                                    onChange={handleChange}
                                                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#233E2E] ${errors.birthDate ? "border-red-500" : "border-slate-200"}`}
                                                />
                                                {errors.birthDate && <p className="text-red-500 text-xs mt-1">{errors.birthDate}</p>}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-2">Jenis Kelamin *</label>
                                                <div className="flex gap-4 mt-2">
                                                    {["Laki-laki", "Perempuan"].map((gender) => (
                                                        <label key={gender} className="flex items-center gap-2 cursor-pointer">
                                                            <input
                                                                type="radio"
                                                                name="gender"
                                                                value={gender}
                                                                checked={formData.gender === gender}
                                                                onChange={handleChange}
                                                                className="w-4 h-4 text-[#233E2E]"
                                                            />
                                                            <span className="text-slate-700">{gender}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                                {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">Alamat Lengkap *</label>
                                            <textarea
                                                name="address"
                                                value={formData.address}
                                                onChange={handleChange}
                                                rows={3}
                                                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#233E2E] resize-none ${errors.address ? "border-red-500" : "border-slate-200"}`}
                                                placeholder="Jalan, RT/RW, Kelurahan, Kecamatan"
                                            />
                                            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">Kota *</label>
                                            <select
                                                name="city"
                                                value={formData.city}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#233E2E] ${errors.city ? "border-red-500" : "border-slate-200"}`}
                                            >
                                                <option value="">Pilih Kota</option>
                                                {cityOptions.map(city => (
                                                    <option key={city} value={city}>{city}</option>
                                                ))}
                                            </select>
                                            {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 2: Kebutuhan Kesehatan */}
                                {currentStep === 2 && (
                                    <motion.div
                                        key="step2"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-5"
                                    >
                                        <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                            <Heart className="w-5 h-5 text-[#233E2E]" />
                                            Kebutuhan Kesehatan
                                        </h2>

                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">Jenis Layanan *</label>
                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                                {serviceOptions.map((service) => (
                                                    <label
                                                        key={service.id}
                                                        className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition-all ${formData.serviceType === service.id
                                                                ? "border-[#233E2E] bg-[#233E2E]/5 ring-2 ring-[#233E2E]/20"
                                                                : "border-slate-200 hover:border-slate-300"
                                                            }`}
                                                    >
                                                        <input
                                                            type="radio"
                                                            name="serviceType"
                                                            value={service.id}
                                                            checked={formData.serviceType === service.id}
                                                            onChange={handleChange}
                                                            className="w-4 h-4 text-[#233E2E]"
                                                        />
                                                        <div>
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-[#233E2E]">{service.icon}</span>
                                                                <span className="font-medium text-slate-700 text-sm">{service.name}</span>
                                                            </div>
                                                            <p className="text-xs text-slate-500 mt-1">{service.desc}</p>
                                                        </div>
                                                    </label>
                                                ))}
                                            </div>
                                            {errors.serviceType && <p className="text-red-500 text-xs mt-1">{errors.serviceType}</p>}
                                        </div>

                                        {formData.serviceType === "konsultasi" && (
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-2">Spesialisasi Dokter *</label>
                                                <div className="flex flex-wrap gap-2">
                                                    {doctorSpecialties.map((specialty) => (
                                                        <label
                                                            key={specialty.id}
                                                            className={`px-4 py-2 rounded-full cursor-pointer transition-all ${formData.doctorSpecialty === specialty.id
                                                                    ? "bg-[#233E2E] text-white"
                                                                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                                                }`}
                                                        >
                                                            <input
                                                                type="radio"
                                                                name="doctorSpecialty"
                                                                value={specialty.id}
                                                                checked={formData.doctorSpecialty === specialty.id}
                                                                onChange={handleChange}
                                                                className="hidden"
                                                            />
                                                            <span className="text-sm">{specialty.name}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                                {errors.doctorSpecialty && <p className="text-red-500 text-xs mt-1">{errors.doctorSpecialty}</p>}
                                            </div>
                                        )}

                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">Keluhan Utama *</label>
                                            <textarea
                                                name="complaint"
                                                value={formData.complaint}
                                                onChange={handleChange}
                                                rows={3}
                                                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#233E2E] resize-none ${errors.complaint ? "border-red-500" : "border-slate-200"}`}
                                                placeholder="Ceritakan keluhan Anda secara singkat..."
                                            />
                                            {errors.complaint && <p className="text-red-500 text-xs mt-1">{errors.complaint}</p>}
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-2">Tanggal Konsultasi *</label>
                                                <input
                                                    type="date"
                                                    name="preferredDate"
                                                    value={formData.preferredDate}
                                                    onChange={handleChange}
                                                    min={new Date().toISOString().split('T')[0]}
                                                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#233E2E] ${errors.preferredDate ? "border-red-500" : "border-slate-200"}`}
                                                />
                                                {errors.preferredDate && <p className="text-red-500 text-xs mt-1">{errors.preferredDate}</p>}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-2">Waktu Konsultasi *</label>
                                                <select
                                                    name="preferredTime"
                                                    value={formData.preferredTime}
                                                    onChange={handleChange}
                                                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#233E2E] ${errors.preferredTime ? "border-red-500" : "border-slate-200"}`}
                                                >
                                                    <option value="">Pilih Waktu</option>
                                                    {timeOptions.map(time => (
                                                        <option key={time} value={time}>{time}</option>
                                                    ))}
                                                </select>
                                                {errors.preferredTime && <p className="text-red-500 text-xs mt-1">{errors.preferredTime}</p>}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-2">Nama Kontak Darurat *</label>
                                                <input
                                                    type="text"
                                                    name="emergencyContact"
                                                    value={formData.emergencyContact}
                                                    onChange={handleChange}
                                                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#233E2E] ${errors.emergencyContact ? "border-red-500" : "border-slate-200"}`}
                                                    placeholder="Nama keluarga/kerabat"
                                                />
                                                {errors.emergencyContact && <p className="text-red-500 text-xs mt-1">{errors.emergencyContact}</p>}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-2">Nomor Kontak Darurat *</label>
                                                <input
                                                    type="tel"
                                                    name="emergencyPhone"
                                                    value={formData.emergencyPhone}
                                                    onChange={handleChange}
                                                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#233E2E] ${errors.emergencyPhone ? "border-red-500" : "border-slate-200"}`}
                                                    placeholder="+62 812-3456-7890"
                                                />
                                                {errors.emergencyPhone && <p className="text-red-500 text-xs mt-1">{errors.emergencyPhone}</p>}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 3: Konfirmasi */}
                                {currentStep === 3 && (
                                    <motion.div
                                        key="step3"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-6"
                                    >
                                        <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                            <CheckCircle className="w-5 h-5 text-[#233E2E]" />
                                            Konfirmasi Pendaftaran
                                        </h2>

                                        <div className="bg-slate-50 rounded-xl p-4 space-y-3">
                                            <h3 className="font-semibold text-slate-900">Ringkasan Data</h3>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                                                <div><span className="text-slate-500">Nama:</span> {formData.fullName || "-"}</div>
                                                <div><span className="text-slate-500">Email/Telepon:</span> {formData.email || "-"} / {formData.phone || "-"}</div>
                                                <div><span className="text-slate-500">Kota:</span> {formData.city || "-"}</div>
                                                <div><span className="text-slate-500">Layanan:</span> {serviceOptions.find(s => s.id === formData.serviceType)?.name || "-"}</div>
                                                <div><span className="text-slate-500">Jadwal:</span> {formData.preferredDate || "-"} {formData.preferredTime ? `(${formData.preferredTime})` : ""}</div>
                                                <div><span className="text-slate-500">Kontak Darurat:</span> {formData.emergencyContact || "-"}</div>
                                            </div>
                                        </div>

                                        <div className="bg-green-50 rounded-xl p-4 flex items-start gap-3">
                                            <MessageCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                            <p className="text-xs text-green-800">
                                                Setelah mendaftar, Anda akan langsung terhubung dengan dokter via WhatsApp. Pesan akan terisi otomatis dengan data Anda.
                                            </p>
                                        </div>

                                        <label className="flex items-start gap-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                name="agreeTerms"
                                                checked={formData.agreeTerms}
                                                onChange={handleChange}
                                                className="w-5 h-5 mt-0.5 text-[#233E2E] rounded"
                                            />
                                            <span className="text-sm text-slate-600">
                                                Saya menyetujui <span className="text-[#233E2E] font-medium">Syarat dan Ketentuan</span> yang berlaku.
                                            </span>
                                        </label>
                                        {errors.agreeTerms && <p className="text-red-500 text-xs">{errors.agreeTerms}</p>}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Navigation Buttons */}
                            <div className="flex justify-between mt-8 pt-6 border-t border-slate-100">
                                {currentStep > 1 && (
                                    <button
                                        type="button"
                                        onClick={handlePrev}
                                        className="px-6 py-2 border border-slate-300 rounded-xl text-slate-600 hover:bg-slate-50 transition-all"
                                    >
                                        Sebelumnya
                                    </button>
                                )}
                                <div className="flex-1"></div>
                                {currentStep < 3 ? (
                                    <button
                                        type="button"
                                        onClick={handleNext}
                                        className="px-6 py-2 bg-gradient-to-r from-[#233E2E] to-[#3E624C] text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2"
                                    >
                                        Selanjutnya
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="px-8 py-3 bg-gradient-to-r from-[#233E2E] to-[#3E624C] text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-70 flex items-center gap-2"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                Memproses...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-5 h-5" />
                                                Kirim & Hubungi Dokter
                                            </>
                                        )}
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            {/* Info Kontak */}
            <section className="py-8 px-4 sm:px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-slate-100">
                            <MessageCircle className="w-8 h-8 text-[#233E2E]" />
                            <div>
                                <p className="font-semibold text-sm">Hubungi via WhatsApp</p>
                                <p className="text-xs text-slate-500">Respon cepat 24/7</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-slate-100">
                            <PhoneCall className="w-8 h-8 text-[#233E2E]" />
                            <div>
                                <p className="font-semibold text-sm">Layanan Darurat</p>
                                <p className="text-xs text-slate-500">+62 21 1234 5678</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-slate-100">
                            <Award className="w-8 h-8 text-[#233E2E]" />
                            <div>
                                <p className="font-semibold text-sm">Konsultasi Gratis</p>
                                <p className="text-xs text-slate-500">Pertama kali konsultasi</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <FloatingChat />
        </main>
    );
}