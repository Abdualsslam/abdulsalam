export interface SheetPull {
  index: number;
  displacement: number;
  lift: number;
  dragging?: boolean;
  activation?: number;
}

/** Friction travels through adjacent sheets and fades as a page leaves the binding. */
export function sheetResponse(index: number, pull: SheetPull | null) {
  if (!pull || pull.index === index) return { x: 0, y: 0, rotate: 0 };

  const offset = index - pull.index;
  const proximity = Math.exp(-.85 * (Math.abs(offset) - 1));
  const contact = .18 + .82 * Math.exp(-Math.max(0, pull.lift - 30) / 180);
  // Front sheets resist the pull; sheets behind it follow more readily.
  const overlap = offset > 0 ? .65 : 1;
  // A click transfers a short impulse before the page clears the stack.
  const force = pull.activation === undefined
    ? 28 * Math.tanh(pull.displacement / 70) * contact
    : 24 * Math.max(-1, Math.min(1, pull.activation));
  const tension = force * proximity * overlap;
  // Indices increase towards the left in this RTL file.
  const away = -Math.sign(offset);
  return {
    x: away * Math.abs(tension) * .16,
    y: -tension,
    rotate: away * tension * .035,
  };
}
