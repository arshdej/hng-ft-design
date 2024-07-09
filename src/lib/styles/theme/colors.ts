import type { DeepPartial, Theme } from "@chakra-ui/react";

/** extend additional color here */
const extendedColors: DeepPartial<
  Record<string, Theme["colors"]["blackAlpha"]>
> = {
  brand: {
    100: "",
    200: "",
    300: "",
    400: "",
    500: "",
    600: "",
    700: "",
    800: "",
    900: "",
  },
};

/** extend additional color modes here */
const colorModes: DeepPartial<any> = {
  light: {
    bg: "#FFF", // background
  },
  dark: {
    darkerBg: "",
    heroShade: "#25282f",
    bg: "#121212", // background
    border: "#2727278f",
  },
};

/** override chakra colors here */
const overridenChakraColors: DeepPartial<Theme["colors"]> = {};

export const colors = {
  ...overridenChakraColors,
  ...extendedColors,
  ...colorModes,
};
