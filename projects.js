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
 *   status      {string}       - "in progress" | "planned" | "active" | "prototype" | "archived"
 *   repo        {string|null}  - full GitHub URL, or null if private
 *   demo        {string|null}  - live demo URL, or null
 *   featured    {boolean}      - true shows this card on index.html
 *   year        {number}       - year built or last substantially updated
 */

/* global */
var PROJECTS = [
  {
    title:       'linux-health-check',
    description: 'Bash tool that checks disk, memory, CPU load, failed systemd services, failed SSH logins and pending updates on a Linux server, writes a report, and runs daily on a systemd timer.',
    tech:        ['Bash', 'systemd', 'Linux', 'ShellCheck'],
    status:      'in progress',
    repo:        null,  // added when the project is published
    demo:        null,
    featured:    true,
    year:        2026,
  },
  {
    title:       'ubuntu-server-hardening',
    description: 'Takes a fresh Ubuntu Server VM to a secure baseline: SSH keys only, ufw firewall, fail2ban, automatic security updates and least-privilege sudo. Automated with Bash and Ansible, with a before/after write-up.',
    tech:        ['Bash', 'Ansible', 'Ubuntu', 'ufw', 'fail2ban'],
    status:      'planned',
    repo:        null,  // added when the project is published
    demo:        null,
    featured:    false,
    year:        2026,
  },
  {
    title:       'log-threat-detector',
    description: 'Python tool that reads Linux auth.log and web server logs, detects brute-force logins and scanning, maps findings to MITRE ATT&CK and outputs JSON alerts plus an HTML report.',
    tech:        ['Python', 'MITRE ATT&CK', 'pytest', 'Log analysis'],
    status:      'planned',
    repo:        null,  // added when the project is published
    demo:        null,
    featured:    false,
    year:        2026,
  },
  {
    title:       'pcap-triage',
    description: 'Python and Scapy tool for a first look at packet captures: protocol statistics, top talkers, suspicious DNS and HTTP traffic, and charts.',
    tech:        ['Python', 'Scapy', 'Wireshark', 'Network forensics'],
    status:      'planned',
    repo:        null,  // added when the project is published
    demo:        null,
    featured:    false,
    year:        2026,
  },
  {
    title:       'soc-home-lab',
    description: 'Wazuh SIEM lab with an attacker VM: simulated attacks, custom detection rules, and each investigation written up like a real SOC ticket.',
    tech:        ['Wazuh', 'SIEM', 'Linux', 'Incident response'],
    status:      'planned',
    repo:        null,  // added when the project is published
    demo:        null,
    featured:    false,
    year:        2026,
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
    'in progress': 'in progress',
    planned:   'planned',
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
