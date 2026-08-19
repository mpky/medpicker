/* Mediterranean Island Spinner
 * Real (Natural Earth 50m) coastline baked into js/geo.js, a slot-machine reel
 * of island names, and a zoom-to-island on the map. No runtime dependencies. */
(function () {
  "use strict";

  var SVGNS = "http://www.w3.org/2000/svg";
  var islands = window.ISLANDS;
  var GEO = window.MED_GEO || [];

  // ---- Equirectangular projection (aspect-corrected at mid latitude) ------
  var LON_MIN = -7, LON_MAX = 37, LAT_MIN = 30.5, LAT_MAX = 46;
  var LAT_MID = (LAT_MIN + LAT_MAX) / 2;
  var K_LAT = 32;
  var K_LON = K_LAT * Math.cos(LAT_MID * Math.PI / 180);
  var W = (LON_MAX - LON_MIN) * K_LON;
  var H = (LAT_MAX - LAT_MIN) * K_LAT;

  function projX(lon) { return (lon - LON_MIN) * K_LON; }
  function projY(lat) { return (LAT_MAX - lat) * K_LAT; }

  function el(tag, attrs) {
    var e = document.createElementNS(SVGNS, tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    return e;
  }

  // ---- Build map ----------------------------------------------------------
  var svg = document.getElementById("map");
  svg.setAttribute("viewBox", "0 0 " + W.toFixed(1) + " " + H.toFixed(1));
  document.querySelector(".map-wrap").style.aspectRatio = W.toFixed(1) + " / " + H.toFixed(1);

  var content = el("g", { id: "mapContent" });
  svg.appendChild(content);

  content.appendChild(el("rect", { x: 0, y: 0, width: W, height: H, fill: "var(--sea)" }));

  // faint coordinate graticule (every 5 degrees) — cartographic reference ink
  var grat = el("g");
  content.appendChild(grat);
  for (var glon = -5; glon <= 35; glon += 5) {
    var gx = projX(glon).toFixed(1);
    grat.appendChild(el("line", { x1: gx, y1: 0, x2: gx, y2: H, stroke: "rgba(26,26,23,0.06)", "stroke-width": 0.5 }));
  }
  for (var glat = 30; glat <= 45; glat += 5) {
    var gy = projY(glat).toFixed(1);
    grat.appendChild(el("line", { x1: 0, y1: gy, x2: W, y2: gy, stroke: "rgba(26,26,23,0.06)", "stroke-width": 0.5 }));
  }

  // land
  var landGroup = el("g");
  content.appendChild(landGroup);
  GEO.forEach(function (ring) {
    var d = "";
    for (var i = 0; i < ring.length; i++) {
      d += (i === 0 ? "M" : "L") + projX(ring[i][0]).toFixed(1) + " " + projY(ring[i][1]).toFixed(1) + " ";
    }
    landGroup.appendChild(el("path", { d: d + "Z", fill: "var(--land)", stroke: "var(--land-edge)", "stroke-width": 0.5, "stroke-linejoin": "round" }));
  });

  // sea labels (lon, lat, text, size)
  [[17.5, 34.4, "MEDITERRANEAN SEA", 12], [12.2, 40.0, "Tyrrhenian", 7],
   [18.7, 37.4, "Ionian", 7], [25.2, 37.9, "Aegean", 7], [16.0, 43.0, "Adriatic", 7]]
   .forEach(function (t) {
    var tx = el("text", {
      x: projX(t[0]), y: projY(t[1]), "font-size": t[3],
      fill: "rgba(255,255,255,0.4)", "text-anchor": "middle", "font-weight": 600,
      "letter-spacing": t[3] > 10 ? 2.5 : 0.5, "font-style": "italic"
    });
    tx.textContent = t[2];
    content.appendChild(tx);
  });

  // island markers
  islands.forEach(function (isl, i) {
    isl._x = projX(isl.lon); isl._y = projY(isl.lat);
    var g = el("g", { class: "island-group", "data-i": i });
    g.appendChild(el("circle", { class: "island-halo", cx: isl._x, cy: isl._y, r: 8 }));
    g.appendChild(el("circle", { class: "island-dot", cx: isl._x, cy: isl._y, r: 2.6 }));
    var label = el("text", { class: "island-label", x: isl._x, y: isl._y - 7, "text-anchor": "middle" });
    label.textContent = isl.name;
    g.appendChild(label);
    g.addEventListener("click", function () { selectIsland(i, true); });
    content.appendChild(g);
    isl._group = g;
  });

  // ---- Zoom / select ------------------------------------------------------
  var badge = document.getElementById("badge");
  var badgeTitle = document.getElementById("badgeTitle");
  var badgeText = document.getElementById("badgeText");
  var resetBtn = document.getElementById("resetBtn");

  function selectIsland(i, doZoom) {
    islands.forEach(function (o) { o._group.classList.remove("selected"); });
    var isl = islands[i];
    isl._group.classList.add("selected");
    content.appendChild(isl._group); // bring to front

    if (doZoom) {
      var s = 5;
      var tx = W / 2 - s * isl._x;
      var ty = H / 2 - s * isl._y;
      content.setAttribute("transform", "translate(" + tx.toFixed(1) + " " + ty.toFixed(1) + ") scale(" + s + ")");
      resetBtn.classList.add("show");
    }
    badgeTitle.textContent = isl.name;
    badgeText.textContent = isl.blurb;
    badge.classList.add("show");
  }

  function resetView() {
    content.setAttribute("transform", "");
    resetBtn.classList.remove("show");
    badge.classList.remove("show");
    islands.forEach(function (o) { o._group.classList.remove("selected"); });
  }
  resetBtn.addEventListener("click", resetView);

  // ---- Slot-machine reel --------------------------------------------------
  var reel = document.getElementById("reel");
  var N = islands.length;
  var COPIES = 10;
  var seq = [];
  for (var c = 0; c < COPIES; c++) for (var n = 0; n < N; n++) seq.push(n);

  seq.forEach(function (idx) {
    var row = document.createElement("div");
    row.className = "slot-row";
    row.textContent = islands[idx].name;
    reel.appendChild(row);
  });

  var rowH = 0, currentPos = N;
  function measure() {
    rowH = reel.firstChild ? reel.firstChild.getBoundingClientRect().height : 0;
  }
  function place(withTransition) {
    reel.style.transition = withTransition ? "" : "none";
    reel.style.transform = "translateY(" + (-(currentPos - 1) * rowH) + "px)";
  }
  function initReel() {
    measure();
    place(false);
  }
  initReel();
  window.addEventListener("resize", function () { if (!spinning) { measure(); place(false); } });

  // ---- Spin ---------------------------------------------------------------
  var playBtn = document.getElementById("playBtn");
  var statusEl = document.getElementById("status");
  var spinning = false;

  function spin() {
    if (spinning) return;
    if (!rowH) measure();
    spinning = true;
    playBtn.disabled = true;
    resetView();
    statusEl.textContent = "Spinning…";

    var k = Math.floor(Math.random() * N);
    var spins = 4;
    var deltaModN = ((k - (currentPos % N)) % N + N) % N;
    currentPos = currentPos + spins * N + deltaModN;

    reel.style.transition = "transform 4.6s cubic-bezier(0.12, 0.66, 0.08, 1)";
    reel.style.transform = "translateY(" + (-(currentPos - 1) * rowH) + "px)";

    var done = function () {
      reel.removeEventListener("transitionend", done);
      // normalise position (periodic) without visual change
      currentPos = N + (currentPos % N);
      place(false);
      // force reflow so future transitions apply cleanly
      void reel.offsetHeight;
      spinning = false;
      playBtn.disabled = false;
      statusEl.textContent = "The reel stops at " + islands[k].name + ".";
      selectIsland(k, true);
    };
    reel.addEventListener("transitionend", done);
  }

  playBtn.addEventListener("click", spin);
})();
