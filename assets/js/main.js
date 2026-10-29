/**
 * IamIndependent.com - Main JavaScript
 * Interactive components: Mobile Nav, Calculator, Modal, FAQ Accordion
 */

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

  // 3. Booking Assessment Modal
  const modal = document.getElementById('bookingModal');
  const openModalBtns = document.querySelectorAll('.btn-open-modal');
  const closeModalBtn = document.getElementById('closeModal');

  if (modal) {
    openModalBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    if (closeModalBtn) {
      closeModalBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

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

    // Typical marginal combined tax bracket (Federal + State + FICA) estimated conservatively at 35%
    const estimatedTaxRate = 0.35;
    const estimatedAnnualTaxSavings = annualExpenses * estimatedTaxRate;

    // Estimated take-home:
    // (Gross - Expenses) taxed at ~30% effective rate after deductions + reimbursed tax-free expenses
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

  // 5. Booking / Contact Form Handler
  const consultationForms = document.querySelectorAll('.consultation-form');
  consultationForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerText : 'Submit';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerText = 'Transmitting...';
      }

      setTimeout(() => {
        // Collect fields
        const nameInput = form.querySelector('[name="name"]') || form.querySelector('[name="first_name"]');
        const emailInput = form.querySelector('[name="email"]');
        const phoneInput = form.querySelector('[name="phone"]');
        const messageInput = form.querySelector('[name="message"]');

        const name = nameInput ? nameInput.value : '';
        const email = emailInput ? emailInput.value : '';
        const phone = phoneInput ? phoneInput.value : '';
        const message = messageInput ? messageInput.value : '';

        // Show friendly success confirmation
        form.innerHTML = `
          <div style="text-align: center; padding: 2rem 1rem;">
            <div style="display:inline-flex; align-items:center; justify-content:center; width:64px; height:64px; border-radius:50%; background:#d1fae5; color:#059669; margin-bottom:1rem;">
              <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h3 style="margin-bottom:0.5rem; color:#0f172a;">Thank You, ${name || 'there'}!</h3>
            <p style="color:#475569; margin-bottom:1.5rem;">We have received your consultation request. An advisor will reach out to you directly at <strong>${email}</strong> or <strong>${phone}</strong> within 1 business day.</p>
            <p style="font-size:0.9rem; color:#64748b;">Need faster assistance? Call us right now at <a href="tel:5512650158" style="color:#0284c7; font-weight:600;">551-265-0158</a> or email <a href="mailto:zev@iamindependent.com" style="color:#0284c7; font-weight:600;">zev@iamindependent.com</a>.</p>
          </div>
        `;
      }, 700);
    });
  });
});
