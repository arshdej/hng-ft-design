import type { BoxProps } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { useMemo } from "react";

import CartSVG from "@/assets/icons/cart.svg";
import UserSVG from "@/assets/icons/user.svg";

const iconMap = {
  cart: CartSVG,
  user: UserSVG,
};

export type IconNames = keyof typeof iconMap;

type MapType = Record<
  IconNames,
  React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >
>;

export interface IconProps extends BoxProps {
  type: IconNames;
}

export default function Icon(props: IconProps) {
  const { type, ..._props } = props;

  const MappedIcon: ValueOf<MapType> = useMemo(() => {
    return iconMap[type];
  }, [type]);

  return <Box color={props.color} as={MappedIcon} {..._props} />;
}
