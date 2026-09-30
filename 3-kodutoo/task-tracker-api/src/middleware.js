import { HttpError } from './errors.js';

export function requestLogger(req, res, next) {
  const start = Date.now();
  res.on('finish', () => {
    const ms = Date.now() - start;
    console.log(`${req.method} ${req.originalUrl} ${res.statusCode} ${ms}ms`);
  });
  next();
}

export function notFound(req, res, next) {
  next(new HttpError(404, 'Route not found'));
}

// 4 parameetrit = veakäsitleja
export function errorHandler(err, req, res, next) {
  if (err instanceof HttpError) {
    return res.status(err.status).json({ error: err.message });
  }

  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Request body must be valid JSON' });
  }

  // detailid ainult logisse, kliendile mitte
  console.error(err);
  res.status(500).json({ error: 'Something went wrong' });
}
