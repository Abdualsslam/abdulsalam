/** Resolve public media under either the domain root or Vite's deployment base. */
export const publicAsset = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;
