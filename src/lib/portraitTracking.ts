/** Palm centers measured from the supplied clip, in normalized source coordinates. */
const points = [
  [0, 0.275, 0.56, 0.73, 0.55],
  [12, 0.22, 0.53, 0.76, 0.54],
  [18, 0.2, 0.4, 0.78, 0.55],
  [22, 0.19, 0.36, 0.8, 0.55],
  [27, 0.22, 0.44, 0.8, 0.54],
  [30, 0.2, 0.49, 0.8, 0.51],
  [33, 0.2, 0.54, 0.81, 0.47],
  [38, 0.2, 0.54, 0.82, 0.4],
  [43, 0.2, 0.54, 0.81, 0.36],
  [49, 0.2, 0.54, 0.78, 0.46],
  [55, 0.21, 0.53, 0.77, 0.53],
  [60, 0.21, 0.53, 0.77, 0.52],
];
export function palmPositions(frame: number) {
  const end = points.findIndex((p) => p[0] >= frame);
  const b = points[end < 0 ? points.length - 1 : end],
    a = points[Math.max(0, end - 1)];
  const ratio =
    a === b ? 0 : Math.max(0, Math.min(1, (frame - a[0]) / (b[0] - a[0])));
  return [
    a[1] + (b[1] - a[1]) * ratio,
    a[2] + (b[2] - a[2]) * ratio,
    a[3] + (b[3] - a[3]) * ratio,
    a[4] + (b[4] - a[4]) * ratio,
  ];
}
