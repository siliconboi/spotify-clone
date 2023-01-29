import { Box, Flex, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import { GradientLayout } from "../components/gradientLayout";
import { useMe } from "../lib/hooks";
import prisma from "../lib/prisma";

// eslint-disable-next-line react/function-component-definition
const Home = ({ artists, playlistCount }) => {
  const { user, isLoading } = useMe();
  return (
    <GradientLayout
      color="red"
      title={
        isLoading || user.firstName === ""
          ? "User"
          : `${user.firstName} ${user.lastName}`
      }
      subtitle="profile"
      description={`${playlistCount} public playlists`}
      image="./user.png"
      isRounded
    >
      <Box color="white" paddingX="40px">
        <Box marginBottom="20px">
          <Text fontSize="2xl" fontWeight="bold">
            Top artists this month
          </Text>
        </Box>
        <Flex>
          {artists.map((artist) => (
            <Box
              bgColor="rgb(48,48,48)"
              padding="10px"
              marginX="10px"
              borderRadius="4px"
              width="30%"
            >
              <a href={`/artist/${artist.id}`}>
                <Box>
                  <Image
                    src="https://placekitten.com/300/300"
                    borderRadius="100%"
                    marginBottom="10px"
                  />
                  <Text fontSize="l" fontWeight="bold">
                    {artist.name}
                  </Text>
                  <Text fontSize="sm" color="gray" fontWeight="medium">
                    Artist
                  </Text>
                </Box>
              </a>
            </Box>
          ))}
        </Flex>
      </Box>
    </GradientLayout>
  );
};

export const getServerSideProps = async () => {
  const artists = await prisma.artist.findMany({
    take: 5,
  });
  const playlistCount = await prisma.playlist.count();
  return {
    props: { artists, playlistCount },
  };
};

export default Home;
