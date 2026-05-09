(function() {
  'use strict';

  function initLoader() {
    const loader = document.querySelector('.page-loader');
    if (!loader) return;
    window.addEventListener('load', function() {
      setTimeout(function() {
        loader.classList.add('loaded');
      }, 400);
    });
  }

  
  function initThemeToggle() {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;

    const savedTheme = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const defaultDark = savedTheme === null ? true : savedTheme === 'dark';

    if (savedTheme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
    }

    updateThemeIcon();

    toggle.addEventListener('click', function() {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      updateThemeIcon();
    });

    function updateThemeIcon() {
      const current = document.documentElement.getAttribute('data-theme');
      const sunIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>';
      const moonIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>';
      toggle.innerHTML = current === 'dark' ? sunIcon : moonIcon;
    }
  }

  function initMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const nav = document.getElementById('nav-links');
    if (!btn || !nav) return;

    btn.addEventListener('click', function() {
      nav.classList.toggle('active');
      const isOpen = nav.classList.contains('active');
      btn.innerHTML = isOpen
        ? '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>'
        : '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="6" x2="20" y2="6"></line><line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="18" x2="20" y2="18"></line></svg>';
    });

    nav.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        nav.classList.remove('active');
        btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="6" x2="20" y2="6"></line><line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="18" x2="20" y2="18"></line></svg>';
      });
    });
  }

  function initActiveNav() {
    const links = document.querySelectorAll('.nav-links a');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    links.forEach(function(link) {
      const href = link.getAttribute('href');
      if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          const offset = 80;
          const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
      });
    });
  }

  function initFadeIn() {
    const elements = document.querySelectorAll('.fade-in');
    if (!elements.length) return;

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    elements.forEach(function(el) {
      observer.observe(el);
    });
  }

  function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    let lastScroll = 0;
    window.addEventListener('scroll', function() {
      const currentScroll = window.pageYOffset;
      if (currentScroll > 50) {
        navbar.style.boxShadow = '0 4px 24px rgba(0,0,0,0.15)';
      } else {
        navbar.style.boxShadow = 'none';
      }
      lastScroll = currentScroll;
    });
  }

  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      let isValid = true;

      const nameField = document.getElementById('name');
      const emailField = document.getElementById('email');
      const messageField = document.getElementById('message');

      clearErrors();

      if (!nameField || nameField.value.trim() === '') {
        showError(nameField, 'Please enter your name');
        isValid = false;
      } else if (nameField.value.trim().length < 2) {
        showError(nameField, 'Name must be at least 2 characters');
        isValid = false;
      }

      if (!emailField || emailField.value.trim() === '') {
        showError(emailField, 'Please enter your email address');
        isValid = false;
      } else if (!isValidEmail(emailField.value.trim())) {
        showError(emailField, 'Please enter a valid email address');
        isValid = false;
      }

      if (!messageField || messageField.value.trim() === '') {
        showError(messageField, 'Please enter your message');
        isValid = false;
      } else if (messageField.value.trim().length < 10) {
        showError(messageField, 'Message must be at least 10 characters');
        isValid = false;
      }

      if (isValid) {
        showSuccess();
        form.reset();
      }
    });

    function showError(field, message) {
      if (!field) return;
      const group = field.closest('.form-group');
      if (group) {
        group.classList.add('has-error');
        const errorEl = group.querySelector('.form-error');
        if (errorEl) {
          errorEl.textContent = message;
        }
      }
    }

    function clearErrors() {
      document.querySelectorAll('.form-group').forEach(function(group) {
        group.classList.remove('has-error');
      });
    }

    function isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showSuccess() {
      const existing = document.querySelector('.form-success');
      if (existing) existing.remove();

      const success = document.createElement('div');
      success.className = 'form-success';
      success.style.cssText = 'background:rgba(34,197,94,0.1);border:1px solid rgba(34,197,94,0.3);color:#22c55e;padding:16px 20px;border-radius:12px;margin-bottom:24px;font-size:14px;font-weight:500;';
      success.textContent = 'Thank you for your message. We will get back to you soon.';

      form.insertBefore(success, form.firstChild);
      setTimeout(function() {
        if (success.parentNode) success.remove();
      }, 5000);
    }

    ['name', 'email', 'message'].forEach(function(id) {
      const field = document.getElementById(id);
      if (field) {
        field.addEventListener('input', function() {
          const group = this.closest('.form-group');
          if (group) group.classList.remove('has-error');
        });
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function() {
    initLoader();
    initThemeToggle();
    initMobileMenu();
    initActiveNav();
    initSmoothScroll();
    initFadeIn();
    initNavbarScroll();
    initContactForm();
  });

})();
