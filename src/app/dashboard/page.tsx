"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import FloatingChat from "@/components/FloatingChat";
import {
    Users, Calendar, Clock, Phone, Mail, MapPin, Heart,
    Stethoscope, Bandage, Home, CheckCircle, Eye, X,
    ArrowLeft, Search, Filter, TrendingUp, UserCheck,
    MessageCircle, ChevronLeft, ChevronRight, User, AlertCircle
} from "lucide-react";

export default function DashboardPage() {
    const [registrations, setRegistrations] = useState([]);
    const [filteredRegistrations, setFilteredRegistrations] = useState([]);
    const [selectedRegistration, setSelectedRegistration] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedService, setSelectedService] = useState("semua");
    const [showFilter, setShowFilter] = useState(false);
    const [stats, setStats] = useState({
        total: 0,
        konsultasi: 0,
        homecare: 0,
        pascaOperasi: 0,
        today: 0
    });

    useEffect(() => {
        const stored = localStorage.getItem('registrations');
        if (stored) {
            const data = JSON.parse(stored);
            setRegistrations(data);
            setFilteredRegistrations(data);
            calculateStats(data);
        }
    }, []);

    const calculateStats = (data) => {
        const today = new Date().toISOString().split('T')[0];
        setStats({
            total: data.length,
            konsultasi: data.filter(d => d.serviceType === "konsultasi").length,
            homecare: data.filter(d => d.serviceType === "homecare").length,
            pascaOperasi: data.filter(d => d.serviceType === "pasca-operasi").length,
            today: data.filter(d => d.preferredDate === today).length
        });
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        filterData(value, selectedService);
    };

    const handleServiceFilter = (service) => {
        setSelectedService(service);
        filterData(searchTerm, service);
    };

    const filterData = (search, service) => {
        let filtered = [...registrations];

        if (search) {
            filtered = filtered.filter(reg =>
                reg.fullName?.toLowerCase().includes(search.toLowerCase()) ||
                reg.phone?.includes(search) ||
                reg.email?.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (service !== "semua") {
            filtered = filtered.filter(reg => reg.serviceType === service);
        }

        setFilteredRegistrations(filtered);
    };

    const resetFilters = () => {
        setSearchTerm("");
        setSelectedService("semua");
        setFilteredRegistrations(registrations);
        if (showFilter) setShowFilter(false);
    };

    const getServiceIcon = (serviceType) => {
        switch (serviceType) {
            case "konsultasi": return <Stethoscope className="w-5 h-5 text-blue-600" />;
            case "homecare": return <Home className="w-5 h-5 text-emerald-600" />;
            case "pasca-operasi": return <Bandage className="w-5 h-5 text-amber-600" />;
            default: return <Heart className="w-5 h-5 text-slate-600" />;
        }
    };

    const getServiceName = (serviceType) => {
        switch (serviceType) {
            case "konsultasi": return "Konsultasi Dokter";
            case "homecare": return "Homecare";
            case "pasca-operasi": return "Pasca Operasi";
            default: return serviceType;
        }
    };

    const getStatusBadge = (status) => {
        const statusText = status || "new";
        if (statusText === "pending") {
            return <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">Menunggu</span>;
        } else if (statusText === "confirmed") {
            return <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Dikonfirmasi</span>;
        } else {
            return <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">Baru</span>;
        }
    };

    const serviceOptions = [
        { id: "semua", name: "Semua" },
        { id: "konsultasi", name: "Konsultasi" },
        { id: "homecare", name: "Homecare" },
        { id: "pasca-operasi", name: "Pasca Operasi" }
    ];

    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
            <Navbar />

            {/* Header */}
            <section className="relative bg-gradient-to-br from-[#233E2E] to-[#3E624C] text-white py-8 px-4 sm:px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <Link href="/">
                                    <button className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-all">
                                        <ArrowLeft className="w-5 h-5" />
                                    </button>
                                </Link>
                                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 px-4 py-2 rounded-full text-sm font-semibold">
                                    <Users className="w-4 h-4" />
                                    DASHBOARD
                                </div>
                            </div>
                            <h1 className="text-2xl font-bold">Data Pendaftaran Pasien</h1>
                            <p className="text-white/80 text-sm mt-1">Kelola pendaftaran pasien KawanPulih</p>
                        </div>
                        <Link href="/daftar">
                            <button className="bg-white text-[#233E2E] px-5 py-2 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2">
                                <UserCheck className="w-4 h-4" />
                                + Pendaftaran Baru
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Stats Cards */}
            <section className="py-6 px-4 sm:px-6 -mt-6 relative z-30">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                        {[
                            { label: "Total Pasien", value: stats.total, icon: <Users className="w-5 h-5" />, color: "bg-emerald-100", textColor: "text-emerald-600" },
                            { label: "Konsultasi", value: stats.konsultasi, icon: <Stethoscope className="w-5 h-5" />, color: "bg-blue-100", textColor: "text-blue-600" },
                            { label: "Homecare", value: stats.homecare, icon: <Home className="w-5 h-5" />, color: "bg-emerald-100", textColor: "text-emerald-600" },
                            { label: "Pasca Operasi", value: stats.pascaOperasi, icon: <Bandage className="w-5 h-5" />, color: "bg-amber-100", textColor: "text-amber-600" },
                            { label: "Hari Ini", value: stats.today, icon: <Calendar className="w-5 h-5" />, color: "bg-purple-100", textColor: "text-purple-600" }
                        ].map((stat, i) => (
                            <div key={i} className="bg-white rounded-xl p-4 shadow-lg border border-slate-100">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-slate-500 text-xs">{stat.label}</p>
                                        <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                                    </div>
                                    <div className={`w-10 h-10 ${stat.color} rounded-full flex items-center justify-center`}>
                                        <div className={stat.textColor}>{stat.icon}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Filter & Search */}
            <section className="py-4 px-4 sm:px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-4">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Cari nama, email, atau nomor telepon..."
                                    value={searchTerm}
                                    onChange={handleSearch}
                                    className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#233E2E]"
                                />
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setShowFilter(!showFilter)}
                                    className="px-4 py-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all flex items-center gap-2 text-sm"
                                >
                                    <Filter className="w-4 h-4" />
                                    Filter
                                </button>
                                {(searchTerm || selectedService !== "semua") && (
                                    <button
                                        onClick={resetFilters}
                                        className="px-4 py-2.5 bg-red-50 text-red-600 rounded-xl text-sm hover:bg-red-100 transition-all"
                                    >
                                        Reset
                                    </button>
                                )}
                            </div>
                        </div>

                        {showFilter && (
                            <div className="mt-4 pt-4 border-t border-slate-100">
                                <div className="flex flex-wrap gap-2">
                                    <p className="text-xs text-slate-500 w-full mb-2">Jenis Layanan</p>
                                    {serviceOptions.map(opt => (
                                        <button
                                            key={opt.id}
                                            onClick={() => handleServiceFilter(opt.id)}
                                            className={`px-3 py-1.5 rounded-full text-xs transition-all ${selectedService === opt.id
                                                    ? "bg-[#233E2E] text-white"
                                                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                                }`}
                                        >
                                            {opt.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Data Table */}
            <section className="py-6 px-4 sm:px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-slate-50 border-b border-slate-200">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">No</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Nama Pasien</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Kontak</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Layanan</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Jadwal</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Status</th>
                                        <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredRegistrations.length === 0 ? (
                                        <tr>
                                            <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                                                <div className="flex flex-col items-center gap-2">
                                                    <Search className="w-12 h-12 text-slate-300" />
                                                    <p>Belum ada data pendaftaran</p>
                                                    <Link href="/daftar">
                                                        <button className="mt-2 px-4 py-2 bg-[#233E2E] text-white rounded-lg text-sm">
                                                            + Tambah Pendaftaran
                                                        </button>
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredRegistrations.map((reg, index) => (
                                            <tr key={reg.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                                <td className="px-6 py-4 text-sm text-slate-600">{index + 1}</td>
                                                <td className="px-6 py-4">
                                                    <div>
                                                        <p className="font-medium text-slate-800">{reg.fullName}</p>
                                                        <p className="text-xs text-slate-400 mt-0.5">{reg.gender}, {reg.birthDate}</p>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <p className="text-sm text-slate-600 flex items-center gap-1">
                                                        <Phone className="w-3 h-3" /> {reg.phone}
                                                    </p>
                                                    <p className="text-sm text-slate-600 flex items-center gap-1 mt-1">
                                                        <Mail className="w-3 h-3" /> {reg.email}
                                                    </p>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        {getServiceIcon(reg.serviceType)}
                                                        <span className="text-sm text-slate-700">{getServiceName(reg.serviceType)}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <p className="text-sm text-slate-700">{reg.preferredDate}</p>
                                                    <p className="text-xs text-slate-400 mt-0.5">{reg.preferredTime}</p>
                                                </td>
                                                <td className="px-6 py-4">
                                                    {getStatusBadge(reg.status)}
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <button
                                                        onClick={() => setSelectedRegistration(reg)}
                                                        className="text-[#233E2E] hover:text-[#3E624C] p-2 rounded-lg hover:bg-slate-100 transition-all"
                                                    >
                                                        <Eye className="w-5 h-5" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {filteredRegistrations.length > 0 && (
                            <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
                                <p className="text-sm text-slate-500">
                                    Menampilkan <span className="font-medium">{filteredRegistrations.length}</span> pendaftaran
                                </p>
                                <div className="flex gap-2">
                                    <button className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50">
                                        <ChevronLeft className="w-4 h-4" />
                                    </button>
                                    <button className="w-8 h-8 rounded-lg bg-[#233E2E] text-white flex items-center justify-center">1</button>
                                    <button className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50">
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Modal Detail */}
            {selectedRegistration && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen px-4 py-8">
                        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedRegistration(null)} />

                        <div className="relative bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
                            <div className="sticky top-0 bg-gradient-to-r from-[#233E2E] to-[#3E624C] px-6 py-4 text-white">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        {getServiceIcon(selectedRegistration.serviceType)}
                                        <div>
                                            <h3 className="text-lg font-bold">Detail Pasien</h3>
                                            <p className="text-white/80 text-sm">ID: #{selectedRegistration.id}</p>
                                        </div>
                                    </div>
                                    <button onClick={() => setSelectedRegistration(null)} className="text-white/80 hover:text-white">
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>

                            <div className="p-6">
                                {/* Status */}
                                <div className="mb-6 p-4 bg-slate-50 rounded-xl flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                                            {getServiceIcon(selectedRegistration.serviceType)}
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500">Status</p>
                                            <p className="font-semibold text-slate-900">{getStatusBadge(selectedRegistration.status)}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-slate-500">Didaftarkan</p>
                                        <p className="text-sm text-slate-700">{selectedRegistration.submittedAt || new Date().toLocaleString()}</p>
                                    </div>
                                </div>

                                {/* Data Diri */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div className="bg-slate-50 rounded-xl p-4">
                                        <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                                            <User className="w-4 h-4 text-[#233E2E]" />
                                            Data Diri
                                        </h4>
                                        <div className="space-y-2">
                                            <div><span className="text-sm text-slate-500">Nama:</span> <span className="text-sm font-medium">{selectedRegistration.fullName}</span></div>
                                            <div><span className="text-sm text-slate-500">NIK:</span> <span className="text-sm">{selectedRegistration.nik || "-"}</span></div>
                                            <div><span className="text-sm text-slate-500">Tanggal Lahir:</span> <span className="text-sm">{selectedRegistration.birthDate || "-"}</span></div>
                                            <div><span className="text-sm text-slate-500">Jenis Kelamin:</span> <span className="text-sm">{selectedRegistration.gender || "-"}</span></div>
                                            <div><span className="text-sm text-slate-500">Kota:</span> <span className="text-sm">{selectedRegistration.city || "-"}</span></div>
                                        </div>
                                    </div>

                                    <div className="bg-slate-50 rounded-xl p-4">
                                        <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                                            <Phone className="w-4 h-4 text-[#233E2E]" />
                                            Kontak
                                        </h4>
                                        <div className="space-y-2">
                                            <div><span className="text-sm text-slate-500">Email:</span> <span className="text-sm">{selectedRegistration.email || "-"}</span></div>
                                            <div><span className="text-sm text-slate-500">Telepon:</span> <span className="text-sm">{selectedRegistration.phone || "-"}</span></div>
                                            <div><span className="text-sm text-slate-500">Alamat:</span> <span className="text-sm">{selectedRegistration.address || "-"}</span></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Kesehatan */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div className="bg-slate-50 rounded-xl p-4">
                                        <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                                            <Heart className="w-4 h-4 text-[#233E2E]" />
                                            Kesehatan
                                        </h4>
                                        <div className="space-y-2">
                                            <div><span className="text-sm text-slate-500">Layanan:</span> <span className="text-sm">{getServiceName(selectedRegistration.serviceType)}</span></div>
                                            {selectedRegistration.doctorSpecialty && (
                                                <div><span className="text-sm text-slate-500">Spesialis:</span> <span className="text-sm">{selectedRegistration.doctorSpecialty}</span></div>
                                            )}
                                            <div><span className="text-sm text-slate-500">Keluhan:</span> <span className="text-sm">{selectedRegistration.complaint || "-"}</span></div>
                                            <div><span className="text-sm text-slate-500">Jadwal:</span> <span className="text-sm">{selectedRegistration.preferredDate} ({selectedRegistration.preferredTime})</span></div>
                                        </div>
                                    </div>

                                    <div className="bg-slate-50 rounded-xl p-4">
                                        <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                                            <AlertCircle className="w-4 h-4 text-[#233E2E]" />
                                            Kontak Darurat
                                        </h4>
                                        <div className="space-y-2">
                                            <div><span className="text-sm text-slate-500">Nama:</span> <span className="text-sm">{selectedRegistration.emergencyContact || "-"}</span></div>
                                            <div><span className="text-sm text-slate-500">Telepon:</span> <span className="text-sm">{selectedRegistration.emergencyPhone || "-"}</span></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Tombol Aksi */}
                                <div className="flex gap-3 mt-6">
                                    <button
                                        onClick={() => {
                                            const waMessage = `Halo ${selectedRegistration.fullName}, saya dari tim KawanPulih. Terima kasih telah mendaftar. Saya ingin konfirmasi jadwal konsultasi Anda pada ${selectedRegistration.preferredDate} (${selectedRegistration.preferredTime}). Apakah sesuai?`;
                                            window.open(`https://wa.me/${selectedRegistration.phone}?text=${encodeURIComponent(waMessage)}`, '_blank');
                                        }}
                                        className="flex-1 bg-green-600 text-white py-2.5 rounded-xl font-medium hover:bg-green-700 transition-all flex items-center justify-center gap-2"
                                    >
                                        <MessageCircle className="w-4 h-4" />
                                        Hubungi Pasien
                                    </button>
                                    <button className="flex-1 border-2 border-[#233E2E] text-[#233E2E] py-2.5 rounded-xl font-medium hover:bg-[#233E2E]/5 transition-all">
                                        Konfirmasi
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <FloatingChat />
        </main>
    );
}