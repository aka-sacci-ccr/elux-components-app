import { AvailableIcons } from "../components/ui/Icon.tsx";
import { TechSheetProps } from "../sections/Product/ProductDetails/ProductPage.tsx";

export const MINICART_FORM_ID = "minicart-form";
export const MINICART_DRAWER_ID = "minicart-drawer";

export const SIDEMENU_CONTAINER_ID = "sidemenu";
export const SIDEMENU_DRAWER_ID = "sidemenu-drawer";

export const SEARCHBAR_DRAWER_ID = "searchbar-drawer";
export const SEARCHBAR_POPUP_ID = "searchbar-popup";
export const SEARCHBAR_INPUT_FORM_ID = "searchbar-form";

export const USER_ID = "user-json";

export const WISHLIST_FORM_ID = "wishlist-form";

export const HEADER_HEIGHT_MOBILE = "64px";
export const NAVBAR_HEIGHT_MOBILE = "56px";
export const HEADER_HEIGHT_DESKTOP = "142px";
export const HEADER_HEIGHT_DESKTOP_NO_SECONDARY = "70px";
export const NAVBAR_HEIGHT_DESKTOP = "72px";

export const WHERE_TO_BUY_CONTENT_ID = "where-to-buy-content";

export const paddingSizes = {
  desktop: {
    top: {
      "none": "sm:pt-0",
      "half-extra-small": "sm:pt-3",
      "extra-small": "sm:pt-6",
      "small": "sm:pt-8",
      "medium": "sm:pt-15",
      "large": "sm:pt-17.5",
      "extra-large": "sm:pt-20",
      "double-extra-large": "sm:pt-22.5",
      "triple-extra-large": "sm:pt-26",
    },
    bottom: {
      "none": "sm:pb-0",
      "half-extra-small": "sm:pb-3",
      "extra-small": "sm:pb-6",
      "small": "sm:pb-8",
      "medium": "sm:pb-15",
      "large": "sm:pb-17.5",
      "extra-large": "sm:pb-20",
      "double-extra-large": "sm:pb-22.5",
      "triple-extra-large": "sm:pb-26",
    },
  },
  mobile: {
    top: {
      "none": "pt-0",
      "half-extra-small": "pt-2",
      "extra-small": "pt-4",
      "small": "pt-6",
      "medium": "pt-8",
      "large": "pt-8.75",
      "extra-large": "pt-10",
      "double-extra-large": "pt-11.25",
      "triple-extra-large": "pt-13",
    },
    bottom: {
      "none": "pb-0",
      "half-extra-small": "pb-2",
      "extra-small": "pb-4",
      "small": "pb-6",
      "medium": "pb-8",
      "large": "pb-8.75",
      "extra-large": "pb-10",
      "double-extra-large": "pb-11.25",
      "triple-extra-large": "pb-13",
    },
  },
};

export const marginSizes = {
  desktop: {
    top: {
      "none": "sm:mt-0",
      "half-extra-small": "sm:mt-4",
      "extra-small": "sm:mt-8",
      "small": "sm:mt-12",
      "medium": "sm:mt-15",
      "large": "sm:mt-17.5",
      "extra-large": "sm:mt-20",
      "double-extra-large": "sm:mt-22.5",
      "triple-extra-large": "sm:mt-26",
    },
    bottom: {
      "none": "sm:mb-0",
      "half-extra-small": "sm:mb-4",
      "extra-small": "sm:mb-8",
      "small": "sm:mb-12",
      "medium": "sm:mb-15",
      "large": "sm:mb-17.5",
      "extra-large": "sm:mb-20",
      "double-extra-large": "sm:mb-22.5",
      "triple-extra-large": "sm:mb-26",
    },
  },
  mobile: {
    top: {
      "none": "mt-0",
      "half-extra-small": "mt-2",
      "extra-small": "mt-4",
      "small": "mt-6",
      "medium": "mt-8",
      "large": "mt-8.75",
      "extra-large": "mt-10",
      "double-extra-large": "mt-11.25",
      "triple-extra-large": "mt-13",
    },
    bottom: {
      "none": "mb-0",
      "half-extra-small": "mb-2",
      "extra-small": "mb-4",
      "small": "mb-6",
      "medium": "mb-8",
      "large": "mb-8.75",
      "extra-large": "mb-10",
      "double-extra-large": "mb-11.25",
      "triple-extra-large": "mb-13",
    },
  },
};

export const TEXT_COLORS = {
  "base-100": "text-base-100",
  "primary": "text-primary",
  "secondary": "text-secondary",
  "accent": "text-accent",
  "neutral": "text-neutral",
  "success": "text-success",
  "warning": "text-warning",
  "error": "text-error",
  "info": "text-info",
  "base-200": "text-base-200",
  "base-300": "text-base-300",
  "base-400": "text-base-400",
  "base-content": "text-base-content",
  "primary-content": "text-primary-content",
  "secondary-content": "text-secondary-content",
  "accent-content": "text-accent-content",
  "neutral-content": "text-neutral-content",
  "success-content": "text-success-content",
  "warning-content": "text-warning-content",
  "error-content": "text-error-content",
  "info-content": "text-info-content",
  "black": "text-black",
  "white": "text-white",
  "transparent": "text-transparent",
};

export const HOVER_TEXT_COLORS = {
  "base-100": "hover:!text-base-100",
  "primary": "hover:!text-primary",
  "secondary": "hover:!text-secondary",
  "accent": "hover:!text-accent",
  "neutral": "hover:!text-neutral",
  "success": "hover:!text-success",
  "warning": "hover:!text-warning",
  "error": "hover:!text-error",
  "info": "hover:!text-info",
  "base-200": "hover:!text-base-200",
  "base-300": "hover:!text-base-300",
  "base-400": "hover:!text-base-400",
  "base-content": "hover:!text-base-content",
  "primary-content": "hover:!text-primary-content",
  "secondary-content": "hover:!text-secondary-content",
  "accent-content": "hover:!text-accent-content",
  "neutral-content": "hover:!text-neutral-content",
  "success-content": "hover:!text-success-content",
  "warning-content": "hover:!text-warning-content",
  "error-content": "hover:!text-error-content",
  "info-content": "hover:!text-info-content",
  "black": "hover:!text-black",
  "white": "hover:!text-white",
  "transparent": "hover:!text-transparent",
};

export const FOCUS_TEXT_COLORS = {
  "base-100": "focus:!text-base-100",
  "primary": "focus:!text-primary",
  "secondary": "focus:!text-secondary",
  "accent": "focus:!text-accent",
  "neutral": "focus:!text-neutral",
  "success": "focus:!text-success",
  "warning": "focus:!text-warning",
  "error": "focus:!text-error",
  "info": "focus:!text-info",
  "base-200": "focus:!text-base-200",
  "base-300": "focus:!text-base-300",
  "base-400": "focus:!text-base-400",
  "base-content": "focus:!text-base-content",
  "primary-content": "focus:!text-primary-content",
  "secondary-content": "focus:!text-secondary-content",
  "accent-content": "focus:!text-accent-content",
  "neutral-content": "focus:!text-neutral-content",
  "success-content": "focus:!text-success-content",
  "warning-content": "focus:!text-warning-content",
  "error-content": "focus:!text-error-content",
  "info-content": "focus:!text-info-content",
  "black": "focus:!text-black",
  "white": "focus:!text-white",
  "transparent": "focus:!text-transparent",
};

export const PEER_CHECKED_TEXT_COLORS = {
  "base-100": "peer-checked:!text-base-100",
  "primary": "peer-checked:!text-primary",
  "secondary": "peer-checked:!text-secondary",
  "accent": "peer-checked:!text-accent",
  "neutral": "peer-checked:!text-neutral",
  "success": "peer-checked:!text-success",
  "warning": "peer-checked:!text-warning",
  "error": "peer-checked:!text-error",
  "info": "peer-checked:!text-info",
  "base-200": "peer-checked:!text-base-200",
  "base-300": "peer-checked:!text-base-300",
  "base-400": "peer-checked:!text-base-400",
  "base-content": "peer-checked:!text-base-content",
  "primary-content": "peer-checked:!text-primary-content",
  "secondary-content": "peer-checked:!text-secondary-content",
  "accent-content": "peer-checked:!text-accent-content",
  "neutral-content": "peer-checked:!text-neutral-content",
  "success-content": "peer-checked:!text-success-content",
  "warning-content": "peer-checked:!text-warning-content",
  "error-content": "peer-checked:!text-error-content",
  "info-content": "peer-checked:!text-info-content",
  "black": "peer-checked:!text-black",
  "white": "peer-checked:!text-white",
  "transparent": "peer-checked:!text-transparent",
};

export const BG_COLORS = {
  "base-100": "bg-base-100",
  "primary": "bg-primary",
  "secondary": "bg-secondary",
  "accent": "bg-accent",
  "neutral": "bg-neutral",
  "success": "bg-success",
  "warning": "bg-warning",
  "error": "bg-error",
  "info": "bg-info",
  "base-200": "bg-base-200",
  "base-300": "bg-base-300",
  "base-400": "bg-base-400",
  "base-content": "bg-base-content",
  "primary-content": "bg-primary-content",
  "secondary-content": "bg-secondary-content",
  "accent-content": "bg-accent-content",
  "neutral-content": "bg-neutral-content",
  "success-content": "bg-success-content",
  "warning-content": "bg-warning-content",
  "error-content": "bg-error-content",
  "info-content": "bg-info-content",
  "black": "bg-black",
  "white": "bg-white",
  "transparent": "bg-transparent",
};

export const BORDER_COLORS = {
  "base-100": "!border-base-100",
  "primary": "!border-primary",
  "secondary": "!border-secondary",
  "accent": "!border-accent",
  "neutral": "!border-neutral",
  "success": "!border-success",
  "warning": "!border-warning",
  "error": "!border-error",
  "info": "!border-info",
  "base-200": "!border-base-200",
  "base-300": "!border-base-300",
  "base-400": "!border-base-400",
  "base-content": "!border-base-content",
  "primary-content": "!border-primary-content",
  "secondary-content": "!border-secondary-content",
  "accent-content": "!border-accent-content",
  "neutral-content": "!border-neutral-content",
  "success-content": "!border-success-content",
  "warning-content": "!border-warning-content",
  "error-content": "!border-error-content",
  "info-content": "!border-info-content",
  "black": "!border-black",
  "white": "!border-white",
  "transparent": "!border-transparent",
};

export const BORDER_CLASSES = {
  "none": "border-none",
  "onlyX": {
    "1": "border-x",
    "2": "border-x-2",
    "4": "border-x-4",
  },
  "onlyY": {
    "1": "border-y",
    "2": "border-y-2",
    "4": "border-y-4",
  },
  "full": {
    "1": "border",
    "2": "border-2",
    "4": "border-4",
  },
} as const;

export const HOVER_BG_COLORS_WITH_BORDER = {
  "base-100": "hover:!bg-base-100 hover:!border-base-100",
  "primary": "hover:!bg-primary hover:!border-primary",
  "secondary": "hover:!bg-secondary hover:!border-secondary",
  "accent": "hover:!bg-accent hover:!border-accent",
  "neutral": "hover:!bg-neutral hover:!border-neutral",
  "success": "hover:!bg-success hover:!border-success",
  "warning": "hover:!bg-warning hover:!border-warning",
  "error": "hover:!bg-error hover:!border-error",
  "info": "hover:!bg-info hover:!border-info",
  "base-200": "hover:!bg-base-200 hover:!border-base-200",
  "base-300": "hover:!bg-base-300 hover:!border-base-300",
  "base-400": "hover:!bg-base-400 hover:!border-base-400",
  "base-content": "hover:!bg-base-content hover:!border-base-content",
  "primary-content": "hover:!bg-primary-content hover:!border-primary-content",
  "secondary-content":
    "hover:!bg-secondary-content hover:!border-secondary-content",
  "accent-content": "hover:!bg-accent-content hover:!border-accent-content",
  "neutral-content": "hover:!bg-neutral-content hover:!border-neutral-content",
  "success-content": "hover:!bg-success-content hover:!border-success-content",
  "warning-content": "hover:!bg-warning-content hover:!border-warning-content",
  "error-content": "hover:!bg-error-content hover:!border-error-content",
  "info-content": "hover:!bg-info-content hover:!border-info-content",
  "black": "hover:!bg-black hover:!border-black",
  "white": "hover:!bg-white hover:!border-white",
  "transparent": "hover:!bg-transparent hover:!border-transparent",
};

export const HOVER_BG_COLORS = {
  "base-100": "hover:!bg-base-100",
  "primary": "hover:!bg-primary",
  "secondary": "hover:!bg-secondary",
  "accent": "hover:!bg-accent",
  "neutral": "hover:!bg-neutral",
  "success": "hover:!bg-success",
  "warning": "hover:!bg-warning",
  "error": "hover:!bg-error",
  "info": "hover:!bg-info",
  "base-200": "hover:!bg-base-200",
  "base-300": "hover:!bg-base-300",
  "base-400": "hover:!bg-base-400",
  "base-content": "hover:!bg-base-content",
  "primary-content": "hover:!bg-primary-content",
  "secondary-content": "hover:!bg-secondary-content",
  "accent-content": "hover:!bg-accent-content",
  "neutral-content": "hover:!bg-neutral-content",
  "success-content": "hover:!bg-success-content",
  "warning-content": "hover:!bg-warning-content",
  "error-content": "hover:!bg-error-content",
  "info-content": "hover:!bg-info-content",
  "black": "hover:!bg-black",
  "white": "hover:!bg-white",
  "transparent": "hover:!bg-transparent",
};

export const HOVER_BORDER_COLORS = {
  "base-100": "hover:!border-base-100",
  "primary": "hover:!border-primary",
  "secondary": "hover:!border-secondary",
  "accent": "hover:!border-accent",
  "neutral": "hover:!border-neutral",
  "success": "hover:!border-success",
  "warning": "hover:!border-warning",
  "error": "hover:!border-error",
  "info": "hover:!border-info",
  "base-200": "hover:!border-base-200",
  "base-300": "hover:!border-base-300",
  "base-400": "hover:!border-base-400",
  "base-content": "hover:!border-base-content",
  "primary-content": "hover:!border-primary-content",
  "secondary-content": "hover:!border-secondary-content",
  "accent-content": "hover:!border-accent-content",
  "neutral-content": "hover:!border-neutral-content",
  "success-content": "hover:!border-success-content",
  "warning-content": "hover:!border-warning-content",
  "error-content": "hover:!border-error-content",
  "info-content": "hover:!border-info-content",
  "black": "hover:!border-black",
  "white": "hover:!border-white",
  "transparent": "hover:!border-transparent",
};

export const PEER_CHECKED_BG_COLORS = {
  "base-100": "peer-checked:!bg-base-100",
  "primary": "peer-checked:!bg-primary",
  "secondary": "peer-checked:!bg-secondary",
  "accent": "peer-checked:!bg-accent",
  "neutral": "peer-checked:!bg-neutral",
  "success": "peer-checked:!bg-success",
  "warning": "peer-checked:!bg-warning",
  "error": "peer-checked:!bg-error",
  "info": "peer-checked:!bg-info",
  "base-200": "peer-checked:!bg-base-200",
  "base-300": "peer-checked:!bg-base-300",
  "base-400": "peer-checked:!bg-base-400",
  "base-content": "peer-checked:!bg-base-content",
  "primary-content": "peer-checked:!bg-primary-content",
  "secondary-content": "peer-checked:!bg-secondary-content",
  "accent-content": "peer-checked:!bg-accent-content",
  "neutral-content": "peer-checked:!bg-neutral-content",
  "success-content": "peer-checked:!bg-success-content",
  "warning-content": "peer-checked:!bg-warning-content",
  "error-content": "peer-checked:!bg-error-content",
  "info-content": "peer-checked:!bg-info-content",
  "black": "peer-checked:!bg-black",
  "white": "peer-checked:!bg-white",
  "transparent": "peer-checked:!bg-transparent",
};

export const PEER_CHECKED_BORDER_COLORS = {
  "base-100": "peer-checked:!border-base-100",
  "primary": "peer-checked:!border-primary",
  "secondary": "peer-checked:!border-secondary",
  "accent": "peer-checked:!border-accent",
  "neutral": "peer-checked:!border-neutral",
  "success": "peer-checked:!border-success",
  "warning": "peer-checked:!border-warning",
  "error": "peer-checked:!border-error",
  "info": "peer-checked:!border-info",
  "base-200": "peer-checked:!border-base-200",
  "base-300": "peer-checked:!border-base-300",
  "base-400": "peer-checked:!border-base-400",
  "base-content": "peer-checked:!border-base-content",
  "primary-content": "peer-checked:!border-primary-content",
  "secondary-content": "peer-checked:!border-secondary-content",
  "accent-content": "peer-checked:!border-accent-content",
  "neutral-content": "peer-checked:!border-neutral-content",
  "success-content": "peer-checked:!border-success-content",
  "warning-content": "peer-checked:!border-warning-content",
  "error-content": "peer-checked:!border-error-content",
  "info-content": "peer-checked:!border-info-content",
  "black": "peer-checked:!border-black",
  "white": "peer-checked:!border-white",
  "transparent": "peer-checked:!border-transparent",
};

export const ALIGN_ITEMS_OPTIONS = {
  "start": "items-start",
  "end": "items-end",
  "center": "items-center",
};

export const GAP_SIZES = {
  "0": "gap-0",
  "1": "gap-1",
  "2": "gap-2",
  "3": "gap-3",
  "4": "gap-4",
  "5": "gap-5",
  "6": "gap-6",
  "8": "gap-8",
  "10": "gap-10",
  "12": "gap-12",
  "16": "gap-16",
  "20": "gap-20",
  "24": "gap-24",
  "28": "gap-28",
};

export const GAP_X_SIZES = {
  "0": "gap-x-0",
  "1": "gap-x-1",
  "2": "gap-x-2",
  "3": "gap-x-3",
  "4": "gap-x-4",
  "5": "gap-x-5",
  "6": "gap-x-6",
  "8": "gap-x-8",
  "10": "gap-x-10",
  "12": "gap-x-12",
  "16": "gap-x-16",
  "20": "gap-x-20",
  "24": "gap-x-24",
  "28": "gap-x-28",
};

export const GAP_Y_SIZES = {
  "0": "gap-y-0",
  "1": "gap-y-1",
  "2": "gap-y-2",
  "3": "gap-y-3",
  "4": "gap-y-4",
  "5": "gap-y-5",
  "6": "gap-y-6",
  "8": "gap-y-8",
  "10": "gap-y-10",
  "12": "gap-y-12",
  "16": "gap-y-16",
  "20": "gap-y-20",
  "24": "gap-y-24",
  "28": "gap-y-28",
};

export const GRID_SIZES_DESKTOP = {
  "1": "md:grid-cols-1",
  "2": "md:grid-cols-2",
  "3": "md:grid-cols-3",
  "4": "md:grid-cols-4",
};

export const GRID_COL_SPAN_DESKTOP = {
  "1": "md:col-span-1",
  "2": "md:col-span-2",
  "3": "md:col-span-3",
  "4": "md:col-span-4",
};

export const ROUNDED_OPTIONS = {
  "none": "rounded-none",
  "sm": "rounded-sm",
  "regular": "rounded",
  "md": "rounded-md",
  "lg": "rounded-lg",
  "xl": "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
  "full": "rounded-full",
} as const;

export const TOAST_ID = "toast-cart";

export const LANGUAGE_DIFFS = {
  EN: {
    contactForm: {
      country: {
        label: "Country*",
        placeholder: "Select the country",
      },
      productCode: {
        label: "Product code / Model number",
        placeholder: "Insert the product code/model number",
      },
      subject: {
        label: "Subject",
        placeholder: "Select the subject",
      },
      message: {
        label: "Message",
        placeholder: "Insert the message",
      },
      label: "Personal data",
      name: {
        label: "Name*",
        placeholder: "Insert your name",
      },
      surnames: {
        label: "Surnames*",
        placeholder: "Insert your surnames",
      },
      email: {
        label: "Email*",
        placeholder: "Insert your email",
      },
      confirmEmail: {
        label: "Confirm email*",
        placeholder: "Confirm email",
      },
      phone: {
        label: "Contact phone number",
        placeholder: "Insert your contact phone number",
      },
    },
    productPage: {
      descriptionTitle: "Description",
      recordTitle: "Technical sheet",
      dimensionsProduct: "Product dimensions",
      dimensions: "without box",
      dimensionsBox: "with box",
      buttonText: "Where to buy",
    },
    listingPage: {
      notFound: "Not Found!",
      filters: "Filters",
      productCount: "products",
      sort: "Sort by",
      filter: "Filter by",
      showMore: "Show more",
      showLess: "Show less",
      clear: "Clear",
      apply: "Apply",
    },
  },
  ES: {
    contactForm: {
      country: {
        label: "País*",
        placeholder: "Selecciona el pais",
      },
      productCode: {
        label: "Código de producto/número de modelo",
        placeholder: "Inserte el código de producto/modelo",
      },
      subject: {
        label: "Asunto",
        placeholder: "Selecciona el asunto",
      },
      message: {
        label: "Mensaje",
        placeholder: "Insertar el mensaje",
      },
      label: "Datos personales",
      name: {
        label: "Nombre*",
        placeholder: "Inserta tu nombre",
      },
      surnames: {
        label: "Apellidos*",
        placeholder: "Inserta tus apellidos",
      },
      email: {
        label: "Email*",
        placeholder: "Inserta tu email",
      },
      confirmEmail: {
        label: "Confirmar email*",
        placeholder: "Confirma tu email",
      },
      phone: {
        label: "Número de teléfono de contacto",
        placeholder: "Inserta tu número de teléfono de contacto",
      },
    },
    productPage: {
      descriptionTitle: "Descripción",
      recordTitle: "Ficha Técnica",
      dimensionsProduct: "Dimensiones del producto:",
      dimensions: "con caja",
      dimensionsBox: "sin caja",
      buttonText: "Donde comprar",
    },
    listingPage: {
      notFound: "No encontrado!",
      filters: "Filtros",
      productCount: "productos",
      sort: "Ordenar por",
      filter: "Filtrar por",
      showMore: "Ver más productos",
      showLess: "Mostrar menos",
      clear: "Limpiar",
      apply: "Aplicar",
    },
  },
};

export const PADDING_SIZES = {
  full: {
    "0": "p-0",
    "1": "p-1",
    "2": "p-2",
    "3": "p-3",
    "4": "p-4",
    "5": "p-5",
    "6": "p-6",
    "8": "p-8",
    "10": "p-10",
    "12": "p-12",
    "16": "p-16",
    "20": "p-20",
    "24": "p-24",
    "28": "p-28",
  },
  left: {
    "0": "pl-0",
    "1": "pl-1",
    "2": "pl-2",
    "3": "pl-3",
    "4": "pl-4",
    "5": "pl-5",
    "6": "pl-6",
    "8": "pl-8",
    "10": "pl-10",
    "12": "pl-12",
    "16": "pl-16",
    "20": "pl-20",
    "24": "pl-24",
    "28": "pl-28",
  },
  right: {
    "0": "pr-0",
    "1": "pr-1",
    "2": "pr-2",
    "3": "pr-3",
    "4": "pr-4",
    "5": "pr-5",
    "6": "pr-6",
    "8": "pr-8",
    "10": "pr-10",
    "12": "pr-12",
    "16": "pr-16",
    "20": "pr-20",
    "24": "pr-24",
    "28": "pr-28",
  },
  top: {
    "0": "pt-0",
    "1": "pt-1",
    "2": "pt-2",
    "3": "pt-3",
    "4": "pt-4",
    "5": "pt-5",
    "6": "pt-6",
    "8": "pt-8",
    "10": "pt-10",
    "12": "pt-12",
    "16": "pt-16",
    "20": "pt-20",
    "24": "pt-24",
    "28": "pt-28",
  },
  bottom: {
    "0": "pb-0",
    "1": "pb-1",
    "2": "pb-2",
    "3": "pb-3",
    "4": "pb-4",
    "5": "pb-5",
    "6": "pb-6",
    "8": "pb-8",
    "10": "pb-10",
    "12": "pb-12",
    "16": "pb-16",
    "20": "pb-20",
    "24": "pb-24",
    "28": "pb-28",
  },
};

export const DEFAULT_DOMAINS = ["deno.dev", "decocdn.com", "localhost"];

export const DEFAULT_TECH_SHEET_CONFIG: TechSheetProps[] = [
  {
    bgColor: "white",
    descriptionProps: {
      fontColor: "secondary",
      fontWeight: "font-medium",
    },
    valueProps: {
      fontColor: "info",
      fontWeight: "font-light",
    },
  },
  {
    bgColor: "base-300",
    descriptionProps: {
      fontColor: "secondary",
      fontWeight: "font-medium",
    },
    valueProps: {
      fontColor: "info",
      fontWeight: "font-light",
    },
  },
];

export const iconMap: Record<string, AvailableIcons> = {
  WIDTH: "width-property",
  HEIGHT: "height-property",
  WEIGHT: "weight-property",
  DEPTH: "depth-property",
  BOX_WIDTH: "width-property",
  BOX_HEIGHT: "height-property",
  BOX_WEIGHT: "weight-property",
  BOX_DEPTH: "depth-property",
};
