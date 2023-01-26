import NextImage from "next/image";
import {
  Box,
  List,
  ListItem,
  Divider,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/layout";
import NextLink from "next/link";
import NavMenu from "./navMenu";
import { usePlaylists } from "../../lib/hooks";

const Sidebar = () => {
  const { playlists, isLoading } = usePlaylists();
  return (
    <Box
      width="100%"
      height="calc(100vh - 100px)"
      bg="black"
      paddingX="5px"
      color="gray"
    >
      <Box paddingY="20px" height="100%">
        <Box width="200px" marginBottom="20px" paddingX="20px">
          <NextImage src="/logo.png" height={60} width={200} />
        </Box>
        <NavMenu />
        <Divider color="gray.800" />
        <Box
          height="50%"
          overflowY="auto"
          paddingY="20px"
          sx={{
            "::-webkit-scrollbar": {
              width: "10px",
            },
            "::-webkit-scrollbar-track": {
              opacity: "1",
            },
            "::-webkit-scrollbar-thumb": {
              bgColor: "gray.200",
              borderRadius: "15pt",
            },
          }}
        >
          {!isLoading ? (
            <List spacing={2}>
              {playlists.map((playlist) => (
                <ListItem paddingX="20px" key={playlist.id}>
                  <LinkBox>
                    <NextLink
                      href={{
                        pathname: "/playlists/[id]",
                        query: { id: playlist.id },
                      }}
                      passHref
                    >
                      <LinkOverlay>{playlist.name}</LinkOverlay>
                    </NextLink>
                  </LinkBox>
                </ListItem>
              ))}
            </List>
          ) : (
            // eslint-disable-next-line jsx-a11y/heading-has-content
            <h1 />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
