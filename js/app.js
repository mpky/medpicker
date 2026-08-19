/* Mediterranean Island Spinner
 * Self-contained: builds a stylized SVG map + a spinning wheel, then zooms
 * the map to whichever island the wheel lands on. No external dependencies. */
(function () {
  "use strict";

  var SVGNS = "http://www.w3.org/2000/svg";
  var islands = window.ISLANDS;

  // Map viewBox + geographic projection ------------------------------------
  var W = 1000, H = 560;
  var LON_MIN = -7, LON_MAX = 37, LAT_MIN = 30.5, LAT_MAX = 46;

  function projX(lon) { return (lon - LON_MIN) / (LON_MAX - LON_MIN) * W; }
  function projY(lat) { return (LAT_MAX - lat) / (LAT_MAX - LAT_MIN) * H; }

  // Stylized landmasses (approximate coastlines, lon/lat) ------------------
  var LANDS = [
    // Iberia + SW France corner
    [[-9,47],[3.6,47],[3.4,42.4],[1.0,41.0],[-0.4,39.5],[-0.9,37.9],[-2.3,36.8],[-5.3,36.0],[-7.5,36.6],[-9,38]],
    // Italy (the boot)
    [[7.0,47],[13.9,47],[13.9,45.4],[13.2,44.0],[15.6,41.8],[17.0,41.3],[18.5,40.3],[17.6,40.0],[16.4,39.0],[17.0,38.8],[15.9,37.9],[15.6,38.4],[14.8,40.1],[13.0,41.1],[11.0,42.6],[10.0,43.9],[7.6,44.2],[7.0,45.5]],
    // Balkans + Greece
    [[13.5,47],[27,47],[27,41.2],[26.0,40.7],[24.6,40.3],[24.0,40.7],[22.9,40.3],[22.7,39.9],[23.4,38.9],[24.0,38.0],[23.2,37.4],[23.6,37.9],[23.0,36.5],[22.4,36.5],[21.9,37.2],[21.1,38.0],[20.9,38.9],[19.4,39.8],[18.9,42.5],[16.5,43.3],[13.8,45.5]],
    // Anatolia (Turkey)
    [[26,42],[40,42],[40,35.6],[36,36.0],[34,35.9],[31,36.3],[29,36.6],[27.5,37.0],[26.3,38.4],[26.9,38.7],[26.2,39.5],[26.9,40.2]],
    // North Africa
    [[-9,29],[40,29],[40,33.2],[33,31.1],[30,31.4],[25,31.9],[23,32.9],[20,30.8],[15,31.3],[11,33.6],[10.2,34.6],[9.8,37.3],[8,37.1],[3,36.9],[0,36.6],[-2,35.9],[-5.4,35.9],[-9,35.2]]
  ];

  function polyToPath(pts) {
    var d = "";
    for (var i = 0; i < pts.length; i++) {
      d += (i === 0 ? "M" : "L") + projX(pts[i][0]).toFixed(1) + " " + projY(pts[i][1]).toFixed(1) + " ";
    }
    return d + "Z";
  }

  // Deterministic pseudo-random island blob around a center ----------------
  function blobPath(cx, cy, r, seed) {
    var n = 9, d = "", rnd = seed;
    function rand() { rnd = (rnd * 9301 + 49297) % 233280; return rnd / 233280; }
    for (var i = 0; i < n; i++) {
      var a = (i / n) * Math.PI * 2;
      var rr = r * (0.72 + rand() * 0.55);
      var x = cx + Math.cos(a) * rr;
      var y = cy + Math.sin(a) * rr * 0.82;
      d += (i === 0 ? "M" : "L") + x.toFixed(1) + " " + y.toFixed(1) + " ";
    }
    return d + "Z";
  }

  function el(tag, attrs) {
    var e = document.createElementNS(SVGNS, tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    return e;
  }

  // ---- Build map ----------------------------------------------------------
  var svg = document.getElementById("map");
  svg.setAttribute("viewBox", "0 0 " + W + " " + H);

  var defs = el("defs");
  defs.innerHTML =
    '<linearGradient id="seaGrad" x1="0" y1="0" x2="0" y2="1">' +
    '<stop offset="0" stop-color="#468faf"/><stop offset="1" stop-color="#1b4965"/></linearGradient>';
  svg.appendChild(defs);

  var content = el("g", { id: "mapContent" });
  svg.appendChild(content);

  content.appendChild(el("rect", { x: 0, y: 0, width: W, height: H, fill: "url(#seaGrad)" }));

  // subtle sea texture lines
  for (var y = 40; y < H; y += 46) {
    content.appendChild(el("path", {
      d: "M0 " + y + " Q " + (W / 4) + " " + (y - 8) + " " + (W / 2) + " " + y + " T " + W + " " + y,
      fill: "none", stroke: "rgba(255,255,255,0.05)", "stroke-width": 2
    }));
  }

  LANDS.forEach(function (pts) {
    content.appendChild(el("path", { d: polyToPath(pts), fill: "var(--land)", stroke: "var(--land-edge)", "stroke-width": 1.5, "stroke-linejoin": "round" }));
  });

  // sea labels
  [["MEDITERRANEAN SEA", 480, 300, 20], ["Tyrrhenian", 300, 200, 12], ["Ionian", 430, 350, 12], ["Aegean", 590, 210, 12], ["Adriatic", 380, 130, 12]].forEach(function (t) {
    content.appendChild(el("text", { x: t[1], y: t[2], "font-size": t[3], fill: "rgba(255,255,255,0.35)", "text-anchor": "middle", "font-weight": 600, "letter-spacing": t[3] > 15 ? 3 : 1 })).textContent = t[0];
  });

  // island groups (keep references for zoom/highlight)
  islands.forEach(function (isl, i) {
    var cx = projX(isl.lon), cy = projY(isl.lat);
    isl._x = cx; isl._y = cy;
    var g = el("g", { class: "island-group", "data-i": i });
    g.appendChild(el("path", { class: "island-blob", d: blobPath(cx, cy, isl.size / 3.2, i * 37 + 11) }));
    var label = el("text", { class: "island-label", x: cx, y: cy - isl.size / 3.2 - 4, "text-anchor": "middle" });
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
    // bring selected group to front
    content.appendChild(isl._group);

    if (doZoom) {
      var s = 4.2;
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

  // ---- Build wheel --------------------------------------------------------
  var wheelSvg = document.getElementById("wheel");
  var rotor = document.getElementById("wheelRotor");
  var N = islands.length;
  var SLICE = 360 / N;
  var R = 100, CX = 100, CY = 100;
  wheelSvg.setAttribute("viewBox", "0 0 200 200");

  var palette = ["#2a6f97", "#468faf", "#61a5c2", "#1b4965", "#3a7ca5", "#5f8fb0"];

  // point at angle (deg, 0=top, clockwise)
  function pt(deg, rad) {
    var a = (deg - 90) * Math.PI / 180; // shift so 0deg = top
    return [CX + Math.cos(a) * rad, CY + Math.sin(a) * rad];
  }

  islands.forEach(function (isl, i) {
    var a0 = i * SLICE, a1 = (i + 1) * SLICE;
    var p0 = pt(a0, R), p1 = pt(a1, R);
    var d = "M" + CX + " " + CY + " L" + p0[0].toFixed(2) + " " + p0[1].toFixed(2) +
      " A" + R + " " + R + " 0 0 1 " + p1[0].toFixed(2) + " " + p1[1].toFixed(2) + " Z";
    rotor.appendChild(el("path", { d: d, fill: palette[i % palette.length], stroke: "rgba(255,255,255,0.5)", "stroke-width": 0.6 }));

    // radial label
    var mid = a0 + SLICE / 2;
    var lp = pt(mid, R - 6);
    var rot = mid; // text runs outward
    var flip = (mid > 90 && mid < 270);
    var t = el("text", {
      class: "slice-label",
      x: lp[0].toFixed(2), y: lp[1].toFixed(2),
      "text-anchor": flip ? "start" : "end",
      "dominant-baseline": "middle",
      transform: "rotate(" + (flip ? rot + 180 : rot) + " " + lp[0].toFixed(2) + " " + lp[1].toFixed(2) + ")"
    });
    t.textContent = isl.name;
    rotor.appendChild(t);
  });
  rotor.appendChild(el("circle", { cx: CX, cy: CY, r: R, fill: "none", stroke: "rgba(255,255,255,0.7)", "stroke-width": 2 }));

  // ---- Spin logic ---------------------------------------------------------
  var playBtn = document.getElementById("playBtn");
  var statusEl = document.getElementById("status");
  var rotation = 0;
  var spinning = false;

  function spin() {
    if (spinning) return;
    spinning = true;
    playBtn.disabled = true;
    resetView();
    statusEl.textContent = "Spinning...";

    var k = Math.floor(Math.random() * N);
    // center angle of slice k, measured clockwise from top
    var center = k * SLICE + SLICE / 2;
    // land slice center under the top pointer: need rotation R with (center + R) ≡ 0 (mod 360)
    var targetMod = (360 - center) % 360;
    var cur = ((rotation % 360) + 360) % 360;
    var delta = (targetMod - cur + 360) % 360;
    // small offset inside the slice for a natural finish
    var jitter = (Math.random() - 0.5) * (SLICE * 0.5);
    delta += jitter;
    rotation += 360 * 6 + delta; // 6 full spins + landing

    rotor.classList.add("spinning");
    rotor.style.transform = "rotate(" + rotation + "deg)";

    var done = function () {
      rotor.removeEventListener("transitionend", done);
      spinning = false;
      playBtn.disabled = false;
      statusEl.textContent = "🏝️ It landed on " + islands[k].name + "!";
      selectIsland(k, true);
    };
    rotor.addEventListener("transitionend", done);
  }

  playBtn.addEventListener("click", spin);
})();
