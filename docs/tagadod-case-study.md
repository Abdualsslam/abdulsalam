# Tagadod project detail page

Reviewed and captured on 2026-10-23 from the local `tagadod/tagadod-mobile` project.

## Content sources

- `README.md`, `CLAUDE.md`, `pubspec.yaml`: Flutter, Bloc/Cubit, GetIt and the feature architecture.
- `docs/architecture/caching.md` and `lib/features/cart/README.md`: Hive caches, guest/user cart separation, local-first operations and checkout synchronization.
- `docs/features/maintenance-entry.md` and `lib/features/maintenance_order_for_customers/README.md`: separate customer/engineer maintenance paths, requests and offers.
- `lib/features/home/`, `lib/features/catalog/`, `lib/features/lighting_calculator/`, `lib/features/installation_guides/`: the screens used in the gallery.
- `lib/core/routing/app_router.dart` and `app_routes.dart`: navigation and guest restrictions.

The electrical lab exists in the repository but its home entry is commented out. It is not presented as an exposed feature in this case study.

## Screenshot provenance

The official transparent logo is copied unchanged from the Flutter app's `assets/icons/brands/app_logo.png` to `public/projects/tagadod/logo.png`. It is used on the project card and as the accessible project heading wordmark. The project's Arabic name is تجدُّد.

The current source was built and installed on Android emulator `emulator-5554`. The user signed in on the emulator. Images are actual screenshots, converted to WebP at 960 × 2142 for the website; no screen content was generated or retouched.

| Website file | Screen |
| --- | --- |
| `public/projects/tagadod/home.webp` | Home recaptured after its banner and product images finished loading |
| `public/projects/tagadod/catalog.webp` | All products |
| `public/projects/tagadod/product.webp` | Liper product details |
| `public/projects/tagadod/lighting.webp` | Lighting calculator with a sample 5 × 4 m room |
| `public/projects/tagadod/categories.webp` | Product categories |
| `public/projects/tagadod/guides.webp` | CNC installation guide details |

Capture originals are in the ignored `artifacts/tagadod-captures/` folder. The Flutter source and its existing working-tree edits were preserved.

## Recorded experience (2026-10-24)

The screenshot gallery was replaced with four real, silent screen recordings from the same running app:

| Website file | Duration | Interaction |
| --- | --- | --- |
| `browse.mp4` | 10 seconds | Home, new products, categories and catalog |
| `product-tour.mp4` | 11 seconds | Product information, expanded description and scrolling |
| `lighting-tour.mp4` | 15 seconds | Room type, 5 × 4 m dimensions, decorative ceiling, results and ceiling plan |
| `profile-tour.mp4` | 15 seconds | Account settings, Arabic/English direction changes, theme split preview and light/dark gestures, favorites and addresses |

All four current videos were re-recorded on the emulator with more prompt taps and swipes and shorter pauses between actions. Playback and application animations retain their natural speed (1×); no speed multiplier or time compression is applied. Every published clip is at most 15 seconds. The calculator and profile recordings use selected native-speed segments with idle/loading gaps removed; the other clips only trim the recording lead-in. The exact segment ranges are kept in the ignored captures folder as `15s-edit-plan.json`. The current raw sources are the `*-compact-raw.mp4` files in the ignored captures folder. Videos are H.264/MP4, 720 × 1606, 30 fps, with fast-start metadata, about 4.5 MiB combined. Posters are frames from the corresponding recordings. Original captures remain ignored under `artifacts/tagadod-captures/`. The fourth recording includes account settings and the saved-address list. The user explicitly requested the recorded data remain visible. No orders, cart changes, messages, address edits or security-setting changes were made. Language and theme finish in their original Arabic/light state.

## Portfolio behavior

- Each project card is a normal link to `#projects/<id>`, supporting direct links and browser history.
- Details occupy the full page below the site header and enter with a short, non-spring transition.
- The folder view stays mounted and inert underneath. Returning restores its filter, scroll position and card focus.
- The experience player has four selectable chapters. Playback starts only on user action; native controls provide pause, seeking, replay and fullscreen.
- Selecting another chapter pauses the previous video. Leaving the project or hiding the tab pauses playback. Clips do not loop or advance automatically.
- Only the selected video is mounted, with metadata preloading. Reduced-motion settings disable the page movement.
