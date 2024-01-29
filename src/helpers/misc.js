export function formatNumberCompact(number) {
  return Intl.NumberFormat("en-US", {
    compactDisplay: "short",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(number);
}
