# ShootLive case study

Added 2026-10-25 from `C:/Users/Abdua/Desktop/ebdaa/shoot-live-app`, source commit `5636f8e`. Portfolio route: `#projects/shoot-live`. Added after the existing seven projects so their ordering remains stable; project totals and filters already derive from the shared list.

## Source review

Reviewed the Flutter pubspec, feature-based presentation/application/domain/data code, repositories, routing and runtime services. GetX controllers and bindings manage presentation and navigation. Dio/Retrofit, DTOs and repository contracts serve the data boundary. `AppCacheService` uses Hive CE with TTL policies; GetStorage and Secure Storage handle preferences/session storage. Firebase Messaging is wired into notification runtime and settings adapters. Full offline operation is not claimed.

Code includes matches, fixture details, leagues, teams, players, groups, predictions, rankings, news, reels, AI chat and rewards. Published clips verify only the read-only match/league/group browsing described below. AI response quality, live score accuracy, prediction submission and reward redemption were not exercised or represented as verified. No messages, analyses, votes, predictions, invitations or transactions were submitted.

The source calls the product ShootLive, while some historical package/configuration names use ShootNow, GoalZone or Scoreify. The portfolio uses ShootLive and the actual existing logo at `assets/shootnow_logo.png`, copied without alteration (342 × 325). No replacement brand artwork or synthetic app screens were created.

## Native build and capture

Built the current source using `flutter build apk --release` with the available Flutter 3.41.6 SDK. Release build succeeded (91.8 MB). Installed with `adb install -r` on Pixel_9_Pro / emulator-5554, package `com.shootnow.sports`, preserving the existing signed-in test account. No app-data clear, authentication bypass or source modification was needed. Initial network loads were allowed to finish before choosing the recording paths.

- `fixture.mp4`: 14.33s — match list → Crystal Palace/Newcastle details → events → lineup → scroll the player list.
- `leagues.mp4`: 10.77s — leagues → Premier League fixtures → standings → Arsenal team page.
- `community.mp4`: 11.10s — group list → «اساطير الكرة» match space → monthly leaderboard. Group feed has an existing empty analysis state; no new content was fabricated to fill it.

All clips are real Android screen recordings, H.264/yuv420p, 720 × 1606 at 30 fps and natural 1× playback, without audio. Native variable-rate footage is normalized to 30 fps before trimming so static frames retain their actual hold duration. Only loading/idle holds are removed; interactions remain in order and are not accelerated. Each final frame is held 0.6s for readability. Posters are frames from the published clips. Full decoding checks pass. Exact retained ranges, durations, sizes and SHA-256 hashes: `docs/shoot-live-recordings.json`.

Raw recordings and timing events remain locally under the ignored `artifacts/shoot-captures/` directory. Match dates, scores, ranking numbers, avatars and team imagery are supplied by the app/backend and were not edited or independently validated against a sports feed. Some existing team images use the app's fallback artwork.

## Portfolio integration

Uses the established paper identity, shared project detail transition, video playlist and responsive layouts. The shared architecture diagram accepts an optional presentation-layer label so ShootLive accurately shows GetX; existing case studies retain their Bloc/Cubit label. No visual system or existing app case content was replaced.

Validation: production build, actual card/detail navigation, video playback at 1× through completion, playlist switching, image loading, desktop and 390px layout/overflow checks. Native source tracked files are unchanged; building may produce local Android/Flutter caches.

An independent finish review returned `ship` for this integration, with no material fixes. The documenter checked the case against the inherited palette, typography, RTL layout, depth and shared components and left the visual system untouched. Missing PRODUCT.md/DESIGN.md and existing template eyebrows were reported as pre-existing context drift, outside this addition.
