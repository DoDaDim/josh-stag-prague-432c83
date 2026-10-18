/* Josh's Stag — Prague. All content lives in DATA (edit here).
   Source of truth: /workspace/stag-do/itinerary.txt (+ venue official sites where noted).
   Anything not in the itinerary is 'TBC'. */
const DATA = {
  title: "Josh Stag",
  stag: "Josh Smith",
  city: "Prague",
  tz: "Europe/Prague",
  // Confirmed by David: Friday 30 October 2026, arriving ~3PM Prague time (CET, UTC+1 after 25 Oct).
  // Set to null to show 'Date TBC'.
  startDate: "2026-10-30T15:00:00+01:00",
  startLabel: "arriving ~3PM",
  // "What’s next" display logic (not itinerary facts). A timed item is "Now" for nowHours
  // (capped at maxNowHours, and never past the next item's start). Untimed items get a
  // display window via `win: [dayOffset, "HH:MM"]` and run until the next item starts.
  whatsNext: { nowHours: 2, maxNowHours: 3 },
  // Display logic only (not an itinerary fact): from this point the page says the trip is over.
  wrapUpAfter: "2026-11-01T12:00:00+01:00",
  departure: "TBC",

  arrival: {
    text: "Arrive Friday 30th.",
    flight: "Manchester Lot should land at 3PM*.",
    asteriskNote: "TBC — the itinerary has an asterisk on 3PM but no footnote.",
    warning: "Andre has let us know that his friends went recently and they suffered a long time getting through passport control in Prague.",
    aim: "The aim is to get to the apartment, choose beds and then go for food around the corner."
  },

  hq: {
    name: "Two-Bedroom Apartment with Terrace H2",
    address: "Hybernská 26, Prague, 110 00, Czech Republic",
    moreInfo: "https://www.booking.com/hotel/cz/prague4you-apartment.en-gb.html#RD124616401",
    rooms: [
      { room: "Bedroom 1", beds: "3 single beds, 1 bunk bed & 1 large double bed" },
      { room: "Bedroom 2", beds: "2 single beds" },
      { room: "Living room", beds: "1 sofa bed" }
    ],
    placeId: "hq"
  },

  days: [
    {
      id: "fri", label: "Friday", dayOfMonth: "30th", offset: 0,
      events: [
        { id: "land", time: "15:00", timeLabel: "3PM*", title: "Manchester Lot lands", place: "airport", booked: null, bookable: false, nowHours: 1,
          lines: ["Manchester Lot should land at 3PM*.", "Andre has let us know that his friends went recently and they suffered a long time getting through passport control in Prague."],
          tbc: ["The * after 3PM isn’t explained", "Flight number / terminal TBC"] },
        { id: "hq-arrive", time: null, win: [0, "16:00"], timeLabel: "After landing (time TBC)", title: "Getting to Stag HQ / choose beds", place: "hq", booked: null, bookable: false,
          lines: ["The aim is to get to the apartment, choose beds and then go for food around the corner."],
          address: "Hybernská 26, Prague, 110 00, Czech Republic" },
        { id: "souvlaki", time: "19:00", timeLabel: "7PM", title: "Greek feast — Souvlaki Bar", place: "souvlaki", booked: true,
          lines: ["Meal Booked at 7PM. Booked", "Restaurant: Greek - Souvlaki Bar", "Josh in a fancy dress Greek empire outfit.", "We’ll all be out wearing Greek crowns."],
          address: "Dlážděná 1586/4, 110 00 Praha 1-Nové Město, Czechia", menu: "souvlaki" },
        { id: "beertap", time: "21:00", timeLabel: "9PM", title: "Praha Beer Tap", place: "thepub", booked: true,
          lines: ["Have to be there at 9PM.", "Pour your own beers, the tap never stops.", "Two tables of 6 reserved.", "Josh might need to get a cab here, it’s about a 15 minute walk from the Greek place."],
          link: { label: "thepub.cz/praha-1", url: "https://www.thepub.cz/praha-1" },
          address: "Veleslavínova 59/3, 110 00 Praha 1", addressSource: "Not in itinerary — taken from thepub.cz/praha-1 (official site)" },
        { id: "fri-late", time: null, win: [0, "23:00"], timeLabel: "Late (time TBC)", title: "After that… freestyle", place: null, booked: null, bookable: false,
          lines: ["No plan after this, but we are right in town."],
          tbc: ["The itinerary line ends “Do what” — rest of the sentence TBC"] }
      ]
    },
    {
      id: "sat", label: "Saturday", dayOfMonth: null, offset: 1,
      events: [
        { id: "morning", time: null, win: [1, "03:00"], timeLabel: "Morning", title: "Morning free — heal those heads", place: null, booked: null, bookable: false,
          lines: ["Morning free to allow sore heads to heal, sort yourself out for breakfast and a light lunch.", "We’ll be getting some food after the Pilsner Experience."] },
        { id: "swap", time: null, win: [1, "12:00"], timeLabel: "Before 1PM (time TBC)", title: "Get dressed, T-shirt swap at Stag HQ", place: "hq", booked: null, bookable: false,
          lines: ["We have to get dressed prior to the experience, from there we are out.", "Meet at Stag HQ for T-shirt swap."],
          address: "Hybernská 26, Prague, 110 00, Czech Republic", jump: "#rules",
          tbc: ["Meeting time TBC", "Order TBC: the rules say picking happens “after the activity”"] },
        { id: "pilsner", time: "13:00", timeLabel: "1PM", title: "Pilsner Urquell Experience", place: "pilsner", booked: true,
          lines: ["Pilsner Urquell Experience at 1PM Booked"],
          address: "28. října 377/13, 110 00 Praha 1", addressSource: "Not in itinerary — taken from pilsnerexperience.com (official site)" },
        { id: "kozlovna", time: "16:00", timeLabel: "4PM", title: "Stop One: Kozlovna Apropos", place: "kozlovna", booked: true,
          lines: ["Stop One Food: traditional Czech food at 4PM.", "About a 6 minute walk from the Pilsner Experience.", "Goulash, pork knuckle.", "Booked."],
          link: { label: "kozlovna-apropos.cz", url: "https://www.kozlovna-apropos.cz//" },
          address: "Křižovnická 4, 110 00 Praha 1", addressSource: "Not in itinerary — taken from kozlovna-apropos.cz (official site)", menu: "kozlovna" },
        { id: "rocky", time: "18:00", timeLabel: "6PM", title: "Stop Two: Rocky O’Reilly’s", place: "rocky", booked: false,
          lines: ["Stop Two Rocky O’Reilly’s 6PM - Not booked", "Watching Spurs v Palace"],
          match: { label: "Spurs v Crystal Palace", kickoff: "5.30pm UK = 6.30pm Prague time", note: "Premier League, Sat 31 Oct 2026, on Sky Sports",
            source: "https://www.premierleague.com/en/news/4688862/fixture-amendments-for-premier-league-matches-in-october-and-november" },
          address: "Štěpánská 32, 110 00 Praha 1", addressSource: "Not in itinerary — taken from rockyoreillys.cz (official site)" },
        { id: "lokal", time: "20:30", timeLabel: "8.30PM", title: "Stop Three: Lokál Dlouhááá", place: "lokal", booked: true,
          lines: ["Stop Three: The Traditional Czech Tank Beer Interlude at 8.30PM — Lokál Dlouhááá BOOKED"],
          address: "Dlouhá 33, 110 00 Praha 1", addressSource: "Not in itinerary — taken from lokal-dlouha.ambi.cz (official site)" },
        { id: "stop4", time: null, win: [1, "22:30"], winEnd: [2, "04:00"], timeLabel: "Later (time TBC)", title: "Stop Four: Wherever you want", place: null, booked: null, bookable: false,
          lines: ["Stop Four: Wherever you want."] }
      ]
    }
  ],

  tshirt: {
    intro: "It’s random T-shirt night. Rules are simple:",
    rules: [
      "Everyone brings one random T-shirt (or shirt), size XL.",
      "Maximum budget: £15.",
      "It can be as funny, weird or ridiculous as you like, but keep it in reasonable taste. No racism. No sexism. No homophobia. The big three."
    ],
    how: [
      "Bring your T-shirt in a taped-up plastic bag so nobody can see what it is.",
      "We’ll chuck them all into a bin bag, and after the activity we’ll each take turns picking one at random.",
      "Once you’ve picked, disappear, get changed, then make your grand re-entrance. No swapping.",
      "Josh picks last so he can witness the sheer ridiculousness of what people have picked previously.",
      "Josh will also have another outfit to wear on top."
    ],
    spares: "David is bringing a few spares and some XXL for the big lads."
  },

  attendees: ["Josh (the stag)", "Nat", "Smith Snr", "David (organiser)", "Joe", "Andre", "James G", "James S", "Azza (Aaron Cummins)", "Connor", "Phil", "Konnor"],

  // Menus: highlights copied verbatim from the official menu pages (fetched 18 Oct 2026). Prices may change.
  menus: {
    souvlaki: {
      url: "https://souvlakibar.cz/online-menu", fetched: "2026-10-18",
      items: [
        { name: "SOUVLAKI MIX - náš tip", desc: "kuřecí a vepřové maso na špejli, domácí hranolky, tzatziki", price: "379 Kč" },
        { name: "GYROS CHIRINOS MERIDA", desc: "vepřový gyros, domácí hranolky, tzatziki", price: "359 Kč" },
        { name: "BIFTEKI GEMISTO – náš tip", desc: "mleté hovězí maso na grilu, feta, domácí hranolky, tzatziki", price: "375 Kč" },
        { name: "SOUVLAKI BAR MIX GRILL – pro 2 osoby", desc: "gyros kuřecí a vepřový, souvlaki kuřecí a vepřové, domácí hranolky, pita chléb, tzatziki", price: "859 Kč" }
      ]
    },
    kozlovna: {
      url: "https://www.kozlovna-apropos.cz/en/menu/", fetched: "2026-10-18",
      items: [
        { name: "Old Bohemian beef beer goulash served with dumplings", desc: "200g", price: "315,-" },
        { name: "Pork Knuckle baked in dark beer, horseradish, mustard, bread", desc: "1000g", price: "485,-" },
        { name: "Goulash soup with beef, served in bread", desc: "1.8dcl", price: "195,-" },
        { name: "Svíčková - beef meat with cream sauce, cranberries, dumplings", desc: "150g", price: "330,-" }
      ]
    }
  },

  // Map pins: geocoded with Nominatim (OSM) on 18 Oct 2026, cross-checked with the address on the official site.
  places: [
    { id: "hq", name: "Stag HQ — Two-Bedroom Apartment with Terrace H2", address: "Hybernská 26, 110 00 Praha 1", lat: 50.0871415, lng: 14.4340032,
      source: "Nominatim: house 1010/26 Hybernská (address from itinerary)" },
    { id: "souvlaki", name: "Souvlaki Bar", address: "Dlážděná 1586/4, 110 00 Praha 1", lat: 50.0866942, lng: 14.4322339,
      source: "Nominatim: house 1586/4 Dlážděná (itinerary address = souvlakibar.cz)" },
    { id: "thepub", short: "Praha Beer Tap", name: "Praha Beer Tap (The PUB Praha 1)", address: "Veleslavínova 59/3, 110 00 Praha 1", lat: 50.0879602, lng: 14.4159810,
      source: "Nominatim: house 59/3 Veleslavínova (address from thepub.cz/praha-1)" },
    { id: "pilsner", name: "Pilsner Urquell Experience", address: "28. října 377/13, 110 00 Praha 1", lat: 50.0839806, lng: 14.4229148,
      source: "Nominatim: house 377/13 28. října (address from pilsnerexperience.com)" },
    { id: "kozlovna", name: "Kozlovna Apropos", address: "Křižovnická 4, 110 00 Praha 1", lat: 50.0873825, lng: 14.4153006,
      source: "Nominatim: house 87/4 Křižovnická (address from kozlovna-apropos.cz)" },
    { id: "rocky", name: "Rocky O’Reilly’s", address: "Štěpánská 32, 110 00 Praha 1", lat: 50.0795311, lng: 14.4259506,
      source: "Nominatim: house 620/32 Štěpánská (address from rockyoreillys.cz)" },
    { id: "lokal", name: "Lokál Dlouhááá", address: "Dlouhá 33, 110 00 Praha 1", lat: 50.0906955, lng: 14.4257576,
      source: "Nominatim: OSM POI 'Lokál Dlouhááá' at Dlouhá 731/33 (address from lokal-dlouha.ambi.cz)" },
    { id: "airport", name: "Václav Havel Airport Prague", address: "Letiště Václava Havla Praha", lat: 50.1020451, lng: 14.2705663,
      source: "Nominatim: aerodrome centroid (terminal TBC)" }
  ],

  // Art slots: flip to true when Ghost Game - Art drops the file into assets/art/ (avoids 404 probes).
  art: {
    "assets/art/hero-bg.jpg": true,          // Art batch 1: backdrop behind the cartoon hero
    "assets/art/laurel-frame.png": true,     // Art batch 1: oval wreath around the Meet the Stag photos
    "assets/art/laurel-crown.png": true,     // Art batch 1: used on Josh's attendee card
    "assets/art/divider-laurel.png": true,   // Art batch 1
    "assets/art/scroll-bg.png": true,        // Art batch 1: T-shirt rules parchment
    "assets/art/cockerel.png": true,         // Art batch 1: still
    "assets/art/cockerel-strip.png": true,   // Art batch 1: 8 x 256px frames, 8fps
    "assets/art/foam-top.png": true,         // Art batch 2: beer-foam dividers between sections
    "assets/art/foam-bottom.png": true       // Art batch 2: footer foam
  },
  // UI icons (Art batch 2): assets/art/ui-<file>-48.png; set a value to null to fall back to the emoji
  uiIcons: { bed: "bed", tshirt: "tshirt", beer: "beer", pin: "map-pin", clock: "clock" },
  // Stop icons delivered by Art (assets/icons/icon-<name>-128.png)
  icons: { land: "arrival", "hq-arrive": "stag-hq", souvlaki: "souvlaki", beertap: "beer-tap", "fri-late": "wildcard", morning: "recovery",
    swap: "tshirt-swap", pilsner: "pilsner", kozlovna: "goulash", rocky: "rocky-oreillys", lokal: "tank-beer", stop4: "wildcard" },

  // Pixel nudges so close-together pins don't overlap (a small dot marks the true spot)
  pinNudge: { kozlovna: [-18, 12], thepub: [16, -12], hq: [10, 18], souvlaki: [-16, -8] },
  pinIcons: { hq: "stag-hq", souvlaki: "souvlaki", thepub: "beer-tap", pilsner: "pilsner", kozlovna: "goulash", rocky: "rocky-oreillys", lokal: "tank-beer", airport: "arrival" },

  toasts: ["Hail, Emperor Josh!", "Na zdraví!", "Opa!", "All hail the stag!", "One more round, Caesar?"],
  spursLine: "COYS — Come On You Stag!"
};

/* ---------------- helpers ---------------- */
const $ = (s, r = document) => r.querySelector(s);
const el = (tag, attrs = {}, ...kids) => {
  const n = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v == null || v === false) continue;
    if (k === "class") n.className = v; else if (k === "text") n.textContent = v;
    else if (k.startsWith("on")) n.addEventListener(k.slice(2), v); else n.setAttribute(k, v);
  }
  for (const k of kids.flat()) if (k != null) n.append(k.nodeType ? k : document.createTextNode(k));
  return n;
};
const mapsSearch = (addr) => "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(addr);
const mapsDir = (p) => `https://www.google.com/maps/dir/?api=1&destination=${p.lat},${p.lng}`;
const placeById = (id) => DATA.places.find((p) => p.id === id);
const reduceMotion = () => window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

const params = new URLSearchParams(location.search);
// Test-only overrides: ?now=ISO and ?start=ISO|null
if (params.has("start")) { const s = params.get("start"); DATA.startDate = (s === "null" || s === "") ? null : s; }
function nowMs() {
  const n = params.get("now");
  if (n) { const t = Date.parse(n); if (!isNaN(t)) return t + (performance.now() - BOOT); }
  return Date.now();
}
const BOOT = performance.now();

// Wall-clock parts in Prague for an instant
function pragueParts(ms) {
  const f = new Intl.DateTimeFormat("en-GB", { timeZone: DATA.tz, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23" });
  const o = {}; for (const p of f.formatToParts(new Date(ms))) o[p.type] = p.value;
  return { y: +o.year, m: +o.month, d: +o.day, h: +o.hour, mi: +o.minute, s: +o.second };
}
// Prague wall time -> UTC ms (DST-safe)
function pragueToUtc(y, m, d, h, mi) {
  let guess = Date.UTC(y, m - 1, d, h, mi);
  for (let i = 0; i < 2; i++) {
    const p = pragueParts(guess);
    const asUtc = Date.UTC(p.y, p.m - 1, p.d, p.h, p.mi);
    guess += Date.UTC(y, m - 1, d, h, mi) - asUtc;
  }
  return guess;
}
function startInfo() {
  if (!DATA.startDate) return null;
  const ms = Date.parse(DATA.startDate);
  if (isNaN(ms)) return null;
  const p = pragueParts(ms);
  return { ms, y: p.y, m: p.m, d: p.d };
}
function dayDate(day) { // returns {y,m,d} for a day or null
  const s = startInfo(); if (!s) return null;
  const t = new Date(Date.UTC(s.y, s.m - 1, s.d + day.offset));
  return { y: t.getUTCFullYear(), m: t.getUTCMonth() + 1, d: t.getUTCDate() };
}
function eventMs(day, ev) {
  const dd = dayDate(day); if (!dd || !ev.time) return null;
  const [h, mi] = ev.time.split(":").map(Number);
  return pragueToUtc(dd.y, dd.m, dd.d, h, mi);
}
function dayHeading(day) {
  const dd = dayDate(day);
  if (!dd) return day.label + (day.dayOfMonth ? " " + day.dayOfMonth : "") + " · date TBC";
  const dt = new Date(Date.UTC(dd.y, dd.m - 1, dd.d, 12));
  return new Intl.DateTimeFormat("en-GB", { timeZone: "UTC", weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(dt);
}

/* ---------------- render ---------------- */
function badge(booked) {
  if (booked === true) return el("span", { class: "badge ok" }, "✔ Booked");
  if (booked === false) return el("span", { class: "badge no" }, "✖ Not booked");
  return el("span", { class: "badge tbc" }, "Booking TBC");
}

function renderTimeline() {
  const wrap = $("#timeline-days");
  for (const day of DATA.days) {
    const sec = el("section", { class: "day", id: "day-" + day.id });
    sec.append(el("h3", { class: "day-h" }, dayHeading(day)));
    for (const ev of day.events) {
      const place = ev.place ? placeById(ev.place) : null;
      const bodyId = "ev-body-" + ev.id;
      const head = el("button", { class: "card-head", "aria-expanded": "false", "aria-controls": bodyId, type: "button" },
        DATA.icons[ev.id] ? el("img", { class: "ico", src: `assets/icons/icon-${DATA.icons[ev.id]}-128.png`, alt: "", width: "40", height: "40", loading: "lazy" }) : null,
        el("span", { class: "time" }, ev.timeLabel || "TBC"),
        el("span", { class: "ttl" }, ev.title),
        ev.bookable === false ? null : badge(ev.booked),
        el("span", { class: "chev", "aria-hidden": "true" }, "▾"));
      const body = el("div", { class: "card-body", id: bodyId, hidden: "" });
      body.append(el("ul", { class: "quote" }, ev.lines.map((l) => el("li", {}, l))));
      if (ev.match) body.append(el("p", { class: "match" }, "⚽ ", el("strong", {}, ev.match.label), " · kick-off " + (ev.match.kickoff || "time TBC"), el("br"), el("small", {}, ev.match.note + " · "), el("a", { href: ev.match.source, target: "_blank", rel: "noopener" }, el("small", {}, "fixture source"))));
      if (ev.tbc) body.append(el("p", { class: "tbc-note" }, el("strong", {}, "TBC: "), ev.tbc.join(" · ")));
      const actions = el("div", { class: "actions" });
      if (ev.address) {
        body.append(el("p", { class: "addr" }, "📍 ", ev.address, ev.addressSource ? el("small", {}, ev.addressSource) : null));
        actions.append(el("a", { class: "btn maps", href: mapsSearch(ev.address), target: "_blank", rel: "noopener" }, el("span", { class: "ui", "data-ui": "pin" }, "📍"), " Google Maps"));
      } else if (ev.place === "airport") {
        actions.append(el("a", { class: "btn maps", href: mapsSearch("Václav Havel Airport Prague"), target: "_blank", rel: "noopener" }, el("span", { class: "ui", "data-ui": "pin" }, "📍"), " Google Maps"));
      }
      if (place) actions.append(el("a", { class: "btn showmap", href: "#map", "data-place": place.id, onclick: (e) => { e.preventDefault(); showOnMap(place.id); } }, el("span", { class: "ui", "data-ui": "pin" }, "📍"), " Show on map"));
      if (ev.link) actions.append(el("a", { class: "btn ghost", href: ev.link.url, target: "_blank", rel: "noopener" }, ev.link.label));
      if (ev.jump) actions.append(el("a", { class: "btn ghost", href: ev.jump }, "T-shirt rules"));
      if (ev.time) body.prepend(el("p", { class: "when" }, el("span", { class: "ui", "data-ui": "clock" }, "🕰"), " " + ev.timeLabel + " (Prague time)"));
      if (ev.menu) {
        const m = DATA.menus[ev.menu];
        actions.append(el("a", { class: "btn menu", href: m.url, target: "_blank", rel: "noopener" }, "See the menu"));
        body.append(el("div", { class: "menu-hl" },
          el("h4", {}, "Menu highlights"),
          el("ul", {}, m.items.map((i) => el("li", {}, el("span", { class: "dish" }, i.name, i.desc ? el("small", {}, " — " + i.desc) : null), el("span", { class: "price" }, i.price)))),
          el("small", { class: "src" }, `Copied from the official menu (${m.fetched}). Prices may change.`)));
      }
      body.append(actions);
      const card = el("article", { class: "card ev", id: "ev-" + ev.id, "data-ev": ev.id }, head, body);
      head.addEventListener("click", () => toggleCard(card));
      sec.append(card);
    }
    wrap.append(sec);
  }
}
function toggleCard(card, force) {
  const head = $(".card-head", card), body = $(".card-body", card);
  const open = force != null ? force : head.getAttribute("aria-expanded") !== "true";
  head.setAttribute("aria-expanded", String(open));
  body.hidden = !open; card.classList.toggle("open", open);
}

function renderHQ() {
  const hq = DATA.hq;
  $("#hq-name").textContent = hq.name;
  $("#hq-addr").textContent = hq.address;
  $("#hq-info").href = hq.moreInfo;
  $("#hq-rooms").append(...hq.rooms.map((r) => el("li", {}, el("strong", {}, r.room + ": "), r.beds)));
}
function renderRules() {
  const t = DATA.tshirt;
  $("#rules-intro").textContent = t.intro;
  $("#rules-list").append(...t.rules.map((r) => el("li", {}, r)));
  $("#rules-how").append(...t.how.map((r) => el("li", {}, r)));
  $("#rules-spares").textContent = t.spares;
}
function renderAttendees() {
  $("#att-count").textContent = DATA.attendees.length;
  $("#att-list").append(...DATA.attendees.map((n, i) => el("li", { class: i === 0 ? "stag" : "" }, i === 0 ? el("span", { class: "crown", "aria-hidden": "true" }, "👑 ") : null, n)));
}

/* ---------------- countdown & what's next ---------------- */
function fmtPrague(ms, opts) { return new Intl.DateTimeFormat("en-GB", Object.assign({ timeZone: DATA.tz }, opts)).format(new Date(ms)); }
function tickCountdown() {
  const box = $("#countdown"), label = $("#cd-label");
  const s = startInfo();
  if (!s) { box.dataset.state = "tbc"; $("#cd-digits").hidden = true; label.textContent = "Date TBC"; $("#cd-sub").textContent = "Friday 30th — month being confirmed"; return; }
  const now = nowMs(), diff = s.ms - now;
  $("#cd-sub").textContent = fmtPrague(s.ms, { weekday: "long", day: "numeric", month: "long", year: "numeric" }) + " · " + DATA.startLabel + " (Prague time)";
  if (diff > 0) {
    box.dataset.state = "counting"; $("#cd-digits").hidden = false; label.textContent = "Until we land in Prague";
    const sec = Math.floor(diff / 1000);
    const parts = { d: Math.floor(sec / 86400), h: Math.floor(sec % 86400 / 3600), m: Math.floor(sec % 3600 / 60), s: sec % 60 };
    for (const k in parts) $("#cd-" + k).textContent = String(parts[k]).padStart(k === "d" ? 1 : 2, "0");
  } else {
    $("#cd-digits").hidden = true;
    const wrap = Date.parse(DATA.wrapUpAfter);
    if (!isNaN(wrap) && now >= wrap) { box.dataset.state = "over"; label.textContent = "That’s a wrap — Josh survived (probably)"; }
    else { box.dataset.state = "live"; label.textContent = "We’re in Prague! 🍺"; }
  }
}
function winMs(w) { // [dayOffset, "HH:MM"] in Prague time -> ms
  const s = startInfo(); if (!s || !w) return null;
  const t = new Date(Date.UTC(s.y, s.m - 1, s.d + w[0]));
  const [h, mi] = w[1].split(":").map(Number);
  return pragueToUtc(t.getUTCFullYear(), t.getUTCMonth() + 1, t.getUTCDate(), h, mi);
}
function itemStart(day, ev) { return ev.time ? eventMs(day, ev) : winMs(ev.win); }
// Ordered schedule with display windows [ms, end)
function schedule() {
  const W = DATA.whatsNext, H = 3600000, out = [];
  for (const day of DATA.days) for (const ev of day.events) { const ms = itemStart(day, ev); if (ms != null) out.push({ day, ev, ms }); }
  out.sort((a, b) => a.ms - b.ms);
  const wrap = Date.parse(DATA.wrapUpAfter);
  out.forEach((x, i) => {
    const next = out[i + 1] ? out[i + 1].ms : (x.ev.winEnd ? winMs(x.ev.winEnd) : wrap);
    x.end = x.ev.time ? Math.min(next, x.ms + Math.min(x.ev.nowHours || W.nowHours, W.maxNowHours) * H) : next;
  });
  return out;
}
function whatsNextAt(now) {
  const list = schedule();
  return { list, current: list.find((x) => x.ms <= now && now < x.end) || null, upcoming: list.find((x) => x.ms > now) || null };
}
function fmtIn(ms) {
  const mins = Math.round(ms / 60000);
  if (mins < 60) return mins + " min";
  const h = Math.floor(mins / 60), m = mins % 60;
  return m ? `${h}h ${m}m` : `${h}h`;
}
const lc1 = (t) => /^[A-Z][a-z]/.test(t) ? t[0].toLowerCase() + t.slice(1) : t;
function whenLabel(x) { return `${x.day.label} · ${lc1(x.ev.timeLabel)}`; }
function updateNext() {
  const box = $("#next"), t = $("#next-title"), m = $("#next-meta"), d = $("#next-detail");
  document.querySelectorAll(".card.now").forEach((c) => c.classList.remove("now"));
  const s = startInfo();
  $("#next-clock").textContent = "Prague time now: " + fmtPrague(nowMs(), { weekday: "short", day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
  let target = null, state;
  if (!s) {
    state = "tbc"; t.textContent = "Arrive Friday 30th"; m.textContent = "Date TBC"; d.textContent = DATA.arrival.flight;
    target = "land";
  } else {
    const now = nowMs(), wrap = Date.parse(DATA.wrapUpAfter);
    const { list, current, upcoming } = whatsNextAt(now);
    const nextBit = (u) => u ? `${u.ev.title} · ${whenLabel(u)}${u.ev.time ? " · in " + fmtIn(u.ms - now) : ""}` : "Departure: " + DATA.departure;
    if (now >= wrap) { state = "after"; t.textContent = "The stag has flown 🦌"; m.textContent = "Trip over"; d.textContent = "Hope the heads have healed. Same time next year?"; }
    else if (now >= list[list.length - 1].end) { state = "wrap"; t.textContent = "That’s a wrap 🍻"; m.textContent = "Departure " + DATA.departure; d.textContent = "Last stop done. Departure details are still TBC."; }
    else if (now < list[0].ms) {
      state = "before"; const u = upcoming; t.textContent = u.ev.title; target = u.ev.id;
      m.textContent = "First up · " + fmtPrague(u.ms, { weekday: "short", day: "numeric", month: "short" }) + " · " + u.ev.timeLabel;
      d.textContent = "Pack your XL T-shirt in a taped-up bag. " + u.ev.lines[0];
    } else if (current) {
      state = "now"; t.textContent = current.ev.title; target = current.ev.id;
      m.textContent = "Now · " + whenLabel(current);
      d.textContent = "Then: " + nextBit(upcoming);
    } else {
      state = "between"; t.textContent = upcoming ? upcoming.ev.title : "Wherever you want"; target = upcoming ? upcoming.ev.id : "stop4";
      m.textContent = upcoming ? "Next · " + whenLabel(upcoming) + (upcoming.ev.time ? " · in " + fmtIn(upcoming.ms - now) : "") : "";
      d.textContent = "Between stops: grab a drink, find the loo.";
    }
  }
  box.dataset.state = state; nowrapTshirt(box);
  const go = $("#next-go");
  if (target) { go.hidden = false; go.dataset.target = target; const c = $("#ev-" + target); if (c) c.classList.add("now"); } else go.hidden = true;
}

/* ---------------- map ---------------- */
let map = null; const markers = {};
function renderPlaceList(container) {
  container.append(el("ol", { class: "place-list" }, DATA.places.map((p) => el("li", { id: "pl-" + p.id, "data-place": p.id },
    DATA.pinIcons[p.id] ? el("img", { class: "ico", src: `assets/icons/icon-${DATA.pinIcons[p.id]}-128.png`, alt: "", width: "32", height: "32" }) : null,
    el("strong", {}, p.name), el("br"), el("small", {}, p.address), " ",
    el("a", { class: "dir", href: mapsDir(p), target: "_blank", rel: "noopener" }, "Directions")))));
}
function initMap() {
  const holder = $("#map");
  renderPlaceList($("#map-list"));
  if (!window.L) { $("#map-all").hidden = true; holder.classList.add("offline"); holder.textContent = "Map unavailable offline — here’s the list of places instead 👇"; $("#map-list").classList.add("show"); return; }
  try {
    map = L.map(holder, { scrollWheelZoom: false, tap: true, zoomSnap: 0.25 });
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }).addTo(map);
    const emoji = (p) => p.id === "hq" ? "🏛" : p.id === "airport" ? "✈" : "🍺";
    const icon = (p) => DATA.pinIcons[p.id]
      ? L.divIcon({ className: "pin pin-img pin-" + p.id, html: `<img src="assets/icons/icon-${DATA.pinIcons[p.id]}-128.png" alt="" width="34" height="34" onerror="this.outerHTML='<span>${emoji(p)}</span>'">`, iconSize: [34, 34],
          iconAnchor: [17 - (DATA.pinNudge[p.id] || [0, 0])[0], 17 - (DATA.pinNudge[p.id] || [0, 0])[1]], popupAnchor: [(DATA.pinNudge[p.id] || [0, 0])[0], (DATA.pinNudge[p.id] || [0, 0])[1] - 16] })
      : L.divIcon({ className: "pin pin-" + p.id, html: `<span>${emoji(p)}</span>`, iconSize: [34, 34], iconAnchor: [17, 32], popupAnchor: [0, -28] });
    for (const p of DATA.places) {
      const pop = `<strong>${p.name}</strong><br><small>${p.address}</small><br><a class="dir" href="${mapsDir(p)}" target="_blank" rel="noopener">Directions</a>`;
      if (DATA.pinNudge[p.id]) L.circleMarker([p.lat, p.lng], { radius: 3, color: "#132257", weight: 2, fillColor: "#E6B53C", fillOpacity: 1, interactive: false }).addTo(map);
      markers[p.id] = L.marker([p.lat, p.lng], { icon: icon(p), title: p.name, alt: p.name }).addTo(map).bindPopup(pop);
    }
    fitTown();
    $("#map-all").addEventListener("click", () => { map.closePopup(); map.fitBounds(L.latLngBounds(DATA.places.map((p) => [p.lat, p.lng])).pad(0.1)); });
  } catch (e) { holder.classList.add("offline"); holder.textContent = "Map failed to load — list below."; $("#map-list").classList.add("show"); map = null; }
}
function fitTown() { const town = DATA.places.filter((p) => p.id !== "airport"); map.fitBounds(L.latLngBounds(town.map((p) => [p.lat, p.lng])), { padding: [40, 40] }); }
function showOnMap(id) {
  const sec = $("#map-section");
  sec.scrollIntoView({ behavior: reduceMotion() ? "auto" : "smooth", block: "start" });
  const p = placeById(id);
  if (map && markers[id]) { map.setView([p.lat, p.lng], id === "airport" ? 13 : 17, { animate: !reduceMotion() }); markers[id].openPopup(); }
  else { const li = $("#pl-" + id); if (li) { li.classList.add("flash"); setTimeout(() => li.classList.remove("flash"), 1600); } }
}

/* ---------------- easter eggs ---------------- */
let taps = 0;
function joshTap() {
  taps++;
  const hero = $("#josh"), msg = $("#toast");
  msg.textContent = DATA.toasts[(taps - 1) % DATA.toasts.length];
  msg.classList.remove("show"); void msg.offsetWidth; msg.classList.add("show");
  if (reduceMotion()) return;
  for (const w of [$("#laurel"), $("#josh")]) { w.classList.remove("wobble"); void w.offsetWidth; w.classList.add("wobble"); }
  const layer = $("#fx");
  const r = hero.getBoundingClientRect();
  for (let i = 0; i < 26; i++) {
    const b = el("span", { class: i % 3 ? "bubble" : "confetti" });
    const size = 6 + Math.random() * 14;
    b.style.cssText = `left:${r.left + r.width / 2 + (Math.random() - .5) * r.width}px;top:${r.top + r.height * .8}px;width:${size}px;height:${size}px;--dx:${(Math.random() - .5) * 160}px;--dy:${-(160 + Math.random() * 260)}px;--rot:${Math.random() * 720}deg;animation-delay:${Math.random() * .25}s`;
    if (!(i % 3)) b.style.background = ["#d4a017", "#132257", "#fff", "#e8a33d"][i % 4];
    layer.append(b); setTimeout(() => b.remove(), 2000);
  }
}
let laurelTaps = 0, laurelTimer = 0;
function laurelTap(e) {
  e.stopPropagation();
  laurelTaps++; clearTimeout(laurelTimer); laurelTimer = setTimeout(() => (laurelTaps = 0), 900);
  if (laurelTaps >= 3) { laurelTaps = 0; cockerel(); }
}
function cockerel() {
  const c = $("#cockerel"), line = $("#spurs-line");
  line.textContent = DATA.spursLine;
  c.hidden = false; line.hidden = false;
  c.classList.remove("strut", "crowing"); void c.offsetWidth; c.classList.add("strut");
  clearTimeout(cockerel.c1); clearTimeout(cockerel.c2);
  if (!reduceMotion()) { cockerel.c1 = setTimeout(() => c.classList.add("crowing"), 1600); cockerel.c2 = setTimeout(() => c.classList.remove("crowing"), 2500); }
  else c.classList.add("crowing");
  line.classList.remove("show"); void line.offsetWidth; line.classList.add("show");
  clearTimeout(cockerel.t); cockerel.t = setTimeout(() => { c.hidden = true; line.hidden = true; }, reduceMotion() ? 2500 : 4200);
}

/* ---------------- Art slots: use Art's files if present ---------------- */
function artSlots() {
  document.querySelectorAll("[data-art]").forEach((n) => {
    if (!DATA.art[n.dataset.art]) return;
    const img = new Image();
    img.onload = () => {
      n.classList.add("has-art");
      if (n.tagName === "IMG") { n.src = img.src; n.hidden = false; n.parentElement.classList.add("has-art"); }
      else n.style.backgroundImage = (n.dataset.artOverlay ? n.dataset.artOverlay + ", " : "") + `url("${img.src}")`;
      if (n.classList.contains("cock-strip")) $("#cockerel").classList.add("has-strip");
    };
    img.onerror = () => {}; // keep CSS/SVG fallback
    img.src = n.dataset.art;
  });
}

function uiIcons() {
  document.querySelectorAll("[data-ui]").forEach((n) => {
    const f = DATA.uiIcons[n.dataset.ui]; if (!f) return; // keep emoji fallback
    const img = new Image(); img.alt = ""; img.width = 20; img.height = 20; img.className = "ui-img";
    img.onload = () => { n.textContent = ""; n.append(img); n.classList.add("has-art"); };
    img.src = `assets/art/ui-${f}-48.png`;
  });
  // PWA manifest only over http(s) (file:// can't fetch it)
  if (/^https?:$/.test(location.protocol)) document.head.append(el("link", { rel: "manifest", href: "manifest.webmanifest" }));
}

function nowrapTshirt(root) {
  const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, { acceptNode: (n) => /T-shirt/.test(n.nodeValue) && !n.parentNode.closest(".nw, script, style") ? 1 : 2 });
  const nodes = []; while (w.nextNode()) nodes.push(w.currentNode);
  for (const n of nodes) {
    const frag = document.createDocumentFragment();
    n.nodeValue.split(/(T-shirt)/).forEach((p) => frag.append(p === "T-shirt" ? el("span", { class: "nw" }, p) : p));
    n.replaceWith(frag);
  }
}

/* ---------------- boot ---------------- */
function boot() {
  const setNav = () => document.documentElement.style.setProperty("--nav-h", $(".quick").offsetHeight + "px");
  const navFade = () => { const q = $(".quick"); q.classList.toggle("can-scroll", q.scrollWidth > q.clientWidth + 1 && q.scrollLeft + q.clientWidth < q.scrollWidth - 2); };
  setNav(); navFade(); addEventListener("resize", () => { setNav(); navFade(); }); $(".quick").addEventListener("scroll", navFade, { passive: true });
  DATA.places.filter((p) => !["hq", "airport"].includes(p.id)).forEach((p, i) => {
    if (i) $("#hero-stops").append(el("span", { class: "sep", "aria-hidden": "true" }, " · "));
    $("#hero-stops").append(el("span", { class: "stop" }, p.short || p.name));
  });
  renderTimeline(); renderHQ(); renderRules(); renderAttendees();
  tickCountdown(); updateNext(); initMap(); artSlots(); uiIcons(); nowrapTshirt(document.body);
  setInterval(tickCountdown, 1000); setInterval(updateNext, 30000);
  $("#josh").addEventListener("click", joshTap);
  $("#laurel").addEventListener("click", laurelTap);
  $("#next-go").addEventListener("click", () => { const c = $("#ev-" + $("#next-go").dataset.target); if (c) { toggleCard(c, true); c.scrollIntoView({ behavior: reduceMotion() ? "auto" : "smooth", block: "center" }); } });
  $("#expand-all").addEventListener("click", () => { const cards = document.querySelectorAll(".card.ev"); const anyClosed = [...cards].some((c) => !c.classList.contains("open")); cards.forEach((c) => toggleCard(c, anyClosed)); $("#expand-all").textContent = anyClosed ? "Collapse all" : "Expand all"; });
}
document.addEventListener("DOMContentLoaded", boot);
