// function updateLinearChart(a, t, g, c) {
//   document.getElementById("bar-a").style.width = a + "%";
//   document.getElementById("bar-t").style.width = t + "%";
//   document.getElementById("bar-g").style.width = g + "%";
//   document.getElementById("bar-c").style.width = c + "%";
//   document.querySelector(".a-label").innerText = `A: ${a}%`;
//   document.querySelector(".t-label").innerText = `T: ${t}%`;
//   document.querySelector(".c-label").innerText = `C: ${c}%`;
//   document.querySelector(".g-label").innerText = `G: ${g}%`;
// }
// updateLinearChart(35, 25, 20, 20);

// const activetab = document.querySelector(".comparison__ctbwitemslc");
// console.log(activetab);

// activetab.scrollIntoView({
//   behavior: 'smooth', // Yumshoq surilish
//   block: 'nearest',   // Eng yaqin joyga
//   inline: 'center'
// })



// document.addEventListener("DOMContentLoaded", () => {
//   const canvas = document.getElementById("heatmapCanvas");
//   if (!canvas) return;
//   const ctx = canvas.getContext("2d");

//   // 1. SIMULYATSIYA: 3 million harfli ketma-ketlik (Ushbu sonni o'zgartirib test qilishing mumkin!)
//   const TOTAL_LETTERS = 3000000; 

//   // Sun'iy ravishda bir nechta mutatsiya nuqtalarini (klusterlarni) yaratamiz
//   // pos: mutatsiya xromosomaning nechanchi harfida joylashganligi
//   const mockMutations = [
//     { pos: 120000 }, { pos: 121500 }, { pos: 123000 }, { pos: 125000 }, // 1-Kluster
//     { pos: 850000 }, { pos: 852000 }, { pos: 855000 },                  // 2-Kluster
//     { pos: 1500000 }, { pos: 1501000 }, { pos: 1505000 }, { pos: 1510000 }, { pos: 1515000 }, // Kuchli kluster
//     { pos: 2200000 }, { pos: 2205000 }                                   // 4-Kluster
//   ];

//   // 2. CHIZISH ALGORITMI
//   function drawHeatmap(totalLetters, mutations) {
//     const width = canvas.width;   // 1200px
//     const height = canvas.height; // 16px

//     ctx.clearRect(0, 0, width, height);

//     // Har bitta pikselga qancha harf to'g'ri kelishini hisoblaymiz (Dinamik masshtab)
//     const step = totalLetters / width; 

//     // Ekran kengligi bo'yicha (1200 marta) bitta sikl aylanamiz
//     for (let x = 0; x < width; x++) {
//       const startPos = x * step;
//       const endPos = (x + 1) * step;

//       // Hozirgi piksel hududiga to'g'ri kelgan mutatsiyalar sonini sanaymiz
//       const count = mutations.filter(m => m.pos >= startPos && m.pos < endPos).length;

//       // Zichlikka qarab rang tanlash (Target dizayn ranglari)
//       if (count === 0) {
//         ctx.fillStyle = "#15161c"; // Mutatsiya yo'q (tinch zona)
//       } else if (count === 1) {
//         ctx.fillStyle = "#543126"; // Kam mutatsiya (Zang rang)
//       } else if (count <= 3) {
//         ctx.fillStyle = "#8c3b2b"; // O'rtacha (To'q qizil)
//       } else {
//         ctx.fillStyle = "#ff331f"; // Kritik (Yorqin olov rang)
//       }

//       // Eni 1 piksel, bo'yi 16 piksel bo'lgan chiziqchani chizamiz
//       ctx.fillRect(x, 0, count > 0 ? 4 : 1, height);
//     }
//   }

//   // Funksiyani ishga tushiramiz
//   drawHeatmap(TOTAL_LETTERS, mockMutations);
// });




document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("heatmapCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  const width = canvas.width;   // 1200px
  const height = canvas.height; // 16px

  ctx.clearRect(0, 0, width, height);

  // O'NG TOMONDA RESMDAGIDEK SILLIQ O'TISH (GRADIENT) EFFEKTINI BERISH:
  // Har bir piksel rangi yonginasidagi piksel rangiga bog'liq bo'lishi kerak.
  // Buning uchun "Random Walk" (Tasodifiy silliq qadam) algoritmidan foydalanamiz.
  
  let currentDensity = 0.2; // Boshlang'ich zichlik darajasi (0 dan 1 gacha)

  for (let x = 0; x < width; x++) {
    // Zichlikni keskin emas, har bir pikselda oz-ozdan o'zgartiramiz (-0.08 dan +0.08 gacha)
    // Bu mantiq ranglarning blok bo'lib ajralishini yo'qotadi va bir-biriga ulaydi
    currentDensity += (Math.random() - 0.5) * 0.16;

    // Chegaradan chiqib ketmasligini ta'minlaymiz
    if (currentDensity < 0) currentDensity = 0.05;
    if (currentDensity > 1) currentDensity = 0.95;

    // Ba'zi joylarda (xromosomaning o'rtasida va oxirida) kuchli "hotspot" (olov) simulyatsiyasi
    if ((x > 200 && x < 350) || (x > 750 && x < 900)) {
      currentDensity += 0.08; // Bu hududlarda qizil rang ko'proq bo'ladi
    }

    // ZICHLIKKA QARAB REALISTIK PALITRA (O'ng tomondagi rasm ranglari):
    if (currentDensity < 0.25) {
      // Deyarli mutatsiya yo'q - juda to'q ko'k/kulrang fon
      ctx.fillStyle = "#16171d"; 
    } else if (currentDensity < 0.5) {
      // Kam zichlik - o'ng rasmdagi organik zang/jigar rang tuslar
      ctx.fillStyle = "#4a2d22"; 
    } else if (currentDensity < 0.75) {
      // Yuqori zichlik - yumshoq to'q qizil
      ctx.fillStyle = "#8a3325"; 
    } else {
      // Maksimal zichlik - yorqin qizil nuqtalar (Kluster markazi)
      ctx.fillStyle = "#c82d1b"; 
    }

    // Eni 1px bo'lgan chiziqchani chizamiz
    ctx.fillRect(x, 0, 1, height);
  }
});



















document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("minimapCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  // Yuqori tiniqlik (Retina ekranlar uchun ham)
  const width = canvas.width;
  const height = canvas.height;
  ctx.clearRect(0, 0, width, height);

  // Yumaloq blok chizish
  function drawRoundRect(x, y, w, h, r) {
    if (w < 2 * r) r = w / 2;
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
    ctx.fill();
  }

  // 1. DYNAMIC SYNTENY BLOCKS (3 millionlik genom masshtabi)
  // v1 va v2 dagi real koordinatalar (ekran eni 1200px ga moslangan)
  const blocks = [
    { v1X: 10,  v1W: 200, v2X: 10,  v2W: 200, type: 'normal' },
    { v1X: 230, v1W: 300, v2X: 230, v2W: 300, type: 'normal' },
    { v1X: 550, v1W: 350, v2X: 550, v2W: 350, type: 'inversion' }, // <--- Buralish zonasi
    { v1X: 920, v1W: 260, v2X: 920, v2W: 260, type: 'normal' }
  ];

  // Bloklarni nafis kulrangda chizamiz
  ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
  blocks.forEach(b => {
    drawRoundRect(b.v1X, 6, b.v1W, 3, 1.5);  // Tepa zanjir
    drawRoundRect(b.v2X, 35, b.v2W, 3, 1.5); // Pastki zanjir
  });

  // 2. NAFIS BEZIER IPLARI (Faqat bloklar orasida chiziladi!)
  ctx.lineWidth = 0.5; // Chiziqlarni o'ta ingichka qildik!

  blocks.forEach(b => {
    // Har bir blok ichida 25 tadan nozik ip o'tkazamiz
    const linesCount = 25;
    
    for (let i = 0; i <= linesCount; i++) {
      const tPercent = i / linesCount;
      
      // Tepa va pastki nuqtalarni aniqlash
      const startX = b.v1X + (b.v1W * tPercent);
      // Agar inversiya bo'lsa, chiziq yo'nalishini teskari qilamiz (X hosil bo'ladi)
      const endX = b.type === 'inversion' 
        ? b.v2X + (b.v2W * (1 - tPercent)) 
        : b.v2X + (b.v2W * tPercent);

      ctx.beginPath();
      ctx.moveTo(startX, 9);

      // Silliq egri chiziq nazorat nuqtalari
      const cp1X = startX + (endX - startX) * 0.2;
      const cp1Y = 16;
      const cp2X = startX + (endX - startX) * 0.8;
      const cp2Y = 28;

      ctx.bezierCurveTo(cp1X, cp1Y, cp2X, cp2Y, endX, 34);

      // Chiziqlar o'ta xira va nafis bo'lishi uchun shaffoflikni minimal qildik (0.04)
      ctx.strokeStyle = `rgba(255, 255, 255, 0.04)`;
      ctx.stroke();
    }
  });
});