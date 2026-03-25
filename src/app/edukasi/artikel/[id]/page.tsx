"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import FloatingChat from "@/components/FloatingChat";
import {
    Heart, BookOpen, Clock, Eye, ThumbsUp, Bookmark,
    ChevronLeft, ChevronRight, User, Calendar, MessageCircle,
    Printer, Download, ArrowLeft, Sparkles, CheckCircle, AlertCircle,
    Stethoscope, Bandage, Apple, Brain, Activity, Pill, HeartPulse,
    Bone, Eye as EyeIcon, Smile, TrendingUp, Star, Award, Shield, Zap,
    ChevronDown, ChevronUp, Twitter, Facebook, Linkedin, Link as LinkIcon,
    Menu, X, Dumbbell, Footprints, Coffee, Moon, Sun, Droplets, Wheat,
    Salad, Fish, Egg, Milk, Timer, BarChart, Target, Globe, Phone, Mail,
    MapPin, GraduationCap, Briefcase, CalendarDays, Clock3, UsersRound,
    Droplet, Thermometer, Weight, Syringe, Microscope, FlaskConical,
    Ear, Lungs, Salad as SaladIcon, Citrus, Milk as MilkIcon
} from "lucide-react";


const articlesData = {
    // ==================== NUTRISI ====================
    1: {
        id: 1,
        title: "Panduan Lengkap Nutrisi untuk Lansia",
        excerpt: "Makanan sehat dan pola gizi seimbang untuk menjaga vitalitas di usia lanjut.",
        category: "nutrisi",
        subCategory: "umum",
        image: "/images/edukasi/nutrisi.jpg",
        author: "dr. Sarah Wijaya, Sp.GK",
        authorDesc: "Spesialis Gizi Klinik dengan pengalaman 12 tahun",
        authorBio: "Dr. Sarah Wijaya adalah spesialis gizi klinik yang telah menangani lebih dari 3.000 pasien lansia. Beliau aktif dalam penelitian tentang nutrisi untuk penuaan sehat dan sering menjadi pembicara di berbagai seminar kesehatan.",
        authorEducation: ["Spesialis Gizi Klinik - Universitas Indonesia", "Dokter Umum - Universitas Indonesia"],
        authorExperience: "12 tahun pengalaman di bidang gizi klinik",
        authorPatients: "3.000+ pasien lansia",
        date: "2 Maret 2026",
        readTime: "8 menit",
        views: "2.5K",
        likes: 342,
        tags: ["Gizi", "Makanan Sehat", "Suplemen", "Lansia", "Nutrisi", "Vitamin", "Protein"],
        content: `
      <div class="mb-6">
        <p class="text-lg leading-relaxed">Kesehatan lansia sangat dipengaruhi oleh asupan nutrisi yang tepat. Seiring bertambahnya usia, tubuh mengalami berbagai perubahan fisiologis seperti penurunan massa otot, metabolisme yang melambat, dan penurunan fungsi organ. Nutrisi yang tepat dapat membantu menjaga kualitas hidup lansia tetap optimal.</p>
      </div>
      
      <h2>🍽️ Mengapa Nutrisi Penting untuk Lansia?</h2>
      <p>Seiring bertambahnya usia, terjadi berbagai perubahan yang mempengaruhi kebutuhan gizi:</p>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
        <div class="bg-green-50 p-4 rounded-xl">
          <div class="flex items-center gap-2 mb-2">
            <Activity class="w-5 h-5 text-green-600" />
            <h3 class="font-semibold text-green-800">Penurunan Massa Otot</h3>
          </div>
          <p class="text-sm text-green-700">Membutuhkan protein lebih tinggi untuk mencegah sarkopenia dan menjaga kekuatan tubuh.</p>
        </div>
        <div class="bg-blue-50 p-4 rounded-xl">
          <div class="flex items-center gap-2 mb-2">
            <Timer class="w-5 h-5 text-blue-600" />
            <h3 class="font-semibold text-blue-800">Metabolisme Melambat</h3>
          </div>
          <p class="text-sm text-blue-700">Kebutuhan kalori berkurang namun kebutuhan nutrisi tetap tinggi.</p>
        </div>
        <div class="bg-amber-50 p-4 rounded-xl">
          <div class="flex items-center gap-2 mb-2">
            <Droplets class="w-5 h-5 text-amber-600" />
            <h3 class="font-semibold text-amber-800">Penurunan Fungsi Pencernaan</h3>
          </div>
          <p class="text-sm text-amber-700">Penyerapan nutrisi menjadi kurang optimal, terutama vitamin B12 dan zat besi.</p>
        </div>
        <div class="bg-purple-50 p-4 rounded-xl">
          <div class="flex items-center gap-2 mb-2">
            <HeartPulse class="w-5 h-5 text-purple-600" />
            <h3 class="font-semibold text-purple-800">Risiko Penyakit Kronis</h3>
          </div>
          <p class="text-sm text-purple-700">Nutrisi berperan penting dalam pencegahan dan pengelolaan penyakit.</p>
        </div>
      </div>
      
      <h2>📊 Kebutuhan Gizi Harian Lansia</h2>
      <div class="bg-slate-50 p-5 rounded-xl my-4">
        <table class="w-full text-sm">
          <tr class="border-b border-slate-200">
            <td class="py-2 font-semibold">Kalori</td>
            <td class="py-2">1.800-2.000 kkal/hari</td>
          </tr>
          <tr class="border-b border-slate-200">
            <td class="py-2 font-semibold">Protein</td>
            <td class="py-2">50-60 gram (1-1,2 g/kg BB)</td>
          </tr>
          <tr class="border-b border-slate-200">
            <td class="py-2 font-semibold">Karbohidrat</td>
            <td class="py-2">200-250 gram (dari sumber kompleks)</td>
          </tr>
          <tr class="border-b border-slate-200">
            <td class="py-2 font-semibold">Serat</td>
            <td class="py-2">25-30 gram</td>
          </tr>
          <tr class="border-b border-slate-200">
            <td class="py-2 font-semibold">Kalsium</td>
            <td class="py-2">1.000-1.200 mg</td>
          </tr>
          <tr class="border-b border-slate-200">
            <td class="py-2 font-semibold">Vitamin D</td>
            <td class="py-2">800-1.000 IU</td>
          </tr>
          <tr>
            <td class="py-2 font-semibold">Air</td>
            <td class="py-2">1.500-2.000 ml (6-8 gelas)</td>
          </tr>
        </table>
      </div>
      
      <h2>🐟 Sumber Makanan yang Dianjurkan</h2>
      
      <div class="bg-white border border-slate-200 rounded-xl p-5 my-4 shadow-sm">
        <div class="flex items-center gap-3 mb-3">
          <div class="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
            <Fish class="w-5 h-5 text-emerald-600" />
          </div>
          <h3 class="text-lg font-bold text-slate-800">Protein Berkualitas Tinggi</h3>
        </div>
        <p><strong>Ikan laut:</strong> Salmon, tuna, kembung (kaya omega-3 untuk kesehatan jantung dan otak)</p>
        <p><strong>Ayam tanpa kulit:</strong> Protein tinggi, rendah lemak jenuh</p>
        <p><strong>Telur:</strong> Sumber protein lengkap dengan asam amino esensial</p>
        <p><strong>Tahu dan Tempe:</strong> Protein nabati yang mudah dicerna, kaya isoflavon</p>
        <p><strong>Susu dan Yogurt:</strong> Rendah lemak, tinggi kalsium untuk tulang</p>
      </div>
      
      <div class="bg-white border border-slate-200 rounded-xl p-5 my-4 shadow-sm">
        <div class="flex items-center gap-3 mb-3">
          <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <SaladIcon class="w-5 h-5 text-green-600" />
          </div>
          <h3 class="text-lg font-bold text-slate-800">Sayuran Hijau dan Buah-buahan</h3>
        </div>
        <p><strong>Sayuran hijau:</strong> Bayam, brokoli, kangkung (kaya zat besi, folat, dan serat)</p>
        <p><strong>Buah-buahan:</strong> Pepaya (melancarkan pencernaan), pisang (kalium), apel (serat), jeruk (vitamin C)</p>
        <p><strong>Sayuran berwarna:</strong> Wortel (vitamin A), tomat (likopen antioksidan), labu (beta-karoten)</p>
      </div>
      
      <div class="bg-white border border-slate-200 rounded-xl p-5 my-4 shadow-sm">
        <div class="flex items-center gap-3 mb-3">
          <div class="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
            <Wheat class="w-5 h-5 text-amber-600" />
          </div>
          <h3 class="text-lg font-bold text-slate-800">Karbohidrat Kompleks</h3>
        </div>
        <p><strong>Nasi merah:</strong> Kaya serat, vitamin B, dan magnesium</p>
        <p><strong>Oatmeal:</strong> Mudah dicerna, baik untuk jantung dan kolesterol</p>
        <p><strong>Ubi jalar:</strong> Kaya vitamin A dan serat, indeks glikemik rendah</p>
        <p><strong>Roti gandum:</strong> Sumber karbohidrat dengan serat tinggi</p>
      </div>
      
      <h2>🚫 Makanan yang Perlu Dibatasi</h2>
      <ul>
        <li><strong>Garam:</strong> Kurang dari 5 gram/hari (1 sendok teh) untuk mencegah hipertensi</li>
        <li><strong>Gula:</strong> Kurang dari 4 sendok makan/hari untuk mencegah diabetes</li>
        <li><strong>Lemak jenuh:</strong> Kurangi makanan berminyak, gorengan, jeroan</li>
        <li><strong>Makanan olahan:</strong> Tinggi natrium dan pengawet</li>
        <li><strong>Alkohol:</strong> Dapat berinteraksi dengan obat-obatan</li>
      </ul>
      
      <div class="bg-emerald-50 p-6 rounded-xl my-6 border-l-4 border-emerald-500">
        <h3 class="font-bold text-emerald-800 mb-2 flex items-center gap-2"><Stethoscope className="w-5 h-5" /> Tips dari Dokter Spesialis Gizi</h3>
        <p class="text-emerald-700 mb-2">"Jangan lupa untuk selalu berkonsultasi dengan dokter sebelum mengubah pola makan, terutama jika memiliki kondisi kesehatan tertentu seperti diabetes atau hipertensi. Setiap lansia memiliki kebutuhan nutrisi yang berbeda sesuai kondisi kesehatannya."</p>
        <p class="text-emerald-700 italic">- dr. Sarah Wijaya, Sp.GK</p>
      </div>
      
      <div class="bg-blue-50 p-6 rounded-xl my-6">
        <h3 class="font-bold text-blue-800 mb-2">📋 Contoh Menu Sehari untuk Lansia</h3>
        <ul class="text-blue-700 space-y-1">
          <li><strong>Sarapan (07.00):</strong> Oatmeal dengan pisang dan susu rendah lemak + telur rebus</li>
          <li><strong>Camilan (10.00):</strong> Buah pepaya potong</li>
          <li><strong>Makan Siang (12.00):</strong> Nasi merah + ikan kukus + sayur bening bayam</li>
          <li><strong>Camilan (15.00):</strong> Yogurt + kacang almond</li>
          <li><strong>Makan Malam (18.00):</strong> Sup ayam kampung + tahu tempe bacem</li>
        </ul>
      </div>
    `
    },

    // ==================== PENYAKIT - HIPERTENSI ====================
    2: {
        id: 2,
        title: "Mengenal Hipertensi pada Lansia",
        excerpt: "Penyebab, gejala, dan cara mengelola tekanan darah tinggi di usia lanjut.",
        category: "penyakit",
        subCategory: "umum",
        image: "/images/edukasi/hipertensi.jpg",
        author: "dr. Ahmad Hasan, Sp.PD",
        authorDesc: "Spesialis Penyakit Dalam dengan fokus pada hipertensi dan kardiovaskular",
        authorBio: "Dr. Ahmad Hasan adalah spesialis penyakit dalam yang telah menangani lebih dari 5.000 pasien dengan hipertensi. Beliau aktif dalam penelitian tentang manajemen tekanan darah pada lansia.",
        authorEducation: ["Spesialis Penyakit Dalam - Universitas Indonesia", "Dokter Umum - Universitas Gadjah Mada"],
        authorExperience: "14 tahun pengalaman di bidang penyakit dalam",
        authorPatients: "5.000+ pasien",
        date: "1 Maret 2026",
        readTime: "8 menit",
        views: "3.1K",
        likes: 456,
        tags: ["Hipertensi", "Tekanan Darah", "Jantung", "Lansia", "Kardiovaskular"],
        content: `
      <div class="mb-6">
        <p class="text-lg leading-relaxed">Hipertensi atau tekanan darah tinggi adalah kondisi medis di mana tekanan darah berada pada level yang lebih tinggi dari normal. Pada lansia, hipertensi sering disebut sebagai "silent killer" karena sering tidak menunjukkan gejala namun dapat menyebabkan komplikasi serius seperti stroke dan serangan jantung.</p>
      </div>
      
      <h2>📈 Apa Itu Hipertensi?</h2>
      <p>Tekanan darah normal adalah <strong>kurang dari 120/80 mmHg</strong>. Hipertensi didefinisikan sebagai tekanan darah ≥130/80 mmHg. Angka pertama (sistolik) adalah tekanan saat jantung berdetak, angka kedua (diastolik) adalah tekanan saat jantung beristirahat.</p>
      
      <div class="bg-slate-50 p-5 rounded-xl my-4">
        <h3 class="font-bold mb-2">Klasifikasi Tekanan Darah</h3>
        <table class="w-full text-sm">
          <tr class="border-b border-slate-200">
            <td class="py-2 font-semibold">Normal</td>
            <td class="py-2">&lt; 120/80 mmHg</td>
          </tr>
          <tr class="border-b border-slate-200">
            <td class="py-2 font-semibold">Prehipertensi</td>
            <td class="py-2">120-129/&lt;80 mmHg</td>
          </tr>
          <tr class="border-b border-slate-200">
            <td class="py-2 font-semibold">Hipertensi Stadium 1</td>
            <td class="py-2">130-139/80-89 mmHg</td>
          </tr>
          <tr>
            <td class="py-2 font-semibold">Hipertensi Stadium 2</td>
            <td class="py-2">≥140/≥90 mmHg</td>
          </tr>
        </table>
      </div>
      
      <h2>⚠️ Penyebab Hipertensi pada Lansia</h2>
      <ul>
        <li><strong>Penuaan alami:</strong> Pembuluh darah menjadi lebih kaku dan sempit seiring usia</li>
        <li><strong>Gaya hidup:</strong> Konsumsi garam berlebih, kurang aktivitas fisik</li>
        <li><strong>Obesitas:</strong> Kelebihan berat badan meningkatkan volume darah dan tekanan pada dinding arteri</li>
        <li><strong>Stres:</strong> Dapat memicu peningkatan tekanan darah sementara</li>
        <li><strong>Riwayat keluarga:</strong> Faktor genetik berperan penting</li>
        <li><strong>Penyakit lain:</strong> Diabetes, penyakit ginjal, atau gangguan hormon</li>
      </ul>
      
      <div class="bg-red-50 p-6 rounded-xl my-6 border-l-4 border-red-500">
        <h3 class="font-bold text-red-800 mb-2 flex items-center gap-2"><AlertCircle className="w-5 h-5" /> Gejala yang Perlu Diwaspadai</h3>
        <ul class="text-red-700 list-disc list-inside">
          <li>Sakit kepala hebat, terutama di bagian belakang kepala</li>
          <li>Sesak napas atau napas terengah-engah</li>
          <li>Pusing atau vertigo</li>
          <li>Penglihatan kabur atau ganda</li>
          <li>Nyeri dada atau palpitasi (jantung berdebar)</li>
          <li>Mual atau muntah</li>
          <li>Hidung berdarah (epistaksis)</li>
        </ul>
      </div>
      
      <h2>💊 Cara Mengelola Hipertensi</h2>
      
      <h3>1. Perubahan Gaya Hidup (Terapi Non-Farmakologi)</h3>
      <ul>
        <li><strong>Diet DASH:</strong> Perbanyak sayur, buah, biji-bijian, produk rendah lemak</li>
        <li><strong>Kurangi garam:</strong> Batasi konsumsi garam kurang dari 5 gram/hari (1 sendok teh)</li>
        <li><strong>Olahraga teratur:</strong> 30 menit sehari, 5 kali seminggu (jalan cepat, berenang, bersepeda)</li>
        <li><strong>Jaga berat badan ideal:</strong> Turunkan 5-10% berat badan jika kelebihan</li>
        <li><strong>Batasi alkohol dan kafein:</strong> Dapat meningkatkan tekanan darah</li>
        <li><strong>Kelola stres:</strong> Teknik relaksasi, meditasi, atau yoga</li>
        <li><strong>Berhenti merokok:</strong> Rokok merusak pembuluh darah</li>
      </ul>
      
      <h3>2. Pengobatan Medis</h3>
      <ul>
        <li>Minum obat antihipertensi secara teratur sesuai resep dokter</li>
        <li>Jangan menghentikan obat tanpa konsultasi dokter (risiko rebound hypertension)</li>
        <li>Rutin kontrol tekanan darah ke fasilitas kesehatan</li>
        <li>Catat hasil pengukuran tekanan darah di rumah (buku harian tekanan darah)</li>
      </ul>
      
      <div class="bg-green-50 p-6 rounded-xl my-6">
        <h3 class="font-bold text-green-800 mb-2">📊 Target Tekanan Darah Lansia</h3>
        <p class="text-green-700">Untuk lansia tanpa penyakit penyerta, target tekanan darah <strong>&lt;130/80 mmHg</strong>. Untuk lansia dengan diabetes atau penyakit ginjal, target <strong>&lt;140/90 mmHg</strong>. Konsultasikan target yang tepat dengan dokter Anda.</p>
      </div>
      
      <div class="bg-blue-50 p-6 rounded-xl my-6">
        <h3 class="font-bold text-blue-800 mb-2">📋 Panduan Memantau Tekanan Darah di Rumah</h3>
        <ul class="text-blue-700 space-y-1">
          <li>✓ Gunakan tensimeter digital yang sudah terkalibrasi</li>
          <li>✓ Ukur pada waktu yang sama setiap hari (pagi sebelum minum obat, malam sebelum tidur)</li>
          <li>✓ Duduk tenang selama 5 menit sebelum pengukuran</li>
          <li>✓ Posisi duduk tegak, kaki tidak menyilang, lengan sejajar dengan jantung</li>
          <li>✓ Hindari merokok, minum kafein, atau olahraga 30 menit sebelum pengukuran</li>
          <li>✓ Lakukan 2-3 kali pengukuran, ambil rata-rata</li>
          <li>✓ Catat hasil dalam buku harian untuk dilaporkan ke dokter</li>
        </ul>
      </div>
    `
    },

    // ==================== OBAT ====================
    3: {
        id: 3,
        title: "Panduan Minum Obat yang Aman untuk Lansia",
        excerpt: "Cara tepat mengonsumsi obat-obatan untuk menghindari efek samping berbahaya.",
        category: "obat",
        subCategory: "umum",
        image: "/images/edukasi/obat.jpg",
        author: "apt. Maria Santoso, M.Farm",
        authorDesc: "Apoteker Klinis dengan pengalaman 10 tahun",
        authorBio: "apt. Maria Santoso adalah apoteker klinis yang berpengalaman dalam manajemen terapi obat pada pasien lansia. Beliau aktif dalam edukasi penggunaan obat yang aman.",
        authorEducation: ["Apoteker - Universitas Indonesia", "Farmasi Klinis - Universitas Gadjah Mada"],
        authorExperience: "10 tahun pengalaman di bidang farmasi klinis",
        authorPatients: "3.000+ pasien lansia",
        date: "28 Februari 2026",
        readTime: "8 menit",
        views: "1.8K",
        likes: 234,
        tags: ["Obat", "Farmasi", "Keamanan", "Lansia", "Efek Samping"],
        content: `
      <div class="mb-6">
        <p class="text-lg leading-relaxed">Konsumsi obat yang tepat sangat penting untuk keselamatan pasien, terutama pada lansia yang sering mengonsumsi lebih dari satu jenis obat. Berikut panduan minum obat yang aman untuk lansia.</p>
      </div>
      
      <h2>💊 Tips Minum Obat Aman</h2>
      <ul>
        <li><strong>Minum obat tepat waktu</strong> sesuai resep dokter</li>
        <li><strong>Jangan menghentikan obat</strong> tanpa konsultasi dokter (risiko efek rebound)</li>
        <li><strong>Baca aturan pakai</strong> dengan teliti sebelum mengonsumsi</li>
        <li><strong>Hindari menggandakan dosis</strong> jika lupa minum obat</li>
        <li><strong>Konsultasi segera</strong> jika muncul efek samping yang mengganggu</li>
        <li><strong>Gunakan pill organizer</strong> untuk membantu mengingat jadwal minum obat</li>
        <li><strong>Simpan obat</strong> di tempat yang sesuai dengan petunjuk penyimpanan</li>
        <li><strong>Periksa tanggal kedaluwarsa</strong> obat secara berkala</li>
      </ul>
      
      <div class="bg-blue-50 p-6 rounded-xl my-6">
        <h3 class="font-bold text-blue-800 mb-2">💊 Interaksi Obat yang Perlu Diwaspadai</h3>
        <p class="text-blue-700">Informasikan ke dokter semua obat yang sedang dikonsumsi, termasuk obat bebas dan suplemen herbal, untuk menghindari interaksi obat yang berbahaya. Lansia yang mengonsumsi lebih dari 5 jenis obat berisiko tinggi mengalami interaksi obat.</p>
      </div>
      
      <div class="bg-yellow-50 p-6 rounded-xl my-6 border-l-4 border-yellow-500">
        <h3 class="font-bold text-yellow-800 mb-2">⚠️ Efek Samping yang Harus Diwaspadai</h3>
        <ul class="text-yellow-700 list-disc list-inside">
          <li>Pusing atau mengantuk berlebihan (risiko jatuh)</li>
          <li>Ruam kulit atau gatal-gatal (reaksi alergi)</li>
          <li>Mual atau muntah hebat</li>
          <li>Perubahan denyut jantung (terlalu cepat atau lambat)</li>
          <li>Kesulitan buang air kecil (retensi urine)</li>
          <li>Sembelit atau diare berkepanjangan</li>
          <li>Perubahan suasana hati atau kebingungan</li>
        </ul>
      </div>
      
      <h2>📋 Tips Mengelola Obat untuk Lansia</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
        <div class="bg-white border border-slate-200 rounded-xl p-4"><h3 class="font-semibold mb-2">📅 Buat Jadwal Obat</h3><p class="text-sm text-slate-600">Buat tabel jadwal minum obat yang jelas, tempel di tempat yang mudah dilihat seperti kulkas atau kamar tidur.</p></div>
        <div class="bg-white border border-slate-200 rounded-xl p-4"><h3 class="font-semibold mb-2">⏰ Gunakan Alarm</h3><p class="text-sm text-slate-600">Setel alarm di ponsel atau gunakan jam pengingat untuk mengingatkan jadwal minum obat.</p></div>
        <div class="bg-white border border-slate-200 rounded-xl p-4"><h3 class="font-semibold mb-2">📦 Pill Organizer</h3><p class="text-sm text-slate-600">Gunakan kotak obat mingguan dengan label hari dan waktu (pagi, siang, sore, malam).</p></div>
        <div class="bg-white border border-slate-200 rounded-xl p-4"><h3 class="font-semibold mb-2">📝 Catat Efek Samping</h3><p class="text-sm text-slate-600">Catat setiap efek samping yang muncul untuk dilaporkan ke dokter saat kontrol.</p></div>
      </div>
      
      <div class="bg-green-50 p-6 rounded-xl my-6">
        <h3 class="font-bold text-green-800 mb-2">📞 Kapan Harus Menghubungi Dokter?</h3>
        <ul class="text-green-700 space-y-1">
          <li>✓ Jika muncul efek samping yang mengganggu</li>
          <li>✓ Jika lupa minum obat dan ragu apakah boleh minum sekarang</li>
          <li>✓ Jika tekanan darah atau gula darah tidak terkontrol</li>
          <li>✓ Jika akan menambah obat baru (termasuk suplemen)</li>
          <li>✓ Jika akan menghentikan obat yang sedang dikonsumsi</li>
        </ul>
      </div>
    `
    },

    // ==================== OLAHRAGA ====================
    4: {
        id: 4,
        title: "Olahraga Ringan untuk Lansia",
        excerpt: "Gerakan sederhana yang aman dilakukan untuk menjaga kebugaran tubuh.",
        category: "aktivitas",
        subCategory: "umum",
        image: "/images/edukasi/olahraga.jpg",
        author: "dr. Budi Santoso, Sp.KFR",
        authorDesc: "Spesialis Rehabilitasi Medik dengan pengalaman 15 tahun",
        authorBio: "Dr. Budi Santoso adalah spesialis rehabilitasi medik yang telah menangani lebih dari 5.000 pasien lansia. Beliau aktif dalam penelitian tentang aktivitas fisik pada lansia.",
        authorEducation: ["Spesialis Rehabilitasi Medik - Universitas Indonesia", "Dokter Umum - Universitas Gadjah Mada"],
        authorExperience: "15 tahun pengalaman di bidang rehabilitasi medik",
        authorPatients: "5.000+ pasien lansia",
        date: "27 Februari 2026",
        readTime: "10 menit",
        views: "2.2K",
        likes: 389,
        tags: ["Olahraga", "Fisioterapi", "Kebugaran", "Lansia", "Aktivitas Fisik"],
        content: `
      <div class="mb-6">
        <p class="text-lg leading-relaxed">Aktivitas fisik teratur adalah kunci utama untuk menjaga kesehatan dan kemandirian lansia. Seiring bertambahnya usia, tubuh mengalami berbagai perubahan alami seperti penurunan massa otot (sarkopenia), kepadatan tulang, dan fleksibilitas sendi. Namun, dengan olahraga yang tepat dan konsisten, lansia dapat mempertahankan kualitas hidup yang optimal.</p>
      </div>
      
      <h2>🏃‍♂️ Manfaat Olahraga untuk Lansia</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
        <div class="bg-green-50 p-4 rounded-xl"><div class="flex items-center gap-2 mb-2"><HeartPulse class="w-5 h-5 text-green-600" /><h3 class="font-semibold text-green-800">Kesehatan Jantung</h3></div><p class="text-sm text-green-700">Meningkatkan sirkulasi darah, menurunkan tekanan darah, mengurangi risiko penyakit jantung hingga 35%.</p></div>
        <div class="bg-blue-50 p-4 rounded-xl"><div class="flex items-center gap-2 mb-2"><Brain class="w-5 h-5 text-blue-600" /><h3 class="font-semibold text-blue-800">Fungsi Otak</h3></div><p class="text-sm text-blue-700">Meningkatkan aliran darah ke otak, memperlambat penurunan kognitif, mengurangi risiko demensia hingga 30%.</p></div>
        <div class="bg-amber-50 p-4 rounded-xl"><div class="flex items-center gap-2 mb-2"><Bone class="w-5 h-5 text-amber-600" /><h3 class="font-semibold text-amber-800">Kesehatan Tulang</h3></div><p class="text-sm text-amber-700">Meningkatkan kepadatan tulang, mencegah osteoporosis, mengurangi risiko patah tulang akibat jatuh.</p></div>
        <div class="bg-purple-50 p-4 rounded-xl"><div class="flex items-center gap-2 mb-2"><Smile class="w-5 h-5 text-purple-600" /><h3 class="font-semibold text-purple-800">Kesehatan Mental</h3></div><p class="text-sm text-purple-700">Mengurangi stres, kecemasan, depresi, meningkatkan kualitas tidur dan kepercayaan diri.</p></div>
      </div>
      
      <h2>🚶‍♂️ 5 Jenis Olahraga Ringan yang Dianjurkan</h2>
      
      <div class="bg-white border border-slate-200 rounded-xl p-5 my-4"><div class="flex items-center gap-3 mb-3"><div class="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center"><Footprints class="w-5 h-5 text-emerald-600" /></div><h3 class="text-lg font-bold">1. Jalan Kaki (30 menit/hari)</h3></div><p>Jalan kaki adalah olahraga paling aman untuk lansia. Mulailah dengan 10-15 menit, tingkatkan secara bertahap. Gunakan sepatu yang nyaman dan permukaan yang rata.</p></div>
      
      <div class="bg-white border border-slate-200 rounded-xl p-5 my-4"><div class="flex items-center gap-3 mb-3"><div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center"><Activity class="w-5 h-5 text-blue-600" /></div><h3 class="text-lg font-bold">2. Senam Lansia (20-30 menit, 2-3x/minggu)</h3></div><p>Gerakan senam yang dirancang khusus untuk lansia dapat meningkatkan kelenturan dan kekuatan otot. Ikuti kelas senam lansia di Posyandu atau komunitas.</p></div>
      
      <div class="bg-white border border-slate-200 rounded-xl p-5 my-4"><div class="flex items-center gap-3 mb-3"><div class="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center"><Sparkles class="w-5 h-5 text-purple-600" /></div><h3 class="text-lg font-bold">3. Yoga atau Tai Chi (15-20 menit, 3-4x/minggu)</h3></div><p>Latihan yang menggabungkan gerakan lembut dengan pernapasan dapat meningkatkan keseimbangan, fleksibilitas, dan mengurangi stres.</p></div>
      
      <div class="bg-white border border-slate-200 rounded-xl p-5 my-4"><div class="flex items-center gap-3 mb-3"><div class="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center"><Zap class="w-5 h-5 text-teal-600" /></div><h3 class="text-lg font-bold">4. Latihan Peregangan (10-15 menit, setiap hari)</h3></div><p>Lakukan peregangan ringan setiap pagi untuk menjaga kelenturan sendi dan mengurangi kekakuan otot. Tahan setiap gerakan 15-30 detik tanpa memantul.</p></div>
      
      <div class="bg-white border border-slate-200 rounded-xl p-5 my-4"><div class="flex items-center gap-3 mb-3"><div class="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center"><Timer class="w-5 h-5 text-amber-600" /></div><h3 class="text-lg font-bold">5. Bersepeda Statis (15-20 menit, 3-4x/minggu)</h3></div><p>Aman untuk sendi lutut dan pinggul, dapat dilakukan sambil duduk. Mulai dengan 10-15 menit, tingkatkan secara bertahap.</p></div>
      
      <div class="bg-yellow-50 p-6 rounded-xl my-6 border-l-4 border-yellow-500">
        <h3 class="font-bold text-yellow-800 mb-2">⚠️ Kapan Harus Berhenti Berolahraga?</h3>
        <ul class="text-yellow-700 list-disc list-inside">
          <li>Nyeri dada atau sesak napas yang tidak biasa</li>
          <li>Pusing atau kepala terasa ringan hingga hampir pingsan</li>
          <li>Nyeri sendi yang memberat atau tidak kunjung hilang</li>
          <li>Jantung berdebar tidak teratur</li>
          <li>Keringat dingin berlebihan atau mual</li>
        </ul>
      </div>
      
      <div class="bg-green-50 p-6 rounded-xl my-6 border-l-4 border-green-500">
        <h3 class="font-bold text-green-800 mb-2 flex items-center gap-2"><Activity className="w-5 h-5" /> Tips dari Dokter Rehabilitasi</h3>
        <p class="text-green-700">"Konsistensi lebih penting daripada intensitas. Olahraga rutin 15-30 menit setiap hari lebih baik daripada olahraga berat sesekali. Jangan lupa konsultasi dengan dokter sebelum memulai program olahraga baru." - dr. Budi Santoso, Sp.KFR</p>
      </div>
    `
    },

    // ==================== DEPRESI ====================
    5: {
        id: 5,
        title: "Mengatasi Depresi pada Lansia",
        excerpt: "Cara mengenali dan menangani gangguan mental yang sering dialami lansia.",
        category: "mental",
        subCategory: "umum",
        image: "/images/edukasi/depresi.jpg",
        author: "dr. Rina Putri, Sp.KJ",
        authorDesc: "Spesialis Kedokteran Jiwa",
        authorBio: "Dr. Rina Putri adalah spesialis kedokteran jiwa yang fokus pada kesehatan mental lansia. Beliau telah menangani lebih dari 2.000 pasien dengan depresi dan gangguan kecemasan.",
        authorEducation: ["Spesialis Kedokteran Jiwa - Universitas Indonesia", "Dokter Umum - Universitas Padjadjaran"],
        authorExperience: "12 tahun pengalaman",
        authorPatients: "2.000+ pasien",
        date: "26 Februari 2026",
        readTime: "9 menit",
        views: "1.9K",
        likes: 267,
        tags: ["Mental", "Depresi", "Konseling", "Lansia", "Kesehatan Mental"],
        content: `
      <p>Depresi pada lansia sering tidak terdeteksi. Kenali gejalanya dan segera tangani.</p>
      <h2>Tanda Depresi pada Lansia</h2>
      <ul><li>Kehilangan minat pada aktivitas yang biasa disukai</li><li>Gangguan tidur (sulit tidur atau tidur berlebihan)</li><li>Perubahan nafsu makan (berat badan turun atau naik drastis)</li><li>Mudah lelah dan kehilangan energi</li><li>Pikiran negatif berlebihan tentang diri sendiri</li><li>Perasaan tidak berharga atau bersalah berlebihan</li><li>Sulit berkonsentrasi atau mengambil keputusan</li></ul>
      <h2>Cara Mengatasi Depresi pada Lansia</h2>
      <ul><li>Ajak berbicara dan dengarkan keluhannya</li><li>Libatkan dalam kegiatan sosial dan komunitas</li><li>Dorong untuk tetap aktif secara fisik</li><li>Bantu mencari bantuan profesional (psikolog/psikiater)</li><li>Berikan dukungan dan kasih sayang tanpa menghakimi</li></ul>`
    },

    // ==================== DIABETES ====================
    6: {
        id: 6,
        title: "Diabetes Mellitus pada Lansia",
        excerpt: "Panduan lengkap mengelola diabetes agar tetap produktif dan sehat.",
        category: "penyakit",
        subCategory: "umum",
        image: "/images/edukasi/diabetes.jpg",
        author: "dr. Andi Firmansyah, Sp.PD",
        authorDesc: "Spesialis Penyakit Dalam",
        authorBio: "Dr. Andi Firmansyah adalah spesialis penyakit dalam dengan fokus pada diabetes dan metabolik.",
        authorEducation: ["Spesialis Penyakit Dalam - Universitas Airlangga", "Dokter Umum - Universitas Brawijaya"],
        authorExperience: "10 tahun pengalaman",
        authorPatients: "3.500+ pasien",
        date: "25 Februari 2026",
        readTime: "10 menit",
        views: "2.8K",
        likes: 412,
        tags: ["Diabetes", "Gula Darah", "Metabolik", "Lansia"],
        content: `<p>Diabetes pada lansia dapat dikelola dengan baik. Berikut panduan lengkapnya.</p>
    <h2>Manajemen Diabetes</h2>
    <ul><li>Kontrol gula darah rutin (cek gula darah puasa dan 2 jam setelah makan)</li><li>Pola makan teratur 3 kali sehari dengan porsi kecil</li><li>Olahraga teratur minimal 30 menit/hari</li><li>Minum obat tepat waktu sesuai resep dokter</li><li>Cegah komplikasi dengan kontrol rutin ke dokter setiap 3-6 bulan</li><li>Periksa kaki setiap hari untuk mencegah luka diabetes</li><li>Jaga berat badan ideal</li></ul>`
    },

    // ==================== SUPLEMEN ====================
    7: {
        id: 7,
        title: "Suplemen untuk Kesehatan Lansia",
        excerpt: "Vitamin dan mineral penting untuk menjaga kesehatan di usia lanjut.",
        category: "nutrisi",
        subCategory: "umum",
        image: "/images/edukasi/suplemen.jpg",
        author: "apt. Dewi Lestari, M.Farm",
        authorDesc: "Apoteker Klinis",
        authorBio: "apt. Dewi Lestari adalah apoteker klinis yang berpengalaman dalam suplemen dan nutrisi lansia.",
        authorEducation: ["Apoteker - Universitas Gadjah Mada", "Nutrisi Klinis - Universitas Indonesia"],
        authorExperience: "8 tahun pengalaman",
        authorPatients: "2.500+ pasien",
        date: "24 Februari 2026",
        readTime: "6 menit",
        views: "1.5K",
        likes: 198,
        tags: ["Suplemen", "Vitamin", "Mineral", "Lansia"],
        content: `<p>Suplemen dapat membantu memenuhi kebutuhan gizi lansia. Konsultasikan dengan dokter sebelum mengonsumsinya.</p>
    <h2>Suplemen yang Sering Dibutuhkan Lansia</h2>
    <ul><li><strong>Vitamin D dan Kalsium:</strong> Untuk kesehatan tulang dan mencegah osteoporosis</li><li><strong>Vitamin B12:</strong> Untuk energi dan fungsi saraf (penyerapan menurun seiring usia)</li><li><strong>Omega-3:</strong> Untuk kesehatan jantung dan fungsi otak</li><li><strong>Zinc:</strong> Untuk meningkatkan sistem imun dan penyembuhan luka</li><li><strong>Probiotik:</strong> Untuk kesehatan pencernaan dan penyerapan nutrisi</li></ul>`
    },

    // ==================== OSTEOPOROSIS ====================
    8: {
        id: 8,
        title: "Mencegah Osteoporosis pada Lansia",
        excerpt: "Langkah-langkah menjaga kepadatan tulang di usia lanjut.",
        category: "aktivitas",
        subCategory: "umum",
        image: "/images/edukasi/osteoporosis.jpg",
        author: "dr. Sari Indah, Sp.OT",
        authorDesc: "Spesialis Ortopedi",
        authorBio: "Dr. Sari Indah adalah spesialis ortopedi dengan fokus pada kesehatan tulang lansia.",
        authorEducation: ["Spesialis Ortopedi - Universitas Indonesia", "Dokter Umum - Universitas Padjadjaran"],
        authorExperience: "12 tahun pengalaman",
        authorPatients: "4.000+ pasien",
        date: "23 Februari 2026",
        readTime: "7 menit",
        views: "2.0K",
        likes: 278,
        tags: ["Tulang", "Osteoporosis", "Kalsium", "Lansia"],
        content: `<p>Osteoporosis dapat dicegah dengan gaya hidup sehat. Berikut langkah-langkahnya.</p>
    <h2>Pencegahan Osteoporosis</h2>
    <ul><li>Konsumsi kalsium 1.200 mg/hari (susu, yogurt, ikan teri, sayur hijau)</li><li>Vitamin D dari sinar matahari pagi (10-15 menit sebelum jam 9 pagi)</li><li>Olahraga beban teratur (jalan kaki, naik turun tangga, angkat beban ringan)</li><li>Hindari merokok dan alkohol</li><li>Cek kepadatan tulang rutin setiap 1-2 tahun untuk lansia berisiko</li><li>Konsumsi protein cukup untuk menjaga massa otot</li></ul>`
    },

    // ==================== DEMENSIA ====================
    9: {
        id: 9,
        title: "Perawatan Lansia dengan Demensia",
        excerpt: "Panduan bagi keluarga dalam merawat lansia dengan gangguan daya ingat.",
        category: "mental",
        subCategory: "umum",
        image: "/images/edukasi/demensia.jpg",
        author: "dr. Maya Angelina, Sp.S",
        authorDesc: "Spesialis Saraf",
        authorBio: "Dr. Maya Angelina adalah spesialis saraf dengan fokus pada demensia dan Alzheimer.",
        authorEducation: ["Spesialis Saraf - Universitas Indonesia", "Dokter Umum - Universitas Gadjah Mada"],
        authorExperience: "10 tahun pengalaman",
        authorPatients: "2.500+ pasien",
        date: "22 Februari 2026",
        readTime: "12 menit",
        views: "3.5K",
        likes: 523,
        tags: ["Demensia", "Alzheimer", "Perawatan", "Lansia"],
        content: `<p>Merawat lansia dengan demensia membutuhkan kesabaran dan pengetahuan. Berikut panduan untuk keluarga.</p>
    <h2>Tips Merawat Lansia dengan Demensia</h2>
    <ul><li>Ciptakan rutinitas harian yang konsisten</li><li>Bicara dengan lembut, jelas, dan berikan waktu untuk merespon</li><li>Ciptakan lingkungan yang aman (bebas barang berbahaya, penerangan cukup)</li><li>Libatkan dalam aktivitas sederhana seperti merapikan meja atau menyiram tanaman</li><li>Jangan membantah jika lupa, alihkan perhatian ke topik lain</li><li>Pasang tanda atau label di pintu dan lemari untuk membantu orientasi</li><li>Jaga komunikasi dengan dokter dan cari dukungan dari kelompok caregiver</li></ul>`
    },
    // Tambahkan ini ke dalam articlesData setelah artikel ID 9

// ==================== PASCA OPERASI - LUKA ====================
10: {
    id: 10,
    title: "Panduan Perawatan Luka Pasca Operasi",
    excerpt: "Cara merawat luka operasi agar cepat kering dan mencegah infeksi.",
    category: "pasca-operasi",
    subCategory: "umum",
    image: "/images/edukasi/pasca-operasi/luka.jpg",
    author: "dr. Budi Santoso, Sp.B",
    authorDesc: "Spesialis Bedah Umum dengan pengalaman 12 tahun",
    authorBio: "Dr. Budi Santoso adalah spesialis bedah umum yang telah menangani lebih dari 3.500 kasus operasi. Beliau aktif dalam edukasi perawatan luka pasca operasi dan pencegahan infeksi.",
    authorEducation: ["Spesialis Bedah Umum - Universitas Indonesia", "Dokter Umum - Universitas Gadjah Mada"],
    authorExperience: "12 tahun pengalaman di bidang bedah umum",
    authorPatients: "3.500+ pasien",
    date: "5 Maret 2026",
    readTime: "10 menit",
    views: "4.2K",
    likes: 567,
    tags: ["Luka", "Infeksi", "Perawatan", "Pasca Operasi", "Kebersihan"],
    content: `
    <div class="mb-6">
      <p class="text-lg leading-relaxed">Perawatan luka pasca operasi yang tepat adalah kunci utama untuk mencegah infeksi dan mempercepat proses penyembuhan. Luka operasi yang dirawat dengan baik akan lebih cepat kering, mengurangi risiko komplikasi, dan mempercepat pemulihan pasien.</p>
    </div>

    <h2>🩹 Jenis-Jenis Luka Operasi</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
      <div class="bg-blue-50 p-4 rounded-xl">
        <h3 class="font-semibold text-blue-800 mb-2">Luka Tertutup (Dijahit)</h3>
        <p class="text-sm text-blue-700">Luka yang ditutup dengan jahitan, staples, atau lem kulit. Perawatan fokus pada menjaga kebersihan dan kekeringan luka.</p>
      </div>
      <div class="bg-purple-50 p-4 rounded-xl">
        <h3 class="font-semibold text-purple-800 mb-2">Luka Terbuka</h3>
        <p class="text-sm text-purple-700">Luka yang dibiarkan terbuka untuk penyembuhan dari dalam ke luar. Memerlukan perawatan lebih intensif.</p>
      </div>
      <div class="bg-green-50 p-4 rounded-xl">
        <h3 class="font-semibold text-green-800 mb-2">Luka Drainase</h3>
        <p class="text-sm text-green-700">Luka dengan selang drainase untuk mengeluarkan cairan. Perlu perhatian khusus pada kebersihan area drainase.</p>
      </div>
      <div class="bg-amber-50 p-4 rounded-xl">
        <h3 class="font-semibold text-amber-800 mb-2">Luka Minim Invasif</h3>
        <p class="text-sm text-amber-700">Luka kecil dari operasi laparoskopi, biasanya cepat sembuh dengan perawatan minimal.</p>
      </div>
    </div>

    <h2>📋 Langkah-Langkah Perawatan Luka</h2>
    
    <div class="bg-white border border-slate-200 rounded-xl p-5 my-4">
      <div class="flex items-center gap-3 mb-3">
        <div class="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
          <span class="text-emerald-600 font-bold text-lg">1</span>
        </div>
        <h3 class="text-lg font-bold text-slate-800">Cuci Tangan dengan Sabun</h3>
      </div>
      <p>Cuci tangan dengan sabun antiseptik selama minimal 20 detik sebelum dan sesudah merawat luka. Gunakan handuk bersih atau tisu sekali pakai untuk mengeringkan.</p>
    </div>

    <div class="bg-white border border-slate-200 rounded-xl p-5 my-4">
      <div class="flex items-center gap-3 mb-3">
        <div class="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
          <span class="text-emerald-600 font-bold text-lg">2</span>
        </div>
        <h3 class="text-lg font-bold text-slate-800">Siapkan Peralatan Steril</h3>
      </div>
      <p>Siapkan kasa steril, NaCl (larutan garam fisiologis), plester, dan sarung tangan sekali pakai. Pastikan semua peralatan dalam kondisi bersih dan belum kedaluwarsa.</p>
    </div>

    <div class="bg-white border border-slate-200 rounded-xl p-5 my-4">
      <div class="flex items-center gap-3 mb-3">
        <div class="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
          <span class="text-emerald-600 font-bold text-lg">3</span>
        </div>
        <h3 class="text-lg font-bold text-slate-800">Buka Balutan Lama dengan Hati-hati</h3>
      </div>
      <p>Lepaskan balutan lama perlahan. Jika balutan menempel, basahi dengan NaCl atau air hangat untuk melembutkan kerak yang menempel, hindari menarik paksa yang dapat melukai jaringan baru.</p>
    </div>

    <div class="bg-white border border-slate-200 rounded-xl p-5 my-4">
      <div class="flex items-center gap-3 mb-3">
        <div class="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
          <span class="text-emerald-600 font-bold text-lg">4</span>
        </div>
        <h3 class="text-lg font-bold text-slate-800">Bersihkan Luka dengan NaCl</h3>
      </div>
      <p>Gunakan kasa steril yang dibasahi NaCl. Bersihkan luka dari tengah ke arah luar dengan gerakan satu arah. Hindari menggosok atau mengusap bolak-balik yang dapat melukai jaringan.</p>
    </div>

    <div class="bg-white border border-slate-200 rounded-xl p-5 my-4">
      <div class="flex items-center gap-3 mb-3">
        <div class="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
          <span class="text-emerald-600 font-bold text-lg">5</span>
        </div>
        <h3 class="text-lg font-bold text-slate-800">Keringkan dengan Tepuk Lembut</h3>
      </div>
      <p>Keringkan area sekitar luka dengan kasa steril menggunakan gerakan menepuk lembut. Pastikan luka benar-benar kering sebelum menutup dengan balutan baru.</p>
    </div>

    <div class="bg-white border border-slate-200 rounded-xl p-5 my-4">
      <div class="flex items-center gap-3 mb-3">
        <div class="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
          <span class="text-emerald-600 font-bold text-lg">6</span>
        </div>
        <h3 class="text-lg font-bold text-slate-800">Tutup dengan Kasa Steril</h3>
      </div>
      <p>Tutup luka dengan kasa steril baru. Pastikan kasa menutupi seluruh area luka. Gunakan plester atau perban untuk menahan kasa pada tempatnya, tidak terlalu ketat atau terlalu longgar.</p>
    </div>

    <div class="bg-red-50 p-6 rounded-xl my-6 border-l-4 border-red-500">
      <h3 class="font-bold text-red-800 mb-2 flex items-center gap-2"><AlertCircle className="w-5 h-5" /> Tanda-Tanda Infeksi yang Harus Diwaspadai</h3>
      <ul class="text-red-700 list-disc list-inside space-y-1">
        <li>Kemerahan yang meluas di sekitar luka</li>
        <li>Pembengkakan yang bertambah parah</li>
        <li>Keluarnya nanah atau cairan berbau tidak sedap dari luka</li>
        <li>Demam > 38°C</li>
        <li>Nyeri yang semakin hebat, bukan berkurang</li>
        <li>Luka terasa hangat saat disentuh</li>
        <li>Jahitan terlepas atau luka terbuka kembali</li>
      </ul>
      <p class="text-red-700 mt-3"><strong>Segera hubungi dokter jika mengalami tanda-tanda di atas!</strong></p>
    </div>

    <div class="bg-green-50 p-6 rounded-xl my-6">
      <h3 class="font-bold text-green-800 mb-2">📋 Tips Agar Luka Cepat Kering</h3>
      <ul class="text-green-700 space-y-1">
        <li>✓ Jaga luka tetap kering, hindari terkena air saat mandi (gunakan pelindung plastik)</li>
        <li>✓ Konsumsi makanan tinggi protein (ikan, telur, tahu, tempe) untuk regenerasi jaringan</li>
        <li>✓ Penuhi kebutuhan vitamin C (jeruk, tomat, brokoli) untuk pembentukan kolagen</li>
        <li>✓ Istirahat cukup minimal 8 jam/hari</li>
        <li>✓ Hindari aktivitas berat yang dapat menarik jahitan</li>
        <li>✓ Jangan menggaruk atau mengucek area luka meskipun terasa gatal</li>
      </ul>
    </div>

    <div class="bg-blue-50 p-6 rounded-xl my-6">
      <h3 class="font-bold text-blue-800 mb-2">📞 Kapan Harus ke Dokter?</h3>
      <ul class="text-blue-700 space-y-1">
        <li>✓ Jika muncul tanda-tanda infeksi</li>
        <li>✓ Jika jahitan terlepas sebelum waktunya</li>
        <li>✓ Jika luka mengeluarkan darah segar yang tidak berhenti</li>
        <li>✓ Jika nyeri semakin hebat meskipun sudah minum obat pereda nyeri</li>
        <li>✓ Jika luka tidak menunjukkan tanda-tanda penyembuhan setelah 5-7 hari</li>
      </ul>
    </div>
    `
},

// ==================== PASCA OPERASI - JANTUNG ====================
11: {
    id: 11,
    title: "Pemulihan Pasca Operasi Jantung",
    excerpt: "Langkah-langkah penting untuk pemulihan optimal setelah operasi jantung.",
    category: "pasca-operasi",
    subCategory: "jantung",
    image: "/images/edukasi/pasca-operasi/jantung.jpg",
    author: "dr. Ahmad Hasan, Sp.BTKV",
    authorDesc: "Spesialis Bedah Thorax Kardiovaskular",
    authorBio: "Dr. Ahmad Hasan adalah spesialis bedah jantung yang telah menangani lebih dari 1.500 prosedur bedah jantung. Beliau aktif dalam program rehabilitasi jantung dan edukasi pasien pasca operasi.",
    authorEducation: ["Spesialis Bedah Thorax Kardiovaskular - Universitas Indonesia", "Dokter Umum - Universitas Gadjah Mada"],
    authorExperience: "15 tahun pengalaman di bidang bedah jantung",
    authorPatients: "1.500+ pasien jantung",
    date: "4 Maret 2026",
    readTime: "15 menit",
    views: "3.8K",
    likes: 489,
    tags: ["Jantung", "Kardiovaskular", "Rehabilitasi", "Pasca Operasi", "Bypass"],
    content: `
    <div class="mb-6">
      <p class="text-lg leading-relaxed">Pemulihan pasca operasi jantung adalah perjalanan yang membutuhkan kesabaran dan komitmen. Dengan perawatan yang tepat dan dukungan keluarga, pasien dapat kembali menjalani kehidupan yang berkualitas. Operasi jantung adalah prosedur besar yang membutuhkan waktu untuk penyembuhan optimal.</p>
    </div>

    <h2>❤️ Jenis Operasi Jantung yang Umum</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
      <div class="bg-blue-50 p-4 rounded-xl">
        <h3 class="font-semibold text-blue-800 mb-2">CABG (Bypass Jantung)</h3>
        <p class="text-sm text-blue-700">Operasi membuat jalur baru untuk aliran darah melewati arteri yang tersumbat. Masa pemulihan 6-12 minggu.</p>
      </div>
      <div class="bg-purple-50 p-4 rounded-xl">
        <h3 class="font-semibold text-purple-800 mb-2">Operasi Katup Jantung</h3>
        <p class="text-sm text-purple-700">Perbaikan atau penggantian katup jantung yang rusak. Pemulihan tergantung pada jenis prosedur.</p>
      </div>
      <div class="bg-green-50 p-4 rounded-xl">
        <h3 class="font-semibold text-green-800 mb-2">Operasi Aorta</h3>
        <p class="text-sm text-green-700">Perbaikan aneurisma atau diseksi aorta. Memerlukan pemulihan yang lebih panjang.</p>
      </div>
      <div class="bg-amber-50 p-4 rounded-xl">
        <h3 class="font-semibold text-amber-800 mb-2">Operasi Minimal Invasif</h3>
        <p class="text-sm text-amber-700">Teknik modern dengan sayatan kecil, pemulihan lebih cepat 4-6 minggu.</p>
      </div>
    </div>

    <h2>📊 Fase Pemulihan Pasca Operasi Jantung</h2>
    
    <div class="bg-white border border-slate-200 rounded-xl p-5 my-4">
      <div class="flex items-center gap-3 mb-3">
        <div class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
          <span class="text-red-600 font-bold text-lg">I</span>
        </div>
        <h3 class="text-lg font-bold text-slate-800">Fase I: Perawatan Intensif (0-2 hari)</h3>
      </div>
      <p><strong>Lokasi:</strong> ICU/ICCU. Pasien dipantau ketat untuk tanda-tanda vital. Tabung pernapasan dan drainase dada akan dilepas secara bertahap. Fisioterapi pernapasan dimulai. Keluarga dapat memberikan dukungan emosional.</p>
      <ul class="mt-2 text-slate-600">
        <li>✓ Monitoring EKG 24 jam</li>
        <li>✓ Pemberian obat-obatan intravena</li>
        <li>✓ Mobilisasi bertahap di tempat tidur</li>
        <li>✓ Latihan pernapasan untuk mencegah komplikasi paru</li>
      </ul>
    </div>

    <div class="bg-white border border-slate-200 rounded-xl p-5 my-4">
      <div class="flex items-center gap-3 mb-3">
        <div class="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
          <span class="text-orange-600 font-bold text-lg">II</span>
        </div>
        <h3 class="text-lg font-bold text-slate-800">Fase II: Perawatan Ruangan (2-7 hari)</h3>
      </div>
      <p>Pasien dipindahkan ke ruang perawatan biasa. Mobilisasi ditingkatkan secara bertahap. Perawatan luka operasi, edukasi pulang, dan persiapan rehabilitasi jantung.</p>
      <ul class="mt-2 text-slate-600">
        <li>✓ Jalan kaki pendek di koridor</li>
        <li>✓ Perawatan luka sternum (tulang dada)</li>
        <li>✓ Edukasi tentang tanda-tanda bahaya</li>
        <li>✓ Konsultasi dengan ahli gizi untuk diet jantung sehat</li>
      </ul>
    </div>

    <div class="bg-white border border-slate-200 rounded-xl p-5 my-4">
      <div class="flex items-center gap-3 mb-3">
        <div class="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
          <span class="text-yellow-600 font-bold text-lg">III</span>
        </div>
        <h3 class="text-lg font-bold text-slate-800">Fase III: Rehabilitasi Awal (2-6 minggu)</h3>
      </div>
      <p>Program rehabilitasi jantung formal dimulai. Pasien belajar tentang aktivitas fisik yang aman, manajemen stres, dan perubahan gaya hidup.</p>
      <ul class="mt-2 text-slate-600">
        <li>✓ Program olahraga terstruktur 3x/minggu</li>
        <li>✓ Konseling psikologis untuk mengatasi kecemasan</li>
        <li>✓ Edukasi tentang faktor risiko jantung</li>
        <li>✓ Pemantauan tekanan darah dan kolesterol</li>
      </ul>
    </div>

    <div class="bg-white border border-slate-200 rounded-xl p-5 my-4">
      <div class="flex items-center gap-3 mb-3">
        <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
          <span class="text-green-600 font-bold text-lg">IV</span>
        </div>
        <h3 class="text-lg font-bold text-slate-800">Fase IV: Pemeliharaan (>6 minggu)</h3>
      </div>
      <p>Kembali beraktivitas normal secara bertahap. Program latihan mandiri di rumah. Kontrol rutin ke dokter jantung.</p>
      <ul class="mt-2 text-slate-600">
        <li>✓ Kembali bekerja secara bertahap (6-12 minggu pasca operasi)</li>
        <li>✓ Mengemudi aman setelah 4-6 minggu</li>
        <li>✓ Olahraga teratur 30 menit/hari, 5x/minggu</li>
        <li>✓ Kontrol ke dokter setiap 3-6 bulan</li>
      </ul>
    </div>

    <div class="bg-blue-50 p-6 rounded-xl my-6 border-l-4 border-blue-500">
      <h3 class="font-bold text-blue-800 mb-2 flex items-center gap-2"><Activity className="w-5 h-5" /> Panduan Aktivitas Fisik</h3>
      <ul class="text-blue-700 space-y-1">
        <li><strong>Minggu 1-2:</strong> Jalan kaki pendek 5-10 menit, 2-3x/hari di dalam rumah</li>
        <li><strong>Minggu 3-4:</strong> Jalan kaki 15-20 menit, 2x/hari di luar rumah dengan permukaan datar</li>
        <li><strong>Minggu 5-6:</strong> Jalan kaki 30 menit/hari, mulai naik tangga perlahan</li>
        <li><strong>Minggu 7-12:</strong> Latihan aerobik ringan, bersepeda statis, berenang (setelah luka sembuh)</li>
        <li><strong>Setelah 12 minggu:</strong> Aktivitas normal bertahap, hindari angkat beban berat >5 kg selama 3 bulan</li>
      </ul>
    </div>

    <div class="bg-green-50 p-6 rounded-xl my-6">
      <h3 class="font-bold text-green-800 mb-2">🥗 Diet Jantung Sehat Pasca Operasi</h3>
      <ul class="text-green-700 space-y-1">
        <li>✓ Kurangi lemak jenuh: hindari gorengan, jeroan, santan kental</li>
        <li>✓ Perbanyak omega-3: ikan salmon, tuna, sarden, kembung</li>
        <li>✓ Konsumsi serat: sayur hijau, buah, oatmeal, kacang-kacangan</li>
        <li>✓ Batasi garam: < 5 gram/hari (1 sendok teh) untuk cegah hipertensi</li>
        <li>✓ Hindari makanan olahan: sosis, nugget, makanan kaleng tinggi natrium</li>
        <li>✓ Perbanyak antioksidan: tomat, brokoli, blueberry, dark chocolate (sedikit)</li>
      </ul>
    </div>

    <div class="bg-amber-50 p-6 rounded-xl my-6">
      <h3 class="font-bold text-amber-800 mb-2">⚠️ Tanda Bahaya yang Harus Segera ke IGD</h3>
      <ul class="text-amber-700 list-disc list-inside space-y-1">
        <li>Nyeri dada yang tidak hilang dengan istirahat</li>
        <li>Sesak napas mendadak atau memburuk</li>
        <li>Jantung berdebar tidak teratur</li>
        <li>Pusing atau pingsan</li>
        <li>Bengkak mendadak di kaki atau tungkai</li>
        <li>Demam > 38°C</li>
        <li>Luka operasi memerah, bengkak, atau keluar cairan</li>
      </ul>
    </div>
    `
},

// ==================== PASCA OPERASI - KATARAK ====================
12: {
    id: 12,
    title: "Perawatan Pasca Operasi Katarak",
    excerpt: "Panduan lengkap merawat mata setelah operasi katarak agar cepat sembuh.",
    category: "pasca-operasi",
    subCategory: "mata",
    image: "/images/edukasi/pasca-operasi/katarak.jpg",
    author: "dr. Rina Putri, Sp.M",
    authorDesc: "Spesialis Mata dengan pengalaman 10 tahun",
    authorBio: "Dr. Rina Putri adalah spesialis mata yang telah melakukan lebih dari 2.000 operasi katarak. Beliau aktif dalam edukasi perawatan mata pasca operasi.",
    authorEducation: ["Spesialis Mata - Universitas Indonesia", "Dokter Umum - Universitas Padjadjaran"],
    authorExperience: "10 tahun pengalaman di bidang oftalmologi",
    authorPatients: "2.000+ pasien katarak",
    date: "1 Maret 2026",
    readTime: "7 menit",
    views: "3.2K",
    likes: 412,
    tags: ["Mata", "Katarak", "Penglihatan", "Pasca Operasi", "Lensa"],
    content: `
    <div class="mb-6">
      <p class="text-lg leading-relaxed">Operasi katarak adalah salah satu prosedur bedah mata yang paling umum dan tingkat keberhasilannya sangat tinggi. Perawatan pasca operasi yang tepat sangat penting untuk memastikan hasil optimal dan mencegah komplikasi. Pemulihan penglihatan biasanya terjadi dalam beberapa hari hingga minggu.</p>
    </div>

    <h2>👁️ Apa Itu Operasi Katarak?</h2>
    <p>Operasi katarak adalah prosedur untuk mengangkat lensa mata yang keruh (katarak) dan menggantinya dengan lensa intraokular (IOL) buatan. Operasi biasanya berlangsung 15-30 menit dengan anestesi lokal, dan pasien dapat pulang di hari yang sama.</p>

    <h2>📋 Perawatan Pasca Operasi Katarak</h2>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
      <div class="bg-white border border-slate-200 rounded-xl p-4">
        <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-3">
          <EyeIcon className="w-5 h-5 text-blue-600" />
        </div>
        <h3 class="font-semibold text-slate-800 mb-2">💧 Tetes Mata</h3>
        <p class="text-sm text-slate-600">Tetes mata antibiotik dan anti-inflamasi sesuai jadwal. Biasanya 3-4 kali sehari selama 2-4 minggu. Cuci tangan sebelum menetes.</p>
      </div>
      <div class="bg-white border border-slate-200 rounded-xl p-4">
        <div class="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mb-3">
          <Shield className="w-5 h-5 text-purple-600" />
        </div>
        <h3 class="font-semibold text-slate-800 mb-2">🛡️ Pelindung Mata</h3>
        <p class="text-sm text-slate-600">Pakai pelindung mata saat tidur minimal 1 minggu. Jangan mengucek atau menekan mata. Hindari air masuk ke mata.</p>
      </div>
      <div class="bg-white border border-slate-200 rounded-xl p-4">
        <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-3">
          <Activity className="w-5 h-5 text-green-600" />
        </div>
        <h3 class="font-semibold text-slate-800 mb-2">🚶 Aktivitas</h3>
        <p class="text-sm text-slate-600">Istirahat cukup, hindari mengangkat beban >5 kg, membungkuk, atau mengejan. Aktivitas ringan seperti jalan kaki diperbolehkan.</p>
      </div>
      <div class="bg-white border border-slate-200 rounded-xl p-4">
        <div class="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mb-3">
          <Eye className="w-5 h-5 text-amber-600" />
        </div>
        <h3 class="font-semibold text-slate-800 mb-2">👓 Kacamata</h3>
        <p class="text-sm text-slate-600">Gunakan kacamata hitam saat keluar rumah. Kacamata baru biasanya diresepkan setelah 4-6 minggu pasca operasi.</p>
      </div>
    </div>

    <div class="bg-red-50 p-6 rounded-xl my-6 border-l-4 border-red-500">
      <h3 class="font-bold text-red-800 mb-2 flex items-center gap-2"><AlertCircle className="w-5 h-5" /> Hal yang Dilarang Pasca Operasi Katarak</h3>
      <ul class="text-red-700 list-disc list-inside space-y-1">
        <li>❌ Jangan mengucek atau menekan mata yang dioperasi</li>
        <li>❌ Jangan membiarkan air masuk ke mata saat mandi atau keramas (gunakan pelindung)</li>
        <li>❌ Jangan berenang atau menggunakan jacuzzi minimal 2 minggu</li>
        <li>❌ Jangan mengangkat beban berat >5 kg minimal 1 minggu</li>
        <li>❌ Jangan membaca atau menonton TV terlalu lama (istirahatkan mata setiap 30 menit)</li>
        <li>❌ Jangan menggunakan make-up di sekitar mata minimal 1 minggu</li>
        <li>❌ Jangan tidur tengkurap atau miring ke sisi mata yang dioperasi</li>
      </ul>
    </div>

    <div class="bg-blue-50 p-6 rounded-xl my-6">
      <h3 class="font-bold text-blue-800 mb-2">📅 Jadwal Kontrol yang Dianjurkan</h3>
      <ul class="text-blue-700 space-y-1">
        <li>✓ Hari pertama pasca operasi</li>
        <li>✓ Minggu pertama</li>
        <li>✓ Minggu ke-2 hingga ke-4</li>
        <li>✓ Minggu ke-6 hingga ke-8 (untuk pemeriksaan lensa akhir dan resep kacamata)</li>
        <li>✓ Kontrol rutin setiap 6-12 bulan setelahnya</li>
      </ul>
    </div>

    <div class="bg-green-50 p-6 rounded-xl my-6">
      <h3 class="font-bold text-green-800 mb-2">📋 Perkembangan Penglihatan yang Diharapkan</h3>
      <ul class="text-green-700 space-y-1">
        <li>✓ <strong>Hari 1-3:</strong> Penglihatan mulai membaik, mungkin masih terasa kabur</li>
        <li>✓ <strong>Minggu 1-2:</strong> Penglihatan semakin jernih, mata mungkin masih sedikit merah</li>
        <li>✓ <strong>Minggu 3-4:</strong> Stabilitas penglihatan mulai tercapai</li>
        <li>✓ <strong>Minggu 6-8:</strong> Penglihatan stabil, siap untuk resep kacamata baru jika diperlukan</li>
        <li>✓ <strong>Bulan 3-6:</strong> Adaptasi lensa selesai, penglihatan optimal</li>
      </ul>
    </div>

    <div class="bg-amber-50 p-6 rounded-xl my-6">
      <h3 class="font-bold text-amber-800 mb-2">⚠️ Kapan Harus Segera Menghubungi Dokter?</h3>
      <ul class="text-amber-700 list-disc list-inside space-y-1">
        <li>Nyeri mata yang semakin hebat (bukan hanya tidak nyaman)</li>
        <li>Penurunan penglihatan mendadak</li>
        <li>Kemerahan mata yang bertambah parah</li>
        <li>Banyak keluar cairan atau nanah dari mata</li>
        <li>Melihat kilatan cahaya atau banyak titik-titik hitam (floaters baru)</li>
        <li>Kelopak mata bengkak hebat</li>
      </ul>
    </div>
    `
},

// ==================== PASCA OPERASI - INFEKSI ====================
13: {
    id: 13,
    title: "Pencegahan Infeksi Pasca Operasi",
    excerpt: "Langkah-langkah penting untuk mencegah infeksi pada luka operasi.",
    category: "pasca-operasi",
    subCategory: "umum",
    image: "/images/edukasi/pasca-operasi/infeksi.jpg",
    author: "dr. Andi Firmansyah, Sp.PD",
    authorDesc: "Spesialis Penyakit Dalam dengan fokus pada infeksi",
    authorBio: "Dr. Andi Firmansyah adalah spesialis penyakit dalam yang fokus pada infeksi nosokomial. Beliau telah menangani lebih dari 2.000 kasus infeksi pasca operasi.",
    authorEducation: ["Spesialis Penyakit Dalam - Universitas Airlangga", "Dokter Umum - Universitas Brawijaya"],
    authorExperience: "10 tahun pengalaman",
    authorPatients: "2.000+ pasien",
    date: "26 Februari 2026",
    readTime: "8 menit",
    views: "3.7K",
    likes: 498,
    tags: ["Infeksi", "Kebersihan", "Luka", "Pasca Operasi", "Antibiotik"],
    content: `
    <div class="mb-6">
      <p class="text-lg leading-relaxed">Infeksi pasca operasi adalah salah satu komplikasi yang paling ditakuti. Namun, dengan langkah-langkah pencegahan yang tepat, risiko infeksi dapat diminimalkan. Pencegahan infeksi dimulai sebelum operasi dan berlanjut hingga masa pemulihan.</p>
    </div>

    <h2>🦠 Faktor Risiko Infeksi Pasca Operasi</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
      <div class="bg-red-50 p-4 rounded-xl">
        <h3 class="font-semibold text-red-800 mb-2">Diabetes</h3>
        <p class="text-sm text-red-700">Kadar gula darah tinggi menghambat penyembuhan luka dan menurunkan daya tahan tubuh.</p>
      </div>
      <div class="bg-orange-50 p-4 rounded-xl">
        <h3 class="font-semibold text-orange-800 mb-2">Merokok</h3>
        <p class="text-sm text-orange-700">Merokok mengurangi aliran darah ke luka dan menghambat penyembuhan.</p>
      </div>
      <div class="bg-blue-50 p-4 rounded-xl">
        <h3 class="font-semibold text-blue-800 mb-2">Obesitas</h3>
        <p class="text-sm text-blue-700">Jaringan lemak memiliki aliran darah yang kurang baik.</p>
      </div>
      <div class="bg-purple-50 p-4 rounded-xl">
        <h3 class="font-semibold text-purple-800 mb-2">Imunitas Rendah</h3>
        <p class="text-sm text-purple-700">Pasien dengan sistem imun lemah lebih rentan infeksi.</p>
      </div>
    </div>

    <h2>📋 Langkah Pencegahan Infeksi</h2>
    
    <div class="bg-white border border-slate-200 rounded-xl p-5 my-4">
      <div class="flex items-center gap-3 mb-3">
        <div class="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
          <span class="text-emerald-600 font-bold text-lg">1</span>
        </div>
        <h3 class="text-lg font-bold text-slate-800">Sebelum Operasi</h3>
      </div>
      <ul class="text-slate-600 space-y-1">
        <li>✓ Mandi dengan sabun antiseptik sebelum operasi</li>
        <li>✓ Kontrol gula darah jika diabetes</li>
        <li>✓ Berhenti merokok minimal 4-6 minggu sebelum operasi</li>
        <li>✓ Informasikan ke dokter jika ada infeksi aktif (batuk, pilek, luka)</li>
        <li>✓ Jangan mencukur area operasi sendiri (biarkan tim medis yang melakukannya)</li>
      </ul>
    </div>

    <div class="bg-white border border-slate-200 rounded-xl p-5 my-4">
      <div class="flex items-center gap-3 mb-3">
        <div class="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
          <span class="text-emerald-600 font-bold text-lg">2</span>
        </div>
        <h3 class="text-lg font-bold text-slate-800">Perawatan Luka</h3>
      </div>
      <ul class="text-slate-600 space-y-1">
        <li>✓ Jaga luka tetap kering selama 24-48 jam pertama</li>
        <li>✓ Cuci tangan sebelum menyentuh luka atau mengganti balutan</li>
        <li>✓ Ganti balutan sesuai jadwal yang ditentukan dokter</li>
        <li>✓ Jangan membuka jahitan atau staples sendiri</li>
        <li>✓ Amati luka setiap hari untuk tanda-tanda infeksi</li>
      </ul>
    </div>

    <div class="bg-white border border-slate-200 rounded-xl p-5 my-4">
      <div class="flex items-center gap-3 mb-3">
        <div class="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
          <span class="text-emerald-600 font-bold text-lg">3</span>
        </div>
        <h3 class="text-lg font-bold text-slate-800">Konsumsi Obat</h3>
      </div>
      <ul class="text-slate-600 space-y-1">
        <li>✓ Minum antibiotik sesuai resep hingga habis, jangan dihentikan meski merasa lebih baik</li>
        <li>✓ Minum obat pereda nyeri jika diperlukan untuk kenyamanan</li>
        <li>✓ Informasikan ke dokter jika ada efek samping obat</li>
      </ul>
    </div>

    <div class="bg-white border border-slate-200 rounded-xl p-5 my-4">
      <div class="flex items-center gap-3 mb-3">
        <div class="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
          <span class="text-emerald-600 font-bold text-lg">4</span>
        </div>
        <h3 class="text-lg font-bold text-slate-800">Nutrisi dan Hidrasi</h3>
      </div>
      <ul class="text-slate-600 space-y-1">
        <li>✓ Konsumsi protein tinggi (ikan, telur, tahu, tempe) untuk regenerasi jaringan</li>
        <li>✓ Perbanyak vitamin C (jeruk, tomat, brokoli) untuk pembentukan kolagen</li>
        <li>✓ Minum air putih minimal 8 gelas/hari</li>
        <li>✓ Hindari makanan olahan dan tinggi gula</li>
      </ul>
    </div>

    <div class="bg-red-50 p-6 rounded-xl my-6 border-l-4 border-red-500">
      <h3 class="font-bold text-red-800 mb-2 flex items-center gap-2"><AlertCircle className="w-5 h-5" /> Tanda-Tanda Infeksi yang Perlu Segera Dilaporkan</h3>
      <ul class="text-red-700 list-disc list-inside space-y-1">
        <li><strong>Lokal:</strong> Kemerahan meluas, pembengkakan bertambah, nyeri hebat, luka terasa hangat, keluar nanah atau cairan berbau</li>
        <li><strong>Sistemik:</strong> Demam > 38°C, menggigil, berkeringat malam, lemas berlebihan</li>
        <li><strong>Khusus:</strong> Jahitan terlepas, luka terbuka kembali, area sekitar luka berubah warna menjadi kehitaman</li>
      </ul>
    </div>

    <div class="bg-blue-50 p-6 rounded-xl my-6">
      <h3 class="font-bold text-blue-800 mb-2">💊 Tentang Antibiotik Profilaksis</h3>
      <p class="text-blue-700 mb-2">Antibiotik profilaksis diberikan sebelum operasi untuk mencegah infeksi. Penting untuk:</p>
      <ul class="text-blue-700 list-disc list-inside">
        <li>Minum antibiotik tepat waktu sesuai jadwal</li>
        <li>Jangan melewatkan dosis</li>
        <li>Habiskan sesuai durasi yang ditentukan (biasanya 5-7 hari)</li>
        <li>Jangan berbagi antibiotik dengan orang lain</li>
        <li>Laporkan jika muncul ruam atau diare berat</li>
      </ul>
    </div>
    `
},

// ==================== PASCA OPERASI - GIGI ====================
14: {
    id: 14,
    title: "Perawatan Pasca Operasi Gigi",
    excerpt: "Panduan merawat mulut setelah pencabutan atau operasi gigi.",
    category: "pasca-operasi",
    subCategory: "gigi",
    image: "/images/edukasi/pasca-operasi/gigi.jpg",
    author: "drg. Maria Santoso",
    authorDesc: "Dokter Gigi Spesialis Bedah Mulut",
    authorBio: "drg. Maria Santoso adalah dokter gigi spesialis bedah mulut dengan pengalaman lebih dari 8 tahun. Beliau telah menangani lebih dari 1.500 kasus pencabutan gigi kompleks dan operasi mulut.",
    authorEducation: ["Spesialis Bedah Mulut - Universitas Indonesia", "Dokter Gigi - Universitas Gadjah Mada"],
    authorExperience: "8 tahun pengalaman di bidang bedah mulut",
    authorPatients: "1.500+ pasien",
    date: "24 Februari 2026",
    readTime: "5 menit",
    views: "2.3K",
    likes: 287,
    tags: ["Gigi", "Mulut", "Pencabutan", "Pasca Operasi", "Kebersihan Mulut"],
    content: `
    <div class="mb-6">
      <p class="text-lg leading-relaxed">Perawatan pasca operasi gigi yang tepat membantu penyembuhan lebih cepat dan mencegah komplikasi seperti dry socket (alveolar osteitis) atau infeksi. Operasi gigi dapat berupa pencabutan gigi bungsu, implant, atau prosedur bedah mulut lainnya.</p>
    </div>

    <h2>🦷 Jenis Operasi Gigi yang Umum</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
      <div class="bg-blue-50 p-4 rounded-xl">
        <h3 class="font-semibold text-blue-800 mb-2">Pencabutan Gigi Bungsu</h3>
        <p class="text-sm text-blue-700">Prosedur paling umum, pemulihan 3-7 hari, pembengkakan maksimal di hari ke-2-3.</p>
      </div>
      <div class="bg-purple-50 p-4 rounded-xl">
        <h3 class="font-semibold text-purple-800 mb-2">Implan Gigi</h3>
        <p class="text-sm text-purple-700">Pemasangan akar gigi buatan, pemulihan lebih panjang, perlu kontrol rutin.</p>
      </div>
      <div class="bg-green-50 p-4 rounded-xl">
        <h3 class="font-semibold text-green-800 mb-2">Apikoektomi</h3>
        <p class="text-sm text-green-700">Operasi ujung akar gigi, penyembuhan 1-2 minggu.</p>
      </div>
      <div class="bg-amber-50 p-4 rounded-xl">
        <h3 class="font-semibold text-amber-800 mb-2">Operasi Kista Gigi</h3>
        <p class="text-sm text-amber-700">Pengangkatan kista di sekitar gigi, pemulihan tergantung ukuran.</p>
      </div>
    </div>

    <h2>📋 Panduan Perawatan Pasca Operasi Gigi</h2>
    
    <div class="bg-white border border-slate-200 rounded-xl p-5 my-4">
      <div class="flex items-center gap-3 mb-3">
        <div class="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
          <span class="text-emerald-600 font-bold text-lg">1</span>
        </div>
        <h3 class="text-lg font-bold text-slate-800">Kontrol Perdarahan</h3>
      </div>
      <p>Gigit kasa steril selama 30-60 menit. Jika masih berdarah, ganti dengan kasa baru dan tekan dengan lembut. Jangan meludah atau berkumur 24 jam pertama. Darah bercampur air liur adalah normal, yang penting bukan darah segar yang mengalir deras.</p>
    </div>

    <div class="bg-white border border-slate-200 rounded-xl p-5 my-4">
      <div class="flex items-center gap-3 mb-3">
        <div class="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
          <span class="text-emerald-600 font-bold text-lg">2</span>
        </div>
        <h3 class="text-lg font-bold text-slate-800">Kompres Dingin</h3>
      </div>
      <p>Kompres area pipi dengan es batu yang dibungkus kain selama 15-20 menit, ulangi setiap 1-2 jam selama 24-48 jam pertama. Ini membantu mengurangi pembengkakan dan nyeri. Setelah 48 jam, kompres hangat dapat membantu mengurangi kekakuan otot.</p>
    </div>

    <div class="bg-white border border-slate-200 rounded-xl p-5 my-4">
      <div class="flex items-center gap-3 mb-3">
        <div class="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
          <span class="text-emerald-600 font-bold text-lg">3</span>
        </div>
        <h3 class="text-lg font-bold text-slate-800">Makanan dan Minuman</h3>
      </div>
      <ul class="text-slate-600 space-y-1">
        <li>✓ <strong>24 jam pertama:</strong> Makanan lunak/lembut seperti bubur, sup, yogurt, pudding, es krim (tanpa potongan)</li>
        <li>✓ <strong>Minum:</strong> Perbanyak air putih, hindari sedotan karena dapat melepaskan bekuan darah</li>
        <li>✓ <strong>Hindari:</strong> Makanan keras, panas, pedas, alkohol, kafein 3-5 hari pertama</li>
        <li>✓ <strong>Hari ke-3-7:</strong> Mulai makanan semi padat, hindari sisi operasi untuk mengunyah</li>
      </ul>
    </div>

    <div class="bg-white border border-slate-200 rounded-xl p-5 my-4">
      <div class="flex items-center gap-3 mb-3">
        <div class="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
          <span class="text-emerald-600 font-bold text-lg">4</span>
        </div>
        <h3 class="text-lg font-bold text-slate-800">Kebersihan Mulut</h3>
      </div>
      <ul class="text-slate-600 space-y-1">
        <li>✓ <strong>24 jam pertama:</strong> Jangan berkumur, gosok gigi dengan hati-hati hindari area operasi</li>
        <li>✓ <strong>Setelah 24 jam:</strong> Berkumur dengan air garam hangat (1 sendok teh garam dalam 1 gelas air) 3-4 kali sehari</li>
        <li>✓ <strong>Hari ke-3-5:</strong> Mulai gosok gigi area sekitar operasi dengan sikat lembut</li>
        <li>✓ Jangan gunakan obat kumur berbasis alkohol 1 minggu pertama</li>
      </ul>
    </div>

    <div class="bg-white border border-slate-200 rounded-xl p-5 my-4">
      <div class="flex items-center gap-3 mb-3">
        <div class="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
          <span class="text-emerald-600 font-bold text-lg">5</span>
        </div>
        <h3 class="text-lg font-bold text-slate-800">Obat-obatan</h3>
      </div>
      <ul class="text-slate-600 space-y-1">
        <li>✓ Minum antibiotik sesuai resep hingga habis</li>
        <li>✓ Minum obat pereda nyeri sesuai kebutuhan (paracetamol atau ibuprofen)</li>
        <li>✓ Jangan mengonsumsi aspirin tanpa sepengetahuan dokter karena dapat memperpanjang perdarahan</li>
      </ul>
    </div>

    <div class="bg-red-50 p-6 rounded-xl my-6 border-l-4 border-red-500">
      <h3 class="font-bold text-red-800 mb-2 flex items-center gap-2"><AlertCircle className="w-5 h-5" /> Tanda Dry Socket yang Harus Diwaspadai</h3>
      <p class="text-red-700 mb-2">Dry socket (alveolar osteitis) terjadi ketika bekuan darah di lubang bekas pencabutan lepas sebelum waktunya. Tanda-tandanya:</p>
      <ul class="text-red-700 list-disc list-inside">
        <li>Nyeri hebat 2-4 hari setelah pencabutan (bukan mereda)</li>
        <li>Nyeri menjalar ke telinga, rahang, atau leher</li>
        <li>Terlihat tulang kosong di lubang bekas pencabutan</li>
        <li>Bau mulut atau rasa tidak enak di mulut</li>
      </ul>
      <p class="text-red-700 mt-3"><strong>Jika mengalami gejala di atas, segera hubungi dokter gigi!</strong></p>
    </div>

    <div class="bg-green-50 p-6 rounded-xl my-6">
      <h3 class="font-bold text-green-800 mb-2">📋 Tips Percepat Penyembuhan</h3>
      <ul class="text-green-700 space-y-1">
        <li>✓ Istirahat cukup, posisi kepala lebih tinggi saat tidur (gunakan 2 bantal)</li>
        <li>✓ Hindari merokok minimal 72 jam (rokok menghambat penyembuhan dan risiko dry socket tinggi)</li>
        <li>✓ Hindari olahraga berat 3-5 hari</li>
        <li>✓ Perbanyak vitamin C dan protein untuk regenerasi jaringan</li>
        <li>✓ Kontrol ke dokter gigi sesuai jadwal (biasanya 1 minggu pasca operasi)</li>
      </ul>
    </div>

    <div class="bg-blue-50 p-6 rounded-xl my-6">
      <h3 class="font-bold text-blue-800 mb-2">📅 Timeline Penyembuhan Operasi Gigi</h3>
      <ul class="text-blue-700 space-y-1">
        <li><strong>24 jam pertama:</strong> Perdarahan berhenti, bekuan darah terbentuk, mulai kompres dingin</li>
        <li><strong>Hari ke-2-3:</strong> Pembengkakan maksimal, mulai berkurang, nyeri mulai mereda</li>
        <li><strong>Hari ke-4-7:</strong> Pembengkakan hilang, mulai bisa makan semi padat, jahitan dilepas</li>
        <li><strong>Minggu ke-2-4:</strong> Jaringan lunak sembuh, bisa makan normal</li>
        <li><strong>Bulan ke-2-4:</strong> Tulang di area operasi mulai terbentuk sempurna</li>
      </ul>
    </div>
    `
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
    const [showFullBio, setShowFullBio] = useState(false);
    const heroRef = useRef(null);

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

            {/* Article Header */}
            <div ref={heroRef} className="relative h-[450px] sm:h-[500px] lg:h-[550px] overflow-hidden mt-16">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${article.image})` }}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white">
                    <div className="max-w-5xl mx-auto">
                        <div className="flex items-center gap-2 mb-4 flex-wrap">
                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${categoryStyle.bg} ${categoryStyle.text}`}>
                                {categoryStyle.icon}
                                {categoryName}
                            </span>
                            {article.subCategory !== "umum" && (
                                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur">
                                    Operasi {article.subCategory.charAt(0).toUpperCase() + article.subCategory.slice(1)}
                                </span>
                            )}
                        </div>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 drop-shadow-lg leading-tight">
                            {article.title}
                        </h1>
                        <p className="text-base sm:text-lg text-white/90 mb-6 max-w-3xl">
                            {article.excerpt}
                        </p>
                        <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-white/80">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-medium">
                                    {article.author.charAt(0)}
                                </div>
                                <div>
                                    <span className="font-medium">{article.author.split(',')[0]}</span>
                                    <p className="text-xs text-white/60">{article.authorDesc || "Tenaga Medis Profesional"}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                                <span>{article.date}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                                <span>{article.readTime}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                                <span>{article.views} dibaca</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Back Button */}
            <div className="sticky top-20 z-40 max-w-5xl mx-auto px-4 sm:px-6 -mt-12 mb-4">
                <Link
                    href="/edukasi"
                    className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md hover:bg-white text-slate-600 hover:text-[#233E2E] px-4 py-2 rounded-full shadow-md transition-all group text-sm"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span>Kembali ke Edukasi</span>
                </Link>
            </div>

            {/* Article Content */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        <div
                            className="prose prose-slate max-w-none prose-headings:text-slate-800 prose-p:text-slate-600 prose-strong:text-slate-800 prose-li:text-slate-600 prose-a:text-[#233E2E] prose-img:rounded-xl prose-img:shadow-md"
                            dangerouslySetInnerHTML={{ __html: article.content }}
                        />

                        {/* Tags */}
                        <div className="mt-10 pt-6 border-t border-slate-100">
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
                        <div className="sticky top-28 space-y-6">
                            {/* Action Buttons */}
                            <div className="bg-white rounded-2xl p-4 shadow-lg border border-slate-100">
                                <div className="flex items-center justify-around">
                                    <button onClick={handleLike} className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${liked ? "bg-red-50 text-red-500" : "hover:bg-slate-50 text-slate-500"}`}>
                                        <ThumbsUp className={`w-5 h-5 ${liked ? "fill-red-500" : ""}`} />
                                        <span className="text-xs font-medium">{likesCount}</span>
                                    </button>
                                    <button onClick={() => setBookmarked(!bookmarked)} className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${bookmarked ? "bg-amber-50 text-amber-500" : "hover:bg-slate-50 text-slate-500"}`}>
                                        <Bookmark className={`w-5 h-5 ${bookmarked ? "fill-amber-500" : ""}`} />
                                        <span className="text-xs font-medium">Simpan</span>
                                    </button>
                                    <button onClick={() => window.print()} className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-slate-50 text-slate-500 transition-all">
                                        <Printer className="w-5 h-5" />
                                        <span className="text-xs font-medium">Cetak</span>
                                    </button>
                                </div>
                            </div>

                            {/* Author Info */}
                            <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100">
                                <div className="bg-gradient-to-r from-[#233E2E] to-[#3E624C] px-5 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-white text-xl font-bold">
                                            {article.author.charAt(0)}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-white text-base">{article.author.split(',')[0]}</h3>
                                            <p className="text-white/80 text-xs">{article.authorDesc}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-5">
                                    {/* Stats */}
                                    <div className="grid grid-cols-3 gap-2 mb-4 pb-4 border-b border-slate-100">
                                        <div className="text-center">
                                            <GraduationCap className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                                            <p className="text-[10px] text-slate-500">Pengalaman</p>
                                            <p className="text-xs font-semibold text-slate-700">{article.authorExperience || "10+ tahun"}</p>
                                        </div>
                                        <div className="text-center">
                                            <UsersRound className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                                            <p className="text-[10px] text-slate-500">Pasien</p>
                                            <p className="text-xs font-semibold text-slate-700">{article.authorPatients || "3.000+"}</p>
                                        </div>
                                        <div className="text-center">
                                            <Award className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                                            <p className="text-[10px] text-slate-500">Sertifikasi</p>
                                            <p className="text-xs font-semibold text-slate-700">Spesialis</p>
                                        </div>
                                    </div>

                                    {/* Bio */}
                                    <p className="text-sm text-slate-600 mb-3 leading-relaxed">
                                        {article.authorBio ? (showFullBio ? article.authorBio : `${article.authorBio.substring(0, 120)}...`) : "Dokter spesialis dengan pengalaman lebih dari 10 tahun di bidangnya, aktif dalam penelitian dan edukasi kesehatan."}
                                    </p>
                                    {article.authorBio && article.authorBio.length > 120 && (
                                        <button onClick={() => setShowFullBio(!showFullBio)} className="text-emerald-600 text-xs font-medium mb-3 hover:text-emerald-700">
                                            {showFullBio ? "Tampilkan lebih sedikit" : "Baca selengkapnya"}
                                        </button>
                                    )}

                                    {/* Education */}
                                    {article.authorEducation && (
                                        <div className="mb-3">
                                            <p className="text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1"><GraduationCap className="w-3 h-3" /> Pendidikan</p>
                                            <ul className="text-xs text-slate-500 space-y-0.5">
                                                {article.authorEducation.map((edu, i) => (
                                                    <li key={i}>• {edu}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    <Link href="/dokter">
                                        <button className="w-full bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-600 py-2 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-1">
                                            <User className="w-4 h-4" />
                                            Lihat Profil Lengkap
                                            <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </Link>
                                </div>
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
                        <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-[#233E2E]" />
                            Artikel Terkait Lainnya
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {relatedArticles.map((related) => {
                                const relatedStyle = categoryColors[related.category] || categoryColors["pasca-operasi"];
                                return (
                                    <Link href={`/edukasi/artikel/${related.id}`} key={related.id}>
                                        <div className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 border border-slate-100 hover:-translate-y-1">
                                            <div className="relative h-44 overflow-hidden">
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
                                                    <Clock className="w-3 h-3" />
                                                    <span>{related.readTime}</span>
                                                    <span>•</span>
                                                    <Eye className="w-3 h-3" />
                                                    <span>{related.views}</span>
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