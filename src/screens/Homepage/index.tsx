import { useRootContext } from "@/context/root";
import usePersistedState from "@/hooks/usePersistedState";
import { withNavLayout } from "@/layouts";
import {
  Box,
  Button,
  Center,
  Grid,
  GridItem,
  HStack,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import { useMemo } from "react";
import Footer from "./footer";
import { Product, ProductCard } from "./product";

interface CategoriesProps {
  products: Product[];
  selected: string;
  isProductPage?: boolean;
  setCat: (value: string) => void;
}

interface NewArrivalsProps {
  products: Product[];
  addToCart: (item: Product) => void;
  removeFromCart: (id: string) => void;
}

const products = [
  {
    id: "1",
    category: "t-shirts",
    name: "Stylish T-Shirt",
    price: "$20",
    actualPrice: 20,
    newArrival: true,
    image: "/clothings/item1.png",
  },
  {
    id: "2",
    category: "pants",
    name: "Comfortable Pants",
    price: "$35",
    actualPrice: 35,
    newArrival: true,
    image: "/clothings/item2.png",
  },
  {
    id: "3",
    category: "jackets",
    name: "Leather Jacket",
    price: "$100",
    actualPrice: 100,
    newArrival: false,
    image: "/clothings/item3.png",
  },
  {
    id: "4",
    category: "sweatshirts",
    name: "Cozy Sweatshirt",
    price: "$50",
    actualPrice: 50,
    newArrival: false,
    image: "/clothings/item4.png",
  },
  {
    id: "5",
    category: "shirts",
    name: "Formal Shirt",
    price: "$30",
    actualPrice: 30,
    newArrival: true,
    image: "/clothings/item5.png",
  },
  {
    id: "6",
    category: "shirts",
    name: "Black Neuve Shirt",
    price: "$30",
    actualPrice: 30,
    newArrival: true,
    image: "/clothings/item5.png",
  },
];

const categories = [
  { label: "All", value: "all" },
  { label: "T-Shirt", value: "t-shirts" },
  { label: "Pants", value: "pants" },
  { label: "Jackets", value: "jackets" },
  { label: "Sweatshirts", value: "sweatshirts" },
  { label: "Shirts", value: "shirts" },
];

function HomeScreen({ isProductPage }: { isProductPage?: boolean }) {
  const { addToCart, removeFromCart } = useRootContext();
  const { state: selectedCat, updateState: setCat } = usePersistedState({
    key: "hng-selected-categories",
    initialState: { selected: "all" },
  });

  const selectedCategoryProducts = useMemo(() => {
    return products.filter(
      (product) =>
        product.category === selectedCat.selected ||
        selectedCat?.selected === "all"
    );
  }, [selectedCat?.selected]);

  const newArrivalsProducts = useMemo(
    () => products.filter((product) => product.newArrival),
    []
  );

  return (
    <Box>
      {!isProductPage && <HeroSection />}
      <Categories
        selected={selectedCat?.selected}
        setCat={(s: string) => setCat({ selected: s })}
        products={selectedCategoryProducts}
        isProductPage={isProductPage}
      />
      <NewArrivals
        products={newArrivalsProducts}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
      />
      <SubscribeNewsletter />
      <Footer />
    </Box>
  );
}

function HeroSection() {
  const router = useRouter();

  return (
    <Box
      w="100%"
      backgroundImage={`url(hng-hero.png)`}
      height={{ base: "26rem", xs: "20rem", md: "24rem", lg: "28rem" }}
      backgroundSize="cover"
      backgroundPosition="center"
    >
      <HStack alignItems="center" py="3rem" w="100%" color="#fff">
        <Center w="100%" mt={{ base: "1rem", sm: "2rem" }}>
          <Box maxW="30rem" textAlign="center">
            <VStack gap={0} mb={{ base: "1rem", sm: "2rem" }}>
              <Text fontWeight={700} fontSize={["md", "xl", "2xl"]}>
                ELEVATE YOUR STYLE WITH
              </Text>
              <Text fontWeight={700} fontSize={["md", "xl", "2xl"]}>
                OUR COLLECTIONS
              </Text>
              <Text fontWeight={700} fontSize={["md", "xl", "2xl"]}>
                FOR THE MODERN MAN
              </Text>
            </VStack>
            <Text mb={{ base: "1rem", sm: "2rem" }}>
              Lets get you started with our amazing collections. Explore new
              styles, trends and experience tailored for the modern man.
            </Text>
            <Center gap={4} flexWrap="wrap">
              <Button
                bg="#1B272D"
                color="#fff"
                px="3rem"
                _hover={{ opacity: "0.75" }}
                onClick={() => router.push("/cart")}
              >
                Shop
              </Button>
              <Button
                bg="#D9D9D9"
                color="#000"
                px="3rem"
                onClick={() => router.push("/products")}
              >
                Products
              </Button>
            </Center>
          </Box>
        </Center>
      </HStack>
    </Box>
  );
}

function Categories({ products, selected, setCat }: CategoriesProps) {
  return (
    <Center w="100%">
      <Box py="2rem" w="100%" px="2rem">
        <HStack justify="center" wrap="wrap" spacing={4}>
          {categories.map((c) => {
            const isSelected = c.value === selected;
            return (
              <Box
                key={c.value}
                px="1rem"
                py="4px"
                borderRadius={"4px"}
                bg={isSelected ? "#000" : "transparent"}
                color={isSelected ? "#fff" : "#000"}
                cursor="pointer"
                _hover={{
                  borderBottom: "1px solid #000",
                  borderRadius: isSelected ? "4px" : "0px",
                }}
                onClick={() => setCat(c.value)}
              >
                {c.label}
              </Box>
            );
          })}
        </HStack>
        <Box py="2rem">
          {!products?.length && (
            <Center px="2rem" py="4rem">
              <Box>No products available in this category</Box>
            </Center>
          )}
          <Grid
            templateColumns={[
              "repeat(1, 1fr)",
              "repeat(2, 1fr)",
              "repeat(2, 1fr)",
              "repeat(3, 1fr)",
              "repeat(4, 1fr)",
            ]}
            gap={6}
          >
            {products.map((product) => (
              <GridItem key={product.id}>
                <ProductCard product={product} />
              </GridItem>
            ))}
          </Grid>
        </Box>
      </Box>
    </Center>
  );
}

// NewArrivals Component
function NewArrivals({ products }: NewArrivalsProps) {
  return (
    <Center w="100%">
      <Box py="2rem" w="100%" px="2rem">
        <Text fontSize="2xl" textAlign="center" mb="1rem">
          New Arrivals
        </Text>
        {!products?.length && (
          <Center px="2rem" py="4rem">
            <Box>No new items</Box>
          </Center>
        )}
        <Box py="2rem">
          <Grid
            templateColumns={[
              "repeat(1, 1fr)",
              "repeat(2, 1fr)",
              "repeat(2, 1fr)",
              "repeat(3, 1fr)",
              "repeat(4, 1fr)",
            ]}
            gap={6}
          >
            {products.map((product) => (
              <GridItem key={product.id}>
                <ProductCard product={product} />
              </GridItem>
            ))}
          </Grid>
        </Box>
      </Box>
    </Center>
  );
}

function SubscribeNewsletter() {
  return (
    <Box py="4rem" w="100%" bg="#D9D9D9" textAlign="center">
      <Text fontSize="2xl" mb="1rem">
        Subscribe to Our Newsletter
      </Text>
      <Box>
        <Input
          placeholder="Your name"
          bg="#fff"
          color={"#000"}
          size="lg"
          w={["60%", "40%"]}
          h="64px"
          mb="1rem"
        />
      </Box>
      <Box>
        <Input
          placeholder="Your email address"
          bg="#fff"
          color={"#000"}
          size="lg"
          w={["60%", "40%"]}
          h="64px"
          mb="1rem"
        />
      </Box>
      <Button size="lg" bg="#1B272D" color="#fff" _hover={{ opacity: "0.85" }}>
        Subscribe
      </Button>
    </Box>
  );
}

// function Footer() {
//   return (
//     <Box py="2rem" w="100%" bg="#1B272D" color="#fff" textAlign="center">
//       <Text>© 2024 Your Company. All rights reserved.</Text>
//     </Box>
//   );
// }

export default withNavLayout(HomeScreen);
