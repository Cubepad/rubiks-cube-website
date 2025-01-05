import {useEffect, useRef, useState} from "react";
import {Box, Button, Card, Container, Flex, Group, List, Text, Title,} from "@mantine/core";
import {TwistyPlayer} from "cubing/twisty";
import {useMediaQuery} from "@mantine/hooks";
import classes from "./CrossStep.module.css";

interface CrossStep {
  alg: string;
  description: string;
  detailedExplanation: string[];
}

const crossScrambleLine = "z2 R U R' U R' U' R2 U' R' U R' U R U2 R U R' F' R U R' U' R' F R2 U' R' F R U R' U' R U R' U' F'";
const crossScrambleLShape = "z2 R U R' U R' U' R2 U' R' U R' U R U2 R U R' F' R U R' U' R' F R2 U' R' f U R U' R' f' U2";
const crossScrambleDot = "z2 R U R' U R' U' R2 U' R' U R' U R U2 R U R' F' R U R' U' R' F R2 U' R'  F R U R' U' F' f R U R' U' f' U";

const crossSteps: CrossStep[] = [
  {
    alg: "F R U R' U' F'",
    description: "Line",
    detailedExplanation: [
      "Rotate the front face clockwise (F).",
      "Perform the righty algorithm (R U R' U').",
      "Rotate the front face counterclockwise (F').",
    ],
  },
  {
    alg: "F R U R' U' R U R' U' F'",
    description: "L Shape",
    detailedExplanation: [
      "Rotate the front face clockwise (F).",
      "Perform the righty algorithm twice (R U R' U' R U R' U').",
      "Rotate the front face counterclockwise (F').",
    ],
  },
  {
    alg: "F R U R' U' F' U2 F R U R' U' R U R' U' F'",
    description: "Dot",
    detailedExplanation: [
      "Follow the steps for the 'Line' scenario first.",
      "Then follow the steps for the 'L Shape' scenario.",
    ],
  },
];

const YellowCross = () => {
  const linePlayerRef = useRef<HTMLDivElement>(null);
  const lShapePlayerRef = useRef<HTMLDivElement>(null);
  const dotPlayerRef = useRef<HTMLDivElement>(null);
  const lineTwistyPlayerRef = useRef<TwistyPlayer | null>(null);
  const lShapeTwistyPlayerRef = useRef<TwistyPlayer | null>(null);
  const dotTwistyPlayerRef = useRef<TwistyPlayer | null>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isPlayingLine, setIsPlayingLine] = useState(false);
  const [isPlayingLShape, setIsPlayingLShape] = useState(false);
  const [isPlayingDot, setIsPlayingDot] = useState(false);

  const initializeCrossPlayers = () => {
    if (linePlayerRef.current && lShapePlayerRef.current && dotPlayerRef.current) {
      linePlayerRef.current.innerHTML = "";
      lShapePlayerRef.current.innerHTML = "";
      dotPlayerRef.current.innerHTML = "";

      const linePlayer = new TwistyPlayer({
        puzzle: "3x3x3",
        alg: crossSteps[0].alg,
        experimentalSetupAlg: crossScrambleLine,
        hintFacelets: "none",
        backView: "none",
        background: "none",
        controlPanel: "none",
        tempoScale: 0.8,
      });
      lineTwistyPlayerRef.current = linePlayer;
      linePlayerRef.current.appendChild(linePlayer);

      const lShapePlayer = new TwistyPlayer({
        puzzle: "3x3x3",
        alg: crossSteps[1].alg,
        experimentalSetupAlg: crossScrambleLShape,
        hintFacelets: "none",
        backView: "none",
        background: "none",
        controlPanel: "none",
        tempoScale: 0.8,
      });
      lShapeTwistyPlayerRef.current = lShapePlayer;
      lShapePlayerRef.current.appendChild(lShapePlayer);

      const dotPlayer = new TwistyPlayer({
        puzzle: "3x3x3",
        alg: crossSteps[2].alg,
        experimentalSetupAlg: crossScrambleDot,
        hintFacelets: "none",
        backView: "none",
        background: "none",
        controlPanel: "none",
        tempoScale: 0.8,
      });
      dotTwistyPlayerRef.current = dotPlayer;
      dotPlayerRef.current.appendChild(dotPlayer);
    }
  };

  useEffect(() => {
    initializeCrossPlayers();
  }, []);

  const handlePlayLine = () => {
    if (lineTwistyPlayerRef.current) {
      if (isPlayingLine) {
        lineTwistyPlayerRef.current.pause();
      } else {
        lineTwistyPlayerRef.current.play();
      }
      setIsPlayingLine(!isPlayingLine);
    }
  };

  const handlePlayLShape = () => {
    if (lShapeTwistyPlayerRef.current) {
      if (isPlayingLShape) {
        lShapeTwistyPlayerRef.current.pause();
      } else {
        lShapeTwistyPlayerRef.current.play();
      }
      setIsPlayingLShape(!isPlayingLShape);
    }
  };

  const handlePlayDot = () => {
    if (dotTwistyPlayerRef.current) {
      if (isPlayingDot) {
        dotTwistyPlayerRef.current.pause();
      } else {
        dotTwistyPlayerRef.current.play();
      }
      setIsPlayingDot(!isPlayingDot);
    }
  };

  const handleResetCross = (index: number) => {
    if (index === 0 && lineTwistyPlayerRef.current) {
      lineTwistyPlayerRef.current.timestamp = 0;
      setIsPlayingLine(false);
    } else if (index === 1 && lShapeTwistyPlayerRef.current) {
      lShapeTwistyPlayerRef.current.timestamp = 0;
      setIsPlayingLShape(false);
    } else if (index === 2 && dotTwistyPlayerRef.current) {
      dotTwistyPlayerRef.current.timestamp = 0;
      setIsPlayingDot(false);
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
        Creating the Yellow Cross
      </Title>
      <Group justify="center" mb="xl">
        <Text ta="center" style={{ maxWidth: "800px", }}>
          The next goal is to form a yellow cross on the top face. If you already have a yellow cross, you can move on to the next step. Otherwise, focus only on the yellow edge pieces and follow one of these scenarios:
        </Text>
      </Group>
      <Flex
        gap="xl"
        direction={isMobile ? "column" : "row"}
        justify="space-between"
        align="stretch"
        wrap="wrap"
        style={{ maxWidth: "100%", margin: "0 auto" }}
      >
        {crossSteps.map((step, index) => (
          <Flex
            key={index}
            gap="xl"
            direction="column"
            align={isMobile ? "center" : "flex-start"}
            style={{ flex: 1 }}
          >
            <Card shadow="sm" radius="lg" withBorder style={{ width: "100%", justifyContent: "center", alignItems: "center" }}>
              <div
                ref={index === 0 ? linePlayerRef : index === 1 ? lShapePlayerRef : dotPlayerRef}
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
                  onClick={index === 0 ? handlePlayLine : index === 1 ? handlePlayLShape : handlePlayDot}
                  mr="xs"
                  color={
                    (index === 0 && isPlayingLine) ||
                    (index === 1 && isPlayingLShape) ||
                    (index === 2 && isPlayingDot)
                      ? "red"
                      : "blue"
                  }
                >
                  {(index === 0 && isPlayingLine) ||
                  (index === 1 && isPlayingLShape) ||
                  (index === 2 && isPlayingDot)
                    ? "Stop"
                    : "Play"}
                </Button>
                <Button
                  radius="md"
                  variant="outline"
                  onClick={() => handleResetCross(index)}
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

export default YellowCross;
