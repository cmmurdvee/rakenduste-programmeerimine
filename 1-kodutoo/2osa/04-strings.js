// Kolm viisi stringi loomiseks
const yksik = 'ühekordsed jutumärgid';
const topelt = "kahekordsed jutumärgid";
const tagurpidi = `backticks`;
console.log(yksik, "ja", topelt, "ja", tagurpidi);

// Stringi meetodid
const sisend = "            MaRi TaMM   ";
console.log(sisend.length);            // 24
console.log(sisend.trim());            // tuhikud eemaldatud
console.log(sisend.toLowerCase());     // suured t2hed koavad
console.log(sisend.includes("TaMM"));  // true

// Väärtuste lisamine stringi ${ } abil
const vanus = 25;
console.log(`Vanus on ${vanus}, järgmisel aastal ${vanus + 1}.`);

// Näide: nime puhastamine ja tervituse loomine
const puhasNimi = sisend.trim().toLowerCase(); // "mari tamm"
const tervitus = `Tere, ${puhasNimi}! Nimes on ${puhasNimi.length} tähemärki.`;
console.log(tervitus); // Tere, mari tamm! Nimes on 9 tähemärki.
