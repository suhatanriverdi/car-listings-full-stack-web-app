export function getBrandIconPath(make: string): string | null {
  const brandIcons: { [key: string]: string } = {
    "aston martin": "/images/brand-icons/aston.png",
    audi: "/images/brand-icons/audi.png",
    bmw: "/images/brand-icons/bmw.png",
    mercedes: "/images/brand-icons/mercedes.png",
    porsche: "/images/brand-icons/porsche.png",
    tesla: "/images/brand-icons/tesla.png",
  };

  const brandKey = make.toLowerCase();
  return brandIcons[brandKey] || null;
}
