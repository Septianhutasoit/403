"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import FloatingChat from "@/components/FloatingChat";
import {
    Heart, BookOpen, Clock, Eye, ThumbsUp, Share2, Bookmark,
    ChevronLeft, ChevronRight, User, Calendar, MessageCircle,
    Printer, Download, Twitter, Facebook, Linkedin, Link as LinkIcon,
    ArrowLeft, Sparkles, CheckCircle, AlertCircle, Stethoscope,
    Bandage, Apple, Brain, Activity, Pill, HeartPulse, Bone,
    Eye as EyeIcon, Smile, TrendingUp, Star, Award, Shield, Zap
} from "lucide-react";

// Data artikel lengkap
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
      <p>Kesehatan lansia sangat dipengaruhi oleh asupan nutrisi yang tepat. Seiring bertambahnya usia, tubuh mengalami perubahan yang mempengaruhi kebutuhan gizi. Artikel ini akan membahas panduan lengkap nutrisi untuk lansia agar tetap sehat dan bugar.</p>
      
      <h2>Mengapa Nutrisi Penting untuk Lansia?</h2>
      <p>Seiring bertambahnya usia, terjadi berbagai perubahan fisiologis seperti penurunan massa otot, metabolisme yang melambat, dan penurunan fungsi organ. Nutrisi yang tepat dapat membantu:</p>
      <ul>
        <li>Menjaga massa otot dan kekuatan tubuh</li>
        <li>Meningkatkan sistem imun</li>
        <li>Mencegah penyakit kronis seperti diabetes dan hipertensi</li>
        <li>Menjaga kesehatan tulang dan sendi</li>
        <li>Meningkatkan kualitas hidup secara keseluruhan</li>
      </ul>
      
      <h2>Kebutuhan Gizi Harian Lansia</h2>
      <p>Berikut adalah kebutuhan gizi yang harus dipenuhi lansia setiap harinya:</p>
      <ul>
        <li><strong>Kalori:</strong> 1.800-2.000 kkal per hari</li>
        <li><strong>Protein:</strong> 50-60 gram (1-1,2 gram per kg berat badan)</li>
        <li><strong>Karbohidrat:</strong> 200-250 gram (dari sumber kompleks)</li>
        <li><strong>Serat:</strong> 25-30 gram</li>
        <li><strong>Kalsium:</strong> 1.000-1.200 mg</li>
        <li><strong>Vitamin D:</strong> 800-1.000 IU</li>
        <li><strong>Air:</strong> 1.500-2.000 ml (6-8 gelas)</li>
      </ul>
      
      <h2>Sumber Makanan yang Dianjurkan</h2>
      
      <h3>1. Protein Berkualitas Tinggi</h3>
      <ul>
        <li><strong>Ikan:</strong> Salmon, tuna, kembung (kaya omega-3)</li>
        <li><strong>Ayam:</strong> Tanpa kulit, dimasak dengan cara dikukus atau direbus</li>
        <li><strong>Telur:</strong> Sumber protein lengkap</li>
        <li><strong>Tahu dan Tempe:</strong> Protein nabati yang mudah dicerna</li>
        <li><strong>Susu dan Yogurt:</strong> Rendah lemak, tinggi kalsium</li>
      </ul>
      
      <h3>2. Sayuran Hijau dan Buah-buahan</h3>
      <ul>
        <li><strong>Sayuran hijau:</strong> Bayam, brokoli, kangkung (kaya zat besi dan serat)</li>
        <li><strong>Buah-buahan:</strong> Pepaya, pisang, apel, jeruk (vitamin C dan serat)</li>
        <li><strong>Sayuran berwarna:</strong> Wortel, tomat, labu (antioksidan)</li>
      </ul>
      
      <h3>3. Karbohidrat Kompleks</h3>
      <ul>
        <li><strong>Nasi merah:</strong> Kaya serat dan vitamin B</li>
        <li><strong>Oatmeal:</strong> Mudah dicerna, baik untuk jantung</li>
        <li><strong>Ubi jalar:</strong> Kaya vitamin A dan serat</li>
        <li><strong>Roti gandum:</strong> Sumber karbohidrat dengan indeks glikemik rendah</li>
      </ul>
      
      <h2>Makanan yang Perlu Dibatasi</h2>
      <ul>
        <li><strong>Garam:</strong> Kurang dari 5 gram/hari (1 sendok teh) untuk mencegah hipertensi</li>
        <li><strong>Gula:</strong> Kurang dari 4 sendok makan/hari untuk mencegah diabetes</li>
        <li><strong>Lemak jenuh:</strong> Kurangi makanan berminyak dan gorengan</li>
        <li><strong>Makanan olahan:</strong> Tinggi natrium dan pengawet</li>
      </ul>
      
      <h2>Tips Menjaga Pola Makan Lansia</h2>
      <ul>
        <li><strong>Makan sedikit tapi sering:</strong> 3 kali makan utama dan 2 kali camilan sehat</li>
        <li><strong>Variasikan menu:</strong> Agar tidak bosan dan nutrisi tercukupi</li>
        <li><strong>Perhatikan tekstur makanan:</strong> Untuk lansia dengan masalah gigi, pilih makanan lunak</li>
        <li><strong>Minum cukup air:</strong> Cegah dehidrasi yang dapat menyebabkan kebingungan</li>
        <li><strong>Suplemen jika perlu:</strong> Konsultasikan dengan dokter sebelum mengonsumsi suplemen</li>
      </ul>
      
      <div class="bg-emerald-50 p-6 rounded-xl my-6 border-l-4 border-emerald-500">
        <h3 class="font-bold text-emerald-800 mb-2 flex items-center gap-2">
          <Stethoscope className="w-5 h-5" /> Tips dari Dokter
        </h3>
        <p class="text-emerald-700">"Jangan lupa untuk selalu berkonsultasi dengan dokter sebelum mengubah pola makan, terutama jika memiliki kondisi kesehatan tertentu seperti diabetes atau hipertensi. Setiap lansia memiliki kebutuhan nutrisi yang berbeda sesuai kondisi kesehatannya." - dr. Sarah Wijaya, Sp.GK</p>
      </div>
      
      <h2>Contoh Menu Sehat untuk Lansia</h2>
      <p>Berikut contoh menu sehari yang bisa diterapkan:</p>
      <ul>
        <li><strong>Sarapan (07.00):</strong> Oatmeal dengan pisang dan susu rendah lemak + telur rebus</li>
        <li><strong>Camilan (10.00):</strong> Buah pepaya potong</li>
        <li><strong>Makan Siang (12.00):</strong> Nasi merah + ikan kukus + sayur bening bayam</li>
        <li><strong>Camilan (15.00):</strong> Yogurt + kacang almond</li>
        <li><strong>Makan Malam (18.00):</strong> Sup ayam kampung + tahu tempe bacem</li>
      </ul>
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
        readTime: "6 menit",
        views: "3.1K",
        likes: 456,
        tags: ["Hipertensi", "Tekanan Darah", "Jantung", "Lansia"],
        content: `
      <p>Hipertensi atau tekanan darah tinggi adalah kondisi umum pada lansia. Deteksi dini dan penanganan yang tepat sangat penting untuk mencegah komplikasi serius seperti stroke dan serangan jantung.</p>
      
      <h2>Apa Itu Hipertensi?</h2>
      <p>Hipertensi adalah kondisi di mana tekanan darah berada pada level yang lebih tinggi dari normal. Tekanan darah normal adalah <120/80 mmHg. Hipertensi didefinisikan sebagai tekanan darah ≥130/80 mmHg.</p>
      
      <h2>Penyebab Hipertensi pada Lansia</h2>
      <ul>
        <li><strong>Penuaan alami:</strong> Pembuluh darah menjadi lebih kaku seiring usia</li>
        <li><strong>Gaya hidup:</strong> Konsumsi garam berlebih, kurang aktivitas fisik</li>
        <li><strong>Obesitas:</strong> Kelebihan berat badan meningkatkan tekanan darah</li>
        <li><strong>Stres:</strong> Dapat memicu peningkatan tekanan darah sementara</li>
        <li><strong>Riwayat keluarga:</strong> Faktor genetik berperan penting</li>
        <li><strong>Penyakit lain:</strong> Diabetes, penyakit ginjal, atau gangguan hormon</li>
      </ul>
      
      <h2>Gejala yang Perlu Diwaspadai</h2>
      <p>Hipertensi sering disebut "silent killer" karena sering tidak menunjukkan gejala. Namun, jika tekanan darah sangat tinggi, gejala yang mungkin muncul:</p>
      <ul>
        <li>Sakit kepala hebat</li>
        <li>Sesak napas</li>
        <li>Pusing atau vertigo</li>
        <li>Penglihatan kabur</li>
        <li>Nyeri dada</li>
        <li>Detak jantung tidak teratur</li>
      </ul>
      
      <div class="bg-red-50 p-6 rounded-xl my-6 border-l-4 border-red-500">
        <h3 class="font-bold text-red-800 mb-2 flex items-center gap-2">
          <AlertCircle className="w-5 h-5" /> Peringatan Penting
        </h3>
        <p class="text-red-700">Jika Anda mengalami gejala-gejala di atas, segera periksakan tekanan darah Anda. Hipertensi yang tidak terkontrol dapat menyebabkan komplikasi serius seperti stroke, serangan jantung, dan gagal ginjal.</p>
      </div>
      
      <h2>Cara Mengelola Hipertensi</h2>
      <h3>1. Perubahan Gaya Hidup</h3>
      <ul>
        <li><strong>Kurangi garam:</strong> Batasi konsumsi garam kurang dari 5 gram/hari</li>
        <li><strong>Olahraga teratur:</strong> 30 menit sehari, 5 kali seminggu</li>
        <li><strong>Jaga berat badan ideal:</strong> Turunkan berat badan jika kelebihan</li>
        <li><strong>Konsumsi makanan sehat:</strong> Perbanyak sayur, buah, dan biji-bijian</li>
        <li><strong>Batasi alkohol dan kafein:</strong> Dapat meningkatkan tekanan darah</li>
        <li><strong>Kelola stres:</strong> Teknik relaksasi, meditasi, atau yoga</li>
      </ul>
      
      <h3>2. Pengobatan Medis</h3>
      <ul>
        <li>Minum obat antihipertensi secara teratur sesuai resep dokter</li>
        <li>Jangan menghentikan obat tanpa konsultasi dokter</li>
        <li>Rutin kontrol tekanan darah ke fasilitas kesehatan</li>
        <li>Catat hasil pengukuran tekanan darah di rumah</li>
      </ul>
      
      <div class="bg-blue-50 p-6 rounded-xl my-6">
        <h3 class="font-bold text-blue-800 mb-2">📊 Target Tekanan Darah Lansia</h3>
        <p class="text-blue-700">Untuk lansia tanpa penyakit penyerta, target tekanan darah <130/80 mmHg. Untuk lansia dengan diabetes atau penyakit ginjal, target <140/90 mmHg. Konsultasikan target yang tepat dengan dokter Anda.</p>
      </div>
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
        authorDesc: "Spesialis Bedah Umum dengan pengalaman 15 tahun",
        date: "5 Maret 2026",
        readTime: "10 menit",
        views: "4.2K",
        likes: 567,
        tags: ["Luka", "Infeksi", "Perawatan", "Pasca Operasi"],
        content: `
      <p>Perawatan luka pasca operasi yang tepat sangat penting untuk mencegah infeksi dan mempercepat penyembuhan. Artikel ini akan membahas panduan lengkap merawat luka operasi di rumah.</p>
      
      <h2>Jenis Luka Operasi</h2>
      <ul>
        <li><strong>Luka bersih:</strong> Operasi elektif (dijadwalkan), risiko infeksi rendah</li>
        <li><strong>Luka terkontaminasi:</strong> Operasi pada organ yang mengandung bakteri</li>
        <li><strong>Luka kotor:</strong> Operasi pada infeksi aktif atau trauma</li>
      </ul>
      
      <h2>Perlengkapan yang Dibutuhkan</h2>
      <ul>
        <li>Kasa steril (10-20 lembar)</li>
        <li>Plester luka atau perekat</li>
        <li>NaCl 0,9% (cairan infus) untuk membersihkan luka</li>
        <li>Kapas dan sarung tangan sekali pakai</li>
        <li>Tempat sampah medis</li>
        <li>Salep luka (jika diresepkan dokter)</li>
      </ul>
      
      <h2>Panduan Perawatan Luka Harian</h2>
      
      <h3>Sebelum Merawat Luka:</h3>
      <ul>
        <li>Cuci tangan dengan sabun selama 20 detik</li>
        <li>Siapkan semua alat yang diperlukan</li>
        <li>Pastikan pencahayaan cukup</li>
      </ul>
      
      <h3>Cara Membersihkan Luka:</h3>
      <ol>
        <li>Pakai sarung tangan bersih</li>
        <li>Lepas balutan lama dengan hati-hati</li>
        <li>Amati tanda infeksi (kemerahan, bengkak, nanah)</li>
        <li>Basahi kasa dengan NaCl 0,9%</li>
        <li>Bersihkan luka dari tengah ke tepi (sekali usap, jangan bolak-balik)</li>
        <li>Keringkan dengan tepuk lembut menggunakan kasa steril (jangan digosok)</li>
        <li>Oleskan salep jika diresepkan dokter</li>
        <li>Tutup dengan kasa steril baru</li>
        <li>Rekatkan dengan plester</li>
      </ol>
      
      <h3>Frekuensi Ganti Balutan:</h3>
      <ul>
        <li>Luka bersih: setiap 1-2 hari</li>
        <li>Luka basah: setiap hari</li>
        <li>Luka infeksi: 2-3 kali sehari (sesuai instruksi dokter)</li>
      </ul>
      
      <div class="bg-red-50 p-6 rounded-xl my-6 border-l-4 border-red-500">
        <h3 class="font-bold text-red-800 mb-2 flex items-center gap-2">
          <AlertCircle className="w-5 h-5" /> Tanda Infeksi Luka (Segera ke Dokter)
        </h3>
        <ul class="text-red-700 list-disc list-inside">
          <li>Kemerahan meluas >2 cm dari tepi luka</li>
          <li>Bengkak membesar, terasa hangat</li>
          <li>Nyeri bertambah hebat</li>
          <li>Nanah cairan kental kuning/hijau, berbau</li>
          <li>Demam suhu >38°C</li>
          <li>Jahitan lepas, luka terbuka menganga</li>
        </ul>
      </div>
      
      <h2>Tips Perawatan Luka di Rumah</h2>
      <ul>
        <li>Jaga luka tetap kering 24-48 jam pertama setelah operasi</li>
        <li>Setelah itu boleh kena air (keringkan segera)</li>
        <li>Jangan merendam luka (mandi bak, berenang) sampai jahitan dilepas</li>
        <li>Jangan menggaruk atau mengelupas keropeng</li>
        <li>Konsumsi makanan tinggi protein untuk mempercepat penyembuhan</li>
        <li>Minum obat sesuai resep dokter</li>
        <li>Istirahat cukup untuk membantu proses pemulihan</li>
      </ul>
      
      <div class="bg-green-50 p-6 rounded-xl my-6">
        <h3 class="font-bold text-green-800 mb-2 flex items-center gap-2">
          <Zap className="w-5 h-5" /> Tips Pemulihan Cepat
        </h3>
        <ul class="text-green-700 list-disc list-inside">
          <li>Konsumsi protein tinggi (ikan, telur, tahu, tempe)</li>
          <li>Perbanyak vitamin C dari jeruk, kiwi, dan tomat</li>
          <li>Minum air putih minimal 8 gelas/hari</li>
          <li>Tidur cukup 7-8 jam per hari</li>
          <li>Hindari merokok dan alkohol</li>
        </ul>
      </div>
    `
    },
    11: {
        id: 11,
        title: "Pemulihan Pasca Operasi Jantung",
        excerpt: "Langkah-langkah penting untuk pemulihan optimal setelah operasi jantung.",
        category: "pasca-operasi",
        subCategory: "jantung",
        image: "/images/edukasi/pasca-operasi/jantung.jpg",
        author: "dr. Ahmad Hasan, Sp.BTKV",
        authorDesc: "Spesialis Bedah Thorax, Kardiovaskular",
        date: "4 Maret 2026",
        readTime: "15 menit",
        views: "3.8K",
        likes: 489,
        tags: ["Jantung", "Kardiovaskular", "Rehabilitasi", "Pasca Operasi"],
        content: `
      <p>Operasi jantung adalah prosedur besar yang membutuhkan pemulihan yang tepat. Dengan perawatan yang baik, Anda dapat kembali beraktivitas normal dan meningkatkan kualitas hidup. Berikut panduan lengkap pemulihan pasca operasi jantung.</p>
      
      <h2>Tahapan Pemulihan Pasca Operasi Jantung</h2>
      
      <h3>Fase I (0-2 hari) - Perawatan Intensif</h3>
      <ul>
        <li>Berada di ruang ICU untuk monitoring ketat</li>
        <li>Latihan napas dalam dengan spirometer insentif (alat latihan napas)</li>
        <li>Mobilisasi bertahap (duduk di tempat tidur)</li>
        <li>Manajemen nyeri dengan obat sesuai resep</li>
        <li>Edukasi awal tentang perawatan di rumah</li>
      </ul>
      
      <h3>Fase II (2-7 hari) - Perawatan Rawat Inap</h3>
      <ul>
        <li>Mulai berjalan dengan pendamping di sekitar ruangan</li>
        <li>Perawatan luka operasi (sternotomy)</li>
        <li>Edukasi lengkap tentang perawatan di rumah</li>
        <li>Konsultasi gizi untuk pola makan jantung sehat</li>
        <li>Latihan pernapasan intensif</li>
      </ul>
      
      <h3>Fase III (2-6 minggu) - Pemulihan Awal di Rumah</h3>
      <ul>
        <li>Jalan kaki secara bertahap (mulai 5-10 menit, tingkatkan perlahan)</li>
        <li>Hindari angkat beban >5 kg selama 6 minggu</li>
        <li>Ikuti program rehabilitasi jantung</li>
        <li>Kontrol tekanan darah dan gula darah secara rutin</li>
        <li>Jangan menyetir selama 4-6 minggu</li>
        <li>Hindari mendorong atau menarik benda berat</li>
      </ul>
      
      <h3>Fase IV (>6 minggu) - Kembali Normal</h3>
      <ul>
        <li>Kembali bekerja (dengan izin dokter)</li>
        <li>Olahraga teratur dengan intensitas sedang</li>
        <li>Pertahankan pola makan sehat jantung</li>
        <li>Kontrol rutin ke dokter jantung</li>
        <li>Terus ikuti gaya hidup sehat</li>
      </ul>
      
      <div class="bg-green-50 p-6 rounded-xl my-6 border-l-4 border-green-500">
        <h3 class="font-bold text-green-800 mb-2 flex items-center gap-2">
          <HeartPulse className="w-5 h-5" /> Program Rehabilitasi Jantung
        </h3>
        <p class="text-green-700">Program rehabilitasi jantung terbukti menurunkan risiko kematian hingga 25% dan meningkatkan kualitas hidup pasien pasca operasi jantung. Program ini mencakup latihan fisik terstruktur, edukasi gaya hidup sehat, dan dukungan psikologis. Tanyakan kepada dokter Anda tentang program rehabilitasi jantung yang tersedia.</p>
      </div>
      
      <h2>Pola Makan untuk Pasien Jantung</h2>
      <ul>
        <li><strong>Kurangi lemak jenuh:</strong> Hindari gorengan, santan, jeroan, dan daging berlemak</li>
        <li><strong>Perbanyak ikan berlemak:</strong> Salmon, tuna, kembung (kaya omega-3)</li>
        <li><strong>Konsumsi serat:</strong> Perbanyak sayur dan buah segar</li>
        <li><strong>Batasi garam:</strong> Kurang dari 5 gram/hari</li>
        <li><strong>Hindari alkohol dan kafein berlebih</strong></li>
        <li><strong>Pilih minyak sehat:</strong> Minyak zaitun, minyak kanola</li>
      </ul>
      
      <h2>Tanda Bahaya yang Perlu Diwaspadai</h2>
      <div class="bg-red-50 p-6 rounded-xl my-6">
        <ul class="text-red-700 space-y-2">
          <li><strong>⚠️ Nyeri dada seperti ditekan</strong> - segera ke IGD</li>
          <li><strong>⚠️ Sesak napas saat aktivitas ringan</strong> - segera ke IGD</li>
          <li><strong>⚠️ Jantung berdebar tidak teratur</strong> - konsultasi dokter</li>
          <li><strong>⚠️ Pusing mendadak atau pingsan</strong> - segera ke IGD</li>
          <li><strong>⚠️ Bengkak kaki mendadak</strong> - segera ke IGD</li>
        </ul>
      </div>
      
      <h2>Tips Kembali ke Aktivitas</h2>
      <ul>
        <li>Kembali bekerja secara bertahap, mulai paruh waktu jika memungkinkan</li>
        <li>Hindari stres berlebihan di tempat kerja</li>
        <li>Istirahat teratur setiap 1-2 jam</li>
        <li>Dengarkan tubuh, jangan memaksakan diri</li>
        <li>Konsultasikan dengan dokter sebelum memulai aktivitas baru</li>
      </ul>
    `
    },
    14: {
        id: 14,
        title: "Perawatan Pasca Operasi Katarak",
        excerpt: "Panduan lengkap merawat mata setelah operasi katarak agar cepat sembuh.",
        category: "pasca-operasi",
        subCategory: "mata",
        image: "/images/edukasi/pasca-operasi/katarak.jpg",
        author: "dr. Rina Putri, Sp.M",
        authorDesc: "Spesialis Mata dengan fokus pada operasi katarak",
        date: "1 Maret 2026",
        readTime: "7 menit",
        views: "3.2K",
        likes: 412,
        tags: ["Mata", "Katarak", "Penglihatan", "Pasca Operasi"],
        content: `
      <p>Operasi katarak adalah prosedur yang aman dan efektif untuk mengembalikan penglihatan. Perawatan pasca operasi yang tepat sangat penting untuk hasil optimal. Berikut panduan lengkap merawat mata setelah operasi katarak.</p>
      
      <h2>Perawatan Mata di Rumah</h2>
      
      <h3>Hari Pertama Setelah Operasi:</h3>
      <ul>
        <li>Istirahat total, hindari aktivitas berat</li>
        <li>Pakai pelindung mata yang diberikan dokter</li>
        <li>Jangan mengucek atau menekan mata</li>
        <li>Jangan membasahi mata (tutup mata saat mandi)</li>
        <li>Hindari membaca atau melihat layar gadget</li>
      </ul>
      
      <h3>Minggu Pertama:</h3>
      <ul>
        <li>Tetes mata sesuai jadwal (biasanya 4 kali sehari)</li>
        <li>Jangan menunduk atau membungkuk</li>
        <li>Hindari mengangkat beban >5 kg</li>
        <li>Tidur dengan pelindung mata</li>
        <li>Jangan membaca atau melihat layar >15 menit</li>
      </ul>
      
      <div class="bg-blue-50 p-6 rounded-xl my-6 border-l-4 border-blue-500">
        <h3 class="font-bold text-blue-800 mb-2 flex items-center gap-2">
          <EyeIcon className="w-5 h-5" /> Tips dari Dokter Mata
        </h3>
        <p class="text-blue-700">"Gunakan kacamata hitam saat beraktivitas di luar ruangan selama 1 minggu pertama. Ini membantu melindungi mata dari debu dan sinar UV yang dapat mengiritasi. Jangan lupa untuk selalu mencuci tangan sebelum meneteskan obat mata." - dr. Rina Putri, Sp.M</p>
      </div>
      
      <h2>Larangan Penting</h2>
      <div class="bg-red-50 p-6 rounded-xl my-6">
        <ul class="text-red-700 space-y-2">
          <li><strong>❌ Jangan mengucek atau menekan mata</strong> - dapat merusak hasil operasi</li>
          <li><strong>❌ Jangan membiarkan mata terkena air sabun</strong> - gunakan tutup mata saat mandi</li>
          <li><strong>❌ Jangan mengemudi sampai izin dokter</strong> - penglihatan masih dalam pemulihan</li>
          <li><strong>❌ Jangan berenang atau mandi bak selama 2 minggu</strong> - risiko infeksi</li>
          <li><strong>❌ Jangan memakai riasan mata selama 2 minggu</strong> - dapat mengiritasi</li>
          <li><strong>❌ Jangan tidur telentang</strong> - tidur miring ke sisi mata yang tidak dioperasi</li>
        </ul>
      </div>
      
      <h2>Jadwal Kontrol yang Dianjurkan</h2>
      <ul>
        <li><strong>Kontrol 1:</strong> 1 hari setelah operasi</li>
        <li><strong>Kontrol 2:</strong> 1 minggu setelah operasi</li>
        <li><strong>Kontrol 3:</strong> 1 bulan setelah operasi</li>
        <li><strong>Kontrol 4:</strong> 3 bulan setelah operasi</li>
      </ul>
      
      <h2>Tanda Bahaya (Segera ke Dokter)</h2>
      <ul>
        <li>Nyeri hebat pada mata</li>
        <li>Penurunan penglihatan mendadak</li>
        <li>Mata merah berlebihan</li>
        <li>Keluar cairan dari mata</li>
        <li>Melihat kilatan cahaya atau bayangan baru</li>
        <li>Demam >38°C</li>
      </ul>
      
      <div class="bg-emerald-50 p-6 rounded-xl my-6">
        <h3 class="font-bold text-emerald-800 mb-2">📋 Checklist Persiapan di Rumah</h3>
        <ul class="text-emerald-700 list-disc list-inside">
          <li>Pelindung mata dari dokter</li>
          <li>Obat tetes mata sesuai resep</li>
          <li>Kacamata hitam</li>
          <li>Sarung bantal yang bersih</li>
          <li>Nomor telepon dokter untuk keadaan darurat</li>
        </ul>
      </div>
    `
    }
};

// Artikel lainnya dengan konten default yang informatif
const getDefaultContent = (category, title) => {
    const categoryInfo = {
        nutrisi: { icon: "🥗", color: "green", title: "Nutrisi & Gizi" },
        penyakit: { icon: "🩺", color: "orange", title: "Penyakit Umum" },
        obat: { icon: "💊", color: "purple", title: "Penggunaan Obat" },
        aktivitas: { icon: "🏃", color: "teal", title: "Aktivitas Fisik" },
        mental: { icon: "🧠", color: "pink", title: "Kesehatan Mental" },
        "pasca-operasi": { icon: "🏥", color: "blue", title: "Pasca Operasi" }
    };
    const info = categoryInfo[category] || { icon: "📚", color: "emerald", title: "Kesehatan" };

    return `
    <p>${title} adalah artikel edukasi kesehatan yang disusun oleh tim medis KawanPulih. Kami berkomitmen memberikan informasi kesehatan yang akurat dan terpercaya untuk membantu Anda dan keluarga.</p>
    
    <h2>Pendahuluan</h2>
    <p>Kesehatan adalah hal yang paling berharga. Dengan memahami kondisi kesehatan Anda, Anda dapat mengambil langkah pencegahan yang tepat dan meningkatkan kualitas hidup. Artikel ini membahas berbagai aspek penting terkait ${title.toLowerCase()}.</p>
    
    <div class="bg-${info.color}-50 p-6 rounded-xl my-6 border-l-4 border-${info.color}-500">
      <h3 class="font-bold text-${info.color}-800 mb-2 flex items-center gap-2">
        <span class="text-2xl">${info.icon}</span> Informasi Penting
      </h3>
      <p class="text-${info.color}-700">Artikel ini disusun berdasarkan sumber terpercaya dan telah ditinjau oleh tenaga medis profesional. Informasi disajikan untuk tujuan edukasi dan tidak menggantikan saran medis langsung dari dokter.</p>
    </div>
    
    <h2>Apa yang Perlu Anda Ketahui?</h2>
    <p>Memahami kondisi kesehatan adalah langkah pertama menuju pemulihan yang optimal. Berikut adalah poin-poin penting yang perlu Anda ketahui:</p>
    <ul>
      <li>Kenali gejala awal untuk deteksi dini</li>
      <li>Lakukan pencegahan dengan gaya hidup sehat</li>
      <li>Konsultasi rutin dengan tenaga kesehatan</li>
      <li>Ikuti anjuran dokter dengan disiplin</li>
      <li>Dukungan keluarga sangat penting dalam proses pemulihan</li>
    </ul>
    
    <h2>Tips Praktis Sehari-hari</h2>
    <ul>
      <li>Jaga pola makan seimbang dengan memperbanyak sayur dan buah</li>
      <li>Lakukan aktivitas fisik ringan secara teratur</li>
      <li>Istirahat cukup minimal 7-8 jam per hari</li>
      <li>Kelola stres dengan teknik relaksasi</li>
      <li>Rutin memeriksakan kesehatan ke fasilitas terdekat</li>
    </ul>
    
    <div class="bg-blue-50 p-6 rounded-xl my-6">
      <h3 class="font-bold text-blue-800 mb-2">📞 Butuh Bantuan?</h3>
      <p class="text-blue-700">Jika Anda memiliki pertanyaan lebih lanjut tentang topik ini, jangan ragu untuk menghubungi tim customer service kami di +62 21 1234 5678 atau melalui WhatsApp di +62 812-3456-7890. Tim kami siap membantu Anda 24/7.</p>
    </div>
  `;
};

export default function ArtikelDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [article, setArticle] = useState(null);
    const [liked, setLiked] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);
    const [showShare, setShowShare] = useState(false);
    const [relatedArticles, setRelatedArticles] = useState([]);
    const [showTOC, setShowTOC] = useState(false);

    useEffect(() => {
        const id = parseInt(params.id);
        const foundArticle = articlesData[id];

        if (foundArticle) {
            setArticle(foundArticle);

            // Cari artikel terkait berdasarkan kategori
            const related = Object.values(articlesData)
                .filter(a => a.id !== id && a.category === foundArticle.category)
                .slice(0, 3);
            setRelatedArticles(related);
        } else {
            router.push("/edukasi");
        }
    }, [params.id, router]);

    const handleLike = () => {
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

    const categoryColors = {
        nutrisi: { bg: "bg-green-50", text: "text-green-700", border: "border-green-200", icon: <Apple className="w-4 h-4" /> },
        penyakit: { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200", icon: <AlertCircle className="w-4 h-4" /> },
        obat: { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200", icon: <Pill className="w-4 h-4" /> },
        aktivitas: { bg: "bg-teal-50", text: "text-teal-700", border: "border-teal-200", icon: <Activity className="w-4 h-4" /> },
        mental: { bg: "bg-pink-50", text: "text-pink-700", border: "border-pink-200", icon: <Brain className="w-4 h-4" /> },
        "pasca-operasi": { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", icon: <Bandage className="w-4 h-4" /> }
    };

    const categoryStyle = categoryColors[article.category] || { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", icon: <Heart className="w-4 h-4" /> };

    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
            <Navbar />

            {/* Back Button */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
                <Link href="/edukasi" className="inline-flex items-center gap-2 text-slate-500 hover:text-[#233E2E] transition-colors group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span>Kembali ke Edukasi</span>
                </Link>
            </div>

            {/* Article Header */}
            <div className="relative h-[400px] sm:h-[450px] lg:h-[500px] overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${article.image})` }}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center gap-2 mb-4 flex-wrap">
                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${categoryStyle.bg} ${categoryStyle.text}`}>
                                {categoryStyle.icon}
                                {article.category === "pasca-operasi" ? "Pasca Operasi" :
                                    article.category === "nutrisi" ? "Nutrisi" :
                                        article.category === "penyakit" ? "Penyakit" :
                                            article.category === "obat" ? "Obat" :
                                                article.category === "aktivitas" ? "Aktivitas" :
                                                    article.category === "mental" ? "Mental" : "Kesehatan"}
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
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 drop-shadow-lg">
                            {article.title}
                        </h1>
                        <p className="text-lg text-white/90 mb-6 max-w-2xl">
                            {article.excerpt}
                        </p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-white/80">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                                    {article.author.charAt(0)}
                                </div>
                                <div>
                                    <span className="font-medium">{article.author}</span>
                                    <p className="text-xs text-white/60">{article.authorDesc || "Tenaga Medis Profesional"}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>{article.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>{article.readTime}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Eye className="w-4 h-4" />
                                <span>{article.views} dibaca</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Article Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        <div
                            className="prose prose-slate max-w-none prose-headings:text-slate-800 prose-p:text-slate-600 prose-strong:text-slate-800 prose-li:text-slate-600 prose-a:text-[#233E2E] prose-img:rounded-xl"
                            dangerouslySetInnerHTML={{ __html: article.content || getDefaultContent(article.category, article.title) }}
                        />

                        {/* Tags */}
                        <div className="mt-8 pt-6 border-t border-slate-100">
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
                        <div className="sticky top-24 space-y-6">
                            {/* Action Buttons */}
                            <div className="bg-white rounded-2xl p-4 shadow-lg border border-slate-100">
                                <div className="flex items-center justify-between">
                                    <button
                                        onClick={handleLike}
                                        className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all ${liked ? "bg-red-50 text-red-500" : "hover:bg-slate-50 text-slate-500"
                                            }`}
                                    >
                                        <ThumbsUp className={`w-6 h-6 ${liked ? "fill-red-500" : ""}`} />
                                        <span className="text-xs font-medium">{article.likes + (liked ? 1 : 0)}</span>
                                    </button>

                                    <button
                                        onClick={handleShare}
                                        className="flex flex-col items-center gap-1 p-3 rounded-xl hover:bg-slate-50 text-slate-500 transition-all"
                                    >
                                        <Share2 className="w-6 h-6" />
                                        <span className="text-xs font-medium">Bagikan</span>
                                    </button>

                                    <button
                                        onClick={() => setBookmarked(!bookmarked)}
                                        className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all ${bookmarked ? "bg-amber-50 text-amber-500" : "hover:bg-slate-50 text-slate-500"
                                            }`}
                                    >
                                        <Bookmark className={`w-6 h-6 ${bookmarked ? "fill-amber-500" : ""}`} />
                                        <span className="text-xs font-medium">Simpan</span>
                                    </button>

                                    <button
                                        onClick={() => window.print()}
                                        className="flex flex-col items-center gap-1 p-3 rounded-xl hover:bg-slate-50 text-slate-500 transition-all"
                                    >
                                        <Printer className="w-6 h-6" />
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
                                        <p className="font-semibold text-slate-800">{article.author}</p>
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
                        </div>
                    </div>
                </div>

                {/* Related Articles */}
                {relatedArticles.length > 0 && (
                    <div className="mt-12 pt-8 border-t border-slate-100">
                        <h3 className="text-xl font-bold text-slate-800 mb-6">Artikel Terkait</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {relatedArticles.map((related) => (
                                <Link href={`/edukasi/artikel/${related.id}`} key={related.id}>
                                    <div className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 border border-slate-100">
                                        <div className="relative h-40 overflow-hidden">
                                            <div
                                                className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                                                style={{ backgroundImage: `url(${related.image})` }}
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                            </div>
                                            <div className="absolute bottom-3 left-3 text-white">
                                                <span className={`text-xs px-2 py-1 rounded-full ${categoryColors[related.category]?.bg || "bg-emerald-500"} text-slate-800`}>
                                                    {related.category === "pasca-operasi" ? "Pasca Operasi" : related.category}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <h4 className="font-bold text-slate-800 mb-1 group-hover:text-[#233E2E] transition-colors line-clamp-2">
                                                {related.title}
                                            </h4>
                                            <div className="flex items-center gap-2 text-xs text-slate-400">
                                                <span>{related.readTime}</span>
                                                <span>•</span>
                                                <span>{related.views} dibaca</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <FloatingChat />
        </main>
    );
}