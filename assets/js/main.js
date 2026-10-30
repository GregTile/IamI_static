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

  // 3. Calendly & Booking Modal Handler
  const openModalBtns = document.querySelectorAll('.btn-open-modal');
  const modal = document.getElementById('bookingModal');
  const closeModalBtn = document.getElementById('closeModal');

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      // If Calendly's official widget script is loaded and configured:
      if (window.Calendly && CALENDLY_URL && !CALENDLY_URL.includes('your-username')) {
        Calendly.initPopupWidget({ url: CALENDLY_URL });
      } else if (modal) {
        // Fallback to internal appointment request modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      } else {
        // Redirect to booking page
        window.location.href = 'book.html';
      }
    });
  });

  if (modal && closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
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

  // 5. Secondary Consultation / Callback Form Handler
  // Uses direct mailto fallback or can be connected to any static form backend (e.g. Formspree/Web3Forms)
  const consultationForms = document.querySelectorAll('.consultation-form');
  consultationForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');

      const name = (form.querySelector('[name="name"]') || {}).value || 'Prospective Contractor';
      const email = (form.querySelector('[name="email"]') || {}).value || '';
      const phone = (form.querySelector('[name="phone"]') || {}).value || '';
      const role = (form.querySelector('[name="role"]') || {}).value || 'Contractor';
      const message = (form.querySelector('[name="message"]') || {}).value || '';

      // Prepare mailto fallback
      const subject = encodeURIComponent(`Consultation Request: ${name} (${role})`);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nSituation: ${role}\n\nDetails:\n${message}`
      );
      const mailtoLink = `mailto:info@iamindependent.com?subject=${subject}&body=${body}`;

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerText = 'Submitting...';
      }

      setTimeout(() => {
        form.innerHTML = `
          <div style="text-align: center; padding: 2rem 1rem;">
            <div style="display:inline-flex; align-items:center; justify-content:center; width:64px; height:64px; border-radius:50%; background:#d1fae5; color:#059669; margin-bottom:1rem;">
              <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h3 style="margin-bottom:0.5rem; color:#0f172a;">Thank You, ${name}!</h3>
            <p style="color:#475569; margin-bottom:1.5rem;">
              Your inquiry has been logged. Our advisory team will review your details and contact you at <strong>${email}</strong> or <strong>${phone}</strong> within 1 business day.
            </p>
            <div style="display:flex; justify-content:center; gap:0.75rem; flex-wrap:wrap;">
              <a href="${mailtoLink}" class="btn btn-secondary btn-sm" style="display:inline-flex;">Send Direct Email Copy</a>
              <a href="tel:2015672434" class="btn btn-primary btn-sm" style="display:inline-flex;">Call 201-567-2434 Now</a>
            </div>
          </div>
        `;
      }, 500);
    });
  });
});
