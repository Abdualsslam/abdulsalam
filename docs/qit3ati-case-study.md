# Qit3ati case study

Added 2026-10-25 from `C:/Users/Abdua/Desktop/projects/qit3ati` at `#projects/qit3ati`. Uses the existing paper identity, detail transition and shared video player. Existing project order and artwork are preserved. Home and filter project counts now derive from project data.

## Evidence

Reviewed the Flutter pubspec and feature-based presentation/domain/data code: Bloc/Cubit, Dio, GetIt, Hive, SharedPreferences and Secure Storage. Verified brand/device browsing, grouped compatibilities, search filters, favorites, recent devices, Arabic/English and light/dark preferences. Only brands and part types have the reviewed Hive offline fallback; full offline compatibility browsing is not claimed. Historical documentation counts and completion percentages are not published as current verified statistics.

The 758 × 752 app icon was copied unchanged from `mobile/assets/images/app_icon.png`. The Android release built and was installed with `adb install -r` on Pixel_9_Pro / emulator-5554. The user signed in manually. No authentication bypass, synthetic screens, subscription changes or fabricated catalog data were used.

## Direct uploads and logos

Implemented direct file upload in the separate backend/admin repositories, commits `df81da0` and `d36a346`. Fifteen isolated PostgreSQL-backed API tests pass; builds and type checks pass. Browser verification covered selection, preview, upload, persistence after reload, invalid-file feedback and removal. Production compose mounts persistent upload storage.

After the user deployed, uploaded 28 logos through the actual file chooser at https://qit3ati.cloud/brands. All 29 current image entries (28 new logos plus the unchanged existing test brand image) loaded successfully. Names, order, activation and commercial/compatibility data were preserved. Fly remains without an uploaded logo because its source downloads failed; the existing fallback is retained.

The user subsequently requested removal of Brand Test. The admin exposes activation rather than permanent deletion, so that zero-device/zero-part brand was deactivated. Native home now lists 29 active brands and no test-brand card. The browse video and poster were recaptured to reflect its removal; the inactive admin record remains recoverable.

Sources: `docs/qit3ati-brand-logos.json`. Local backup of prepared PNGs, provenance and uploaded public URLs: `C:/Users/Abdua/Desktop/projects/qit3ati/data/brand-logos/`. Existing artwork was proportionally rasterized/format-converted onto white 192px canvases, not generated or redrawn. Native home inspection confirms the images appear in the app.

## Actual recordings

- `browse.mp4`: 8.60s — scroll the home brand grid after removing Brand Test. Its poster uses the corresponding raw recording's opening home frame.
- `compatibility.mp4`: 12.53s — iPhone 8 charging-port compatibilities, saving the device and returning to Favorites. The final actual app frame is held for 1.6s for readability.
- `preferences.mp4`: 14.80s — dark appearance, English language, then light appearance.

All MP4s fully decoded successfully: H.264/yuv420p, 720 × 1606, 30 fps, 1× playback. Animations are not accelerated. Static waiting is trimmed where needed; there are no cuts within the tours. Posters are corresponding actual video frames. Metadata/hashes: `docs/qit3ati-recordings.json`.

The app was restored to Arabic/light appearance and the temporary recording favorite removed. Recent-device history reflects the review.

## Existing data issue

The iPhone 8 compatibility list includes Apple iPhone 8 Plus, but opening that linked detail returned HTTP 404. This data issue was not changed or represented as working; the recording demonstrates the verified compatibility list and Favorites flow instead.

## Website verification

Production build passes. Applications filter includes four apps; the card opens its detail route and returning works. Desktop and 390px phone layouts checked for image loading and horizontal overflow. Video playback, playlist switching and the single mounted player are checked in the browser. Styling detection reported no findings on changed UI targets.
