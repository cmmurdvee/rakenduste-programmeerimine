//seda tegi AI
// Vajab internetiühendust.

// JSON vs JavaScripti objekt
// JSON on TEKST, JavaScripti objekt on andmestruktuur
const objekt = { nimi: "Mari", vanus: 25 };
const json = JSON.stringify(objekt);
console.log(json);          // '{"nimi":"Mari","vanus":25}'
console.log(typeof json);   // "string"
const tagasi = JSON.parse(json);
console.log(typeof tagasi); // "object"

// Andmete pärimine fetch() abil
async function laeKasutaja(id) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);

    // fetch EI viska viga HTTP vigade korral (404, 500),
    // seega tuleb response.ok ise kontrollida
    if (!response.ok) {
      throw new Error(`HTTP viga: ${response.status}`);
    }

    const andmed = await response.json(); // JSON -> JavaScripti objekt
    console.log(`Kasutaja ${id}: ${andmed.name}, ${andmed.email}`);
  } catch (viga) {
    // Siia jõuavad nii võrguvead kui ka meie visatud HTTP viga
    console.log(`Viga kasutaja ${id} laadimisel:`, viga.message);
  }
}

await laeKasutaja(1);    // õnnestub
await laeKasutaja(9999); // 404 -> "HTTP viga: 404"
