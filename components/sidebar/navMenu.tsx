import {
  Box,
  LinkBox,
  LinkOverlay,
  List,
  ListIcon,
  ListItem,
} from "@chakra-ui/layout";
import NextLink from "next/link";
import {
  MdHome,
  MdSearch,
  MdLibraryMusic,
  MdPlaylistAdd,
  MdFavorite,
} from "react-icons/md";

const navArr = [
  {
    name: "Home",
    icon: MdHome,
    route: "/",
  },
  {
    name: "Search",
    icon: MdSearch,
    route: "/search",
  },
  {
    name: "Your Library",
    icon: MdLibraryMusic,
    route: "/lib",
  },
];

const musicMenu = [
  {
    name: "Create Playlist",
    icon: MdPlaylistAdd,
    route: "/",
  },
  {
    name: "Favorites",
    icon: MdFavorite,
    route: "/favorites",
  },
];

const NavMenu = () => {
  return (
    <Box marginBottom="20px">
      <List spacing={2} marginBottom="20px">
        {navArr.map((i) => (
          <ListItem paddingX="20px" fontSize="16px" key={i.name}>
            <LinkBox>
              <NextLink href={i.route} passHref>
                <LinkOverlay>
                  <ListIcon as={i.icon} color="white" marginRight="20px" />
                  {i.name}
                </LinkOverlay>
              </NextLink>
            </LinkBox>
          </ListItem>
        ))}
      </List>
      <List spacing={2}>
        {musicMenu.map((i) => (
          <ListItem paddingX="20px" fontSize="16px" key={i.name}>
            <LinkBox>
              <NextLink href={i.route} passHref>
                <LinkOverlay>
                  <ListIcon as={i.icon} color="white" marginRight="20px" />
                  {i.name}
                </LinkOverlay>
              </NextLink>
            </LinkBox>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default NavMenu;
