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

  if (sections.length && navItems.length) {
    const navMap = new Map();
    navItems.forEach(item => {
      const id = item.getAttribute('href').replace('#', '');
      navMap.set(id, item);
    });

    const setActive = (id) => {
      navItems.forEach(item => {
        item.classList.toggle('active', item.getAttribute('href') === `#${id}`);
      });
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    }, {
      rootMargin: '-45% 0px -45% 0px',
      threshold: 0.1
    });

    sections.forEach(section => observer.observe(section));
  }

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
const HIGHLIGHT_KEYWORDS = ['curl', 'git', 'mvn', 'java', 'pip', 'import', 'from', 'def',
  'return', 'if', 'else', 'for', 'while', 'message', 'int64',
  'repeated', 'enum', 'true', 'false', 'null', 'POST', 'GET', 'PUT', 'DELETE'];

const keywordPattern = new RegExp(`\\b(${HIGHLIGHT_KEYWORDS.join('|')})\\b`, 'g');

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function tokenizeCode(code) {
  const tokens = [];
  let i = 0;

  while (i < code.length) {
    const char = code[i];
    const next = code[i + 1];

    if (char === '"' || char === "'") {
      let j = i + 1;
      let escaped = false;

      while (j < code.length) {
        const current = code[j];
        if (!escaped && current === char) {
          j++;
          break;
        }
        escaped = !escaped && current === '\\';
        j++;
      }

      tokens.push({ type: 'string', value: code.slice(i, j) });
      i = j;
      continue;
    }

    if (char === '/' && next === '/') {
      let j = i + 2;
      while (j < code.length && code[j] !== '\n') {
        j++;
      }
      tokens.push({ type: 'comment', value: code.slice(i, j) });
      i = j;
      continue;
    }

    if (char === '#' && (i === 0 || /\s/.test(code[i - 1]))) {
      let j = i + 1;
      while (j < code.length && code[j] !== '\n') {
        j++;
      }
      tokens.push({ type: 'comment', value: code.slice(i, j) });
      i = j;
      continue;
    }

    let j = i;
    while (j < code.length) {
      const current = code[j];
      const lookahead = code[j + 1];
      if (current === '"' || current === "'" || (current === '/' && lookahead === '/') || (current === '#' && (j === 0 || /\s/.test(code[j - 1])))) {
        break;
      }
      j++;
    }

    tokens.push({ type: 'plain', value: code.slice(i, j) });
    i = j;
  }

  return tokens;
}

function renderPlain(text) {
  const escaped = escapeHtml(text);
  const withNumbers = escaped.replace(/\b\d+(\.\d+)?\b/g, '<span class="token-number">$&</span>');
  return withNumbers.replace(keywordPattern, '<span class="token-keyword">$1</span>');
}

function highlightCode() {
  document.querySelectorAll('pre code').forEach(block => {
    const source = block.textContent;
    if (!source) return;

    const tokens = tokenizeCode(source);
    const html = tokens.map(token => {
      if (token.type === 'string') {
        return `<span class="token-string">${escapeHtml(token.value)}</span>`;
      }
      if (token.type === 'comment') {
        return `<span class="token-comment">${escapeHtml(token.value)}</span>`;
      }
      return renderPlain(token.value);
    }).join('');

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
