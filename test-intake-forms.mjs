import puppeteer from 'puppeteer';

const SCREENSHOT_DIR = './temporary screenshots';

async function openSection(page, num) {
  const isOpen = await page.$eval(`[data-section="${num}"]`, el => el.classList.contains('open'));
  if (!isOpen) {
    await page.click(`[data-section="${num}"] .section-header`);
    await page.waitForSelector(`[data-section="${num}"].open`);
    await new Promise(r => setTimeout(r, 200));
  }
}

async function clickYN(page, fieldName, value) {
  await page.evaluate((name, val) => {
    const btns = [...document.querySelectorAll('.yn-btn')];
    const btn = btns.find(b => {
      const field = b.closest('.field, .section-body');
      const hidden = field && field.querySelector(`input[name="${name}"]`);
      return hidden && b.textContent.trim().toLowerCase().startsWith(val === 'yes' ? 'y' : 'n');
    });
    if (btn) btn.click();
  }, fieldName, value);
  await new Promise(r => setTimeout(r, 150));
}

async function clickCheckbox(page, value) {
  await page.evaluate((val) => {
    const cb = document.querySelector(`input[type="checkbox"][value="${val}"]`);
    if (cb) cb.closest('.check-item').click();
  }, value);
}

async function testForm({ url, lang, data }) {
  console.log(`\n--- Testing ${lang} form: ${url} ---`);
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  await page.goto(url, { waitUntil: 'networkidle2' });
  console.log('Page loaded');

  // ── SECTION 1: Basics ──
  await openSection(page, 1);
  await page.type('input[name="business_name"]', data.businessName);
  await page.select('select[name="trade"]', data.trade);
  await page.type('input[name="owner_name"]', data.ownerName);
  await page.type('input[name="phone"]', data.phone);
  await page.type('input[name="email"]', data.email);
  await page.type('input[name="city"]', data.city);
  await page.type('input[name="existing_site"]', data.existingSite);

  // ── SECTION 2: Business ──
  await openSection(page, 2);
  await page.type('input[name="year_started"]', data.yearStarted);
  await page.type('input[name="hours"]', data.hours);
  await clickYN(page, 'emergency_service', data.emergencyService);
  await page.type('input[name="license_1"]', data.license1);
  await page.type('input[name="license_2"]', data.license2);
  await page.type('input[name="languages"]', data.languages);
  await clickYN(page, 'financing', data.financing);
  await new Promise(r => setTimeout(r, 200));
  await page.type('input[name="financing_details"]', data.financingDetails);
  for (const val of data.paymentMethods) await clickCheckbox(page, val);
  await page.type('input[name="guarantee"]', data.guarantee);

  // ── SECTION 3: About ──
  await openSection(page, 3);
  await page.type('textarea[name="about"]', data.about);
  await page.type('input[name="differentiator_1"]', data.diff1);
  await page.type('input[name="differentiator_2"]', data.diff2);
  await page.type('input[name="differentiator_3"]', data.diff3);
  await page.type('input[name="stat1_number"]', data.stat1num);
  await page.type('input[name="stat1_label"]', data.stat1label);
  await page.type('input[name="stat2_number"]', data.stat2num);
  await page.type('input[name="stat2_label"]', data.stat2label);
  await page.type('input[name="stat3_number"]', data.stat3num);
  await page.type('input[name="stat3_label"]', data.stat3label);

  // ── SECTION 4: Services ──
  await openSection(page, 4);
  await page.type('input[name="service1_name"]', data.service1);
  await page.type('input[name="service1_desc"]', data.service1desc);
  await page.type('input[name="service2_name"]', data.service2);
  await page.type('input[name="service2_desc"]', data.service2desc);
  await page.type('input[name="service3_name"]', data.service3);
  await page.type('input[name="service3_desc"]', data.service3desc);
  await page.type('input[name="service4_name"]', data.service4);
  await page.type('input[name="service4_desc"]', data.service4desc);
  await page.type('input[name="service5_name"]', data.service5);
  await page.type('input[name="service5_desc"]', data.service5desc);
  await page.type('input[name="service6_name"]', data.service6);
  await page.type('input[name="service6_desc"]', data.service6desc);

  // ── SECTION 5: Areas ──
  await openSection(page, 5);
  await page.type('input[name="area1"]', data.area1);
  await page.type('input[name="area2"]', data.area2);
  await page.type('input[name="area3"]', data.area3);

  // ── SECTION 6: Reviews ──
  await openSection(page, 6);
  await page.type('input[name="review_link"]', data.reviewLink);
  await page.type('input[name="star_rating"]', data.starRating);
  await page.type('input[name="review_count"]', data.reviewCount);

  // ── SECTION 7: Colors ──
  await openSection(page, 7);
  await page.click('.color-option:first-child');
  await clickYN(page, 'has_logo', data.hasLogo);
  await new Promise(r => setTimeout(r, 200));
  if (data.hasLogo === 'yes') {
    await page.type('input[name="logo_link"]', data.logoLink);
  }

  // ── SECTION 8: Final ──
  await openSection(page, 8);
  await clickYN(page, 'has_domain', data.hasDomain);
  await new Promise(r => setTimeout(r, 200));
  if (data.hasDomain === 'yes') {
    await page.type('input[name="domain"]', data.domain);
  }
  await page.type('input[name="facebook"]', data.facebook);
  await page.type('input[name="instagram"]', data.instagram);
  await page.type('input[name="yelp"]', data.yelp);
  await page.type('textarea[name="notes"]', data.notes);

  console.log('All fields filled');
  await page.screenshot({ path: `${SCREENSHOT_DIR}/test-${lang}-before-submit.png` });

  // ── Submit ──
  await page.click('.btn-submit');
  console.log('Submitted, waiting for response...');

  await page.waitForFunction(() => {
    const btn = document.querySelector('.btn-submit');
    return btn && (
      btn.textContent.includes('Submitted') ||
      btn.textContent.includes('Enviado') ||
      btn.textContent.includes('went wrong') ||
      btn.textContent.includes('salió mal')
    );
  }, { timeout: 15000 });

  const btnText = await page.$eval('.btn-submit', el => el.textContent.trim());
  const success = btnText.includes('Submitted') || btnText.includes('Enviado');
  console.log(`${success ? '✅ PASS' : '❌ FAIL'} — "${btnText}"`);

  await page.screenshot({ path: `${SCREENSHOT_DIR}/test-${lang}-after-submit.png` });
  await browser.close();
  return { lang, success, btnText };
}

// ── EN Test Data ──
const enData = {
  businessName: 'Smith Electric',
  trade: 'Electrician',
  ownerName: 'John Smith',
  phone: '(214) 555-0100',
  email: 'john@smithelectric.com',
  city: 'Dallas, TX',
  existingSite: 'https://smithelectric.com',
  yearStarted: '2010',
  hours: 'Mon-Fri 7am-6pm, Sat 8am-2pm',
  emergencyService: 'yes',
  license1: 'TECL-123456',
  license2: 'TECL-789012',
  languages: 'English, Spanish',
  financing: 'yes',
  financingDetails: '0% financing on jobs over $500',
  paymentMethods: ['Cash', 'Credit/Debit', 'Venmo/Zelle'],
  guarantee: '100% satisfaction guaranteed',
  about: 'Family-owned electrical company serving Dallas for over 14 years. We specialize in residential panel upgrades and new construction wiring.',
  diff1: 'Same-day service available',
  diff2: 'Licensed and insured master electricians',
  diff3: 'Upfront pricing — no surprises',
  stat1num: '500+', stat1label: 'Jobs Completed',
  stat2num: '14', stat2label: 'Years in Business',
  stat3num: '4.9', stat3label: 'Star Rating',
  service1: 'Panel Upgrades', service1desc: 'Full 200-amp panel upgrades for older homes',
  service2: 'Outlet Installation', service2desc: 'New outlets, GFCI, and USB outlets installed',
  service3: 'EV Charger Installation', service3desc: 'Level 2 home EV charger installation for all vehicle brands',
  service4: 'Lighting Installation', service4desc: 'Interior and exterior lighting design and installation',
  service5: 'Ceiling Fan Installation', service5desc: 'New ceiling fan wiring and installation in any room',
  service6: 'Generator Installation', service6desc: 'Whole-home standby generator hookup and transfer switch',
  area1: 'Dallas', area2: 'Plano', area3: 'Irving',
  reviewLink: 'https://g.page/r/test-link',
  starRating: '4.9', reviewCount: '214 reviews',
  hasLogo: 'yes', logoLink: 'https://drive.google.com/test-logo',
  hasDomain: 'yes', domain: 'smithelectric.com',
  facebook: 'https://facebook.com/smithelectric',
  instagram: 'https://instagram.com/smithelectric',
  yelp: 'https://yelp.com/biz/smith-electric',
  notes: 'Please use a clean, professional look. We like the style of our competitor at abcelectric.com.',
};

// ── ES Test Data ──
const esData = {
  businessName: 'García Electricidad',
  trade: 'Electricista',
  ownerName: 'Carlos García',
  phone: '(214) 555-0200',
  email: 'carlos@garciaelectricidad.com',
  city: 'Dallas, TX',
  existingSite: 'https://garciaelectricidad.com',
  yearStarted: '2015',
  hours: 'Lun-Vie 7am-6pm, Sáb 8am-2pm',
  emergencyService: 'yes',
  license1: 'TECL-654321',
  license2: '',
  languages: 'Español, Inglés',
  financing: 'yes',
  financingDetails: '0% financiamiento en trabajos mayores a $500',
  paymentMethods: ['Cash', 'Credit/Debit', 'Venmo/Zelle'],
  guarantee: 'Satisfacción 100% garantizada',
  about: 'Empresa familiar de electricidad sirviendo a Dallas por más de 9 años. Nos especializamos en actualizaciones de tablero eléctrico y cableado residencial.',
  diff1: 'Servicio el mismo día disponible',
  diff2: 'Electricistas maestros con licencia y seguro',
  diff3: 'Precios transparentes — sin sorpresas',
  stat1num: '300+', stat1label: 'Trabajos Completados',
  stat2num: '9', stat2label: 'Años en el Negocio',
  stat3num: '4.8', stat3label: 'Calificación',
  service1: 'Actualización de Tablero Eléctrico', service1desc: 'Actualizaciones completas de tablero de 200 amperios',
  service2: 'Instalación de Contactos', service2desc: 'Contactos nuevos, GFCI y puertos USB instalados',
  service3: 'Instalación de Cargador Eléctrico', service3desc: 'Instalación de cargador de nivel 2 para todo tipo de vehículos',
  service4: 'Instalación de Iluminación', service4desc: 'Diseño e instalación de iluminación interior y exterior',
  service5: 'Instalación de Ventiladores de Techo', service5desc: 'Cableado e instalación de ventiladores de techo en cualquier habitación',
  service6: 'Instalación de Generador', service6desc: 'Conexión de generador para toda la casa e interruptor de transferencia',
  area1: 'Dallas', area2: 'Plano', area3: 'Irving',
  reviewLink: 'https://g.page/r/test-link-es',
  starRating: '4.8', reviewCount: '98 reseñas',
  hasLogo: 'yes', logoLink: 'https://drive.google.com/test-logo-es',
  hasDomain: 'yes', domain: 'garciaelectricidad.com',
  facebook: 'https://facebook.com/garciaelectricidad',
  instagram: 'https://instagram.com/garciaelectricidad',
  yelp: 'https://yelp.com/biz/garcia-electricidad',
  notes: 'Por favor usar un diseño limpio y profesional. Nos gusta el estilo de nuestro competidor en xyzelectrico.com.',
};

const results = [];
results.push(await testForm({ url: 'https://firebreakdigital.com/intake-form-EN.html', lang: 'EN', data: enData }));
results.push(await testForm({ url: 'https://firebreakdigital.com/intake-form-ES.html', lang: 'ES', data: esData }));

console.log('\n=== RESULTS ===');
for (const r of results) {
  console.log(`${r.lang}: ${r.success ? '✅ PASS' : '❌ FAIL'} — "${r.btnText}"`);
}
