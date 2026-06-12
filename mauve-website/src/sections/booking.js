const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * @param {string} id - input element id
 * @param {string} msg - error message (empty string clears the error)
 */
function setFieldError(id, msg) {
  const input = document.getElementById(id);
  const errorEl = document.getElementById(`${id}-error`);
  if (!input || !errorEl) return;
  if (msg) {
    input.classList.add('invalid');
    input.setAttribute('aria-invalid', 'true');
    input.setAttribute('aria-describedby', `${id}-error`);
    errorEl.textContent = msg;
  } else {
    input.classList.remove('invalid');
    input.removeAttribute('aria-invalid');
    input.removeAttribute('aria-describedby');
    errorEl.textContent = '';
  }
}

/** Returns { valid: bool, errors: {} } for the booking form fields */
function validateForm(data) {
  const errors = {};
  if (!data.name || data.name.trim().length < 1 || data.name.trim().length > 100) {
    errors['f-name'] = 'Please enter your name (1–100 characters).';
  }
  if (!data.email || !EMAIL_RE.test(data.email) || data.email.length > 254) {
    errors['f-email'] = 'Please enter a valid email address.';
  }
  if (!data.event_date || isNaN(Date.parse(data.event_date)) || new Date(data.event_date) <= new Date()) {
    errors['f-date'] = 'Please select a future date for your event.';
  }
  if (!data.package) {
    errors['f-package'] = 'Please select a service package.';
  }
  return { valid: Object.keys(errors).length === 0, errors };
}

/** Wires the booking form: validation, fetch submit, status messages */
export function initBookingForm() {
  const form = document.getElementById('booking-form');
  const statusEl = document.getElementById('form-status');
  const submitBtn = document.getElementById('submit-btn');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Clear previous errors
    ['f-name', 'f-email', 'f-date', 'f-package'].forEach(id => setFieldError(id, ''));
    statusEl.className = '';
    statusEl.textContent = '';

    const formData = new FormData(form);
    const addons = formData.getAll('addons');
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      event_date: formData.get('event_date'),
      package: formData.get('package'),
      addons,
      message: formData.get('message') || '',
    };

    const { valid, errors } = validateForm(data);
    if (!valid) {
      Object.entries(errors).forEach(([id, msg]) => setFieldError(id, msg));
      // Focus first error field
      const firstId = Object.keys(errors)[0];
      document.getElementById(firstId)?.focus();
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();

      if (res.ok && json.ok) {
        statusEl.className = 'success';
        statusEl.textContent = json.message;
        form.reset();
      } else if (res.status === 400 && json.errors) {
        const fieldMap = { name: 'f-name', email: 'f-email', event_date: 'f-date', package: 'f-package' };
        Object.entries(json.errors).forEach(([field, msg]) => {
          const id = fieldMap[field] || field;
          setFieldError(id, msg);
        });
        statusEl.className = 'error';
        statusEl.textContent = 'Please correct the errors above and try again.';
      } else {
        throw new Error(json.message || 'Server error');
      }
    } catch (err) {
      statusEl.className = 'error';
      statusEl.textContent = 'Something went wrong. Please try again or email us directly.';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send My Inquiry';
    }
  });
}
