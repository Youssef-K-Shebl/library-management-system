#!/bin/sh
set -e

echo "Running migrations..."
npx typeorm migration:run -d dist/database/data-source.js

echo "Running seeders..."
node dist/database/seeds/seed.js

echo "Starting application..."
exec node dist/main
