# Publishing

1. Run `npm run lint` and `npm run test` to confirm everything is working.
2. Update the version number in `package.json` and `src/env.ts`.
3. Run `npm run build`.
4. Add an entry to `CHANGELOG.md`.
5. Create a release commit.
6. Create a merge request to `main` with the same title and body.
7. Confirm that GitHub action tests pass.
8. Merge the request.
9. Create a GitHub release.
10. Change `private` to `false` in `package.json`.
11. Run `npm publish`.
12. Change `private` to `true` in `package.json`.
