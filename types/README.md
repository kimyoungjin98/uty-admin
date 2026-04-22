# Types

Use this folder for shared TypeScript types that are not owned by one feature module.

Prefer local types first:
- content-specific types stay in `content/`
- config-specific types stay in `config/`
- validation contracts stay next to the schema in `lib/`

Add files here only when the type is reused across multiple layers.
