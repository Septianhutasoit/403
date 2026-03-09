"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import FloatingChat from "@/components/FloatingChat";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Heart, ShieldCheck, Activity, Users, BookOpen, Clock, Brain,
  Phone, Video, Calendar, Award, ChevronRight, MessageCircle,
  Bell, TrendingUp, Thermometer, Droplets, Sparkles, ArrowRight,
  Star, CheckCircle, Zap, Coffee, Smile, Shield, HeartPulse,
  Bone, Wind, Apple, Pill, AlertCircle, Stethoscope, Syringe,
  Weight, Bandage, Hospital, Ambulance, FlaskConical, Ear,
  Eye, EyeOff, EyeIcon, Lungs, Microscope, Salad, Wheat,
  Citrus, Milk, Fish, Egg, Dumbbell, Footprints, HeartHandshake,
  Trees, Moon, Sun, Waves, Leaf, Hand, Scissors, Syringe as Vaccine,
  ChevronLeft
} from "lucide-react";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const sectionRefs = useRef([]);

  // Data untuk background slider hero
  const heroSlides = [
    {
      id: 1,
      image: "/images/hero/hero-beranda-1.jpg", // Ganti dengan file gambar Anda
      title: "Pendamping Kesehatan untuk Umum",
      subtitle: "Solusi lengkap perawatan lansia dengan teknologi AI terkini"
    },
    {
      id: 2,
      image: "/images/hero/hero-beranda-2.jpg", // Ganti dengan file gambar Anda
      title: "Perawatan Pasca Operasi Profesional",
      subtitle: "Panduan lengkap pemulihan pasca operasi untuk Umum Baik itu Anak-Anak Sampai Lansia"
    },
    {
      id: 3,
      image: "/images/hero/hero-beranda-3.jpg", // Ganti dengan file gambar Anda
      title: "Konsultasi dengan Dokter Spesialis",
      subtitle: "Lebih dari 50 dokter spesialis siap membantu 24/7"
    },
    {
      id: 4,
      image: "/images/hero/hero-beranda-4.jpg", // Ganti dengan file gambar Anda
      title: "Komunitas Peduli Kesehatan",
      subtitle: "Bergabung dengan ribuan keluarga yang peduli kesehatan Kita"
    }
  ];

  // Data layanan pasca operasi dengan animasi gambar
  const postOpServices = [
    {
      id: 1,
      title: "Perawatan Luka Operasi",
      description: "Panduan lengkap merawat luka pasca operasi untuk mencegah infeksi dan mempercepat penyembuhan.",
      icon: <Bandage className="w-8 h-8" />,
      image: "/images/layanan/luka-operasi.jpg", // Ganti dengan file gambar Anda
      color: "from-blue-500 to-cyan-500",
      stats: "15+ Artikel",
      link: "/edukasi?kategori=pasca-operasi&topik=luka"
    },
    {
      id: 2,
      title: "Pemulihan Pasca Operasi Jantung",
      description: "Program rehabilitasi jantung yang aman dan efektif untuk lansia pasca operasi.",
      icon: <HeartPulse className="w-8 h-8" />,
      image: "/images/layanan/jantung.jpg", // Ganti dengan file gambar Anda
      color: "from-red-500 to-pink-500",
      stats: "10+ Artikel",
      link: "/edukasi?kategori=pasca-operasi&topik=jantung"
    },
    {
      id: 3,
      title: "Rehabilitasi Pasca Operasi Tulang",
      description: "Latihan fisioterapi untuk memulihkan mobilitas setelah operasi ortopedi.",
      icon: <Bone className="w-8 h-8" />,
      image: "/images/layanan/tulang.jpg", // Ganti dengan file gambar Anda
      color: "from-amber-500 to-orange-500",
      stats: "10+ Artikel",
      link: "/edukasi?kategori=pasca-operasi&topik=tulang"
    },
    {
      id: 4,
      title: "Nutrisi Pasca Operasi",
      description: "Panduan makanan bergizi untuk mempercepat pemulihan dan mengembalikan energi.",
      icon: <Apple className="w-8 h-8" />,
      image: "/images/layanan/nutrisi.jpg", // Ganti dengan file gambar Anda
      color: "from-green-500 to-emerald-500",
      stats: "18+ Artikel",
      link: "/edukasi?kategori=pasca-operasi&topik=nutrisi"
    },
    {
      id: 5,
      title: "Perawatan Pasca Operasi Mata",
      description: "Tips merawat mata setelah operasi katarak dan operasi mata lainnya.",
      icon: <Eye className="w-8 h-8" />,
      image: "/images/layanan/mata.jpg", // Ganti dengan file gambar Anda
      color: "from-purple-500 to-violet-500",
      stats: "8+ Artikel",
      link: "/edukasi?kategori=pasca-operasi&topik=mata"
    },
    {
      id: 6,
      title: "Manajemen Nyeri Pasca Operasi",
      description: "Cara mengatasi rasa sakit pasca operasi dengan aman dan efektif.",
      icon: <AlertCircle className="w-8 h-8" />,
      image: "/images/layanan/nyeri.jpg", // Ganti dengan file gambar Anda
      color: "from-orange-500 to-red-500",
      stats: "14+ Artikel",
      link: "/edukasi?kategori=pasca-operasi&topik=nyeri"
    }
  ];

  // Data informasi umum kesehatan
  const healthInfo = [
    {
      id: 1,
      title: "Hipertensi pada Lansia",
      description: "Panduan mengelola tekanan darah tinggi di usia lanjut.",
      icon: <Activity className="w-6 h-6" />,
      image: "/images/informasi/hipertensi.jpg", // Ganti dengan file gambar Anda
      color: "from-red-500 to-orange-500",
      link: "/edukasi?kategori=penyakit&topik=hipertensi"
    },
    {
      id: 2,
      title: "Diabetes Mellitus",
      description: "Cara mengelola gula darah agar tetap stabil dan sehat.",
      icon: <Droplets className="w-6 h-6" />,
      image: "/images/informasi/diabetes.jpg", // Ganti dengan file gambar Anda
      color: "from-blue-500 to-cyan-500",
      link: "/edukasi?kategori=penyakit&topik=diabetes"
    },
    {
      id: 3,
      title: "Osteoporosis",
      description: "Menjaga kepadatan tulang untuk mencegah patah tulang.",
      icon: <Bone className="w-6 h-6" />,
      image: "/images/informasi/osteoporosis.jpg", // Ganti dengan file gambar Anda
      color: "from-amber-500 to-yellow-500",
      link: "/edukasi?kategori=penyakit&topik=osteoporosis"
    },
    {
      id: 4,
      title: "Demensia & Alzheimer",
      description: "Merawat lansia dengan gangguan daya ingat dan fungsi kognitif.",
      icon: <Brain className="w-6 h-6" />,
      image: "/images/informasi/demensia.jpg", // Ganti dengan file gambar Anda
      color: "from-purple-500 to-pink-500",
      link: "/edukasi?kategori=mental&topik=demensia"
    },
    {
      id: 5,
      title: "Nutrisi Seimbang",
      description: "Panduan makanan sehat untuk menjaga vitalitas lansia.",
      icon: <Apple className="w-6 h-6" />,
      image: "/images/informasi/nutrisi.jpg", // Ganti dengan file gambar Anda
      color: "from-green-500 to-emerald-500",
      link: "/edukasi?kategori=nutrisi"
    },
    {
      id: 6,
      title: "Olahraga Ringan",
      description: "Gerakan sederhana yang aman dilakukan untuk kebugaran lansia.",
      icon: <Footprints className="w-6 h-6" />,
      image: "/images/informasi/olahraga.jpg", // Ganti dengan file gambar Anda
      color: "from-teal-500 to-green-500",
      link: "/edukasi?kategori=aktivitas"
    }
  ];

  // Tambahkan state untuk particles
  const [particles, setParticles] = useState([]);

  // Generate particles hanya di client (useEffect)
  useEffect(() => {
    const newParticles = [...Array(30)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      type: i % 3,
      xMove: Math.random() * 50 - 25,
      duration: 15 + Math.random() * 10,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

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

      {/* Hero Section dengan Background Slider */}
      <section className="relative h-[700px] sm:h-[750px] lg:h-[800px] flex items-center overflow-hidden">
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
                {/* Overlay Gradient - Lebih soft */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              </div>

              {/* Pattern Overlay - Lebih soft */}
              <div className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                  backgroundSize: '40px 40px'
                }}>
              </div>
            </div>
          ))}

          {/* Floating Elements - Lebih soft */}
          <div className="absolute top-20 right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-2xl animate-pulse-slow"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-teal-500/10 rounded-full blur-2xl animate-pulse-slow animation-delay-2000"></div>
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
              <Sparkles className="w-4 h-4 animate-spin-slow" />
              Pendamping Kesehatan Pintar Berbasis AI
              <Sparkles className="w-4 h-4 animate-spin-slow" />
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-6 leading-tight animate-slide-up delay-100">
              {heroSlides[currentSlide].title}
            </h1>

            <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl animate-slide-up delay-200">
              {heroSlides[currentSlide].subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up delay-300">
              <Link href="/konsultasi">
                <button className="group bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-emerald-500/50 hover:scale-105 transition-all duration-500 flex items-center justify-center gap-2">
                  Mulai Konsultasi Gratis
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link href="/edukasi">
                <button className="group bg-white/20 backdrop-blur-md border-2 border-white/30 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/30 hover:border-white/50 transition-all duration-500 flex items-center justify-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Jelajahi Edukasi
                </button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 mt-12 animate-slide-up delay-500">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">40K+</div>
                <div className="text-sm text-white/70">Pengguna Aktif</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">50+</div>
                <div className="text-sm text-white/70">Dokter Spesialis</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">98%</div>
                <div className="text-sm text-white/70">Kepuasan</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">24/7</div>
                <div className="text-sm text-white/70">Layanan</div>
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

      {/* Quick Stats Section */}
      <section className="py-12 px-4 sm:px-6 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <Users className="w-8 h-8" />, value: "40K+", label: "Pengguna Aktif", color: "from-emerald-500 to-teal-500" },
              { icon: <Award className="w-8 h-8" />, value: "50+", label: "Dokter Spesialis", color: "from-blue-500 to-cyan-500" },
              { icon: <BookOpen className="w-8 h-8" />, value: "120+", label: "Artikel Edukasi", color: "from-purple-500 to-pink-500" },
              { icon: <HeartHandshake className="w-8 h-8" />, value: "12K+", label: "Keluarga Terbantu", color: "from-orange-500 to-red-500" }
            ].map((stat, i) => (
              <div key={i} className="text-center group">
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${stat.color} bg-opacity-10 text-white mb-3 group-hover:scale-110 transition-transform`}>
                  <div className="text-emerald-600">{stat.icon}</div>
                </div>
                <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                <div className="text-sm text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Layanan Pasca Operasi - Dengan Animasi Gambar */}
      <section ref={el => sectionRefs.current[0] = el} data-index="0" className="py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-b from-slate-50 to-white">
        <div className={`max-w-7xl mx-auto ${fadeInUpClass(0)}`}>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <HeartPulse className="w-4 h-4" />
              LAYANAN PASCA OPERASI
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Perawatan Lengkap untuk{' '}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Pemulihan Optimal
              </span>
            </h2>
            <p className="text-slate-500 text-lg">
              Panduan dan layanan khusus untuk membantu proses pemulihan pasca operasi dengan aman dan nyaman.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {postOpServices.map((service, index) => (
              <Link href={service.link} key={service.id}>
                <div className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 cursor-pointer">
                  {/* Image Container dengan Animasi */}
                  <div className="relative h-56 overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                      style={{ backgroundImage: `url(${service.image})` }}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-t ${service.color} opacity-60`}></div>
                    </div>

                    {/* Icon Container */}
                    <div className={`absolute top-4 left-4 bg-gradient-to-br ${service.color} p-3 rounded-2xl shadow-lg z-10 group-hover:scale-110 transition-transform duration-500`}>
                      <div className="text-white">
                        {service.icon}
                      </div>
                    </div>

                    {/* Badge Stats */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-semibold text-slate-700 z-10">
                      {service.stats}
                    </div>

                    {/* Overlay Text */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
                      <h3 className="text-xl font-bold text-white mb-1">{service.title}</h3>
                      <p className="text-sm text-white/90 line-clamp-2">{service.description}</p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.color} animate-pulse`}></div>
                        <span className="text-sm text-slate-500">Tersedia panduan lengkap</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-emerald-600 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/edukasi?kategori=pasca-operasi">
              <button className="bg-white border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-500">
                Lihat Semua Layanan Pasca Operasi
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Informasi Kesehatan Umum */}
      <section ref={el => sectionRefs.current[1] = el} data-index="1" className="py-16 sm:py-24 px-4 sm:px-6 bg-white">
        <div className={`max-w-7xl mx-auto ${fadeInUpClass(1)}`}>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Heart className="w-4 h-4" />
              INFORMASI KESEHATAN UMUM
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Panduan Lengkap Kesehatan{' '}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                untuk Umum, Dari Anak-Anak,Remaja,Dewasa Hingga Lansia
              </span>
            </h2>
            <p className="text-slate-500 text-lg">
              Berbagai informasi penting seputar kesehatan lansia yang perlu Anda ketahui.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {healthInfo.map((info, index) => (
              <Link href={info.link} key={info.id}>
                <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border border-slate-100">
                  <div className="flex p-4 gap-4">
                    {/* Image Container */}
                    <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                      <div
                        className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                        style={{ backgroundImage: `url(${info.image})` }}
                      >
                        <div className={`absolute inset-0 bg-gradient-to-br ${info.color} opacity-60`}></div>
                      </div>
                      <div className={`absolute inset-0 flex items-center justify-center text-white`}>
                        {info.icon}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1 group-hover:text-emerald-600 transition-colors">
                        {info.title}
                      </h3>
                      <p className="text-sm text-slate-500 mb-2 line-clamp-2">{info.description}</p>
                      <div className="flex items-center text-emerald-600 text-sm font-medium">
                        Baca Selengkapnya
                        <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/edukasi">
              <button className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-emerald-700 transition-all duration-500 hover:scale-105">
                Lihat Semua Informasi
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Fitur Unggulan dengan Carousel Infinite Smooth */}
      <section ref={el => sectionRefs.current[2] = el} data-index="2" className="py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden">
        {/* Background Animasi Modern */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Gradient Background Dinamis */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/80 via-white to-teal-50/80"></div>

          {/* Animated Gradient Orbs - Modern */}
          <motion.div
            className="absolute top-0 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-emerald-300/20 to-teal-300/20 blur-3xl"
            animate={{
              x: [0, 50, -30, 20, 0],
              y: [0, -40, 20, -20, 0],
              scale: [1, 1.1, 0.95, 1.05, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          <motion.div
            className="absolute bottom-0 -right-40 w-[700px] h-[700px] rounded-full bg-gradient-to-r from-blue-300/20 to-purple-300/20 blur-3xl"
            animate={{
              x: [0, -60, 40, -30, 0],
              y: [0, 50, -30, 20, 0],
              scale: [1, 1.15, 0.9, 1.1, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />

          {/* Floating Particles dengan Animasi Lebih Halus */}
          <div className="absolute inset-0">
            {particles.map((p) => (
              <motion.div
                key={p.id}
                className="absolute w-1.5 h-1.5 rounded-full"
                style={{
                  background: p.type === 0
                    ? 'linear-gradient(135deg, #10b981, #3b82f6)'
                    : p.type === 1
                      ? 'linear-gradient(135deg, #8b5cf6, #ec4899)'
                      : 'linear-gradient(135deg, #f59e0b, #ef4444)',
                  left: p.left,
                  top: p.top,
                  filter: 'blur(1px)',
                }}
                animate={{
                  y: [0, -100, 0],
                  x: [0, p.xMove, 0],
                  opacity: [0.2, 0.6, 0.2],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: p.duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: p.delay,
                }}
              />
            ))}
          </div>

          {/* Modern Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #64748b 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }}></div>

          {/* Animated Lines */}
          <svg className="absolute inset-0 w-full h-full opacity-10">
            <motion.path
              d="M0 100 Q 200 50, 400 100 T 800 100"
              stroke="url(#gradient)"
              strokeWidth="2"
              fill="none"
              animate={{
                d: [
                  "M0 100 Q 200 50, 400 100 T 800 100",
                  "M0 150 Q 200 200, 400 150 T 800 150",
                  "M0 100 Q 200 50, 400 100 T 800 100",
                ]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.5" />
                <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.5" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className={`max-w-7xl mx-auto relative z-10 ${fadeInUpClass(2)}`}>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md border border-emerald-200 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold mb-4 shadow-lg"
            >
              <Sparkles className="w-4 h-4 animate-pulse" />
              LAYANAN LENGKAP
            </motion.div>

            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Solusi Kesehatan{' '}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Terintegrasi
              </span>
            </h2>
            <p className="text-slate-500 text-lg">
              Berbagai fitur dan layanan untuk mendukung kesehatan lansia dan pemulihan pasca operasi
            </p>
          </div>

          {/* Carousel Container - Tanpa efek fade putih */}
          <div className="relative w-full">
            {/* Slider Container */}
            <div className="overflow-hidden w-full">
              <motion.div
                className="flex gap-6 py-4"
                animate={{
                  x: [0, -3840, -7680, -11520, -15360, -19200, -23040, -26880, -30720, -34560, -38400, -42240, -46080, -49920, -53760, 0]
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 530, // Diperlambat dari 360 ke 480 untuk lebih smooth
                    ease: "linear",
                    repeatDelay: 0
                  }
                }}
                style={{
                  width: "fit-content",
                  willChange: "transform" // Optimasi performa
                }}
              >
                {/* Data fitur - 12 card original */}
                {[
                  // Umum (4 card)
                  { icon: <Brain className="w-8 h-8" />, title: "AI Health Assistant", desc: "Asisten pintar 24/7 siap menjawab pertanyaan kesehatan", color: "from-purple-500 to-pink-500", bgColor: "bg-purple-50", category: "Umum" },
                  { icon: <Video className="w-8 h-8" />, title: "Konsultasi Video", desc: "Bertemu dokter spesialis melalui video call", color: "from-blue-500 to-cyan-500", bgColor: "bg-blue-50", category: "Umum" },
                  { icon: <Bell className="w-8 h-8" />, title: "Pengingat Obat", desc: "Notifikasi jadwal minum obat yang akurat", color: "from-orange-500 to-red-500", bgColor: "bg-orange-50", category: "Umum" },
                  { icon: <Activity className="w-8 h-8" />, title: "Monitoring Real-time", desc: "Pantau kesehatan lansia dari mana saja", color: "from-green-500 to-emerald-500", bgColor: "bg-green-50", category: "Umum" },

                  // Pasca Operasi (8 card)
                  { icon: <HeartPulse className="w-8 h-8" />, title: "Pemulihan Jantung", desc: "Program rehabilitasi jantung pasca operasi", color: "from-red-500 to-pink-500", bgColor: "bg-red-50", category: "Pasca Operasi" },
                  { icon: <Bone className="w-8 h-8" />, title: "Rehabilitasi Tulang", desc: "Latihan fisioterapi pasca operasi ortopedi", color: "from-amber-500 to-orange-500", bgColor: "bg-amber-50", category: "Pasca Operasi" },
                  { icon: <Bandage className="w-8 h-8" />, title: "Perawatan Luka", desc: "Panduan merawat luka operasi agar cepat sembuh", color: "from-blue-500 to-indigo-500", bgColor: "bg-blue-50", category: "Pasca Operasi" },
                  { icon: <Apple className="w-8 h-8" />, title: "Nutrisi Pemulihan", desc: "Makanan khusus untuk percepat penyembuhan", color: "from-green-500 to-lime-500", bgColor: "bg-green-50", category: "Pasca Operasi" },
                  { icon: <Wind className="w-8 h-8" />, title: "Terapi Pernapasan", desc: "Latihan pernapasan pasca operasi paru", color: "from-cyan-500 to-teal-500", bgColor: "bg-cyan-50", category: "Pasca Operasi" },
                  { icon: <Eye className="w-8 h-8" />, title: "Perawatan Mata", desc: "Panduan pasca operasi katarak", color: "from-purple-500 to-violet-500", bgColor: "bg-purple-50", category: "Pasca Operasi" },
                  { icon: <Droplets className="w-8 h-8" />, title: "Manajemen Nyeri", desc: "Cara mengatasi rasa sakit pasca operasi", color: "from-orange-500 to-amber-500", bgColor: "bg-orange-50", category: "Pasca Operasi" },
                  { icon: <Stethoscope className="w-8 h-8" />, title: "Kontrol Rutin", desc: "Jadwal kontrol pasca operasi teratur", color: "from-indigo-500 to-purple-500", bgColor: "bg-indigo-50", category: "Pasca Operasi" }
                ].concat(
                  // Duplikasi 14x untuk infinite smooth (total 12 + 168 = 180 card)
                  ...Array(14).fill([
                    { icon: <Brain className="w-8 h-8" />, title: "AI Health Assistant", desc: "Asisten pintar 24/7 siap menjawab pertanyaan kesehatan", color: "from-purple-500 to-pink-500", bgColor: "bg-purple-50", category: "Umum" },
                    { icon: <Video className="w-8 h-8" />, title: "Konsultasi Video", desc: "Bertemu dokter spesialis melalui video call", color: "from-blue-500 to-cyan-500", bgColor: "bg-blue-50", category: "Umum" },
                    { icon: <Bell className="w-8 h-8" />, title: "Pengingat Obat", desc: "Notifikasi jadwal minum obat yang akurat", color: "from-orange-500 to-red-500", bgColor: "bg-orange-50", category: "Umum" },
                    { icon: <Activity className="w-8 h-8" />, title: "Monitoring Real-time", desc: "Pantau kesehatan lansia dari mana saja", color: "from-green-500 to-emerald-500", bgColor: "bg-green-50", category: "Umum" },
                    { icon: <HeartPulse className="w-8 h-8" />, title: "Pemulihan Jantung", desc: "Program rehabilitasi jantung pasca operasi", color: "from-red-500 to-pink-500", bgColor: "bg-red-50", category: "Pasca Operasi" },
                    { icon: <Bone className="w-8 h-8" />, title: "Rehabilitasi Tulang", desc: "Latihan fisioterapi pasca operasi ortopedi", color: "from-amber-500 to-orange-500", bgColor: "bg-amber-50", category: "Pasca Operasi" },
                    { icon: <Bandage className="w-8 h-8" />, title: "Perawatan Luka", desc: "Panduan merawat luka operasi agar cepat sembuh", color: "from-blue-500 to-indigo-500", bgColor: "bg-blue-50", category: "Pasca Operasi" },
                    { icon: <Apple className="w-8 h-8" />, title: "Nutrisi Pemulihan", desc: "Makanan khusus untuk percepat penyembuhan", color: "from-green-500 to-lime-500", bgColor: "bg-green-50", category: "Pasca Operasi" },
                    { icon: <Wind className="w-8 h-8" />, title: "Terapi Pernapasan", desc: "Latihan pernapasan pasca operasi paru", color: "from-cyan-500 to-teal-500", bgColor: "bg-cyan-50", category: "Pasca Operasi" },
                    { icon: <Eye className="w-8 h-8" />, title: "Perawatan Mata", desc: "Panduan pasca operasi katarak", color: "from-purple-500 to-violet-500", bgColor: "bg-purple-50", category: "Pasca Operasi" },
                    { icon: <Droplets className="w-8 h-8" />, title: "Manajemen Nyeri", desc: "Cara mengatasi rasa sakit pasca operasi", color: "from-orange-500 to-amber-500", bgColor: "bg-orange-50", category: "Pasca Operasi" },
                    { icon: <Stethoscope className="w-8 h-8" />, title: "Kontrol Rutin", desc: "Jadwal kontrol pasca operasi teratur", color: "from-indigo-500 to-purple-500", bgColor: "bg-indigo-50", category: "Pasca Operasi" }
                  ])
                ).flat().map((feature, i) => (
                  <motion.div
                    key={i}
                    className={`${feature.bgColor} p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-slate-100 min-w-[280px] sm:min-w-[300px] group relative overflow-hidden cursor-pointer`}
                    whileHover={{
                      scale: 1.05,
                      transition: { type: "spring", stiffness: 400, damping: 10 }
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.02 }}
                  >
                    {/* Animated Background Gradient */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${feature.color}`}
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 0.1 }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Icon dengan Animasi */}
                    <motion.div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} bg-opacity-10 flex items-center justify-center mb-4 relative z-10`}
                      whileHover={{
                        scale: 1.2,
                        rotate: 360,
                        transition: { duration: 0.5 }
                      }}
                    >
                      <div className={`text-${feature.color.split('-')[1]}-600`}>
                        {feature.icon}
                      </div>
                    </motion.div>

                    {/* Content */}
                    <motion.h3
                      className="text-xl font-bold mb-2 relative z-10"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {feature.title}
                    </motion.h3>
                    <p className="text-slate-500 text-sm relative z-10">{feature.desc}</p>

                    {/* Category Badge dengan Animasi */}
                    <motion.div
                      className="mt-4 relative z-10"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${feature.category === "Pasca Operasi"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-emerald-100 text-emerald-700"
                        }`}>
                        {feature.category}
                      </span>
                    </motion.div>

                    {/* Decorative Rotating Circle */}
                    <motion.div
                      className={`absolute -bottom-4 -right-4 w-20 h-20 bg-gradient-to-br ${feature.color} rounded-full opacity-10`}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    />

                    {/* Shine Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20"
                      animate={{
                        x: ["-100%", "200%"],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        repeatDelay: 3,
                      }}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Navigation Buttons dengan Animasi */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                const slider = document.querySelector('.overflow-hidden');
                slider.scrollBy({ left: -320, behavior: 'smooth' });
              }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all z-20 border border-emerald-100"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                const slider = document.querySelector('.overflow-hidden');
                slider.scrollBy({ left: 320, behavior: 'smooth' });
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all z-20 border border-emerald-100"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>

          {/* Modern Progress Indicator */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <div className="flex gap-1">
              {[0, 1, 2, 3, 4].map((dot) => (
                <motion.div
                  key={dot}
                  className="w-2 h-2 rounded-full bg-emerald-200"
                  animate={{
                    scale: [1, 1.5, 1],
                    backgroundColor: ["#a7f3d0", "#10b981", "#a7f3d0"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: dot * 0.4,
                  }}
                />
              ))}
            </div>

            <motion.div
              className="flex items-center gap-2"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-24 h-1 bg-slate-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
                  animate={{
                    x: ["-100%", "100%", "300%", "500%", "700%", "900%", "1100%", "1300%", "1500%", "-100%"],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 180,
                    ease: "linear"
                  }}
                />
              </div>
              <span className="text-sm text-slate-400 font-medium">Auto-scrolling ke kanan</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section ref={el => sectionRefs.current[3] = el} data-index="3" className="py-16 sm:py-24 px-4 sm:px-6 bg-white">
        <div className={`max-w-7xl mx-auto ${fadeInUpClass(3)}`}>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Apa Kata Mereka?
            </h2>
            <p className="text-slate-500 text-lg">
              Ribuan keluarga telah merasakan manfaat GiveCare
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Ibu Siti Rahayu",
                role: "Caregiver",
                testimonial: "Aplikasi ini sangat membantu saya merawat ibu yang baru operasi tulang. Panduan pasca operasinya lengkap!",
                rating: 5,
                image: "S"
              },
              {
                name: "Bapak Ahmad Fauzi",
                role: "Anak Lansia",
                testimonial: "Fitur konsultasi dengan dokter spesialis jantung sangat membantu ayah saya yang punya riwayat jantung.",
                rating: 5,
                image: "A"
              },
              {
                name: "Ibu Maria Susanti",
                role: "Lansia",
                testimonial: "Saya bisa cek tekanan darah sendiri di rumah. Tenang dan praktis sekali!",
                rating: 5,
                image: "M"
              }
            ].map((testi, i) => (
              <div key={i} className="bg-gradient-to-br from-slate-50 to-white p-8 rounded-3xl shadow-lg border border-slate-100">
                <div className="flex items-center gap-2 mb-4">
                  {[...Array(testi.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-600 mb-6 italic">"{testi.testimonial}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold text-lg">
                    {testi.image}
                  </div>
                  <div>
                    <p className="font-bold">{testi.name}</p>
                    <p className="text-sm text-slate-500">{testi.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={el => sectionRefs.current[4] = el} data-index="4" className="py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-br from-emerald-600 to-teal-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-3xl"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/20 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>

        <div className={`max-w-4xl mx-auto text-center relative z-10 ${fadeInUpClass(4)}`}>
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
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-500 { animation-delay: 0.5s; }
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