import {useEffect, useRef, useState} from "react";
import {Box, Button, Card, Container, Flex, Group, List, Pagination, Text, Title,} from "@mantine/core";
import {useNavigate} from "react-router-dom";
import {TwistyPlayer} from "cubing/twisty";
import {useMediaQuery} from "@mantine/hooks";
import classes from "./CrossStep.module.css";

interface EdgeStep {
  alg: string;
  description: string;
  detailedExplanation: string[];
}

const edgeScrambleRight =
  "F2 U B2 D2 U' F2 D2 B2 R2 D B2 U' L D L2 F2 R D' U B z2 y2 F' L R' D R' D U2 L' U' L R U R' y' U2 L' U' L y L' U' L y R U' R' U R U R' y2 U2";
const edgeScrambleLeft =
  "F2 U B2 D2 U' F2 D2 B2 R2 D B2 U' L D L2 F2 R D' U B z2 y2 F' L R' D R' D U2 L' U' L R U R' y' U2 L' U' L y L' U' L y R U' R' U R U R' y2 U2 U R U R' U' y L' U' L y2 L' U' L U F U F' y U";
const edgeScrambleNoYellow =
  "F2 U B2 D2 U' F2 D2 B2 R2 D B2 U' L D L2 F2 R D' U B z2 y2 F' L R' D R' D U2 L' U' L R U R' y' U2 L' U' L y L' U' L y R U' R' U R U R' y2 U2 U R U R' U' y L' U' L y2 L' U' L U F U F' y U U R U R' U' y L' U' L y2 L' U' L U F U F' y U";

const edgeSteps: EdgeStep[] = [
  {
    alg: "U R U R' U' y L' U' L",
    description: "Edge goes right",
    detailedExplanation: [
      "Turn the top layer clockwise (U).",
      "Perform the righty algorithm (R U R' U').",
      "Insert the white corner piece back to its spot. (L' U' L)",
    ],
  },
  {
    alg: "U' L' U' L U y' R U R' U'",
    description: "Edge goes left",
    detailedExplanation: [
      "Turn the top layer counterclockwise (U').",
      "Perform the lefty algorithm (L' U' L U).",
      "Insert the white corner piece back to its spot. (R U R' U')",
    ],
  },
  {
    alg: "U R U R' U' y L' U' L U2 y' R U R' U' y L' U' L",
    description: "No top-layer edges without yellow",
    detailedExplanation: [
      "Locate an incorrect edge in the middle layer that doesn’t match its center pieces.",
      "Hold the cube so the incorrect edge is on the right side of the middle layer.",
      "Perform the righty algorithm (R U R' U').",
      "Insert the white corner piece back to its spot. (L' U' L)",
      "Look for the correct edge in the top layer that matches the colors of the centers.",
      "Follow the steps of the edge goes to the left or to the right",
    ],
  },
];

const F2LEdges = () => {
  const rightEdgePlayerRef = useRef<HTMLDivElement>(null);
  const leftEdgePlayerRef = useRef<HTMLDivElement>(null);
  const noYellowEdgePlayerRef = useRef<HTMLDivElement>(null);
  const rightEdgeTwistyPlayerRef = useRef<TwistyPlayer | null>(null);
  const leftEdgeTwistyPlayerRef = useRef<TwistyPlayer | null>(null);
  const noYellowEdgeTwistyPlayerRef = useRef<TwistyPlayer | null>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isPlayingRightEdge, setIsPlayingRightEdge] = useState(false);
  const [isPlayingLeftEdge, setIsPlayingLeftEdge] = useState(false);
  const [isPlayingNoYellowEdge, setIsPlayingNoYellowEdge] = useState(false);
  const navigate = useNavigate();

  const initializeEdgePlayers = () => {
    if (rightEdgePlayerRef.current && leftEdgePlayerRef.current && noYellowEdgePlayerRef.current) {
      rightEdgePlayerRef.current.innerHTML = "";
      leftEdgePlayerRef.current.innerHTML = "";
      noYellowEdgePlayerRef.current.innerHTML = "";

      const rightEdgePlayer = new TwistyPlayer({
        puzzle: "3x3x3",
        alg: edgeSteps[0].alg,
        experimentalSetupAlg: edgeScrambleRight,
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
        experimentalSetupAlg: edgeScrambleLeft,
        hintFacelets: "none",
        backView: "none",
        background: "none",
        controlPanel: "none",
        tempoScale: 0.8,
      });
      leftEdgeTwistyPlayerRef.current = leftEdgePlayer;
      leftEdgePlayerRef.current.appendChild(leftEdgePlayer);

      const noYellowEdgePlayer = new TwistyPlayer({
        puzzle: "3x3x3",
        alg: edgeSteps[2].alg,
        experimentalSetupAlg: edgeScrambleNoYellow,
        hintFacelets: "none",
        backView: "none",
        background: "none",
        controlPanel: "none",
        tempoScale: 0.8,
      });
      noYellowEdgeTwistyPlayerRef.current = noYellowEdgePlayer;
      noYellowEdgePlayerRef.current.appendChild(noYellowEdgePlayer);
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

  const handlePlayNoYellowEdge = () => {
    if (noYellowEdgeTwistyPlayerRef.current) {
      if (isPlayingNoYellowEdge) {
        noYellowEdgeTwistyPlayerRef.current.pause();
      } else {
        noYellowEdgeTwistyPlayerRef.current.play();
      }
      setIsPlayingNoYellowEdge(!isPlayingNoYellowEdge);
    }
  };

  const handleResetEdge = (index: number) => {
    if (index === 0 && rightEdgeTwistyPlayerRef.current) {
      rightEdgeTwistyPlayerRef.current.timestamp = 0;
      setIsPlayingRightEdge(false);
    } else if (index === 1 && leftEdgeTwistyPlayerRef.current) {
      leftEdgeTwistyPlayerRef.current.timestamp = 0;
      setIsPlayingLeftEdge(false);
    } else if (index === 2 && noYellowEdgeTwistyPlayerRef.current) {
      noYellowEdgeTwistyPlayerRef.current.timestamp = 0;
      setIsPlayingNoYellowEdge(false);
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
        Solving the Second Layer's Edges
      </Title>
      <Text ta="center" mb="xl">
        After solving the corners, follow these steps to solve the edges of the
        first two layers.
      </Text>
      <Flex
        gap="xl"
        direction={isMobile ? "column" : "row"}
        justify="space-between"
        align="stretch"
        style={{ maxWidth: "100%", margin: "0 auto" }}
        wrap="wrap"
      >
        {edgeSteps.map((step, index) => (
          <Flex
            key={index}
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
                ref={
                  index === 0
                    ? rightEdgePlayerRef
                    : index === 1
                    ? leftEdgePlayerRef
                    : noYellowEdgePlayerRef
                }
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
                  onClick={
                    index === 0
                      ? handlePlayRightEdge
                      : index === 1
                      ? handlePlayLeftEdge
                      : handlePlayNoYellowEdge
                  }
                  mr="xs"
                  color={
                    (index === 0 && isPlayingRightEdge) ||
                    (index === 1 && isPlayingLeftEdge) ||
                    (index === 2 && isPlayingNoYellowEdge)
                      ? "red"
                      : "blue"
                  }
                >
                  {(index === 0 && isPlayingRightEdge) ||
                  (index === 1 && isPlayingLeftEdge) ||
                  (index === 2 && isPlayingNoYellowEdge)
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
      <Group justify="center">
        <Pagination
          radius="md"
          total={3}
          value={2}
          mt="xl"
          onChange={(page) => {
            if (page === 1) {
              navigate("/3x3/cross");
            } else if (page === 3) {
              navigate("/3x3/last-layer");
            }
          }}
        />
      </Group>
    </Container>
  );
};

export default F2LEdges;
