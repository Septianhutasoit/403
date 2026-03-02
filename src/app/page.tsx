"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import FloatingChat from "@/components/FloatingChat";
import {
  Heart, ShieldCheck, Activity, Users, BookOpen, Clock, Brain,
  Phone, Video, Calendar, Award, ChevronRight, MessageCircle,
  Bell, TrendingUp, Thermometer, Droplets
} from "lucide-react";

export default function Home() {
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
      { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const fadeInUpClass = (index) =>
    `transition-all duration-1000 transform ${isVisible[index] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
    }`;

  return (
    <main className="min-h-screen bg-white text-slate-900 font-sans overflow-x-hidden scroll-smooth">
      <Navbar />

      {/* Hero Section - Beranda */}
      <section id="beranda" ref={el => sectionRefs.current[0] = el} data-index="0" className="pt-28 sm:pt-32 lg:pt-40 pb-16 sm:pb-20 px-4 sm:px-6 relative overflow-hidden">
        {/* Konten Hero Section (sama seperti sebelumnya) */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className={`space-y-6 sm:space-y-8 text-center lg:text-left ${fadeInUpClass(0)}`}>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold border border-emerald-100 animate-pulse-slow">
                <Activity size={16} className="animate-spin-slow" />
                Pendamping Kesehatan Pintar Berbasis AI
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-tight">
                Masa Tua Bahagia,{' '}
                <span className="relative">
                  <span className="text-emerald-600 relative z-10">Kesehatan Terjaga.</span>
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                    <path d="M0 0 L300 12" stroke="currentColor" strokeWidth="8" strokeLinecap="round" className="text-emerald-200" />
                  </svg>
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-500 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Platform kesehatan terintegrasi untuk lansia dengan teknologi AI terkini.
                Konsultasi 24/7, pantauan kesehatan real-time, dan edukasi medis terpercaya.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-8 pt-4">
                {[
                  { value: "50K+", label: "Pengguna Aktif" },
                  { value: "100+", label: "Dokter Spesialis" },
                  { value: "98%", label: "Kepuasan" }
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-emerald-600">{stat.value}</div>
                    <div className="text-xs sm:text-sm text-slate-500">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                <Link href="/konsultasi">
                  <button className="group bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold text-base sm:text-lg hover:shadow-2xl hover:shadow-emerald-200/50 hover:scale-105 transition-all duration-500 flex items-center justify-center gap-2">
                    Mulai Konsultasi Gratis
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <Link href="/demo">
                  <button className="border-2 border-slate-200 text-slate-700 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold text-base sm:text-lg hover:bg-slate-50 hover:border-emerald-600 hover:text-emerald-600 transition-all duration-500 flex items-center justify-center gap-2">
                    <Video className="w-5 h-5" />
                    Demo Interaktif
                  </button>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-6">
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Terdaftar Kemenkes
                </div>
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                  <Award className="w-4 h-4 text-emerald-600" />
                  ISO 27001 Certified
                </div>
              </div>
            </div>

            <div className={`relative flex justify-center lg:justify-end ${fadeInUpClass(0)}`} style={{ transitionDelay: '200ms' }}>
              <div className="relative w-full max-w-md">
                {/* Main Card */}
                <div className="relative bg-gradient-to-br from-emerald-500 to-teal-600 rounded-[40px] shadow-2xl overflow-hidden aspect-square transform hover:scale-105 transition-all duration-700">
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-3xl"></div>
                  <div className="relative h-full flex items-center justify-center">
                    <Users className="w-48 h-48 text-white/30" />
                  </div>

                  {/* Floating Elements */}
                  <div className="absolute top-6 left-6 bg-white/95 backdrop-blur p-3 rounded-2xl shadow-xl animate-float">
                    <Heart className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="absolute top-6 right-6 bg-white/95 backdrop-blur p-3 rounded-2xl shadow-xl animate-float animation-delay-1000">
                    <Activity className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur p-3 rounded-2xl shadow-xl animate-float animation-delay-2000">
                    <Clock className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur p-3 rounded-2xl shadow-xl animate-float animation-delay-3000">
                    <Brain className="w-6 h-6 text-emerald-600" />
                  </div>
                </div>

                {/* Testimonial Card */}
                <div className="absolute -bottom-6 -left-6 bg-white/95 backdrop-blur-xl p-4 sm:p-6 rounded-2xl shadow-2xl max-w-[200px] sm:max-w-[250px] animate-slide-up">
                  <div className="flex items-center gap-2 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-slate-800 font-semibold text-sm sm:text-base italic">"Pelayanan luar biasa untuk orang tua saya. Sangat membantu!"</p>
                  <div className="flex items-center gap-2 mt-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full"></div>
                    <div>
                      <p className="text-slate-900 font-bold text-xs sm:text-sm">Ibu Sari</p>
                      <p className="text-slate-500 text-xs">Caregiver</p>
                    </div>
                  </div>
                </div>

                {/* Live Stats Card */}
                <div className="absolute -top-6 -right-6 bg-white/95 backdrop-blur-xl p-4 rounded-2xl shadow-2xl animate-slide-down">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-ping absolute"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full relative"></div>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Online sekarang</p>
                      <p className="text-sm font-bold">1,234 orang</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="layanan" ref={el => sectionRefs.current[1] = el} data-index="1" className="py-16 sm:py-24 bg-gradient-to-b from-slate-50 to-white px-4 sm:px-6">
        <div className={`max-w-7xl mx-auto text-center mb-12 sm:mb-16 space-y-4 ${fadeInUpClass(1)}`}>
          <span className="text-emerald-600 font-semibold text-sm sm:text-base tracking-wider">LAYANAN UNGGULAN</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">Solusi Kesehatan Lengkap untuk Lansia</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-sm sm:text-base">
            Didesain khusus dengan teknologi terkini untuk kemudahan akses lansia dan pendampingnya
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {[
            {
              icon: <Activity className="w-6 h-6 sm:w-8 sm:h-8" />,
              title: "Pantau Kesehatan",
              desc: "Monitor tekanan darah, detak jantung, dan aktivitas harian secara real-time",
              color: "from-emerald-500 to-teal-500",
              stats: "+85% akurasi",
              link: "/layanan/pantau-kesehatan"
            },
            {
              icon: <Brain className="w-6 h-6 sm:w-8 sm:h-8" />,
              title: "AI Health Assistant",
              desc: "Asisten pintar 24/7 siap menjawab pertanyaan kesehatan Anda",
              color: "from-blue-500 to-cyan-500",
              stats: "Respon < 1 menit",
              link: "/layanan/ai-assistant"
            },
            {
              icon: <BookOpen className="w-6 h-6 sm:w-8 sm:h-8" />,
              title: "Edukasi Medis",
              desc: "Artikel dan video edukasi berdasarkan panduan resmi Kemenkes",
              color: "from-purple-500 to-pink-500",
              stats: "500+ artikel",
              link: "/edukasi"
            },
            {
              icon: <ShieldCheck className="w-6 h-6 sm:w-8 sm:h-8" />,
              title: "Keamanan Data",
              desc: "Enkripsi end-to-end dan sistem keamanan berlapis untuk data medis Anda",
              color: "from-orange-500 to-red-500",
              stats: "ISO 27001",
              link: "/layanan/keamanan"
            }
          ].map((f, i) => (
            <Link href={f.link} key={i}>
              <div
                className={`group bg-white p-6 sm:p-8 rounded-3xl hover:shadow-2xl transition-all duration-700 border border-slate-100 relative overflow-hidden cursor-pointer ${fadeInUpClass(1)}`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${f.color} opacity-0 group-hover:opacity-5 transition-opacity duration-700`}></div>
                <div className={`bg-gradient-to-br ${f.color} text-white w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                  {f.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-emerald-600 transition-colors">{f.title}</h3>
                <p className="text-sm sm:text-base text-slate-500 leading-relaxed mb-4">{f.desc}</p>
                <div className="inline-block bg-slate-100 px-3 py-1 rounded-full text-xs font-semibold text-slate-600">
                  {f.stats}
                </div>
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-500">
                  <ChevronRight className="w-5 h-5 text-emerald-600" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Live Monitoring Section */}
      <section id="monitoring" ref={el => sectionRefs.current[2] = el} data-index="2" className="py-16 sm:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className={`space-y-6 ${fadeInUpClass(2)}`}>
              <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold">
                <TrendingUp size={16} /> Live Monitoring
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold">Pantau Kesehatan Real-time dari Mana Saja</h2>
              <p className="text-slate-500 text-base sm:text-lg">
                Dengan teknologi IoT terintegrasi, Anda dapat memantau kondisi kesehatan lansia secara real-time melalui smartphone.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4">
                {[
                  { icon: <Heart className="w-5 h-5" />, label: "Detak Jantung", value: "72 bpm", status: "Normal" },
                  { icon: <Thermometer className="w-5 h-5" />, label: "Suhu Tubuh", value: "36.5°C", status: "Normal" },
                  { icon: <Activity className="w-5 h-5" />, label: "Tekanan Darah", value: "120/80", status: "Normal" },
                  { icon: <Droplets className="w-5 h-5" />, label: "Gula Darah", value: "110 mg/dL", status: "Normal" }
                ].map((item, i) => (
                  <div key={i} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 hover:shadow-lg transition-all duration-500">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="text-emerald-600">{item.icon}</div>
                      <span className="text-xs text-slate-500">{item.label}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold">{item.value}</span>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">{item.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`relative ${fadeInUpClass(2)}`} style={{ transitionDelay: '200ms' }}>
              <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-[40px] p-1">
                <div className="bg-white rounded-[38px] p-6 sm:p-8">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold">Aktivitas Hari Ini</h3>
                      <select className="text-sm border rounded-lg px-2 py-1">
                        <option>Minggu ini</option>
                        <option>Bulan ini</option>
                      </select>
                    </div>

                    <div className="flex items-end justify-between h-40 gap-2">
                      {[65, 45, 80, 55, 70, 85, 60].map((height, i) => (
                        <div key={i} className="flex flex-col items-center gap-2 w-full">
                          <div
                            className="w-full bg-gradient-to-t from-emerald-500 to-teal-500 rounded-t-lg hover:scale-105 transition-all duration-500"
                            style={{ height: `${height}%` }}
                          ></div>
                          <span className="text-xs text-slate-500">{['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'][i]}</span>
                        </div>
                      ))}
                    </div>

                    <div className="bg-emerald-50 p-4 rounded-2xl flex items-center gap-3 animate-pulse-slow">
                      <Bell className="w-5 h-5 text-emerald-600" />
                      <div>
                        <p className="text-sm font-semibold">Waktu Minum Obat</p>
                        <p className="text-xs text-slate-500">Dalam 15 menit lagi</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Doctors Section */}
      <section id="dokter" ref={el => sectionRefs.current[3] = el} data-index="3" className="py-16 sm:py-24 bg-slate-50 px-4 sm:px-6">
        <div className={`max-w-7xl mx-auto text-center mb-12 sm:mb-16 space-y-4 ${fadeInUpClass(3)}`}>
          <span className="text-emerald-600 font-semibold text-sm tracking-wider">TIM DOKTER</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">Konsultasi dengan Dokter Spesialis</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Lebih dari 100 dokter spesialis siap membantu kesehatan lansia Anda
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {[
            {
              name: "dr. Sarah Wijaya, Sp.PD",
              specialty: "Penyakit Dalam",
              experience: "15 tahun",
              patients: "2.500+",
              rating: 4.9,
              image: "S"
            },
            {
              name: "dr. Ahmad Hasan, Sp.S",
              specialty: "Neurologi",
              experience: "12 tahun",
              patients: "1.800+",
              rating: 4.8,
              image: "A"
            },
            {
              name: "dr. Maria Santoso, Sp.JP",
              specialty: "Jantung",
              experience: "10 tahun",
              patients: "1.500+",
              rating: 4.9,
              image: "M"
            }
          ].map((doctor, i) => (
            <Link href={`/dokter/${doctor.name.toLowerCase().replace(/\s+/g, '-')}`} key={i}>
              <div
                className={`bg-white p-6 rounded-3xl hover:shadow-2xl transition-all duration-700 group cursor-pointer ${fadeInUpClass(3)}`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                    {doctor.image}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{doctor.name}</h3>
                    <p className="text-emerald-600 text-sm">{doctor.specialty}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-slate-50 p-2 rounded-xl text-center">
                    <p className="text-xs text-slate-500">Pengalaman</p>
                    <p className="font-semibold">{doctor.experience}</p>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-xl text-center">
                    <p className="text-xs text-slate-500">Pasien</p>
                    <p className="font-semibold">{doctor.patients}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400">★</span>
                    <span className="font-semibold">{doctor.rating}</span>
                  </div>
                  <button className="bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm hover:bg-emerald-700 transition-all hover:scale-105 flex items-center gap-1">
                    <Phone className="w-4 h-4" />
                    Konsultasi
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/dokter">
            <button className="bg-white text-emerald-600 border-2 border-emerald-600 px-8 py-3 rounded-xl font-semibold hover:bg-emerald-50 transition-all duration-500">
              Lihat Semua Dokter
            </button>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={el => sectionRefs.current[4] = el} data-index="4" className="py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-br from-emerald-600 to-teal-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-3xl"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/20 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>

        <div className={`max-w-4xl mx-auto text-center text-white relative z-10 ${fadeInUpClass(4)}`}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">Siap untuk Hidup Sehat dan Bahagia?</h2>
          <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Bergabung dengan ribuan keluarga yang sudah merasakan manfaat LansiaCare
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/konsultasi">
              <button className="bg-white text-emerald-600 px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-500 flex items-center justify-center gap-2 group">
                <MessageCircle className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Mulai Konsultasi Gratis
              </button>
            </Link>
            <Link href="/demo">
              <button className="border-2 border-white text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/10 hover:scale-105 transition-all duration-500 flex items-center justify-center gap-2">
                <Calendar className="w-5 h-5" />
                Jadwalkan Demo
              </button>
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-6 mt-12">
            {["Terdaftar Kemenkes", "ISO 27001", "24/7 Support", "Garansi Privasi"].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-white/80">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-emerald-600 p-1.5 rounded-lg">
                  <Heart className="text-white w-5 h-5" />
                </div>
                <span className="text-xl font-bold">LansiaCare</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
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
                      <Link href={link.href} className="text-slate-400 hover:text-emerald-500 text-sm transition-colors">
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
              © 2026 LansiaCare AI. Semua Hak Dilindungi.
            </p>
            <div className="flex items-center gap-4">
              {[
                { name: "Twitter", href: "https://twitter.com" },
                { name: "Facebook", href: "https://facebook.com" },
                { name: "Instagram", href: "https://instagram.com" },
                { name: "LinkedIn", href: "https://linkedin.com" }
              ].map((social, i) => (
                <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-emerald-500 text-sm transition-colors">
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
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-3000 {
          animation-delay: 3s;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
        }
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-down {
          animation: slide-down 0.6s ease-out forwards;
        }
      `}</style>
    </main>
  );
}