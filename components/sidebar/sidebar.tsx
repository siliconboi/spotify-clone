import NextImage from "next/image";
import {
  Box,
  List,
  ListItem,
  ListIcon,
  Divider,
  Center,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/layout";
import NavMenu from "./navMenu";

const Sidebar = () => {
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
              opacity: "0",
            },
            "::-webkit-scrollbar-thumb": {
              color: "white",
            },
          }}
        >
          {new Array(50).fill(1).map(() => (
            <h1>hi</h1>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
