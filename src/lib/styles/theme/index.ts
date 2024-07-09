import { extendTheme } from "@chakra-ui/react";

import { colors } from "./colors";
import { config } from "./config";
import { fonts } from "./fonts";
import globalStyle from "./global";

const customTheme = extendTheme({
  fonts,
  colors,
  config,
  global: globalStyle,
});

export default customTheme;
