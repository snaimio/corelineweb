/**
 * Coreline Web - Modern Frontend Application Script
 * Powered by Sheikh Naim | https://github.com/snaimio
 */

document.addEventListener('DOMContentLoaded', () => {
  initRouter();
  initMobileNav();
  initConsultationBooking();
  initReviewSystem();
  initFaqAccordion();
  initContactForm();
  initDateConstraints();
  initPrivacyModal();
});

/* Router & Navigation */
function initRouter() {
  const navLinks = document.querySelectorAll('[data-route]');
  const pageSections = document.querySelectorAll('.page-section');

  function navigate(route) {
    const targetRoute = route ? route.replace('#', '') : 'home';
    let targetSection = document.getElementById(`page-${targetRoute}`);
    
    if (!targetSection) {
      targetSection = document.getElementById('page-home');
    }

    pageSections.forEach(section => section.classList.remove('active'));
    targetSection.classList.add('active');

    // Update nav active classes
    navLinks.forEach(link => {
      const linkRoute = link.getAttribute('data-route');
      if (linkRoute === targetRoute) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });

    // Close mobile menu if open
    document.querySelector('.nav-wrapper')?.classList.remove('mobile-open');

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update document title
    const titles = {
      home: 'Coreline Web – Web Development & Solutions | Designed by Humans, Powered by AI',
      services: 'Services – Lead Gen, SEO & Custom Development | Coreline Web',
      consult: 'Book a Consultation – Strategy & Architecture | Coreline Web',
      about: 'About Sheikh Naim – Web Developer & Solutions Architect | Coreline Web',
      faq: 'Frequently Asked Questions – Coreline Web Solutions',
      contact: 'Contact Coreline Web – Transform Your Digital Presence'
    };
    if (titles[targetRoute]) {
      document.title = titles[targetRoute];
    }
  }

  // Handle hash changes
  window.addEventListener('hashchange', () => {
    navigate(window.location.hash);
  });

  // Handle click events on data-route
  document.addEventListener('click', (e) => {
    const routeTarget = e.target.closest('[data-route]');
    if (routeTarget) {
      const route = routeTarget.getAttribute('data-route');
      window.location.hash = `#${route}`;
      e.preventDefault();
    }
  });

  // Initial load
  navigate(window.location.hash || '#home');
}

/* Mobile Navigation */
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navWrapper = document.querySelector('.nav-wrapper');

  if (toggleBtn && navWrapper) {
    toggleBtn.addEventListener('click', () => {
      const isExpanded = navWrapper.classList.toggle('mobile-open');
      toggleBtn.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
    });
  }
}

/* Date Constraints for Consultation */
function initDateConstraints() {
  const dateInput = document.getElementById('consult-date');
  if (dateInput) {
    const today = new Date();
    today.setDate(today.getDate() + 1); // Earliest booking is tomorrow
    const minDate = today.toISOString().split('T')[0];
    dateInput.min = minDate;
  }
}

/* Consultation Booking System */
function initConsultationBooking() {
  const form = document.getElementById('consultation-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('consult-name').value.trim();
    const email = document.getElementById('consult-email').value.trim();
    const phone = document.getElementById('consult-phone').value.trim();
    const date = document.getElementById('consult-date').value;
    const timeSlot = form.querySelector('input[name="time-slot"]:checked')?.value || 'Morning (9:00 AM - 12:00 PM)';
    const notes = document.getElementById('consult-notes').value.trim();

    if (!name || !email || !phone || !date) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }

    // Show Confirmation Modal
    showBookingConfirmation({
      name,
      email,
      phone,
      date,
      timeSlot,
      notes
    });

    form.reset();
  });
}

function showBookingConfirmation(details) {
  const modal = document.getElementById('booking-modal');
  const summaryBox = document.getElementById('booking-summary-content');

  if (modal && summaryBox) {
    summaryBox.innerHTML = `
      <div style="background: var(--bg-subtle); padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--border-color); margin-bottom: 1.5rem; text-align: left;">
        <p style="margin-bottom: 0.5rem;"><strong style="color: var(--text-primary);">Name:</strong> ${escapeHtml(details.name)}</p>
        <p style="margin-bottom: 0.5rem;"><strong style="color: var(--text-primary);">Email:</strong> ${escapeHtml(details.email)}</p>
        <p style="margin-bottom: 0.5rem;"><strong style="color: var(--text-primary);">Phone:</strong> ${escapeHtml(details.phone)}</p>
        <p style="margin-bottom: 0.5rem;"><strong style="color: var(--text-primary);">Date:</strong> ${details.date}</p>
        <p style="margin-bottom: 0.5rem;"><strong style="color: var(--text-primary);">Time Slot:</strong> ${details.timeSlot}</p>
        ${details.notes ? `<p><strong style="color: var(--text-primary);">Notes:</strong> ${escapeHtml(details.notes)}</p>` : ''}
      </div>
    `;

    modal.classList.add('active');

    // Attach ICS Download Handler
    const icsBtn = document.getElementById('download-ics-btn');
    if (icsBtn) {
      icsBtn.onclick = () => downloadIcsFile(details);
    }
  }
}

function downloadIcsFile(details) {
  const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Coreline Web//Consultation Booking//EN
BEGIN:VEVENT
SUMMARY:Coreline Web Technical Strategy Consultation
DESCRIPTION:Consultation with Sheikh Naim (Coreline Web) for ${details.name}.
DTSTART:${details.date.replace(/-/g, '')}T140000Z
DTEND:${details.date.replace(/-/g, '')}T150000Z
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', `coreline-consultation-${details.date}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast('Calendar invite downloaded!', 'success');
}

/* Review Requester Live Showcase System */
const initialReviews = [
  {
    author: 'Jurgen Antonio',
    role: 'Managing Director, Green Host Solutions',
    rating: 5,
    date: 'February 2026',
    verified: true,
    text: '“Working with Coreline Web changed how we view our digital presence. Our new technical infrastructure has given us the credibility we needed to compete in a crowded local market. We finally have a website that works as hard as we do.”'
  },
  {
    author: 'Aya Nakamura',
    role: 'E-Commerce Founder',
    rating: 5,
    date: 'January 2026',
    verified: true,
    text: '“I couldn’t be happier with the outcome of our project. The work quality is outstanding, and the strategic attention to detail was impressive. I’ll definitely partner with Coreline Web again for future needs!”'
  },
  {
    author: 'Mateo García',
    role: 'Commercial Contractor',
    rating: 5,
    date: 'December 2025',
    verified: true,
    text: '“From start to finish, the process was seamless. It’s better than I imagined, and the customer support was incredibly responsive and friendly.”'
  },
  {
    author: 'Lila Patel',
    role: 'Local Retailer',
    rating: 5,
    date: 'November 2025',
    verified: true,
    text: '“Amazing quality! It’s rare to find something that checks all the boxes, but this did. I’ll be recommending Sheikh to everyone I know!”'
  }
];

function initReviewSystem() {
  const reviewStream = document.getElementById('live-review-stream');
  const addReviewBtn = document.getElementById('open-review-modal-btn');
  const reviewModal = document.getElementById('review-modal');
  const reviewForm = document.getElementById('submit-review-form');

  if (!reviewStream) return;

  renderReviews(initialReviews);

  if (addReviewBtn && reviewModal) {
    addReviewBtn.addEventListener('click', () => {
      reviewModal.classList.add('active');
    });
  }

  if (reviewForm) {
    reviewForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const author = document.getElementById('review-author').value.trim();
      const role = document.getElementById('review-role').value.trim() || 'Verified Client';
      const rating = parseInt(document.getElementById('review-rating').value, 10) || 5;
      const text = document.getElementById('review-comment').value.trim();

      if (!author || !text) {
        showToast('Please enter your name and review message.', 'error');
        return;
      }

      const newReview = {
        author,
        role,
        rating,
        date: 'Just now',
        verified: true,
        text: `“${text}”`
      };

      initialReviews.unshift(newReview);
      renderReviews(initialReviews);
      reviewModal.classList.remove('active');
      reviewForm.reset();
      showToast('Thank you! Your verified review has been published.', 'success');
    });
  }
}

function renderReviews(reviews) {
  const reviewStream = document.getElementById('live-review-stream');
  if (!reviewStream) return;

  reviewStream.innerHTML = reviews.map(rev => `
    <div class="review-preview-box" style="margin-bottom: 1rem; animation: fadeIn 0.3s ease;">
      <div class="review-preview-header">
        <div class="star-group" aria-label="${rev.rating} out of 5 stars">
          ${'★'.repeat(rev.rating)}${'☆'.repeat(5 - rev.rating)}
        </div>
        ${rev.verified ? `<span class="verified-pill"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg> Verified</span>` : ''}
      </div>
      <p class="review-text">${escapeHtml(rev.text)}</p>
      <div class="reviewer-meta">
        <strong style="color: var(--text-primary);">${escapeHtml(rev.author)}</strong> • <span>${escapeHtml(rev.role)}</span> • <span>${rev.date}</span>
      </div>
    </div>
  `).join('');
}

/* FAQ Accordion System */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  const searchInput = document.getElementById('faq-search');

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close other items
        faqItems.forEach(i => {
          i.classList.remove('active');
          i.querySelector('.faq-question-btn')?.setAttribute('aria-expanded', 'false');
        });

        if (!isActive) {
          item.classList.add('active');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      faqItems.forEach(item => {
        const qText = item.querySelector('.faq-question-btn')?.innerText.toLowerCase() || '';
        const aText = item.querySelector('.faq-answer')?.innerText.toLowerCase() || '';
        if (qText.includes(query) || aText.includes(query)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }
}

/* Contact Form */
function initContactForm() {
  const form = document.getElementById('contact-page-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    if (!name || !email || !message) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }

    // Simulate instant sending
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending...';
    }

    setTimeout(() => {
      form.reset();
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Send Message';
      }
      showToast('Message sent! Sheikh Naim will get back to you shortly.', 'success');
    }, 600);
  });
}

/* Modal Close Handlers */
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-close-btn') || e.target.classList.contains('modal-overlay')) {
    document.querySelectorAll('.modal-overlay').forEach(modal => modal.classList.remove('active'));
  }
});

/* Toast Notifications */
function showToast(message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.style.borderColor = type === 'error' ? '#f87171' : 'var(--accent-emerald)';
  toast.innerHTML = `
    <span style="color: ${type === 'error' ? '#f87171' : 'var(--accent-emerald)'}">
      ${type === 'error' ? '⚠️' : '✓'}
    </span>
    <span>${escapeHtml(message)}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

/* Privacy Modal Handler */
function initPrivacyModal() {
  const privacyBtn = document.getElementById('open-privacy-btn');
  const privacyModal = document.getElementById('privacy-modal');
  if (privacyBtn && privacyModal) {
    privacyBtn.addEventListener('click', (e) => {
      e.preventDefault();
      privacyModal.classList.add('active');
    });
  }
}

/* Helper Utilities */
function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}
