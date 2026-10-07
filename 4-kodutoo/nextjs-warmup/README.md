## Mida ma õppisin

1. **Mida Next.js annab lisaks Reactile?**
   Next.js annab failipõhise ruutimise app/ kaustad, serveri komponendid ja API endpointid ühes projektis. Lisaks teeb see buildi ja optimeerimise ise ära.

2. **Miks loendur vajab 'use client'?**
   Loendur kasutab useState-i ja nupuvajutust, mis töötavad ainult brauseris. 'use client' ütleb Next.js-ile, et see komponent tuleb saata brauserissee.

3. **Kus töötab app/api/message/route.js kood?**
   See kood töötab serveris Node.js, mitte kasutaja brauseris.

4. **Kuidas see endpoint sarnaneb Expressi route'iga?**
   Mõlemad vastavad kindlale URL-ile ja HTTP meetodile ning tagastavad JSON-i.

5. **Miks peavad saladused jääma serverisse?**
   Kõik, mis saadetakse brauserisse, on kasutajale nähtav. Kui API võtmed või paroolid satuvad brauserisse, saab neid igaüks kopeerida ja kuritarvitada.
