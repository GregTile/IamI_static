/**
 * IamIndependent.com - Main JavaScript
 * Interactive components: Mobile Nav, Calculator, Calendly Integration, FAQ Accordion
 */

// ==========================================================================
// CONFIGURATION
// To connect your actual Calendly calendar, simply replace this URL:
// ==========================================================================
const CALENDLY_URL = 'https://calendly.com/gregory-gogregory/30min';


document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

  // 2. FAQ Accordion
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

  // Sync all Calendly links with configured CALENDLY_URL
  const calendlyLinks = document.querySelectorAll('.js-calendly-link');
  calendlyLinks.forEach(link => {
    if (CALENDLY_URL) {
      link.setAttribute('href', CALENDLY_URL);
    }
    link.addEventListener('click', () => {
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

  // 4. Interactive Calculator (Take-Home & Expense Savings Estimator)
  const hourlySlider = document.getElementById('hourlyRate');
  const hourlyDisplay = document.getElementById('hourlyRateVal');
  const expenseSlider = document.getElementById('monthlyExpenses');
  const expenseDisplay = document.getElementById('monthlyExpensesVal');

  const annualGrossEl = document.getElementById('calcGross');
  const annualTaxSavingsEl = document.getElementById('calcTaxSavings');
  const estimatedTakeHomeEl = document.getElementById('calcTakeHome');

  function updateCalculator() {
    if (!hourlySlider || !expenseSlider) return;

    const rate = parseFloat(hourlySlider.value);
    const monthlyExp = parseFloat(expenseSlider.value);

    if (hourlyDisplay) hourlyDisplay.textContent = `$${rate}/hr`;
    if (expenseDisplay) expenseDisplay.textContent = `$${monthlyExp.toLocaleString()}/mo`;

    // 2,000 working hours/year (40 hrs/wk * 50 wks)
    const annualHours = 2000;
    const grossBilling = rate * annualHours;
    const annualExpenses = monthlyExp * 12;

    // Combined marginal tax rate (Federal + State + FICA) estimated conservatively at 35%
    const estimatedTaxRate = 0.35;
    const estimatedAnnualTaxSavings = annualExpenses * estimatedTaxRate;

    // Estimated take-home
    const taxableIncome = Math.max(0, grossBilling - annualExpenses);
    const estimatedNetTax = taxableIncome * 0.28;
    const estimatedTakeHome = (taxableIncome - estimatedNetTax) + annualExpenses;

    if (annualGrossEl) {
      annualGrossEl.textContent = `$${Math.round(grossBilling).toLocaleString()}`;
    }
    if (annualTaxSavingsEl) {
      annualTaxSavingsEl.textContent = `$${Math.round(estimatedAnnualTaxSavings).toLocaleString()} / yr`;
    }
    if (estimatedTakeHomeEl) {
      estimatedTakeHomeEl.textContent = `$${Math.round(estimatedTakeHome).toLocaleString()}`;
    }
  }

  if (hourlySlider && expenseSlider) {
    hourlySlider.addEventListener('input', updateCalculator);
    expenseSlider.addEventListener('input', updateCalculator);
    updateCalculator();
  }
});
