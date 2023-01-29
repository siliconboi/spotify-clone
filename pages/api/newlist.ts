import { validateRoute } from "../../lib/auth";
import prisma from "../../lib/prisma";

export default validateRoute(async (req, res, user) => {
  const newlist = await prisma.playlist.create({
    data: {
      name: req.body.name,
      user: {
        connect: {
          id: user.id,
        },
      },
      songs: {
        connect: req.songs.map((song) => ({ id: song.id })),
      },
    },
  });
  return res.redirect(`/playlists/${newlist.id}`);
});
