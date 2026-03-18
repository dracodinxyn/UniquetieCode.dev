// js/sitemap-tree.js
// Injects a reusable site map dropdown into any page that includes this script
// Place <script src="js/sitemap-tree.js" defer></script> in the <body> or <head> of every page

document.addEventListener('DOMContentLoaded', function () {
  // Prevent double injection
  if (document.querySelector('[data-feature="sitemap-tree"]')) return;

  // Find or create nav container (assumes you have <nav> with .nav-links class)
  let navContainer = document.querySelector('nav .nav-links');
  if (!navContainer) {
    // Fallback: append to body if no nav found (you can customize)
    navContainer = document.createElement('div');
    navContainer.className = 'nav-links';
    document.body.prepend(navContainer);
  }

  // The dropdown HTML structure
  const dropdownHTML = `
    <div class="dropdown" data-feature="sitemap-tree">
      <button class="dropdown-toggle" aria-expanded="false" aria-haspopup="true" aria-controls="sitemap-menu">
        Site Tree ▼
      </button>

      <div id="sitemap-menu" class="dropdown-menu" hidden role="menu">
        <ul class="tree-nav">
          <li role="none"><a href="/" role="menuitem">Home</a></li>

          <li role="none" class="has-children">
            <span role="menuitem" aria-haspopup="true">Portfolio</span>
            <ul role="menu">
              <li role="none"><a href="/portfolio/" role="menuitem">Overview</a></li>
              <li role="none"><a href="/portfolio/nextjs-rendering" role="menuitem">Next.js Rendering</a></li>
              <li role="none"><a href="/portfolio/firebase-admin" role="menuitem">Firebase Admin</a></li>
              <!-- Add more skill pages here as you create them -->
            </ul>
          </li>

          <li role="none" class="has-children">
            <span role="menuitem" aria-haspopup="true">Blog</span>
            <ul role="menu">
              <li role="none"><a href="/blog/" role="menuitem">All Posts</a></li>
              <li role="none"><a href="/blog/hello-world" role="menuitem">Hello World</a></li>
              <!-- Add real posts later -->
            </ul>
          </li>

          <li role="none"><a href="/uses/" role="menuitem">Uses / Stack</a></li>
          <li role="none"><a href="/lab/" role="menuitem">Lab / Experiments</a></li>
          <li role="none"><a href="/admin/login.html" role="menuitem">Admin Area</a></li>
          <li role="none"><a href="/contact" role="menuitem">Contact</a></li>
          <li role="none"><a href="/now" role="menuitem">Now</a></li>
          <li role="none"><a href="/colophon" role="menuitem">Colophon</a></li>
          <li role="none"><a href="/404.html" role="menuitem">404</a></li>
        </ul>
      </div>
    </div>
  `;

  // Inject the dropdown
  navContainer.insertAdjacentHTML('beforeend', dropdownHTML);

  // Get elements
  const toggleBtn = document.querySelector('[data-feature="sitemap-tree"] .dropdown-toggle');
  const menu = document.getElementById('sitemap-menu');

  // Toggle function
  function toggleMenu() {
    const willBeOpen = menu.hidden;
    menu.hidden = !willBeOpen;
    toggleBtn.setAttribute('aria-expanded', willBeOpen);
    if (willBeOpen) toggleBtn.focus();
  }

  // Click to open/close
  toggleBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    toggleMenu();
  });

  // Close on outside click