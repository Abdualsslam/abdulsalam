# TRAS Phone case study

Reviewed and captured on 2026-10-24; home refreshed on 2026-10-25 from C:/Users/Abdua/Desktop/projects/tras-phone.

## Sources and app changes

Reviewed the feature-based Flutter layers, Bloc/Cubit, GetIt, GoRouter, Dio, product/device relations and cart LocalStorage/SharedPreferences with remote synchronization. The official 600 x 600 logo was copied unchanged from mobile/assets/images/logo.png.

Categories now use three columns with matching loading placeholders. Shared CategoryArtwork loads remote images with ten bundled generated illustrations as missing/loading/error fallbacks; home category chips use the same artwork. Battery, camera and screen images were also saved in the dashboard.

The current source initially failed to compile because checkout referenced removed bank account properties, returns missed its enum import, and loyalty did not handle an unknown enum. These mismatches were repaired and unrelated formatting removed. The release Android x64 APK built successfully and was installed. The user signed in manually. Final capture used Pixel_9_Pro, emulator-5556; no physical device was used.

The earlier full analyzer run had no application source errors, five existing unused warnings and four unrelated test-fixture contract errors. The whole test suite is not claimed to pass.

## Dashboard changes

Live changes used only the visible admin UI at https://admin-trasphone.smartagency-ye.com/ with the user's signed-in session.

The two active home banners now use replacement 3:1 artwork with Arabic copy baked into the images, following the user's latest request. All four language/device image slots were updated through the visible admin UI. UI headings, subheadings and button overlays stay empty to avoid duplicate text. Internal names and descriptive alt text remain.

The catalog already contained 2,162 real records. Three explicitly labeled demo records (TRAS-DEMO-01 through 03) were added before the user clarified that real products should be used. All three are now hidden and unfeatured; no more demo records were added.

Ten existing real products were featured without changing commercial data: BC13PM, BC11, BC12, BC11P, BC11PM, BC12PM, BC14+, BC7+, BC7G and BC8+. Their existing zero prices were preserved; no stock, compatibility, quality or price was invented.

Media metadata saying 0 B did not mean no image: 14 of 15 legacy camera URLs in a focused search loaded in the browser. 12pro-rear-camera.jpg was broken. An iPhone 14 Pro Max image loaded in the browser but failed in Android; that product and the iPhone 14 entry sharing its image were excluded from featured products. Products without linked media were skipped.

LC15PM-GX was unfeatured because it had an unrelated car image. Its main-image reference was changed to a generic generated screen illustration, not a verified photograph of that stock item.

The source admin table previews gallery media only, so its placeholder does not establish whether a main image exists. Its main-image form can also show No media selected beside a valid legacy Media ID. Images were checked separately in the library and app.

## Published actual recordings

- browse.mp4: 13.40 seconds. Refreshed compact home, baked-text banners, glass navigation and three-column illustrated categories.
- product-tour.mp4: 11.97 seconds. Open real product BC13PM in the redesigned detail page, enlarge its photo, then inspect specifications and availability.
- account-tour.mp4: 11.97 seconds. Redesigned account overview, then switch appearance to light and language to English.

All three recordings use natural 1x playback and animations. The browse and account clips have no time cuts; only the first two idle seconds were trimmed from the replacement product recording. Playback is not accelerated. All H.264/yuv420p MP4s fully decoded successfully, use 720 x 1608 at 30 fps and remain below 15 seconds. Posters are frames from the corresponding recordings. Failed exploratory recordings were not published.

Home now uses liquid_glass_widgets 1.15.0 for the floating navigation and search control, a compact 120-pixel header, Solar icons bundled from Iconify, and the short Arabic account label «حسابي». Light/dark appearance and all five tab destinations were checked; the system appearance preference was restored. See C:/Users/Abdua/Desktop/projects/tras-phone/docs/home-glass-refresh.md.

The account page was redesigned before capture, with identity, real account metrics, compact wallet, four service shortcuts, direct appearance/language controls, collapsible business information and support links. Favorites and addresses opened successfully; language and appearance changed correctly. Arabic and system appearance were restored after capture. The installed release build succeeded and focused Dart analysis reported no issues.

The shared project player mounts one video at a time and starts on explicit playback. src/data/trasPhone.ts enables the completed three-clip experience.

The product page now has a compact pinned toolbar, balanced gallery with full-screen zoom, clearer price/availability, themed specifications and a full-width cart action beneath quantity/total. Sharing opens the native share sheet. A parser omission that dropped compatible device names was repaired. Seven product-screen/Cubit tests pass; the broader model checks still have two pre-existing optional-education-list null/empty failures. See C:/Users/Abdua/Desktop/projects/tras-phone/docs/product-details-refresh.md.

## Generated illustration provenance

Mode: built-in image_gen, one generation per distinct asset. Ten square illustrations and two 3:1 banners are saved unchanged in C:/Users/Abdua/Desktop/projects/tras-phone/data/showcase-media/. See prompt-set.json and provenance.json there. Square copies are bundled in mobile/assets/images/catalog/.

Generated assets illustrate categories/banners and do not represent actual stock photography. Website videos and posters are actual app captures. Local evidence under artifacts/tras-* includes home/category screenshots, the focused media audit and published-video metadata.

Replacement banner originals and exact prompts: data/showcase-media/banner-*-ar-v2.png and banner-v2-prompts.json in the TRAS project. The tools delivery copy is JPEG; the generated artwork itself is unchanged. Solar attribution: mobile/assets/icons/solar/ATTRIBUTION.md.
