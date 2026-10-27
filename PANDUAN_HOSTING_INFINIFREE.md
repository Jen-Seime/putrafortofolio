# 🚀 PANDUAN LENGKAP HOSTING DI INFINITYFREE
### Proyek: Web Portofolio Mahasiswa (Semester 5 - Administrasi Web)

Panduan ini disusun langkah demi langkah untuk mengunggah dan mempublikasikan web portofolio ini ke layanan hosting gratis **InfinityFree** secara online dan dapat diakses publik dengan HTTPS/SSL aktif.

---

## 📂 1. Struktur File Proyek

Pastikan struktur file di komputer Anda seperti berikut:
```text
fortofolio/
├── index.html                  <-- Halaman utama portofolio
├── .htaccess                   <-- Konfigurasi Apache (Gzip & Cache)
├── css/
│   └── style.css               <-- Desain CSS (Dark/Light mode & Responsive)
├── js/
│   └── script.js               <-- Logika JS (Filter, Modal, WhatsApp)
├── assets/
│   └── images/
│       ├── profile.jpg         <-- Foto profil avatar modern
│       ├── project-webadmin.jpg
│       ├── project-ecommerce.jpg
│       └── project-network.jpg
└── PANDUAN_HOSTING_INFINIFREE.md
```

---

## 🌐 2. Langkah Mendaftar & Membuat Akun di InfinityFree

1. Buka browser dan kunjungi situs resmi [InfinityFree](https://www.infinityfree.com/).
2. Klik tombol **"Register"** atau **"Sign Up Now"** (Gunakan email aktif).
3. Verifikasi email Anda melalui tautan yang dikirimkan.
4. Masuk ke halaman **Client Area / Dashboard InfinityFree**.
5. Klik tombol **"+ Create Account"**.
6. Pilih jenis domain:
   - **Subdomain Gratis** (Rekomendasi untuk tugas kuliah):
     Pilih ekstensi subdomain seperti `.is-great.net`, `.infinityfreeapp.com`, atau `.rf.gd`.  
     *Contoh:* `jenseime.is-great.net` atau `portofolio-jen.infinityfreeapp.com`.
   - **Custom Domain**: Jika Anda sudah memiliki domain sendiri (misal: `.my.id` atau `.com`).
7. Klik **"Check Availability"** (Pastikan nama tersedia).
8. Buat password akun hosting atau biarkan terisi otomatis, lalu klik **"Create Account"**.

---

## 📤 3. Cara Mengunggah File ke InfinityFree

Ada dua cara untuk mengunggah file portofolio: **Cara A (File Manager)** atau **Cara B (FileZilla FTP)**.

### Cara A: Menggunakan File Manager Online (Paling Mudah & Cepat)
1. Di Dashboard InfinityFree pada akun yang baru dibuat, klik **"Manage"** -> pilih **"File Manager"** (Monsta FTP).
2. Anda akan diarahkan ke direktori server.
3. Buka folder **`htdocs`** (⚠️ **PENTING**: Semua file website wajib berada di dalam folder `htdocs`, bukan di luar!).
4. Jika ada file bawaan seperti `index2.html` atau `default.php`, Anda boleh menghapusnya.
5. Klik ikon **Upload**:
   - Unggah file `index.html` dan `.htaccess`.
   - Buat folder `css`, lalu upload `style.css` ke dalamnya.
   - Buat folder `js`, lalu upload `script.js` ke dalamnya.
   - Buat folder `assets`, lalu di dalamnya buat folder `images`, dan upload semua file gambar (`profile.jpg`, `project-webadmin.jpg`, `project-ecommerce.jpg`, `project-network.jpg`).
   *(Tips: Anda juga bisa mengompres folder proyek menjadi `.zip`, lalu gunakan fitur Extract di File Manager jika didukung).*

---

### Cara B: Menggunakan FileZilla (FTP Client)
Jika Anda terbiasa dengan aplikasi FTP untuk tugas Administrasi Web:
1. Catat informasi FTP dari Client Area InfinityFree:
   - **FTP Hostname**: `ftpupload.net`
   - **FTP Username**: (Contoh: `if0_12345678`)
   - **FTP Password**: (Password akun hosting Anda)
   - **Port**: `21`
2. Buka aplikasi **FileZilla** di komputer Anda.
3. Masukkan Host, Username, Password, Port, lalu klik **Quickconnect**.
4. Di sisi kanan (*Remote site*), masuk ke direktori `/htdocs`.
5. Di sisi kiri (*Local site*), pilih seluruh isi folder `fortofolio` (`index.html`, `.htaccess`, folder `css`, `js`, `assets`).
6. Klik kanan -> pilih **Upload**. Tunggu proses transfer selesai 100%.

---

## 🔒 4. Mengaktifkan Free SSL (HTTPS) di InfinityFree

Agar portofolio memiliki ikon gembok aman (HTTPS) di browser:
1. Kembali ke Dashboard InfinityFree, klik menu **"Free SSL Certificates"**.
2. Klik **"New SSL Certificate"**.
3. Masukkan nama domain/subdomain Anda (misal: `jenseime.is-great.net`).
4. Pilih penyedia SSL: **Let's Encrypt** atau **ZeroSSL** (Rekomendasi: *Let's Encrypt* atau *Google Trust Services*).
5. Ikuti petunjuk untuk **Set up DNS Record automatically** (InfinityFree akan otomatis menambahkan CNAME verification).
6. Tunggu status verification menjadi valid (sekitar 5-15 menit).
7. Klik **"Install SSL Certificate Automatically"**. Selesai!

---

## ✏️ 5. Cara Kustomisasi Data Pribadi Portofolio

Buka file `index.html` dengan teks editor untuk mengubah:
- **Nama & Gelar**: Cari teks `Jen Seime` dan ganti dengan nama lengkap Anda.
- **Nomor WhatsApp**: Buka `js/script.js` pada baris ke-262, ganti nomor `6281234567890` dengan nomor WhatsApp aktif Anda (gunakan format kode negara 62).
- **Alamat Email**: Cari teks `jenseime@example.com` di `index.html` dan sesuaikan.
- **Foto Profil**: Anda dapat mengganti file `assets/images/profile.jpg` dengan foto asli Anda (pastikan nama file tetap sama atau sesuaikan di tag `<img>`).

---

## 🌟 6. Fitur Unggulan Portofolio Ini

1. **Dark & Light Mode Toggle**: Pengunjung dapat mengganti tema sesuai kenyamanan mata, status tersimpan otomatis di browser (`localStorage`).
2. **Animasi Ketik Dinamis (Typewriter)**: Teks peran di banner utama berganti otomatis secara halus.
3. **Filter Kategori Proyek**: Pengunjung dapat memfilter proyek berdasarkan Administrasi Server, Web App, dan Jaringan secara instan tanpa reload.
4. **Modal Detail Interaktif**: Klik tombol "Detail Proyek" untuk melihat spesifikasi lengkap dan tech stack.
5. **Formulir Kontak Terhubung WhatsApp**: Pengunjung dapat mengirim pesan langsung ke WhatsApp atau menyalin email dengan 1 klik.
6. **Performa Ringan & Cepat**: Tanpa framework berat, 100% kompatibel dengan server gratis InfinityFree.
