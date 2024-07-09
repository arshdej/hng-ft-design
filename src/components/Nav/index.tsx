import { useRootContext } from "@/context/root";
import { Badge, Box, HStack } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import Icon from "../Icon/Icon";

const bgColor1 = "#0B191E";
const bgColor2 = "#000d0f";

const bg = `linear-gradient(180deg, ${bgColor1}, ${bgColor1}, ${bgColor2}, ${bgColor2})`;

function Nav({ mode }: { mode: "lite" | "full" }) {
  const { cartState } = useRootContext();
  const router = useRouter();
  const openCart = () => {
    router.push("/cart");
  };

  const itemCount = cartState.length || 0;

  return (
    <div>
      <Box bg={bg}>
        <HStack
          minH="64px"
          px="2rem"
          py="8px"
          justifyContent={"space-between"}
          gap={4}
          alignItems={"center"}
          h="100%"
        >
          <HStack cursor={"pointer"} onClick={() => router.push("/")}>
            <Box fontSize={"lg"} fontWeight={600} color="#fff">
              ShopMen
            </Box>
            <Box fontSize={"md"} fontWeight={400} color="#fff">
              - Timbu Cloud Shop
            </Box>
          </HStack>
          {mode === "full" && (
            <HStack gap={8}>
              <Box
                fontSize={"lg"}
                fontWeight={600}
                color="#fff"
                cursor={"pointer"}
                _hover={{ borderBottom: "1px solid" }}
                onClick={() => {
                  router.push("/");
                }}
              >
                Home
              </Box>
              <Box
                fontSize={"lg"}
                fontWeight={600}
                color="#fff"
                cursor={"pointer"}
                _hover={{ borderBottom: "1px solid" }}
                onClick={() => {
                  router.push("/cart");
                }}
              >
                Shop
              </Box>
              {!!0 && (
                <Box
                  fontSize={"lg"}
                  fontWeight={600}
                  color="#fff"
                  cursor={"pointer"}
                  _hover={{ borderBottom: "1px solid" }}
                  onClick={() => {
                    router.push("/");
                  }}
                >
                  About us
                </Box>
              )}
            </HStack>
          )}
          <HStack gap={2}>
            {mode === "full" && (
              <Box
                cursor="pointer"
                px="4px"
                onClick={openCart}
                className="scale-45"
                position={"relative"}
              >
                <Icon
                  fill={"#fff"}
                  color={"#fff"}
                  type={"cart"}
                  fontSize="12px"
                />
                {itemCount > 0 && (
                  <Badge
                    position="absolute"
                    top="-1"
                    right="-1"
                    bg="red.500"
                    borderRadius="full"
                    px="2"
                    py="1"
                    fontSize="0.8em"
                    color="white"
                  >
                    {itemCount > 99 ? "99+" : itemCount}
                  </Badge>
                )}
              </Box>
            )}
            <Box cursor="pointer" px="4px">
              {!!0 && (
                <Icon
                  type={"user"}
                  fill={"#fff"}
                  color={"#fff"}
                  fontSize="12px"
                />
              )}
            </Box>
          </HStack>
        </HStack>
      </Box>
    </div>
  );
}

export default Nav;
