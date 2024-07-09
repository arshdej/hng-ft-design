import { mode } from "@chakra-ui/theme-tools";

export default function globalStyle(props: any) {
  return {
    "html, body": {
      bg: mode("light.bg", "dark.bg")(props),
      color: mode("black", "white")(props),
      transition: "all .5s ease-in",
    },
  };
}
