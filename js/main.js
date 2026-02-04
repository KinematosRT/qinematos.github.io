/**
 * Qinematos Website JavaScript
 * Handles navigation, code copying, and UI interactions
 */

document.addEventListener('DOMContentLoaded', function() {
  // Mobile Navigation Toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');

      // Animate hamburger to X
      const spans = navToggle.querySelectorAll('span');
      spans.forEach(span => span.classList.toggle('active'));
    });

    // Close mobile nav when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function() {
        navLinks.classList.remove('active');
      });
    });
  }

  // Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Active Navigation Highlighting
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

  function highlightNav() {
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navItems.forEach(item => {
          item.classList.remove('active');
          if (item.getAttribute('href') === '#' + sectionId) {
            item.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNav);
  highlightNav();

  // Header Background on Scroll
  const header = document.querySelector('header');

  function updateHeader() {
    if (window.scrollY > 50) {
      header.style.background = 'rgba(10, 10, 10, 0.98)';
    } else {
      header.style.background = 'rgba(10, 10, 10, 0.95)';
    }
  }

  window.addEventListener('scroll', updateHeader);
});

/**
 * Copy code to clipboard
 * @param {HTMLElement} button - The copy button element
 */
function copyCode(button) {
  const codeBlock = button.closest('.code-header').nextElementSibling;
  const code = codeBlock.querySelector('code') || codeBlock;
  const text = code.textContent;

  navigator.clipboard.writeText(text).then(() => {
    // Visual feedback
    const originalText = button.textContent;
    button.textContent = 'Copied!';
    button.classList.add('copied');

    setTimeout(() => {
      button.textContent = originalText;
      button.classList.remove('copied');
    }, 2000);
  }).catch(err => {
    console.error('Failed to copy:', err);
    button.textContent = 'Error';
    setTimeout(() => {
      button.textContent = 'Copy';
    }, 2000);
  });
}

/**
 * Simple syntax highlighting for code blocks
 * Highlights keywords, strings, comments, etc.
 */
function highlightCode() {
  document.querySelectorAll('pre code').forEach(block => {
    let html = block.innerHTML;

    // Skip if already highlighted
    if (html.includes('token-')) return;

    // Comments (// and #)
    html = html.replace(/(\/\/.*$|#.*$)/gm, '<span class="token-comment">$1</span>');

    // Strings
    html = html.replace(/(".*?"|'.*?')/g, '<span class="token-string">$1</span>');

    // Numbers
    html = html.replace(/\b(\d+)\b/g, '<span class="token-number">$1</span>');

    // Keywords
    // Note: 'class' and 'string' are excluded because they appear in the generated
    // span attributes (class="token-string") and would corrupt the HTML
    const keywords = ['curl', 'git', 'mvn', 'java', 'pip', 'import', 'from', 'def',
                      'return', 'if', 'else', 'for', 'while', 'message', 'int64',
                      'repeated', 'enum', 'true', 'false', 'null', 'POST', 'GET', 'PUT', 'DELETE'];
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b(${keyword})\\b`, 'g');
      html = html.replace(regex, '<span class="token-keyword">$1</span>');
    });

    block.innerHTML = html;
  });
}

// Run syntax highlighting after DOM load
document.addEventListener('DOMContentLoaded', highlightCode);

/**
 * Intersection Observer for fade-in animations
 */
function setupAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe feature cards
  document.querySelectorAll('.feature-card, .rvp-card, .step').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
}

document.addEventListener('DOMContentLoaded', setupAnimations);

/**
 * Back to Top Button
 */
function setupBackToTop() {
  const backToTopBtn = document.querySelector('.back-to-top');
  if (!backToTopBtn) return;

  // Show/hide based on scroll position
  function toggleBackToTop() {
    if (window.scrollY > 500) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', toggleBackToTop);
  toggleBackToTop();

  // Scroll to top on click
  backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

document.addEventListener('DOMContentLoaded', setupBackToTop);
