// Miks mõned toimingud lõpevad hiljem?
// Nt andmete laadimine serverist võtab aega – programm ei oota niisama.
console.log("1. Algus");
setTimeout(() => console.log("3. Taimer lõppes (hiljem)"), 0);
console.log("2. Lõpp");

// Promise tähistab väärtust, mis saabub tulevikus
// Olekud: pending (ootel) -> fulfilled (õnnestus) või rejected (ebaõnnestus)
function laeKasutaja() {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ nimi: "Mari", vanus: 25 }), 1000);
  });
}

function ebaonnestuv() {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error("Laadimine ebaõnnestus")), 500);
  });
}

const lubadus = laeKasutaja();
console.log(lubadus); // Promise { <pending> }

// async ja await
async function main() {
  const kasutaja = await laeKasutaja(); // ootab, kuni promise täitub
  console.log("Laetud:", kasutaja.nimi); // Laetud: Mari
  console.log(lubadus);                  // Promise { { nimi: 'Mari', vanus: 25 } } – fulfilled

  try {
    await ebaonnestuv();
  } catch (viga) {
    console.log("Rejected:", viga.message); // Rejected: Laadimine ebaõnnestus
  }
}

main();

// async funktsioon tagastab ALATI promise'i
async function annaArv() {
  return 42;
}
console.log(annaArv()); // Promise { 42 } – mitte lihtsalt 42
annaArv().then(arv => console.log("Arv:", arv)); // Arv: 42

//ty AI vigade eest
// Levinud viga: await unustamine
// const k = laeKasutaja();
// console.log(k.nimi); // undefined – k on promise, mitte objekt
