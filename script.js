// Small interactions for the Al Madina Super Store website.
document.getElementById('year').textContent = new Date().getFullYear();

const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuButton.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
});
nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open menu');
  });
});

// Reveal sections gently as they enter the viewport.
const revealTargets = document.querySelectorAll('.about-grid, .visit-heading, .visit-card, .review-left, .review-list');
if ('IntersectionObserver' in window) {
  revealTargets.forEach(el => {
    el.classList.add('will-reveal');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    observer.observe(el);
  });
}


// Product catalogue: category filters and live search.
const filterButtons = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');
const productSearch = document.getElementById('productSearch');
let activeCategory = 'all';

function updateProducts() {
  const searchTerm = productSearch.value.trim().toLowerCase();
  productCards.forEach(card => {
    const matchesCategory = activeCategory === 'all' || card.dataset.category === activeCategory;
    const matchesSearch = card.dataset.name.toLowerCase().includes(searchTerm);
    card.classList.toggle('hidden', !(matchesCategory && matchesSearch));
  });
}
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    activeCategory = button.dataset.filter;
    filterButtons.forEach(item => item.classList.toggle('active', item === button));
    updateProducts();
  });
});
productSearch.addEventListener('input', updateProducts);
