import { Box, Grid, GridItem, Link, Text, VStack } from "@chakra-ui/react";

function Footer() {
  return (
    <Box py="4rem" w="100%" bg="#0B191E" color="#fff">
      <Grid
        templateColumns={["1fr", "repeat(4, 1fr)"]}
        gap={8}
        textAlign={["center", "left"]}
        px="2rem"
      >
        <GridItem>
          <VStack align={["center", "flex-start"]} spacing={2}>
            <Text fontSize="lg" fontWeight="bold">
              ShopMen
            </Text>
            <Link href="#">About us</Link>
            <Link href="#">Blog</Link>
            <Link href="#">Event</Link>
            <Link href="#">Our Stores</Link>
          </VStack>
        </GridItem>
        <GridItem>
          <VStack align={["center", "flex-start"]} spacing={2}>
            <Text fontSize="lg" fontWeight="bold">
              Company
            </Text>
            <Link href="#">Contact us</Link>
            <Link href="#">info@hng.tech</Link>
            <Link href="#">+23470 3000 001</Link>
          </VStack>
        </GridItem>
        <GridItem>
          <VStack align={["center", "flex-start"]} spacing={2}>
            <Text fontSize="lg" fontWeight="bold">
              Terms and conditions
            </Text>
            <Link href="#">Policy</Link>
            <Link href="#">Legal</Link>
            <Link href="#">License</Link>
          </VStack>
        </GridItem>
        <GridItem>
          <VStack align={["center", "flex-start"]} spacing={2}>
            <Text fontSize="lg" fontWeight="bold">
              © 2024 ShopMen
            </Text>
            <Link href="#">All rights reserved.</Link>
          </VStack>
        </GridItem>
      </Grid>
    </Box>
  );
}

export default Footer;
