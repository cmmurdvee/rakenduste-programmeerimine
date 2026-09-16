// Ümardamine
console.log(Math.round(4.5)); // 5 – lähima täisarvuni
console.log(Math.round(4.4)); // 4
console.log(Math.floor(4.9)); // 4 – alati alla
console.log(Math.ceil(4.1));  // 5 – alati üles

// Väikseim ja suurim
console.log(Math.min(3, 8, 1, 6)); // 1
console.log(Math.max(3, 8, 1, 6)); // 8

// Math.random() annab arvu vahemikus [0, 1)
console.log(Math.random()); // nt 0.7291...

// Näide: juhuslik täisarv 1 kuni 6
const taring = Math.floor(Math.random() * 6) + 1;
console.log("Täring näitab:", taring);
