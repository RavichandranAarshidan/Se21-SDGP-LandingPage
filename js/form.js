/**
 * FixMyRide - Waitlist form validation & submission
 * Owner: Member 5
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // =========================================================================
  // 4. WAITLIST FORM VALIDATION & SUBMISSION
  // =========================================================================
  const waitlistForm = document.getElementById('waitlist-form');
  const nameInput = document.getElementById('fullname');
  const emailInput = document.getElementById('email');
  const roleSelect = document.getElementById('user-role');
  const submitBtn = document.getElementById('waitlist-submit-btn');
  const successBanner = document.getElementById('form-success');
  const successMessageText = document.getElementById('success-message-text');
  const resetFormBtn = document.getElementById('reset-form-btn');

  // Simple, standard email validation regex
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return emailRegex.test(email.trim());
  };

  // Helper to mark field error
  const setFieldError = (inputEl, hasError) => {
    const parentGroup = inputEl.closest('.form-group');
    if (!parentGroup) return;

    if (hasError) {
      parentGroup.classList.add('has-error');
      inputEl.setAttribute('aria-invalid', 'true');
    } else {
      parentGroup.classList.remove('has-error');
      inputEl.setAttribute('aria-invalid', 'false');
    }
  };

  // Live input cleanup on user typing
  if (nameInput) {
    nameInput.addEventListener('input', () => {
      if (nameInput.value.trim().length >= 2) {
        setFieldError(nameInput, false);
      }
    });
  }

  if (emailInput) {
    emailInput.addEventListener('input', () => {
      if (isValidEmail(emailInput.value)) {
        setFieldError(emailInput, false);
      }
    });
  }

  if (roleSelect) {
    roleSelect.addEventListener('change', () => {
      if (roleSelect.value !== '') {
        setFieldError(roleSelect, false);
      }
    });
  }

  // Form submission handler
  if (waitlistForm) {
    waitlistForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let hasErrors = false;
      let firstInvalidField = null;

      // 1. Validate Name
      const nameVal = nameInput ? nameInput.value.trim() : '';
      if (!nameVal || nameVal.length < 2) {
        setFieldError(nameInput, true);
        hasErrors = true;
        if (!firstInvalidField) firstInvalidField = nameInput;
      } else {
        setFieldError(nameInput, false);
      }

      // 2. Validate Email
      const emailVal = emailInput ? emailInput.value.trim() : '';
      if (!emailVal || !isValidEmail(emailVal)) {
        setFieldError(emailInput, true);
        hasErrors = true;
        if (!firstInvalidField) firstInvalidField = emailInput;
      } else {
        setFieldError(emailInput, false);
      }

      // 3. Validate Role Dropdown
      const roleVal = roleSelect ? roleSelect.value : '';
      if (!roleVal || (roleVal !== 'driver' && roleVal !== 'mechanic')) {
        setFieldError(roleSelect, true);
        hasErrors = true;
        if (!firstInvalidField) firstInvalidField = roleSelect;
      } else {
        setFieldError(roleSelect, false);
      }

      // Focus first invalid element for keyboard accessibility
      if (hasErrors && firstInvalidField) {
        firstInvalidField.focus();
        return;
      }

      // ---------------------------------------------------------------------
      // BACKEND SERVICE INTEGRATION POINT (STUDENTS PLEASE NOTE):
      // ---------------------------------------------------------------------
      // Currently, this handles submission purely on the front-end.
      // If connecting Formspree, Google Forms, or a custom API:
      //
      // Example 1: Custom Fetch API
      // fetch('https://your-api-endpoint.com/waitlist', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ name: nameVal, email: emailVal, role: roleVal })
      // })
      // .then(response => response.json())
      // .then(data => showSuccess())
      // .catch(error => console.error(error));
      // ---------------------------------------------------------------------

      // Simulate network submission delay for friendly UX
      if (submitBtn) {
        submitBtn.disabled = true;
        const btnText = submitBtn.querySelector('.btn-text');
        if (btnText) btnText.textContent = 'Submitting...';
      }

      setTimeout(() => {
        // Build customized success message
        const roleLabel = roleVal === 'driver' ? 'Driver' : 'Mechanic';
        if (successMessageText) {
          successMessageText.textContent = `Thank you, ${nameVal}! You have been registered as a verified ${roleLabel} on our Sri Lanka early access priority list. We will send updates to ${emailVal}.`;
        }

        // Hide form and display success alert
        waitlistForm.classList.add('hidden');
        if (successBanner) {
          successBanner.classList.add('active');
          successBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        // Reset submit button state
        if (submitBtn) {
          submitBtn.disabled = false;
          const btnText = submitBtn.querySelector('.btn-text');
          if (btnText) btnText.textContent = 'Join the Waitlist';
        }
      }, 600);
    });
  }

  // Reset form to register another member
  if (resetFormBtn && waitlistForm && successBanner) {
    resetFormBtn.addEventListener('click', () => {
      waitlistForm.reset();
      [nameInput, emailInput, roleSelect].forEach((field) => {
        if (field) setFieldError(field, false);
      });
      successBanner.classList.remove('active');
      waitlistForm.classList.remove('hidden');
      if (nameInput) nameInput.focus();
    });
  }
});
