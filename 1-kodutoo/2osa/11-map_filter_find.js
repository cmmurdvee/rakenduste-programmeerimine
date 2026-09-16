//ei joudnud ise teha - AI
const tooted = [
  { nimi: "Sülearvuti", hind: 900 },
  { nimi: "Hiir", hind: 25 },
  { nimi: "Klaviatuur", hind: 60 },
  { nimi: "Monitor", hind: 250 },
];

// .map() – teisendab iga elemendi, tagastab UUE sama pikkusega massiivi
const nimed = tooted.map(toode => toode.nimi);
console.log(nimed); // ["Sülearvuti", "Hiir", "Klaviatuur", "Monitor"]

const soodushinnad = tooted.map(toode => ({
  ...toode,
  hind: toode.hind * 0.9,
}));
console.log(soodushinnad);

// .filter() – valib sobivad elemendid, tagastab UUE massiivi
const odavad = tooted.filter(toode => toode.hind < 100);
console.log(odavad); // Hiir ja Klaviatuur

const vagaKallid = tooted.filter(toode => toode.hind > 5000);
console.log(vagaKallid); // [] – kui midagi ei leita, tühi massiiv

// .find() – tagastab ESIMESE sobiva elemendi (mitte massiivi)
const hiir = tooted.find(toode => toode.nimi === "Hiir");
console.log(hiir); // { nimi: "Hiir", hind: 25 }

const telefon = tooted.find(toode => toode.nimi === "Telefon");
console.log(telefon); // undefined – kui midagi ei leita

// Algne massiiv jääb muutmata
console.log(tooted.length); // 4
