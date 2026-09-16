// Deklareerimine ja väljakutsumine
function tervita() {
  console.log("Tere!");
}
tervita(); // "Tere!"

// Parameeter vs argument
// nimi on PARAMEETER (muutuja funktsiooni definitsioonis)
function tervitaNimega(nimi) {
  console.log(`Tere, ${nimi}!`);
}
tervitaNimega("Mari"); // "Mari" on ARGUMENT (tegelik väärtus väljakutsel)

// Vaikeväärtusega parameeter
function tervitaViisakalt(nimi = "külaline") {
  console.log(`Tere tulemast, ${nimi}!`);
}
tervitaViisakalt();        // Tere tulemast, külaline!
tervitaViisakalt("Jüri");  // Tere tulemast, Jüri!

// Väärtuse tagastamine return abil
function liida(a, b) {
  return a + b;
}
const summa = liida(2, 3);
console.log(summa);        // 5
console.log(liida(summa, 10)); // 15 – tagastatud väärtust saab edasi kasutada

// return vs console.log
function prindiSumma(a, b) {
  console.log(a + b);     // ainult kuvab, ei tagasta
}
const tulemus = prindiSumma(2, 3); // kuvab 5
console.log(tulemus);             // undefined – väärtust ei tagastatud

// Funktsioon ilma return-ita tagastab undefined
function eiTagastaMidagi() {}
console.log(eiTagastaMidagi()); // undefined
