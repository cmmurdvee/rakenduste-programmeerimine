Esimene video 


JavaScript on üheprotsessiline programmeerimiskeel = tal on üks callstack = ta saab teha ühte asja korraga. Sellest hoolimata saab brauseris teha mitut asja samaaegselt.

Call stack

Nimekiri, mis näitab, kus programm hetkel on. Stackist eemaldatakse alati ülevalt alla. Peal olev funktsioon peab enne lõpetama, kui selle all olev saab jätkata.

Blocking
Blocking on kood, mis on aeglane.  Kuni stackis on midagi, ei saa brauser midagi teha, ei saa renderida. Selle lahenduseks kasutakse async(asünkroonsed) callbackid. 

Saab teha mitut asja, kasutades WebAPIsi. 

Event loop
Selle töö on vaadata, kuidas stackil läheb ja mis task järjekorras on. Kui stack on tühi, võtab ta järjekorrast esimese callbacki ja paneb selle stacki.

Sain teada, mis asi call stack on ja kuidas event loop töötab

Teine video

Asünkroonsus on suhe "praegu" ja "hiljem" vahel. Later ei tähenda kohe peale now. See võib olla ükskõik millal tulevikus ja sa ei tea millal see täpselt tuleb. 

Event loop on lõputult jooksev ühetuumaline tsükkel. Kui tahad midagi hiljem käivitada, läheb see järjekorda. 

Run-to-completion tähendab et praegune ülesanne lõpetab alati enne, kui järgmine algab.

Callbacks
Neid on rakse lugeda. Meie aju mõtleb ülevalt alla, aga callbackid käivituvad teises järjekorras. SIlmad hüpavad edasi-tagasi. Kui callbackid on sügavalt üksteise sees, tekib callback hell.

Inversion of control on usaldusprobleem, kus annad oma callbacki teisele koodile ja pead lootma, et see töötab õigesti. 

Vigade käsitlemine on keeruline. Throw ja try/catch töötavad ainult sünkroonselt. Kui viga tekib millalgi hiljem, siis see viga läheb kaotsi. Callbacki puhul antakse viga tavaliselt return kaudu. 

Promises (ES6)
(Ma ei suutnud korralikult konspekteerida seda. Siin on AI lause selle kohta)

Promise on kohatäide tulevasele väärtusele. Kui see on lahendatud (settled), on see kas õnnestunud (resolved) või ebaõnnestunud (rejected), ja pärast seda on väärtus muutumatu.

Promise lahendab usaldusprobleemi. Callbackid ei kao kuhugi, aga sa ei anna neid enam võõrale koodile. Funktsioon tagastab promise'i jasina otsustad, mida tulemusega teha.

Microtask queue 
Selle abil saab öelda: "tee seda hiljem, aga kohe hiljem, enne kõike muud"
Kõik promise'i callbackid lähevad microtask queue'sse
Need käivitakse enne järgmist tavalist taski
Isegu juba lahendatud promise on alatu asünkroonne
Kui microtask lisab pidevalt uusi microtaske, võib juhtuda "lõputu tsükkel"

Vead promise'ides
Vaikimisi neelatakse vead vaikselt alla. Kui promise ebaõnnestus ja catch puudub midagi ei juhtu.
Lahendus selleks on lisada keti lõppu .catch().

Generators
Peamine erinuves seinseb selles, et tavaline funktsioon on run-to-completion. Generaatori saab keset tööd pausile panna ja hiljem jätkata. Vahepeal saab muu kood ka enda tööd teha.

function* tähistab generaatorit
yield saadab väärtuse välja ja paneb funktsiooni pausile
töö algab esimese .next() ktusega ja iga järgmine .next() jätkab

Generaatori sees näeb kood välja sünkroonne, kuigi väljaspool toimub kõik asünkroonselt. Tänu sellele töötab tavaline try/catch, isegi kui funktsioon on pikalt pausil. Callbackidega on see peaaegu võimatu. Generaatoril on ka .throw() meetod, millega saab vea pausikohta sisse visata.

Async/await
uusim viis, mis loodi promise kettide lihtsustamiseks

async funktsioon tagastab alati promise'l. return väärtus muutub promise tulemuseks
await töötab ainult async funktsiooni sees
vigade püüdmiseks piisab ühest try/catch-ist. Kood on lühem ja selgem.

Sain teada, et pean olema tänulik, et elan ajas, kus on olemas async ja await. Muidu sain teada, kuidas töötab promise ja generators ja nende nüanssid .

Kolmas video (JavaScript in 100 seconds by Fireship)

JavaScript on high-level, single-threaded, dünaamiline keel, millel on non-blocking event loop. See sai kuulsaks veebilehtede tegemisega.
Algne nimi oli Mocha, nimi muudeti kuna Java oli tol ajal populaarne.
Brauseris lisatakse kood lehele script sildiga.
var - vana viis
let - väärtust saab muuta
const - väärtust ei saa uuesti määrata
Natukene juttu ka event listeneri kohta ja asünkroonsuse kohta
Serveris käivitake node abil



