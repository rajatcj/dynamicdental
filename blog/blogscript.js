/* ============================================
   DYNAMIC DENTAL CLINIC - BLOG ARTICLE JS
   Reading progress, TOC scroll-spy, FAQ accordion
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  // ---------- Reading Progress Bar ----------
  const progressBar = document.getElementById('reading-progress');
  const article = document.querySelector('.article-content');

  if (progressBar && article) {
    window.addEventListener('scroll', function () {
      const articleTop = article.offsetTop;
      const articleHeight = article.offsetHeight;
      const scrolled = window.scrollY - articleTop + window.innerHeight * 0.3;
      const pct = Math.min(100, Math.max(0, (scrolled / articleHeight) * 100));
      progressBar.style.width = pct + '%';
    }, { passive: true });
  }

  // ---------- Table of Contents Scroll-Spy ----------
  const tocLinks = document.querySelectorAll('#toc a');
  const headings = Array.from(tocLinks).map(link => {
    const id = link.getAttribute('href').slice(1);
    return document.getElementById(id);
  }).filter(Boolean);

  if (tocLinks.length && headings.length) {
    const tocObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const id = entry.target.getAttribute('id');
          const link = document.querySelector(`#toc a[href="#${id}"]`);
          if (!link) return;
          if (entry.isIntersecting) {
            tocLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
          }
        });
      },
      { rootMargin: '-100px 0px -70% 0px' }
    );

    headings.forEach(h => tocObserver.observe(h));
  }

  // ---------- FAQ Accordion: only one open at a time ----------
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    item.addEventListener('toggle', function () {
      if (item.open) {
        faqItems.forEach(other => {
          if (other !== item) other.removeAttribute('open');
        });
      }
    });
  });

});