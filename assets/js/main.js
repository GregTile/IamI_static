/**
 * IamIndependent.com - Main JavaScript
 * Interactive components: Mobile Nav, Calculator, Calendly Integration, FAQ Accordion, GA4 Event Tracking
 */

// ==========================================================================
// CONFIGURATION
// To connect your actual Calendly calendar, simply replace this URL:
// ==========================================================================
const CALENDLY_URL = 'https://calendly.com/zev-iamindependent/30min';

/**
 * Safely send custom events to Google Analytics 4 (gtag.js)
 */
function trackEvent(eventName, params = {}) {
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, {
      transport_type: 'beacon',
      ...params
    });
  }
}

/**
 * Identify which section of the page a clicked button/link belongs to
 */
function getCtaLocation(el) {
  if (!el || typeof el.closest !== 'function') return 'unknown';
  if (el.closest('#bookingModal')) return 'booking_modal';
  if (el.closest('.top-notice')) return 'top_bar';
  if (el.closest('.header')) return 'header';
  if (el.closest('.hero')) return 'hero';
  if (el.closest('.cta-banner')) return 'cta_banner';
  if (el.closest('.footer')) return 'footer';
  return 'page_body';
}


document.addEventListener('DOMContentLoaded', () => {
  const pagePath = window.location.pathname || '/';

  // 1. Mobile Menu Toggle
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }

  // 2. FAQ Accordion (+ GA4 tracking when a question is expanded)
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Close others
        faqItems.forEach(other => other.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
          const labelEl = questionBtn.querySelector('span');
          const questionText = (labelEl ? labelEl.textContent : questionBtn.textContent || '').trim();
          trackEvent('faq_expand', {
            question_text: questionText.slice(0, 100),
            page_path: pagePath
          });
        }
      });
    }
  });

  // 3. High-Conversion Booking Modal Handler (No Iframe Glitches)
  let modal = document.getElementById('bookingModal');

  // Ensure the booking modal exists on every page across the site
  if (!modal) {
    const modalWrapper = document.createElement('div');
    modalWrapper.innerHTML = `
      <div class="modal-overlay" id="bookingModal" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
        <div class="modal-content">
          <button class="modal-close" id="closeModal" aria-label="Close modal">&times;</button>
          <div style="text-align: center; margin-bottom: 1.25rem;">
            <span class="badge" style="margin-bottom: 0.5rem;">100% Free &amp; Confidential</span>
            <h3 id="modalTitle" style="margin-top: 0.25rem;">Book Your 15-Minute Assessment</h3>
            <p style="font-size:0.95rem; color:#64748b; margin-top: 0.35rem;">
              Review your contract rate, calculate pre-tax expense savings, and get answers from our CPA/CFA advisory team.
            </p>
          </div>

          <div class="modal-calendar-box">
            <a href="${CALENDLY_URL}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-calendly js-calendly-link">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              Pick a Time on Calendly
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
            </a>
            <div class="modal-calendar-meta">
              <span>&#10003; Opens in a new tab</span>
              <span>&#10003; Instant calendar invite</span>
              <span>&#10003; No obligation</span>
            </div>
          </div>

          <div class="modal-divider">
            <span>Or Reach Us Directly</span>
          </div>

          <div class="modal-direct-grid">
            <a href="tel:2015672434" class="modal-direct-card">
              <div class="modal-direct-icon" style="background:var(--accent-light); color:var(--accent-dark);">
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
              </div>
              <strong>Call an Advisor</strong>
              <span class="direct-link-text">201-567-2434</span>
              <small>Mon &ndash; Fri, 9am &ndash; 6pm EST</small>
            </a>

            <a href="mailto:info@iamindependent.com?subject=Contractor%20Assessment%20Inquiry" class="modal-direct-card">
              <div class="modal-direct-icon" style="background:var(--primary-light); color:var(--primary);">
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              </div>
              <strong>Email Our Team</strong>
              <span class="direct-link-text">info@iamindependent.com</span>
              <small>Replies within 1 business day</small>
            </a>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modalWrapper.firstElementChild);
    modal = document.getElementById('bookingModal');
  }

  // Sync all Calendly links with configured CALENDLY_URL & track outbound Calendly clicks
  const calendlyLinks = document.querySelectorAll('.js-calendly-link');
  calendlyLinks.forEach(link => {
    if (CALENDLY_URL) {
      link.setAttribute('href', CALENDLY_URL);
    }
    link.addEventListener('click', () => {
      trackEvent('calendly_click', {
        cta_location: getCtaLocation(link),
        button_text: (link.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 80),
        destination_url: CALENDLY_URL,
        page_path: pagePath
      });

      if (modal && modal.classList.contains('active')) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  const openModalBtns = document.querySelectorAll('.btn-open-modal');
  const closeModalBtn = document.getElementById('closeModal');

  function closeBookingModal() {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      } else {
        window.open(CALENDLY_URL, '_blank', 'noopener,noreferrer');
      }
    });
  });

  if (modal && closeModalBtn) {
    closeModalBtn.addEventListener('click', closeBookingModal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeBookingModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeBookingModal();
      }
    });
  }

  // 4. Track "Book Assessment" / Consultation CTA clicks across all pages
  const assessmentCtas = document.querySelectorAll(
    '.btn-open-modal, a.btn[href*="book.html"], .top-notice a[href*="book.html"]'
  );
  assessmentCtas.forEach(cta => {
    cta.addEventListener('click', () => {
      trackEvent('book_assessment_click', {
        cta_location: getCtaLocation(cta),
        button_text: (cta.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 80),
        page_path: pagePath
      });
    });
  });

  // 5. Track Direct Phone & Email Link Clicks (including inside modal)
  document.querySelectorAll('a[href^="tel:"]').forEach(phoneLink => {
    phoneLink.addEventListener('click', () => {
      trackEvent('phone_click', {
        cta_location: getCtaLocation(phoneLink),
        page_path: pagePath
      });
    });
  });

  document.querySelectorAll('a[href^="mailto:"]').forEach(emailLink => {
    emailLink.addEventListener('click', () => {
      trackEvent('email_click', {
        cta_location: getCtaLocation(emailLink),
        page_path: pagePath
      });
    });
  });

  // 6. Track Completed Calendly Bookings on thank-you.html
  if (
    document.body.dataset.bookingConfirmed === 'true' ||
    pagePath.endsWith('/thank-you.html') ||
    pagePath.endsWith('/thank-you')
  ) {
    let alreadyTracked = false;
    try {
      alreadyTracked = sessionStorage.getItem('iai_assessment_booked') === '1';
      if (!alreadyTracked) {
        sessionStorage.setItem('iai_assessment_booked', '1');
      }
    } catch (_) {
      // Ignore storage restrictions in private browsing
    }
    if (!alreadyTracked) {
      trackEvent('assessment_booked', {
        page_path: pagePath
      });
    }
  }

  // 7. Interactive Calculator (Take-Home & Expense Savings Estimator + GA4 Engagement)
  const hourlySlider = document.getElementById('hourlyRate');
  const hourlyDisplay = document.getElementById('hourlyRateVal');
  const expenseSlider = document.getElementById('monthlyExpenses');
  const expenseDisplay = document.getElementById('monthlyExpensesVal');

  const annualGrossEl = document.getElementById('calcGross');
  const annualTaxSavingsEl = document.getElementById('calcTaxSavings');
  const estimatedTakeHomeEl = document.getElementById('calcTakeHome');

  function getCalculatorSnapshot() {
    const rate = parseFloat(hourlySlider.value);
    const monthlyExp = parseFloat(expenseSlider.value);
    const annualHours = 2000;
    const grossBilling = rate * annualHours;
    const annualExpenses = monthlyExp * 12;
    const estimatedTaxRate = 0.35;
    const estimatedAnnualTaxSavings = annualExpenses * estimatedTaxRate;
    const taxableIncome = Math.max(0, grossBilling - annualExpenses);
    const estimatedNetTax = taxableIncome * 0.28;
    const estimatedTakeHome = (taxableIncome - estimatedNetTax) + annualExpenses;

    return {
      rate,
      monthlyExp,
      grossBilling: Math.round(grossBilling),
      estimatedAnnualTaxSavings: Math.round(estimatedAnnualTaxSavings),
      estimatedTakeHome: Math.round(estimatedTakeHome)
    };
  }

  function updateCalculator() {
    if (!hourlySlider || !expenseSlider) return;

    const snap = getCalculatorSnapshot();

    if (hourlyDisplay) hourlyDisplay.textContent = `$${snap.rate}/hr`;
    if (expenseDisplay) expenseDisplay.textContent = `$${snap.monthlyExp.toLocaleString()}/mo`;

    if (annualGrossEl) {
      annualGrossEl.textContent = `$${snap.grossBilling.toLocaleString()}`;
    }
    if (annualTaxSavingsEl) {
      annualTaxSavingsEl.textContent = `$${snap.estimatedAnnualTaxSavings.toLocaleString()} / yr`;
    }
    if (estimatedTakeHomeEl) {
      estimatedTakeHomeEl.textContent = `$${snap.estimatedTakeHome.toLocaleString()}`;
    }
  }

  if (hourlySlider && expenseSlider) {
    let hasTrackedCalculatorStart = false;
    let rateDebounceTimer = null;
    let expenseDebounceTimer = null;

    function markCalculatorUsed() {
      if (!hasTrackedCalculatorStart) {
        hasTrackedCalculatorStart = true;
        trackEvent('calculator_used', {
          page_path: pagePath
        });
      }
    }

    hourlySlider.addEventListener('input', () => {
      updateCalculator();
      markCalculatorUsed();
    });

    expenseSlider.addEventListener('input', () => {
      updateCalculator();
      markCalculatorUsed();
    });

    hourlySlider.addEventListener('change', () => {
      markCalculatorUsed();
      clearTimeout(rateDebounceTimer);
      rateDebounceTimer = setTimeout(() => {
        const snap = getCalculatorSnapshot();
        trackEvent('calculator_rate_change', {
          value: snap.rate,
          hourly_rate: snap.rate,
          monthly_expenses: snap.monthlyExp,
          estimated_tax_savings: snap.estimatedAnnualTaxSavings,
          page_path: pagePath
        });
      }, 600);
    });

    expenseSlider.addEventListener('change', () => {
      markCalculatorUsed();
      clearTimeout(expenseDebounceTimer);
      expenseDebounceTimer = setTimeout(() => {
        const snap = getCalculatorSnapshot();
        trackEvent('calculator_expense_change', {
          value: snap.monthlyExp,
          hourly_rate: snap.rate,
          monthly_expenses: snap.monthlyExp,
          estimated_tax_savings: snap.estimatedAnnualTaxSavings,
          page_path: pagePath
        });
      }, 600);
    });

    updateCalculator();
  }
});
