import type { DeepPartial, Theme } from "@chakra-ui/react";

const ff = 'font-family: "Polysans Trial"; font-weight: normal;';
const heroFont = 'font-family: "Anton"; font-weight: normal;';

export const font = {
  regular: ff,
  hero: heroFont,
  bold: ff,
};

export const fonts: DeepPartial<Theme["fonts"]> = {
  body: font.regular,
  heading: font.hero,
};
