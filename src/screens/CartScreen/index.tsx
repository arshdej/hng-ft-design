import { useRootContext } from "@/context/root";
import { withNavLayout } from "@/layouts";
import { CheckCircleIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Grid,
  GridItem,
  HStack,
  IconButton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";

function CartScreen() {
  const router = useRouter();
  const { cartState, removeFromCart, cartPlus, cartMinus } = useRootContext();
  const [isSuccess, setIsSuccess] = useState(false);

  const totalValue = cartState.reduce(
    (total, item) => total + item.actualPrice * item.qty,
    0
  );

  const handleCheckOut = () => {
    cartState.forEach((i) => {
      removeFromCart(i.id);
    });
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <Center h="100vh" w="100%">
        <VStack
          spacing={6}
          textAlign="center"
          bg="#D9D9D9"
          py={"4rem"}
          px="6rem"
        >
          <Text fontSize="2xl" fontWeight="bold">
            Thank You!
          </Text>
          <CheckCircleIcon boxSize="12rem" color="#000" />
          <Text fontSize="xl">Your Order Is Successful</Text>
          <Text fontSize={"sm"}>
            Kindly check your email for your order information
          </Text>
          <HStack spacing={4} fontSize={"xs"} mt="2rem">
            <Box
              pb="2px"
              borderBottom={"1px solid"}
              onClick={() => router.push("/")}
              cursor={"pointer"}
            >
              Home
            </Box>
            <Box
              pb="2px"
              borderBottom={"1px solid"}
              onClick={() => router.push("/products")}
              cursor={"pointer"}
            >
              Continue Shopping
            </Box>
          </HStack>
        </VStack>
      </Center>
    );
  }

  return (
    <Box py="2rem" w="100%" px="2rem">
      <Text fontSize="2xl" mb="1rem">
        Your Cart
      </Text>
      {cartState.length === 0 ? (
        <Box w="100%">
          <Center py="4rem">
            <Text fontSize={"2rem"} fontWeight={400}>
              No items in cart
            </Text>
          </Center>
          <Box mt="1rem" w="100%" px={8}>
            <HStack w="100%" alignItems={"center"} justifyContent={"center"}>
              <Text
                borderBottom={"1px solid"}
                cursor={"pointer"}
                pb="2px"
                fontSize={"xs"}
                onClick={() => router.push("/products")}
              >
                Continue Shopping
              </Text>
            </HStack>
          </Box>
        </Box>
      ) : (
        <Grid templateColumns={["1fr", "2fr 1fr"]} gap={6}>
          <GridItem>
            <VStack spacing={4}>
              {cartState.map((item) => (
                <HStack
                  key={item.id}
                  w="100%"
                  spacing={4}
                  align="center"
                  borderBottom="1px solid #ccc"
                  pb={4}
                >
                  <IconButton
                    icon={<CloseIcon />}
                    aria-label="Remove item"
                    onClick={() => removeFromCart(item.id)}
                  />

                  <Box border={"0.9px solid"} borderRadius={"4px"}>
                    <Box
                      as="img"
                      src={item.image}
                      alt={item.name}
                      w="80px"
                      h="100px"
                      objectFit="cover"
                      //   cursor="pointer"
                      //   onClick={openProduct}
                    />
                  </Box>
                  <VStack align="start" spacing={1} flex="1">
                    <Text>{item.name}</Text>
                    <Text>${item.actualPrice}</Text>
                  </VStack>
                  <HStack spacing={2}>
                    <Button size="sm" onClick={() => cartMinus(item.id)}>
                      -
                    </Button>
                    <Text>{item.qty}</Text>
                    <Button size="sm" onClick={() => cartPlus(item.id)}>
                      +
                    </Button>
                  </HStack>
                </HStack>
              ))}

              <Box mt="2rem" w="100%">
                <Box p={8}>
                  <HStack justify="space-between" mb={4} fontSize={"xl"}>
                    <Text>Total</Text>
                    <Text>${totalValue.toFixed(2)}</Text>
                  </HStack>
                  <Button
                    bg="#000"
                    color={"#fff"}
                    h="64px"
                    w="100%"
                    fontSize={"lg"}
                    onClick={() => handleCheckOut()}
                    _hover={{ opacity: 0.85 }}
                  >
                    Checkout
                  </Button>
                </Box>
                <Box mt="1rem" w="100%" px={8}>
                  <HStack
                    w="100%"
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <Text
                      borderBottom={"1px solid"}
                      cursor={"pointer"}
                      pb="4px"
                      onClick={() => router.push("/products")}
                    >
                      Continue Shopping
                    </Text>
                  </HStack>
                </Box>
              </Box>
            </VStack>
          </GridItem>
        </Grid>
      )}
    </Box>
  );
}

export default withNavLayout(CartScreen);
