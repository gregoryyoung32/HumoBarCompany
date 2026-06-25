// PAGE VIEW TRACKING
// ═══════════════════════════════════════
(function(){
  try {
    var today = new Date().toISOString().slice(0,10);
    var views = JSON.parse(localStorage.getItem('hbc_pageviews') || '{}');
    views[today] = (views[today] || 0) + 1;
    localStorage.setItem('hbc_pageviews', JSON.stringify(views));
  } catch(e) {}
})();

// ═══════════════════════════════════════
// SMALL BITES DATA
// ═══════════════════════════════════════
var BITES_DATA = {
  currentSeason: "Spring / Summer 2025",
  menus: [
    { name: "Garden & Herb", pairsWith: "Pairs with: Botanical & Citrus Cocktails", badge: "Current",
      items: [
        { name: "Whipped Ricotta Crostini", desc: "Grilled sourdough, whipped ricotta, heirloom tomato, basil oil", price: "$6/ea" },
        { name: "Cucumber Avocado Bites", desc: "English cucumber rounds, smashed avocado, everything seasoning, microgreens", price: "$5/ea" },
        { name: "Prosciutto-Wrapped Melon", desc: "Seasonal melon, aged prosciutto, fresh mint, honey drizzle", price: "$7/ea" },
        { name: "Herb Frittata Squares", desc: "Chive, parsley & gruyere frittata, creme fraiche, chive blossom", price: "$5/ea" },
        { name: "Caprese Skewers", desc: "Fresh mozzarella, cherry tomato, basil, aged balsamic", price: "$5/ea" }
      ]
    },
    { name: "Smoke & Salt", pairsWith: "Pairs with: Smoky & Spirit-Forward Cocktails", badge: "Current",
      items: [
        { name: "Smoked Salmon Blini", desc: "House-made blini, creme fraiche, wild smoked salmon, dill, capers", price: "$8/ea" },
        { name: "Bacon-Wrapped Dates", desc: "Medjool dates, applewood bacon, manchego stuffed, honey glaze", price: "$6/ea" },
        { name: "Mini Beef Sliders", desc: "Wagyu patty, sharp cheddar, pickled onion, brioche bun", price: "$9/ea" },
        { name: "Chorizo & Queso Bites", desc: "Crispy wonton cup, house queso, crumbled chorizo, jalapeno", price: "$6/ea" },
        { name: "Smoked Brisket Crostini", desc: "Texas brisket, pickled red onion, horseradish cream, grilled sourdough", price: "$8/ea" }
      ]
    },
    { name: "Light & Bright", pairsWith: "Pairs with: Sparkling & Aperitif Cocktails", badge: "Seasonal Add-On",
      items: [
        { name: "Tuna Tartare Spoons", desc: "Ahi tuna, sesame, avocado creme, cucumber, crispy shallot", price: "$9/ea" },
        { name: "Shrimp Cocktail Shots", desc: "Jumbo poached shrimp, house cocktail sauce, lemon, horseradish", price: "$8/ea" },
        { name: "Watermelon Feta Skewers", desc: "Fresh watermelon, whipped feta, mint, tajin rim", price: "$5/ea" },
        { name: "Deviled Eggs", desc: "Classic deviled egg, smoked paprika, crispy pancetta, chive", price: "$4/ea" },
        { name: "Endive & Blue Cheese", desc: "Belgian endive leaf, gorgonzola, candied walnut, honey, pear", price: "$6/ea" }
      ]
    }
  ]
};

function renderBites() {
  var container = document.getElementById('bitesMenus');
  if (!container) return;
  var tag = document.querySelector('.bites-season-tag');
  if (tag) tag.textContent = BITES_DATA.currentSeason;
  container.innerHTML = BITES_DATA.menus.map(function(menu) {
    return '<div class="bites-menu-card">' +
      '<div class="bites-menu-header">' +
        '<div><div class="bites-menu-name">' + menu.name + '</div>' +
        '<div class="bites-menu-pair">' + menu.pairsWith + '</div></div>' +
        '<div class="bites-menu-badge">' + menu.badge + '</div>' +
      '</div>' +
      '<ul class="bites-items">' +
        menu.items.map(function(item) {
          return '<li class="bites-item">' +
            '<div class="bites-item-left">' +
              '<div class="bites-item-name">' + item.name + '</div>' +
              '<div class="bites-item-desc">' + item.desc + '</div>' +
            '</div>' +
            '<div class="bites-item-price">' + item.price + '</div>' +
          '</li>';
        }).join('') +
      '</ul></div>';
  }).join('');
}

// ═══════════════════════════════════════
// PACKAGES TAB SWITCHER
// ═══════════════════════════════════════
function switchTab(e, panelId) {
  document.querySelectorAll('.pkg-tab').forEach(function(t) { t.classList.remove('active'); });
  document.querySelectorAll('.pkg-panel').forEach(function(p) { p.classList.remove('active'); });
  e.target.classList.add('active');
  var panel = document.getElementById(panelId);
  if (panel) panel.classList.add('active');
}

// ═══════════════════════════════════════
// TIER SELECTOR (inquiry form)
// ═══════════════════════════════════════
function selectTier(tier) {
  ['classic','elevated','premium'].forEach(function(t) {
    var el = document.getElementById('tier-' + t);
    if (el) el.classList.remove('selected');
  });
  var sel = document.getElementById('tier-' + tier);
  if (sel) sel.classList.add('selected');
}

// ═══════════════════════════════════════
// INQUIRY FORM SUBMISSION
// ═══════════════════════════════════════
function handleSubmit(e) {
  e.preventDefault();
  var form = e.target;
  var nameEl = form.querySelector('[placeholder="Your name"]');
  var phoneEl = form.querySelector('[type="tel"]');
  var emailEl = form.querySelector('[type="email"]');
  var selects = form.querySelectorAll('select');
  var dateEl = form.querySelector('[type="date"]');
  var textInputs = form.querySelectorAll('[type="text"]');
  var textareaEl = form.querySelector('textarea');
  var tierEl = document.querySelector('.tier-opt.selected .tier-opt-name');
  var inquiry = {
    name: nameEl ? nameEl.value : '',
    phone: phoneEl ? phoneEl.value : '',
    email: emailEl ? emailEl.value : '',
    eventType: selects[0] ? selects[0].value : '',
    eventDate: dateEl ? dateEl.value : '',
    venue: textInputs[1] ? textInputs[1].value : '',
    guests: selects[1] ? selects[1].value : '',
    hours: selects[2] ? selects[2].value : '',
    tier: tierEl ? tierEl.textContent : '',
    notes: textareaEl ? textareaEl.value : '',
    status: 'New',
    received: new Date().toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric', hour:'2-digit', minute:'2-digit' })
  };
  try {
    var existing = JSON.parse(localStorage.getItem('hbc_inquiries') || '[]');
    existing.push(inquiry);
    localStorage.setItem('hbc_inquiries', JSON.stringify(existing));
  } catch(err) {}
  showToastMsg('Inquiry received — we\'ll be in touch within 24 hours.');
  form.reset();
  ['classic','elevated','premium'].forEach(function(t) {
    var el = document.getElementById('tier-' + t);
    if (el) el.classList.remove('selected');
  });
}

// ═══════════════════════════════════════
// VIEW SWITCHER (Home / Payments / Admin)
// ═══════════════════════════════════════
var currentView = 'home';

function showView(view) {
  // Hide all views with inline style (belt AND suspenders)
  document.querySelectorAll('.site-view').forEach(function(v) {
    v.classList.remove('active');
    v.style.display = 'none';
  });
  document.querySelectorAll('.nav-links a').forEach(function(a) { a.classList.remove('nav-active'); });

  // Show target view
  var el = document.getElementById('view-' + view);
  if (el) {
    el.classList.add('active');
    el.style.display = 'block';
  }
  currentView = view;

  // Highlight active nav tab
  var navEl = document.getElementById('nav-' + view);
  if (navEl) navEl.classList.add('nav-active');

  window.scrollTo({ top: 0 });

  // Admin-specific logic
  if (view === 'admin') {
    if (!avAuthed) {
      document.getElementById('av-login').style.display = 'flex';
      document.getElementById('av-portal').style.display = 'none';
    } else {
      document.getElementById('av-login').style.display = 'none';
      document.getElementById('av-portal').style.display = 'flex';
      avLoadAnalytics();
    }
  }
}

// Handle home anchor links from other views
document.addEventListener('click', function(e) {
  var a = e.target.closest('a[href^="#"]');
  if (!a) return;
  var id = a.getAttribute('href').substring(1);
  if (!id) return;
  if (currentView !== 'home') {
    e.preventDefault();
    showView('home');
    setTimeout(function() {
      var target = document.getElementById(id);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }, 60);
  }
});

// ═══════════════════════════════════════
// PAYMENTS VIEW
// ═══════════════════════════════════════
function updateDepDisplay() {
  var v = parseFloat(document.getElementById('depAmount').value);
  var d = document.getElementById('depPreview');
  var dv = document.getElementById('depPreviewVal');
  if (v > 0) {
    d.style.display = 'flex';
    dv.textContent = '$' + v.toLocaleString('en-US', { minimumFractionDigits:2, maximumFractionDigits:2 });
  } else {
    d.style.display = 'none';
  }
}
function updateBalDisplay() {
  var v = parseFloat(document.getElementById('balAmount').value);
  var d = document.getElementById('balPreview');
  var dv = document.getElementById('balPreviewVal');
  if (v > 0) {
    d.style.display = 'flex';
    dv.textContent = '$' + v.toLocaleString('en-US', { minimumFractionDigits:2, maximumFractionDigits:2 });
  } else {
    d.style.display = 'none';
  }
}
function handleDeposit() {
  var name = document.getElementById('depName').value.trim();
  var email = document.getElementById('depEmail').value.trim();
  var amount = document.getElementById('depAmount').value.trim();
  var date = document.getElementById('depDate').value;
  if (!name || !email || !amount || !date) {
    showToastMsg('Please fill in all fields before continuing.');
    return;
  }
  var saved = localStorage.getItem('hbc_stripe_deposit');
  var link = saved || 'https://buy.stripe.com/YOUR_DEPOSIT_LINK_HERE';
  var url = link + '?prefilled_email=' + encodeURIComponent(email) + '&client_reference_id=' + encodeURIComponent(name + ' | ' + date);
  showToastMsg('Redirecting to secure checkout...');
  setTimeout(function() { window.open(url, '_blank'); }, 800);
}
function handleBalance() {
  var name = document.getElementById('balName').value.trim();
  var email = document.getElementById('balEmail').value.trim();
  var amount = document.getElementById('balAmount').value.trim();
  var date = document.getElementById('balDate').value;
  if (!name || !email || !amount || !date) {
    showToastMsg('Please fill in all fields before continuing.');
    return;
  }
  var saved = localStorage.getItem('hbc_stripe_balance');
  var link = saved || 'https://buy.stripe.com/YOUR_BALANCE_LINK_HERE';
  var url = link + '?prefilled_email=' + encodeURIComponent(email) + '&client_reference_id=' + encodeURIComponent(name + ' | ' + date);
  showToastMsg('Redirecting to secure checkout...');
  setTimeout(function() { window.open(url, '_blank'); }, 800);
}

// ═══════════════════════════════════════
// ADMIN AUTH
// ═══════════════════════════════════════
var AV_USER = 'gregory_young32@yahoo.com';
var AV_PASS = 'Geypoint3225$';
var avAuthed = false;

function avLogin() {
  var u = document.getElementById('avUser').value.trim();
  var p = document.getElementById('avPass').value;
  var err = document.getElementById('avLoginError');
  if (u === AV_USER && p === AV_PASS) {
    avAuthed = true;
    document.getElementById('av-login').style.display = 'none';
    document.getElementById('av-portal').style.display = 'flex';
    avInit();
  } else {
    err.style.display = 'block';
    document.getElementById('avPass').value = '';
    document.getElementById('avPass').focus();
  }
}
function avLogout() {
  avAuthed = false;
  document.getElementById('av-login').style.display = 'flex';
  document.getElementById('av-portal').style.display = 'none';
  document.getElementById('avUser').value = '';
  document.getElementById('avPass').value = '';
  document.getElementById('avLoginError').style.display = 'none';
}
document.addEventListener('keydown', function(e) {
  if (e.key === 'Enter' && currentView === 'admin' && !avAuthed) avLogin();
});

// ═══════════════════════════════════════
// ADMIN INIT
// ═══════════════════════════════════════
function avInit() {
  avUpdateTopDate();
  avLoadInquiries();
  avLoadAnalytics();
  avRenderUsers();
  avRunCalc();
  var depLink = localStorage.getItem('hbc_stripe_deposit');
  var balLink = localStorage.getItem('hbc_stripe_balance');
  if (depLink) { var d = document.getElementById('avStripeDeposit'); if(d) d.value = depLink; }
  if (balLink) { var b = document.getElementById('avStripeBalance'); if(b) b.value = balLink; }
}
function avUpdateTopDate() {
  var el = document.getElementById('avTopbarDate');
  if (el) el.textContent = new Date().toLocaleDateString('en-US', { weekday:'long', year:'numeric', month:'long', day:'numeric' });
}

// ═══════════════════════════════════════
// ADMIN PAGE NAVIGATION
// ═══════════════════════════════════════
var avPageTitles = {
  dashboard: 'Dashboard <span>Overview</span>',
  inquiries: 'Inquiry <span>Inbox</span>',
  calculator: 'Quote <span>Calculator</span>',
  payments: 'Payment <span>Overview</span>',
  analytics: 'Analytics <span>Dashboard</span>',
  adjustments: 'Site <span>Adjustments</span>',
  users: 'Admin <span>Users</span>',
  settings: 'Admin <span>Settings</span>'
};
function avShowPage(id, linkEl) {
  document.querySelectorAll('.av-page').forEach(function(p) { p.classList.remove('active'); });
  document.querySelectorAll('.av-nav-link').forEach(function(l) { l.classList.remove('active'); });
  var page = document.getElementById('avp-' + id);
  if (page) page.classList.add('active');
  if (linkEl) linkEl.classList.add('active');
  var t = document.getElementById('avTopbarTitle');
  if (t) t.innerHTML = avPageTitles[id] || id;
  if (id === 'analytics') avLoadAnalytics();
}

// ═══════════════════════════════════════
// INQUIRIES
// ═══════════════════════════════════════
function avGetInquiries() { return JSON.parse(localStorage.getItem('hbc_inquiries') || '[]'); }
function avSaveInquiries(arr) { localStorage.setItem('hbc_inquiries', JSON.stringify(arr)); }

var avCurrentFilter = 'all';
var avCurrentSearch = '';
var avCurrentInqIdx = null;

function avLoadInquiries() {
  var inqs = avGetInquiries();
  avRenderTable(inqs);
  avRenderDashRecent(inqs);
  avUpdateKPIs();
  var newCount = inqs.filter(function(i) { return i.status === 'New'; }).length;
  var badge = document.getElementById('avInboxCount');
  if (badge) { badge.textContent = newCount; badge.style.display = newCount > 0 ? 'inline' : 'none'; }
}
function avUpdateKPIs() {
  var inqs = avGetInquiries();
  function set(id, v) { var el = document.getElementById(id); if (el) el.textContent = v; }
  set('avKpiTotal', inqs.length);
  set('avKpiNew', inqs.filter(function(i) { return i.status === 'New'; }).length);
  set('avKpiBooked', inqs.filter(function(i) { return i.status === 'Booked'; }).length);
  set('avKpiQuotes', parseInt(localStorage.getItem('hbc_quotes') || '0'));
  set('avPayBooked', inqs.filter(function(i) { return i.status === 'Booked'; }).length);
}
function avFmtDate(d) {
  try { return new Date(d + 'T12:00:00').toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric' }); }
  catch(e) { return d; }
}
function avRenderTable(inqs) {
  var tbody = document.getElementById('avInqBody');
  if (!tbody) return;
  if (inqs.length === 0) {
    tbody.innerHTML = '<tr><td colspan="8" class="av-empty-cell">No inquiries yet. They will appear here when clients submit the form.</td></tr>';
    return;
  }
  tbody.innerHTML = inqs.map(function(inq, idx) {
    var badgeCls = inq.status === 'New' ? 'av-badge-new' : inq.status === 'Booked' ? 'av-badge-booked' : 'av-badge-reviewed';
    return '<tr>' +
      '<td><div class="av-inq-name">' + inq.name + '</div><div class="av-inq-email">' + (inq.email||'') + '</div></td>' +
      '<td>' + (inq.eventType||'—') + '</td>' +
      '<td>' + (inq.eventDate ? avFmtDate(inq.eventDate) : '—') + '</td>' +
      '<td>' + (inq.guests||'—') + '</td>' +
      '<td>' + (inq.tier||'—') + '</td>' +
      '<td>' + (inq.received||'') + '</td>' +
      '<td><span class="av-badge ' + badgeCls + '">' + inq.status + '</span></td>' +
      '<td><div class="av-inq-actions">' +
        '<button class="av-inq-btn av-inq-btn-view" onclick="avViewInq(' + idx + ')">View</button>' +
        '<button class="av-inq-btn av-inq-btn-quote" onclick="avLoadInqToCalc(' + idx + ')">Quote</button>' +
        '<button class="av-inq-btn av-inq-btn-book" onclick="avMarkBooked(' + idx + ')">' + (inq.status === 'Booked' ? 'Booked' : 'Book') + '</button>' +
      '</div></td>' +
    '</tr>';
  }).join('');
}
function avRenderDashRecent(inqs) {
  var el = document.getElementById('avDashRecent');
  if (!el) return;
  var recent = inqs.slice().reverse().slice(0, 5);
  if (recent.length === 0) { el.innerHTML = '<div class="av-empty">No inquiries yet.</div>'; return; }
  el.innerHTML = recent.map(function(inq) {
    var badgeCls = inq.status === 'New' ? 'av-badge-new' : inq.status === 'Booked' ? 'av-badge-booked' : 'av-badge-reviewed';
    return '<div class="av-recent-row">' +
      '<div><div class="av-recent-name">' + inq.name + '</div>' +
      '<div class="av-recent-detail">' + (inq.eventType||'') + (inq.eventDate ? ' · ' + avFmtDate(inq.eventDate) : '') + '</div></div>' +
      '<span class="av-badge ' + badgeCls + '">' + inq.status + '</span>' +
    '</div>';
  }).join('');
}
function avFilterInquiries(search) { avCurrentSearch = search.toLowerCase(); avApplyFilters(); }
function avFilterStatus(status, btn) {
  avCurrentFilter = status;
  document.querySelectorAll('.av-filter').forEach(function(b) { b.classList.remove('active'); });
  btn.classList.add('active');
  avApplyFilters();
}
function avApplyFilters() {
  var inqs = avGetInquiries();
  if (avCurrentFilter !== 'all') inqs = inqs.filter(function(i) { return i.status === avCurrentFilter; });
  if (avCurrentSearch) inqs = inqs.filter(function(i) {
    return (i.name||'').toLowerCase().indexOf(avCurrentSearch) > -1 ||
           (i.email||'').toLowerCase().indexOf(avCurrentSearch) > -1 ||
           (i.eventType||'').toLowerCase().indexOf(avCurrentSearch) > -1;
  });
  avRenderTable(inqs);
}
function avViewInq(idx) {
  var inqs = avGetInquiries();
  var inq = inqs[idx];
  avCurrentInqIdx = idx;
  if (inq.status === 'New') { inqs[idx].status = 'Reviewed'; avSaveInquiries(inqs); avLoadInquiries(); }
  var modal = document.getElementById('avModal');
  document.getElementById('avModalTitle').textContent = inq.name + ' — Inquiry';
  var statusCls = { New:'sel-new', Reviewed:'sel-reviewed', Booked:'sel-booked' };
  document.getElementById('avModalBody').innerHTML =
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px;">' +
      '<div><div class="av-mf-label">Full Name</div><div class="av-mf-val">' + inq.name + '</div></div>' +
      '<div><div class="av-mf-label">Email</div><div class="av-mf-val">' + (inq.email||'—') + '</div></div>' +
      '<div><div class="av-mf-label">Phone</div><div class="av-mf-val">' + (inq.phone||'—') + '</div></div>' +
      '<div><div class="av-mf-label">Event Type</div><div class="av-mf-val">' + (inq.eventType||'—') + '</div></div>' +
      '<div><div class="av-mf-label">Event Date</div><div class="av-mf-val">' + (inq.eventDate ? avFmtDate(inq.eventDate) : '—') + '</div></div>' +
      '<div><div class="av-mf-label">Venue</div><div class="av-mf-val">' + (inq.venue||'—') + '</div></div>' +
      '<div><div class="av-mf-label">Guests</div><div class="av-mf-val">' + (inq.guests||'—') + '</div></div>' +
      '<div><div class="av-mf-label">Hours</div><div class="av-mf-val">' + (inq.hours||'—') + '</div></div>' +
      '<div><div class="av-mf-label">Tier</div><div class="av-mf-val">' + (inq.tier||'—') + '</div></div>' +
      '<div><div class="av-mf-label">Received</div><div class="av-mf-val">' + (inq.received||'') + '</div></div>' +
    '</div>' +
    (inq.notes ? '<div class="av-mdivider"></div><div class="av-mf-label">Notes</div><div class="av-modal-notes">' + inq.notes + '</div>' : '') +
    '<div class="av-mdivider"></div>' +
    '<div class="av-mf-label">Update Status</div>' +
    '<div class="av-status-row">' +
      '<button class="av-status-opt ' + (inq.status==='New'?'sel-new':'') + '" onclick="avUpdateStatus(' + idx + ',\'New\',this)">New</button>' +
      '<button class="av-status-opt ' + (inq.status==='Reviewed'?'sel-reviewed':'') + '" onclick="avUpdateStatus(' + idx + ',\'Reviewed\',this)">Reviewed</button>' +
      '<button class="av-status-opt ' + (inq.status==='Booked'?'sel-booked':'') + '" onclick="avUpdateStatus(' + idx + ',\'Booked\',this)">Booked</button>' +
    '</div>';
  modal.classList.add('open');
}
function avUpdateStatus(idx, status, btn) {
  var inqs = avGetInquiries();
  inqs[idx].status = status;
  avSaveInquiries(inqs);
  avLoadInquiries();
  document.querySelectorAll('.av-status-row .av-status-opt').forEach(function(b) { b.className = 'av-status-opt'; });
  btn.classList.add('sel-' + status.toLowerCase());
  avShowToast('Status updated to ' + status);
}
function avMarkBooked(idx) {
  var inqs = avGetInquiries();
  inqs[idx].status = 'Booked';
  avSaveInquiries(inqs);
  avLoadInquiries();
  avShowToast('Event marked as Booked!');
}
function avLoadInqToCalc(idx) {
  var inq = avGetInquiries()[idx];
  var calcLink = document.querySelector('[onclick*="calculator"]');
  avShowPage('calculator', calcLink);
  if (inq.name) document.getElementById('cName').value = inq.name;
  if (inq.eventDate) document.getElementById('cDate').value = inq.eventDate;
  if (inq.eventType) { var ts = document.getElementById('cType'); if (ts) ts.value = inq.eventType; }
  if (inq.venue) document.getElementById('cVenue').value = inq.venue;
  if (inq.guests) { document.getElementById('cGuests').value = inq.guests; avAutoStaff(); }
  if (inq.hours) { var hrs = (inq.hours + '').replace(/[^0-9]/g, '') || '4'; document.getElementById('cHours').value = hrs; }
  var modal = document.getElementById('avModal');
  if (modal) modal.classList.remove('open');
  setTimeout(avRunCalc, 100);
  avShowToast('Loaded into calculator');
}

// ═══════════════════════════════════════
// QUOTE CALCULATOR
// ═══════════════════════════════════════
var AV_MIN_MARGIN = 0.35;

function avAdjQty(id, delta) {
  var el = document.getElementById(id);
  var min = parseInt(el.min) || 0;
  el.value = Math.max(min, (parseInt(el.value) || 0) + delta);
  avRunCalc();
}
function avToggleAddon(label, id) {
  var cb = document.getElementById(id);
  cb.checked = !cb.checked;
  label.classList.toggle('selected', cb.checked);
  if (id === 'avAddonBites') { var br = document.getElementById('avBitesRow'); if (br) br.style.display = cb.checked ? 'block' : 'none'; }
  if (id === 'avAddonOT') { var or = document.getElementById('avOTRow'); if (or) or.style.display = cb.checked ? 'block' : 'none'; }
  avRunCalc();
}
function avAutoStaff() {
  var g = parseInt(document.getElementById('cGuests').value) || 0;
  var tier = document.getElementById('cTier');
  var hint = document.getElementById('avTierHint');
  if (g <= 75) {
    tier.value = 'classic'; if (hint) hint.textContent = 'Classic: up to 75 guests';
    document.getElementById('cBartenders').value = 1;
    document.getElementById('cBarbacks').value = 1;
    document.getElementById('cServers').value = 0;
  } else if (g <= 125) {
    tier.value = 'elevated'; if (hint) hint.textContent = 'Elevated: 75-125 guests';
    document.getElementById('cBartenders').value = Math.ceil(g / 50);
    document.getElementById('cBarbacks').value = 1;
    document.getElementById('cServers').value = Math.ceil(g / 75);
  } else {
    tier.value = 'premium'; if (hint) hint.textContent = 'Premium: 125+ guests';
    document.getElementById('cBartenders').value = Math.ceil(g / 50);
    document.getElementById('cBarbacks').value = Math.ceil(g / 75);
    document.getElementById('cServers').value = Math.ceil(g / 75);
  }
  avRunCalc();
}
function avRunCalc() {
  var g = parseInt(document.getElementById('cGuests').value) || 0;
  var hours = parseInt(document.getElementById('cHours').value) || 4;
  var tier = document.getElementById('cTier').value;
  var bars = parseInt(document.getElementById('cBartenders').value) || 0;
  var backs = parseInt(document.getElementById('cBarbacks').value) || 0;
  var servers = parseInt(document.getElementById('cServers').value) || 0;
  var supplies = parseFloat(document.getElementById('cSupplies').value) || 0;
  var equip = parseFloat(document.getElementById('cEquip').value) || 0;
  var misc = parseFloat(document.getElementById('cMisc').value) || 0;
  var name = document.getElementById('cName').value || 'TBD';
  var date = document.getElementById('cDate').value;
  var type = document.getElementById('cType').value || '—';
  var venue = document.getElementById('cVenue').value || '—';

  var subBars = document.getElementById('avSubBars'); if (subBars) subBars.textContent = '$' + (bars * 200).toLocaleString();
  var subBacks = document.getElementById('avSubBacks'); if (subBacks) subBacks.textContent = '$' + (backs * 100).toLocaleString();
  var subServers = document.getElementById('avSubServers'); if (subServers) subServers.textContent = '$' + (servers * 225).toLocaleString();

  var sb = document.getElementById('avReceiptStatus');
  if (g === 0) {
    var rb = document.getElementById('avReceiptBody'); if (rb) rb.innerHTML = '<div class="av-empty" style="padding:28px 0;">Enter guest count to begin.</div>';
    var ab = document.getElementById('avAlert'); if (ab) ab.style.display = 'none';
    var pb = document.getElementById('avPrintBtn'); if (pb) pb.style.display = 'none';
    if (sb) { sb.className = 'av-receipt-status rsb-pending'; sb.textContent = 'Pending'; }
    return;
  }

  var base = 0, baseLabel = '', perGuest = 0;
  if (tier === 'classic') { base = g <= 60 ? 900 : 1250; baseLabel = 'Classic Package (flat rate)'; }
  else if (tier === 'elevated') { perGuest = 30; base = 1250 + g * 30; baseLabel = 'Elevated Package ($1,250 base + $30/guest)'; }
  else { perGuest = 37; base = 1750 + g * 37; baseLabel = 'Premium Package ($1,750 base + $37/guest)'; }

  var staffCost = bars * 200 + backs * 100 + servers * 225;
  var addonRev = 0;
  var addonLines = [];
  var stdAddons = [
    { id:'avAddonCocktail', label:'Custom Cocktail Development' },
    { id:'avAddonSmoked', label:'Smoked Cocktail Experience' },
    { id:'avAddonBatch', label:'Batch Cocktails' },
    { id:'avAddonCups', label:'Branded Cups (150)' },
    { id:'avAddonExtraBar', label:'Extra Bartender' },
    { id:'avAddonExtraBack', label:'Extra Barback' }
  ];
  stdAddons.forEach(function(a) {
    var cb = document.getElementById(a.id);
    if (cb && cb.checked) { var c = parseFloat(cb.dataset.cost) || 0; addonRev += c; addonLines.push({ label: a.label, val: c }); }
  });
  var bitesEl = document.getElementById('avAddonBites');
  if (bitesEl && bitesEl.checked) {
    var bc = parseFloat(document.getElementById('cBitesCost').value) || 0;
    addonRev += bc; addonLines.push({ label: 'Small Bites Package', val: bc });
  }
  var otEl = document.getElementById('avAddonOT');
  if (otEl && otEl.checked) {
    var oth = parseInt(document.getElementById('cOTHours').value) || 1;
    var otr = parseFloat(document.getElementById('cOTRate').value) || 175;
    var otT = oth * otr * bars;
    addonRev += otT; addonLines.push({ label: 'Overtime (' + oth + 'hr x $' + otr + ' x ' + bars + ' bartenders)', val: otT });
  }

  var totalRev = base + addonRev;
  var totalCost = staffCost + supplies + equip + misc;
  var profit = totalRev - totalCost;
  var margin = totalRev > 0 ? profit / totalRev : 0;
  var deposit = totalRev * 0.5;
  var mColor = margin >= AV_MIN_MARGIN ? '#4dbb6e' : margin >= 0.2 ? '#e6a014' : '#e05555';

  var qc = parseInt(localStorage.getItem('hbc_quotes') || '0') + 1;
  localStorage.setItem('hbc_quotes', qc);
  avUpdateKPIs();

  var addonHTML = addonLines.map(function(a) {
    return '<div class="av-li"><div class="av-li-desc">' + a.label + '</div><div class="av-li-val gold">$' + a.val.toLocaleString() + '</div></div>';
  }).join('');

  var serversRow = servers > 0 ? '<div class="av-li"><div class="av-li-desc">Tray-Pass Servers (' + servers + ')</div><div class="av-li-val" style="color:#4dbb6e;font-size:0.62rem;">Incl.</div></div>' : '';
  var miscRow = misc > 0 ? '<div class="av-li"><div class="av-li-desc dim">Miscellaneous</div><div class="av-li-val dim">-$' + misc.toLocaleString() + '</div></div>' : '';

  var html =
    '<div class="av-rci"><strong>' + name + '</strong><br>' +
    (date ? avFmtDate(date) : 'Date TBD') + ' · ' + type + '<br>' +
    venue + ' · ' + g + ' guests · ' + hours + ' hrs</div>' +
    '<div style="font-size:0.52rem;letter-spacing:0.16em;text-transform:uppercase;color:#c8601a;margin-bottom:7px;">Client Quote</div>' +
    '<div class="av-li"><div class="av-li-desc">' + baseLabel + '<small>' + (perGuest ? g + ' guests @ $' + perGuest + '/guest' : 'Flat rate') + '</small></div><div class="av-li-val">$' + base.toLocaleString() + '</div></div>' +
    '<div class="av-li"><div class="av-li-desc">Lead Bartenders (' + bars + ')</div><div class="av-li-val" style="color:#4dbb6e;font-size:0.62rem;">Incl.</div></div>' +
    '<div class="av-li"><div class="av-li-desc">Barbacks (' + backs + ')</div><div class="av-li-val" style="color:#4dbb6e;font-size:0.62rem;">Incl.</div></div>' +
    serversRow + addonHTML +
    '<div class="av-rsep"></div>' +
    '<div style="font-size:0.52rem;letter-spacing:0.16em;text-transform:uppercase;color:#555;margin-bottom:7px;">Internal Costs</div>' +
    '<div class="av-li"><div class="av-li-desc dim">Staff Payroll<small>' + bars + ' bartenders · ' + backs + ' barbacks · ' + servers + ' servers</small></div><div class="av-li-val dim">-$' + staffCost.toLocaleString() + '</div></div>' +
    '<div class="av-li"><div class="av-li-desc dim">Supplies / Mixers / Garnish</div><div class="av-li-val dim">-$' + supplies.toLocaleString() + '</div></div>' +
    '<div class="av-li"><div class="av-li-desc dim">Equipment / Transport</div><div class="av-li-val dim">-$' + equip.toLocaleString() + '</div></div>' +
    miscRow +
    '<div class="av-rsep"></div>' +
    '<div class="av-rtotal-row"><div class="av-rtotal-label">Total Client Quote</div><div class="av-rtotal-val">$' + totalRev.toLocaleString() + '</div></div>' +
    '<div class="av-rdep-row"><div class="av-rdep-l">50% Deposit (at signing)</div><div class="av-rdep-v">$' + deposit.toLocaleString() + '</div></div>' +
    '<div class="av-rdep-row"><div class="av-rdep-l">Balance (7 days before)</div><div class="av-rdep-v">$' + deposit.toLocaleString() + '</div></div>' +
    '<div class="av-rdep-row" style="border-top:1px solid rgba(255,255,255,0.05);margin-top:5px;padding-top:7px;"><div class="av-rdep-l">Est. Net Profit</div><div class="av-rdep-v" style="color:' + mColor + '">$' + profit.toLocaleString() + '</div></div>' +
    '<div class="av-mbar"><div class="av-mbar-top"><div class="av-mbar-label">Profit Margin</div><div class="av-mbar-pct" style="color:' + mColor + '">' + (margin * 100).toFixed(1) + '%</div></div>' +
    '<div class="av-mbar-track"><div class="av-mbar-fill" style="width:' + Math.min(margin * 100 * (100 / 60), 100) + '%;background:' + mColor + ';"></div></div></div>';

  var receiptBody = document.getElementById('avReceiptBody');
  if (receiptBody) receiptBody.innerHTML = html;
  var pb2 = document.getElementById('avPrintBtn'); if (pb2) pb2.style.display = 'block';
  if (sb) {
    if (margin >= AV_MIN_MARGIN) { sb.className = 'av-receipt-status rsb-ok'; sb.textContent = 'Approved'; }
    else if (margin >= 0.2) { sb.className = 'av-receipt-status rsb-warn'; sb.textContent = 'Below Target'; }
    else { sb.className = 'av-receipt-status rsb-danger'; sb.textContent = 'Unprofitable'; }
  }
  avBuildAlert(margin, g, bars, backs, servers, tier, totalRev, totalCost, profit);
}

function avBuildAlert(margin, g, bars, backs, servers, tier, rev, cost, profit) {
  var box = document.getElementById('avAlert');
  if (!box) return;
  var issues = [], notes = [], sev = 'ok';
  if (margin < AV_MIN_MARGIN) {
    sev = margin < 0.15 ? 'danger' : 'warn';
    var gap = Math.ceil((AV_MIN_MARGIN - margin) * rev);
    issues.push('Margin is ' + (margin * 100).toFixed(1) + '% — target is 35%. Need ~$' + gap.toLocaleString() + ' more revenue or less cost.');
    notes.push('Add a setup fee ($150-$250) or venue-distance surcharge.');
    notes.push('Suggest a premium add-on to increase total revenue.');
  }
  var recBars = Math.ceil(g / 50);
  if (bars < recBars) {
    sev = sev === 'danger' ? 'danger' : 'warn';
    issues.push('Understaffed: ' + bars + ' bartender(s) for ' + g + ' guests. Recommended: ' + recBars + '.');
    notes.push('Add ' + (recBars - bars) + ' more bartender(s) at $200 each.');
  }
  if (backs < 1) {
    sev = sev === 'danger' ? 'danger' : 'warn';
    issues.push('No barback assigned — essential for events over 30 guests.');
    notes.push('Add at least 1 barback ($100).');
  }
  if (g > 125 && tier !== 'premium') {
    sev = sev === 'danger' ? 'danger' : 'warn';
    issues.push(g + ' guests on ' + tier + ' tier — not designed for this size.');
    notes.push('Upgrade to Premium tier for 125+ guests.');
  }
  if (profit < 0) {
    sev = 'danger';
    issues.push('NET LOSS of $' + Math.abs(profit).toLocaleString() + ' — do not book at this price.');
    notes.push('Revenue must increase by $' + Math.abs(profit).toLocaleString() + ' before presenting this quote.');
  }
  if (issues.length === 0) {
    box.className = 'av-alert av-alert-ok'; box.style.display = 'block';
    box.innerHTML = '<div class="av-alert-title">Quote Approved — Margin Target Met</div>' +
      '<div class="av-alert-body">Margin is ' + (margin * 100).toFixed(1) + '% — above 35% minimum. Ready to present.</div>';
    return;
  }
  box.className = 'av-alert av-alert-' + sev; box.style.display = 'block';
  var issueHTML = '<ul class="av-alert-list">' + issues.map(function(i) { return '<li>' + i + '</li>'; }).join('') + '</ul>';
  var noteHTML = notes.length ? '<div class="av-advisory"><div class="av-advisory-title">How to Fix</div><ul class="av-advisory-list">' + notes.map(function(n) { return '<li>' + n + '</li>'; }).join('') + '</ul></div>' : '';
  var proceedHTML = sev === 'danger' ? '<div class="av-alert-btns"><button class="av-proceed-btn" onclick="avProceedAnyway()">Proceed Anyway</button><button class="av-revise-btn" onclick="document.getElementById(\'avAlert\').style.display=\'none\'">Revise</button></div>' : '';
  box.innerHTML = '<div class="av-alert-title">' + (sev === 'danger' ? 'Cannot Book — Critical Issues' : 'Warning — Below Standards') + '</div>' +
    '<div class="av-alert-body">' + (sev === 'danger' ? 'Critical issues detected. Review before proceeding.' : 'Quote does not meet Humo Bar Co. standards.') + '</div>' +
    issueHTML + noteHTML + proceedHTML;
}
function avProceedAnyway() {
  var box = document.getElementById('avAlert'); if (box) box.style.display = 'none';
  var sb = document.getElementById('avReceiptStatus');
  if (sb) { sb.className = 'av-receipt-status rsb-warn'; sb.textContent = 'Override'; }
  avShowToast('Override applied. Proceed with caution.');
}

// ═══════════════════════════════════════
// ANALYTICS
// ═══════════════════════════════════════
function avLoadAnalytics() {
  try {
    var views = JSON.parse(localStorage.getItem('hbc_pageviews') || '{}');
    var today = new Date().toISOString().slice(0, 10);
    var week = 0, month = 0, all = 0;
    var days14 = [];
    for (var i = 13; i >= 0; i--) {
      var d = new Date(); d.setDate(d.getDate() - i);
      var k = d.toISOString().slice(0, 10);
      var lbl = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      days14.push({ key: k, label: lbl, val: views[k] || 0 });
    }
    Object.keys(views).forEach(function(k) {
      var v = views[k];
      all += v;
      var daysAgo = (new Date() - new Date(k)) / 86400000;
      if (daysAgo <= 7) week += v;
      if (daysAgo <= 30) month += v;
    });
    function avSet(id, v) { var el = document.getElementById(id); if (el) el.textContent = v; }
    avSet('anToday', views[today] || 0); avSet('anWeek', week); avSet('anMonth', month); avSet('anTotal', all);
    var maxV = Math.max.apply(null, days14.map(function(d) { return d.val; }).concat([1]));
    var chart = document.getElementById('avChart');
    var labels = document.getElementById('avChartLabels');
    if (chart) {
      chart.innerHTML = days14.map(function(d) {
        var h = Math.max((d.val / maxV) * 100, 2);
        var bg = d.key === today ? '#c8601a' : 'rgba(200,96,26,0.3)';
        return '<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:3px;">' +
          '<div style="font-size:0.5rem;color:#888;">' + (d.val || '') + '</div>' +
          '<div style="width:100%;background:' + bg + ';height:' + h + 'px;border-radius:1px 1px 0 0;"></div>' +
        '</div>';
      }).join('');
    }
    if (labels) {
      labels.innerHTML = days14.map(function(d) {
        return '<div style="flex:1;text-align:center;font-size:0.46rem;color:#444;">' + d.label.split(' ')[1] + '</div>';
      }).join('');
    }
    var inqs = avGetInquiries();
    var it = 0, iw = 0, im = 0;
    inqs.forEach(function(inq) {
      if (!inq.received) return;
      var daysAgo = (new Date() - new Date(inq.received)) / 86400000;
      if (daysAgo < 1) it++;
      if (daysAgo <= 7) iw++;
      if (daysAgo <= 30) im++;
    });
    avSet('anInqToday', it); avSet('anInqWeek', iw); avSet('anInqMonth', im); avSet('anInqTotal', inqs.length);
    var tl = document.getElementById('avInqTimeline');
    if (tl) {
      var sorted = inqs.slice().reverse().slice(0, 15);
      if (sorted.length === 0) { tl.innerHTML = '<div class="av-empty">No inquiries yet.</div>'; }
      else {
        tl.innerHTML = sorted.map(function(inq) {
          var bc = inq.status === 'New' ? 'av-badge-new' : inq.status === 'Booked' ? 'av-badge-booked' : 'av-badge-reviewed';
          return '<div style="display:flex;justify-content:space-between;align-items:center;padding:9px 0;border-bottom:1px solid rgba(255,255,255,0.04);">' +
            '<div><div style="font-size:0.7rem;color:#fff;">' + inq.name + '</div>' +
            '<div style="font-size:0.6rem;color:#555;margin-top:1px;">' + (inq.eventType||'—') + ' · ' + (inq.guests||'?') + ' guests</div></div>' +
            '<div style="display:flex;gap:8px;align-items:center;">' +
            '<span style="font-size:0.55rem;color:#666;">' + (inq.received||'') + '</span>' +
            '<span class="av-badge ' + bc + '">' + inq.status + '</span></div></div>';
        }).join('');
      }
    }
  } catch(e) { console.error('Analytics error:', e); }
}

// ═══════════════════════════════════════
// STRIPE LINKS
// ═══════════════════════════════════════
function avSaveStripeLinks() {
  var dep = document.getElementById('avStripeDeposit').value.trim();
  var bal = document.getElementById('avStripeBalance').value.trim();
  if (dep) localStorage.setItem('hbc_stripe_deposit', dep);
  if (bal) localStorage.setItem('hbc_stripe_balance', bal);
  avShowToast('Stripe links saved! Payment buttons are now live.');
}

// ═══════════════════════════════════════
// ADMIN USERS
// ═══════════════════════════════════════
function avGetUsers() {
  var defaults = [{ name: 'Gregory Young', email: 'gregory_young32@yahoo.com', role: 'Owner', owner: true }];
  var stored = JSON.parse(localStorage.getItem('hbc_admin_users') || '[]');
  return defaults.concat(stored);
}
function avRenderUsers() {
  var el = document.getElementById('avUserList');
  if (!el) return;
  var users = avGetUsers();
  el.innerHTML = users.map(function(u, i) {
    var color = u.owner ? '#c8601a' : '#4dbb6e';
    var bg = u.owner ? 'rgba(200,96,26,0.12)' : 'rgba(77,187,110,0.1)';
    var border = u.owner ? 'rgba(200,96,26,0.2)' : 'rgba(77,187,110,0.15)';
    var removeBtn = !u.owner ? '<button onclick="avRemoveUser(' + i + ')" style="background:none;border:1px solid rgba(220,60,60,0.2);color:#e05555;font-size:0.52rem;padding:3px 8px;cursor:pointer;font-family:\'Montserrat\',sans-serif;letter-spacing:0.1em;text-transform:uppercase;">Remove</button>' : '';
    return '<div style="display:flex;justify-content:space-between;align-items:center;padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.04);">' +
      '<div><div style="font-size:0.72rem;color:#fff;">' + u.name + '</div><div style="font-size:0.6rem;color:#555;margin-top:2px;">' + u.email + '</div></div>' +
      '<div style="display:flex;align-items:center;gap:8px;">' +
      '<span style="font-size:0.5rem;letter-spacing:0.12em;text-transform:uppercase;padding:3px 8px;background:' + bg + ';color:' + color + ';border:1px solid ' + border + ';">' + (u.owner ? 'Owner' : u.role) + '</span>' +
      removeBtn + '</div></div>';
  }).join('');
}
function avAddUser() {
  var name = document.getElementById('avNewName').value.trim();
  var email = document.getElementById('avNewEmail').value.trim();
  var pass = document.getElementById('avNewPass').value.trim();
  var role = document.getElementById('avNewRole').value;
  if (!name || !email || !pass) { avShowToast('Please fill in all fields.'); return; }
  var stored = JSON.parse(localStorage.getItem('hbc_admin_users') || '[]');
  stored.push({ name: name, email: email, pass: pass, role: role.charAt(0).toUpperCase() + role.slice(1), added: new Date().toLocaleDateString() });
  localStorage.setItem('hbc_admin_users', JSON.stringify(stored));
  document.getElementById('avNewName').value = '';
  document.getElementById('avNewEmail').value = '';
  document.getElementById('avNewPass').value = '';
  avRenderUsers();
  avShowToast('Access granted to ' + name);
}
function avRemoveUser(idx) {
  var stored = JSON.parse(localStorage.getItem('hbc_admin_users') || '[]');
  stored.splice(idx - 1, 1);
  localStorage.setItem('hbc_admin_users', JSON.stringify(stored));
  avRenderUsers();
  avShowToast('Admin access revoked.');
}

// ═══════════════════════════════════════
// TOAST
// ═══════════════════════════════════════
function showToastMsg(msg) {
  var t = document.getElementById('toast');
  if (!t) return;
  t.innerHTML = msg;
  t.classList.add('show');
  setTimeout(function() { t.classList.remove('show'); }, 4000);
}
function avShowToast(msg) { showToastMsg(msg); }

// ═══════════════════════════════════════
// MODAL CLOSE ON OVERLAY CLICK
// ═══════════════════════════════════════
document.addEventListener('click', function(e) {
  var modal = document.getElementById('avModal');
  if (modal && e.target === modal) modal.classList.remove('open');
});

// ═══════════════════════════════════════
// INIT ON LOAD
// ═══════════════════════════════════════
document.addEventListener('DOMContentLoaded', function() {
  // Hide payments and admin immediately, show home
  var vp = document.getElementById('view-payments');
  var va = document.getElementById('view-admin');
  var vh = document.getElementById('view-home');
  if (vp) vp.style.display = 'none';
  if (va) va.style.display = 'none';
  if (vh) vh.style.display = 'block';
  currentView = 'home';
  avUpdateTopDate();
  renderBites();
});
