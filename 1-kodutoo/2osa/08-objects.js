// Objekti loomine
const kasutaja = {
  nimi: "Mari",
  vanus: 25,
  aadress: {
    linn: "Tallinn",
  },
};

// Lugemine punkti- ja nurksulgude süntaksiga
console.log(kasutaja.nimi);       // "Mari"
console.log(kasutaja["vanus"]);   // 25
const voti = "nimi";
console.log(kasutaja[voti]);      // "Mari" – nurksulud lubavad muutujat

// Lisamine ja muutmine
kasutaja.email = "mari@example.com"; // uus omadus
kasutaja.vanus = 26;                 // muudetud omadus
console.log(kasutaja);

// Pesastatud objektid
console.log(kasutaja.aadress.linn); // "Tallinn"

// Puuduv omadus annab undefined
console.log(kasutaja.telefon);      // undefined
// console.log(kasutaja.too.firma); // TypeError: Cannot read properties of undefined

// Optional chaining ?. – ohutu lugemine
console.log(kasutaja.too?.firma);   // undefined (viga ei teki)

// Nullish coalescing ?? – vaikeväärtus
console.log(kasutaja.telefon ?? "Telefon puudub"); // "Telefon puudub"

// ?? vs || erinevus
const seaded = { punktid: 0, aktiivne: false, hyydnimi: "" };
console.log(seaded.punktid ?? 10);       // 0     – ?? asendab ainult null/undefined
console.log(seaded.punktid || 10);       // 10    – || asendab kõik falsy väärtused
console.log(seaded.aktiivne ?? true);    // false
console.log(seaded.aktiivne || true);    // true
console.log(seaded.hyydnimi ?? "Anonüümne"); // ""
console.log(seaded.hyydnimi || "Anonüümne"); // "Anonüümne"

// Näide: profiili kuvamine puuduvate andmetega
const profiil = { nimi: "Jüri" };
console.log(`Nimi: ${profiil.nimi ?? "Teadmata"}`);
console.log(`Linn: ${profiil.aadress?.linn ?? "Pole märgitud"}`);
console.log(`Vanus: ${profiil.vanus ?? "Pole märgitud"}`);
