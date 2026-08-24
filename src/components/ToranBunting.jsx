import toranBanner from "../assets/toran_banner_2.png";

const NATIVE_W = 581;
const NATIVE_H = 174;
const VISIBLE_H = 98;

export default function ToranBunting({ width = 320, className = "" }) {
  const displayHeight = (width / NATIVE_W) * VISIBLE_H;

  return (
    <div className={`overflow-hidden ${className}`} style={{ width, height: displayHeight }}>
      <img
        src={toranBanner}
        alt=""
        loading="eager"
        draggable={false}
        className="block select-none"
        style={{ width, height: (width / NATIVE_W) * NATIVE_H }}
      />
    </div>
  );
}
