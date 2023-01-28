import { Box } from "@chakra-ui/layout";
import { Table, Thead, Td, Tr, Tbody, Th, IconButton } from "@chakra-ui/react";
import { BsFillPlayFill } from "react-icons/bs";
import { AiOutlineClockCircle } from "react-icons/ai";
import { useStoreActions } from "easy-peasy";
import { formatDate, formatTime } from "../lib/formatters";

const SongsTable = ({ songs }) => {
  const playSongs = useStoreActions(
    (actions: any) => actions.changeActiveSongs
  );
  const setActiveSong = useStoreActions(
    (actions: any) => actions.changeActiveSong
  );

  const handlePlay = (activeSong?) => {
    setActiveSong(activeSong || songs[0]);
    playSongs(songs)
  };
  return (
    <Box bg="transparent">
      <Box padding="10px" marginBottom="20px">
        <IconButton
          icon={<BsFillPlayFill fontSize="30px" />}
          aria-label="play"
          colorScheme="green"
          size="lg"
          isRound
          marginBottom="20px"
          onClick={() => handlePlay()}
        />
        <Table variant="unstyled">
          <Thead borderBottom="1px solid" borderColor="rgba(255,255,255,0.5)">
            <Tr>
              <Th>#</Th>
              <Th>Title</Th>
              <Th>Date Added</Th>
              <Th>
                <AiOutlineClockCircle fontSize="17px" />
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {songs?.map((song, i) => (
              <Tr
                sx={{
                  transition: "all .3s",
                  "&:hover": {
                    bgColor: "rgba(255,255,255,0.2)",
                  },
                }}
                key={song.id}
                cursor="pointer"
                onClick={() => handlePlay(song)}
              >
                <Td>{i + 1}</Td>
                <Td>{song.name}</Td>
                <Td>{formatDate(song.createdAt)}</Td>
                <Td>{formatTime(song.duration)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default SongsTable;
