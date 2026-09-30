# Task Tracker API

Task Trackeri backend (Node.js + Express).

## Käivitamine

Vaja on Node.js 20 või uuemat.

```bash
npm install
npm start
```

Server töötab aadressil http://localhost:3000. Kontrolliks ava http://localhost:3000/api/health.

## API

| Meetod | Aadress                     | Body                                    |
| ------ | --------------------------- | --------------------------------------- |
| GET    | `/api/tasks`                |                                         |
| GET    | `/api/tasks?completed=true` |                                         |
| GET    | `/api/tasks/:id`            |                                         |
| POST   | `/api/tasks`                | `{ "title": "Learn Express" }`          |
| PATCH  | `/api/tasks/:id`            | `{ "title": "...", "completed": true }` |
| DELETE | `/api/tasks/:id`            |                                         |

Vead tulevad kujul `{ "error": "..." }`. Näidispäringud on failis `requests.http`.

Taskid salvestatakse faili `data/tasks.json`.

## Käsud

- `npm start` – käivitab serveri
- `npm run dev` – käivitab serveri ja taaskäivitab muudatuste korral
- `npm test` – testid
- `npm run format` – Prettier
