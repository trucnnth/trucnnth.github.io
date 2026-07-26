// ===== Pixel Art Banner — Great Smoky Mountains Fall =====
(function() {
  const canvas = document.getElementById('pixel-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = 280, H = 48;
  canvas.width = W; canvas.height = H;

  function isDark() { return document.documentElement.getAttribute('data-theme') === 'dark'; }

  const palette = {
    light: {
      sky1: '#8aacd0', sky2: '#a8c4e0', sky3: '#c4d8ec', cloud: '#e8e4e0',
      haze: '#b0c4d8',
      // Mountains — indigo/violet dissolving to pale cerulean
      mtnFar: '#9098b8', mtnFarSnow: '#c0c8d8', mtnFarMid: '#a0a8c0',
      mtnFarGreen: '#6a8878', mtnFarFall: '#9a8870',
      mtnBack: '#6870a0', mtnBackSnow: '#9098b8', mtnBackMid: '#7880b0',
      mtnBackGreen: '#4a6858', mtnBackFall: '#8a7058',
      mtnFront: '#485880', mtnFrontHi: '#5868a0', mtnFrontMid: '#506090',
      mtnFrontGreen: '#385848', mtnFrontFall: '#6a5040',
      waterfall: '#78c0e0', waterfallHi: '#a8d8f0', waterfallMist: '#c0d8e8',
      lake: '#68b0d0', lakeHi: '#88c8e0', lakeEdge: '#4890b0',
      treeTrunk: '#5a3820',
      // Crimson fire — Sugar Maple, Red Maple
      treeLeaf: '#c82818', treeLeafHi: '#e84020', treeLeafDk: '#901810',
      // Orange-red blaze — Sugar Maple
      treeLeafB: '#e87818', treeLeafBHi: '#f89030',
      // Spun gold — Tulip Poplar, Birch
      treeLeafC: '#e8c028', treeLeafCHi: '#f8d848',
      // Russet gold — Hickory
      treeLeafD: '#c88018', treeLeafDHi: '#d89828',
      // Burgundy/wine — Dogwood, Sourwood understory
      treeLeafE: '#882040', treeLeafEHi: '#a83050', treeLeafEDk: '#681830',
      // Copper/wine — Sweetgum
      treeLeafF: '#a86038', treeLeafFHi: '#c87848',
      // Steadfast evergreen — Spruce, Fir, Hemlock
      treeEvergreen: '#2a6828', treeEvergreenHi: '#389038', treeEvergreenDk: '#1a4818',
      // Bushes — green, burgundy, gold
      bush1: '#2a7828', bush1Hi: '#3a8838',
      bush2: '#882040', bush2Hi: '#a83050',
      bush3: '#c88018', bush3Hi: '#d89828',
      obstacle: '#6a5838', obstacleMoss: '#4a7848',
      // Ground — crimson carpet and russet gold
      ground1: '#887048', ground2: '#786040', ground3: '#685038', groundPath: '#c0a878',
      // Fallen confetti
      leaf1: '#c82818', leaf2: '#e87818', leaf3: '#e8c028', leaf4: '#882040', leaf5: '#a86038', leaf6: '#c88018',
      mSkin: '#f8c898', mHair: '#483828', mShirt: '#3868a8', mPants: '#c8b888', mBoots: '#483020',
      mHat: '#d8b878', mHatBand: '#a08848',
      mBag: '#282828', mBagHi: '#404040',
      fSkin: '#f8c898', fHair: '#784020', fCap: '#88b8e8', fCapBrim: '#6898c8', fShirt: '#9870d0', fPants: '#282828', fBoots: '#583838',
      fBag: '#4878b8', fBagHi: '#68a0d0',
      elk: '#a87848', elkHi: '#c89868', elkMane: '#685038', elkAntler: '#c8a878',
      bear: '#282828', bearHi: '#383838', bearSnout: '#584838',
    },
    dark: {
      sky1: '#141e30', sky2: '#1a2840', sky3: '#20304a', cloud: '#303848',
      haze: '#1a2438',
      mtnFar: '#303858', mtnFarSnow: '#484e68', mtnFarMid: '#383e60',
      mtnFarGreen: '#1a3828', mtnFarFall: '#4a3828',
      mtnBack: '#202848', mtnBackSnow: '#383e58', mtnBackMid: '#283050',
      mtnBackGreen: '#102818', mtnBackFall: '#3a2018',
      mtnFront: '#141e38', mtnFrontHi: '#1e2848', mtnFrontMid: '#182240',
      mtnFrontGreen: '#081808', mtnFrontFall: '#2a1808',
      waterfall: '#2888a0', waterfallHi: '#3898b0', waterfallMist: '#3888a0',
      lake: '#186888', lakeHi: '#288898', lakeEdge: '#0a4860',
      treeTrunk: '#3a2010',
      treeLeaf: '#901810', treeLeafHi: '#b03018', treeLeafDk: '#681008',
      treeLeafB: '#b05810', treeLeafBHi: '#c87020',
      treeLeafC: '#a89018', treeLeafCHi: '#c0a828',
      treeLeafD: '#886008', treeLeafDHi: '#a07818',
      treeLeafE: '#601830', treeLeafEHi: '#802840', treeLeafEDk: '#481020',
      treeLeafF: '#804828', treeLeafFHi: '#986038',
      treeEvergreen: '#1a4818', treeEvergreenHi: '#286828', treeEvergreenDk: '#0a3008',
      bush1: '#1a4818', bush1Hi: '#286828',
      bush2: '#601830', bush2Hi: '#802840',
      bush3: '#886008', bush3Hi: '#a07818',
      obstacle: '#4a3828', obstacleMoss: '#3a5838',
      ground1: '#585028', ground2: '#484020', ground3: '#383018', groundPath: '#887858',
      leaf1: '#901810', leaf2: '#b05810', leaf3: '#a89018', leaf4: '#601830', leaf5: '#804828', leaf6: '#886008',
      mSkin: '#d8a868', mHair: '#282018', mShirt: '#1e3868', mPants: '#887858', mBoots: '#281810',
      mHat: '#a08848', mHatBand: '#786830',
      mBag: '#181818', mBagHi: '#303030',
      fSkin: '#d8a868', fHair: '#583010', fCap: '#486888', fCapBrim: '#385870', fShirt: '#7050a8', fPants: '#181818', fBoots: '#382020',
      fBag: '#285088', fBagHi: '#487098',
      elk: '#785828', elkHi: '#987848', elkMane: '#483020', elkAntler: '#987858',
      bear: '#181818', bearHi: '#282828', bearSnout: '#3a2818',
    }
  };
  function P() { return isDark() ? palette.dark : palette.light; }

  let seed = 42;
  function srand() { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }

  // ---- Generation ----
  const mtnsFar = [], mtnsBack = [], mtnsFront = [];
  const treesBack = [], treesMid = [], treesFront = [];
  const bushes = [], clouds = [], flowers = [], obstacles = [];

  (function generate() {
    let x;
    // Far mountains
    x = 0;
    while (x < W * 2) {
      const w = 35 + Math.floor(srand() * 30);
      const peakY = 5 + Math.floor(srand() * 4);
      const hasWaterfall = srand() < 0.18;
      mtnsFar.push({ x, peakY, w, hasWaterfall });
      x += w * 0.5;
    }
    // Mid mountains
    x = 0;
    while (x < W * 2) {
      const w = 24 + Math.floor(srand() * 20);
      const peakY = 12 + Math.floor(srand() * 4);
      const hasWaterfall = srand() < 0.15;
      mtnsBack.push({ x, peakY, w, hasWaterfall });
      x += w * 0.55;
    }
    // Front hills
    x = 0;
    while (x < W * 2) {
      const w = 16 + Math.floor(srand() * 14);
      const peakY = 22 + Math.floor(srand() * 3);
      mtnsFront.push({ x, peakY, w });
      x += w * 0.6;
    }
    // Pick from all 7 tree color types (0-6), weighted: more fire/gold, some burgundy/copper
    function fallColor() {
      const r = srand();
      if (r < 0.20) return 0;  // crimson maple
      if (r < 0.35) return 1;  // orange-red
      if (r < 0.50) return 2;  // spun gold
      if (r < 0.62) return 3;  // russet hickory
      if (r < 0.77) return 5;  // burgundy dogwood
      return 6;                 // copper sweetgum
    }
    // Back trees (distant, high elevation — more evergreen + early turners)
    x = 0;
    while (x < W * 2) {
      const isEv = srand() < 0.4; // spruce-fir at high elevation
      const h = isEv ? (4 + Math.floor(srand() * 6)) : (3 + Math.floor(srand() * 5));
      treesBack.push({ x, h, type: isEv ? 'pine' : 'round', colorType: isEv ? 4 : fallColor() });
      x += 3 + Math.floor(srand() * 3);
    }
    // Mid trees — the living tapestry
    x = 0;
    while (x < W * 2) {
      const isEv = srand() < 0.2;
      const h = isEv ? (8 + Math.floor(srand() * 12)) : (6 + Math.floor(srand() * 10));
      treesMid.push({ x, h, type: isEv ? 'pine' : 'round', colorType: isEv ? 4 : fallColor() });
      x += 4 + Math.floor(srand() * 4);
    }
    // Front trees (tallest — the cathedral canopy)
    x = 0;
    while (x < W * 2) {
      const isEv = srand() < 0.2;
      const h = isEv ? (10 + Math.floor(srand() * 14)) : (8 + Math.floor(srand() * 12));
      treesFront.push({ x, h, type: isEv ? 'pine' : 'round', colorType: isEv ? 4 : fallColor() });
      x += 5 + Math.floor(srand() * 5);
    }
    // Bushes along the ground
    x = 0;
    while (x < W * 2) {
      const w = 3 + Math.floor(srand() * 4);
      const h = 2 + Math.floor(srand() * 2);
      const type = Math.floor(srand() * 3); // 0=green, 1=orange, 2=red
      bushes.push({ x, w, h, type });
      x += 6 + Math.floor(srand() * 10);
    }
    // Clouds
    x = 0;
    while (x < W * 2) {
      const r = srand();
      let w, h, y;
      if (r < 0.3) { w = 5 + Math.floor(srand() * 6); h = 1; y = 1 + Math.floor(srand() * 7); }
      else if (r < 0.7) { w = 10 + Math.floor(srand() * 10); h = 2 + Math.floor(srand() * 2); y = 2 + Math.floor(srand() * 5); }
      else { w = 18 + Math.floor(srand() * 16); h = 3 + Math.floor(srand() * 2); y = 1 + Math.floor(srand() * 4); }
      clouds.push({ x, y, w, h });
      x += w + 8 + Math.floor(srand() * 20);
    }
    // Fallen leaves — nature's confetti, crimson carpets and russet gold
    x = 0;
    while (x < W * 2) { flowers.push({ x, type: Math.floor(srand() * 6), y: Math.floor(srand() * 2) }); x += 2 + Math.floor(srand() * 4); }
    // Obstacles
    x = 30;
    while (x < W * 2) { obstacles.push({ x, type: srand() > 0.5 ? 'log' : 'rock' }); x += 120 + Math.floor(srand() * 60); }
  })();

  // ---- Drawing functions ----

  function drawCloud(c, offset) {
    const p = P();
    const x = ((c.x - offset) % (W * 2) + W * 2) % (W * 2) - W * 0.3;
    if (x < -30 || x > W + 30) return;
    const fx = Math.floor(x);
    ctx.fillStyle = p.cloud;
    if (c.h <= 2) {
      ctx.globalAlpha = 0.5 + c.h * 0.1;
      ctx.fillRect(fx + 1, c.y, c.w - 2, c.h);
      ctx.fillRect(fx, c.y + Math.floor(c.h / 2), c.w, Math.max(1, c.h - 1));
      if (c.w > 8) ctx.fillRect(fx + Math.floor(c.w * 0.15), c.y - 1, Math.floor(c.w * 0.5), 1);
    } else {
      ctx.globalAlpha = 0.65;
      ctx.fillRect(fx + 2, c.y, c.w - 4, c.h + 1);
      ctx.fillRect(fx, c.y + 1, c.w, c.h);
      ctx.fillRect(fx + Math.floor(c.w * 0.2), c.y - 1, Math.floor(c.w * 0.3), 2);
      ctx.fillRect(fx + Math.floor(c.w * 0.55), c.y - 2, Math.floor(c.w * 0.25), 2);
      ctx.globalAlpha = 0.3;
      ctx.fillRect(fx + Math.floor(c.w * 0.2) + 1, c.y - 1, Math.floor(c.w * 0.2), 1);
    }
    ctx.globalAlpha = 1;
  }

  // Draw haze between mountain layers
  function drawHaze(y, h, alpha) {
    const p = P();
    ctx.fillStyle = p.haze;
    ctx.globalAlpha = alpha;
    ctx.fillRect(0, y, W, h);
    ctx.globalAlpha = 1;
  }

  function drawMountain(m, offset, color, snowColor, snowRows, midColor, greenColor, fallColor, t) {
    const p = P();
    const x = ((m.x - offset) % (W * 2) + W * 2) % (W * 2) - W * 0.5;
    const half = m.w / 2;
    const height = m.w * 0.65;

    for (let row = 0; row <= height; row++) {
      // Soft cosine profile — rounded ridges, not jagged triangles
      const pct = row / height;
      const span = Math.sin(pct * Math.PI * 0.5) * half;
      const rx = Math.floor(x + half - span);
      const rw = Math.ceil(span * 2);
      if (rw < 1) continue;

      // Base mountain color
      if (row < snowRows) {
        ctx.fillStyle = snowColor;
      } else if (row < snowRows + 4) {
        ctx.fillStyle = midColor || color;
      } else {
        ctx.fillStyle = color;
      }
      ctx.fillRect(rx, Math.floor(m.peakY + row), rw, 1);

      // Vegetation on slopes — trees, scrubs, and fall foliage
      if (pct > 0.25 && rw > 3 && greenColor) {
        const blend = Math.min(1, (pct - 0.25) / 0.5);
        const patch = Math.sin((x + rx) * 0.2 + row * 0.4);
        const detail = Math.sin((x + rx) * 0.6 + row * 0.9);
        if (patch > 0.0) ctx.fillStyle = greenColor;
        else if (patch > -0.4) ctx.fillStyle = fallColor;
        else continue;
        ctx.globalAlpha = 0.4 + blend * 0.45;
        ctx.fillRect(rx, Math.floor(m.peakY + row), rw, 1);
        // Tree canopy texture bumps
        if (detail > 0.5 && rw > 5) {
          ctx.fillStyle = detail > 0.75 ? greenColor : fallColor;
          ctx.globalAlpha = 0.5 + blend * 0.35;
          const bx = rx + Math.floor(rw * 0.3 + detail * rw * 0.4);
          ctx.fillRect(bx, Math.floor(m.peakY + row) - 1, 2, 1);
        }
        ctx.globalAlpha = 1;
      }

      // Soft light on left side
      if (rw > 4 && row > snowRows) {
        ctx.fillStyle = snowColor; ctx.globalAlpha = 0.08;
        ctx.fillRect(rx, Math.floor(m.peakY + row), Math.floor(rw * 0.3), 1);
        ctx.globalAlpha = 1;
      }
    }

    // Waterfall with pool
    if (m.hasWaterfall && t !== undefined) {
      const wfX = Math.floor(x + half + half * 0.25);
      const wfStartY = Math.floor(m.peakY + height * 0.25);
      const wfEndY = Math.floor(m.peakY + height);

      // Thick water stream (3px wide)
      for (let wy = wfStartY; wy < wfEndY; wy++) {
        const wobble = Math.floor(Math.sin(wy * 0.5 + t * 0.12) * 0.7);
        ctx.fillStyle = p.waterfall; ctx.globalAlpha = 0.85;
        ctx.fillRect(wfX + wobble, wy, 3, 1);
        ctx.fillStyle = p.waterfallHi; ctx.globalAlpha = 0.5;
        ctx.fillRect(wfX + wobble, wy, 1, 1);
      }

      // Lake pool at base — larger and more visible
      const lakeW = 14, lakeH = 4;
      const lakeX = wfX - 5, lakeY = wfEndY - 1;
      // Lake edge
      ctx.fillStyle = p.lakeEdge; ctx.globalAlpha = 0.7;
      ctx.fillRect(lakeX, lakeY, lakeW, lakeH + 1);
      // Lake body
      ctx.fillStyle = p.lake; ctx.globalAlpha = 0.9;
      ctx.fillRect(lakeX + 1, lakeY, lakeW - 2, lakeH);
      ctx.fillRect(lakeX + 2, lakeY - 1, lakeW - 4, 1);
      // Shimmer
      ctx.fillStyle = p.lakeHi; ctx.globalAlpha = 0.5;
      const shimmer = Math.floor(Math.sin(t * 0.08) * 2);
      ctx.fillRect(lakeX + 3 + shimmer, lakeY + 1, 4, 1);
      ctx.fillRect(lakeX + 5 - shimmer, lakeY + 2, 3, 1);
      ctx.globalAlpha = 1;

      // Splash mist
      ctx.fillStyle = p.waterfallMist;
      for (let mi = 0; mi < 6; mi++) {
        const mx = wfX - 2 + Math.floor(Math.sin(t * 0.09 + mi * 1.2) * 4);
        const my = wfEndY - 1 - Math.floor(Math.abs(Math.sin(t * 0.07 + mi * 1.0)) * 4);
        ctx.globalAlpha = 0.25 + Math.sin(t * 0.08 + mi) * 0.1;
        ctx.fillRect(mx, my, 2, 1);
      }
      // Rising vapor
      for (let vi = 0; vi < 6; vi++) {
        const vx = wfX - 3 + Math.floor(Math.sin(t * 0.04 + vi * 1.5) * 5);
        const vy = wfEndY - 2 - Math.floor((t * 0.2 + vi * 3.5) % 12);
        ctx.fillStyle = p.waterfallMist;
        ctx.globalAlpha = 0.2 - ((t * 0.2 + vi * 3.5) % 12) * 0.015;
        if (ctx.globalAlpha > 0.02) {
          ctx.fillRect(vx, vy, 2, 1);
        }
      }
      ctx.globalAlpha = 1;
    }
  }

  function getTreeColors(p, ct) {
    const map = [
      { hi: p.treeLeafHi, main: p.treeLeaf, dk: p.treeLeafDk },       // 0: crimson maple
      { hi: p.treeLeafBHi, main: p.treeLeafB, dk: p.treeLeaf },       // 1: orange-red blaze
      { hi: p.treeLeafCHi, main: p.treeLeafC, dk: p.treeLeafD },      // 2: spun gold
      { hi: p.treeLeafDHi, main: p.treeLeafD, dk: p.treeLeafDk },     // 3: russet hickory
      { hi: p.treeEvergreenHi, main: p.treeEvergreen, dk: p.treeEvergreenDk }, // 4: evergreen
      { hi: p.treeLeafEHi, main: p.treeLeafE, dk: p.treeLeafEDk },    // 5: burgundy dogwood
      { hi: p.treeLeafFHi, main: p.treeLeafF, dk: p.treeLeafE },      // 6: copper sweetgum
    ];
    return map[ct] || map[0];
  }

  function drawTree(t, offset, baseY, alpha) {
    const p = P();
    const x = ((t.x - offset) % (W * 2) + W * 2) % (W * 2) - W * 0.2;
    if (x < -14 || x > W + 14) return;
    const h = t.h, fx = Math.floor(x);
    const tc = getTreeColors(p, t.colorType);
    if (alpha) ctx.globalAlpha = alpha;

    ctx.fillStyle = p.treeTrunk;
    ctx.fillRect(fx, baseY - 2, 1, 3);

    if (t.type === 'pine') {
      for (let row = 0; row < h; row++) {
        const span = Math.floor((row / h) * 3) + 1;
        ctx.fillStyle = row < 2 ? tc.hi : (row > h - 2 ? tc.dk : tc.main);
        ctx.fillRect(fx - span + 1, baseY - 2 - h + row, span * 2 - 1, 1);
      }
    } else {
      const r = Math.max(2, Math.floor(h * 0.4) + 1);
      const cy = baseY - 2 - h + r + 1;
      for (let dy = -r; dy <= r; dy++) {
        const rw = Math.floor(Math.sqrt(r * r - dy * dy));
        ctx.fillStyle = dy < -1 ? tc.hi : (dy > 1 ? tc.dk : tc.main);
        ctx.fillRect(fx - rw + 1, cy + dy, rw * 2 - 1, 1);
      }
    }
    if (alpha) ctx.globalAlpha = 1;
  }

  function drawBush(b, offset, baseY) {
    const p = P();
    const x = ((b.x - offset) % (W * 2) + W * 2) % (W * 2) - W * 0.2;
    if (x < -8 || x > W + 8) return;
    const fx = Math.floor(x);
    const colors = [
      [p.bush1, p.bush1Hi],
      [p.bush2, p.bush2Hi],
      [p.bush3, p.bush3Hi],
    ];
    const [main, hi] = colors[b.type] || colors[0];

    // Rounded bush shape
    for (let row = 0; row < b.h; row++) {
      const w = row === 0 ? b.w - 1 : b.w;
      const ox = row === 0 ? 1 : 0;
      ctx.fillStyle = row === 0 ? hi : main;
      ctx.fillRect(fx + ox, baseY - b.h + row, w, 1);
    }
  }

  // ---- Pixel text (3x5 font, crisp 1-bit rendering) ----
  const GLYPH = {
    't': [7,2,2,2,2], 'r': [6,5,6,5,5], 'u': [5,5,5,5,2],
    'c': [3,4,4,4,3], 'n': [5,7,5,5,5], 'h': [5,5,7,5,5],
    'k': [5,6,4,6,5], 'o': [2,5,5,5,2], 'i': [7,2,2,2,7],
  };

  function drawPixelText(text, cx, y, noShadow) {
    const totalW = text.length * 4 - 1;
    const sx = cx - Math.floor(totalW / 2);
    const fg = isDark() ? '#e0e0e0' : '#ffffff';
    if (!noShadow) {
      const bg = isDark() ? '#101010' : '#202020';
      ctx.fillStyle = bg;
      for (let ci = 0, px = sx; ci < text.length; ci++, px += 4) {
        const g = GLYPH[text[ci]];
        if (!g) continue;
        for (let row = 0; row < 5; row++)
          for (let col = 0; col < 3; col++)
            if (g[row] & (4 >> col))
              ctx.fillRect(px + col + 1, y + row + 1, 1, 1);
      }
    }
    ctx.fillStyle = fg;
    for (let ci = 0, px = sx; ci < text.length; ci++, px += 4) {
      const g = GLYPH[text[ci]];
      if (!g) continue;
      for (let row = 0; row < 5; row++)
        for (let col = 0; col < 3; col++)
          if (g[row] & (4 >> col))
            ctx.fillRect(px + col, y + row, 1, 1);
    }
  }

  // ---- Characters ----

  function drawMaleChar(cx, cy, f) {
    const p = P();
    // Tan hat — darker crown, lighter brim
    ctx.fillStyle = p.mHatBand;
    ctx.fillRect(cx, cy - 2, 4, 1);
    ctx.fillStyle = p.mHat;
    ctx.fillRect(cx - 1, cy - 1, 6, 1);
    ctx.fillStyle = p.mHair; ctx.fillRect(cx, cy, 4, 2);
    ctx.fillStyle = p.mSkin; ctx.fillRect(cx, cy + 2, 4, 2);
    ctx.fillStyle = isDark() ? '#e8e8e8' : '#181818'; ctx.fillRect(cx + 3, cy + 2, 1, 1);
    ctx.fillStyle = p.mShirt; ctx.fillRect(cx, cy + 4, 4, 3);
    ctx.fillStyle = p.mBag; ctx.fillRect(cx - 2, cy + 3, 2, 5);
    ctx.fillStyle = p.mBagHi; ctx.fillRect(cx - 2, cy + 3, 2, 1);
    ctx.fillStyle = p.mSkin; ctx.fillRect(cx + 4, f === 1 ? cy + 4 : (f === 3 ? cy + 6 : cy + 5), 1, 2);
    ctx.fillStyle = p.mPants; ctx.fillRect(cx, cy + 7, 4, 2);
    ctx.fillStyle = p.mBoots;
    if (f % 2 === 0) { ctx.fillRect(cx, cy + 9, 2, 2); ctx.fillRect(cx + 2, cy + 9, 2, 2); }
    else if (f === 1) { ctx.fillRect(cx - 1, cy + 9, 2, 2); ctx.fillRect(cx + 3, cy + 9, 2, 2); }
    else { ctx.fillRect(cx + 1, cy + 9, 2, 2); ctx.fillRect(cx + 1, cy + 9, 2, 2); }
  }

  function drawFemaleChar(cx, cy, f) {
    const p = P();
    // Light blue baseball cap
    ctx.fillStyle = p.fCap;
    ctx.fillRect(cx, cy - 2, 4, 1);
    ctx.fillRect(cx, cy - 1, 4, 1);
    ctx.fillStyle = p.fCapBrim;
    ctx.fillRect(cx + 4, cy - 1, 2, 1);
    // Hair below cap
    ctx.fillStyle = p.fHair;
    ctx.fillRect(cx, cy, 4, 2);
    ctx.fillRect(cx - 1, cy + 1, 1, 3); ctx.fillRect(cx + 4, cy + 1, 1, 3);
    ctx.fillStyle = p.fSkin; ctx.fillRect(cx, cy + 2, 4, 2);
    ctx.fillStyle = isDark() ? '#e8e8e8' : '#181818'; ctx.fillRect(cx + 3, cy + 2, 1, 1);
    ctx.fillStyle = '#f8a0a0'; ctx.globalAlpha = 0.4; ctx.fillRect(cx + 3, cy + 3, 1, 1); ctx.globalAlpha = 1;
    ctx.fillStyle = p.fShirt; ctx.fillRect(cx, cy + 4, 4, 3);
    ctx.fillStyle = p.fBag; ctx.fillRect(cx - 2, cy + 3, 2, 5);
    ctx.fillStyle = p.fBagHi; ctx.fillRect(cx - 2, cy + 3, 2, 1);
    ctx.fillStyle = p.fSkin; ctx.fillRect(cx + 4, f === 1 ? cy + 4 : (f === 3 ? cy + 6 : cy + 5), 1, 2);
    ctx.fillStyle = p.fPants; ctx.fillRect(cx, cy + 7, 4, 2);
    ctx.fillStyle = p.fBoots;
    if (f % 2 === 0) { ctx.fillRect(cx, cy + 9, 2, 2); ctx.fillRect(cx + 2, cy + 9, 2, 2); }
    else if (f === 1) { ctx.fillRect(cx - 1, cy + 9, 2, 2); ctx.fillRect(cx + 3, cy + 9, 2, 2); }
    else { ctx.fillRect(cx + 1, cy + 9, 2, 2); ctx.fillRect(cx + 1, cy + 9, 2, 2); }
  }

  // Elk — larger than a deer, big antlers, dark mane
  function drawElk(cx, cy, f) {
    const p = P();
    // Body (bigger than deer)
    ctx.fillStyle = p.elk;
    ctx.fillRect(cx, cy + 3, 8, 4);
    // Lighter underside
    ctx.fillStyle = p.elkHi;
    ctx.fillRect(cx + 1, cy + 6, 6, 1);
    // Dark mane on neck/shoulders
    ctx.fillStyle = p.elkMane;
    ctx.fillRect(cx + 5, cy + 2, 2, 3);
    // Head
    ctx.fillStyle = p.elk;
    ctx.fillRect(cx + 7, cy + 1, 3, 3);
    ctx.fillRect(cx + 8, cy, 2, 1);
    // Ear
    ctx.fillStyle = p.elkHi;
    ctx.fillRect(cx + 9, cy - 1, 1, 1);
    // Eye
    ctx.fillStyle = isDark() ? '#d8d8d8' : '#181818';
    ctx.fillRect(cx + 9, cy + 1, 1, 1);
    // Nose
    ctx.fillStyle = '#383028';
    ctx.fillRect(cx + 10, cy + 2, 1, 1);
    // Antlers (large, branching)
    ctx.fillStyle = p.elkAntler;
    // Left antler
    ctx.fillRect(cx + 8, cy - 1, 1, 1);
    ctx.fillRect(cx + 7, cy - 2, 1, 1);
    ctx.fillRect(cx + 6, cy - 3, 1, 1);
    ctx.fillRect(cx + 6, cy - 2, 1, 1);
    ctx.fillRect(cx + 5, cy - 4, 1, 1);
    // Right antler
    ctx.fillRect(cx + 10, cy - 1, 1, 1);
    ctx.fillRect(cx + 11, cy - 2, 1, 1);
    ctx.fillRect(cx + 12, cy - 3, 1, 1);
    ctx.fillRect(cx + 11, cy - 3, 1, 1);
    ctx.fillRect(cx + 12, cy - 4, 1, 1);
    // Legs animated
    ctx.fillStyle = p.elk;
    if (f % 2 === 0) {
      ctx.fillRect(cx + 1, cy + 7, 1, 3);
      ctx.fillRect(cx + 3, cy + 7, 1, 3);
      ctx.fillRect(cx + 5, cy + 7, 1, 3);
      ctx.fillRect(cx + 7, cy + 7, 1, 3);
    } else {
      ctx.fillRect(cx, cy + 7, 1, 3);
      ctx.fillRect(cx + 2, cy + 7, 1, 3);
      ctx.fillRect(cx + 6, cy + 7, 1, 3);
      ctx.fillRect(cx + 8, cy + 7, 1, 3);
    }
    // Short tail
    ctx.fillStyle = p.elkHi;
    ctx.fillRect(cx - 1, cy + 3, 1, 2);
  }

  // Black bear — stocky, dark, rounded
  function drawBear(cx, cy, f) {
    const p = P();
    // Body (stocky, wide)
    ctx.fillStyle = p.bear;
    ctx.fillRect(cx, cy + 2, 7, 4);
    ctx.fillRect(cx + 1, cy + 1, 5, 1); // slightly rounded top
    // Lighter highlight
    ctx.fillStyle = p.bearHi;
    ctx.fillRect(cx + 1, cy + 2, 2, 1);
    // Head
    ctx.fillStyle = p.bear;
    ctx.fillRect(cx + 6, cy, 3, 4);
    // Ears (round)
    ctx.fillRect(cx + 6, cy - 1, 1, 1);
    ctx.fillRect(cx + 8, cy - 1, 1, 1);
    // Snout
    ctx.fillStyle = p.bearSnout;
    ctx.fillRect(cx + 9, cy + 2, 1, 2);
    // Eye
    ctx.fillStyle = isDark() ? '#c8c8c8' : '#e8e8e8';
    ctx.fillRect(cx + 8, cy + 1, 1, 1);
    // Legs animated (short, sturdy)
    ctx.fillStyle = p.bear;
    if (f % 2 === 0) {
      ctx.fillRect(cx + 1, cy + 6, 2, 2);
      ctx.fillRect(cx + 4, cy + 6, 2, 2);
    } else {
      ctx.fillRect(cx, cy + 6, 2, 2);
      ctx.fillRect(cx + 5, cy + 6, 2, 2);
    }
    // Small tail
    ctx.fillStyle = p.bear;
    ctx.fillRect(cx - 1, cy + 2, 1, 1);
  }

  // ---- Ghost ----
  function drawGhost(cx, cy, t) {
    // White translucent ghost — pasty, drifting
    const hover = Math.sin(t * 0.06) * 2; // gentle float up/down
    const gy = Math.floor(cy + hover);
    ctx.globalAlpha = 0.55;
    // Head (round)
    ctx.fillStyle = '#e8e8e8';
    ctx.fillRect(cx + 1, gy, 3, 1);
    ctx.fillRect(cx, gy + 1, 5, 1);
    ctx.fillRect(cx, gy + 2, 5, 1);
    // Eyes
    ctx.fillStyle = '#222222';
    ctx.fillRect(cx + 1, gy + 1, 1, 1);
    ctx.fillRect(cx + 3, gy + 1, 1, 1);
    // Mouth (small O)
    ctx.fillRect(cx + 2, gy + 2, 1, 1);
    // Body (wispy, tapers)
    ctx.fillStyle = '#e8e8e8';
    ctx.fillRect(cx, gy + 3, 5, 1);
    ctx.fillRect(cx, gy + 4, 5, 1);
    ctx.fillRect(cx, gy + 5, 5, 1);
    // Wavy bottom edge
    const wave = Math.floor(Math.sin(t * 0.1) * 1);
    ctx.fillRect(cx + wave, gy + 6, 2, 1);
    ctx.fillRect(cx + 3 - wave, gy + 6, 2, 1);
    ctx.globalAlpha = 1;
  }

  // ---- Twinkling stars (dark mode) ----
  // Seeded random for consistent star positions
  function seededRand(seed) { let s = seed; return function() { s = (s * 16807 + 0) % 2147483647; return s / 2147483647; }; }
  const starRng = seededRand(42);
  const stars = [];
  for (let i = 0; i < 50; i++) {
    stars.push({
      x: Math.floor(starRng() * W),
      y: Math.floor(starRng() * 14),  // top 14px of sky
      speed: 0.02 + starRng() * 0.04, // twinkle speed
      phase: starRng() * Math.PI * 2  // offset so they don't all sync
    });
  }
  function drawStars(time) {
    if (!isDark()) return;
    for (const s of stars) {
      const brightness = 0.3 + 0.7 * ((Math.sin(time * s.speed + s.phase) + 1) / 2);
      ctx.globalAlpha = brightness;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(s.x, s.y, 1, 1);
    }
    ctx.globalAlpha = 1;
  }

  // ---- HUD — icons, portraits, health & XP bars ----

  function drawHeart(x, y) {
    ctx.fillStyle = isDark() ? '#c82020' : '#e03020';
    ctx.fillRect(x + 1, y, 1, 1);       // .#.#.
    ctx.fillRect(x + 3, y, 1, 1);
    ctx.fillRect(x, y + 1, 5, 1);       // #####
    ctx.fillRect(x + 1, y + 2, 3, 1);   // .###.
    ctx.fillRect(x + 2, y + 3, 1, 1);   // ..#..
  }

  function drawPlus(x, y) {
    ctx.fillStyle = isDark() ? '#a070d0' : '#7848b8';
    ctx.fillRect(x + 1, y, 3, 1);       // .###.
    ctx.fillRect(x, y + 1, 5, 1);       // #####
    ctx.fillRect(x + 1, y + 2, 3, 1);   // .###.
  }

  function drawMalePortrait(x, y) {
    const p = P();
    // 5x5 front-facing: tan hat, skin, eyes, chin
    ctx.fillStyle = p.mHatBand;
    ctx.fillRect(x + 1, y, 3, 1);
    ctx.fillStyle = p.mHat;
    ctx.fillRect(x, y + 1, 5, 1);
    ctx.fillStyle = p.mSkin;
    ctx.fillRect(x + 1, y + 2, 3, 1);
    ctx.fillRect(x + 1, y + 3, 3, 1);
    ctx.fillStyle = isDark() ? '#e8e8e8' : '#181818';
    ctx.fillRect(x + 1, y + 3, 1, 1);
    ctx.fillRect(x + 3, y + 3, 1, 1);
    ctx.fillStyle = p.mSkin;
    ctx.fillRect(x + 2, y + 4, 1, 1);
  }

  function drawFemalePortrait(x, y) {
    const p = P();
    // 5x5 front-facing: blue cap, hair, skin, eyes, chin
    ctx.fillStyle = p.fCap;
    ctx.fillRect(x + 1, y, 3, 1);
    ctx.fillRect(x, y + 1, 5, 1);
    ctx.fillStyle = p.fHair;
    ctx.fillRect(x, y + 2, 5, 1);
    ctx.fillStyle = p.fSkin;
    ctx.fillRect(x + 1, y + 3, 3, 1);
    ctx.fillStyle = isDark() ? '#e8e8e8' : '#181818';
    ctx.fillRect(x + 1, y + 3, 1, 1);
    ctx.fillRect(x + 3, y + 3, 1, 1);
    ctx.fillStyle = p.fSkin;
    ctx.fillRect(x + 2, y + 4, 1, 1);
  }

  function drawBar(x, y, w, pct, fillColor, emptyColor) {
    const border = isDark() ? '#080808' : '#181818';
    ctx.fillStyle = border;
    ctx.fillRect(x, y, w, 3);
    ctx.fillStyle = emptyColor;
    ctx.fillRect(x + 1, y + 1, w - 2, 1);
    const fillW = Math.round((w - 2) * pct);
    if (fillW > 0) {
      ctx.fillStyle = fillColor;
      ctx.fillRect(x + 1, y + 1, fillW, 1);
    }
  }

  function barColor(pct) {
    const dark = isDark();
    if (pct >= 0.67) return dark ? '#20a020' : '#28c828';
    if (pct >= 0.34) return dark ? '#c09818' : '#e0b020';
    return dark ? '#c02020' : '#e02828';
  }

  function drawHUD() {
    const barW = 28;
    const dark = isDark();
    const hpEmpty = dark ? '#381010' : '#481818';
    const xpEmpty = dark ? '#181830' : '#282848';

    // Male — upper left: [face] KOIKOI — HP 80%, XP 65%
    drawMalePortrait(2, 2);
    drawPixelText('koikoi', 21, 2, true);
    drawHeart(4, 8);
    drawBar(10, 8, barW, 0.8, barColor(0.8), hpEmpty);
    drawPlus(4, 12);
    drawBar(10, 12, barW, 0.65, barColor(0.65), xpEmpty);

    // Female — upper right: [face] TRUCNNTH — HP 50%, XP 70%
    drawFemalePortrait(240, 2);
    drawPixelText('trucnnth', 263, 2, true);
    drawHeart(242, 8);
    drawBar(248, 8, barW, 0.5, barColor(0.5), hpEmpty);
    drawPlus(242, 12);
    drawBar(248, 12, barW, 0.7, barColor(0.7), xpEmpty);
  }

  // ---- Main loop ----

  let time = 0;
  const groundY = H - 7;
  const backTreeBaseY = groundY - 4;
  const midTreeBaseY = groundY - 1;

  function draw() {
    const p = P();
    time += 0.4;

    // Sky
    const b1 = Math.floor(H * 0.3), b2 = Math.floor(H * 0.6);
    ctx.fillStyle = p.sky1; ctx.fillRect(0, 0, W, b1);
    ctx.fillStyle = p.sky2; ctx.fillRect(0, b1, W, b2 - b1);
    ctx.fillStyle = p.sky3; ctx.fillRect(0, b2, W, H - b2);

    // Stars (dark mode only — drawn before clouds so clouds occlude them)
    drawStars(time);

    // Clouds
    clouds.forEach(c => drawCloud(c, time * 0.08));

    // Far mountains — palest, almost dissolving into sky
    mtnsFar.forEach(m => drawMountain(m, time * 0.12,
      p.mtnFar, p.mtnFarSnow, 3, p.mtnFarMid, p.mtnFarGreen, p.mtnFarFall, time));

    // Haze between far and mid ridges — the celestial breath
    drawHaze(Math.floor(H * 0.35), 4, 0.25);

    // Back trees (distant, faded)
    treesBack.forEach(t => drawTree(t, time * 0.2, backTreeBaseY, 0.5));

    // Mid mountains — deeper indigo
    mtnsBack.forEach(m => drawMountain(m, time * 0.25,
      p.mtnBack, p.mtnBackSnow, 2, p.mtnBackMid, p.mtnBackGreen, p.mtnBackFall, time));

    // Haze between mid and front ridges
    drawHaze(Math.floor(H * 0.48), 3, 0.18);

    // Mid trees
    treesMid.forEach(t => drawTree(t, time * 0.4, midTreeBaseY, 0.8));

    // Front hills — deepest violet-blue
    mtnsFront.forEach(m => drawMountain(m, time * 0.4,
      p.mtnFront, p.mtnFrontHi, 1, p.mtnFrontMid, p.mtnFrontGreen, p.mtnFrontFall));

    // Front trees
    treesFront.forEach(t => drawTree(t, time * 0.6, groundY));

    // Ground
    ctx.fillStyle = p.ground1; ctx.fillRect(0, groundY, W, 2);
    ctx.fillStyle = p.ground2; ctx.fillRect(0, groundY + 2, W, 3);
    ctx.fillStyle = p.ground3; ctx.fillRect(0, groundY + 5, W, 2);
    ctx.fillStyle = p.groundPath; ctx.fillRect(0, groundY + 1, W, 1);

    // Bushes
    bushes.forEach(b => drawBush(b, time * 0.6, groundY));

    // Fallen leaves — crimson carpet on the trail
    const leafColors = [p.leaf1, p.leaf2, p.leaf3, p.leaf4, p.leaf5, p.leaf6];
    flowers.forEach(fl => {
      const fx = ((fl.x - time * 0.6) % (W * 2) + W * 2) % (W * 2) - W * 0.2;
      if (fx < 0 || fx > W) return;
      ctx.fillStyle = leafColors[fl.type % 6];
      ctx.fillRect(Math.floor(fx), groundY - 1 + (fl.y || 0), 1, 1);
    });

    // Drifting airborne leaf confetti — the whispering woods
    for (let li = 0; li < 50; li++) {
      const drift = Math.sin(time * 0.04 + li * 1.7) * 12;
      const lx = ((li * 23.7 + time * (0.2 + li * 0.01) + drift) % (W + 20)) - 10;
      const fall = (li * 7.3 + time * (0.1 + (li % 5) * 0.03)) % (groundY - 4);
      const ly = 3 + fall;
      const sway = Math.sin(time * 0.08 + li * 2.1) * 2;
      ctx.fillStyle = leafColors[li % 6];
      ctx.globalAlpha = 0.45 + Math.sin(time * 0.05 + li * 0.9) * 0.2;
      ctx.fillRect(Math.floor(lx + sway), Math.floor(ly), 1, 1);
    }
    ctx.globalAlpha = 1;

    // Obstacles + distance tracking
    const charCenterX = Math.floor(W / 2);
    let nearestObsDist = 999;
    const obsSpeed = time * 0.6;
    obstacles.forEach(ob => {
      const ox = ((ob.x - obsSpeed) % (W * 2) + W * 2) % (W * 2) - W * 0.2;
      if (ox < -6 || ox > W + 6) return;
      const fx = Math.floor(ox);
      if (ob.type === 'log') {
        ctx.fillStyle = p.obstacle;
        ctx.fillRect(fx, groundY - 2, 6, 2); ctx.fillRect(fx + 1, groundY - 3, 4, 1);
        ctx.fillStyle = p.obstacleMoss; ctx.fillRect(fx + 1, groundY - 3, 2, 1);
      } else {
        ctx.fillStyle = p.obstacle;
        ctx.fillRect(fx + 1, groundY - 3, 4, 3); ctx.fillRect(fx, groundY - 2, 6, 2);
        ctx.fillStyle = p.obstacleMoss; ctx.fillRect(fx + 1, groundY - 3, 2, 1);
      }
      const dist = ox - charCenterX;
      if (Math.abs(dist) < Math.abs(nearestObsDist)) nearestObsDist = dist;
    });

    // Jump logic — 29px spacing, range 10 for clean cascade
    // Elk jumps first, lands, then female, then male, then bear
    const frame = Math.floor(time * 0.15) % 4;
    function getJump(offX) {
      const d = nearestObsDist + offX, range = 10;
      return Math.abs(d) < range ? Math.sin((1 - Math.abs(d) / range) * Math.PI) * 6 : 0;
    }
    const bobE = Math.abs(Math.sin(time * 0.15)) * 1.0;
    const bobF = Math.abs(Math.sin(time * 0.15 + 0.7)) * 1.5;
    const bobM = Math.abs(Math.sin(time * 0.15 + 1.4)) * 1.5;
    const bobB = Math.abs(Math.sin(time * 0.15 + 2.1)) * 1.0;
    const jE = getJump(-43), jF = getJump(-14), jM = getJump(15), jB = getJump(44);

    // Ghosts and characters left to right (dark mode ghosts only)
    const ghostY = groundY - 12;
    if (isDark()) {
      drawGhost(charCenterX - 100, ghostY, time);
      drawGhost(charCenterX - 86, ghostY, time);
      drawGhost(charCenterX - 72, ghostY, time);
      drawGhost(charCenterX - 58, ghostY, time);
    }

    // Black bear
    const bearY = groundY - 8 - (jB > 0 ? jB : bobB);
    drawBear(charCenterX - 44, bearY, frame);

    // Male hiker — koikoi
    const maleY = groundY - 11 - (jM > 0 ? jM : bobM);
    drawMaleChar(charCenterX - 15, maleY, frame);

    // Female hiker — trucnnth
    const femaleY = groundY - 11 - (jF > 0 ? jF : bobF);
    drawFemaleChar(charCenterX + 14, femaleY, (frame + 2) % 4);

    // Elk (leading the group)
    const elkY = groundY - 10 - (jE > 0 ? jE : bobE);
    drawElk(charCenterX + 43, elkY, frame);

    if (isDark()) {
      drawGhost(charCenterX + 72, ghostY, time);
      drawGhost(charCenterX + 86, ghostY, time);
      drawGhost(charCenterX + 100, ghostY, time);
      drawGhost(charCenterX + 114, ghostY, time);
    }

    // HUD overlay
    drawHUD();

    requestAnimationFrame(draw);
  }
  draw();
})();
