/**
 * PORTFOLIO MODERN & INTERACTIVE JAVASCRIPT
 * Optimized for InfinityFree Hosting (Vanilla ES6, No Dependencies)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. THEME SWITCHER (Dark / Light Mode) with LocalStorage
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;
  const currentTheme = localStorage.getItem('theme') || 'dark';

  if (currentTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    if (themeIcon) {
      themeIcon.className = 'fa-solid fa-moon';
    }
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    if (themeIcon) {
      themeIcon.className = 'fa-solid fa-sun';
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      const targetTheme = isLight ? 'dark' : 'light';
      
      document.documentElement.setAttribute('data-theme', targetTheme);
      localStorage.setItem('theme', targetTheme);

      if (themeIcon) {
        themeIcon.className = targetTheme === 'light' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
      }

      showToast(`Mode ${targetTheme === 'light' ? 'Terang' : 'Gelap'} diaktifkan`);
    });
  }

  // 2. MOBILE MENU TOGGLE
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.className = navMenu.classList.contains('open') ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
      }
    });

    // Close menu when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      });
    });
  }

  // 3. NAVBAR SCROLL EFFECT & BACK TO TOP
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Navbar background blur on scroll
    if (navbar) {
      if (scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Back to top button visibility
    if (backToTop) {
      if (scrollY > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }
  });

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 4. ACTIVE SECTION HIGHLIGHT ON SCROLL
  const sections = document.querySelectorAll('section[id]');
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.35
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(sec => sectionObserver.observe(sec));

  // 5. TYPED TEXT EFFECT
  const typedElement = document.getElementById('typedText');
  if (typedElement) {
    const words = [
      'Web Developer',
      'Administrasi Web & Jaringan',
      'Mahasiswa Teknik Informatika',
      'PHP & MySQL Specialist',
      'Cloud & Hosting Enthusiast'
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function typeLoop() {
      const currentWord = words[wordIndex];
      if (isDeleting) {
        typedElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 45;
      } else {
        typedElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 95;
      }

      if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typeSpeed = 1600; // Pause at end of word
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 400; // Pause before typing new word
      }

      setTimeout(typeLoop, typeSpeed);
    }

    typeLoop();
  }

  // 6. STATS COUNTER ANIMATION
  const statNumbers = document.querySelectorAll('.stat-number');
  let statsAnimated = false;

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsAnimated) {
        statsAnimated = true;
        statNumbers.forEach(num => {
          const target = parseFloat(num.getAttribute('data-target') || '0');
          const isDecimal = target % 1 !== 0;
          let count = 0;
          const duration = 1500;
          const increment = target / (duration / 25);

          const timer = setInterval(() => {
            count += increment;
            if (count >= target) {
              num.textContent = isDecimal ? target.toFixed(1) : Math.floor(target);
              clearInterval(timer);
            } else {
              num.textContent = isDecimal ? count.toFixed(1) : Math.floor(count);
            }
          }, 25);
        });
      }
    });
  }, { threshold: 0.5 });

  const statsSection = document.getElementById('stats');
  if (statsSection) statsObserver.observe(statsSection);

  // 7. ANIMATED SKILL BARS
  const skillFills = document.querySelectorAll('.skill-fill');
  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        skillFills.forEach(bar => {
          const percent = bar.getAttribute('data-width') || '0%';
          bar.style.width = percent;
        });
      }
    });
  }, { threshold: 0.3 });

  const skillsSection = document.getElementById('skills');
  if (skillsSection) skillsObserver.observe(skillsSection);

  // 8. PROJECT FILTERING
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  // 9. PROJECT DETAILS MODAL
  const modal = document.getElementById('projectModal');
  const modalClose = document.getElementById('modalClose');
  const detailButtons = document.querySelectorAll('.btn-detail');

  const projectData = {
    'webadmin': {
      title: 'ServerCore - Web Hosting & Server Monitor',
      category: 'Web Administration',
      desc: 'Platform dasbor administrasi web server komprehensif yang dirancang untuk memantau performa server (CPU, RAM, Disk Space, dan Bandwidth) secara real-time. Dilengkapi manajemen domain, status sertifikat SSL, notifikasi alert sistem, dan integrasi Apache web server.',
      features: [
        'Real-time traffic & resource analytics monitoring',
        'Manajemen domain, DNS records, dan status SSL certificate',
        'Auto alert notifikasi saat server mengalami lonjakan traffic',
        'Responsive dark mode glassmorphism interface'
      ],
      tech: ['HTML5', 'CSS3 Modern', 'JavaScript ES6', 'Apache Web Server', 'PHP', 'Chart.js'],
      img: 'assets/images/project-webadmin.jpg',
      demo: '#',
      github: 'https://github.com'
    },
    'ecommerce': {
      title: 'Luxora - Modern E-Commerce Store',
      category: 'Web Application',
      desc: 'Toko online interaktif yang responsif dengan katalog produk dinamis, keranjang belanja real-time, filter kategori instan, serta integrasi checkout yang ramah pengguna. Desain minimalis yang dioptimalkan untuk kecepatan muat tinggi.',
      features: [
        'Katalog produk interaktif dengan filter instan',
        'Slide-in shopping cart drawer dengan kalkulasi otomatis',
        'Dukungan multi-mata uang dan payment badge preview',
        'Mobile-first responsive layout'
      ],
      tech: ['HTML5', 'CSS Grid/Flexbox', 'Vanilla JavaScript', 'Local Storage API'],
      img: 'assets/images/project-ecommerce.jpg',
      demo: '#',
      github: 'https://github.com'
    },
    'network': {
      title: 'NetOps NOC - Network Traffic & Ping Analytics',
      category: 'Network & Monitoring',
      desc: 'Sistem Network Operations Center (NOC) yang menyajikan visualisasi topologi jaringan interaktif, latency analytics, server ping real-time dari berbagai regional server (Jakarta, Singapore, Tokyo), serta log error severity.',
      features: [
        'Visualisasi topologi jaringan node & router interaktif',
        'Grafik latency dan ping server global secara berkala',
        'Uptime monitoring tracker dengan tingkat akurasi 99.98%',
        'Tampilan cyber glow dark dashboard'
      ],
      tech: ['HTML5', 'Modern CSS', 'JavaScript ES6', 'SVG Graphics', 'REST API Mock'],
      img: 'assets/images/project-network.jpg',
      demo: '#',
      github: 'https://github.com'
    }
  };

  detailButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projKey = btn.getAttribute('data-project');
      const data = projectData[projKey];
      if (!data || !modal) return;

      document.getElementById('modalImage').src = data.img;
      document.getElementById('modalTitle').textContent = data.title;
      document.getElementById('modalCategory').textContent = data.category;
      document.getElementById('modalDesc').textContent = data.desc;

      // Render features list
      const featList = document.getElementById('modalFeatures');
      featList.innerHTML = '';
      data.features.forEach(feat => {
        const li = document.createElement('li');
        li.innerHTML = `<i class="fa-solid fa-circle-check" style="color: var(--accent-secondary); margin-right: 8px;"></i>${feat}`;
        featList.appendChild(li);
      });

      // Render tech stack tags
      const techList = document.getElementById('modalTech');
      techList.innerHTML = '';
      data.tech.forEach(t => {
        const span = document.createElement('span');
        span.className = 'tech-tag';
        span.textContent = t;
        techList.appendChild(span);
      });

      // Links
      const modalDemo = document.getElementById('modalDemo');
      const modalGithub = document.getElementById('modalGithub');
      if (modalDemo) modalDemo.href = data.demo;
      if (modalGithub) modalGithub.href = data.github;

      // Open Modal
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = 'auto';
  }

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
      closeModal();
    }
  });

  // 10. CONTACT FORM & WHATSAPP INTEGRATION
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('formName').value.trim();
      const email = document.getElementById('formEmail').value.trim();
      const subject = document.getElementById('formSubject').value.trim();
      const message = document.getElementById('formMessage').value.trim();

      if (!name || !email || !message) {
        showToast('Harap isi semua kolom wajib!', true);
        return;
      }

      // Pre-filled WhatsApp message redirect option or email mailto
      const sendWhatsApp = confirm(`Halo ${name}! Pesan Anda siap dikirimkan. Ingin meneruskan pesan ini langsung via WhatsApp agar respon lebih cepat?`);
      
      if (sendWhatsApp) {
        // Ganti nomor WhatsApp di bawah ini sesuai kebutuhan Anda
        const phoneNumber = '6281234567890'; 
        const waText = encodeURIComponent(
          `Halo, nama saya *${name}* (${email}).\n*Subjek:* ${subject || 'Pertanyaan Portofolio'}\n\n*Pesan:*\n${message}`
        );
        window.open(`https://api.whatsapp.com/send?phone=${phoneNumber}&text=${waText}`, '_blank');
      }

      showToast('Pesan Anda berhasil dikirim! Terima kasih.');
      contactForm.reset();
    });
  }

  // Copy to clipboard helper (e.g. for email)
  const copyBtns = document.querySelectorAll('.btn-copy');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`"${textToCopy}" berhasil disalin!`);
        }).catch(() => {
          showToast('Gagal menyalin teks.', true);
        });
      }
    });
  });

  // 11. TOAST NOTIFICATION UTILITY
  function showToast(message, isError = false) {
    let toast = document.getElementById('toastNotification');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toastNotification';
      toast.className = 'toast-notification';
      document.body.appendChild(toast);
    }

    toast.innerHTML = `<i class="fa-solid ${isError ? 'fa-circle-exclamation' : 'fa-circle-check'}" style="color: ${isError ? '#ef4444' : '#10b981'};"></i> ${message}`;
    toast.classList.add('show');

    clearTimeout(toast.timeoutId);
    toast.timeoutId = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }
});
