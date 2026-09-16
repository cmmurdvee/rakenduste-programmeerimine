// Massiivi loomine ja elementide lugemine indeksi järgi
const nimed = ["Mari", "Jüri", "Kati"];
console.log(nimed[0]);            // "Mari"
console.log(nimed[2]);            // "Kati"
console.log(nimed.length);        // 3
console.log(nimed[nimed.length - 1]); // "Kati"
console.log(nimed[5]);            // undefined

// includes, push, pop
console.log(nimed.includes("Jüri")); // true
nimed.push("Peeter");                // lisab lõppu
console.log(nimed);                  // ["Mari", "Jüri", "Kati", "Peeter"]
const eemaldatud = nimed.pop();      // eemaldab viimase
console.log(eemaldatud);             // "Peeter"
console.log(nimed);                  // ["Mari", "Jüri", "Kati"]

// for-tsükkel: loendur; tingimus; uuendus
for (let i = 0; i < nimed.length; i++) {
  console.log(`${i}: ${nimed[i]}`);
}

// for of – lihtsam, kui indeksit pole vaja
for (const nimi of nimed) {
  console.log("Tere,", nimi);
}

// break – lõpetab tsükli varem
for (const nimi of nimed) {
  if (nimi === "Jüri") {
    console.log("Leidsin Jüri, lõpetan otsimise.");
    break;
  }
}
