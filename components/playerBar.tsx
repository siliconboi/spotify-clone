import { Box, Flex, Text } from "@chakra-ui/layout";
import Player from "./player";

const PlayerBar = () => {
  return (
    <Box height="100px" width="100vw" bgColor="rgb(12,12,12)" padding="10px">
      <Flex align="center">
        <Box padding="20px" color="white" width="30%">
          <Text fontSize="large">Song name</Text>
          <Text fontSize="sm">Artist name</Text>
        </Box>
        <Box width="40%" color="white"><Player/></Box>
      </Flex>
    </Box>
  );
};

export default PlayerBar;