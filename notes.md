
## What I chose and why

I used **Node.js + Express + PostgreSQL + Prisma**.

I chose PostgreSQL because the main requirement is around fast ordered pagination with filtering, and PostgreSQL is a good fit for that kind of indexed query workload.

The key design choice was to use **cursor-based pagination instead of offset pagination**. Since the assignment explicitly says products may be inserted or updated while a user is browsing, offset pagination can produce duplicates or skipped products because row positions shift between requests.

To make browsing consistent while data changes, I used:
- a stable ordering: `updated_at DESC, id DESC`
- a cursor made from `(updated_at, id)`
- a snapshot timestamp returned on the first page request and reused for subsequent pages

The snapshot means a browsing session sees a stable view of the feed even if products are inserted or updated after the session starts.

I also added indexes for:
- browsing all products newest-first
- browsing within a category newest-first

## What I would improve with more time

If I had more time, I would:
- add more integration tests for pagination edge cases
- benchmark the query using `EXPLAIN ANALYZE`
- add support for additional filters like price range
- add API documentation / Swagger
- add a simple UI for browsing the feed

## How I used AI

I used AI as a coding and review assistant for:
- scaffolding some backend boilerplate
- discussing pagination strategies and edge cases
- reviewing the cursor + snapshot design
- drafting parts of the seed script and README

I still validated the core design decisions myself, especially around:
- why offset pagination is incorrect for this problem
- how the cursor query should work with `(updated_at, id)`
- why a snapshot is needed to keep browsing consistent while updates happen