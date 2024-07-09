import { useRootContext } from "@/context/root";
import { Box, Button, HStack, Text } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import { useCallback, useMemo } from "react";

export interface Product {
  id: string;
  category: string;
  name: string;
  price: string;
  newArrival: boolean;
  image: string;
}

export const ProductCard = ({ product }: { product: Product }) => {
  const router = useRouter();
  const { addToCart, removeFromCart, cartState } = useRootContext();

  const inCart = useMemo(() => {
    const matched = cartState?.find((c) => c.id === product.id);
    return !!matched;
  }, [cartState, product.id]);

  const openProduct = useCallback(() => {
    router.push(`products/${product.id}`);
  }, []);

  return (
    <Box>
      <Box border={"0.9px solid"} borderRadius={"4px"}>
        <Box
          as="img"
          src={product.image}
          alt={product.name}
          w="100%"
          h="300px"
          objectFit="cover"
          //   cursor="pointer"
          //   onClick={openProduct}
        />
      </Box>
      <HStack justifyContent={"space-between"} gap={4}>
        <Box>
          <Text mt="1rem">{product.name}</Text>
        </Box>
        {!inCart ? (
          <Button
            color="#fff"
            maxH="34px"
            bg="#000"
            _hover={{ opacity: "0.85" }}
            mt="0.5rem"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </Button>
        ) : (
          <Button
            color="#fff"
            maxH="34px"
            bg="#000"
            _hover={{ opacity: "0.85" }}
            mt="0.5rem"
            onClick={() => removeFromCart(product.id)}
          >
            Remove from Cart
          </Button>
        )}
      </HStack>
      <Text>{product.price}</Text>
    </Box>
  );
};
