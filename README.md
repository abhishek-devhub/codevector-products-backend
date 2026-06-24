# Product Feed Backend — CodeVector Take-Home

A backend service for browsing ~200,000 products with:
- newest-first product feed
- category filtering
- cursor-based pagination
- stable browsing while data changes (new inserts / updates during pagination)

## Tech Stack
- Node.js
- Express
- PostgreSQL
- Prisma

## Why this approach?

The key requirement in the assignment is correctness while data changes during browsing.

If traditional offset pagination is used (`LIMIT ... OFFSET ...`), inserts or updates between page requests can shift row positions and cause:
- duplicate products across pages
- skipped products

To avoid that, this implementation uses **cursor-based pagination** with a stable ordering:

```sql
ORDER BY updated_at DESC, id DESC