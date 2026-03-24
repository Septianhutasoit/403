"use client";

import { useEffect, useState, useRef } from "react";
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
    ChevronDown, ChevronUp, Twitter, Facebook, Linkedin, Link as LinkIcon,
    Menu, X
} from "lucide-react";

// Data artikel lengkap dengan konten yang lebih kaya
const articlesData = {
    1: {
        id: 1,
        title: "Panduan Lengkap Nutrisi untuk Lansia",
        excerpt: "Makanan sehat dan pola gizi seimbang untuk menjaga vitalitas di usia lanjut.",
        category: "nutrisi",
        subCategory: "umum",
        image: "/images/edukasi/nutrisi.jpg",
        author: "dr. Sarah Wijaya, Sp.GK",
        authorDesc: "Spesialis Gizi Klinik dengan pengalaman 12 tahun merawat pasien lansia",
        date: "2 Maret 2026",
        readTime: "8 menit",
        views: "2.5K",
        likes: 342,
        tags: ["Gizi", "Makanan Sehat", "Suplemen", "Lansia"],
        content: `
      <div class="mb-6">
        <p class="text-lg leading-relaxed">Kesehatan lansia sangat dipengaruhi oleh asupan nutrisi yang tepat. Seiring bertambahnya usia, tubuh mengalami berbagai perubahan fisiologis seperti penurunan massa otot, metabolisme yang melambat, dan penurunan fungsi organ. Nutrisi yang tepat dapat membantu menjaga kualitas hidup lansia tetap optimal.</p>
      </div>
      
      <h2>🍽️ Mengapa Nutrisi Penting untuk Lansia?</h2>
      <p>Seiring bertambahnya usia, terjadi berbagai perubahan yang mempengaruhi kebutuhan gizi:</p>
      <ul>
        <li><strong>Penurunan massa otot (sarkopenia)</strong> - Membutuhkan protein lebih tinggi untuk mencegah pengecilan otot</li>
        <li><strong>Metabolisme melambat</strong> - Kebutuhan kalori berkurang namun kebutuhan nutrisi tetap tinggi</li>
        <li><strong>Penurunan fungsi pencernaan</strong> - Penyerapan nutrisi menjadi kurang optimal</li>
        <li><strong>Perubahan indera perasa dan penciuman</strong> - Dapat mempengaruhi nafsu makan</li>
        <li><strong>Risiko penyakit kronis meningkat</strong> - Nutrisi berperan dalam pencegahan dan pengelolaan penyakit</li>
      </ul>
      
      <h2>📊 Kebutuhan Gizi Harian Lansia</h2>
      <div class="bg-slate-50 p-5 rounded-xl my-4">
        <table class="w-full text-sm">
          <tr class="border-b border-slate-200"><td class="py-2 font-semibold">Kalori</td><td class="py-2">1.800-2.000 kkal/hari</td></tr>
          <tr class="border-b border-slate-200"><td class="py-2 font-semibold">Protein</td><td class="py-2">50-60 gram (1-1,2 g/kg BB)</td></tr>
          <tr class="border-b border-slate-200"><td class="py-2 font-semibold">Karbohidrat</td><td class="py-2">200-250 gram (dari sumber kompleks)</td></tr>
          <tr class="border-b border-slate-200"><td class="py-2 font-semibold">Serat</td><td class="py-2">25-30 gram</td></tr>
          <tr class="border-b border-slate-200"><td class="py-2 font-semibold">Kalsium</td><td class="py-2">1.000-1.200 mg</td></tr>
          <tr class="border-b border-slate-200"><td class="py-2 font-semibold">Vitamin D</td><td class="py-2">800-1.000 IU</td></tr>
          <tr><td class="py-2 font-semibold">Air</td><td class="py-2">1.500-2.000 ml (6-8 gelas)</td></tr>
        </table>
      </div>
      
      <h2>🐟 Sumber Makanan yang Dianjurkan</h2>
      
      <h3>1. Protein Berkualitas Tinggi</h3>
      <ul>
        <li><strong>Ikan laut:</strong> Salmon, tuna, kembung (kaya omega-3 untuk kesehatan jantung dan otak)</li>
        <li><strong>Ayam tanpa kulit:</strong> Protein tinggi, rendah lemak jenuh</li>
        <li><strong>Telur:</strong> Sumber protein lengkap dengan asam amino esensial</li>
        <li><strong>Tahu dan Tempe:</strong> Protein nabati yang mudah dicerna, kaya isoflavon</li>
        <li><strong>Susu dan Yogurt:</strong> Rendah lemak, tinggi kalsium untuk tulang</li>
      </ul>
      
      <h3>2. Sayuran Hijau dan Buah-buahan</h3>
      <ul>
        <li><strong>Sayuran hijau:</strong> Bayam, brokoli, kangkung (kaya zat besi, folat, dan serat)</li>
        <li><strong>Buah-buahan:</strong> Pepaya (melancarkan pencernaan), pisang (kalium untuk tekanan darah), apel (serat), jeruk (vitamin C)</li>
        <li><strong>Sayuran berwarna:</strong> Wortel (vitamin A), tomat (likopen antioksidan), labu (beta-karoten)</li>
      </ul>
      
      <h3>3. Karbohidrat Kompleks</h3>
      <ul>
        <li><strong>Nasi merah:</strong> Kaya serat, vitamin B, dan magnesium</li>
        <li><strong>Oatmeal:</strong> Mudah dicerna, baik untuk jantung dan kolesterol</li>
        <li><strong>Ubi jalar:</strong> Kaya vitamin A dan serat, indeks glikemik rendah</li>
        <li><strong>Roti gandum:</strong> Sumber karbohidrat dengan serat tinggi</li>
      </ul>
      
      <h2>🚫 Makanan yang Perlu Dibatasi</h2>
      <ul>
        <li><strong>Garam:</strong> Kurang dari 5 gram/hari (1 sendok teh) untuk mencegah hipertensi</li>
        <li><strong>Gula:</strong> Kurang dari 4 sendok makan/hari untuk mencegah diabetes</li>
        <li><strong>Lemak jenuh:</strong> Kurangi makanan berminyak, gorengan, jeroan</li>
        <li><strong>Makanan olahan:</strong> Tinggi natrium dan pengawet</li>
        <li><strong>Alkohol:</strong> Dapat berinteraksi dengan obat-obatan</li>
      </ul>
      
      <h2>💡 Tips Menjaga Pola Makan Lansia</h2>
      <ul>
        <li><strong>Makan sedikit tapi sering:</strong> 3 kali makan utama dan 2 kali camilan sehat</li>
        <li><strong>Variasikan menu:</strong> Agar tidak bosan dan nutrisi tercukupi</li>
        <li><strong>Perhatikan tekstur makanan:</strong> Untuk lansia dengan masalah gigi, pilih makanan lunak</li>
        <li><strong>Minum cukup air:</strong> Cegah dehidrasi yang dapat menyebabkan kebingungan dan konstipasi</li>
        <li><strong>Suplemen jika perlu:</strong> Konsultasikan dengan dokter sebelum mengonsumsi suplemen</li>
        <li><strong>Makan bersama keluarga:</strong> Meningkatkan nafsu makan dan kebersamaan</li>
      </ul>
      
      <div class="bg-emerald-50 p-6 rounded-xl my-6 border-l-4 border-emerald-500">
        <h3 class="font-bold text-emerald-800 mb-2 flex items-center gap-2">
          <Stethoscope className="w-5 h-5" /> Tips dari Dokter Spesialis Gizi
        </h3>
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
    2: {
        id: 2,
        title: "Mengenal Hipertensi pada Lansia",
        excerpt: "Penyebab, gejala, dan cara mengelola tekanan darah tinggi di usia lanjut.",
        category: "penyakit",
        subCategory: "umum",
        image: "/images/edukasi/hipertensi.jpg",
        author: "dr. Ahmad Hasan, Sp.PD",
        authorDesc: "Spesialis Penyakit Dalam dengan fokus pada hipertensi dan kardiovaskular",
        date: "1 Maret 2026",
        readTime: "8 menit",
        views: "3.1K",
        likes: 456,
        tags: ["Hipertensi", "Tekanan Darah", "Jantung", "Lansia"],
        content: `
      <div class="mb-6">
        <p class="text-lg leading-relaxed">Hipertensi atau tekanan darah tinggi adalah kondisi medis di mana tekanan darah berada pada level yang lebih tinggi dari normal. Pada lansia, hipertensi sering disebut sebagai "silent killer" karena sering tidak menunjukkan gejala namun dapat menyebabkan komplikasi serius seperti stroke dan serangan jantung.</p>
      </div>
      
      <h2>📈 Apa Itu Hipertensi?</h2>
      <p>Tekanan darah normal adalah <strong>kurang dari 120/80 mmHg</strong>. Hipertensi didefinisikan sebagai tekanan darah ≥130/80 mmHg. Angka pertama (sistolik) adalah tekanan saat jantung berdetak, angka kedua (diastolik) adalah tekanan saat jantung beristirahat.</p>
      
      <div class="bg-slate-50 p-5 rounded-xl my-4">
        <h3 class="font-bold mb-2">Klasifikasi Tekanan Darah</h3>
        <table class="w-full text-sm">
          <tr class="border-b border-slate-200"><td class="py-2">Normal</td><td class="py-2">&lt; 120/80 mmHg</td></tr>
          <tr class="border-b border-slate-200"><td class="py-2">Prehipertensi</td><td class="py-2">120-129/&lt;80 mmHg</td></tr>
          <tr class="border-b border-slate-200"><td class="py-2">Hipertensi Stadium 1</td><td class="py-2">130-139/80-89 mmHg</td></tr>
          <tr><td class="py-2">Hipertensi Stadium 2</td><td class="py-2">≥140/≥90 mmHg</td></tr>
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
      
      <h2>🚨 Gejala yang Perlu Diwaspadai</h2>
      <p>Hipertensi sering tidak menunjukkan gejala, namun jika tekanan darah sangat tinggi, gejala yang mungkin muncul:</p>
      <ul>
        <li>Sakit kepala hebat, terutama di bagian belakang kepala</li>
        <li>Sesak napas atau napas terengah-engah</li>
        <li>Pusing atau vertigo</li>
        <li>Penglihatan kabur atau ganda</li>
        <li>Nyeri dada atau palpitasi (jantung berdebar)</li>
        <li>Mual atau muntah</li>
        <li>Hidung berdarah (epistaksis)</li>
      </ul>
      
      <div class="bg-red-50 p-6 rounded-xl my-6 border-l-4 border-red-500">
        <h3 class="font-bold text-red-800 mb-2 flex items-center gap-2">
          <AlertCircle className="w-5 h-5" /> Peringatan Penting
        </h3>
        <p class="text-red-700">Jika Anda mengalami gejala-gejala di atas, segera periksakan tekanan darah Anda. Hipertensi yang tidak terkontrol dapat menyebabkan komplikasi serius seperti stroke, serangan jantung, gagal ginjal, dan kerusakan mata.</p>
      </div>
      
      <h2>💊 Cara Mengelola Hipertensi</h2>
      
      <h3>1. Perubahan Gaya Hidup (Terapi Non-Farmakologi)</h3>
      <ul>
        <li><strong>Diet DASH (Dietary Approaches to Stop Hypertension):</strong> Perbanyak sayur, buah, biji-bijian, produk rendah lemak, dan kurangi lemak jenuh</li>
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
        <li>Informasikan ke dokter tentang efek samping yang dialami</li>
      </ul>
      
      <div class="bg-green-50 p-6 rounded-xl my-6">
        <h3 class="font-bold text-green-800 mb-2">📊 Target Tekanan Darah Lansia</h3>
        <p class="text-green-700">Untuk lansia tanpa penyakit penyerta, target tekanan darah <strong>&lt;130/80 mmHg</strong>. Untuk lansia dengan diabetes atau penyakit ginjal, target <strong>&lt;140/90 mmHg</strong>. Konsultasikan target yang tepat dengan dokter Anda.</p>
      </div>
      
      <h2>📋 Panduan Memantau Tekanan Darah di Rumah</h2>
      <ul>
        <li>Gunakan tensimeter digital yang sudah terkalibrasi</li>
        <li>Ukur pada waktu yang sama setiap hari (pagi sebelum minum obat, malam sebelum tidur)</li>
        <li>Duduk tenang selama 5 menit sebelum pengukuran</li>
        <li>Posisi duduk tegak, kaki tidak menyilang, lengan sejajar dengan jantung</li>
        <li>Hindari merokok, minum kafein, atau olahraga 30 menit sebelum pengukuran</li>
        <li>Lakukan 2-3 kali pengukuran, ambil rata-rata</li>
        <li>Catat hasil dalam buku harian untuk dilaporkan ke dokter</li>
      </ul>
    `
    },
    10: {
        id: 10,
        title: "Panduan Perawatan Luka Pasca Operasi",
        excerpt: "Cara merawat luka operasi agar cepat kering dan mencegah infeksi.",
        category: "pasca-operasi",
        subCategory: "umum",
        image: "/images/edukasi/pasca-operasi/luka.jpg",
        author: "dr. Budi Santoso, Sp.B",
        authorDesc: "Spesialis Bedah Umum dengan pengalaman 15 tahun menangani pasien pasca operasi",
        date: "5 Maret 2026",
        readTime: "12 menit",
        views: "4.2K",
        likes: 567,
        tags: ["Luka", "Infeksi", "Perawatan", "Pasca Operasi"],
        content: `
      <div class="mb-6">
        <p class="text-lg leading-relaxed">Perawatan luka pasca operasi yang tepat sangat penting untuk mencegah infeksi dan mempercepat penyembuhan. Artikel ini akan membahas panduan lengkap merawat luka operasi di rumah, mulai dari persiapan alat hingga tanda-tanda infeksi yang harus diwaspadai.</p>
      </div>
      
      <h2>🩹 Jenis Luka Operasi</h2>
      <ul>
        <li><strong>Luka bersih:</strong> Operasi elektif (dijadwalkan) seperti operasi katarak, hernia, dengan risiko infeksi rendah</li>
        <li><strong>Luka terkontaminasi:</strong> Operasi pada organ yang mengandung bakteri (usus, saluran napas)</li>
        <li><strong>Luka kotor:</strong> Operasi pada infeksi aktif atau trauma dengan benda asing</li>
      </ul>
      
      <h2>📦 Perlengkapan yang Dibutuhkan</h2>
      <div class="bg-slate-50 p-5 rounded-xl my-4">
        <ul class="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <li>✓ Kasa steril (10-20 lembar)</li>
          <li>✓ Plester luka atau perekat</li>
          <li>✓ NaCl 0,9% (cairan infus) untuk membersihkan luka</li>
          <li>✓ Kapas dan sarung tangan sekali pakai</li>
          <li>✓ Tempat sampah medis</li>
          <li>✓ Salep luka (jika diresepkan dokter)</li>
          <li>✓ Gunting untuk memotong plester</li>
          <li>✓ Buku catatan untuk mencatat perkembangan luka</li>
        </ul>
      </div>
      
      <h2>📋 Panduan Perawatan Luka Harian</h2>
      
      <h3>Sebelum Merawat Luka:</h3>
      <ol>
        <li>Cuci tangan dengan sabun selama 20 detik (gunakan sabun antiseptik jika ada)</li>
        <li>Siapkan semua alat yang diperlukan di tempat yang bersih</li>
        <li>Pastikan pencahayaan cukup untuk melihat kondisi luka</li>
        <li>Kenakan sarung tangan sekali pakai</li>
      </ol>
      
      <h3>Cara Membersihkan Luka:</h3>
      <ol>
        <li>Lepas balutan lama dengan hati-hati (jika lengket, basahi dengan NaCl)</li>
        <li>Amati kondisi luka: warna, bau, dan ada tidaknya tanda infeksi</li>
        <li>Basahi kasa steril dengan NaCl 0,9%</li>
        <li>Bersihkan luka dari tengah ke tepi (sekali usap, jangan bolak-balik)</li>
        <li>Buang kasa setelah satu kali usapan</li>
        <li>Keringkan area sekitar luka dengan tepuk lembut menggunakan kasa steril</li>
        <li>Oleskan salep jika diresepkan dokter (gunakan kapas lidi steril)</li>
        <li>Tutup dengan kasa steril baru (ukuran sedikit lebih besar dari luka)</li>
        <li>Rekatkan dengan plester atau gunakan perban elastis jika diperlukan</li>
      </ol>
      
      <div class="bg-red-50 p-6 rounded-xl my-6 border-l-4 border-red-500">
        <h3 class="font-bold text-red-800 mb-2 flex items-center gap-2">
          <AlertCircle className="w-5 h-5" /> Tanda Infeksi Luka (Segera ke Dokter!)
        </h3>
        <ul class="text-red-700 space-y-1 list-disc list-inside">
          <li>Kemerahan meluas >2 cm dari tepi luka</li>
          <li>Bengkak membesar, terasa hangat saat disentuh</li>
          <li>Nyeri bertambah hebat, tidak tertahankan</li>
          <li>Nanah cairan kental kuning/hijau, berbau tidak sedap</li>
          <li>Demam suhu >38°C, menggigil</li>
          <li>Jahitan terlepas, luka terbuka menganga</li>
          <li>Luka mengeluarkan darah segar terus-menerus</li>
        </ul>
      </div>
      
      <h2>⏰ Frekuensi Ganti Balutan</h2>
      <ul>
        <li><strong>Luka bersih:</strong> setiap 1-2 hari atau jika balutan kotor</li>
        <li><strong>Luka basah (eksudat):</strong> setiap hari</li>
        <li><strong>Luka infeksi:</strong> 2-3 kali sehari (sesuai instruksi dokter)</li>
        <li><strong>Balutan basah atau kotor:</strong> segera ganti</li>
      </ul>
      
      <h2>💡 Tips Perawatan Luka di Rumah</h2>
      <ul>
        <li><strong>Jaga luka tetap kering</strong> 24-48 jam pertama setelah operasi (tutup saat mandi dengan plastik)</li>
        <li>Setelah itu boleh kena air (keringkan segera dengan handuk bersih)</li>
        <li>Jangan merendam luka (mandi bak, berenang) sampai jahitan dilepas atau luka benar-benar kering</li>
        <li>Jangan menggaruk atau mengelupas keropeng (biarkan lepas sendiri)</li>
        <li>Konsumsi makanan tinggi protein (ikan, telur, tahu, tempe) untuk mempercepat penyembuhan</li>
        <li>Perbanyak vitamin C dari jeruk, kiwi, dan tomat untuk pembentukan kolagen</li>
        <li>Minum air putih minimal 8 gelas/hari untuk hidrasi</li>
        <li>Istirahat cukup (7-8 jam/hari) untuk mendukung proses penyembuhan</li>
        <li>Hindari merokok dan alkohol yang menghambat penyembuhan</li>
      </ul>
      
      <div class="bg-green-50 p-6 rounded-xl my-6">
        <h3 class="font-bold text-green-800 mb-2">🥗 Makanan yang Membantu Penyembuhan Luka</h3>
        <ul class="text-green-700 grid grid-cols-1 sm:grid-cols-2 gap-2">
          <li>✓ Ikan salmon, tuna (omega-3)</li>
          <li>✓ Telur (protein, zinc)</li>
          <li>✓ Jeruk, kiwi (vitamin C)</li>
          <li>✓ Kacang-kacangan (zinc, vitamin E)</li>
          <li>✓ Sayuran hijau (vitamin K, folat)</li>
          <li>✓ Yogurt (probiotik)</li>
        </ul>
      </div>
      
      <div class="bg-yellow-50 p-6 rounded-xl my-6">
        <h3 class="font-bold text-yellow-800 mb-2">📞 Kapan Harus Menghubungi Dokter?</h3>
        <ul class="text-yellow-700">
          <li>✓ Jika muncul salah satu tanda infeksi di atas</li>
          <li>✓ Jika jahitan terlepas atau luka terbuka</li>
          <li>✓ Jika nyeri tidak berkurang dengan obat yang diberikan</li>
          <li>✓ Jika demam tidak turun setelah 24 jam</li>
          <li>✓ Jika ada keluhan lain yang mengkhawatirkan</li>
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
    const [showTOC, setShowTOC] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const heroRef = useRef(null);
    const sidebarRef = useRef(null);

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
            router.push("/edukasi");
        }
    }, [params.id, router]);

    // Sticky sidebar effect
    useEffect(() => {
        const handleScroll = () => {
            if (heroRef.current) {
                const heroBottom = heroRef.current.getBoundingClientRect().bottom;
                setIsSticky(heroBottom < 0);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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

            {/* Article Header - dengan padding top untuk menghindari navbar */}
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
                                    {article.subCategory === "jantung" && <HeartPulse className="w-3 h-3" />}
                                    {article.subCategory === "ortopedi" && <Bone className="w-3 h-3" />}
                                    {article.subCategory === "mata" && <EyeIcon className="w-3 h-3" />}
                                    {article.subCategory === "gigi" && <Smile className="w-3 h-3" />}
                                    Operasi {article.subCategory.charAt(0).toUpperCase() + article.subCategory.slice(1)}
                                </span>
                            )}
                        </div>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 drop-shadow-lg leading-tight">
                            {article.title}
                        </h1>
                        <p className="text-base sm:text-lg text-white/90 mb-6 max-w-3xl line-clamp-2">
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

            {/* Back Button - Floating */}
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
                        <div className={`sticky top-28 space-y-6 transition-all duration-300 ${isSticky ? 'pt-2' : ''}`}>
                            {/* Action Buttons */}
                            <div className="bg-white rounded-2xl p-4 shadow-lg border border-slate-100">
                                <div className="flex items-center justify-around">
                                    <button
                                        onClick={handleLike}
                                        className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${liked ? "bg-red-50 text-red-500" : "hover:bg-slate-50 text-slate-500"
                                            }`}
                                    >
                                        <ThumbsUp className={`w-5 h-5 ${liked ? "fill-red-500" : ""}`} />
                                        <span className="text-xs font-medium">{likesCount}</span>
                                    </button>

                                    <button
                                        onClick={handleShare}
                                        className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-slate-50 text-slate-500 transition-all"
                                    >
                                        <Share2 className="w-5 h-5" />
                                        <span className="text-xs font-medium">Bagikan</span>
                                    </button>

                                    <button
                                        onClick={() => setBookmarked(!bookmarked)}
                                        className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${bookmarked ? "bg-amber-50 text-amber-500" : "hover:bg-slate-50 text-slate-500"
                                            }`}
                                    >
                                        <Bookmark className={`w-5 h-5 ${bookmarked ? "fill-amber-500" : ""}`} />
                                        <span className="text-xs font-medium">Simpan</span>
                                    </button>

                                    <button
                                        onClick={() => window.print()}
                                        className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-slate-50 text-slate-500 transition-all"
                                    >
                                        <Printer className="w-5 h-5" />
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
                                    Dokter spesialis dengan pengalaman lebih dari 10 tahun di bidangnya, aktif dalam penelitian dan edukasi kesehatan.
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