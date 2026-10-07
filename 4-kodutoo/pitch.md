# Pitch: Kulutuste märkmik

1. **Kasutaja:** Tudeng, kes tahab oma raha paremini jälgida.
2. **Probleem:** Kuu lõpus pole aimu, kuhu raha kadus.
3. **Lahendus:** Kasutaja lisab kulutuse (nimetus, summa, kategooria), näeb kõiki kulutusi nimekirjas ja saab vanu kustutada.
4. **Andmed:** Üks tabel `expenses`: `title`, `amount`, `category`.
5. **Edu:** Demos lisan kulutuse, see jääb pärast lehe värskendamist alles, kustutan ühe ja kogusumma muutub.

**Lisa:** kõikide kulutuste kogusumma lehe ülaosas.

**Endpointid:** `GET`, `POST` ja `DELETE` aadressil `/api/expenses`.

## Rollid

- **Selle nädala roll (1.10):** backend
- **Eelistus järgmiseks nädalaks:** frontend
- **Teine valik:** andmebaas ja integratsioon
