import { Box, Flex, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";

export const GradientLayout = ({
  color,
  children,
  image,
  title,
  subtitle,
  description,
  isRounded,
}) => {
  return (
    <Box
      height="calc(100vh - 100px)"
      overflowY="auto"
      bgGradient={`linear(${color}.500 0%, ${color}.600 20%, ${color}.700 50%, rgba(0,0,0,0.95) 75%)`}
    >
      <Flex bgColor={`${color}.500`} padding="40px" align="end">
        <Box padding="10px">
          <Image
            boxSize="160px"
            boxShadow="2xl"
            src={image}
            borderRadius={isRounded ? "100%" : "3px"}
          />
        </Box>
        <Box padding="10px" lineHeight="40px" color="white">
          <Text fontSize="sm" fontWeight="bold" casing="uppercase">
            {subtitle}
          </Text>
          <Text fontSize="6xl" fontWeight="bold">
            {title}
          </Text>
          <Text fontSize="sm" fontWeight="hairline">
            {description}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};
