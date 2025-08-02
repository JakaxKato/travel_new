// Mobile Menu Toggle
      function toggleMenu() {
        const menu = document.getElementById('menu');
        menu.classList.toggle('active');
      }

      // FAQ Toggle
      function toggleFaq(element) {
        const faqItem = element.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
          item.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
          faqItem.classList.add('active');
        }
      }

      // Smooth scrolling for navigation links
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
            
            // Close mobile menu if open
            document.getElementById('menu').classList.remove('active');
            
            // Update active nav link
            document.querySelectorAll('.menu a').forEach(link => {
              link.classList.remove('active');
            });
            this.classList.add('active');
          }
        });
      });

      // Update active nav link on scroll
      window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
          const sectionTop = section.offsetTop - 100;
          if (scrollY >= sectionTop) {
            current = section.getAttribute('id');
          }
        });

        document.querySelectorAll('.menu a').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
          }
        });
      });

      // Add loading animation to elements
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      }, observerOptions);

      // Observe elements for animation
      document.querySelectorAll('.fade-in, .card, .service-item, .package-card, .testimonial-card, .stat-item').forEach(el => {
        observer.observe(el);
      });

      // Counter animation for stats
      function animateCounter(element, target) {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          
          if (target >= 1000) {
            element.textContent = Math.floor(current / 1000) + 'K+';
          } else {
            element.textContent = Math.floor(current) + (target === 100 ? '%' : '+');
          }
        }, 20);
      }

      // Animate counters when stats section is visible
      const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const numbers = entry.target.querySelectorAll('.stat-number');
            numbers.forEach((num, index) => {
              const targets = [40, 10000, 100, 24];
              animateCounter(num, targets[index]);
            });
            statsObserver.unobserve(entry.target);
          }
        });
      });

      const statsSection = document.querySelector('.stats-section');
      if (statsSection) {
        statsObserver.observe(statsSection);
      }

      // Add hover effect to gallery items
      document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
          item.style.transform = 'scale(1.05)';
        });
        
        item.addEventListener('mouseleave', () => {
          item.style.transform = 'scale(1)';
        });
      });
      document.addEventListener("DOMContentLoaded", function () {
  loadTestimoni();

      document.getElementById("formTestimoni").addEventListener("submit", function (e) {
        e.preventDefault();
        const formData = new FormData(this);

        fetch("/tambah_testimoni", {
          method: "POST",
          body: formData
        })
        .then(res => res.text())
        .then(response => {
          if (response === "success") {
            Swal.fire({
              icon: 'success',
              title: 'Terima kasih!',
              text: 'Testimoni berhasil dikirim.',
              confirmButtonColor: '#2a5298'
            });
            this.reset();
            loadTestimoni();
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Gagal mengirim testimoni.',
              confirmButtonColor: '#d33'
            });
          }
        });
      });

      function loadTestimoni() {
        fetch("/ambil_testimoni")
          .then(res => res.json())
          .then(data => {
            const container = document.getElementById("daftarTestimoni");
            container.innerHTML = '';
            data.forEach(([nama, pesan]) => {
              const card = document.createElement("div");
              card.className = "testimonial-card";
              card.innerHTML = `
                <div class="stars">⭐⭐⭐⭐⭐</div>
                <p class="quote">"${pesan}"</p>
                <p class="author">- ${nama}</p>
              `;
              container.appendChild(card);
            });
          });
      }
    });