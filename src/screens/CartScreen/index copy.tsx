import { useRootContext } from "@/context/root";
import { withNavLayout } from "@/layouts";
import { CloseIcon } from "@chakra-ui/icons";
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

function CartScreen() {
  const { cartState, removeFromCart, cartPlus, cartMinus } = useRootContext();

  const totalValue = cartState.reduce(
    (total, item) => total + item.actualPrice * item.qty,
    0
  );

  return (
    <Box py="2rem" w="100%" px="2rem">
      <Text fontSize="2xl" mb="1rem">
        Your Cart
      </Text>
      {cartState.length === 0 ? (
        <Center py="4rem">
          <Text>No items in cart</Text>
        </Center>
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
                  <Box
                    as="img"
                    src={item.image}
                    alt={item.name}
                    w="80px"
                    h="80px"
                    objectFit="cover"
                  />
                  <VStack align="start" spacing={1} flex="1">
                    <Text>{item.name}</Text>
                    <Text>${item.price}</Text>
                    <HStack spacing={2}>
                      <Button size="sm" onClick={() => cartMinus(item.id)}>
                        -
                      </Button>
                      <Text>{item.quantity}</Text>
                      <Button size="sm" onClick={() => cartPlus(item.id)}>
                        +
                      </Button>
                    </HStack>
                  </VStack>
                  <IconButton
                    icon={<CloseIcon />}
                    aria-label="Remove item"
                    onClick={() => removeFromCart(item.id)}
                  />
                </HStack>
              ))}
            </VStack>
          </GridItem>
          <GridItem>
            <Box p={4} border="1px solid #ccc" borderRadius="md">
              <Text fontSize="xl" mb={4}>
                Order Summary
              </Text>
              <HStack justify="space-between" mb={4}>
                <Text>Total</Text>
                <Text>${totalValue.toFixed(2)}</Text>
              </HStack>
              <Button colorScheme="blue" w="100%">
                Checkout
              </Button>
            </Box>
          </GridItem>
        </Grid>
      )}
    </Box>
  );
}

export default withNavLayout(CartScreen);
