import {useEffect, useRef, useState} from "react";
import {Box, Button, Card, Container, Flex, Group, List, Text, Title,} from "@mantine/core";
import {TwistyPlayer} from "cubing/twisty";
import {useMediaQuery} from "@mantine/hooks";
import classes from "./CrossStep.module.css";

interface CornerStep {
  alg: string;
  description: string;
  detailedExplanation: string[];
}

const cornerScrambleNiklas = "z2 r U R' U' r' F R F'  r U R' U' r' F R F'";
const cornerScrambleCase1 =
  "z2 R U' R' U' R U R D R' U' R D' R' U2 R' U' R U2 R' U' R U' R' U2 R U R' U R U2' R' U' R U R' U R U2' R' x R' U R' D2 R U' R' D2 R2 x' ";
const cornerScrambleCase2 =
  "z2 R U' R' U' R U R D R' U' R D' R' U2 R' U' R U2 R' U' R U' R' U2 R U R' U R U2' R' U' R U R' U R U2' R'";

const cornerSteps: CornerStep[] = [
  {
    alg: "R U' L' U R' U' L U",
    description: "Niklas Algorithm",
    detailedExplanation: [
      "Move the right pair to the top and back (R U').",
      "Move the left pair to the top and back (L' U).",
      "Return the right pair to its place (R' U').",
      "Return the left pair to its place (L U).",
    ],
  },
  {
    alg: "R U' L' U R' U' L U U2 R U' L' U R' U' L U'",
    description: "Case 1: No corners are correct",
    detailedExplanation: [
      "Perform the Niklas algorithm from any orientation.",
      "This should position one corner correctly.",
      "Follow the setps for Case 2",
    ],
  },
  {
    alg: "U2 R U' L' U R' U' L U R U' L' U R' U' L U'",
    description: "Case 2: One corner is correct",
    detailedExplanation: [
      "Hold the cube so the correct corner is at the front left.",
      "Perform the Niklas algorithm.",
      "If needed, repeat until all corners are correctly positioned.",
    ],
  },
];

const YellowCorners = () => {
  const niklasPlayerRef = useRef<HTMLDivElement>(null);
  const case1PlayerRef = useRef<HTMLDivElement>(null);
  const case2PlayerRef = useRef<HTMLDivElement>(null);
  const niklasTwistyPlayerRef = useRef<TwistyPlayer | null>(null);
  const case1TwistyPlayerRef = useRef<TwistyPlayer | null>(null);
  const case2TwistyPlayerRef = useRef<TwistyPlayer | null>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isPlayingNiklas, setIsPlayingNiklas] = useState(false);
  const [isPlayingCase1, setIsPlayingCase1] = useState(false);
  const [isPlayingCase2, setIsPlayingCase2] = useState(false);

  const initializeCornerPlayers = () => {
    if (
      niklasPlayerRef.current &&
      case1PlayerRef.current &&
      case2PlayerRef.current
    ) {
      niklasPlayerRef.current.innerHTML = "";
      case1PlayerRef.current.innerHTML = "";
      case2PlayerRef.current.innerHTML = "";

      const niklasPlayer = new TwistyPlayer({
        puzzle: "3x3x3",
        alg: cornerSteps[0].alg,
        experimentalSetupAlg: cornerScrambleNiklas,
        hintFacelets: "none",
        backView: "none",
        background: "none",
        controlPanel: "none",
        tempoScale: 0.8,
      });
      niklasTwistyPlayerRef.current = niklasPlayer;
      niklasPlayerRef.current.appendChild(niklasPlayer);

      const case1Player = new TwistyPlayer({
        puzzle: "3x3x3",
        alg: cornerSteps[1].alg,
        experimentalSetupAlg: cornerScrambleCase1,
        hintFacelets: "none",
        backView: "none",
        background: "none",
        controlPanel: "none",
        tempoScale: 0.8,
      });
      case1TwistyPlayerRef.current = case1Player;
      case1PlayerRef.current.appendChild(case1Player);

      const case2Player = new TwistyPlayer({
        puzzle: "3x3x3",
        alg: cornerSteps[2].alg,
        experimentalSetupAlg: cornerScrambleCase2,
        hintFacelets: "none",
        backView: "none",
        background: "none",
        controlPanel: "none",
        tempoScale: 0.8,
      });
      case2TwistyPlayerRef.current = case2Player;
      case2PlayerRef.current.appendChild(case2Player);
    }
  };

  useEffect(() => {
    initializeCornerPlayers();
  }, []);

  const handlePlayNiklas = () => {
    if (niklasTwistyPlayerRef.current) {
      if (isPlayingNiklas) {
        niklasTwistyPlayerRef.current.pause();
      } else {
        niklasTwistyPlayerRef.current.play();
      }
      setIsPlayingNiklas(!isPlayingNiklas);
    }
  };

  const handlePlayCase1 = () => {
    if (case1TwistyPlayerRef.current) {
      if (isPlayingCase1) {
        case1TwistyPlayerRef.current.pause();
      } else {
        case1TwistyPlayerRef.current.play();
      }
      setIsPlayingCase1(!isPlayingCase1);
    }
  };

  const handlePlayCase2 = () => {
    if (case2TwistyPlayerRef.current) {
      if (isPlayingCase2) {
        case2TwistyPlayerRef.current.pause();
      } else {
        case2TwistyPlayerRef.current.play();
      }
      setIsPlayingCase2(!isPlayingCase2);
    }
  };

  const handleResetCorner = (index: number) => {
    if (index === 0 && niklasTwistyPlayerRef.current) {
      niklasTwistyPlayerRef.current.timestamp = 0;
      setIsPlayingNiklas(false);
    } else if (index === 1 && case1TwistyPlayerRef.current) {
      case1TwistyPlayerRef.current.timestamp = 0;
      setIsPlayingCase1(false);
    } else if (index === 2 && case2TwistyPlayerRef.current) {
      case2TwistyPlayerRef.current.timestamp = 0;
      setIsPlayingCase2(false);
    }
  };

  return (
    <Container size="lg">
      <Title
        order={3}
        mb="xs"
        mt="3rem"
        style={{ fontSize: isMobile ? "1.75rem" : "2.5rem" }}
        className={classes.title}
        ta="center"
        lts="-0.05em"
      >
        Solving the Yellow Corners
      </Title>
      <Group mb="xl" justify="center">
        <Text ta="center" style={{ maxWidth: "600px" }}>
          Now, we need to place the yellow corners in their correct positions.
          To adjust the corners, we’ll use an algorithm called "Niklas."
        </Text>
      </Group>
      <Flex
        gap="xl"
        direction={isMobile ? "column" : "row"}
        justify="center"
        mb="xl"
      >
        <Flex gap="xl" direction={isMobile ? "column" : "row"} align="center">
          <Card
            shadow="sm"
            radius="lg"
            withBorder
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              ref={niklasPlayerRef}
              style={{
                width: "300px",
                display: "flex",
                justifyContent: "center",
              }}
            />
            <Box mt="md" ta="center">
              <Button
                radius="md"
                variant="light"
                onClick={handlePlayNiklas}
                mr="xs"
                color={isPlayingNiklas ? "red" : "blue"}
              >
                {isPlayingNiklas ? "Stop" : "Play"}
              </Button>
              <Button
                radius="md"
                variant="outline"
                onClick={() => handleResetCorner(0)}
              >
                Reset
              </Button>
            </Box>
          </Card>
          <Box>
            <Text fw={700} size="xl">
              {cornerSteps[0].description}
            </Text>
            <List type="ordered" mb="xl" spacing="md">
              {cornerSteps[0].detailedExplanation.map((point, pointIndex) => (
                <List.Item key={pointIndex}>{point}</List.Item>
              ))}
            </List>
          </Box>
        </Flex>
      </Flex>
      <Flex
        gap="xl"
        direction={isMobile ? "column" : "row"}
        justify="space-between"
        align="stretch"
        style={{ maxWidth: "100%", margin: "0 auto" }}
      >
        {cornerSteps.slice(1).map((step, index) => (
          <Flex
            key={index + 1}
            gap="xl"
            direction="column"
            align={isMobile ? "center" : "flex-start"}
            style={{ flex: 1 }}
          >
            <Card
              shadow="sm"
              radius="lg"
              withBorder
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                ref={index === 0 ? case1PlayerRef : case2PlayerRef}
                style={{
                  width: "300px",
                  display: "flex",
                  justifyContent: "center",
                }}
              />
              <Box mt="md" ta="center">
                <Button
                  radius="md"
                  variant="light"
                  onClick={index === 0 ? handlePlayCase1 : handlePlayCase2}
                  mr="xs"
                  color={
                    (index === 0 && isPlayingCase1) ||
                    (index === 1 && isPlayingCase2)
                      ? "red"
                      : "blue"
                  }
                >
                  {(index === 0 && isPlayingCase1) ||
                  (index === 1 && isPlayingCase2)
                    ? "Stop"
                    : "Play"}
                </Button>
                <Button
                  radius="md"
                  variant="outline"
                  onClick={() => handleResetCorner(index + 1)}
                >
                  Reset
                </Button>
              </Box>
            </Card>

            <Box style={{maxWidth: "90%",}}>
              <Text fw={700} size="xl" mb="md">
                {step.description}
              </Text>
              <List type="ordered" mb="xl" spacing="md">
                {step.detailedExplanation.map((point, pointIndex) => (
                  <List.Item key={pointIndex}>{point}</List.Item>
                ))}
              </List>
            </Box>
          </Flex>
        ))}
      </Flex>
    </Container>
  );
};

export default YellowCorners;
