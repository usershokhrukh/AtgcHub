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