/**
 * BeejSetu (बीजसेतु) - Interactive Application Logic
 * Indigenous Seed Donation and Agroforestry Platform
 */

// Application State
const AppState = {
  cart: JSON.parse(localStorage.getItem('seedbridge_cart') || '[]'),
  donations: JSON.parse(localStorage.getItem('seedbridge_donations') || '[]'),
  orders: JSON.parse(localStorage.getItem('seedbridge_orders') || '[]'),
  stats: JSON.parse(localStorage.getItem('seedbridge_stats') || JSON.stringify({
    donatedPackets: 18450,
    treesPlanted: 12280,
    farmersSupported: 420
  })),
  currentWizardStep: 1,
  activeFilter: 'all',
  searchQuery: '',
  selectedNgoForDonation: null
};

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {
  initStats();
  initCatalog();
  initDonationWizard();
  initNgoDirectory();
  initGerminationCalc();
  initCart();
  initActivityDrawer();
  setupEventListeners();
});

/* ==========================================================================
   1. Live Stats & Impact Counters
   ========================================================================== */
function initStats() {
  updateStatsDisplay();
}

function updateStatsDisplay() {
  const donatedEl = document.getElementById('stat-donated-count');
  const treesEl = document.getElementById('stat-trees-count');
  const farmersEl = document.getElementById('stat-farmers-count');

  if (donatedEl) donatedEl.innerText = AppState.stats.donatedPackets.toLocaleString('en-IN') + '+';
  if (treesEl) treesEl.innerText = AppState.stats.treesPlanted.toLocaleString('en-IN') + '+';
  if (farmersEl) farmersEl.innerText = AppState.stats.farmersSupported.toLocaleString('en-IN') + '+';

  localStorage.setItem('seedbridge_stats', JSON.stringify(AppState.stats));
}

function incrementStats(donatedAmount = 1, trees = 1) {
  AppState.stats.donatedPackets += donatedAmount;
  AppState.stats.treesPlanted += trees;
  AppState.stats.farmersSupported += 1;
  updateStatsDisplay();
}

/* ==========================================================================
   2. Seed Catalog & Filtering
   ========================================================================== */
function initCatalog() {
  renderSeedCatalog();
}

function renderSeedCatalog() {
  const gridEl = document.getElementById('seed-catalog-grid');
  if (!gridEl) return;

  const filtered = SEED_DATABASE.filter(seed => {
    const matchesCategory = (AppState.activeFilter === 'all') || (seed.category === AppState.activeFilter);
    const matchesSearch = seed.name.toLowerCase().includes(AppState.searchQuery.toLowerCase()) ||
                          seed.hindiName.toLowerCase().includes(AppState.searchQuery.toLowerCase()) ||
                          seed.description.toLowerCase().includes(AppState.searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    gridEl.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
        <div style="margin-bottom: 1rem;"><img src="assets/icons/seed.svg" width="48" height="48" alt=""></div>
        <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--green-900);">No seeds found matching your query</h3>
        <p style="font-size: 0.9rem; margin-top: 0.5rem;">Try adjusting your search terms or filter category.</p>
        <button class="btn btn-secondary" style="margin-top: 1rem;" onclick="resetCatalogFilters()">Reset All Filters</button>
      </div>
    `;
    return;
  }

  gridEl.innerHTML = filtered.map(seed => {
    const categoryIcon = seed.category === 'fruit' ? 'tree.svg' : (seed.category === 'vegetable' ? 'sprout.svg' : 'seed.svg');
    const recipientNgo = seed.acceptedBy && seed.acceptedBy.length > 0 ? seed.acceptedBy[0] : 'Maharashtra Partner Nurseries';
    return `
      <article class="seed-card" data-seed-id="${seed.id}">
        ${seed.badge ? `<span class="seed-card-badge">${seed.badge}</span>` : ''}
        
        <div>
          <div class="seed-card-header">
            <div class="seed-icon-circle">
              <img src="assets/icons/${categoryIcon}" width="26" height="26" alt="${seed.categoryLabel}">
            </div>
            <div class="seed-title-box">
              <h3>${seed.name}</h3>
              <p class="seed-hindiName">${seed.hindiName}</p>
            </div>
          </div>

          <div class="seed-meta-tags">
            <span class="tag-badge" style="background: var(--green-100); color: var(--green-800);">${seed.categoryLabel}</span>
            <span class="tag-badge">${seed.season}</span>
            <span class="tag-badge">${seed.difficulty}</span>
          </div>

          <p class="seed-desc">${seed.description}</p>

          <div class="seed-specs-list">
            <div class="spec-item"><span class="spec-label">Germination:</span> ${seed.germinationRate}</div>
            <div class="spec-item"><span class="spec-label">Sprout:</span> ${seed.daysToSprout}</div>
            <div class="spec-item"><span class="spec-label">Sun:</span> ${seed.sunlight}</div>
            <div class="spec-item"><span class="spec-label">Water:</span> ${seed.water}</div>
          </div>
        </div>

        <div class="seed-card-footer" style="display: flex; flex-direction: column; gap: 0.65rem; align-items: stretch; border-top: 1px solid var(--border-light); padding-top: 0.85rem;">
          <div style="font-size: 0.78rem; color: var(--green-900); background: var(--bg-sage); padding: 0.45rem 0.65rem; border-radius: var(--radius-sm); border: 1px solid var(--border-green); display: flex; align-items: center; justify-content: space-between;">
            <span style="display: flex; align-items: center; gap: 0.35rem; color: var(--text-muted); font-size: 0.75rem;">
              <img src="assets/icons/tree.svg" width="13" height="13" alt="">
              <span>Nurtured by:</span>
            </span>
            <strong style="color: var(--green-800); font-size: 0.78rem;">${recipientNgo}</strong>
          </div>
          
          <button class="btn btn-primary" style="width: 100%; font-size: 0.88rem; padding: 0.65rem 1rem;" onclick="prefillDonationForSeed('${seed.id}')">
            Donate This Seed Variety →
          </button>
        </div>
      </article>
    `;
  }).join('');
}

function prefillDonationForSeed(seedId) {
  const seed = SEED_DATABASE.find(s => s.id === seedId);
  if (!seed) return;

  const categorySelect = document.getElementById('donationSeedCategory');
  if (categorySelect) {
    if (seed.category === 'fruit') {
      categorySelect.value = 'Fruit Tree Seeds';
    } else if (seed.category === 'vegetable') {
      categorySelect.value = 'Heirloom Vegetable Seeds';
    } else if (seed.category === 'medicinal') {
      categorySelect.value = 'Medicinal & Forest Seeds';
    }
  }

  const varietyInput = document.getElementById('donationSeedVariety');
  if (varietyInput) {
    varietyInput.value = `${seed.name} (${seed.hindiName})`;
  }

  if (seed.acceptedBy && seed.acceptedBy.length > 0) {
    AppState.selectedNgoForDonation = seed.acceptedBy[0];
  }

  AppState.currentWizardStep = 1;
  renderWizardStep();

  scrollToSection('donate-section');
  showToast(`Selected ${seed.name}! Ready to complete your seed donation.`);
}

function resetCatalogFilters() {
  AppState.activeFilter = 'all';
  AppState.searchQuery = '';
  const searchInput = document.getElementById('catalog-search-input');
  if (searchInput) searchInput.value = '';

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === 'all');
  });

  renderSeedCatalog();
}

/* ==========================================================================
   3. Seed Basket / Cart System
   ========================================================================== */
function initCart() {
  updateCartUI();
}

function toggleCartItem(seedId) {
  const seed = SEED_DATABASE.find(s => s.id === seedId);
  if (!seed) return;

  const existingIndex = AppState.cart.findIndex(i => i.id === seedId);
  if (existingIndex > -1) {
    AppState.cart.splice(existingIndex, 1);
    showToast(`Removed ${seed.name} from your seed box.`);
  } else {
    AppState.cart.push({
      id: seed.id,
      name: seed.name,
      hindiName: seed.hindiName,
      icon: seed.icon,
      categoryLabel: seed.categoryLabel,
      qty: 1
    });
    showToast(`Added ${seed.name} to your seed box!`);
  }

  saveCart();
  updateCartUI();
  renderSeedCatalog();
}

function updateCartQty(seedId, delta) {
  const item = AppState.cart.find(i => i.id === seedId);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    AppState.cart = AppState.cart.filter(i => i.id !== seedId);
  }

  saveCart();
  updateCartUI();
  renderSeedCatalog();
}

function saveCart() {
  localStorage.setItem('seedbridge_cart', JSON.stringify(AppState.cart));
}

function updateCartUI() {
  const countEls = document.querySelectorAll('.cart-badge-count');
  const totalItems = AppState.cart.reduce((sum, item) => sum + item.qty, 0);

  countEls.forEach(el => {
    el.innerText = totalItems;
    el.style.display = totalItems > 0 ? 'flex' : 'none';
  });

  // Render drawer items
  const drawerBody = document.getElementById('cart-drawer-items');
  const drawerFooter = document.getElementById('cart-drawer-footer');
  if (!drawerBody) return;

  if (AppState.cart.length === 0) {
    drawerBody.innerHTML = `
      <div class="cart-empty-state">
        <div class="cart-empty-icon" style="margin-bottom: 0.75rem;"><img src="assets/icons/basket.svg" width="44" height="44" alt=""></div>
        <h4>Your Seed Box is Empty</h4>
        <p style="font-size: 0.85rem; margin-top: 0.5rem;">Explore the catalog and select native fruit or heirloom vegetable seeds to plant.</p>
        <button class="btn btn-primary" style="margin-top: 1.25rem;" onclick="closeCartDrawer(); scrollToSection('catalog-section');">Browse Seeds</button>
      </div>
    `;
    if (drawerFooter) drawerFooter.style.display = 'none';
    return;
  }

  if (drawerFooter) drawerFooter.style.display = 'block';

  drawerBody.innerHTML = `
    <div class="cart-items-list">
      ${AppState.cart.map(item => `
        <div class="cart-item">
          <div class="cart-item-icon">
            <img src="assets/icons/seed.svg" width="22" height="22" alt="">
          </div>
          <div class="cart-item-info">
            <h4>${item.name}</h4>
            <p>${item.categoryLabel} • Free distribution</p>
          </div>
          <div class="cart-item-actions">
            <button class="qty-btn" onclick="updateCartQty('${item.id}', -1)">-</button>
            <span class="qty-count">${item.qty}</span>
            <button class="qty-btn" onclick="updateCartQty('${item.id}', 1)">+</button>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  const totalPktsEl = document.getElementById('cart-total-packets');
  if (totalPktsEl) totalPktsEl.innerText = `${totalItems} Packet${totalItems > 1 ? 's' : ''}`;
}

function openCartDrawer() {
  const overlay = document.getElementById('cart-drawer-overlay');
  const drawer = document.getElementById('cart-slide-drawer');
  if (overlay && drawer) {
    overlay.classList.add('open');
    drawer.classList.add('open');
  }
}

function closeCartDrawer() {
  const overlay = document.getElementById('cart-drawer-overlay');
  const drawer = document.getElementById('cart-slide-drawer');
  if (overlay && drawer) {
    overlay.classList.remove('open');
    drawer.classList.remove('open');
  }
}

/* ==========================================================================
   4. Order Checkout Flow
   ========================================================================== */
function openOrderCheckoutModal() {
  if (AppState.cart.length === 0) {
    showToast("Please add at least one seed packet to order.");
    return;
  }
  closeCartDrawer();
  const modal = document.getElementById('order-checkout-modal');
  if (modal) {
    modal.classList.add('open');
    renderOrderSummaryList();
  }
}

function closeOrderCheckoutModal() {
  const modal = document.getElementById('order-checkout-modal');
  if (modal) modal.classList.remove('open');
}

function renderOrderSummaryList() {
  const summaryEl = document.getElementById('order-modal-summary');
  if (!summaryEl) return;

  summaryEl.innerHTML = AppState.cart.map(i => `
    <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.9rem; margin-bottom: 0.5rem;">
      <span style="display: flex; align-items: center; gap: 0.4rem;">
        <img src="assets/icons/seed.svg" width="16" height="16" alt="">
        <strong>${i.name}</strong> (x${i.qty})
      </span>
      <span style="color: var(--green-700); font-weight: 700;">Free / Community</span>
    </div>
  `).join('');
}

function submitOrderForm(e) {
  e.preventDefault();
  const form = e.target;
  const name = form.orderName.value.trim();
  const phone = form.orderPhone.value.trim();
  const email = form.orderEmail.value.trim();
  const address = form.orderAddress.value.trim();
  const pincode = form.orderPincode.value.trim();
  const purpose = form.orderPurpose.value;

  if (!name || !phone || !address || !pincode) {
    showToast("Please complete all required fields.");
    return;
  }

  const orderId = 'SB-ORD-' + Math.floor(100000 + Math.random() * 900000);
  const totalPackets = AppState.cart.reduce((sum, item) => sum + item.qty, 0);

  const orderRecord = {
    id: orderId,
    date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
    name,
    phone,
    email,
    address: `${address}, PIN: ${pincode}`,
    purpose,
    items: [...AppState.cart],
    totalPackets,
    status: "Confirmed & Packing"
  };

  AppState.orders.unshift(orderRecord);
  localStorage.setItem('seedbridge_orders', JSON.stringify(AppState.orders));

  // Clear cart
  AppState.cart = [];
  saveCart();
  updateCartUI();
  renderSeedCatalog();

  // Close order form modal and open receipt
  closeOrderCheckoutModal();
  showOrderSuccessModal(orderRecord);
  showToast("Order placed successfully! Seeds will be dispatched soon.");
}

function showOrderSuccessModal(order) {
  const modal = document.getElementById('order-success-modal');
  const detailsEl = document.getElementById('order-success-details');
  if (!modal || !detailsEl) return;

  detailsEl.innerHTML = `
    <div style="background: var(--bg-sage); padding: 1.5rem; border-radius: var(--radius-lg); border: 1px solid var(--border-green); text-align: left; margin: 1.5rem 0;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 0.75rem; border-bottom: 1px dashed var(--border-light); padding-bottom: 0.5rem;">
        <span style="font-size: 0.85rem; color: var(--text-muted);">Tracking Number:</span>
        <strong style="color: var(--green-900); font-family: var(--font-display);">${order.id}</strong>
      </div>
      <div style="margin-bottom: 0.5rem; font-size: 0.9rem;"><strong>Recipient:</strong> ${order.name}</div>
      <div style="margin-bottom: 0.5rem; font-size: 0.9rem;"><strong>Delivery To:</strong> ${order.address}</div>
      <div style="margin-bottom: 0.5rem; font-size: 0.9rem;"><strong>Planting Purpose:</strong> ${order.purpose}</div>
      <div style="margin-top: 1rem; border-top: 1px dashed var(--border-light); padding-top: 0.75rem;">
        <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.4rem;">Packets in package:</div>
        ${order.items.map(it => `<div style="font-size: 0.88rem; font-weight: 600; display: flex; align-items: center; gap: 0.4rem; margin-top: 0.25rem;"><img src="assets/icons/seed.svg" width="15" height="15" alt=""> ${it.name} (${it.qty} pkt)</div>`).join('')}
      </div>
    </div>
  `;

  modal.classList.add('open');
}

function closeOrderSuccessModal() {
  const modal = document.getElementById('order-success-modal');
  if (modal) modal.classList.remove('open');
}

/* ==========================================================================
   5. Donate Seeds Multi-Step Wizard
   ========================================================================== */
function initDonationWizard() {
  renderWizardStep();
}

function goToWizardStep(step) {
  if (step < 1 || step > 4) return;
  AppState.currentWizardStep = step;
  renderWizardStep();
}

function renderWizardStep() {
  // Update progress indicators
  document.querySelectorAll('.progress-step').forEach((el, idx) => {
    const stepNum = idx + 1;
    el.classList.toggle('active', stepNum === AppState.currentWizardStep);
    el.classList.toggle('completed', stepNum < AppState.currentWizardStep);
  });

  // Toggle active form step
  document.querySelectorAll('.wizard-form-step').forEach(stepEl => {
    stepEl.classList.toggle('active', parseInt(stepEl.dataset.step) === AppState.currentWizardStep);
  });
}

function selectRadioCard(element, inputName, value) {
  const parent = element.closest('.radio-card-grid');
  parent.querySelectorAll('.radio-card').forEach(c => c.classList.remove('selected'));
  element.classList.add('selected');
  const hiddenInput = document.getElementById(inputName);
  if (hiddenInput) hiddenInput.value = value;
}

function validateWizardStep1() {
  const category = document.getElementById('donationSeedCategory').value;
  const variety = document.getElementById('donationSeedVariety').value.trim();
  const quantity = document.getElementById('donationQuantity').value.trim();

  if (!category || !variety || !quantity) {
    showToast("Please select seed category, variety name, and quantity.");
    return false;
  }
  return true;
}

function validateWizardStep2() {
  const c1 = document.getElementById('check-clean').checked;
  const c2 = document.getElementById('check-dry').checked;
  const c3 = document.getElementById('check-package').checked;

  if (!c1 || !c2 || !c3) {
    showToast("Please ensure all 3 preparation requirements are checked for viability.");
    return false;
  }
  return true;
}

function validateWizardStep3() {
  const mode = document.getElementById('donationDeliveryMode').value;
  if (!mode) {
    showToast("Please select a contribution method.");
    return false;
  }
  return true;
}

function submitDonationWizard(e) {
  e.preventDefault();
  const name = document.getElementById('donorName').value.trim();
  const phone = document.getElementById('donorPhone').value.trim();
  const city = document.getElementById('donorCity').value.trim();
  const address = document.getElementById('donorAddress').value.trim();
  const message = document.getElementById('donorMessage').value.trim();

  if (!name || !phone || !city) {
    showToast("Please provide your name, phone, and city.");
    return;
  }

  const category = document.getElementById('donationSeedCategory').value;
  const variety = document.getElementById('donationSeedVariety').value;
  const quantity = document.getElementById('donationQuantity').value;
  const mode = document.getElementById('donationDeliveryMode').value;
  const targetNgo = AppState.selectedNgoForDonation || "Sahyadri Devrai / Maharashtra Partner Network";

  const donationId = 'SB-DON-' + Math.floor(100000 + Math.random() * 900000);
  const donationRecord = {
    id: donationId,
    date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
    name,
    phone,
    city,
    address,
    category,
    variety,
    quantity,
    mode,
    targetNgo,
    message,
    status: "Verified & Pickup Scheduled"
  };

  AppState.donations.unshift(donationRecord);
  localStorage.setItem('seedbridge_donations', JSON.stringify(AppState.donations));

  // Increment counters
  incrementStats(parseInt(quantity) || 50, 10);

  // Show Certificate Modal
  showCertificateModal(donationRecord);
  showToast("Thank you for giving life back to earth! Certificate ready.");

  // Reset form
  document.getElementById('donation-wizard-form').reset();
  AppState.currentWizardStep = 1;
  AppState.selectedNgoForDonation = null;
  renderWizardStep();
}

function showCertificateModal(donation) {
  const modal = document.getElementById('certificate-modal');
  const nameEl = document.getElementById('cert-donor-display');
  const detailsEl = document.getElementById('cert-details-display');
  const idEl = document.getElementById('cert-id-display');
  const dateEl = document.getElementById('cert-date-display');

  if (nameEl) nameEl.innerText = donation.name;
  if (detailsEl) detailsEl.innerText = `For donating ${donation.quantity} viable seeds of ${donation.variety} to the ${donation.targetNgo} reforestation program.`;
  if (idEl) idEl.innerText = `Badge ID: ${donation.id}`;
  if (dateEl) dateEl.innerText = `Issued on: ${donation.date}`;

  if (modal) modal.classList.add('open');
}

function closeCertificateModal() {
  const modal = document.getElementById('certificate-modal');
  if (modal) modal.classList.remove('open');
}

/* ==========================================================================
   6. NGO Partner Directory
   ========================================================================== */
function initNgoDirectory() {
  renderNgoDirectory();
}

function renderNgoDirectory() {
  const container = document.getElementById('ngo-cards-grid');
  if (!container) return;

  container.innerHTML = NGO_PARTNERS.map(ngo => `
    <article class="ngo-card">
      <div>
        <div class="ngo-card-header">
          <div class="ngo-title">
            <h3>${ngo.name}</h3>
            <p class="ngo-role" style="display: flex; align-items: center; gap: 0.35rem; margin-top: 0.25rem;">
              <img src="assets/icons/map-pin.svg" width="13" height="13" alt="">
              <span>${ngo.city}</span>
            </p>
          </div>
          <span class="verified-badge" style="display: flex; align-items: center; gap: 0.35rem;">
            <img src="assets/icons/shield-check.svg" width="13" height="13" alt="">
            <span>Verified Partner</span>
          </span>
        </div>

        <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 1rem; font-style: italic;">
          "${ngo.tagline}"
        </p>

        <div class="ngo-address-box">
          <img src="assets/icons/map-pin.svg" width="16" height="16" style="flex-shrink: 0; margin-top: 2px;" alt="">
          <div>${ngo.address}</div>
        </div>

        <div style="font-size: 0.8rem; font-weight: 700; color: var(--green-800); margin-bottom: 0.4rem;">
          Specialty Seeds Accepted:
        </div>
        <div class="ngo-accepted-tags">
          ${ngo.acceptedSeeds.map(s => `<span class="seed-chip">${s}</span>`).join('')}
        </div>
      </div>

      <div>
        <div class="ngo-contacts">
          <div class="ngo-contact-row">
            <img src="assets/icons/phone.svg" width="14" height="14" alt="">
            <a href="tel:${ngo.phone}">${ngo.phone}</a> ${ngo.altPhone ? ` / ${ngo.altPhone}` : ''}
          </div>
          <div class="ngo-contact-row">
            <img src="assets/icons/mail.svg" width="14" height="14" alt="">
            <a href="mailto:${ngo.email}">${ngo.email}</a>
          </div>
        </div>

        <button class="btn btn-outline" style="width: 100%; font-size: 0.88rem;" onclick="prefillDonationForNgo('${ngo.name}')">
          Donate Seeds to this Center →
        </button>
      </div>
    </article>
  `).join('');
}

function prefillDonationForNgo(ngoName) {
  AppState.selectedNgoForDonation = ngoName;
  scrollToSection('donate-section');
  showToast(`Selected ${ngoName} as your preferred donation center!`);
}

/* ==========================================================================
   7. Interactive Germination Viability Calculator
   ========================================================================== */
function initGerminationCalc() {
  const testedInput = document.getElementById('calc-tested-seeds');
  const sproutedInput = document.getElementById('calc-sprouted-seeds');

  if (testedInput && sproutedInput) {
    testedInput.addEventListener('input', calculateGermination);
    sproutedInput.addEventListener('input', calculateGermination);
  }
}

function calculateGermination() {
  const tested = parseInt(document.getElementById('calc-tested-seeds').value) || 0;
  const sprouted = parseInt(document.getElementById('calc-sprouted-seeds').value) || 0;
  const rateEl = document.getElementById('calc-rate-result');
  const verdictEl = document.getElementById('calc-verdict-result');
  const adviceEl = document.getElementById('calc-advice-result');

  if (tested <= 0 || sprouted < 0 || sprouted > tested) {
    rateEl.innerText = "--%";
    verdictEl.innerText = "Enter valid seed counts";
    adviceEl.innerText = "Test with 10 or 20 seeds between damp paper towels.";
    return;
  }

  const rate = Math.round((sprouted / tested) * 100);
  rateEl.innerText = rate + "%";

  if (rate >= 80) {
    verdictEl.innerText = "Excellent Viability";
    verdictEl.style.color = "var(--green-600)";
    adviceEl.innerText = "Prime quality seeds. Perfect for donating to community nurseries or direct planting.";
  } else if (rate >= 60) {
    verdictEl.innerText = "Moderate Viability";
    verdictEl.style.color = "var(--amber-600)";
    adviceEl.innerText = "Good for planting. Sow slightly more densely to ensure a high germination rate.";
  } else {
    verdictEl.innerText = "Low Viability";
    verdictEl.style.color = "#DC2626";
    adviceEl.innerText = "Seeds may be old or improperly dried. Check moisture before packaging.";
  }
}

/* ==========================================================================
   8. Activity Drawer (My Orders & Donations)
   ========================================================================== */
function initActivityDrawer() {
  renderActivityList();
}

function openActivityDrawer() {
  const overlay = document.getElementById('activity-drawer-overlay');
  const drawer = document.getElementById('activity-slide-drawer');
  if (overlay && drawer) {
    renderActivityList();
    overlay.classList.add('open');
    drawer.classList.add('open');
  }
}

function closeActivityDrawer() {
  const overlay = document.getElementById('activity-drawer-overlay');
  const drawer = document.getElementById('activity-slide-drawer');
  if (overlay && drawer) {
    overlay.classList.remove('open');
    drawer.classList.remove('open');
  }
}

function renderActivityList() {
  const container = document.getElementById('activity-list-container');
  if (!container) return;

  const totalActions = AppState.donations.length + AppState.orders.length;
  if (totalActions === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
        <div style="margin-bottom: 0.75rem;"><img src="assets/icons/award.svg" width="44" height="44" alt=""></div>
        <h4>No Seed Donations Yet</h4>
        <p style="font-size: 0.85rem; margin-top: 0.35rem;">When you donate seeds, your contributions, recipient NGOs, and certificates will appear here.</p>
        <button class="btn btn-primary" style="margin-top: 1.25rem; font-size: 0.88rem;" onclick="closeActivityDrawer(); scrollToSection('donate-section');">
          Start Your First Seed Donation →
        </button>
      </div>
    `;
    return;
  }

  let html = '';

  if (AppState.donations.length > 0) {
    html += `<h4 style="font-size: 0.95rem; font-weight: 700; color: var(--green-900); margin-bottom: 0.75rem;">Seed Donations &amp; Certificates</h4>`;
    html += AppState.donations.map(don => `
      <div class="activity-item" style="display: flex; flex-direction: column; gap: 0.5rem; align-items: stretch;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 0.5rem;">
          <div class="act-left" style="display: flex; gap: 0.75rem; align-items: center;">
            <div class="act-icon" style="flex-shrink: 0;">
              <img src="assets/icons/seed.svg" width="22" height="22" alt="">
            </div>
            <div class="act-info">
              <h4>${don.variety} (${don.quantity})</h4>
              <p>${don.id} • ${don.date} • Destined: ${don.targetNgo}</p>
            </div>
          </div>
          <span class="status-badge received">${don.status}</span>
        </div>
        <div style="display: flex; justify-content: flex-end; border-top: 1px dashed var(--border-light); padding-top: 0.4rem;">
          <button class="btn btn-outline" style="font-size: 0.75rem; padding: 0.3rem 0.65rem; display: inline-flex; align-items: center; gap: 0.35rem;" onclick="viewDonationCertificate('${don.id}')">
            <img src="assets/icons/award.svg" width="13" height="13" alt="">
            <span>View Certificate</span>
          </button>
        </div>
      </div>
    `).join('');
  }

  if (AppState.orders.length > 0) {
    html += `<h4 style="font-size: 0.95rem; font-weight: 700; color: var(--text-muted); margin: 1.5rem 0 0.75rem;">Archived Activity</h4>`;
    html += AppState.orders.map(ord => `
      <div class="activity-item">
        <div class="act-left">
          <div class="act-icon">
            <img src="assets/icons/package.svg" width="22" height="22" alt="">
          </div>
          <div class="act-info">
            <h4>${ord.totalPackets || 1} Seed Packet(s)</h4>
            <p>${ord.id} • ${ord.date} • ${ord.purpose || 'Community'}</p>
          </div>
        </div>
        <span class="status-badge processing">${ord.status}</span>
      </div>
    `).join('');
  }

  container.innerHTML = html;
}

function viewDonationCertificate(donationId) {
  const donation = AppState.donations.find(d => d.id === donationId);
  if (!donation) return;
  closeActivityDrawer();
  showCertificateModal(donation);
}

/* ==========================================================================
   9. Helper Utilities & Event Listeners
   ========================================================================== */
function setupEventListeners() {
  // Catalog search input
  const searchInput = document.getElementById('catalog-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      AppState.searchQuery = e.target.value;
      renderSeedCatalog();
    });
  }

  // Filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      AppState.activeFilter = btn.dataset.filter;
      renderSeedCatalog();
    });
  });

  // Newsletter form
  const newsForm = document.getElementById('newsletter-form');
  if (newsForm) {
    newsForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast("Thank you for subscribing to the seasonal sowing calendar! 📅");
      newsForm.reset();
    });
  }
}

function scrollToSection(sectionId) {
  const el = document.getElementById(sectionId);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<img src="assets/icons/seed.svg" width="16" height="16" alt="" style="filter: brightness(0) invert(1);"> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
