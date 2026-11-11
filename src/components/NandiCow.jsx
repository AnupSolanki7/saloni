import nandiCows from "../assets/nandi_cows.png";

const SHEET_W = 543;
const SHEET_H = 682;
const CROP = { x: 8, y: 40, w: 260, h: 220 };

export default function NandiCow({ width = 60, flip = false, className = "" }) {
  const scale = width / CROP.w;
  const height = CROP.h * scale;

  return (
    <div
      role="img"
      aria-label="Nandi cow"
      className={className}
      style={{
        width,
        height,
        backgroundImage: `url(${nandiCows})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: `${SHEET_W * scale}px ${SHEET_H * scale}px`,
        backgroundPosition: `${-CROP.x * scale}px ${-CROP.y * scale}px`,
        transform: flip ? "scaleX(-1)" : undefined,
      }}
    />
  );
}
