# Server

Put server-only modules here once logic grows beyond thin route handlers.

Use this folder for:
- integration clients that must never ship to the browser
- server-side adapters around email, storage, auth, or webhooks
- shared backend helpers reused by multiple route handlers

Do not put React components here.
Do not import this folder from client components.
