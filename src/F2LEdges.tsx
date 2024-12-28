import { useEffect, useRef, useState } from "react";
import {
  Box,
  Title,
  Text,
  Card,
  Container,
  Button,
  List,
  Flex,
} from "@mantine/core";
import { TwistyPlayer } from "cubing/twisty";
import { useMediaQuery } from "@mantine/hooks";
import classes from "./F2LStep.module.css";

interface EdgeStep {
  alg: string;
  description: string;
  detailedExplanation: string[];
}

const edgeScramble = "z2";

const edgeSteps: EdgeStep[] = [
  {
    alg: "U R U' R' U' F' U F",
    description: "Edge goes right",
    detailedExplanation: [
      "Turn the top layer clockwise (U).",
      "Perform the righty algorithm (R U R' U').",
      "Turn the front face counterclockwise (F').",
      "Turn the top layer counterclockwise (U').",
      "Turn the front face clockwise (F).",
      "Reinsert the white corner piece.",
    ],
  },
  {
    alg: "U' L' U L U F U' F'",
    description: "Edge goes left",
    detailedExplanation: [
      "Turn the top layer counterclockwise (U').",
      "Perform the lefty algorithm (L' U' L U).",
      "Turn the front face clockwise (F).",
      "Turn the top layer clockwise (U).",
      "Turn the front face counterclockwise (F').",
      "Reinsert the white corner piece.",
    ],
  },
];

const F2LEdges = () => {
  const rightEdgePlayerRef = useRef<HTMLDivElement>(null);
  const leftEdgePlayerRef = useRef<HTMLDivElement>(null);
  const rightEdgeTwistyPlayerRef = useRef<TwistyPlayer | null>(null);
  const leftEdgeTwistyPlayerRef = useRef<TwistyPlayer | null>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isPlayingRightEdge, setIsPlayingRightEdge] = useState(false);
  const [isPlayingLeftEdge, setIsPlayingLeftEdge] = useState(false);

  const initializeEdgePlayers = () => {
    if (rightEdgePlayerRef.current && leftEdgePlayerRef.current) {
      rightEdgePlayerRef.current.innerHTML = "";
      leftEdgePlayerRef.current.innerHTML = "";

      const rightEdgePlayer = new TwistyPlayer({
        puzzle: "3x3x3",
        alg: edgeSteps[0].alg,
        experimentalSetupAlg: edgeScramble,
        hintFacelets: "none",
        backView: "none",
        background: "none",
        controlPanel: "none",
        tempoScale: 0.8,
      });
      rightEdgeTwistyPlayerRef.current = rightEdgePlayer;
      rightEdgePlayerRef.current.appendChild(rightEdgePlayer);

      const leftEdgePlayer = new TwistyPlayer({
        puzzle: "3x3x3",
        alg: edgeSteps[1].alg,
        experimentalSetupAlg: edgeScramble,
        hintFacelets: "none",
        backView: "none",
        background: "none",
        controlPanel: "none",
        tempoScale: 0.8,
      });
      leftEdgeTwistyPlayerRef.current = leftEdgePlayer;
      leftEdgePlayerRef.current.appendChild(leftEdgePlayer);
    }
  };

  useEffect(() => {
    initializeEdgePlayers();
  }, []);

  const handlePlayRightEdge = () => {
    if (rightEdgeTwistyPlayerRef.current) {
      if (isPlayingRightEdge) {
        rightEdgeTwistyPlayerRef.current.pause();
      } else {
        rightEdgeTwistyPlayerRef.current.play();
      }
      setIsPlayingRightEdge(!isPlayingRightEdge);
    }
  };

  const handlePlayLeftEdge = () => {
    if (leftEdgeTwistyPlayerRef.current) {
      if (isPlayingLeftEdge) {
        leftEdgeTwistyPlayerRef.current.pause();
      } else {
        leftEdgeTwistyPlayerRef.current.play();
      }
      setIsPlayingLeftEdge(!isPlayingLeftEdge);
    }
  };

  const handleResetEdge = (index: number) => {
    if (index === 0 && rightEdgeTwistyPlayerRef.current) {
      rightEdgeTwistyPlayerRef.current.timestamp = 0;
      setIsPlayingRightEdge(false);
    } else if (index === 1 && leftEdgeTwistyPlayerRef.current) {
      leftEdgeTwistyPlayerRef.current.timestamp = 0;
      setIsPlayingLeftEdge(false);
    }
  };

  return (
    <Container size="xl" className={classes.container}>
      <Title
        order={3}
        mb="xs"
        mt="3rem"
        style={{ fontSize: isMobile ? "1.75rem" : "2.5rem" }}
        className={classes.title}
        ta="center"
        lts="-0.05em"
      >
        Solving the F2L Edges
      </Title>
      <Text className={classes.description} ta="center" mb="xl">
        After solving the corners, follow these steps to solve the edges of the first two layers.
      </Text>
      <Flex
        gap="xl"
        direction={isMobile ? "column" : "row"}
        justify="space-between"
        align="stretch"
        style={{ maxWidth: "980px", margin: "0 auto" }}
      >
        {edgeSteps.map((step, index) => (
          <Flex
            key={index}
            gap="xl"
            direction="column"
            align={isMobile ? "center" : "flex-start"}
            style={{ flex: 1 }}
          >
            <Card shadow="sm" radius="lg" withBorder style={{ width: "100%" }}>
              <div
                ref={index === 0 ? rightEdgePlayerRef : leftEdgePlayerRef}
                style={{
                  width: "100%",
                  height: "300px",
                  display: "flex",
                  justifyContent: "center",
                }}
              />
              <Box mt="md" ta="center">
                <Button
                  radius="md"
                  variant="light"
                  onClick={index === 0 ? handlePlayRightEdge : handlePlayLeftEdge}
                  mr="xs"
                  color={
                    (index === 0 && isPlayingRightEdge) || (index === 1 && isPlayingLeftEdge)
                      ? "red"
                      : "blue"
                  }
                >
                  {(index === 0 && isPlayingRightEdge) || (index === 1 && isPlayingLeftEdge)
                    ? "Stop"
                    : "Play"}
                </Button>
                <Button
                  radius="md"
                  variant="outline"
                  onClick={() => handleResetEdge(index)}
                >
                  Reset
                </Button>
              </Box>
            </Card>

            <Box>
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

export default F2LEdges;
