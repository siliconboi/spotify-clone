import { Box, Flex, Text } from "@chakra-ui/layout";
import { useStoreState } from "easy-peasy";
import Player from "./player";

const PlayerBar = () => {
  const songs = useStoreState((state: any) => state.activeSongs);
  const activeSong = useStoreState((state: any) => state.activeSong);

  return (
    <Box height="100px" width="100vw" bgColor="rgb(12,12,12)" padding="10px">
      <Flex align="center">
        <Box padding="20px" color="white" width="30%">
          {activeSong ? (
            <>
              <Text fontSize="large">{activeSong.name}</Text>
              <Text fontSize="sm">{activeSong.artist.name}</Text>
            </>
          ) : null}
        </Box>
        <Box width="70%" color="white">
          {activeSong ? <Player songs={songs} activeSong={activeSong} /> : null}
        </Box>
      </Flex>
    </Box>
  );
};

export default PlayerBar;
