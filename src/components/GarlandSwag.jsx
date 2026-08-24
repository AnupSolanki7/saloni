import garlandBunches from "../assets/garland_bunches.png";

const SHEET_W = 633;
const SHEET_H = 682;
const CROP = { x: 8, y: 552, w: 615, h: 130 };

export default function GarlandSwag({ width = 280, className = "" }) {
  const scale = width / CROP.w;
  const height = CROP.h * scale;

  return (
    <div
      role="img"
      aria-label="Marigold garland"
      className={className}
      style={{
        width,
        height,
        backgroundImage: `url(${garlandBunches})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: `${SHEET_W * scale}px ${SHEET_H * scale}px`,
        backgroundPosition: `${-CROP.x * scale}px ${-CROP.y * scale}px`,
      }}
    />
  );
}
