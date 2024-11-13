import {
  FilterToggle,
  Product,
  ProductListingPage,
} from "apps/commerce/types.ts";

export default function loader(): ProductListingPage | null {
  return {
    "@type": "ProductListingPage",
    breadcrumb: {
      "@type": "BreadcrumbList",
      numberOfItems: 1,
      itemListElement: [{
        "@type": "ListItem",
        position: 1,
        item: "Product Category",
      }],
    },
    filters: filterValues,
    products: [...products, ...products.slice(0, 4)],
    pageInfo: {
      currentPage: 1,
      nextPage: "?page=2",
      previousPage: undefined,
      records: 25,
    },
    sortOptions: [
      { value: "name-asc", label: "Nome: A-Z" },
      { value: "name-desc", label: "Nome: Z-A" },
    ],
    seo: {
      title: "Product Category | Electrolux",
      description: "Product Category",
      canonical: "/product-category",
    },
  };
}

const filterValues: FilterToggle[] = [{
  "@type": "FilterToggle",
  label: "Tecnologia",
  key: "tech",
  values: [
    {
      label: "Tecnologia A",
      value: "tech-a",
      quantity: 10,
      selected: false,
      url: "/filter/tech-a",
    },
    {
      label: "Tecnologia B",
      value: "tech-b",
      quantity: 5,
      selected: false,
      url: "/filter/tech-b",
    },
    {
      label: "Tecnologia C",
      value: "tech-c",
      quantity: 8,
      selected: false,
      url: "/filter/tech-c",
    },
  ],
  quantity: 3,
}, {
  "@type": "FilterToggle",
  label: "Altura",
  key: "height",
  values: [
    {
      label: "Baixa",
      value: "low",
      quantity: 12,
      selected: false,
      url: "/filter/low",
    },
    {
      label: "Média",
      value: "medium",
      quantity: 7,
      selected: false,
      url: "/filter/medium",
    },
    {
      label: "Alta",
      value: "high",
      quantity: 3,
      selected: false,
      url: "/filter/high",
    },
  ],
  quantity: 3,
}, {
  "@type": "FilterToggle",
  label: "Largura",
  key: "width",
  values: [
    {
      label: "Estreita",
      value: "narrow",
      quantity: 9,
      selected: false,
      url: "/filter/narrow",
    },
    {
      label: "Média",
      value: "medium",
      quantity: 6,
      selected: false,
      url: "/filter/medium",
    },
    {
      label: "Larga",
      value: "wide",
      quantity: 4,
      selected: false,
      url: "/filter/wide",
    },
  ],
  quantity: 3,
}, {
  "@type": "FilterToggle",
  label: "Profundidade",
  key: "depth",
  values: [
    {
      label: "Rasa",
      value: "shallow",
      quantity: 11,
      selected: false,
      url: "/filter/shallow",
    },
    {
      label: "Média",
      value: "medium",
      quantity: 5,
      selected: false,
      url: "/filter/medium",
    },
    {
      label: "Profunda",
      value: "deep",
      quantity: 2,
      selected: false,
      url: "/filter/deep",
    },
  ],
  quantity: 3,
}];

const products: Product[] = [
  {
    "@type": "Product",
    name: 'Estufa de Gas Doble Horno de 30" Acero Inoxidable',
    sku: "FRQU40E3HTS",
    productID: "estufa-de-gas-doble-horno-de-30-acero-inoxidable",
    url: "/nevecon-elux-french-door/p",
    image: [{
      "@type": "ImageObject",
      url:
        "https://deco-sites-assets.s3.sa-east-1.amazonaws.com/elux-latam/8898c87b-02dc-47f5-93b8-364f8d888c60/image-(1).png",
      alternateName: "Estufa de Gas Doble Horno de 30 Acero Inoxidable",
    }],
  },
  {
    "@type": "Product",
    name: "Refrigerador Multi Door 4 puertas 16.2 Cu. Ft Gris",
    sku: "FRQU40E3HTS",
    productID: "refrigerador-multi-door-4-puertas-16-2-cu-ft-gris",
    url: "/nevecon-elux-french-door/p",
    image: [{
      "@type": "ImageObject",
      url:
        "https://deco-sites-assets.s3.sa-east-1.amazonaws.com/elux-latam/a8ed3960-2df9-4f24-8de8-b6b34cffdbd8/Frame-748.png",
      alternateName: "Refrigerador Multi Door 4 puertas 16.2 Cu. Ft Gris",
    }],
  },
  {
    "@type": "Product",
    name: "Microondas 1.1 Cu. Ft. Color Acero",
    sku: "FRQU40E3HTS",
    productID: "microondas-1-1-cu-ft-color-acero",
    url: "/nevecon-elux-french-door/p",
    image: [{
      "@type": "ImageObject",
      url:
        "https://deco-sites-assets.s3.sa-east-1.amazonaws.com/elux-latam/e183c807-60b6-4bc5-850a-660562532f0f/image-(2).png",
      alternateName: "Microondas 1.1 Cu. Ft. Color Acero",
    }],
  },
  {
    "@type": "Product",
    name: 'Parrilla de mesa eléctrica de 30" - color negro',
    sku: "FRQU40E3HTS",
    productID: "parrilla-de-mesa-electrica-de-30-color-negro",
    url: "/nevecon-elux-french-door/p",
    image: [{
      "@type": "ImageObject",
      url:
        "https://deco-sites-assets.s3.sa-east-1.amazonaws.com/elux-latam/365e5eda-4818-4346-ad7d-235a86273d01/image-(3).png",
      alternateName: "Parrilla de mesa eléctrica de 30 - color negro",
    }],
  },
  {
    "@type": "Product",
    name: "Frigidaire Lavadora Compacta de 2.4 Cu. Ft de Carga Frontal Blanca",
    sku: "FRQU40E3HTS",
    productID:
      "frigidaire-lavadora-compacta-de-2-4-cu-ft-de-carga-frontal-blanca",
    url: "/nevecon-elux-french-door/p",
    image: [{
      "@type": "ImageObject",
      url:
        "https://deco-sites-assets.s3.sa-east-1.amazonaws.com/elux-latam/6b868680-01ee-4ed6-8ad9-4e9bf0a15776/image-(4).png",
      alternateName:
        "Frigidaire Lavadora Compacta de 2.4 Cu. Ft de Carga Frontal Blanca",
    }],
  },
];
