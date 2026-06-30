export type PartnerCompany = {
  name: string;
  href: string;
};

/** Çalıştığımız firmalar — site URL'lerini buradan güncelleyin. */
export const PARTNER_COMPANIES: PartnerCompany[] = [
  { name: "Vertex", href: "https://vertex.com" },
  { name: "Railtone", href: "https://railtone.com" },
  { name: "Orbital", href: "https://orbital.com" },
  { name: "Stacklane", href: "https://stacklane.com" },
];
