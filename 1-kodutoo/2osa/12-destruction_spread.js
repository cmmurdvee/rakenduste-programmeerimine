//ei joudnud ise teha - AI
// Objekti destructuring
const kasutaja = { nimi: "Mari", vanus: 25, linn: "Tallinn" };
const { nimi, vanus } = kasutaja;
console.log(nimi, vanus); // Mari 25

// Massiivi destructuring
const varvid = ["punane", "roheline", "sinine"];
const [esimene, teine] = varvid;
console.log(esimene, teine); // punane roheline

// Massiivi kopeerimine spread-iga
const koopia = [...varvid];
console.log(koopia); // ["punane", "roheline", "sinine"]

// Uus massiiv lisaelemendiga (algne jääb muutmata)
const rohkemVarve = [...varvid, "kollane"];
console.log(rohkemVarve); // 4 värvi
console.log(varvid);      // endiselt 3 värvi

// Uus objekt muudetud omadusega
const uuendatud = { ...kasutaja, vanus: 26 };
console.log(uuendatud); // { nimi: "Mari", vanus: 26, linn: "Tallinn" }
console.log(kasutaja);  // vanus on endiselt 25

// Miks const objekti saab ikkagi muuta?
// const keelab muutujale UUE väärtuse omistamise, aga objekti sisu võib muutuda
const auto = { mark: "Toyota" };
auto.mark = "Honda";     // lubatud
console.log(auto);       // { mark: "Honda" }
// auto = {};            // TypeError – uut objekti omistada ei saa

// Spread teeb pinnapealse (shallow) koopia
const originaal = { nimi: "Jüri", aadress: { linn: "Tartu" } };
const pinnakoopia = { ...originaal };
pinnakoopia.nimi = "Kati";            // ei mõjuta originaali
pinnakoopia.aadress.linn = "Pärnu";   // MÕJUTAB originaali!
console.log(originaal.nimi);          // "Jüri"
console.log(originaal.aadress.linn);  // "Pärnu" – pesastatud objekt on jagatud
