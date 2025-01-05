import {useEffect, useRef, useState} from "react";
import {Box, Button, Card, Container, Flex, Group, List, Text, Title,} from "@mantine/core";
import {TwistyPlayer} from "cubing/twisty";
import {useMediaQuery} from "@mantine/hooks";
import classes from "./CrossStep.module.css";

interface EdgeStep {
  alg: string;
  description: string;
  detailedExplanation: string[];
}

const edgeScrambleSune = "z2 F R U R' U' R U R' U' R U R' U' F'";
const edgeScrambleCase1 =
  "z2 R U' R' U' R U R D R' U' R D' R' U2 R' U' R U2 R' U' R U' R' U2";
const edgeScrambleCase2 =
  "z2 R U' R' U' R U R D R' U' R D' R' U2 R' U' R U2 R' U' R U' R' U2 R U R' U R U2 R' y2 U2";

const edgeSteps: EdgeStep[] = [
  {
    alg: "R U R' U R U2' R'",
    description: "Sune Algorithm",
    detailedExplanation: [
      "Lift the pair into the top layer (R U R').",
      "Rotate the top layer clockwise (U).",
      "Place the pair back in a new position (R U2' R').",
    ],
  },
  {
    alg: "R U R' U R U2' R' U' R U R' U R U2' R'",
    description: "Case 1: Two correct edges are across from each other",
    detailedExplanation: [
      "Perform Sune from any starting position.",
      "Check the edges again — now two matching edges should be side by side.",
      "Follow the steps for Case 2",
    ],
  },
  {
    alg: "U' R U R' U R U2' R' U2",
    description: "Case 2: Two edges in correct order are next to each other",
    detailedExplanation: [
      "Hold the cube so that the matching edges are at the back and right.",
      "Perform the Sune Algorithm.",
      "This should align all four edges with their centers.",
    ],
  },
];

const YellowEdges = () => {
  const sunePlayerRef = useRef<HTMLDivElement>(null);
  const case1PlayerRef = useRef<HTMLDivElement>(null);
  const case2PlayerRef = useRef<HTMLDivElement>(null);
  const suneTwistyPlayerRef = useRef<TwistyPlayer | null>(null);
  const case1TwistyPlayerRef = useRef<TwistyPlayer | null>(null);
  const case2TwistyPlayerRef = useRef<TwistyPlayer | null>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isPlayingSune, setIsPlayingSune] = useState(false);
  const [isPlayingCase1, setIsPlayingCase1] = useState(false);
  const [isPlayingCase2, setIsPlayingCase2] = useState(false);
  const [stickeringMode, setStickeringMode] = useState<"full" | "Cross">(
    "full"
  );

  const initializeEdgePlayers = () => {
    if (
      sunePlayerRef.current &&
      case1PlayerRef.current &&
      case2PlayerRef.current
    ) {
      sunePlayerRef.current.innerHTML = "";
      case1PlayerRef.current.innerHTML = "";
      case2PlayerRef.current.innerHTML = "";

      const sunePlayer = new TwistyPlayer({
        puzzle: "3x3x3",
        alg: edgeSteps[0].alg,
        experimentalSetupAlg: edgeScrambleSune,
        experimentalStickering: stickeringMode,
        hintFacelets: "none",
        backView: "none",
        background: "none",
        controlPanel: "none",
        tempoScale: 0.8,
      });
      suneTwistyPlayerRef.current = sunePlayer;
      sunePlayerRef.current.appendChild(sunePlayer);

      const case1Player = new TwistyPlayer({
        puzzle: "3x3x3",
        alg: edgeSteps[1].alg,
        experimentalSetupAlg: edgeScrambleCase1,
        experimentalStickering: stickeringMode,
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
        alg: edgeSteps[2].alg,
        experimentalSetupAlg: edgeScrambleCase2,
        experimentalStickering: stickeringMode,
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
    initializeEdgePlayers();
  }, [stickeringMode]);

  const handlePlaySune = () => {
    if (suneTwistyPlayerRef.current) {
      if (isPlayingSune) {
        suneTwistyPlayerRef.current.pause();
      } else {
        suneTwistyPlayerRef.current.play();
      }
      setIsPlayingSune(!isPlayingSune);
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

  const handleResetEdge = (index: number) => {
    if (index === 0 && suneTwistyPlayerRef.current) {
      suneTwistyPlayerRef.current.timestamp = 0;
      setIsPlayingSune(false);
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
        Solving the Yellow Edges
      </Title>
      <Group justify="center" mb="xl">
        <Text
          className={classes.description}
          ta="center"
          style={{ maxWidth: "800px" }}
        >
          Our goal is to place the yellow edge pieces in their correct positions
          so they match the center colors. To do this, we'll use an algorithm
          called "Sune," which helps reposition the edges.
        </Text>
      </Group>

      <Flex
        direction={isMobile ? "column" : "row-reverse"}
        gap="xl"
        justify="center"
        mb="xl"
      >
        <Card
          shadow="sm"
          radius="lg"
          withBorder
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Button
            radius="md"
            size="xs"
            variant="light"
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              zIndex: 10,
            }}
            onClick={() =>
              setStickeringMode((prev) => (prev === "full" ? "Cross" : "full"))
            }
          >
            {stickeringMode === "full" ? "Yellow Edges" : "Full"}
          </Button>
          <div
            ref={sunePlayerRef}
            style={{
              width: "400px",
              display: "flex",
              justifyContent: "center",
            }}
          />
          <Box mt="md" ta="center">
            <Button
              radius="md"
              variant="light"
              onClick={handlePlaySune}
              mr="xs"
              color={isPlayingSune ? "red" : "blue"}
            >
              {isPlayingSune ? "Stop" : "Play"}
            </Button>
            <Button
              radius="md"
              variant="outline"
              onClick={() => handleResetEdge(0)}
            >
              Reset
            </Button>
          </Box>
        </Card>
        <Box style={{ maxWidth: "600px" }}>
          <Text fw={700} size="xl" ta={isMobile ? "left" : "right"}>
            {edgeSteps[0].description}
          </Text>
          <List type="ordered" spacing="md" ta={isMobile ? "left" : "right"}>
            {edgeSteps[0].detailedExplanation.map((point, pointIndex) => (
              <List.Item key={pointIndex}>{point}</List.Item>
            ))}
          </List>
        </Box>
      </Flex>
      {/* Sune Algorithm Card */}

      {/* Two Cases Below */}
      <Flex
        gap="xl"
        direction={isMobile ? "column" : "row"}
        justify="space-between"
        align="stretch"
        style={{ maxWidth: "100%", margin: "0 auto" }}
      >
        {edgeSteps.slice(1).map((step, index) => (
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
              <Button
                radius="md"
                size="xs"
                variant="light"
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  zIndex: 10,
                }}
                onClick={() =>
                  setStickeringMode((prev) =>
                    prev === "full" ? "Cross" : "full"
                  )
                }
              >
                {stickeringMode === "full" ? "Yellow Edges" : "Full"}
              </Button>
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
                  onClick={() => handleResetEdge(index + 1)}
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

export default YellowEdges;
