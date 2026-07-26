// ===== Pixel Art Banner — Ikebana Lesson in Washitsu with Zen Garden =====
(function() {
  const canvas = document.getElementById('pixel-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = 280, H = 48;
  canvas.width = W; canvas.height = H;

  function isDark() { return document.documentElement.getAttribute('data-theme') === 'dark'; }

  const palette = {
    light: {
      // Roof
      roofDark: '#3a2818', roofMid: '#5a4030', roofLight: '#786048', roofShadow: '#281810',
      // Sky & Garden
      sky1: '#8aacd0', sky2: '#c4d8ec', cloud: '#e8e4e0',
      fujiBody: '#8090b0', fujiSnow: '#e8e8f0', fujiBase: '#6878a0',
      forest1: '#2a5828', forest2: '#3a6838', forest3: '#1a4018', forest4: '#487848', forest5: '#2a4820',
      pineWood: '#5a3820', pineNeedleDark: '#1a4818', pineNeedleLight: '#3a8838',
      sakuraTrunk: '#8a6848', sakuraPink: '#f0a0b0', sakuraPinkLight: '#f8c0c8', sakuraPetal: '#f8b8c0',
      azaleaPink: '#e06888', azaleaPinkHi: '#f088a0', azaleaWhite: '#e8e8e0', azaleaWhiteHi: '#f8f8f0',
      azaleaRed: '#c83838', azaleaRedHi: '#e05050',
      mossGreen: '#6a7848', gardenStone: '#c8c0a8',
      pondWater: '#386888', pondShimmer: '#68a8c8', pondEdge: '#284858', lilyPad: '#2a6828',
      koiOrange: '#e89030', koiRed: '#d04030', koiWhite: '#f0e8d8',
      bambooGreen: '#6a8848', waterBlue: '#5888c0', basinGray: '#686860',
      // Architecture
      wallPlaster: '#e0d4c0', wallShadow: '#c8b8a0',
      engawaWood: '#c8a870', engawaShadow: '#6a5838', doorTrack: '#4a3828',
      shojiFrame: '#7a5c38', shojiPaper: '#f0e8d8',
      tatami1: '#d4be7a', tatami2: '#c8b46e', tatamiEdge: '#a89050', tatamiLine: '#b8a060',
      tokoPost: '#6a3028', tokoBack: '#4a2020', scrollBeige: '#e8dcc0', scrollInk: '#282020',
      // Sam
      skinTone: '#f0c090', skinShadow: '#d0a070', hairDark: '#201810',
      kimNavy: '#1b2a4a', kimNavyLight: '#2a3a5a', kimNavyShadow: '#101828', obiGold: '#c8a848',
      collarWhite: '#f0ece0',
      // Teacher
      kimTeacher: '#6b4c5e', kimTeacherLight: '#7b5c6e', kimTeacherShadow: '#4a3040', obiTeacher: '#b8a060',
      // Arrangement
      tableBrown: '#4a3020', tableBrownLight: '#5a4030',
      bowlGray: '#909888', bowlLight: '#b0b8a8',
      chrysWhite: '#f8f4e8', chrysCenter: '#e8c830',
      pineGreen: '#2a6828', pineDark: '#1a4818', pineLight: '#3a8838',
      budPink: '#e898a0', budWhite: '#f0ece0', stemGreen: '#2a5020',
      // Tea tools
      chawan: '#7a6050', chasen: '#d4be7a', chakin: '#d4c090',
    },
    dark: {
      roofDark: '#1a1008', roofMid: '#2a1810', roofLight: '#3a2818', roofShadow: '#100808',
      sky1: '#0e1828', sky2: '#182840', cloud: '#303848',
      fujiBody: '#303848', fujiSnow: '#686878', fujiBase: '#202838',
      forest1: '#152818', forest2: '#1a3418', forest3: '#0e2010', forest4: '#203820', forest5: '#142410',
      pineWood: '#3a2010', pineNeedleDark: '#102810', pineNeedleLight: '#285828',
      sakuraTrunk: '#584030', sakuraPink: '#804858', sakuraPinkLight: '#906068', sakuraPetal: '#886068',
      azaleaPink: '#703848', azaleaPinkHi: '#884858', azaleaWhite: '#686860', azaleaWhiteHi: '#787870',
      azaleaRed: '#602020', azaleaRedHi: '#803030',
      mossGreen: '#384028', gardenStone: '#585048',
      pondWater: '#182838', pondShimmer: '#284058', pondEdge: '#101820', lilyPad: '#183818',
      koiOrange: '#885020', koiRed: '#702018', koiWhite: '#887868',
      bambooGreen: '#385028', waterBlue: '#283858', basinGray: '#383830',
      wallPlaster: '#484038', wallShadow: '#383028',
      engawaWood: '#584830', engawaShadow: '#2a2018', doorTrack: '#281c10',
      shojiFrame: '#3a2818', shojiPaper: '#3a3428',
      tatami1: '#6a5e3a', tatami2: '#605438', tatamiEdge: '#4a3e28', tatamiLine: '#584c30',
      tokoPost: '#3a1818', tokoBack: '#281010', scrollBeige: '#6a5e48', scrollInk: '#181010',
      skinTone: '#a07850', skinShadow: '#806040', hairDark: '#181010',
      kimNavy: '#101828', kimNavyLight: '#182030', kimNavyShadow: '#080c18', obiGold: '#786030',
      collarWhite: '#888070',
      kimTeacher: '#3a2838', kimTeacherLight: '#4a3848', kimTeacherShadow: '#281820', obiTeacher: '#685830',
      tableBrown: '#2a1810', tableBrownLight: '#3a2820',
      bowlGray: '#505848', bowlLight: '#687060',
      chrysWhite: '#989080', chrysCenter: '#887828',
      pineGreen: '#1a4018', pineDark: '#102810', pineLight: '#285828',
      budPink: '#885058', budWhite: '#888070', stemGreen: '#183018',
      chawan: '#504038', chasen: '#6a5e3a', chakin: '#685838',
    }
  };
  function P() { return isDark() ? palette.dark : palette.light; }

  // ---- Roof overhang (irimoya-style eave with scalloped tile edge) ----
  function drawRoof() {
    const p = P();
    const tileW = 8; // width of each curved tile scallop
    for (let x = 0; x < W; x++) {
      const distFromCenter = Math.abs(x - W / 2) / (W / 2);
      const baseH = 3 + Math.floor(distFromCenter * 2); // 3px center, 5px edges
      // Scalloped bottom edge — sine curve per tile
      const tilePhase = (x % tileW) / tileW * Math.PI;
      const scallop = Math.floor(Math.sin(tilePhase) * 1.5);
      const h = baseH + scallop;
      ctx.fillStyle = p.roofDark;
      ctx.fillRect(x, 0, 1, h);
      // Tile ridge highlights at the peak of each scallop
      if (x % tileW === Math.floor(tileW / 2)) {
        ctx.fillStyle = p.roofLight;
        ctx.fillRect(x, 1, 1, 1);
      }
      // Lighter tile rows
      if (x % tileW < 2) {
        ctx.fillStyle = p.roofMid;
        ctx.fillRect(x, 0, 1, 1);
      }
    }
    // Scalloped shadow line at bottom edge
    ctx.fillStyle = p.roofShadow;
    for (let x = 0; x < W; x++) {
      const distFromCenter = Math.abs(x - W / 2) / (W / 2);
      const baseH = 3 + Math.floor(distFromCenter * 2);
      const tilePhase = (x % tileW) / tileW * Math.PI;
      const scallop = Math.floor(Math.sin(tilePhase) * 1.5);
      ctx.fillRect(x, baseH + scallop, 1, 1);
    }
  }

  // ---- Sky (fills from y=0 to y=16, roof draws over it) ----
  function drawSky() {
    const p = P();
    ctx.fillStyle = p.sky1;
    ctx.fillRect(0, 0, W, 12);
    ctx.fillStyle = p.sky2;
    ctx.fillRect(0, 12, W, 4);
  }

  // ---- Clouds (drifting slowly) ----
  function drawCloud(cx, cy, cw, ch, time, speed) {
    // Drift horizontally, wrap around
    const drift = (time * speed) % W;
    cx = ((cx + drift) % (W + cw)) - cw;
    const p = P();
    ctx.fillStyle = p.cloud;
    if (ch <= 2) {
      ctx.globalAlpha = 0.5;
      ctx.fillRect(cx + 1, cy, cw - 2, ch);
      ctx.fillRect(cx, cy + Math.floor(ch / 2), cw, Math.max(1, ch - 1));
      if (cw > 8) ctx.fillRect(cx + Math.floor(cw * 0.15), cy - 1, Math.floor(cw * 0.5), 1);
    } else {
      ctx.globalAlpha = 0.55;
      ctx.fillRect(cx + 2, cy, cw - 4, ch + 1);
      ctx.fillRect(cx, cy + 1, cw, ch);
      ctx.fillRect(cx + Math.floor(cw * 0.2), cy - 1, Math.floor(cw * 0.3), 2);
      ctx.fillRect(cx + Math.floor(cw * 0.55), cy - 2, Math.floor(cw * 0.25), 2);
      ctx.globalAlpha = 0.25;
      ctx.fillRect(cx + Math.floor(cw * 0.2) + 1, cy - 1, Math.floor(cw * 0.2), 1);
    }
    ctx.globalAlpha = 1;
  }

  // ---- Mount Fuji (distant, in the sky) ----
  function drawFuji() {
    const p = P();
    // Centered in the garden view opening, peak at y=2
    const cx = 140, peakY = 3, baseY = 15;
    const halfW = 30;
    // Mountain body — triangle shape
    for (let row = 0; row <= baseY - peakY; row++) {
      const pct = row / (baseY - peakY);
      const span = Math.floor(pct * halfW);
      ctx.fillStyle = row < 4 ? p.fujiSnow : (row < 7 ? p.fujiBody : p.fujiBase);
      ctx.fillRect(cx - span, peakY + row, span * 2 + 1, 1);
    }
    // Snow cap — brighter white on the peak
    ctx.fillStyle = p.fujiSnow;
    ctx.fillRect(cx - 1, peakY, 3, 1);
    ctx.fillRect(cx - 3, peakY + 1, 7, 1);
    ctx.fillRect(cx - 5, peakY + 2, 11, 1);
    // Snow line — irregular edge
    ctx.fillRect(cx - 7, peakY + 3, 5, 1);
    ctx.fillRect(cx + 2, peakY + 3, 6, 1);
  }

  // ---- Wisteria vines draping from roof (left side, near 2nd pine) ----
  function drawWisteria() {
    const wLight = isDark() ? '#483858' : '#b8a0d0';
    const wMid = isDark() ? '#382848' : '#9880b8';
    const wDark = isDark() ? '#281838' : '#7860a0';
    const wVine = isDark() ? '#2a3818' : '#5a7838';

    // Vine stems hanging from top of canvas (roof line)
    // Cluster 1 (x ≈ 40-55, near 2nd pine)
    ctx.fillStyle = wVine;
    ctx.fillRect(42, 0, 1, 2);
    ctx.fillRect(47, 0, 1, 3);
    ctx.fillRect(52, 0, 1, 1);
    ctx.fillRect(45, 0, 1, 1);
    ctx.fillRect(50, 0, 1, 2);
    // 55 stem removed (was too short)

    // Flower clusters — draping at different heights, 2px wide, tapering to 1px
    // Vine 1
    ctx.fillStyle = wLight;
    ctx.fillRect(41, 3, 2, 3);
    ctx.fillStyle = wMid;
    ctx.fillRect(42, 5, 1, 2);
    // Vine 2 (longer)
    ctx.fillStyle = wLight;
    ctx.fillRect(46, 4, 2, 2);
    ctx.fillStyle = wMid;
    ctx.fillRect(46, 6, 2, 2);
    ctx.fillStyle = wDark;
    ctx.fillRect(47, 8, 1, 1);
    // Vine 3
    ctx.fillStyle = wLight;
    ctx.fillRect(51, 2, 2, 2);
    ctx.fillStyle = wMid;
    ctx.fillRect(52, 4, 1, 2);
    // Vine 4 (short)
    ctx.fillStyle = wLight;
    ctx.fillRect(44, 2, 2, 2);
    ctx.fillStyle = wDark;
    ctx.fillRect(45, 4, 1, 1);
    // Vine 5 (longer)
    ctx.fillStyle = wLight;
    ctx.fillRect(49, 3, 2, 2);
    ctx.fillStyle = wMid;
    ctx.fillRect(49, 5, 2, 2);
    ctx.fillStyle = wDark;
    ctx.fillRect(50, 7, 1, 1);
    // Vine 6 (short)
    ctx.fillStyle = wLight;
    ctx.fillRect(54, 1, 2, 2);
    ctx.fillStyle = wMid;
    ctx.fillRect(55, 3, 1, 1);

    // Cluster 2 (x ≈ 58-70)
    ctx.fillStyle = wVine;
    ctx.fillRect(59, 0, 1, 1);
    ctx.fillRect(63, 0, 1, 2);
    // 67, 61 stems removed (were too short)

    ctx.fillStyle = wLight;
    ctx.fillRect(58, 2, 2, 2);
    ctx.fillStyle = wMid;
    ctx.fillRect(59, 4, 1, 2);
    ctx.fillStyle = wLight;
    ctx.fillRect(62, 3, 2, 2);
    ctx.fillStyle = wMid;
    ctx.fillRect(62, 5, 2, 2);
    ctx.fillStyle = wDark;
    ctx.fillRect(63, 7, 1, 1);
    ctx.fillStyle = wLight;
    ctx.fillRect(66, 1, 2, 3);
    ctx.fillStyle = wMid;
    ctx.fillRect(67, 4, 1, 1);
    ctx.fillStyle = wLight;
    ctx.fillRect(60, 1, 2, 2);
    ctx.fillStyle = wDark;
    ctx.fillRect(61, 3, 1, 1);

    // Cluster 3 (x ≈ 73-88, spreading toward center)
    ctx.fillStyle = wVine;
    ctx.fillRect(74, 0, 1, 2);
    ctx.fillRect(78, 0, 1, 4);
    ctx.fillRect(82, 0, 1, 1);
    ctx.fillRect(86, 0, 1, 2);
    // 76, 84 stems removed (were too short)

    ctx.fillStyle = wLight;
    ctx.fillRect(73, 3, 2, 2);
    ctx.fillStyle = wMid;
    ctx.fillRect(74, 5, 1, 2);
    ctx.fillStyle = wLight;
    ctx.fillRect(77, 4, 2, 2);
    ctx.fillStyle = wMid;
    ctx.fillRect(77, 6, 2, 2);
    ctx.fillStyle = wDark;
    ctx.fillRect(78, 8, 1, 2);
    ctx.fillStyle = wLight;
    ctx.fillRect(81, 2, 2, 2);
    ctx.fillStyle = wMid;
    ctx.fillRect(82, 4, 1, 2);
    ctx.fillStyle = wLight;
    ctx.fillRect(85, 3, 2, 2);
    ctx.fillStyle = wMid;
    ctx.fillRect(85, 5, 2, 2);
    ctx.fillStyle = wDark;
    ctx.fillRect(86, 7, 1, 1);
    ctx.fillStyle = wLight;
    ctx.fillRect(75, 1, 2, 2);
    ctx.fillStyle = wDark;
    ctx.fillRect(76, 3, 1, 2);
    ctx.fillStyle = wLight;
    ctx.fillRect(83, 1, 2, 2);
    ctx.fillStyle = wMid;
    ctx.fillRect(84, 3, 1, 1);

    // Cluster 4 (x ≈ 92-110, toward center of frame)
    ctx.fillStyle = wVine;
    ctx.fillRect(93, 0, 1, 3);
    ctx.fillRect(97, 0, 1, 1);
    ctx.fillRect(101, 0, 1, 5);
    ctx.fillRect(105, 0, 1, 2);
    // 109, 95 stems removed (were too short)
    ctx.fillRect(103, 0, 1, 2);
    // 107 stem removed (was too short)

    ctx.fillStyle = wLight;
    ctx.fillRect(92, 4, 2, 2);
    ctx.fillStyle = wMid;
    ctx.fillRect(92, 6, 2, 2);
    ctx.fillStyle = wDark;
    ctx.fillRect(93, 8, 1, 1);
    ctx.fillStyle = wLight;
    ctx.fillRect(96, 2, 2, 2);
    ctx.fillStyle = wMid;
    ctx.fillRect(97, 4, 1, 2);
    ctx.fillStyle = wLight;
    ctx.fillRect(100, 5, 2, 2);
    ctx.fillStyle = wMid;
    ctx.fillRect(100, 7, 2, 2);
    ctx.fillStyle = wDark;
    ctx.fillRect(101, 9, 1, 2);
    ctx.fillStyle = wLight;
    ctx.fillRect(104, 3, 2, 2);
    ctx.fillStyle = wMid;
    ctx.fillRect(105, 5, 1, 2);
    ctx.fillStyle = wLight;
    ctx.fillRect(108, 1, 2, 2);
    ctx.fillStyle = wMid;
    ctx.fillRect(109, 3, 1, 1);
    ctx.fillStyle = wLight;
    ctx.fillRect(94, 1, 2, 2);
    ctx.fillStyle = wDark;
    ctx.fillRect(95, 3, 1, 1);
    ctx.fillStyle = wLight;
    ctx.fillRect(102, 3, 2, 2);
    ctx.fillStyle = wMid;
    ctx.fillRect(102, 5, 2, 2);
    ctx.fillStyle = wDark;
    ctx.fillRect(103, 7, 1, 1);
    ctx.fillStyle = wLight;
    ctx.fillRect(106, 0, 2, 2);
    ctx.fillStyle = wMid;
    ctx.fillRect(107, 2, 1, 1);

    // Cluster 5 (x ≈ 115-130, near center)
    ctx.fillStyle = wVine;
    ctx.fillRect(116, 0, 1, 2);
    ctx.fillRect(120, 0, 1, 4);
    // 124, 118 stems removed (were too short)
    ctx.fillRect(128, 0, 1, 2);
    ctx.fillRect(122, 0, 1, 1);

    ctx.fillStyle = wLight;
    ctx.fillRect(115, 3, 2, 2);
    ctx.fillStyle = wMid;
    ctx.fillRect(116, 5, 1, 2);
    ctx.fillStyle = wLight;
    ctx.fillRect(119, 4, 2, 2);
    ctx.fillStyle = wMid;
    ctx.fillRect(119, 6, 2, 2);
    ctx.fillStyle = wDark;
    ctx.fillRect(120, 8, 1, 2);
    ctx.fillStyle = wLight;
    ctx.fillRect(123, 1, 2, 2);
    ctx.fillStyle = wMid;
    ctx.fillRect(124, 3, 1, 2);
    ctx.fillStyle = wLight;
    ctx.fillRect(127, 3, 2, 2);
    ctx.fillStyle = wMid;
    ctx.fillRect(127, 5, 2, 2);
    ctx.fillStyle = wDark;
    ctx.fillRect(128, 7, 1, 1);
    ctx.fillStyle = wLight;
    ctx.fillRect(117, 1, 2, 2);
    ctx.fillStyle = wDark;
    ctx.fillRect(118, 3, 1, 1);
    ctx.fillStyle = wLight;
    ctx.fillRect(121, 2, 2, 2);
    ctx.fillStyle = wMid;
    ctx.fillRect(122, 4, 1, 2);
  }

  // ---- Distant forest treeline (along the horizon) ----
  function drawForest() {
    const p = P();
    const baseY = 16; // horizon line where sky meets garden
    const colors = [p.forest1, p.forest2, p.forest3, p.forest4, p.forest5];
    // Seeded pseudo-random for consistent tree placement
    let s = 77;
    function r() { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }
    // Dense row of trees across the full width (semi-transparent)
    ctx.globalAlpha = 0.4;
    for (let tx = 0; tx < W; tx += 2) {
      const h = 1 + Math.floor(r() * 5); // heights 1-5px
      const color = colors[Math.floor(r() * colors.length)];
      ctx.fillStyle = color;
      // Triangular tree shape (pointed top)
      for (let row = 0; row < h; row++) {
        const half = Math.floor(row * 0.6);
        ctx.fillRect(tx - half, baseY - h + row, 1 + half * 2, 1);
      }
    }
    ctx.globalAlpha = 1;
  }

  // ---- Garden ground (y=16 to y=30, lush and dense) ----
  function drawGardenGround() {
    const p = P();
    // Dense moss base
    ctx.fillStyle = p.mossGreen;
    ctx.fillRect(0, 16, W, 14);
    // Darker moss patches
    ctx.fillStyle = p.pineNeedleDark;
    ctx.globalAlpha = 0.6;
    for (let y = 17; y < 30; y += 2) {
      for (let x = 2; x < W; x += 5) {
        ctx.fillRect(x, y, 2, 1);
      }
    }
    ctx.globalAlpha = 1;
    // Lighter moss highlights
    ctx.fillStyle = p.pineNeedleLight;
    ctx.globalAlpha = 0.5;
    ctx.fillRect(70, 18, 6, 2);
    ctx.fillRect(130, 20, 8, 2);
    ctx.fillRect(200, 17, 5, 2);
    ctx.fillRect(50, 24, 7, 2);
    ctx.fillRect(160, 26, 6, 2);
    ctx.fillRect(100, 22, 5, 2);
    ctx.globalAlpha = 1;

  }

  // ---- Garden pond (organic, irregular kidney shape, ~50px wide) ----
  function drawPond(time) {
    const p = P();
    const px = 130, py = 22; // center of pond
    // Organic S-curve pond — narrowed 2px each side, more flowing edges
    // Each row: [y-offset, x-start-offset, width]
    const rows = [
      [-5, -5,  8],
      [-4,-10, 18],
      [-3,-15, 30],
      [-2,-19, 38],
      [-1,-22, 44],
      [ 0,-24, 50],
      [ 1,-26, 48],
      [ 2,-25, 40],
      [ 3,-22, 30],
      [ 4,-20, 28],
      [ 5,-18, 32],
      [ 6,-16, 38],
      [ 7,-14, 44],
      [ 8,-12, 46],
      [ 9,-10, 40],
      [10, -6, 30],
      [11, -1, 18],
      [12,  3, 10],
      [13,  6,  4],
    ];

    // Pond edge (dark outline, 1px wider on each side)
    ctx.fillStyle = p.pondEdge;
    rows.forEach(function(r) {
      ctx.fillRect(px + r[1] - 1, py + r[0], r[2] + 2, 1);
    });

    // Water body
    ctx.fillStyle = p.pondWater;
    rows.forEach(function(r) {
      ctx.fillRect(px + r[1], py + r[0], r[2], 1);
    });

    // Mountain reflection (inverted — base at top, snow cap at bottom)
    ctx.fillStyle = p.fujiBase;
    ctx.globalAlpha = 0.2;
    ctx.fillRect(px - 10, py - 2, 20, 2);
    ctx.fillStyle = p.fujiBody;
    ctx.globalAlpha = 0.2;
    ctx.fillRect(px - 8, py, 16, 2);
    ctx.fillRect(px - 5, py + 2, 10, 2);
    // Snow cap reflection (at bottom, closest to viewer)
    ctx.fillStyle = p.fujiSnow;
    ctx.globalAlpha = 0.15;
    ctx.fillRect(px - 3, py + 4, 6, 2);
    ctx.globalAlpha = 1;

    // Rock and boulder arrangement with raked gravel (near engawa, right side)
    // Raked gravel bed (shirakawa-suna) — organic shape
    const rx = px + 30, ry = 25;
    ctx.fillStyle = isDark() ? '#484840' : '#c8c0b0';
    ctx.fillRect(rx + 4, ry - 3, 26, 1);
    ctx.fillRect(rx + 2, ry - 2, 30, 1);
    ctx.fillRect(rx, ry - 1, 34, 1);
    ctx.fillRect(rx - 2, ry, 36, 1);
    ctx.fillRect(rx - 4, ry + 1, 40, 1);
    ctx.fillRect(rx - 5, ry + 2, 42, 1);
    ctx.fillRect(rx - 4, ry + 3, 41, 1);
    ctx.fillRect(rx - 2, ry + 4, 38, 1);
    ctx.fillRect(rx + 1, ry + 5, 32, 1);
    // Raked lines (concentric around boulders)
    ctx.fillStyle = isDark() ? '#383830' : '#b0a898';
    ctx.globalAlpha = 0.35;
    ctx.fillRect(rx + 2, ry - 2, 30, 1);
    ctx.fillRect(rx - 4, ry + 1, 40, 1);
    ctx.fillRect(rx - 4, ry + 3, 41, 1);
    ctx.fillRect(rx + 1, ry + 5, 32, 1);
    ctx.globalAlpha = 1;

    // Azalea bush (top-left of right pebble pad, x=171)
    ctx.fillStyle = p.pineNeedleDark;
    ctx.fillRect(171, 20, 4, 2);
    ctx.fillRect(170, 21, 6, 2);

    // Azalea bush (top-right of right pebble pad)
    ctx.fillStyle = p.pineNeedleDark;
    ctx.fillRect(rx + 28, ry - 3, 4, 2);
    ctx.fillRect(rx + 27, ry - 2, 6, 2);

    // Main boulder (upright, rugged — represents mountain)
    ctx.fillStyle = isDark() ? '#383028' : '#686058';
    ctx.fillRect(rx + 3, ry - 3, 5, 5);
    ctx.fillRect(rx + 2, ry - 1, 7, 3);
    ctx.fillRect(rx + 4, ry - 4, 3, 1);
    // Highlight
    ctx.fillStyle = isDark() ? '#484038' : '#807868';
    ctx.fillRect(rx + 3, ry - 3, 2, 2);

    // Medium rock (lower, rounder)
    ctx.fillStyle = isDark() ? '#403830' : '#706860';
    ctx.fillRect(rx + 10, ry, 4, 3);
    ctx.fillRect(rx + 9, ry + 1, 6, 2);
    ctx.fillStyle = isDark() ? '#504840' : '#888078';
    ctx.fillRect(rx + 10, ry, 2, 1);

    // Small accent stone (flat)
    ctx.fillStyle = isDark() ? '#383030' : '#787068';
    ctx.fillRect(rx - 1, ry + 1, 3, 2);
    ctx.fillStyle = isDark() ? '#484040' : '#908880';
    ctx.fillRect(rx - 1, ry + 1, 2, 1);

    // Bushes near stone garden
    // Satsuki azalea (pink flowers on green)
    ctx.fillStyle = isDark() ? '#1a3818' : '#3a6828';
    ctx.fillRect(rx + 14, ry + 1, 5, 3);
    ctx.fillRect(rx + 13, ry + 2, 7, 2);
    ctx.fillStyle = isDark() ? '#703848' : '#e06888';
    ctx.fillRect(rx + 15, ry + 1, 1, 1);
    ctx.fillRect(rx + 17, ry + 2, 1, 1);
    // Satsuki azalea 2 (bush only)
    ctx.fillStyle = isDark() ? '#1a3818' : '#3a6828';
    ctx.fillRect(rx - 6, ry + 2, 4, 3);
    ctx.fillRect(rx - 7, ry + 3, 6, 2);
    // Small green bush
    ctx.fillStyle = isDark() ? '#284028' : '#4a7838';
    ctx.fillRect(rx + 8, ry + 3, 3, 2);
    ctx.fillRect(rx + 7, ry + 4, 5, 1);

    // Ornamental grass (susuki) — wispy thin clumps
    ctx.fillStyle = isDark() ? '#485030' : '#8a9860';
    ctx.fillRect(rx + 17, ry - 1, 1, 4);
    ctx.fillRect(rx + 18, ry - 2, 1, 5);
    ctx.fillRect(rx + 19, ry, 1, 3);
    ctx.fillRect(rx - 8, ry, 1, 4);
    ctx.fillRect(rx - 9, ry - 1, 1, 4);
    // Grass tips (lighter)
    ctx.fillStyle = isDark() ? '#586838' : '#a8b878';
    ctx.fillRect(rx + 17, ry - 1, 1, 1);
    ctx.fillRect(rx + 18, ry - 2, 1, 1);
    ctx.fillRect(rx - 8, ry, 1, 1);
    ctx.fillRect(rx - 9, ry - 1, 1, 1);

    // Old stone basin (tsukubai) — near the pond edge, bigger
    ctx.fillStyle = isDark() ? '#585050' : '#989088';
    ctx.fillRect(px + 20, 23, 7, 5);
    ctx.fillRect(px + 19, 24, 9, 4);
    ctx.fillStyle = isDark() ? '#686060' : '#a8a098';
    ctx.fillRect(px + 20, 23, 4, 1);
    ctx.fillRect(px + 19, 24, 2, 1);
    // Hollow center with water
    ctx.fillStyle = p.pondWater;
    ctx.fillRect(px + 21, 25, 5, 2);

    // Bamboo water feature (kakei) — yellowish-green bamboo
    const bamYellow = isDark() ? '#686830' : '#b0a850';
    const bamDark = isDark() ? '#484820' : '#888038';
    const bamLight = isDark() ? '#787840' : '#c8c060';
    // Vertical bamboo post (2px wide, taller)
    ctx.fillStyle = bamYellow;
    ctx.fillRect(px + 30, 17, 2, 10);
    ctx.fillRect(px + 29, 16, 4, 2); // top cap
    // Joint band
    ctx.fillStyle = bamDark;
    ctx.fillRect(px + 30, 20, 2, 1);
    // Highlight
    ctx.fillStyle = bamLight;
    ctx.fillRect(px + 31, 17, 1, 3);
    // Horizontal spout pointing left toward basin
    ctx.fillStyle = bamYellow;
    ctx.fillRect(px + 26, 23, 5, 2);
    ctx.fillStyle = bamDark;
    ctx.fillRect(px + 30, 23, 1, 2); // joint at bend
    // Spout tip
    ctx.fillStyle = bamDark;
    ctx.fillRect(px + 26, 23, 1, 2);
    // Water stream from spout into basin
    ctx.fillStyle = p.waterBlue;
    ctx.globalAlpha = 0.7;
    ctx.fillRect(px + 26, 25, 1, 1);
    ctx.fillRect(px + 25, 25, 1, 1);
    ctx.fillRect(px + 26, 26, 1, 1);
    ctx.globalAlpha = 1;

    // Lily pads (more, scattered)
    ctx.fillStyle = p.lilyPad;
    ctx.fillRect(px - 5, py + 1, 2, 1);
    ctx.fillRect(px + 12, py - 1, 2, 1);
    ctx.fillRect(px + 3, py + 4, 2, 1);
    ctx.fillRect(px - 12, py + 3, 2, 1);
    ctx.fillRect(px + 8, py + 6, 2, 1);
    ctx.fillRect(px - 8, py + 7, 2, 1);
    ctx.fillRect(px + 15, py + 3, 2, 1);

    // Overgrown moss patches creeping into the water
    ctx.fillStyle = isDark() ? '#1a3010' : '#3a7020';
    ctx.globalAlpha = 0.5;
    ctx.fillRect(px - 20, py + 1, 3, 2);
    ctx.fillRect(px - 16, py + 5, 2, 2);
    ctx.fillRect(px + 16, py + 5, 3, 2);
    ctx.fillRect(px - 10, py + 9, 2, 2);
    ctx.fillRect(px + 5, py + 10, 3, 1);
    ctx.globalAlpha = 1;

    // Pond algae / green film on water edges
    ctx.fillStyle = isDark() ? '#283818' : '#4a7830';
    ctx.globalAlpha = 0.3;
    ctx.fillRect(px - 22, py, 4, 1);
    ctx.fillRect(px - 18, py + 6, 3, 1);
    ctx.fillRect(px + 18, py + 2, 3, 1);
    ctx.fillRect(px - 6, py + 11, 4, 1);
    ctx.fillRect(px + 10, py + 8, 3, 1);
    ctx.globalAlpha = 1;

    // Tall thin reeds / water grass (sticking up from water)
    ctx.fillStyle = isDark() ? '#2a4818' : '#58a038';
    ctx.fillRect(px - 18, py - 1, 1, 4);
    ctx.fillRect(px - 19, py, 1, 3);
    ctx.fillRect(px - 16, py + 3, 1, 4);
    ctx.fillRect(px + 16, py + 1, 1, 4);
    ctx.fillRect(px + 17, py + 2, 1, 3);
    ctx.fillRect(px - 10, py + 6, 1, 4);
    ctx.fillRect(px - 11, py + 7, 1, 3);
    ctx.fillRect(px + 8, py + 8, 1, 3);
    // Reed tips (lighter)
    ctx.fillStyle = isDark() ? '#385828' : '#78b848';
    ctx.fillRect(px - 18, py - 1, 1, 1);
    ctx.fillRect(px - 16, py + 3, 1, 1);
    ctx.fillRect(px + 16, py + 1, 1, 1);
    ctx.fillRect(px - 10, py + 6, 1, 1);
    ctx.fillRect(px + 8, py + 8, 1, 1);

    // Tiny cattail-like tufts at top of some reeds
    ctx.fillStyle = isDark() ? '#483820' : '#907040';
    ctx.fillRect(px - 18, py - 2, 1, 1);
    ctx.fillRect(px - 10, py + 5, 1, 1);
    ctx.fillRect(px + 16, py, 1, 1);

    // === Bonsai Black Pine (slanting right over pond) ===
    // Trunk base at left pond edge, leaning right
    var bx = px - 26, by = py - 2; // base of trunk at y=20
    var trunk = isDark() ? '#3a2010' : '#5a3820';
    var trunkHi = isDark() ? '#4a3020' : '#7a5838';
    // 5 foliage layers: darkest at bottom, lightest at top
    var needles = isDark()
      ? ['#0c2008', '#142c10', '#1c3818', '#284820', '#346028']
      : ['#1a4818', '#286828', '#388838', '#50a848', '#68c058'];
    var needleHi = isDark()
      ? ['#142c10', '#1c3818', '#284820', '#346028', '#407030']
      : ['#286828', '#388838', '#50a848', '#68c058', '#80d070'];

    // Trunk — thick (3px), slanting right from base upward
    // Base section (thick, grounded)
    ctx.fillStyle = trunk;
    ctx.fillRect(bx, by, 3, 1);        // y+6
    ctx.fillRect(bx, by - 1, 3, 1);    // y+5
    ctx.fillRect(bx + 1, by - 2, 3, 1); // y+4 shift right
    ctx.fillRect(bx + 1, by - 3, 2, 1); // y+3
    ctx.fillRect(bx + 2, by - 4, 2, 1); // y+2 shift right
    ctx.fillRect(bx + 2, by - 5, 2, 1); // y+1
    ctx.fillRect(bx + 3, by - 6, 2, 1); // y+0
    ctx.fillRect(bx + 3, by - 7, 2, 1); // y-1
    ctx.fillRect(bx + 4, by - 8, 2, 1); // y-2
    ctx.fillRect(bx + 4, by - 9, 2, 1); // y-3
    ctx.fillRect(bx + 5, by - 10, 2, 1); // y-4
    ctx.fillRect(bx + 5, by - 11, 1, 1); // y-5 thins to 1px
    ctx.fillRect(bx + 6, by - 12, 1, 1); // y-6
    ctx.fillRect(bx + 6, by - 13, 1, 1); // y-7
    // Trunk highlight (right edge)
    ctx.fillStyle = trunkHi;
    ctx.fillRect(bx + 2, by, 1, 1);
    ctx.fillRect(bx + 3, by - 2, 1, 1);
    ctx.fillRect(bx + 3, by - 4, 1, 1);
    ctx.fillRect(bx + 5, by - 8, 1, 1);

    // Exposed root at base
    ctx.fillStyle = trunk;
    ctx.fillRect(bx - 1, by, 1, 1);
    ctx.fillRect(bx + 3, by, 1, 1);

    // Layer 1 (bottom) — fans RIGHT, darkest
    var lx1 = bx + 2, ly1 = by - 3;
    ctx.fillStyle = needles[0];
    ctx.fillRect(lx1 + 2, ly1, 5, 1);
    ctx.fillRect(lx1 + 1, ly1 - 1, 6, 1);
    ctx.fillRect(lx1 + 3, ly1 + 1, 4, 1);
    ctx.fillStyle = needleHi[0];
    ctx.fillRect(lx1 + 2, ly1 - 1, 2, 1);

    // Layer 2 — fans LEFT
    var lx2 = bx + 3, ly2 = by - 6;
    ctx.fillStyle = needles[1];
    ctx.fillRect(lx2 - 5, ly2, 6, 1);
    ctx.fillRect(lx2 - 4, ly2 - 1, 5, 1);
    ctx.fillRect(lx2 - 4, ly2 + 1, 4, 1);
    ctx.fillStyle = needleHi[1];
    ctx.fillRect(lx2 - 3, ly2 - 1, 2, 1);

    // Layer 3 — fans RIGHT
    var lx3 = bx + 4, ly3 = by - 8;
    ctx.fillStyle = needles[2];
    ctx.fillRect(lx3 + 1, ly3, 5, 1);
    ctx.fillRect(lx3 + 2, ly3 - 1, 5, 1);
    ctx.fillRect(lx3 + 2, ly3 + 1, 3, 1);
    ctx.fillStyle = needleHi[2];
    ctx.fillRect(lx3 + 3, ly3 - 1, 2, 1);

    // Layer 4 — fans LEFT
    var lx4 = bx + 5, ly4 = by - 11;
    ctx.fillStyle = needles[3];
    ctx.fillRect(lx4 - 4, ly4, 5, 1);
    ctx.fillRect(lx4 - 3, ly4 - 1, 4, 1);
    ctx.fillRect(lx4 - 3, ly4 + 1, 3, 1);
    ctx.fillStyle = needleHi[3];
    ctx.fillRect(lx4 - 2, ly4 - 1, 2, 1);

    // Layer 5 (top crown) — fans RIGHT, lightest
    var lx5 = bx + 6, ly5 = by - 13;
    ctx.fillStyle = needles[4];
    ctx.fillRect(lx5 - 1, ly5, 4, 1);
    ctx.fillRect(lx5, ly5 - 1, 4, 1);
    ctx.fillRect(lx5 - 1, ly5 + 1, 3, 1);
    ctx.fillStyle = needleHi[4];
    ctx.fillRect(lx5, ly5 - 1, 2, 1);

    // === Bonsai reflection in pond ===
    ctx.globalAlpha = 0.2;
    // Reflection in water near left edge — simplified, shifted into pond bounds
    var brx = px - 18, bry = py + 1; // inside pond water
    ctx.fillStyle = trunk;
    ctx.fillRect(brx, bry, 2, 1);
    ctx.fillRect(brx, bry + 1, 2, 1);
    ctx.fillRect(brx - 1, bry + 2, 2, 1);
    ctx.fillRect(brx - 1, bry + 3, 2, 1);
    ctx.fillRect(brx - 2, bry + 4, 2, 1);
    // Foliage reflection (muted blobs)
    ctx.fillStyle = needles[1];
    ctx.fillRect(brx, bry, 4, 1);
    ctx.fillRect(brx - 3, bry + 2, 4, 1);
    ctx.fillStyle = needles[2];
    ctx.fillRect(brx + 1, bry + 4, 3, 1);
    ctx.globalAlpha = 1.0;

    // === Left pond edge — boulders ===
    const sDark = isDark() ? '#302820' : '#585048';
    const sMid = isDark() ? '#403830' : '#706860';
    const sHi = isDark() ? '#504840' : '#888078';

    // Boulder partially submerged in water (upper-left)
    ctx.fillStyle = sMid;
    ctx.fillRect(px - 18, py - 2, 4, 3);
    ctx.fillRect(px - 19, py - 1, 5, 2);
    ctx.fillStyle = sHi;
    ctx.fillRect(px - 17, py - 2, 2, 1);

    // Large rock at mid-left edge, half in water
    ctx.fillStyle = sDark;
    ctx.fillRect(px - 24, py + 4, 5, 4);
    ctx.fillRect(px - 25, py + 5, 7, 3);
    ctx.fillStyle = sHi;
    ctx.fillRect(px - 24, py + 4, 3, 1);

    // Small submerged rock (peeking from water at lower-left)
    ctx.fillStyle = sMid;
    ctx.fillRect(px - 14, py + 8, 3, 2);
    ctx.fillStyle = sHi;
    ctx.fillRect(px - 13, py + 8, 1, 1);

    // Boulder at bottom-left of pond
    ctx.fillStyle = sDark;
    ctx.fillRect(px - 4, py + 11, 4, 2);
    ctx.fillStyle = sHi;
    ctx.fillRect(px - 3, py + 11, 2, 1);
    // Moss
    ctx.fillStyle = p.lilyPad;
    ctx.fillRect(px - 4, py + 10, 2, 1);

    // Right edge — boulder at upper-right
    ctx.fillStyle = sMid;
    ctx.fillRect(px + 18, py - 3, 4, 3);
    ctx.fillRect(px + 17, py - 2, 5, 2);
    ctx.fillStyle = sHi;
    ctx.fillRect(px + 18, py - 3, 2, 1);
    // Moss
    ctx.fillStyle = p.lilyPad;
    ctx.fillRect(px + 19, py - 4, 2, 1);

    // Right edge — rock at mid-right
    ctx.fillStyle = sDark;
    ctx.fillRect(px + 20, py + 4, 3, 3);
    ctx.fillRect(px + 19, py + 5, 5, 2);
    ctx.fillStyle = sHi;
    ctx.fillRect(px + 20, py + 4, 2, 1);
    // Moss
    ctx.fillStyle = p.lilyPad;
    ctx.fillRect(px + 20, py + 3, 1, 1);

    // Right edge — small rock at lower-right
    ctx.fillStyle = sMid;
    ctx.fillRect(px + 14, py + 9, 3, 2);
    ctx.fillStyle = sHi;
    ctx.fillRect(px + 14, py + 9, 1, 1);

    // Top edge — rock at center-top
    ctx.fillStyle = sDark;
    ctx.fillRect(px - 2, py - 5, 4, 2);
    ctx.fillRect(px - 3, py - 4, 5, 1);
    ctx.fillStyle = sHi;
    ctx.fillRect(px - 1, py - 5, 2, 1);
    // Moss
    ctx.fillStyle = p.lilyPad;
    ctx.fillRect(px - 2, py - 6, 2, 1);

    // Bottom edge — flat rock
    ctx.fillStyle = sMid;
    ctx.fillRect(px + 4, py + 12, 4, 2);
    ctx.fillStyle = sHi;
    ctx.fillRect(px + 5, py + 12, 2, 1);

    // --- Stepping stones across the narrow part of the pond ---
    ctx.fillStyle = sHi;
    ctx.fillRect(px - 16, py + 3, 2, 1);
    ctx.fillStyle = p.lilyPad;
    ctx.fillRect(px - 16, py + 2, 1, 1);

    ctx.fillStyle = sHi;
    ctx.fillRect(px - 12, py + 3, 2, 1);
    ctx.fillStyle = p.lilyPad;
    ctx.fillRect(px - 11, py + 2, 1, 1);

    ctx.fillStyle = sHi;
    ctx.fillRect(px - 8, py + 4, 2, 1);

    ctx.fillStyle = sHi;
    ctx.fillRect(px - 4, py + 4, 2, 1);
    ctx.fillStyle = p.lilyPad;
    ctx.fillRect(px - 4, py + 3, 1, 1);

    // --- Flowering bushes around pond edges ---
    // Azalea (red) — near bottom-left
    ctx.fillStyle = p.pineNeedleDark;
    ctx.fillRect(px - 8, py + 9, 4, 2);
    ctx.fillRect(px - 9, py + 10, 5, 2);
    ctx.fillStyle = p.azaleaRed;
    ctx.fillRect(px - 7, py + 9, 1, 1);
    ctx.fillRect(px - 9, py + 10, 1, 1);
    ctx.fillStyle = p.azaleaRedHi;
    ctx.fillRect(px - 6, py + 8, 1, 1);

    // Small green bush — near top-center rock
    ctx.fillStyle = p.pineNeedleLight;
    ctx.fillRect(px + 3, py - 5, 3, 2);
    ctx.fillRect(px + 2, py - 4, 4, 1);


    // === Cattails & water grasses along engawa edge (bottom of pond) ===
    var gDark = isDark() ? '#1a3810' : '#2a6820';
    var gMid = isDark() ? '#284818' : '#48982e';
    var gLight = isDark() ? '#386028' : '#68b848';
    var cattailBrown = isDark() ? '#3a2818' : '#705030';
    var cattailHi = isDark() ? '#4a3828' : '#886840';

    // Water grass clumps — thin blades growing up from pond edge near engawa (y~29-30)
    // Left cluster (near x=120-128)
    ctx.fillStyle = gDark;
    ctx.fillRect(px - 10, py + 7, 1, 3);
    ctx.fillRect(px - 8, py + 6, 1, 4);
    ctx.fillRect(px - 7, py + 7, 1, 3);
    ctx.fillStyle = gMid;
    ctx.fillRect(px - 9, py + 7, 1, 2);
    ctx.fillRect(px - 6, py + 8, 1, 2);
    ctx.fillStyle = gLight;
    ctx.fillRect(px - 8, py + 6, 1, 1);
    ctx.fillRect(px - 10, py + 7, 1, 1);

    // Center-left cluster (near x=129-135)
    ctx.fillStyle = gDark;
    ctx.fillRect(px - 1, py + 9, 1, 3);
    ctx.fillRect(px + 1, py + 8, 1, 4);
    ctx.fillRect(px + 3, py + 9, 1, 3);
    ctx.fillStyle = gMid;
    ctx.fillRect(px, py + 9, 1, 2);
    ctx.fillRect(px + 2, py + 8, 1, 3);
    ctx.fillStyle = gLight;
    ctx.fillRect(px + 1, py + 8, 1, 1);
    ctx.fillRect(px + 3, py + 9, 1, 1);

    // Center-right cluster (near x=140-148)
    ctx.fillStyle = gDark;
    ctx.fillRect(px + 10, py + 7, 1, 3);
    ctx.fillRect(px + 12, py + 6, 1, 4);
    ctx.fillRect(px + 14, py + 7, 1, 3);
    ctx.fillStyle = gMid;
    ctx.fillRect(px + 11, py + 7, 1, 2);
    ctx.fillRect(px + 13, py + 7, 1, 2);
    ctx.fillStyle = gLight;
    ctx.fillRect(px + 12, py + 6, 1, 1);
    ctx.fillRect(px + 14, py + 7, 1, 1);

    // Right cluster (near x=148-155)
    ctx.fillStyle = gDark;
    ctx.fillRect(px + 18, py + 5, 1, 3);
    ctx.fillRect(px + 20, py + 4, 1, 4);
    ctx.fillStyle = gMid;
    ctx.fillRect(px + 19, py + 5, 1, 2);
    ctx.fillStyle = gLight;
    ctx.fillRect(px + 20, py + 4, 1, 1);

    // Cattails — thick brown heads on tall stems
    // Cattail 1 (left side)
    ctx.fillStyle = gDark;
    ctx.fillRect(px - 5, py + 5, 1, 6);
    ctx.fillStyle = cattailBrown;
    ctx.fillRect(px - 5, py + 4, 1, 2);
    ctx.fillStyle = cattailHi;
    ctx.fillRect(px - 5, py + 4, 1, 1);

    // Cattail 2 (center-left)
    ctx.fillStyle = gDark;
    ctx.fillRect(px + 5, py + 6, 1, 6);
    ctx.fillStyle = cattailBrown;
    ctx.fillRect(px + 5, py + 5, 1, 2);
    ctx.fillStyle = cattailHi;
    ctx.fillRect(px + 5, py + 5, 1, 1);

    // Cattail 3 (center-right)
    ctx.fillStyle = gDark;
    ctx.fillRect(px + 8, py + 5, 1, 5);
    ctx.fillStyle = cattailBrown;
    ctx.fillRect(px + 8, py + 4, 1, 2);
    ctx.fillStyle = cattailHi;
    ctx.fillRect(px + 8, py + 4, 1, 1);

    // Cattail 4 (right side)
    ctx.fillStyle = gDark;
    ctx.fillRect(px + 16, py + 4, 1, 5);
    ctx.fillStyle = cattailBrown;
    ctx.fillRect(px + 16, py + 3, 1, 2);
    ctx.fillStyle = cattailHi;
    ctx.fillRect(px + 16, py + 3, 1, 1);
  }

  // ---- Stone lantern (tōrō) — 17px tall × 5px wide ----
  function drawLantern(lx, ly, time) {
    const lDark = isDark() ? '#383830' : '#686860';
    const lMid = isDark() ? '#484840' : '#808078';
    const lLight = isDark() ? '#585850' : '#a0a098';
    ctx.fillStyle = lDark;
    ctx.fillRect(lx + 2, ly, 1, 2);
    ctx.fillStyle = lMid;
    ctx.fillRect(lx, ly + 2, 5, 1);
    ctx.fillRect(lx - 1, ly + 3, 7, 1);
    ctx.fillStyle = lDark;
    ctx.fillRect(lx, ly + 4, 5, 4);
    if (isDark()) {
      var lFlicker = 0.7 + 0.3 * Math.sin(time * 0.12 + lx) * Math.sin(time * 0.07 + lx * 0.5);
      ctx.fillStyle = '#e0a030';
      ctx.globalAlpha = lFlicker;
      ctx.fillRect(lx + 1, ly + 5, 3, 2);
      ctx.globalAlpha = lFlicker * 0.25;
      ctx.fillRect(lx, ly + 5, 1, 2);
      ctx.fillRect(lx + 4, ly + 5, 1, 2);
      ctx.globalAlpha = 1;
    } else {
      ctx.fillStyle = '#e8c060';
      ctx.fillRect(lx + 1, ly + 5, 3, 2);
    }
    ctx.fillStyle = lMid;
    ctx.fillRect(lx, ly + 8, 5, 1);
    ctx.fillRect(lx - 1, ly + 9, 7, 1);
    ctx.fillStyle = lLight;
    ctx.fillRect(lx + 1, ly + 10, 3, 3);
    ctx.fillStyle = lDark;
    ctx.fillRect(lx + 1, ly + 10, 1, 3);
    ctx.fillStyle = lMid;
    ctx.fillRect(lx - 1, ly + 16, 7, 1);
    ctx.fillStyle = lDark;
    ctx.fillRect(lx, ly + 17, 5, 2);
    ctx.fillRect(lx - 1, ly + 19, 7, 1);
  }

  // ---- Pine tree (niwaki) ----
  function drawPine(x, baseY, height, foliageTiers, time, phase) {
    const p = P();
    const sway = Math.floor(Math.sin(time * 0.02 + phase) * 1);
    // Trunk
    ctx.fillStyle = p.pineWood;
    for (let ty = 0; ty < height; ty++) {
      const lean = Math.floor(ty * 0.15);
      ctx.fillRect(x - lean, baseY - ty, 2, 1);
    }
    // Branches at each foliage tier
    for (let tier = 0; tier < foliageTiers; tier++) {
      const ty = baseY - Math.floor(height * 0.4) - tier * 4;
      const lean = Math.floor((baseY - ty) * 0.15);
      const fx = x - lean;
      // Branch stubs
      ctx.fillStyle = p.pineWood;
      ctx.fillRect(fx - 3, ty + 1, 3, 1);
      ctx.fillRect(fx + 2, ty + 1, 4, 1);
      // Cloud-pruned foliage cluster
      ctx.fillStyle = p.pineNeedleDark;
      ctx.fillRect(fx - 3 + sway, ty - 1, 5, 2);
      ctx.fillRect(fx - 2 + sway, ty - 2, 3, 1);
      ctx.fillRect(fx + 1, ty - 1, 5, 2);
      ctx.fillRect(fx + 2 + sway, ty - 2, 3, 1);
      ctx.fillStyle = p.pineNeedleLight;
      ctx.fillRect(fx - 1 + sway, ty - 1, 2, 1);
      ctx.fillRect(fx + 2, ty - 1, 2, 1);
    }
    // Top crown
    const topY = baseY - height;
    const topLean = Math.floor(height * 0.15);
    ctx.fillStyle = p.pineNeedleDark;
    ctx.fillRect(x - topLean - 1 + sway, topY, 4, 2);
    ctx.fillRect(x - topLean + sway, topY - 1, 2, 1);
    ctx.fillStyle = p.pineNeedleLight;
    ctx.fillRect(x - topLean + sway, topY, 2, 1);
  }

  // ---- Sakura (cherry blossom) tree ----
  function drawSakura(x, baseY, time) {
    const p = P();
    // Slender trunk
    ctx.fillStyle = p.sakuraTrunk;
    ctx.fillRect(x, baseY - 12, 1, 12);
    ctx.fillRect(x - 1, baseY - 10, 1, 4); // small branch left
    ctx.fillRect(x + 1, baseY - 8, 1, 3);  // small branch right
    // Canopy — irregular mass of pink pixels
    const cx = x - 5, cy = baseY - 16;
    ctx.fillStyle = p.sakuraPink;
    ctx.fillRect(cx + 2, cy, 8, 2);
    ctx.fillRect(cx + 1, cy + 2, 10, 2);
    ctx.fillRect(cx, cy + 4, 12, 2);
    ctx.fillRect(cx + 1, cy + 6, 10, 1);
    ctx.fillRect(cx + 3, cy + 7, 6, 1);
    // Lighter highlights
    ctx.fillStyle = p.sakuraPinkLight;
    ctx.fillRect(cx + 3, cy, 3, 1);
    ctx.fillRect(cx + 2, cy + 2, 4, 1);
    ctx.fillRect(cx + 7, cy + 4, 3, 1);
    // White bloom spots
    ctx.fillStyle = p.koiWhite;
    ctx.fillRect(cx + 5, cy + 1, 1, 1);
    ctx.fillRect(cx + 2, cy + 4, 1, 1);
    ctx.fillRect(cx + 9, cy + 3, 1, 1);
    ctx.fillRect(cx + 4, cy + 6, 1, 1);
  }

  // ---- Azalea bush ----
  function drawBush(bx, by, w, h, color, hiColor) {
    ctx.fillStyle = color;
    for (let row = 0; row < h; row++) {
      const bw = row === 0 ? w - 1 : w;
      const ox = row === 0 ? 1 : 0;
      ctx.fillRect(bx + ox, by + row, bw, 1);
    }
    ctx.fillStyle = hiColor;
    ctx.fillRect(bx + 1, by, Math.max(1, w - 2), 1);
  }


  // ---- Koi fish ----
  function drawKoi(px, py, time, i, bodyColor) {
    const p = P();
    // Swim along sine path within pond
    const dir = (Math.floor(time / 80 + i * 30) % 2 === 0) ? 1 : -1;
    const kx = px + 4 + Math.floor(((time * 0.1 * dir + i * 40) % 24 + 24) % 24);
    const ky = py + 1 + Math.floor(Math.sin(time * 0.04 + i * 2) * 1.5 + 1.5);
    if (ky < py || ky > py + 4) return;
    // 3px fish: tail, body, head
    ctx.fillStyle = bodyColor;
    ctx.fillRect(kx, ky, 1, 1);
    ctx.fillStyle = p.koiWhite;
    ctx.fillRect(kx + dir, ky, 1, 1);
    ctx.fillStyle = bodyColor;
    ctx.fillRect(kx + dir * 2, ky, 1, 1);
  }

  // ---- Shishi-odoshi & Tsukubai ----
  function drawShishiodoshi(x, y, time) {
    const p = P();
    const frame = Math.floor(time) % 120;
    const filling = frame < 80;
    const tipping = frame >= 80 && frame < 95;
    // Tsukubai (basin)
    ctx.fillStyle = p.basinGray;
    ctx.fillRect(x, y + 4, 4, 2);
    ctx.fillRect(x - 1, y + 5, 6, 1);
    // Water in basin
    ctx.fillStyle = p.pondWater;
    ctx.fillRect(x, y + 4, 4, 1);
    // Kakehi (feed pipe)
    ctx.fillStyle = p.bambooGreen;
    ctx.fillRect(x + 5, y - 2, 1, 6);
    ctx.fillRect(x + 4, y - 2, 3, 1);
    // Sozu (rocker)
    ctx.fillStyle = p.bambooGreen;
    if (filling) {
      // Angled up
      ctx.fillRect(x + 1, y + 1, 3, 1);
      ctx.fillRect(x + 3, y, 2, 1);
      // Water drip from pipe
      ctx.fillStyle = p.waterBlue;
      const dripY = y - 1 + Math.floor((frame % 10) / 3);
      ctx.fillRect(x + 5, dripY, 1, 1);
    } else if (tipping) {
      // Snapped down
      ctx.fillRect(x + 1, y + 2, 3, 1);
      ctx.fillRect(x, y + 3, 2, 1);
      // Water splash
      ctx.fillStyle = p.waterBlue;
      ctx.fillRect(x, y + 3, 1, 1);
      ctx.fillRect(x + 1, y + 4, 1, 1);
    } else {
      // Reset — springing back up
      ctx.fillRect(x + 1, y + 1, 3, 1);
      ctx.fillRect(x + 3, y, 2, 1);
    }
  }

  // ---- Engawa (outdoor hallway, same height as a tatami row = 6px) ----
  function drawEngawa() {
    const p = P();
    // Engawa sits at y=30-36, right above the door track at y=35-36
    ctx.fillStyle = p.engawaWood;
    ctx.fillRect(0, 30, W, 6);
    // Top highlight
    ctx.fillStyle = p.gardenStone;
    ctx.globalAlpha = 0.3;
    ctx.fillRect(0, 30, W, 1);
    ctx.globalAlpha = 1;
    // Shadow at bottom edge
    ctx.fillStyle = p.engawaShadow;
    ctx.fillRect(0, 35, W, 1);
  }

  // ---- Shoji door — upper section: 3 cols × (5 paper + 1 glass) rows, bottom: solid panel (150% of 1/5) ----
  function drawShojiDoor(x, w) {
    const p = P();
    ctx.globalAlpha = 1;
    // Door spans from y=0 (top of banner) to y=36 (top of tatami)
    const top = 0, bot = 36, h = bot - top;
    const solidH = Math.floor(h / 5 * 1.5); // 150% of original 1/5
    const panelSplit = bot - solidH; // y where solid bottom panel starts
    const cols = 3, rows = 6; // 5 paper rows + 1 glass row
    const paneH = (panelSplit - top - 2) / rows;

    // The 6th (bottom) row of the grid is glass — find its top y
    const glassTop = Math.floor(top + 1 + 5 * paneH);

    // Paper fill — only rows 1-4 of the upper grid (above glass)
    ctx.fillStyle = p.shojiPaper;
    ctx.fillRect(x, top, w, glassTop - top);

    // Solid bottom panel (below grid) — fully opaque paper
    ctx.fillRect(x, panelSplit, w, bot - panelSplit);

    // Outer frame
    ctx.fillStyle = p.shojiFrame;
    ctx.fillRect(x, top, w, 1);         // top
    ctx.fillRect(x, bot - 1, w, 1);     // bottom
    ctx.fillRect(x, top, 1, h);         // left
    ctx.fillRect(x + w - 1, top, 1, h); // right

    // Horizontal divider separating upper grid from solid bottom panel
    ctx.fillRect(x + 1, panelSplit, w - 2, 1);

    // Upper section grid (thinner inner lines)
    ctx.globalAlpha = 0.5;
    // Vertical dividers (full upper section height including glass row)
    const paneW = (w - 2) / cols;
    for (let c = 1; c < cols; c++) {
      const gx = Math.floor(x + 1 + c * paneW);
      ctx.fillRect(gx, top + 1, 1, panelSplit - top - 1);
    }
    // Horizontal dividers (6 rows → 5 dividers)
    for (let r = 1; r < rows; r++) {
      const gy = Math.floor(top + 1 + r * paneH);
      ctx.fillRect(x + 1, gy, w - 2, 1);
    }
    ctx.globalAlpha = 1;
  }

  // ---- Tatami (25% of 48px = 12px, y=36 to y=48) ----
  // Two rows, 6px each:
  //   Row 1 (y=36-42): all horizontal mats (28px wide × 6px tall)
  //   Row 2 (y=42-48): all vertical mats (14px wide × 12px tall, 6px visible)
  //
  // Row 1 joints at: 28, 56, 84, 112, 140, 168, 196, 224, 252
  // Row 2 joints at: 7, 21, 35, 49, 63, 77, 91, 105, ... (offset 7px)
  // → Joints never align between rows → T-intersections only ✓

  function drawMat(mx, my, mw, mh, isVertical, alt) {
    const p = P();
    ctx.fillStyle = alt ? p.tatami2 : p.tatami1;
    ctx.fillRect(mx, my, mw, mh);
    // Weave texture direction matches mat orientation
    ctx.fillStyle = p.tatamiLine;
    ctx.globalAlpha = 0.18;
    if (!isVertical) {
      // Horizontal mat — horizontal weave lines
      for (let ty = my + 2; ty < my + mh; ty += 2) {
        for (let tx = mx + 1; tx < mx + mw; tx += 2) {
          ctx.fillRect(tx, ty, 1, 1);
        }
      }
    } else {
      // Vertical mat — vertical weave lines
      for (let tx = mx + 2; tx < mx + mw; tx += 2) {
        for (let ty = my + 1; ty < my + mh; ty += 2) {
          ctx.fillRect(tx, ty, 1, 1);
        }
      }
    }
    ctx.globalAlpha = 1;
  }

  function drawTatami() {
    const p = P();
    const y = 36, rowH = 6;
    const matW1 = 28; // horizontal mat width (row 1)
    const matW2 = 28; // vertical mat width (row 2)
    const offset2 = 14; // offset for row 2

    // Base fill
    ctx.fillStyle = p.tatami1;
    ctx.fillRect(0, y, W, rowH * 2);

    // Row 1 (y=36-42): horizontal mats
    for (let i = 0; i * matW1 < W; i++) {
      const mw = Math.min(matW1, W - i * matW1);
      drawMat(i * matW1, y, mw, rowH, false, i % 2 === 0);
    }

    // Row 2 (y=42-48): vertical mats, offset by 7px
    // Partial mat at left edge
    drawMat(0, y + rowH, offset2, rowH, true, true);
    for (let i = 0; i * matW2 + offset2 < W; i++) {
      const mx = i * matW2 + offset2;
      const mw = Math.min(matW2, W - mx);
      drawMat(mx, y + rowH, mw, rowH, true, i % 2 === 0);
    }

    // Edge borders between mats
    ctx.fillStyle = p.tatamiEdge;
    // Top edge of tatami
    ctx.fillRect(0, y, W, 1);
    // Row boundary
    ctx.fillRect(0, y + rowH, W, 1);
    // Row 1 vertical joints
    for (let i = 1; i * matW1 < W; i++) {
      ctx.fillRect(i * matW1, y, 1, rowH);
    }
    // Row 2 vertical joints (offset)
    if (offset2 > 0) ctx.fillRect(offset2, y + rowH, 1, rowH);
    for (let i = 1; i * matW2 + offset2 < W; i++) {
      ctx.fillRect(i * matW2 + offset2, y + rowH, 1, rowH);
    }
  }

  // ---- Tokonoma (bird's eye view — recessed alcove in tatami zone, right side) ----
  function drawTokonoma() {
    const p = P();
    const x = 252, y = 36, w = 25, h = 12;
    // Back wall (top edge — the "far" wall of the alcove, recessed)
    ctx.fillStyle = p.tokoBack;
    ctx.fillRect(x, y, w, 2);
    // Side wall left edge
    ctx.fillRect(x, y, 1, h);
    // Alcove floor (lighter, recessed)
    ctx.fillStyle = p.tokoPost;
    ctx.fillRect(x + 1, y + 2, w - 1, h - 2);

    // Moribana arrangement — vase centered, two pine branches reaching left
    // Vase: centered in tokonoma (both horizontally and vertically)
    const vx = x + Math.floor(w / 2) - 2, vy = y - 4;
    ctx.fillStyle = p.chawan;
    ctx.fillRect(vx - 1, vy, 6, 1);     // rim
    ctx.fillRect(vx, vy + 1, 4, 1);     // neck
    ctx.fillRect(vx - 1, vy + 2, 6, 1); // widening
    ctx.fillRect(vx - 1, vy + 3, 6, 3); // belly (widest)
    ctx.fillRect(vx - 1, vy + 6, 6, 1); // narrowing
    ctx.fillRect(vx, vy + 7, 4, 2);     // lower body
    ctx.fillRect(vx, vy + 9, 4, 1);     // base

    // Branch 1 (longer, lower) — gentle S-curve: exits left, curves UP slightly, then arcs back DOWN
    ctx.fillStyle = p.sakuraTrunk;
    ctx.fillRect(vx - 1, vy + 1, 1, 1);
    ctx.fillRect(vx - 3, vy, 3, 1);
    ctx.fillRect(vx - 6, vy - 1, 4, 1);
    ctx.fillRect(vx - 9, vy - 2, 4, 1);
    ctx.fillRect(vx - 12, vy - 3, 4, 1);
    ctx.fillRect(vx - 15, vy - 3, 4, 1);
    ctx.fillRect(vx - 18, vy - 3, 4, 1);
    ctx.fillRect(vx - 21, vy - 2, 4, 1);
    ctx.fillRect(vx - 24, vy - 1, 4, 1);
    ctx.fillRect(vx - 26, vy, 3, 1);
    ctx.fillRect(vx - 28, vy + 1, 3, 1);

    // Branch 2 (shorter, higher) — arcs UP steeply, gentle curve at end
    ctx.fillRect(vx - 1, vy - 1, 1, 1);
    ctx.fillRect(vx - 3, vy - 3, 3, 1);
    ctx.fillRect(vx - 6, vy - 5, 4, 1);
    ctx.fillRect(vx - 9, vy - 7, 4, 1);
    ctx.fillRect(vx - 12, vy - 9, 4, 1);
    ctx.fillRect(vx - 15, vy - 10, 4, 1);
    ctx.fillRect(vx - 17, vy - 10, 3, 1);

    // Branch 3 (tiny, 1 o'clock direction)
    ctx.fillStyle = p.sakuraTrunk;
    ctx.fillRect(vx + 3, vy - 1, 1, 1);
    ctx.fillRect(vx + 4, vy - 2, 1, 1);
    // Small needle tuft
    ctx.fillStyle = p.pineNeedleDark;
    ctx.fillRect(vx + 3, vy - 5, 3, 3);
    ctx.fillRect(vx + 5, vy - 4, 2, 2);
    ctx.fillStyle = p.pineNeedleLight;
    ctx.fillRect(vx + 4, vy - 5, 2, 1);

    // Branch 4 (tiny, 6 o'clock direction — straight down from vase lip)
    ctx.fillStyle = p.sakuraTrunk;
    ctx.fillRect(vx + 1, vy + 1, 1, 1);
    ctx.fillRect(vx + 1, vy + 2, 1, 1);
    // Small needle tuft
    ctx.fillStyle = p.pineNeedleDark;
    ctx.fillRect(vx, vy + 2, 3, 3);
    ctx.fillRect(vx - 1, vy + 3, 2, 2);
    ctx.fillStyle = p.pineNeedleLight;
    ctx.fillRect(vx + 1, vy + 2, 2, 1);

    // Pine needle clusters along branch 1 (gentle S-curve) — bigger foliage
    ctx.fillStyle = p.pineNeedleDark;
    // Tip cluster (end of S)
    ctx.fillRect(vx - 30, vy - 2, 4, 3);
    ctx.fillRect(vx - 31, vy - 1, 2, 3);
    ctx.fillRect(vx - 29, vy - 3, 3, 1);
    // Mid-outer cluster
    ctx.fillRect(vx - 21, vy - 5, 4, 3);
    ctx.fillRect(vx - 22, vy - 4, 2, 2);
    // Peak cluster (top of gentle S)
    ctx.fillRect(vx - 17, vy - 6, 5, 3);
    ctx.fillRect(vx - 18, vy - 5, 2, 3);
    ctx.fillRect(vx - 13, vy - 5, 2, 2);
    // Inner cluster
    ctx.fillRect(vx - 10, vy - 5, 4, 3);
    ctx.fillRect(vx - 7, vy - 3, 3, 2);
    ctx.fillStyle = p.pineNeedleLight;
    ctx.fillRect(vx - 29, vy - 2, 2, 1);
    ctx.fillRect(vx - 20, vy - 5, 2, 1);
    ctx.fillRect(vx - 16, vy - 6, 2, 1);
    ctx.fillRect(vx - 9, vy - 5, 2, 1);
    ctx.fillRect(vx - 6, vy - 3, 1, 1);

    // Pine needle clusters along branch 2 (higher arc) — bigger foliage
    ctx.fillStyle = p.pineNeedleDark;
    // Tip cluster
    ctx.fillRect(vx - 19, vy - 13, 4, 3);
    ctx.fillRect(vx - 20, vy - 12, 2, 3);
    ctx.fillRect(vx - 16, vy - 12, 2, 2);
    // Mid cluster
    ctx.fillRect(vx - 12, vy - 12, 4, 3);
    ctx.fillRect(vx - 13, vy - 11, 2, 2);
    // Inner cluster
    ctx.fillRect(vx - 7, vy - 9, 3, 3);
    ctx.fillRect(vx - 5, vy - 7, 2, 2);
    ctx.fillStyle = p.pineNeedleLight;
    ctx.fillRect(vx - 18, vy - 13, 2, 1);
    ctx.fillRect(vx - 11, vy - 12, 2, 1);
    ctx.fillRect(vx - 6, vy - 9, 1, 1);
  }

  // ---- Low table (facing tokonoma — end-on view, 35px wide, 9 rows deep) ----
  function drawTable(x, y) {
    const p = P();
    // Top surface (receding towards tokonoma, 9 rows of depth)
    ctx.fillStyle = p.tableBrownLight;
    ctx.fillRect(x + 6, y - 8, 23, 1);   // back edge (narrowest)
    ctx.fillRect(x + 5, y - 7, 25, 1);
    ctx.fillRect(x + 4, y - 6, 27, 1);
    ctx.fillRect(x + 3, y - 5, 29, 1);
    ctx.fillRect(x + 2, y - 4, 31, 1);
    ctx.fillRect(x + 2, y - 3, 31, 1);
    ctx.fillRect(x + 1, y - 2, 33, 1);
    ctx.fillRect(x, y - 1, 35, 1);
    ctx.fillRect(x, y, 35, 1);            // front edge of top
    // Front face (the short end we see)
    ctx.fillStyle = p.tableBrown;
    ctx.fillRect(x, y + 1, 35, 2);
    // Front legs
    ctx.fillRect(x + 1, y + 3, 2, 3);
    ctx.fillRect(x + 32, y + 3, 2, 3);
    // Shadow under table
    ctx.fillStyle = p.tableBrown;
    ctx.globalAlpha = 0.2;
    ctx.fillRect(x + 3, y + 6, 29, 1);
    ctx.globalAlpha = 1;
  }

  // ---- Round sitting cushion (zafu) ----
  function drawCushion(x, y) {
    const p = P();
    var cDark = isDark() ? '#2a1828' : '#3a2848';
    var cMid  = isDark() ? '#382838' : '#4a3860';
    var cHi   = isDark() ? '#483848' : '#5a4870';
    // Oval shape ~11px wide, 6px tall
    ctx.fillStyle = cMid;
    ctx.fillRect(x + 2, y, 7, 1);        // top row
    ctx.fillRect(x + 1, y + 1, 9, 1);
    ctx.fillRect(x, y + 2, 11, 2);       // middle rows (widest)
    ctx.fillRect(x + 1, y + 4, 9, 1);
    ctx.fillRect(x + 2, y + 5, 7, 1);    // bottom row
    // Highlight on top
    ctx.fillStyle = cHi;
    ctx.fillRect(x + 3, y, 5, 1);
    ctx.fillRect(x + 2, y + 1, 6, 1);
    ctx.fillRect(x + 1, y + 2, 7, 1);
    // Shadow at bottom
    ctx.fillStyle = cDark;
    ctx.fillRect(x + 1, y + 4, 9, 1);
    ctx.fillRect(x + 2, y + 5, 7, 1);
  }

  // ---- Ikebana arrangement (Ohara upright rising form — calla lily) ----
  // x,y = top-left of vase
  function drawArrangement(x, y) {
    var vaseLt = isDark() ? '#888880' : '#e8e4dc';
    var vaseMd = isDark() ? '#686860' : '#d0ccc0';
    var vaseDk = isDark() ? '#505048' : '#b8b0a0';
    var stemGr = isDark() ? '#387038' : '#4a8848';
    // Low porcelain vase (8px wide, 3px tall — no rim row)
    ctx.fillStyle = vaseMd;
    ctx.fillRect(x, y, 8, 2);           // body
    ctx.fillRect(x + 1, y + 2, 6, 1);   // base
    // Highlight
    ctx.fillStyle = vaseLt;
    ctx.fillRect(x + 1, y, 3, 1);
    // Shadow
    ctx.fillStyle = vaseDk;
    ctx.fillRect(x + 6, y, 2, 2);
    ctx.fillRect(x + 1, y + 2, 6, 1);
    // Subject stem (shin) — tallest, upright, 1px wide
    ctx.fillStyle = stemGr;
    ctx.fillRect(x + 4, y - 14, 1, 14);
    // Calla lily flower at top of shin
    var callaWh = isDark() ? '#a0a098' : '#f4f0e8';
    var callaHi = isDark() ? '#b8b8b0' : '#faf8f0';
    var callaSp = isDark() ? '#a08828' : '#e8c830';
    // Spathe (funnel shape, side view)
    ctx.fillStyle = callaWh;
    ctx.fillRect(x + 3, y - 17, 3, 1);   // top curl
    ctx.fillRect(x + 2, y - 16, 3, 1);   // opening
    ctx.fillRect(x + 3, y - 15, 2, 1);   // narrowing
    // Highlight
    ctx.fillStyle = callaHi;
    ctx.fillRect(x + 4, y - 17, 2, 1);
    // Spadix (yellow center spike)
    ctx.fillStyle = callaSp;
    ctx.fillRect(x + 4, y - 18, 1, 1);
    // Secondary stem (kyaku) — 50° left from vertical
    ctx.fillStyle = stemGr;
    ctx.fillRect(x + 3, y - 1, 1, 1);
    ctx.fillRect(x + 2, y - 2, 1, 1);
    ctx.fillRect(x + 1, y - 3, 1, 1);
    ctx.fillRect(x - 1, y - 3, 2, 1);
    ctx.fillRect(x - 2, y - 4, 1, 1);
    ctx.fillRect(x - 3, y - 5, 1, 1);
    // White round bloom (ranunculus style, side view)
    var bloomWh = isDark() ? '#a0a098' : '#f0ece0';
    var bloomHi = isDark() ? '#b8b8b0' : '#faf8f0';
    var bloomCt = isDark() ? '#908868' : '#d8c890';
    ctx.fillStyle = bloomWh;
    ctx.fillRect(x - 5, y - 7, 3, 1);    // top
    ctx.fillRect(x - 6, y - 6, 5, 2);    // middle (widest)
    ctx.fillRect(x - 5, y - 4, 3, 1);    // bottom
    // Highlight
    ctx.fillStyle = bloomHi;
    ctx.fillRect(x - 5, y - 7, 2, 1);
    ctx.fillRect(x - 5, y - 6, 2, 1);
    // Center
    ctx.fillStyle = bloomCt;
    ctx.fillRect(x - 4, y - 6, 1, 1);
  }

  // ---- Large Japanese pine tree (left of 1st pine, even bigger) ----
  function drawBigPine() {
    const p = P();
    ctx.fillStyle = p.pineWood;
    // Lower trunk (7px wide — very thick base)
    ctx.fillRect(33, 26, 7, 4);
    ctx.fillRect(33, 23, 7, 4);
    // Mid-lower trunk (6px wide)
    ctx.fillRect(34, 20, 6, 4);
    ctx.fillRect(35, 17, 6, 4);
    // Mid trunk (5px wide)
    ctx.fillRect(36, 14, 5, 4);
    ctx.fillRect(37, 11, 5, 4);
    // Upper trunk (4px wide)
    ctx.fillRect(38, 8, 4, 4);
    ctx.fillRect(39, 5, 4, 4);
    ctx.fillRect(39, 2, 3, 4);
    // Top trunk (3px → 2px)
    ctx.fillRect(40, -2, 3, 5);
    ctx.fillRect(40, -6, 2, 5);
    ctx.fillRect(41, -10, 2, 5);
    ctx.fillRect(41, -14, 2, 5);

    // Major branches
    // Right branches
    ctx.fillRect(40, 17, 6, 1);
    ctx.fillRect(45, 16, 5, 1);
    ctx.fillRect(41, 12, 5, 1);
    ctx.fillRect(45, 11, 4, 1);
    ctx.fillRect(42, 7, 5, 1);
    ctx.fillRect(46, 6, 4, 1);
    ctx.fillRect(42, 3, 4, 1);
    ctx.fillRect(45, 2, 3, 1);
    // Left branches
    ctx.fillRect(28, 20, 6, 1);
    ctx.fillRect(24, 19, 5, 1);
    ctx.fillRect(30, 15, 5, 1);
    ctx.fillRect(26, 14, 5, 1);
    ctx.fillRect(33, 10, 4, 1);
    ctx.fillRect(30, 9, 4, 1);
    ctx.fillRect(35, 5, 4, 1);
    ctx.fillRect(32, 4, 4, 1);

    // Foliage — very thick, 3 shades

    // Top crown
    ctx.fillStyle = p.pineNeedleDark;
    ctx.fillRect(37, -6, 8, 4);
    ctx.fillRect(35, -4, 5, 3);
    ctx.fillRect(44, -5, 4, 3);
    ctx.fillStyle = p.pineNeedleLight;
    ctx.fillRect(38, -6, 4, 1);
    ctx.fillRect(45, -5, 2, 1);
    ctx.fillStyle = p.mossGreen;
    ctx.fillRect(39, -4, 4, 3);
    ctx.fillRect(43, -3, 3, 2);

    // Upper right cluster
    ctx.fillStyle = p.pineNeedleDark;
    ctx.fillRect(44, 0, 8, 4);
    ctx.fillRect(51, 1, 4, 3);
    ctx.fillStyle = p.pineNeedleLight;
    ctx.fillRect(45, 0, 4, 1);
    ctx.fillRect(52, 1, 2, 1);
    ctx.fillStyle = p.mossGreen;
    ctx.fillRect(46, 2, 5, 3);
    ctx.fillRect(51, 3, 3, 2);

    // Upper left cluster
    ctx.fillStyle = p.pineNeedleDark;
    ctx.fillRect(29, 2, 8, 4);
    ctx.fillRect(26, 3, 4, 3);
    ctx.fillStyle = p.pineNeedleLight;
    ctx.fillRect(30, 2, 4, 1);
    ctx.fillRect(27, 3, 2, 1);
    ctx.fillStyle = p.mossGreen;
    ctx.fillRect(28, 4, 5, 3);
    ctx.fillRect(32, 5, 3, 2);

    // Mid right cluster (big)
    ctx.fillStyle = p.pineNeedleDark;
    ctx.fillRect(44, 5, 9, 4);
    ctx.fillRect(52, 6, 4, 3);
    ctx.fillRect(43, 7, 3, 2);
    ctx.fillStyle = p.pineNeedleLight;
    ctx.fillRect(46, 5, 4, 1);
    ctx.fillRect(53, 6, 2, 1);
    ctx.fillStyle = p.mossGreen;
    ctx.fillRect(47, 7, 5, 3);
    ctx.fillRect(52, 8, 3, 2);

    // Mid left cluster (big)
    ctx.fillStyle = p.pineNeedleDark;
    ctx.fillRect(24, 8, 9, 4);
    ctx.fillRect(21, 9, 4, 3);
    ctx.fillRect(32, 9, 3, 2);
    ctx.fillStyle = p.pineNeedleLight;
    ctx.fillRect(25, 8, 4, 1);
    ctx.fillRect(22, 9, 2, 1);
    ctx.fillStyle = p.mossGreen;
    ctx.fillRect(26, 10, 5, 3);
    ctx.fillRect(22, 11, 3, 2);

    // Lower right cluster (very big)
    ctx.fillStyle = p.pineNeedleDark;
    ctx.fillRect(44, 10, 10, 5);
    ctx.fillRect(53, 11, 5, 4);
    ctx.fillRect(42, 12, 3, 3);
    ctx.fillStyle = p.pineNeedleLight;
    ctx.fillRect(46, 10, 5, 1);
    ctx.fillRect(54, 11, 3, 1);
    ctx.fillStyle = p.mossGreen;
    ctx.fillRect(47, 12, 6, 4);
    ctx.fillRect(53, 13, 4, 3);

    // Lower left cluster (very big)
    ctx.fillStyle = p.pineNeedleDark;
    ctx.fillRect(21, 13, 11, 5);
    ctx.fillRect(18, 14, 4, 4);
    ctx.fillRect(31, 14, 4, 3);
    ctx.fillStyle = p.pineNeedleLight;
    ctx.fillRect(22, 13, 5, 1);
    ctx.fillRect(19, 14, 2, 1);
    ctx.fillStyle = p.mossGreen;
    ctx.fillRect(23, 15, 7, 4);
    ctx.fillRect(19, 16, 4, 3);

    // Bottom right cluster (massive, near engawa)
    ctx.fillStyle = p.pineNeedleDark;
    ctx.fillRect(43, 16, 10, 5);
    ctx.fillRect(52, 17, 5, 4);
    ctx.fillRect(41, 18, 3, 3);
    ctx.fillStyle = p.pineNeedleLight;
    ctx.fillRect(45, 16, 5, 1);
    ctx.fillRect(53, 17, 3, 1);
    ctx.fillStyle = p.mossGreen;
    ctx.fillRect(46, 18, 6, 4);
    ctx.fillRect(52, 19, 4, 3);

    // Bottom left cluster (massive, near engawa)
    ctx.fillStyle = p.pineNeedleDark;
    ctx.fillRect(20, 18, 10, 5);
    ctx.fillRect(17, 19, 4, 4);
    ctx.fillRect(29, 19, 4, 3);
    ctx.fillStyle = p.pineNeedleLight;
    ctx.fillRect(21, 18, 5, 1);
    ctx.fillStyle = p.mossGreen;
    ctx.fillRect(22, 20, 7, 4);
    ctx.fillRect(18, 21, 4, 3);

    // Lowest clusters (touching engawa)
    ctx.fillStyle = p.pineNeedleDark;
    ctx.fillRect(26, 23, 8, 4);
    ctx.fillRect(24, 24, 3, 3);
    ctx.fillRect(33, 24, 4, 3);
    ctx.fillStyle = p.pineNeedleLight;
    ctx.fillRect(27, 23, 4, 1);
    ctx.fillStyle = p.mossGreen;
    ctx.fillRect(28, 25, 5, 3);

    // Lower right cluster (near engawa)
    ctx.fillStyle = p.pineNeedleDark;
    ctx.fillRect(38, 22, 9, 4);
    ctx.fillRect(46, 23, 4, 3);
    ctx.fillRect(36, 23, 3, 3);
    ctx.fillStyle = p.pineNeedleLight;
    ctx.fillRect(39, 22, 4, 1);
    ctx.fillRect(47, 23, 2, 1);
    ctx.fillStyle = p.mossGreen;
    ctx.fillRect(40, 24, 5, 3);
    ctx.fillRect(46, 25, 3, 2);
  }

  // ---- Japanese pine tree (near 2nd column, thick trunk slanting right) ----
  function drawGardenPine() {
    const p = P();
    // Thick trunk (4-5px wide), base near x=63, slanting forward-right
    // Base at y=29, going up past top of canvas
    ctx.fillStyle = p.pineWood;
    // Lower trunk (6px wide — thickest at base)
    ctx.fillRect(62, 26, 6, 4);
    ctx.fillRect(62, 23, 6, 4);
    // Mid-lower trunk (5px wide)
    ctx.fillRect(63, 20, 5, 4);
    ctx.fillRect(64, 17, 5, 4);
    // Mid trunk (4px wide, slight slant right)
    ctx.fillRect(65, 14, 4, 4);
    ctx.fillRect(66, 11, 4, 4);
    // Upper trunk (3px wide)
    ctx.fillRect(67, 8, 3, 4);
    ctx.fillRect(68, 5, 3, 4);
    ctx.fillRect(69, 2, 3, 4);
    // Top trunk (2px wide — thinnest)
    ctx.fillRect(69, -2, 2, 5);
    ctx.fillRect(70, -6, 2, 5);
    ctx.fillRect(70, -10, 2, 5);

    // Major branches
    // Right branch (mid height)
    ctx.fillRect(69, 16, 6, 1);
    ctx.fillRect(74, 15, 4, 1);
    ctx.fillRect(77, 14, 3, 1);
    // Left branch (upper)
    ctx.fillRect(66, 12, 5, 1);
    ctx.fillRect(63, 11, 4, 1);
    ctx.fillRect(60, 10, 4, 1);
    // Right upper branch
    ctx.fillRect(74, 10, 5, 1);
    ctx.fillRect(78, 9, 4, 1);
    // Top right branch
    ctx.fillRect(76, 5, 5, 1);
    ctx.fillRect(80, 4, 4, 1);
    // Top left branch
    ctx.fillRect(70, 6, 4, 1);
    ctx.fillRect(67, 5, 4, 1);
    ctx.fillRect(64, 4, 4, 1);
    // Left lower branch
    ctx.fillRect(58, 19, 5, 1);
    ctx.fillRect(55, 18, 4, 1);
    ctx.fillRect(52, 17, 4, 1);
    // Right lower branch
    ctx.fillRect(67, 22, 6, 1);
    ctx.fillRect(72, 21, 4, 1);
    ctx.fillRect(75, 20, 4, 1);
    // Extra left branch (near engawa)
    ctx.fillRect(57, 23, 6, 1);
    ctx.fillRect(54, 22, 4, 1);

    // Thick foliage clusters — 3 shades of green
    // Top crown (extends above canvas)
    ctx.fillStyle = p.pineNeedleDark;
    ctx.fillRect(73, 0, 7, 3);
    ctx.fillRect(71, 1, 4, 3);
    ctx.fillRect(78, 1, 3, 2);
    ctx.fillStyle = p.pineNeedleLight;
    ctx.fillRect(74, 0, 3, 1);
    ctx.fillRect(79, 1, 2, 1);
    ctx.fillStyle = p.mossGreen;
    ctx.fillRect(72, 2, 3, 2);
    ctx.fillRect(77, 2, 2, 1);

    // Top right cluster
    ctx.fillStyle = p.pineNeedleDark;
    ctx.fillRect(79, 2, 6, 3);
    ctx.fillRect(84, 3, 3, 2);
    ctx.fillStyle = p.pineNeedleLight;
    ctx.fillRect(80, 2, 3, 1);
    ctx.fillStyle = p.mossGreen;
    ctx.fillRect(82, 4, 3, 2);

    // Top left cluster
    ctx.fillStyle = p.pineNeedleDark;
    ctx.fillRect(62, 2, 7, 3);
    ctx.fillRect(60, 3, 3, 2);
    ctx.fillStyle = p.pineNeedleLight;
    ctx.fillRect(63, 2, 3, 1);
    ctx.fillStyle = p.mossGreen;
    ctx.fillRect(61, 4, 4, 2);

    // Upper right cluster
    ctx.fillStyle = p.pineNeedleDark;
    ctx.fillRect(77, 7, 6, 3);
    ctx.fillRect(82, 8, 3, 2);
    ctx.fillStyle = p.pineNeedleLight;
    ctx.fillRect(78, 7, 3, 1);
    ctx.fillStyle = p.mossGreen;
    ctx.fillRect(80, 9, 3, 2);

    // Upper left cluster
    ctx.fillStyle = p.pineNeedleDark;
    ctx.fillRect(58, 8, 6, 3);
    ctx.fillRect(56, 9, 3, 2);
    ctx.fillStyle = p.pineNeedleLight;
    ctx.fillRect(59, 8, 3, 1);
    ctx.fillStyle = p.mossGreen;
    ctx.fillRect(57, 10, 4, 2);

    // Mid right cluster (bigger)
    ctx.fillStyle = p.pineNeedleDark;
    ctx.fillRect(74, 12, 9, 4);
    ctx.fillRect(82, 13, 4, 3);
    ctx.fillRect(73, 14, 3, 2);
    ctx.fillStyle = p.pineNeedleLight;
    ctx.fillRect(76, 12, 4, 1);
    ctx.fillRect(83, 13, 2, 1);
    ctx.fillStyle = p.mossGreen;
    ctx.fillRect(77, 14, 5, 3);
    ctx.fillRect(84, 15, 2, 2);

    // Lower left cluster (much bigger and thicker)
    ctx.fillStyle = p.pineNeedleDark;
    ctx.fillRect(49, 15, 10, 5);
    ctx.fillRect(47, 17, 4, 4);
    ctx.fillRect(58, 16, 4, 3);
    ctx.fillRect(48, 14, 5, 2);
    ctx.fillStyle = p.pineNeedleLight;
    ctx.fillRect(50, 15, 5, 1);
    ctx.fillRect(56, 15, 3, 1);
    ctx.fillStyle = p.mossGreen;
    ctx.fillRect(51, 17, 6, 4);
    ctx.fillRect(48, 19, 3, 2);
    ctx.fillRect(57, 18, 3, 2);

    // Lower right cluster (trimmed to reveal pebble pad)
    ctx.fillStyle = p.pineNeedleDark;
    ctx.fillRect(71, 18, 8, 4);
    ctx.fillRect(69, 20, 3, 2);
    ctx.fillRect(72, 17, 5, 2);
    ctx.fillStyle = p.pineNeedleLight;
    ctx.fillRect(73, 18, 4, 1);
    ctx.fillStyle = p.mossGreen;
    ctx.fillRect(74, 20, 4, 2);

    // Extra lower-left cluster (near engawa)
    ctx.fillStyle = p.pineNeedleDark;
    ctx.fillRect(52, 22, 8, 4);
    ctx.fillRect(50, 23, 3, 3);
    ctx.fillRect(59, 23, 4, 3);
    ctx.fillStyle = p.pineNeedleLight;
    ctx.fillRect(53, 22, 4, 1);
    ctx.fillStyle = p.mossGreen;
    ctx.fillRect(54, 24, 5, 3);
    ctx.fillRect(51, 25, 3, 2);

    // Extra lower-right cluster (trimmed)
    ctx.fillStyle = p.pineNeedleDark;
    ctx.fillRect(74, 24, 3, 3);
    ctx.fillRect(72, 25, 3, 2);
    ctx.fillStyle = p.pineNeedleLight;
    ctx.fillRect(74, 24, 2, 1);
    ctx.fillStyle = p.mossGreen;
    ctx.fillRect(74, 26, 2, 1);

    // Far left cluster (filling gap)
    ctx.fillStyle = p.pineNeedleDark;
    ctx.fillRect(45, 25, 7, 4);
    ctx.fillRect(43, 26, 3, 3);
    ctx.fillStyle = p.pineNeedleLight;
    ctx.fillRect(46, 25, 3, 1);
    ctx.fillStyle = p.mossGreen;
    ctx.fillRect(47, 27, 4, 3);

    // Center low cluster (between left and right)
    ctx.fillStyle = p.pineNeedleDark;
    ctx.fillRect(62, 24, 8, 4);
    ctx.fillRect(60, 25, 3, 3);
    ctx.fillRect(69, 25, 3, 3);
    ctx.fillStyle = p.pineNeedleLight;
    ctx.fillRect(63, 24, 4, 1);
    ctx.fillStyle = p.mossGreen;
    ctx.fillRect(64, 26, 5, 3);
    ctx.fillRect(61, 27, 3, 2);

    // Foliage pointing INTO the room (head-on view, centered on trunk)
    const fcx = 64, fcy = 15;
    const fDark = isDark() ? '#1a3020' : '#2a5030';
    const fMid = isDark() ? '#284028' : '#3a6838';
    const fLight = isDark() ? '#385830' : '#5a8848';
    ctx.fillStyle = fDark;
    ctx.fillRect(fcx - 4, fcy - 2, 9, 5);
    ctx.fillRect(fcx - 5, fcy - 1, 11, 3);
    ctx.fillRect(fcx - 3, fcy - 3, 7, 1);
    ctx.fillRect(fcx - 3, fcy + 3, 7, 1);
    ctx.fillStyle = fLight;
    ctx.fillRect(fcx - 2, fcy - 2, 5, 2);
    ctx.fillRect(fcx - 3, fcy - 1, 2, 1);
    ctx.fillStyle = fMid;
    ctx.fillRect(fcx - 1, fcy, 4, 3);
    ctx.fillRect(fcx + 2, fcy - 1, 3, 2);
    ctx.fillRect(fcx - 4, fcy, 3, 2);
  }

  // ---- Japanese maple (momiji) — near 3rd column, slanting left, horizontal spread ----
  function drawMaple() {
    const p = P();
    // Spring/summer colors — mostly greens with hints of new growth
    const mBright = isDark() ? '#2a5020' : '#58a038';
    const mMid = isDark() ? '#1a3818' : '#3a7828';
    const mDark = isDark() ? '#102810' : '#2a5818';
    const mYoung = isDark() ? '#385828' : '#78b848';
    const mTip = isDark() ? '#304818' : '#68a030';
    const mTrunk = isDark() ? '#382818' : '#6a4830';

    // Trunk (8px at base), slanting LEFT, shifted 30px right
    ctx.fillStyle = mTrunk;
    // Base (8px wide)
    ctx.fillRect(196, 26, 8, 4);
    // Mid-lower (7px, shifting left)
    ctx.fillRect(192, 22, 7, 5);
    // Mid (5px, continuing left)
    ctx.fillRect(188, 18, 5, 5);
    // Upper (4px)
    ctx.fillRect(184, 14, 4, 5);
    // Top (3px)
    ctx.fillRect(181, 10, 3, 5);
    ctx.fillRect(179, 7, 3, 4);

    // Branches — spreading wide horizontally
    // Far left branches (shortened 5px)
    ctx.fillRect(176, 8, 5, 1);
    ctx.fillRect(171, 7, 6, 1);
    ctx.fillRect(166, 8, 6, 1);
    // Left-mid branches
    ctx.fillRect(176, 12, 9, 1);
    ctx.fillRect(174, 11, 6, 1);
    // Right branches (back toward trunk)
    ctx.fillRect(189, 15, 8, 1);
    ctx.fillRect(196, 16, 6, 1);
    ctx.fillRect(201, 17, 4, 1);
    // Upper right branch
    ctx.fillRect(182, 9, 6, 1);
    ctx.fillRect(187, 10, 5, 1);
    // Lower left branch
    ctx.fillRect(179, 16, 8, 1);
    ctx.fillRect(174, 15, 6, 1);

    // Foliage — spring greens, delicate, airy
    // Far left canopy (shortened 5px)
    ctx.fillStyle = mMid;
    ctx.fillRect(164, 5, 8, 3);
    ctx.fillRect(162, 6, 4, 2);
    ctx.fillStyle = mBright;
    ctx.fillRect(167, 4, 5, 2);
    ctx.fillRect(170, 6, 4, 2);
    ctx.fillStyle = mYoung;
    ctx.fillRect(165, 7, 3, 2);

    // Left-mid canopy (shortened 5px)
    ctx.fillStyle = mDark;
    ctx.fillRect(173, 9, 7, 3);
    ctx.fillRect(171, 10, 3, 2);
    ctx.fillStyle = mMid;
    ctx.fillRect(176, 8, 5, 2);
    ctx.fillStyle = mTip;
    ctx.fillRect(174, 11, 4, 2);

    // Center canopy (around trunk top)
    ctx.fillStyle = mBright;
    ctx.fillRect(177, 5, 6, 3);
    ctx.fillRect(175, 6, 3, 2);
    ctx.fillStyle = mMid;
    ctx.fillRect(179, 4, 4, 2);
    ctx.fillRect(182, 6, 3, 2);
    ctx.fillStyle = mYoung;
    ctx.fillRect(176, 8, 4, 2);
    ctx.fillStyle = mDark;
    ctx.fillRect(180, 7, 5, 2);

    // Right canopy
    ctx.fillStyle = mMid;
    ctx.fillRect(186, 8, 6, 3);
    ctx.fillRect(191, 9, 4, 2);
    ctx.fillStyle = mBright;
    ctx.fillRect(188, 7, 4, 2);
    ctx.fillStyle = mTip;
    ctx.fillRect(187, 10, 3, 2);

    // Far right canopy (sparse, trailing)
    ctx.fillStyle = mDark;
    ctx.fillRect(194, 13, 5, 3);
    ctx.fillRect(198, 14, 4, 2);
    ctx.fillStyle = mYoung;
    ctx.fillRect(196, 12, 3, 2);
    ctx.fillStyle = mMid;
    ctx.fillRect(201, 15, 3, 2);

    // Lower scattered leaves
    ctx.fillStyle = mBright;
    ctx.fillRect(172, 13, 4, 2);
    ctx.fillStyle = mDark;
    ctx.fillRect(179, 14, 3, 2);
    ctx.fillStyle = mTip;
    ctx.fillRect(184, 12, 3, 2);

    // Branch 3 — pointing toward viewer (downward from our perspective)
    ctx.fillStyle = mTrunk;
    ctx.fillRect(190, 18, 1, 2);
    ctx.fillRect(191, 20, 1, 2);
    ctx.fillRect(192, 22, 1, 2);
    // Round foliage cluster (head-on, spreading equally)
    ctx.fillStyle = mDark;
    ctx.fillRect(189, 22, 6, 4);
    ctx.fillRect(188, 23, 8, 2);
    ctx.fillStyle = mMid;
    ctx.fillRect(190, 22, 4, 2);
    ctx.fillRect(189, 24, 3, 2);
    ctx.fillStyle = mBright;
    ctx.fillRect(191, 22, 2, 1);
    ctx.fillStyle = mYoung;
    ctx.fillRect(193, 24, 2, 2);

    // Low foliage — reaching far left, longer than upper canopy (shifted up 3px)
    // Lower left branch extensions
    ctx.fillStyle = mTrunk;
    ctx.fillRect(170, 15, 9, 1);
    ctx.fillRect(164, 14, 7, 1);
    ctx.fillRect(158, 15, 7, 1);
    ctx.fillRect(152, 16, 7, 1);
    ctx.fillRect(147, 17, 6, 1);

    // Low far-left cluster
    ctx.fillStyle = mDark;
    ctx.fillRect(144, 14, 7, 3);
    ctx.fillRect(141, 15, 4, 3);
    ctx.fillStyle = mMid;
    ctx.fillRect(147, 13, 5, 2);
    ctx.fillRect(149, 15, 4, 2);
    ctx.fillStyle = mBright;
    ctx.fillRect(145, 14, 3, 1);
    ctx.fillStyle = mYoung;
    ctx.fillRect(142, 16, 3, 2);

    // Low mid-left cluster
    ctx.fillStyle = mMid;
    ctx.fillRect(153, 13, 7, 3);
    ctx.fillRect(150, 14, 4, 2);
    ctx.fillStyle = mDark;
    ctx.fillRect(157, 14, 4, 3);
    ctx.fillStyle = mTip;
    ctx.fillRect(154, 12, 4, 2);
    ctx.fillStyle = mBright;
    ctx.fillRect(151, 15, 3, 2);

    // Low center cluster
    ctx.fillStyle = mDark;
    ctx.fillRect(163, 13, 6, 3);
    ctx.fillRect(168, 14, 4, 2);
    ctx.fillStyle = mMid;
    ctx.fillRect(165, 12, 4, 2);
    ctx.fillStyle = mYoung;
    ctx.fillRect(164, 15, 3, 2);

    // Low right cluster (near trunk)
    ctx.fillStyle = mMid;
    ctx.fillRect(174, 13, 6, 3);
    ctx.fillRect(179, 14, 4, 2);
    ctx.fillStyle = mBright;
    ctx.fillRect(176, 12, 4, 2);
    ctx.fillStyle = mDark;
    ctx.fillRect(175, 15, 4, 2);
  }

  // ---- Niwaki (cloud-pruned garden tree, small) ----
  function drawNiwaki() {
    const p = P();
    const nx = 207, baseY = 30;
    // Trunk — slender
    ctx.fillStyle = p.pineWood;
    ctx.fillRect(nx, baseY - 9, 2, 9);
    ctx.fillRect(nx + 1, baseY - 12, 1, 4);
    // Branches
    ctx.fillRect(nx - 2, baseY - 4, 3, 1);
    ctx.fillRect(nx - 4, baseY - 5, 3, 1);
    ctx.fillRect(nx + 2, baseY - 7, 3, 1);
    ctx.fillRect(nx + 4, baseY - 8, 2, 1);

    // Tier 1 (lowest, left)
    ctx.fillStyle = p.pineNeedleDark;
    ctx.fillRect(nx - 5, baseY - 6, 4, 2);
    ctx.fillRect(nx - 6, baseY - 5, 2, 2);
    ctx.fillStyle = p.pineNeedleLight;
    ctx.fillRect(nx - 4, baseY - 6, 2, 1);
    ctx.fillStyle = p.mossGreen;
    ctx.fillRect(nx - 4, baseY - 4, 3, 1);

    // Tier 2 (mid, right)
    ctx.fillStyle = p.pineNeedleDark;
    ctx.fillRect(nx + 3, baseY - 9, 4, 2);
    ctx.fillRect(nx + 6, baseY - 8, 2, 2);
    ctx.fillStyle = p.pineNeedleLight;
    ctx.fillRect(nx + 4, baseY - 9, 2, 1);
    ctx.fillStyle = p.mossGreen;
    ctx.fillRect(nx + 5, baseY - 7, 2, 1);

    // Crown (top)
    ctx.fillStyle = p.pineNeedleDark;
    ctx.fillRect(nx, baseY - 13, 3, 2);
    ctx.fillRect(nx - 1, baseY - 12, 2, 2);
    ctx.fillStyle = p.pineNeedleLight;
    ctx.fillRect(nx + 1, baseY - 13, 1, 1);
  }

  // ---- Sam (student, seiza, facing right, ~14px tall) ----
  function drawSam(cx, cy) {
    // cx,cy = top of head. Kneeling (seiza), straight back, facing right.
    // Total height ~19px (head y to knees y+18)
    const p = P();
    // Hair (5px wide, 2px tall)
    ctx.fillStyle = p.hairDark;
    ctx.fillRect(cx - 1, cy, 5, 1);
    ctx.fillRect(cx - 1, cy + 1, 6, 1);
    // Face (4px wide, 2px tall, facing right)
    ctx.fillStyle = p.skinTone;
    ctx.fillRect(cx, cy + 2, 4, 2);
    ctx.fillStyle = p.skinShadow;
    ctx.fillRect(cx, cy + 2, 1, 1);
    // Eye (facing right)
    ctx.fillStyle = p.hairDark;
    ctx.fillRect(cx + 3, cy + 2, 1, 1);
    // Neck
    ctx.fillStyle = p.skinTone;
    ctx.fillRect(cx + 1, cy + 4, 2, 1);
    // Collar
    ctx.fillStyle = p.collarWhite;
    ctx.fillRect(cx, cy + 5, 3, 1);
    // Kimono torso (straight back, 6px wide, 7px tall)
    ctx.fillStyle = p.kimNavy;
    ctx.fillRect(cx - 1, cy + 6, 6, 7);
    ctx.fillStyle = p.kimNavyLight;
    ctx.fillRect(cx + 4, cy + 6, 2, 4);   // right sleeve
    ctx.fillRect(cx - 2, cy + 6, 2, 4);   // left sleeve
    ctx.fillStyle = p.kimNavyShadow;
    ctx.fillRect(cx - 1, cy + 6, 1, 5);
    // Obi
    ctx.fillStyle = p.obiGold;
    ctx.fillRect(cx, cy + 9, 4, 2);
    // Hands on lap
    ctx.fillStyle = p.skinTone;
    ctx.fillRect(cx + 5, cy + 9, 1, 1);
    // Seiza lap & legs (wider, 3px tall)
    ctx.fillStyle = p.kimNavyShadow;
    ctx.fillRect(cx - 2, cy + 13, 8, 2);
    ctx.fillRect(cx - 2, cy + 15, 9, 2);
    ctx.fillStyle = p.kimNavy;
    ctx.fillRect(cx - 1, cy + 13, 6, 2);
  }

  // ---- Aya-sensei (teacher, seiza, facing left, ~15px tall with bun) ----
  function drawTeacher(cx, cy, time) {
    const p = P();
    const gestureFrame = Math.floor(time / 40) % 3;
    // Hair with bun (4px tall total)
    ctx.fillStyle = p.hairDark;
    ctx.fillRect(cx - 1, cy + 2, 6, 2); // main hair
    ctx.fillRect(cx, cy + 1, 4, 1);     // bun base
    ctx.fillRect(cx + 1, cy, 2, 1);     // bun peak
    // Face (4px wide, 2px tall)
    ctx.fillStyle = p.skinTone;
    ctx.fillRect(cx, cy + 4, 4, 2);
    ctx.fillStyle = p.skinShadow;
    ctx.fillRect(cx + 3, cy + 4, 1, 2);
    ctx.fillStyle = p.hairDark;
    ctx.fillRect(cx, cy + 5, 1, 1); // eye (facing left)
    // Neck
    ctx.fillStyle = p.skinTone;
    ctx.fillRect(cx + 1, cy + 6, 2, 1);
    // Collar
    ctx.fillStyle = p.collarWhite;
    ctx.fillRect(cx + 1, cy + 7, 2, 1);
    // Kimono body
    ctx.fillStyle = p.kimTeacher;
    ctx.fillRect(cx - 2, cy + 8, 8, 5);
    ctx.fillStyle = p.kimTeacherLight;
    ctx.fillRect(cx - 3, cy + 8, 2, 3); // left sleeve
    ctx.fillRect(cx + 5, cy + 8, 2, 3); // right sleeve
    ctx.fillStyle = p.kimTeacherShadow;
    ctx.fillRect(cx + 5, cy + 8, 1, 3);
    // Obi
    ctx.fillStyle = p.obiTeacher;
    ctx.fillRect(cx - 1, cy + 10, 6, 2);
    // Gesture hand (left, toward arrangement)
    ctx.fillStyle = p.skinTone;
    if (gestureFrame === 0) {
      ctx.fillRect(cx - 4, cy + 10, 2, 1);
    } else if (gestureFrame === 1) {
      ctx.fillRect(cx - 5, cy + 9, 2, 1);
    } else {
      ctx.fillRect(cx - 5, cy + 9, 2, 1);
      ctx.fillRect(cx - 4, cy + 10, 1, 1);
    }
    // Seiza legs
    ctx.fillStyle = p.kimTeacherShadow;
    ctx.fillRect(cx - 2, cy + 13, 8, 3);
  }

  // ---- Falling cherry blossom petals ----
  function drawPetals(time) {
    const p = P();
    ctx.fillStyle = p.sakuraPetal;
    for (let i = 0; i < 10; i++) {
      const drift = Math.sin(time * 0.03 + i * 1.7) * 8;
      const px = 70 + (i * 17.3 + drift) % 100;
      const fall = (i * 5.7 + time * 0.08) % 24;
      const py = 5 + fall;
      if (py > 30) continue; // don't draw below garden
      ctx.globalAlpha = 0.5 + Math.sin(time * 0.05 + i * 1.3) * 0.3;
      ctx.fillRect(Math.floor(px), Math.floor(py), 1, 1);
    }
    ctx.globalAlpha = 1;
  }

  // ---- Main loop ----
  let time = 0;
  function draw() {
    const p = P();
    time += 0.4;
    ctx.clearRect(0, 0, W, H);

    // 1. Sky
    drawSky();

    // 1b. Clouds (drifting)
    drawCloud(80, 2, 18, 3, time, 0.06);
    drawCloud(170, 4, 12, 2, time, 0.04);
    drawCloud(110, 6, 8, 1, time, 0.08);
    drawCloud(195, 1, 14, 2, time, 0.05);
    drawCloud(70, 8, 6, 1, time, 0.07);

    // 1c. Mount Fuji (distant, behind garden)
    drawFuji();

    // 1d. Distant forest treeline (along horizon)
    drawForest();

    // 2. Garden ground
    drawGardenGround();

    // 3. Large pine tree (left of 1st pine)
    drawBigPine();

    // 3b. Raked pebble pad (10 rows, y=20-29, extended right 5px)
    ctx.fillStyle = p.gardenStone;
    ctx.fillRect(130 - 74, 20, 53, 1);
    ctx.fillRect(130 - 78, 21, 59, 1);
    ctx.fillRect(130 - 82, 22, 65, 1);
    ctx.fillRect(130 - 86, 23, 69, 1);
    ctx.fillRect(130 - 90, 24, 74, 1);
    ctx.fillRect(130 - 93, 25, 77, 1);
    ctx.fillRect(130 - 95, 26, 78, 1);
    ctx.fillRect(130 - 94, 27, 75, 1);
    ctx.fillRect(130 - 90, 28, 69, 1);
    ctx.fillRect(130 - 84, 29, 61, 1);
    // Raked line highlights (alternating rows)
    ctx.fillStyle = isDark() ? '#383830' : '#b0a898';
    ctx.globalAlpha = 0.3;
    ctx.fillRect(130 - 78, 21, 59, 1);
    ctx.fillRect(130 - 86, 23, 69, 1);
    ctx.fillRect(130 - 93, 25, 77, 1);
    ctx.fillRect(130 - 94, 27, 75, 1);
    ctx.fillRect(130 - 84, 29, 61, 1);
    ctx.globalAlpha = 1;

    // Sanzonseki rock composition (at top of pebble pad)
    var zaDark = isDark() ? '#302820' : '#585048';
    var zaMid = isDark() ? '#403830' : '#706860';
    var zaHi = isDark() ? '#504840' : '#888078';
    // Main boulder (heaven)
    zaDark; ctx.fillStyle = zaDark;
    ctx.fillRect(91, 18, 5, 6);
    ctx.fillRect(90, 20, 7, 4);
    ctx.fillRect(92, 17, 3, 1);
    ctx.fillStyle = zaHi;
    ctx.fillRect(94, 18, 2, 2);
    // Medium rock (earth)
    ctx.fillStyle = zaMid;
    ctx.fillRect(82, 22, 6, 3);
    ctx.fillRect(81, 23, 8, 2);
    ctx.fillStyle = zaHi;
    ctx.fillRect(85, 22, 3, 1);
    // Small accent stone (humanity)
    ctx.fillStyle = zaDark;
    ctx.fillRect(98, 23, 3, 2);
    ctx.fillRect(98, 24, 4, 1);
    ctx.fillStyle = zaHi;
    ctx.fillRect(99, 23, 2, 1);
    // 3b2. Stepping stone path (hidden for now)
    /*
    var spDark = isDark() ? '#383028' : '#686058';
    var spMid = isDark() ? '#484038' : '#807870';
    var spHi = isDark() ? '#585048' : '#a09888';
    ctx.fillStyle = spMid; ctx.fillRect(38, 17, 3, 2); ctx.fillStyle = spHi; ctx.fillRect(38, 17, 2, 1);
    ctx.fillStyle = spMid; ctx.fillRect(44, 18, 2, 2); ctx.fillStyle = spHi; ctx.fillRect(44, 18, 1, 1);
    ctx.fillStyle = spDark; ctx.fillRect(50, 19, 3, 2); ctx.fillStyle = spHi; ctx.fillRect(50, 19, 2, 1);
    ctx.fillStyle = spMid; ctx.fillRect(57, 20, 2, 2); ctx.fillStyle = spHi; ctx.fillRect(57, 20, 1, 1);
    ctx.fillStyle = spDark; ctx.fillRect(63, 21, 3, 2); ctx.fillStyle = spHi; ctx.fillRect(63, 21, 2, 1);
    ctx.fillStyle = spMid; ctx.fillRect(70, 22, 2, 2); ctx.fillStyle = spHi; ctx.fillRect(70, 22, 1, 1);
    ctx.fillStyle = spMid; ctx.fillRect(77, 23, 3, 2); ctx.fillStyle = spHi; ctx.fillRect(77, 23, 2, 1);
    ctx.fillStyle = spDark; ctx.fillRect(84, 23, 2, 2); ctx.fillStyle = spHi; ctx.fillRect(84, 23, 1, 1);
    ctx.fillStyle = spMid; ctx.fillRect(90, 24, 3, 2); ctx.fillStyle = spHi; ctx.fillRect(90, 24, 2, 1);
    ctx.fillStyle = spMid; ctx.fillRect(97, 24, 2, 2); ctx.fillStyle = spHi; ctx.fillRect(97, 24, 1, 1);
    ctx.fillStyle = spDark; ctx.fillRect(103, 25, 3, 2); ctx.fillStyle = spHi; ctx.fillRect(103, 25, 2, 1);
    ctx.fillStyle = spMid; ctx.fillRect(110, 25, 3, 2); ctx.fillStyle = spHi; ctx.fillRect(110, 25, 2, 1);
    */

    // 3c. Japanese pine tree (near 2nd column)
    drawGardenPine();

    // 3c. Garden pond (drawn after garden ground, before trees overlap it)
    drawPond(time);

    // 3c2. Koi fish in pond (hidden)
    // drawKoi(112, 20, time, 0, p.koiOrange);
    // drawKoi(112, 20, time, 1, p.koiRed);

    // 3c3. Azalea bush at base of bonsai tree (small)
    ctx.fillStyle = p.pineNeedleDark;
    ctx.fillRect(103, 20, 3, 2);

    // 3c4. Old short stone lantern (upper-left edge of pond)
    var slDark = isDark() ? '#303028' : '#585850';
    var slMid = isDark() ? '#404038' : '#787870';
    var slHi = isDark() ? '#505048' : '#989890';
    // Cap
    ctx.fillStyle = slMid;
    ctx.fillRect(119, 16, 5, 1);
    ctx.fillStyle = slDark;
    ctx.fillRect(120, 15, 3, 1);
    // Fire box
    ctx.fillStyle = slDark;
    ctx.fillRect(120, 17, 3, 2);
    if (isDark()) {
      // Flickering warm glow in dark mode
      var flicker = 0.7 + 0.3 * Math.sin(time * 0.12) * Math.sin(time * 0.07 + 1.3);
      ctx.fillStyle = '#e0a030';
      ctx.globalAlpha = flicker;
      ctx.fillRect(121, 17, 1, 1);
      // Glow spill on adjacent pixels
      ctx.globalAlpha = flicker * 0.3;
      ctx.fillRect(120, 17, 1, 1);
      ctx.fillRect(122, 17, 1, 1);
      ctx.globalAlpha = 1;
    } else {
      ctx.fillStyle = '#d8b050';
      ctx.fillRect(121, 17, 1, 1);
    }
    // Pedestal
    ctx.fillStyle = slMid;
    ctx.fillRect(120, 19, 3, 1);
    ctx.fillStyle = slHi;
    ctx.fillRect(121, 15, 1, 1);
    // Moss on top
    ctx.fillStyle = p.lilyPad;
    ctx.fillRect(119, 15, 1, 1);
    ctx.fillRect(123, 16, 1, 1);

    // 3d. Japanese maple (near 3rd column)
    drawMaple();

    // 3d2. Azalea bush (right of pond, between maple and 3rd column)
    ctx.fillStyle = p.pineNeedleDark;
    ctx.fillRect(179, 25, 5, 3);
    ctx.fillRect(178, 26, 7, 3);

    // 3d. Niwaki (between maple and 2nd lantern)
    drawNiwaki();

    // 3e. Stone lanterns (in front of trees)
    drawLantern(12, 19, time);
    drawLantern(230, 19, time);

    // 3f. Iris & tokusa near engawa (static, y=24-30)
    var tkDark = isDark() ? '#183028' : '#1a5838';
    var tkMid = isDark() ? '#203828' : '#286848';
    var tkJoint = isDark() ? '#284830' : '#388858';
    var irLeaf = isDark() ? '#1c3a14' : '#3a7828';
    var irLeafLt = isDark() ? '#284a1c' : '#4a9838';
    var irPurple = isDark() ? '#5a2888' : '#6a20a8';
    var irPurpleHi = isDark() ? '#7038a8' : '#8838d0';

    // Tokusa clump 1 (left)
    ctx.fillStyle = tkDark;
    ctx.fillRect(48, 26, 1, 4);
    ctx.fillRect(50, 27, 1, 3);
    ctx.fillRect(52, 26, 1, 4);
    ctx.fillStyle = tkJoint;
    ctx.fillRect(48, 28, 1, 1);
    ctx.fillRect(50, 29, 1, 1);
    ctx.fillRect(52, 28, 1, 1);

    // Iris 1 (between tokusa clumps)
    ctx.fillStyle = irLeaf;
    ctx.fillRect(57, 27, 1, 3);
    ctx.fillRect(59, 26, 1, 4);
    ctx.fillRect(58, 28, 1, 2);
    ctx.fillStyle = irLeafLt;
    ctx.fillRect(59, 26, 1, 1);
    ctx.fillRect(57, 27, 1, 1);
    // Flower
    ctx.fillStyle = irPurple;
    ctx.fillRect(58, 25, 2, 1);
    ctx.fillRect(59, 24, 1, 1);
    ctx.fillStyle = irPurpleHi;
    ctx.fillRect(59, 25, 1, 1);

    // Tokusa clump 2 (center-left)
    ctx.fillStyle = tkDark;
    ctx.fillRect(65, 27, 1, 3);
    ctx.fillRect(67, 26, 1, 4);
    ctx.fillStyle = tkJoint;
    ctx.fillRect(65, 29, 1, 1);
    ctx.fillRect(67, 28, 1, 1);

    // Iris 2
    ctx.fillStyle = irLeaf;
    ctx.fillRect(72, 26, 1, 4);
    ctx.fillRect(74, 27, 1, 3);
    ctx.fillRect(73, 28, 1, 2);
    ctx.fillStyle = irLeafLt;
    ctx.fillRect(72, 26, 1, 1);
    // Flower
    ctx.fillStyle = irPurple;
    ctx.fillRect(71, 25, 2, 1);
    ctx.fillRect(72, 24, 1, 1);
    ctx.fillStyle = irPurpleHi;
    ctx.fillRect(72, 25, 1, 1);

    // Tokusa clump 3 (center-right)
    ctx.fillStyle = tkDark;
    ctx.fillRect(80, 26, 1, 4);
    ctx.fillRect(82, 27, 1, 3);
    ctx.fillRect(84, 26, 1, 4);
    ctx.fillStyle = tkJoint;
    ctx.fillRect(80, 28, 1, 1);
    ctx.fillRect(82, 29, 1, 1);
    ctx.fillRect(84, 28, 1, 1);

    // Iris 3
    ctx.fillStyle = irLeaf;
    ctx.fillRect(89, 27, 1, 3);
    ctx.fillRect(91, 26, 1, 4);
    ctx.fillRect(90, 28, 1, 2);
    ctx.fillStyle = irLeafLt;
    ctx.fillRect(91, 26, 1, 1);
    // Flower
    ctx.fillStyle = irPurple;
    ctx.fillRect(90, 25, 2, 1);
    ctx.fillRect(91, 24, 1, 1);
    ctx.fillStyle = irPurpleHi;
    ctx.fillRect(91, 25, 1, 1);

    // Tokusa clump 4
    ctx.fillStyle = tkDark;
    ctx.fillRect(95, 27, 1, 3);
    ctx.fillRect(97, 26, 1, 4);
    ctx.fillStyle = tkJoint;
    ctx.fillRect(95, 29, 1, 1);
    ctx.fillRect(97, 28, 1, 1);

    // Iris 4 (last)
    ctx.fillStyle = irLeaf;
    ctx.fillRect(100, 27, 1, 3);
    ctx.fillRect(99, 28, 1, 2);
    ctx.fillStyle = irLeafLt;
    ctx.fillRect(100, 27, 1, 1);
    // Flower
    ctx.fillStyle = irPurple;
    ctx.fillRect(99, 26, 2, 1);
    ctx.fillRect(100, 25, 1, 1);
    ctx.fillStyle = irPurpleHi;
    ctx.fillRect(100, 26, 1, 1);

    // 8. Engawa + door track
    drawEngawa();

    // 9. Roof overhang (temporarily hidden)
    // drawRoof();

    // 9b. Wisteria vines (outside, drawn before doors so doors hide them)
    drawWisteria();

    // 10. Door track (shikii) — between engawa and tatami
    ctx.fillStyle = p.doorTrack;
    ctx.fillRect(0, 35, W, 1);
    ctx.fillStyle = p.engawaShadow;
    ctx.fillRect(0, 36, W, 1);

    // 10b. All engawa columns (drawn BEFORE yokai and doors)
    const colW = 3;
    var allCols = [20, 60, 175, 215];
    allCols.forEach(function(cx) {
      ctx.fillStyle = p.doorTrack;
      ctx.fillRect(cx, 0, colW, 30);
      ctx.fillStyle = p.engawaWood;
      ctx.fillRect(cx + colW - 1, 0, 1, 30);
      ctx.fillStyle = p.roofShadow;
      ctx.fillRect(cx, 0, 1, 30);
    });

    // 10b2. Ghost (yokai) on engawa — behind columns, in front of doors
    if (isDark()) {
      // Triangle wave for constant-speed pacing
      var ghostPeriod = 900;
      var ghostT = (time % ghostPeriod) / ghostPeriod;
      var ghostTri = ghostT < 0.5 ? ghostT * 2 : 2 - ghostT * 2; // 0→1→0 linear
      var ghostX = -15 + ghostTri * (W + 30);
      var ghostBob = Math.sin(time * 0.08) * 2.5;
      var gx = Math.floor(ghostX);
      var gy = Math.floor(14 + ghostBob);
      // Lantern (held in front)
      var lanternFlicker = 0.7 + 0.3 * Math.sin(time * 0.12 + 3) * Math.sin(time * 0.07 + 1.5);
      ctx.fillStyle = '#e0a030';
      ctx.globalAlpha = lanternFlicker;
      ctx.fillRect(gx + 9, gy + 8, 3, 3);
      ctx.globalAlpha = lanternFlicker * 0.25;
      ctx.fillRect(gx + 7, gy + 6, 7, 7);
      ctx.globalAlpha = 1;
      ctx.fillStyle = '#804020';
      ctx.fillRect(gx + 9, gy + 7, 3, 1);
      ctx.fillRect(gx + 9, gy + 11, 3, 1);
      ctx.fillRect(gx + 10, gy + 6, 1, 1);
      // Ghost body
      ctx.globalAlpha = 0.55;
      ctx.fillStyle = '#c0c8d0';
      ctx.fillRect(gx + 2, gy, 5, 2);
      ctx.fillRect(gx + 1, gy + 2, 7, 2);
      ctx.fillRect(gx, gy + 4, 9, 2);
      ctx.fillRect(gx, gy + 6, 8, 3);
      ctx.fillRect(gx + 1, gy + 9, 7, 2);
      ctx.fillRect(gx + 1, gy + 11, 6, 2);
      ctx.fillRect(gx + 2, gy + 13, 5, 2);
      // Wispy tail
      ctx.globalAlpha = 0.35;
      ctx.fillRect(gx + 2, gy + 15, 4, 1);
      ctx.globalAlpha = 0.2;
      ctx.fillRect(gx + 3, gy + 16, 3, 1);
      ctx.globalAlpha = 0.1;
      ctx.fillRect(gx + 3, gy + 17, 2, 1);
      // Eyes
      ctx.globalAlpha = 0.8;
      ctx.fillStyle = '#182030';
      ctx.fillRect(gx + 2, gy + 3, 1, 1);
      ctx.fillRect(gx + 5, gy + 3, 1, 1);
      // Arm holding lantern
      ctx.globalAlpha = 0.45;
      ctx.fillStyle = '#c0c8d0';
      ctx.fillRect(gx + 7, gy + 6, 2, 1);
      ctx.fillRect(gx + 8, gy + 7, 1, 2);
      ctx.globalAlpha = 1;
    }

    // 10c. Shoji doors (drawn OVER outer columns and track)
    drawShojiDoor(0, 34);         // Left OUTER (drawn first, behind)
    drawShojiDoor(188, 34);       // Right OUTER (drawn first, behind)
    drawShojiDoor(24, 34);        // Left INNER (drawn on top, overlaps outer)
    drawShojiDoor(212, 34);       // Right INNER (drawn on top, overlaps outer)

    // 10d. Left edge column (matches right wall/door column)
    ctx.fillStyle = p.doorTrack;
    ctx.fillRect(0, 0, colW, 36);
    ctx.fillStyle = p.engawaWood;
    ctx.fillRect(colW - 1, 0, 1, 36);

    // 10e. Right wall (same width as 1 door, y=0 to y=36)
    ctx.fillStyle = p.wallPlaster;
    ctx.fillRect(246, 0, 34, 36);
    // Hanging scroll on the wall
    const sx = 258, sy = 4;
    // Scroll rods (top and bottom)
    ctx.fillStyle = p.tokoPost;
    ctx.fillRect(sx - 1, sy - 1, 10, 1);
    ctx.fillRect(sx - 1, sy + 20, 10, 1);
    // Scroll body (beige paper)
    ctx.fillStyle = p.scrollBeige;
    ctx.fillRect(sx, sy, 8, 20);
    // Calligraphy (ink brush strokes)
    ctx.fillStyle = p.scrollInk;
    ctx.fillRect(sx + 2, sy + 2, 1, 4);
    ctx.fillRect(sx + 3, sy + 3, 1, 3);
    ctx.fillRect(sx + 5, sy + 2, 1, 2);
    ctx.fillRect(sx + 2, sy + 8, 1, 3);
    ctx.fillRect(sx + 4, sy + 9, 1, 4);
    ctx.fillRect(sx + 3, sy + 11, 1, 2);
    ctx.fillRect(sx + 5, sy + 8, 1, 2);
    ctx.fillRect(sx + 3, sy + 15, 1, 3);
    ctx.fillRect(sx + 5, sy + 14, 1, 2);
    ctx.fillRect(sx + 4, sy + 16, 1, 2);
    // Dark column between door and wall
    ctx.fillStyle = p.doorTrack;
    ctx.fillRect(246, 0, colW, H);
    ctx.fillStyle = p.engawaWood;
    ctx.fillRect(246 + colW - 1, 0, 1, H);

    // 11. Tatami floor
    drawTatami();

    // 12. Tokonoma alcove
    drawTokonoma();

    // 12b. Interior column at right edge of banner (lighter wood, full height)
    ctx.fillStyle = p.engawaWood;
    ctx.fillRect(W - colW, 0, colW, H);
    ctx.fillStyle = p.engawaShadow;
    ctx.fillRect(W - colW, 0, 1, H);

    // 13. Table + cushions
    if (isDark()) {
      // Night: table & cushions on left side of room, nothing on table
      var nightTableX = 20;
      drawCushion(nightTableX - 13, 38);
      drawCushion(nightTableX + 38, 38);
      drawTable(nightTableX, 41);

      // Yarn ball on the table
      var nyX = nightTableX + 16, nyY = 36;
      ctx.fillStyle = '#702820';
      ctx.fillRect(nyX, nyY, 1, 2);
      ctx.fillRect(nyX - 1, nyY + 1, 3, 2);
      ctx.fillRect(nyX, nyY + 3, 1, 1);
      ctx.fillStyle = '#904030';
      ctx.fillRect(nyX, nyY + 1, 1, 1);

      // Futon (head towards tokonoma = pillow on right, tapered perspective)
      var futonX = 125, futonY = 36;
      var fMat   = '#68625a';
      var fMatLt = '#787068';
      var fMatDk = '#585048';
      var fMatSide = '#504a42';
      // Shadow under mattress
      ctx.fillStyle = '#0a0a08';
      ctx.globalAlpha = 0.4;
      ctx.fillRect(futonX - 2, futonY + 14, 72, 2);
      ctx.globalAlpha = 1;
      // Shikibuton (mattress) — tapered: narrow at back, wide at front
      ctx.fillStyle = fMat;
      ctx.fillRect(futonX + 8, futonY, 44, 1);      // back (narrowest)
      ctx.fillRect(futonX + 7, futonY + 1, 46, 1);
      ctx.fillRect(futonX + 6, futonY + 2, 48, 1);
      ctx.fillRect(futonX + 5, futonY + 3, 50, 1);
      ctx.fillRect(futonX + 4, futonY + 4, 52, 1);
      ctx.fillRect(futonX + 3, futonY + 5, 54, 1);
      ctx.fillRect(futonX + 2, futonY + 6, 56, 1);
      ctx.fillRect(futonX + 1, futonY + 7, 58, 1);
      ctx.fillRect(futonX + 1, futonY + 8, 58, 1);
      ctx.fillRect(futonX, futonY + 9, 60, 1);
      ctx.fillRect(futonX, futonY + 10, 60, 1);
      ctx.fillRect(futonX - 1, futonY + 11, 62, 1);
      ctx.fillRect(futonX - 1, futonY + 12, 62, 1);
      ctx.fillRect(futonX - 2, futonY + 13, 64, 1);  // front (widest)
      // Highlight on back edge
      ctx.fillStyle = fMatLt;
      ctx.fillRect(futonX + 8, futonY, 44, 1);
      ctx.fillRect(futonX + 7, futonY + 1, 46, 1);
      // Thickness edge (front)
      ctx.fillStyle = fMatSide;
      ctx.fillRect(futonX - 2, futonY + 13, 64, 1);
      ctx.fillStyle = fMatDk;
      ctx.fillRect(futonX - 2, futonY + 14, 64, 1);
      // Kakebuton (blanket) — dark green, covers left 2/3, also tapered
      var fBlanket   = '#1a3020';
      var fBlanketLt = '#243828';
      var fBlanketDk = '#102018';
      ctx.fillStyle = fBlanket;
      ctx.fillRect(futonX + 6, futonY + 2, 33, 1);
      ctx.fillRect(futonX + 5, futonY + 3, 35, 1);
      ctx.fillRect(futonX + 4, futonY + 4, 36, 1);
      ctx.fillRect(futonX + 3, futonY + 5, 38, 1);
      ctx.fillRect(futonX + 2, futonY + 6, 39, 1);
      ctx.fillRect(futonX + 1, futonY + 7, 40, 1);
      ctx.fillRect(futonX + 1, futonY + 8, 40, 1);
      ctx.fillRect(futonX, futonY + 9, 42, 1);
      ctx.fillRect(futonX, futonY + 10, 42, 1);
      ctx.fillRect(futonX - 1, futonY + 11, 43, 1);
      ctx.fillRect(futonX - 1, futonY + 12, 43, 1);
      // Blanket fold highlight
      ctx.fillStyle = fBlanketLt;
      ctx.fillRect(futonX + 6, futonY + 2, 33, 1);
      // Blanket thickness
      ctx.fillStyle = fBlanketDk;
      ctx.fillRect(futonX - 2, futonY + 13, 44, 1);
      ctx.fillRect(futonX - 2, futonY + 14, 44, 1);
      // Makura (pillow) — right end, follows futon right edge taper
      // Futon right edge (last pixel): y+3=54, y+4=55, y+5=56, y+6=57, y+7=58, y+8=58, y+9=59, y+10=59
      // Pillow: 7px wide, right edge 1px inset from futon
      var fPillow   = '#807868';
      var fPillowLt = '#908878';
      var fPillowDk = '#686058';
      ctx.fillStyle = fPillow;
      ctx.fillRect(futonX + 47, futonY + 3, 7, 1);   // right pixel=53, futon=54
      ctx.fillRect(futonX + 48, futonY + 4, 7, 1);   // right pixel=54, futon=55
      ctx.fillRect(futonX + 49, futonY + 5, 7, 1);   // right pixel=55, futon=56
      ctx.fillRect(futonX + 50, futonY + 6, 7, 1);   // right pixel=56, futon=57
      ctx.fillRect(futonX + 51, futonY + 7, 7, 1);   // right pixel=57, futon=58
      ctx.fillRect(futonX + 51, futonY + 8, 7, 1);   // right pixel=57, futon=58
      ctx.fillRect(futonX + 52, futonY + 9, 7, 1);   // right pixel=58, futon=59
      ctx.fillRect(futonX + 52, futonY + 10, 7, 1);  // right pixel=58, futon=59
      // Highlight (top 2 rows)
      ctx.fillStyle = fPillowLt;
      ctx.fillRect(futonX + 47, futonY + 3, 7, 1);
      ctx.fillRect(futonX + 48, futonY + 4, 7, 1);
      // Shadow (bottom 2 rows)
      ctx.fillStyle = fPillowDk;
      ctx.fillRect(futonX + 52, futonY + 9, 7, 1);
      ctx.fillRect(futonX + 52, futonY + 10, 7, 1);

      // Cat following the yokai (same triangle wave, on tatami floor)
      var catGhostT = (time % 900) / 900; // same period as yokai
      var catGhostTri = catGhostT < 0.5 ? catGhostT * 2 : 2 - catGhostT * 2;
      // Cat follows but won't enter tokonoma (x=240 max)
      var ncxRaw = Math.floor(5 + catGhostTri * (W - 15));
      var ncx = Math.min(ncxRaw, 240);
      // Direction: based on movement phase, except when waiting at tokonoma
      var catGoingRight;
      if (ncx >= 240) {
        // Waiting at tokonoma wall — face towards yokai
        var yokaiX = -15 + catGhostTri * (W + 30);
        catGoingRight = yokaiX > ncx;
      } else {
        // Moving — face direction of travel
        catGoingRight = catGhostT < 0.5;
      }
      var ncy = 41;
      var ncBody = '#885828';
      var ncDark = '#704820';
      var ncLight = '#a07038';
      // ncx = center of cat. All parts offset from center based on direction.
      // Facing right: head right, body center, tail left
      // Facing left: head left, body center, tail right
      var hx = catGoingRight ? ncx + 2 : ncx - 4; // head x
      var bx = ncx - 2; // body x (always centered)
      var tx = catGoingRight ? ncx - 5 : ncx + 5; // tail x
      var td = catGoingRight ? -1 : 1; // tail curve direction
      // Body
      ctx.fillStyle = ncBody;
      ctx.fillRect(bx, ncy + 2, 6, 3);
      ctx.fillStyle = ncLight;
      ctx.fillRect(bx + 1, ncy + 2, 4, 1);
      ctx.fillStyle = ncDark;
      ctx.fillRect(bx + 1, ncy + 3, 1, 1);
      ctx.fillRect(bx + 3, ncy + 3, 1, 1);
      // Head
      ctx.fillStyle = ncBody;
      ctx.fillRect(hx, ncy - 1, 5, 1);
      ctx.fillRect(hx, ncy, 5, 2);
      // Ears
      ctx.fillStyle = ncDark;
      ctx.fillRect(hx, ncy - 2, 1, 1);
      ctx.fillRect(hx + 4, ncy - 2, 1, 1);
      // Stripes on head
      ctx.fillRect(hx + 1, ncy, 1, 1);
      ctx.fillRect(hx + 3, ncy, 1, 1);
      // Eye (front side of head)
      ctx.fillStyle = '#283828';
      ctx.fillRect(catGoingRight ? hx + 4 : hx, ncy, 1, 1);
      // Tail (curving up)
      ctx.fillStyle = ncBody;
      ctx.fillRect(tx, ncy + 2, 1, 1);
      ctx.fillRect(tx + td, ncy + 1, 1, 1);
      ctx.fillStyle = ncDark;
      ctx.fillRect(tx + td, ncy, 1, 1);
      // Trotting legs (animated)
      var legFrame = Math.floor(time / 10) % 4;
      ctx.fillStyle = ncLight;
      if (legFrame === 0 || legFrame === 2) {
        ctx.fillRect(bx + 1, ncy + 5, 1, 1);
        ctx.fillRect(bx + 4, ncy + 5, 1, 1);
      } else {
        ctx.fillRect(bx + 2, ncy + 5, 1, 1);
        ctx.fillRect(bx + 3, ncy + 5, 1, 1);
      }
    } else {
      // Day: table center with arrangement & materials
      var tableX = 122;
      drawCushion(tableX - 13, 38);
      drawCushion(tableX + 38, 38);
      drawTable(tableX, 41);
      drawArrangement(tableX + 14, 37);

      // 13b. Loose stems & materials on left side of table
      var matStem = '#4a8848';
      var matStemDk = '#2a5828';
      var matFlower = '#f0ece0';
      var matPink = '#e898a8';
      // Stem 1 — long, laying diagonal
      ctx.fillStyle = matStem;
      ctx.fillRect(tableX + 2, 36, 1, 1);
      ctx.fillRect(tableX + 3, 35, 1, 1);
      ctx.fillRect(tableX + 4, 35, 1, 1);
      ctx.fillRect(tableX + 5, 34, 1, 1);
      ctx.fillRect(tableX + 6, 34, 1, 1);
      ctx.fillRect(tableX + 7, 33, 1, 1);
      ctx.fillRect(tableX + 8, 33, 1, 1);
      // Small bud at end
      ctx.fillStyle = matFlower;
      ctx.fillRect(tableX + 9, 32, 1, 2);
      // Stem 2 — shorter, slightly below
      ctx.fillStyle = matStemDk;
      ctx.fillRect(tableX + 1, 38, 1, 1);
      ctx.fillRect(tableX + 2, 37, 1, 1);
      ctx.fillRect(tableX + 3, 37, 1, 1);
      ctx.fillRect(tableX + 4, 36, 1, 1);
      ctx.fillRect(tableX + 5, 36, 1, 1);
      ctx.fillRect(tableX + 6, 35, 1, 1);
      // Pink bud
      ctx.fillStyle = matPink;
      ctx.fillRect(tableX + 7, 35, 1, 1);
      // Stem 3 — foliage branch
      ctx.fillStyle = matStem;
      ctx.fillRect(tableX + 3, 39, 1, 1);
      ctx.fillRect(tableX + 4, 38, 1, 1);
      ctx.fillRect(tableX + 5, 38, 1, 1);
      ctx.fillRect(tableX + 6, 37, 1, 1);
      ctx.fillRect(tableX + 7, 37, 1, 1);
      // Small leaves
      ctx.fillStyle = matStemDk;
      ctx.fillRect(tableX + 7, 36, 2, 1);
      ctx.fillRect(tableX + 8, 37, 1, 1);

      // 13c. Mizukiri bowl (small water bowl)
      ctx.fillStyle = '#989088';
      ctx.fillRect(tableX + 1, 39, 5, 1);
      ctx.fillRect(tableX, 40, 7, 1);
      ctx.fillRect(tableX + 1, 41, 5, 1);
      ctx.fillStyle = '#88b0c8';
      ctx.fillRect(tableX + 2, 39, 3, 1);
      ctx.fillStyle = '#808078';
      ctx.fillRect(tableX + 5, 40, 2, 1);

      // 13d. Neko (cat) pushing yarn ball back and forth
      var nekoY = 41;
      var catBody = '#d89040', catDark = '#b87030', catLight = '#e8a858';
      var nekoCycle = 600; // total frames for one back-and-forth
      var nekoT = (time % nekoCycle) / nekoCycle; // 0-1
      var nekoTri = nekoT < 0.5 ? nekoT * 2 : 2 - nekoT * 2; // 0→1→0
      var goingRight = nekoT < 0.5;
      var nekoRange = 30;
      var nekoBase = 55;
      var pawFrame = Math.floor(time / 18) % 4;

      // Yarn position (slightly ahead of cat in direction of travel)
      var yarnOff = goingRight ? -7 : 7;
      var yarnX = Math.floor(nekoBase + nekoTri * nekoRange + yarnOff);
      var catX = Math.floor(nekoBase + nekoTri * nekoRange);

      // Yarn ball
      ctx.fillStyle = '#c05030';
      ctx.fillRect(yarnX, nekoY + 2, 1, 2);
      ctx.fillRect(yarnX - 1, nekoY + 3, 3, 2);
      ctx.fillRect(yarnX, nekoY + 5, 1, 1);
      ctx.fillStyle = '#d87050';
      ctx.fillRect(yarnX, nekoY + 3, 1, 1);
      // Yarn trail (behind the ball)
      ctx.fillStyle = '#c05030';
      ctx.globalAlpha = 0.4;
      var trailDir = goingRight ? 1 : -1;
      ctx.fillRect(yarnX + trailDir * 2, nekoY + 4, 2, 1);
      ctx.fillRect(yarnX + trailDir * 4, nekoY + 3, 1, 1);
      ctx.globalAlpha = 1;

      // Cat — flips depending on direction
      var d = goingRight ? -1 : 1; // mirror multiplier
      var cx = catX; // head anchor
      // Ears
      ctx.fillStyle = catDark;
      ctx.fillRect(cx + (d < 0 ? -1 : 3), nekoY - 2, 1, 1);
      ctx.fillRect(cx + (d < 0 ? 3 : -1), nekoY - 2, 1, 1);
      ctx.fillStyle = '#e8a0a0';
      ctx.fillRect(cx + (d < 0 ? 0 : 2), nekoY - 1, 1, 1);
      ctx.fillRect(cx + (d < 0 ? 2 : 0), nekoY - 1, 1, 1);
      // Head
      ctx.fillStyle = catBody;
      ctx.fillRect(cx - 1, nekoY - 1, 5, 1);
      ctx.fillRect(cx - 1, nekoY, 5, 2);
      // Stripes
      ctx.fillStyle = catDark;
      ctx.fillRect(cx, nekoY, 1, 1);
      ctx.fillRect(cx + 2, nekoY, 1, 1);
      // Eye (on the side facing yarn)
      ctx.fillStyle = '#283828';
      ctx.fillRect(cx + (d < 0 ? -1 : 3), nekoY, 1, 1);
      // Nose
      ctx.fillStyle = '#e8a0a0';
      ctx.fillRect(cx + 1, nekoY + 1, 1, 1);
      // Body (extends behind head)
      var bx = goingRight ? cx : cx - 2;
      ctx.fillStyle = catBody;
      ctx.fillRect(bx, nekoY + 2, 6, 3);
      ctx.fillStyle = catLight;
      ctx.fillRect(bx + 1, nekoY + 2, 4, 1);
      ctx.fillStyle = catDark;
      ctx.fillRect(bx + 1, nekoY + 3, 1, 1);
      ctx.fillRect(bx + 3, nekoY + 3, 1, 1);
      // Tail (curving up, behind body)
      var tailX = goingRight ? bx + 6 : bx - 1;
      var tailDir = goingRight ? 1 : -1;
      ctx.fillStyle = catBody;
      ctx.fillRect(tailX, nekoY + 2, 1, 1);
      ctx.fillRect(tailX + tailDir, nekoY + 1, 1, 1);
      ctx.fillStyle = catDark;
      ctx.fillRect(tailX + tailDir, nekoY, 1, 1);
      // Front paws (always visible, 2px each)
      var pawDir = goingRight ? -1 : 1;
      ctx.fillStyle = catLight;
      // Static back paw
      ctx.fillRect(cx + pawDir * 1, nekoY + 5, 2, 1);
      // Batting front paw (animated, bigger)
      ctx.fillStyle = '#f0c070';
      if (pawFrame === 0) {
        ctx.fillRect(cx + pawDir * 2, nekoY + 4, 2, 1);
        ctx.fillRect(cx + pawDir * 2, nekoY + 5, 2, 1);
      } else if (pawFrame === 1) {
        ctx.fillRect(cx + pawDir * 3, nekoY + 3, 2, 1);
        ctx.fillRect(cx + pawDir * 3, nekoY + 4, 2, 1);
      } else if (pawFrame === 2) {
        ctx.fillRect(cx + pawDir * 4, nekoY + 2, 2, 1);
        ctx.fillRect(cx + pawDir * 4, nekoY + 3, 2, 1);
      } else {
        ctx.fillRect(cx + pawDir * 3, nekoY + 3, 2, 1);
        ctx.fillRect(cx + pawDir * 3, nekoY + 4, 2, 1);
      }
    }

    // 16. Falling petals (temporarily removed)
    // drawPetals(time);

    // 17. Fireflies (dark mode only)
    if (isDark()) {
      var fireflies = [
        {x: 30, y: 10, sx: 0.03, sy: 0.02, ox: 0},
        {x: 65, y: 16, sx: 0.02, sy: 0.03, ox: 1.2},
        {x: 15, y: 22, sx: 0.025, sy: 0.015, ox: 2.5},
        {x: 90, y: 8, sx: 0.018, sy: 0.025, ox: 3.8},
        {x: 50, y: 25, sx: 0.022, sy: 0.018, ox: 5.1},
        {x: 78, y: 14, sx: 0.028, sy: 0.022, ox: 6.3},
        {x: 42, y: 18, sx: 0.015, sy: 0.028, ox: 7.7},
        {x: 105, y: 12, sx: 0.02, sy: 0.02, ox: 8.9},
        {x: 20, y: 15, sx: 0.025, sy: 0.02, ox: 10.2},
        {x: 58, y: 20, sx: 0.02, sy: 0.025, ox: 11.5},
        {x: 155, y: 10, sx: 0.022, sy: 0.02, ox: 12.8},
        {x: 180, y: 18, sx: 0.018, sy: 0.025, ox: 14.1},
        {x: 200, y: 8, sx: 0.025, sy: 0.018, ox: 15.3},
        {x: 170, y: 24, sx: 0.02, sy: 0.022, ox: 16.7},
        {x: 145, y: 14, sx: 0.028, sy: 0.015, ox: 17.9},
        {x: 210, y: 20, sx: 0.015, sy: 0.028, ox: 19.2},
        {x: 190, y: 12, sx: 0.022, sy: 0.02, ox: 20.5},
        {x: 160, y: 22, sx: 0.02, sy: 0.025, ox: 21.8},
        {x: 135, y: 9, sx: 0.025, sy: 0.018, ox: 23.1},
        {x: 205, y: 16, sx: 0.018, sy: 0.022, ox: 24.4}
      ];
      for (var fi = 0; fi < fireflies.length; fi++) {
        var ff = fireflies[fi];
        var fx = ff.x + Math.sin(time * ff.sx + ff.ox) * 3;
        var fy = ff.y + Math.sin(time * ff.sy + ff.ox * 0.7) * 2;
        var fAlpha = 0.5 + 0.5 * Math.sin(time * 0.08 + ff.ox) * Math.sin(time * 0.05 + ff.ox * 1.3);
        if (fAlpha > 0.1) {
          // Glow
          ctx.fillStyle = '#c8e040';
          ctx.globalAlpha = fAlpha * 0.2;
          ctx.fillRect(Math.floor(fx) - 1, Math.floor(fy) - 1, 3, 3);
          // Core
          ctx.fillStyle = '#e8f878';
          ctx.globalAlpha = fAlpha;
          ctx.fillRect(Math.floor(fx), Math.floor(fy), 1, 1);
          ctx.globalAlpha = 1;
        }
      }

    }

    requestAnimationFrame(draw);
  }
  draw();
})();
