# Publishing

1. Update the version number in `package.json` and `src/env.ts`.
2. Run `npm run lint` and `npm run test` to build and confirm everything is working.
3. Add an entry to `CHANGELOG.md`.
4. Create a release commit.
5. Create a merge request to `main` with the same title and body.
6. Confirm that GitHub action tests pass.
7. Merge the request.
8. Create a GitHub release.
9. Change `private` to `false` in `package.json`.
10. Run `npm publish`.
11. Change `private` to `true` in `package.json`.
