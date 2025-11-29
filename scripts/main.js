const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const smoothButtons = document.querySelectorAll('[data-scroll]');
smoothButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const selector = button.getAttribute('data-scroll');
    const target = selector ? document.querySelector(selector) : null;
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

const wireForm = (formId, successMessage) => {
  const form = document.getElementById(formId);
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const successEl = form.querySelector('.form-success');
    if (successEl) {
      successEl.textContent = successMessage;
    }
    form.reset();
    setTimeout(() => {
      if (successEl) successEl.textContent = '';
    }, 5000);
  });
};

wireForm('scope-form', 'Thanks! We will send the audit overview shortly.');
wireForm('contact-form', 'Message received. Expect a reply within one business day.');
