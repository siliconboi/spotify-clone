import { GradientLayout } from "../../components/gradientLayout";
import prisma from "../../lib/prisma";
import ArtistTable from "../../components/artistTable";

const ArtistSongs = ({ songs }) => {
  return (
    <GradientLayout
      color="red"
      title={songs[0]?.artist.name}
      subtitle="songs"
      description={`${songs?.length} songs`}
      image="https://picsum.photos/300/300 "
    >
      <ArtistTable songs={songs} />
    </GradientLayout>
  );
};

export const getServerSideProps = async ({ query }) => {
  let songs;
  try {
    songs = await prisma.song.findMany({
      where: {
        artistId: +query.id,
      },
      include: {
        artist: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  } catch (e) {
    return {
      props: {},
    };
  }
  return {
    props: { songs },
  };
};

export default ArtistSongs;
