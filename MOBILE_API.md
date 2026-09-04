# Mobile API foundation

The application is intentionally still at a basic UI stage. PRD-7 establishes
the API boundary only; feature screens will be developed after the backend is
complete.

## Commands

- `npm run api:sync` copies the versioned backend contract and regenerates the client.
- `npm run api:generate` regenerates `src/generated/api` with the pinned Docker image.
- `npm run typecheck` compiles the app and generated client.
- `npm run test:contract` runs register, login, refresh, camp-list, retry and Problem Details smoke tests.

CI also rejects critical and high production dependency advisories. Remaining
moderate Expo toolchain advisories are tracked until an SDK-compatible upstream
fix is available; `npm audit fix --force` must not be used because it proposes an
incompatible Expo downgrade.

Set `EXPO_PUBLIC_API_URL` to the server origin without `/api`; generated paths
already contain `/api/v1`. This is public configuration, never a secret.

Tokens are stored with Expo SecureStore. The adapter in
`src/api/campiqoClient.ts` performs single-flight refresh, retries a failed
authorized request at most once, clears invalid sessions and exposes UUID-based
idempotency keys. Generated files are never edited manually.
