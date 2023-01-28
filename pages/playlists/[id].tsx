import { validateToken } from "../../lib/auth";
import { GradientLayout } from "../../components/gradientLayout";
import prisma from "../../lib/prisma";
import SongsTable from "../../components/songsTable";

const Playlist = ({ playlist }) => {
  return (
    <GradientLayout
      color="red"
      title={playlist?.name}
      subtitle="playlist"
      description={`${playlist?.songs.length} songs`}
      image="https://picsum.photos/300/300 "
    >
      <SongsTable songs={playlist?.songs} />
    </GradientLayout>
  );
};

export const getServerSideProps = async ({ query, req }) => {
  let user;
  try {
    user = validateToken(req.cookies.NAPSTIFY_ACCESS_TOKEN);
  } catch (e) {
    return {
      redirect: {
        permanent: false,
        path: "/signin",
      },
    };
  }
  let playlist;
  try {
    playlist = await prisma.playlist.findFirst({
      where: {
        id: +query.id,
        userId: user.id,
      },
      include: {
        songs: {
          include: {
            artist: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });
  } catch (e) {
    return {
      props: {}
    }
  }
  return {
    props: { playlist },
  };
};

export default Playlist;
