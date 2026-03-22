"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import FloatingChat from "@/components/FloatingChat";
import {
  MapPin, Phone, Mail, Clock, MessageCircle, Send, Facebook,
  Twitter, Instagram, Linkedin, Youtube, Heart, ChevronRight,
  Sparkles, ArrowRight, CheckCircle, Building, Globe, Calendar,
  Users, Award, Shield, Home, Briefcase, Coffee, Smile, Star,
  ChevronDown, Hospital, Stethoscope, HeartPulse, Bandage
} from "lucide-react";

export default function KontakPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    serviceType: "umum",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeMap, setActiveMap] = useState("jakarta");
  const [isVisible, setIsVisible] = useState({});
  const [selectedService, setSelectedService] = useState("umum");
  const sectionRefs = useRef([]);

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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        serviceType: "umum",
        message: ""
      });
      
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  const locations = [
    {
      id: "jakarta",
      name: "Jakarta",
      address: "Jl. Sudirman No. 123, Jakarta Selatan",
      phone: "+62 21 1234 5678",
      email: "jakarta@lansiacare.id",
      hours: "Senin - Jumat, 08:00 - 20:00 | Sabtu, 09:00 - 17:00",
      map: "https://maps.google.com/maps?q=Jakarta&t=&z=13&ie=UTF8&iwloc=&output=embed",
      services: ["Umum", "Pasca Operasi", "Konsultasi Dokter"]
    },
    {
      id: "surabaya",
      name: "Surabaya",
      address: "Jl. Raya Darmo No. 45, Surabaya",
      phone: "+62 31 9876 5432",
      email: "surabaya@lansiacare.id",
      hours: "Senin - Jumat, 08:00 - 20:00 | Sabtu, 09:00 - 17:00",
      map: "https://maps.google.com/maps?q=Surabaya&t=&z=13&ie=UTF8&iwloc=&output=embed",
      services: ["Umum", "Pasca Operasi", "Homecare"]
    },
    {
      id: "bandung",
      name: "Bandung",
      address: "Jl. Braga No. 78, Bandung",
      phone: "+62 22 4567 8901",
      email: "bandung@lansiacare.id",
      hours: "Senin - Jumat, 08:00 - 20:00 | Sabtu, 09:00 - 17:00",
      map: "https://maps.google.com/maps?q=Bandung&t=&z=13&ie=UTF8&iwloc=&output=embed",
      services: ["Umum", "Pasca Operasi", "Rehabilitasi"]
    },
    {
      id: "medan",
      name: "Medan",
      address: "Jl. Gatot Subroto No. 234, Medan",
      phone: "+62 61 7890 1234",
      email: "medan@lansiacare.id",
      hours: "Senin - Jumat, 08:00 - 20:00 | Sabtu, 09:00 - 17:00",
      map: "https://maps.google.com/maps?q=Medan&t=&z=13&ie=UTF8&iwloc=&output=embed",
      services: ["Umum", "Pasca Operasi", "Konsultasi Dokter", "Homecare"]
    }
  ];

  const activeLocation = locations.find(loc => loc.id === activeMap) || locations[0];

  const faqs = [
    {
      q: "Bagaimana cara konsultasi dengan dokter untuk umum?",
      a: "Anda dapat melakukan konsultasi melalui website kami dengan memilih menu Konsultasi. Pilih dokter umum atau spesialis, jadwal, dan metode konsultasi (video call atau chat)."
    },
    {
      q: "Layanan pasca operasi apa saja yang tersedia?",
      a: "Kami menyediakan layanan perawatan luka, rehabilitasi, fisioterapi, konsultasi nutrisi, dan pendampingan pemulihan pasca operasi oleh tenaga medis profesional."
    },
    {
      q: "Apakah layanan homecare tersedia di Medan?",
      a: "Ya, layanan homecare kami telah tersedia di Jakarta, Surabaya, Bandung, dan Medan. Kami terus memperluas jangkauan layanan ke kota-kota lainnya."
    },
    {
      q: "Apakah ada konsultasi gratis untuk pasien pasca operasi?",
      a: "Ya, kami memberikan konsultasi gratis pertama untuk pasien pasca operasi. Silakan hubungi tim kami untuk informasi lebih lanjut."
    }
  ];

  const [openFaq, setOpenFaq] = useState(null);

  const serviceOptions = [
    { id: "umum", name: "Kesehatan Umum", icon: <Heart className="w-4 h-4" />, desc: "Konsultasi umum, cek kesehatan, edukasi" },
    { id: "pasca-operasi", name: "Pasca Operasi", icon: <Bandage className="w-4 h-4" />, desc: "Perawatan luka, rehabilitasi, fisioterapi" },
    { id: "konsultasi", name: "Konsultasi Dokter", icon: <Stethoscope className="w-4 h-4" />, desc: "Dokter umum & spesialis" },
    { id: "homecare", name: "Homecare", icon: <Home className="w-4 h-4" />, desc: "Perawatan di rumah, perawat profesional" }
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
              <MessageCircle className="w-4 h-4" />
              HUBUNGI KAMI
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Kami Siap Membantu{' '}
              <span className="text-[#DBAA28]">Kesehatan Anda</span>
            </h1>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Ada pertanyaan tentang layanan kesehatan umum atau pasca operasi? Tim customer service kami siap membantu Anda 24/7.
            </p>

            {/* Service Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {serviceOptions.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setSelectedService(service.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                    selectedService === service.id
                      ? "bg-[#DBAA28] text-[#233E2E] shadow-lg"
                      : "bg-white/20 text-white hover:bg-white/30"
                  }`}
                >
                  {service.icon}
                  {service.name}
                </button>
              ))}
            </div>

            <p className="text-sm text-white/80">
              {serviceOptions.find(s => s.id === selectedService)?.desc}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Cards - 4 Kolom */}
      <section className="py-12 px-4 sm:px-6 -mt-8 relative z-30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: <Phone className="w-6 h-6" />, title: "Telepon", value: "+62 21 1234 5678", desc: "Senin - Sabtu, 08:00 - 20:00", color: "from-[#233E2E] to-[#3E624C]" },
              { icon: <Mail className="w-6 h-6" />, title: "Email", value: "kawanPulih@gmail.com", desc: "Balas dalam 24 jam", color: "from-[#3E624C] to-[#434C47]" },
              { icon: <MessageCircle className="w-6 h-6" />, title: "WhatsApp", value: "+62 812-3456-7890", desc: "Respon cepat 24/7", color: "from-[#434C47] to-[#233E2E]" },
              { icon: <Clock className="w-6 h-6" />, title: "Jam Operasional", value: "24/7", desc: "Layanan darurat 24 jam", color: "from-[#3C6243] to-[#DBAA28]" }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 text-center group"
              >
<<<<<<< HEAD
                <div className={`w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br ${item.color} bg-opacity-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                  <div className="text-white">{item.icon}</div>
                </div>
=======
                <motion.div
                  className={`w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center`}
                  whileHover={{
                    rotate: 360,
                    scale: 1.1,
                    transition: {
                      duration: 0.4,
                      ease: "easeOut"
                    }
                  }}
                >
                  <div className="text-white">{item.icon}</div>
                </motion.div>
>>>>>>> 53bf00e978b720028a96aadfd7c1205b164763cf
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-slate-800 font-medium mb-1">{item.value}</p>
                <p className="text-sm text-slate-500">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Kontak & Map Section */}
      <section ref={el => sectionRefs.current[0] = el} data-index="0" className="py-16 px-4 sm:px-6">
        <div className={`max-w-7xl mx-auto ${fadeInUpClass(0)}`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100"
            >
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Kirim Pesan</h2>
                <p className="text-slate-500">Isi form di bawah ini, tim kami akan segera merespon</p>
              </div>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border border-green-200 rounded-xl p-6 text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-green-800 mb-2">Pesan Terkirim!</h3>
                  <p className="text-green-600">Terima kasih, tim kami akan segera menghubungi Anda.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Nama Lengkap *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#233E2E] focus:border-transparent transition-all"
                        placeholder="Nama Anda"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#233E2E] focus:border-transparent transition-all"
                        placeholder="email@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Nomor Telepon</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#233E2E] focus:border-transparent transition-all"
                        placeholder="+62 812-3456-7890"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Jenis Layanan *</label>
                      <select
                        name="serviceType"
                        value={formData.serviceType}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#233E2E] focus:border-transparent transition-all bg-white"
                      >
                        <option value="umum">Kesehatan Umum</option>
                        <option value="pasca-operasi">Pasca Operasi</option>
                        <option value="konsultasi">Konsultasi Dokter</option>
                        <option value="homecare">Homecare</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Subjek *</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#233E2E] focus:border-transparent transition-all"
                      placeholder="Subjek pesan"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Pesan *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#233E2E] focus:border-transparent transition-all resize-none"
                      placeholder="Tulis pesan Anda di sini..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[#233E2E] to-[#3E624C] text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-500 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Mengirim...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Kirim Pesan
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Right Column - Map & Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Location Tabs */}
              <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
                <div className="flex flex-wrap border-b border-slate-100">
                  {locations.map((loc) => (
                    <button
                      key={loc.id}
                      onClick={() => setActiveMap(loc.id)}
                      className={`px-4 py-3 text-sm font-medium transition-all duration-300 ${
                        activeMap === loc.id
                          ? "bg-[#233E2E] text-white"
                          : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {loc.name}
                    </button>
                  ))}
                </div>
                
                <div className="p-4">
                  <div className="h-64 rounded-xl overflow-hidden mb-4">
                    <iframe
                      src={activeLocation.map}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="w-full h-full"
                    ></iframe>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-[#233E2E] mt-0.5" />
                      <div>
                        <p className="font-medium text-slate-800">Alamat</p>
                        <p className="text-sm text-slate-500">{activeLocation.address}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-[#233E2E] mt-0.5" />
                      <div>
                        <p className="font-medium text-slate-800">Telepon</p>
                        <p className="text-sm text-slate-500">{activeLocation.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-[#233E2E] mt-0.5" />
                      <div>
                        <p className="font-medium text-slate-800">Email</p>
                        <p className="text-sm text-slate-500">{activeLocation.email}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-[#233E2E] mt-0.5" />
                      <div>
                        <p className="font-medium text-slate-800">Jam Operasional</p>
                        <p className="text-sm text-slate-500">{activeLocation.hours}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <HeartPulse className="w-5 h-5 text-[#233E2E] mt-0.5" />
                      <div>
                        <p className="font-medium text-slate-800">Layanan</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {activeLocation.services.map((service, idx) => (
                            <span key={idx} className="text-xs bg-[#233E2E]/10 text-[#233E2E] px-2 py-0.5 rounded-full">
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Contact */}
              <div className="bg-gradient-to-r from-[#233E2E] to-[#3E624C] rounded-2xl p-6 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <MessageCircle className="w-6 h-6" />
                  <h3 className="text-lg font-bold">Butuh Bantuan Cepat?</h3>
                </div>
                <p className="text-white/90 text-sm mb-4">
                  Hubungi customer service kami melalui WhatsApp untuk respon tercepat
                </p>
                <Link href="https://wa.me/6281234567890" target="_blank">
                  <button className="w-full bg-white text-[#233E2E] py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-500 flex items-center justify-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    Chat WhatsApp
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Service Info Cards */}
      <section className="py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[#233E2E]/10 text-[#233E2E] px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Hospital className="w-4 h-4" />
              LAYANAN KAMI
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Layanan Kesehatan{' '}
              <span className="bg-gradient-to-r from-[#233E2E] to-[#3E624C] bg-clip-text text-transparent">
                Umum & Pasca Operasi
              </span>
            </h2>
            <p className="text-slate-500 text-lg">
              Kami menyediakan berbagai layanan kesehatan untuk kebutuhan umum dan pemulihan pasca operasi
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Heart className="w-8 h-8" />, title: "Konsultasi Umum", desc: "Konsultasi dengan dokter umum untuk berbagai keluhan kesehatan", color: "from-[#233E2E] to-[#3E624C]" },
              { icon: <Bandage className="w-8 h-8" />, title: "Perawatan Pasca Operasi", desc: "Perawatan luka, manajemen nyeri, dan rehabilitasi", color: "from-[#3E624C] to-[#434C47]" },
              { icon: <Stethoscope className="w-8 h-8" />, title: "Konsultasi Spesialis", desc: "Dokter spesialis jantung, tulang, saraf, dan lainnya", color: "from-[#434C47] to-[#233E2E]" },
              { icon: <Home className="w-8 h-8" />, title: "Homecare", desc: "Perawatan di rumah oleh perawat profesional", color: "from-[#3C6243] to-[#DBAA28]" }
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 text-center group"
              >
                <motion.div
                  className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center`}
                  whileHover={{
                    rotate: 360,
                    scale: 1.15,
                    transition: {
                      duration: 0.4,
                      ease: "easeOut"
                    }
                  }}
                >
                  <div className="text-white">{service.icon}</div>
                </motion.div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-[#233E2E] transition-colors">{service.title}</h3>
                <p className="text-sm text-slate-500">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section ref={el => sectionRefs.current[1] = el} data-index="1" className="py-16 px-4 sm:px-6 bg-gradient-to-b from-slate-50 to-white">
        <div className={`max-w-4xl mx-auto ${fadeInUpClass(1)}`}>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[#233E2E]/10 text-[#233E2E] px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Sparkles className="w-4 h-4" />
              PERTANYAAN UMUM
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Yang Sering Ditanyakan
            </h2>
            <p className="text-slate-500 text-lg">
              Temukan jawaban untuk pertanyaan yang sering diajukan seputar layanan kesehatan umum dan pasca operasi
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between group"
                >
                  <h3 className="font-semibold text-lg group-hover:text-[#233E2E] transition-colors">
                    {faq.q}
                  </h3>
                  <motion.div
                    animate={{ rotate: openFaq === index ? 90 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-[#233E2E]" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFaq === index && (
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
            ))}
          </div>
        </div>
      </section>

            {/* Office Gallery Section */}
      <section className="py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-[#233E2E]/10 text-[#233E2E] px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Building className="w-4 h-4" />
              GALERI KANTOR KAMI
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Suasana &{' '}
              <span className="bg-gradient-to-r from-[#233E2E] to-[#3E624C] bg-clip-text text-transparent">
                Fasilitas Kami
              </span>
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              Lihat suasana dan fasilitas yang kami sediakan untuk kenyamanan pasien
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { 
                title: "Ruang Tunggu Nyaman", 
                image: "/images/kontak/gallery-1.jpg",
                desc: "Area tunggu yang nyaman dengan fasilitas lengkap"
              },
              { 
                title: "Ruang Konsultasi", 
                image: "/images/kontak/gallery-2.jpg",
                desc: "Ruang konsultasi privat dengan dokter spesialis"
              },
              { 
                title: "Tim Medis Profesional", 
                image: "/images/kontak/gallery-3.jpg",
                desc: "Tenaga medis berpengalaman dan ramah"
              },
              { 
                title: "Fasilitas Lengkap", 
                image: "/images/kontak/gallery-4.jpg",
                desc: "Peralatan medis modern dan lengkap"
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      e.target.src = "https://placehold.co/600x400/e2e8f0/475569?text=Foto+Coming+Soon";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <p className="text-sm font-semibold">{item.desc}</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-bold text-slate-800 group-hover:text-[#233E2E] transition-colors">
                    {item.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tombol Lihat Lebih Banyak */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center mt-10"
          >
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 bg-gradient-to-br from-[#233E2E] to-[#3E624C] text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Siap untuk Konsultasi?
          </h2>
          <p className="text-lg mb-8 text-white/90">
            Jangan ragu untuk menghubungi kami. Tim medis profesional kami siap membantu kesehatan umum dan pemulihan pasca operasi Anda
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
