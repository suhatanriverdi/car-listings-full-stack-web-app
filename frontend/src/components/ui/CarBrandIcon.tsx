import { getBrandIconPath } from "@/utils/getBrandIconPath";

interface CarBrandIconProps {
  make: string;
  h?: number; // Opsiyonel yükseklik
  w?: number; // Opsiyonel genişlik
}

export default function CarBrandIcon({
  make,
  h = 1,
  w = 1,
}: CarBrandIconProps) {
  const iconPath = getBrandIconPath(make);

  return iconPath ? (
    <div style={{ height: `${h}rem`, width: `${w}rem` }}>
      <img
        src={iconPath}
        alt={`${make} icon`}
        className="object-contain h-full w-full"
      />
    </div>
  ) : null;
}
