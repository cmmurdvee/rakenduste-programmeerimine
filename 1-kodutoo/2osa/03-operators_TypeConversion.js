// Aritmeetilised operaatorid
console.log(10 + 3);  // 13 
console.log(10 - 3);  // 7
console.log(10 * 3);  // 30
console.log(10 / 3);  // 3.333...
console.log(10 % 3);  // 1 (jääk)
console.log(2 ** 3);  // 8

// Väärtuse uuendamine
let midagi = 10;
midagi += 5;           // midagi = midagi + 5
console.log(midagi);   // 15
midagi++;              // +1
console.log(midagi);   // 16

// Tüübiteisendus
console.log(Number("42"));    // 42 string muutub number
console.log(String(42));      // "42" number muutub string

// "5" + 2 vs Number("5") + 2
console.log("5" + 2);          // "52" stringid lahevad kokku
console.log(Number("5") + 2);  // 7 tavaline matemaatika

// NaN on "Not a Number", tulemus, mis pole kehtiv arv
const tulemus = Number("midagi");
console.log(tulemus);               // NaN
console.log(typeof tulemus);        // "number" (NaN on number-tüüpi)
console.log(Number.isNaN(tulemus)); // true
