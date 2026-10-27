interface PackageCover {
  layout: "surfaces" | "bars";
  images: readonly { file: string; width: number; height: number }[];
}

const packageCovers: Record<string, PackageCover> = {
  "elastic-sheet": {
    layout: "surfaces",
    images: [
      { file: "care-desk.webp", width: 614, height: 774 },
      { file: "anchor-compact.webp", width: 614, height: 712 },
    ],
  },
  "frost-nav-bar": {
    layout: "bars",
    images: [
      { file: "preview.webp", width: 636, height: 220 },
      { file: "real-project.webp", width: 614, height: 134 },
    ],
  },
};

export const getPackageCover = (id: string): PackageCover | undefined => packageCovers[id];
