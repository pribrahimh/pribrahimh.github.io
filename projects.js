/*
 * projects.js - all project data lives here
 *
 * To add a project:
 *   1. Copy one of the example objects at the bottom of PROJECTS.
 *   2. Fill in every field (use null for repo or demo if not applicable).
 *   3. Set featured: true on at most one project (shown on the landing page).
 *   4. Save the file.
 *   5. Also update the static HTML fallback in projects.html (the noscript
 *      block) so the page works with JavaScript disabled.
 *
 * Fields:
 *   title       {string}       - project name, shown as the card heading
 *   description {string}       - one to two sentences, plain text
 *   tech        {string[]}     - technology tags, aim for 4-6
 *   status      {string}       - "active" | "prototype" | "archived"
 *   repo        {string|null}  - full GitHub URL, or null if private
 *   demo        {string|null}  - live demo URL, or null
 *   featured    {boolean}      - true shows this card on index.html
 *   year        {number}       - year built or last substantially updated
 */

/* global */
var PROJECTS = [

  /* ---- Active projects ---- */

  {
    title:       'AdalBank',
    description: 'Full-stack digital banking application. Django REST API backend ' +
                 'with JWT authentication, served via Daphne ASGI. React Native ' +
                 'mobile frontend built with Expo. PostgreSQL database, containerised ' +
                 'with Docker.',
    tech:        ['Django', 'React Native', 'PostgreSQL', 'Docker', 'Python'],
    status:      'active',
    repo:        null,  // private repository
    demo:        null,
    featured:    false,
    year:        2026,  // created 2026-05-18
  },

  {
    title:       'IoT Blockchain System',
    description: 'Records sensor readings from a simulated IoT network onto a ' +
                 'permissioned blockchain so data integrity can be verified rather ' +
                 'than assumed. Built with Contiki-NG and Cooja for the sensor ' +
                 'layer and Hyperledger Fabric for the ledger. Shell-heavy internals.',
    tech:        ['Hyperledger Fabric', 'Contiki-NG', 'Cooja', 'Shell'],
    status:      'prototype',
    repo:        'https://github.com/pribrahimh/IoT-Blockchain-System',
    demo:        null,
    featured:    true,
    year:        2025,  // created 2025-03-15
  },

  {
    title:       'Nurul Awdal',
    description: 'Web application for Islamic financial tracking. Features a ' +
                 'dashboard, donation tracking and project management views. ' +
                 'Built with React, TypeScript and Vite.',
    tech:        ['React', 'TypeScript', 'Vite', 'Tailwind CSS'],
    status:      'active',
    repo:        null,  // private repository
    demo:        null,
    featured:    false,
    year:        2025,  // created 2025-04-12
  },

  {
    title:       'Food and lifestyle website',
    description: 'University coursework project. A food and lifestyle site covering ' +
                 'recipes, culinary ideas and healthy living content. Built in plain HTML.',
    tech:        ['HTML', 'CSS'],
    status:      'archived',
    repo:        'https://github.com/pribrahimh/foodandlifestyle',
    demo:        null,
    featured:    false,
    year:        2023,  // created 2023-03-24
  },

  /* ---- To add a project, copy this block and fill in the fields ---- */
  // {
  //   title:       'Project name',
  //   description: 'One to two sentences describing what it does and why it exists. ' +
  //                'Be specific about the problem it solves.',
  //   tech:        ['Python', 'SQL', 'Pandas'],  // main technologies, 4-6 is ideal
  //   status:      'active',                     // 'active' | 'prototype' | 'archived'
  //   repo:        'https://github.com/pribrahimh/repo-name',  // or null if private
  //   demo:        'https://your-demo-url.com',  // or null if no live demo
  //   featured:    false,  // set true to show on the landing page (only one at a time)
  //   year:        2025,   // year from GitHub creation date
  // },

];

/*
 * renderProjects - renders project cards into a container element.
 *
 * @param {HTMLElement} container - the element to render into
 * @param {object}      options
 * @param {boolean}     [options.featured] - if true, only render featured projects
 */
function renderProjects(container, options) {
  options = options || {};
  var items = PROJECTS;

  if (options.featured) {
    items = items.filter(function (p) { return p.featured; });
  }

  if (items.length === 0) {
    container.innerHTML = '<p class="muted">No projects here yet.</p>';
    return;
  }

  var statusLabel = {
    active:    'active',
    prototype: 'prototype',
    archived:  'archived',
  };

  var html = items.map(function (p) {
    var techTags = p.tech.map(function (t) {
      return '<span class="tag">' + esc(t) + '</span>';
    }).join(' ');

    var links = [];
    if (p.repo) {
      links.push('<a href="' + esc(p.repo) + '" target="_blank" rel="noopener noreferrer">GitHub</a>');
    }
    if (p.demo) {
      links.push('<a href="' + esc(p.demo) + '" target="_blank" rel="noopener noreferrer">Live demo</a>');
    }
    var linksHtml = links.length
      ? '<div class="project-card__links">' + links.join('<span aria-hidden="true"> &middot; </span>') + '</div>'
      : '';

    return '<article class="project-card">' +
      '<div class="project-card__header">' +
        '<h3 class="project-card__title">' + esc(p.title) + '</h3>' +
        '<span class="tag tag--status">' + esc(statusLabel[p.status] || p.status) + '</span>' +
      '</div>' +
      '<p class="project-card__desc">' + esc(p.description) + '</p>' +
      '<div class="project-card__tech">' + techTags + '</div>' +
      linksHtml +
    '</article>';
  }).join('');

  container.innerHTML = html;
}

/* Escapes HTML special characters to prevent injection from data strings. */
function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
