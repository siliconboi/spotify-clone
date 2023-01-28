import {
  ButtonGroup,
  Box,
  IconButton,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderTrack,
  RangeSliderThumb,
  Center,
  Flex,
  Text,
} from "@chakra-ui/react";
import ReactHowler from "react-howler";
import { useEffect, useRef, useState } from "react";
import {
  MdShuffle,
  MdSkipPrevious,
  MdSkipNext,
  MdOutlinePlayCircleFilled,
  MdOutlinePauseCircleFilled,
  MdOutlineRepeat,
} from "react-icons/md";
import { AiFillSound } from "react-icons/ai";
import { useStoreActions } from "easy-peasy";
import { formatTime } from "../lib/formatters";

const Player = ({ songs, activeSong }) => {
  const [playing, setPlaying] = useState(true);
  const [sound, setSound] = useState(1.0);
  const [mute, setMute] = useState(false);
  const [index, setIndex] = useState(
    songs.findIndex((s) => s.id === activeSong.id)
  );
  const [seek, setSeek] = useState(0.0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [duration, setDuration] = useState(0.0);
  const soundRef = useRef(null);
  const repeatRef = useRef(repeat);
  const setActiveSong = useStoreActions((state) => state.changeActiveSong);
  const setPlayState = (value) => {
    setPlaying(value);
  };
  const onShuffle = () => {
    setShuffle((state) => !state);
  };
  const onRepeat = () => {
    setRepeat((state) => !state);
  };
  const onMute = () => {
    setMute((state) => !state);
  };
  const prevSong = () => {
    setIndex((state) => {
      return state ? state - 1 : songs.length - 1;
    });
  };
  const nextSong = () => {
    setIndex((state) => {
      if (shuffle) {
        const next = Math.floor(Math.random() * songs.length);
        if (next === state) {
          return nextSong();
        }
        return next;
      }
      return state === songs.length - 1 ? 0 : state - 1;
    });
  };
  const onEnd = () => {
    if (repeatRef.current) {
      setSeek(0);
      soundRef.current.seek(0);
    } else {
      nextSong();
    }
  };
  const onLoad = () => {
    const songDuration = soundRef.current.duration();
    setDuration(songDuration);
  };

  const onSeek = (e) => {
    setSeek(parseFloat(e[0]));
    soundRef.current.seek(e[0]);
  };

  const onVolumeSeek = (e) => {
    setSound(parseFloat(e[0]));
  };

  useEffect(() => {
    let timer;

    if (playing && !isSeeking) {
      const call = () => {
        setSeek(soundRef.current.seek());
        timer = requestAnimationFrame(call);
      };

      timer = requestAnimationFrame(call);
      return () => cancelAnimationFrame(timer);
    }

    cancelAnimationFrame(timer);
  }, [playing, isSeeking]);

  useEffect(() => {
    setActiveSong(songs[index]);
  }, [index, setActiveSong, songs]);

  useEffect(() => {
    repeatRef.current = repeat;
  }, [repeat]);

  return (
    <Flex>
      <Box width="57%">
        <Box>
          <ReactHowler
            playing={playing}
            src={activeSong?.url}
            ref={soundRef}
            mute={mute}
            volume={sound}
            onLoad={onLoad}
            onEnd={onEnd}
          />
        </Box>
        <Center>
          <ButtonGroup color="gray.600">
            <IconButton
              outline="none"
              variant="link"
              aria-label="shuffle"
              fontSize="24px"
              color={shuffle ? "white" : "gray.600"}
              icon={<MdShuffle />}
              onClick={onShuffle}
            />
            <IconButton
              outline="none"
              variant="link"
              aria-label="skip"
              fontSize="24px"
              icon={<MdSkipPrevious />}
              onClick={prevSong}
            />

            {!playing ? (
              <IconButton
                outline="none"
                variant="link"
                aria-label="play"
                color="white"
                fontSize="40px"
                icon={<MdOutlinePlayCircleFilled />}
                onClick={() => {
                  setPlayState(true);
                }}
              />
            ) : (
              <IconButton
                outline="none"
                variant="link"
                aria-label="pause"
                color="white"
                fontSize="40px"
                icon={<MdOutlinePauseCircleFilled />}
                onClick={() => {
                  setPlayState(false);
                }}
              />
            )}
            <IconButton
              outline="none"
              variant="link"
              aria-label="next"
              fontSize="24px"
              icon={<MdSkipNext />}
              onClick={nextSong}
            />
            <IconButton
              outline="none"
              variant="link"
              aria-label="repeat"
              color={repeat ? "white" : "gray.600"}
              fontSize="24px"
              icon={<MdOutlineRepeat />}
              onClick={onRepeat}
            />
          </ButtonGroup>
        </Center>
        <Box color="gray.600">
          <Flex justify="center" align="center">
            <Box width="10%">
              <Text fontSize="xs">{formatTime(seek)}</Text>
            </Box>
            <Box width="80%">
              <RangeSlider
                // eslint-disable-next-line jsx-a11y/aria-proptypes
                aria-label={["min", "max"]}
                step={0.1}
                min={0}
                id="player-range"
                max={duration ? duration.toFixed(2) : 0}
                onChange={onSeek}
                value={[seek]}
                onChangeStart={() => setIsSeeking(true)}
                onChangeEnd={() => setIsSeeking(false)}
              >
                <RangeSliderTrack bgColor="gray.800">
                  <RangeSliderFilledTrack bgColor="gray.600" />
                </RangeSliderTrack>
                <RangeSliderThumb index={0} />
              </RangeSlider>
            </Box>
            <Box width="10%">
              <Text fontSize="xs" textAlign="right">
                {formatTime(duration)}
              </Text>
            </Box>
          </Flex>
        </Box>
      </Box>

      <Box width="20%" marginLeft="auto" marginY="auto">
        <Flex>
          <IconButton
            outline="none"
            variant="link"
            aria-label="skip"
            fontSize="20px"
            color={mute ? "white" : "gray.600"}
            icon={<AiFillSound />}
            onClick={onMute}
          />
          <RangeSlider
            // eslint-disable-next-line jsx-a11y/aria-proptypes
            aria-label={["min", "max"]}
            step={0.05}
            min={0}
            id="volume-range"
            max={1}
            onChange={onVolumeSeek}
            value={[sound]}
          >
            <RangeSliderTrack bgColor="gray.800">
              <RangeSliderFilledTrack bgColor="gray.600" />
            </RangeSliderTrack>
            <RangeSliderThumb index={0} />
          </RangeSlider>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Player;
