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

interface Step {
  alg: string;
  description: string;
  detailedExplanation: string[];
}

const scramble = "z2";

const steps: Step[] = [
  {
    alg: "R U R' U'",
    description: "Right Algorithm",
    detailedExplanation: [
      "Turn the right face clockwise (R).",
      "Turn the top face clockwise (U).",
      "Turn the right face counterclockwise (R').",
      "Turn the top face counterclockwise (U').",
      "This helps position a corner piece correctly into its place.",
    ],
  },
  {
    alg: "L' U' L U",
    description: "Left Algorithm",
    detailedExplanation: [
      "Turn the left face counterclockwise (L').",
      "Turn the top face counterclockwise (U').",
      "Turn the left face clockwise (L).",
      "Turn the top face clockwise (U).",
      "This is for placing a corner piece correctly on the left side.",
    ],
  },
];

const RLAlg = () => {
  const rightyPlayerRef = useRef<HTMLDivElement>(null);
  const leftyPlayerRef = useRef<HTMLDivElement>(null);
  const rightyTwistyPlayerRef = useRef<TwistyPlayer | null>(null);
  const leftyTwistyPlayerRef = useRef<TwistyPlayer | null>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isPlayingRighty, setIsPlayingRighty] = useState(false);
  const [isPlayingLefty, setIsPlayingLefty] = useState(false);

  const initializePlayers = () => {
    if (rightyPlayerRef.current && leftyPlayerRef.current) {
      rightyPlayerRef.current.innerHTML = "";
      leftyPlayerRef.current.innerHTML = "";

      const rightyPlayer = new TwistyPlayer({
        puzzle: "3x3x3",
        alg: steps[0].alg,
        experimentalSetupAlg: scramble,
        hintFacelets: "none",
        backView: "none",
        background: "none",
        controlPanel: "none",
        tempoScale: 0.8,
      });
      rightyTwistyPlayerRef.current = rightyPlayer;
      rightyPlayerRef.current.appendChild(rightyPlayer);

      const leftyPlayer = new TwistyPlayer({
        puzzle: "3x3x3",
        alg: steps[1].alg,
        experimentalSetupAlg: scramble,
        hintFacelets: "none",
        backView: "none",
        background: "none",
        controlPanel: "none",
        tempoScale: 0.8,
      });
      leftyTwistyPlayerRef.current = leftyPlayer;
      leftyPlayerRef.current.appendChild(leftyPlayer);
    }
  };

  useEffect(() => {
    initializePlayers();
  }, []);

  const handlePlayRighty = () => {
    if (rightyTwistyPlayerRef.current) {
      if (isPlayingRighty) {
        rightyTwistyPlayerRef.current.pause();
      } else {
        rightyTwistyPlayerRef.current.play();
      }
      setIsPlayingRighty(!isPlayingRighty);
    }
  };

  const handlePlayLefty = () => {
    if (leftyTwistyPlayerRef.current) {
      if (isPlayingLefty) {
        leftyTwistyPlayerRef.current.pause();
      } else {
        leftyTwistyPlayerRef.current.play();
      }
      setIsPlayingLefty(!isPlayingLefty);
    }
  };

  const handleReset = (index: number) => {
    if (index === 0 && rightyTwistyPlayerRef.current) {
      rightyTwistyPlayerRef.current.timestamp = 0;
      setIsPlayingRighty(false);
    } else if (index === 1 && leftyTwistyPlayerRef.current) {
      leftyTwistyPlayerRef.current.timestamp = 0;
      setIsPlayingLefty(false);
    }
  };

  return (
    <Container size="xl" className={classes.container}>
      <Title
        order={2}
        mb="xs"
        mt="3rem"
        style={{ fontSize: isMobile ? "2rem" : "2.75rem" }}
        className={classes.title}
        ta="center"
        lts="-0.05em"
      >
        Solving the First Two Layers (F2L)
      </Title>
      <Text className={classes.description} ta="center" mb="xl">
        Before solving the rest of the cube, you need to learn these two important algorithms.
      </Text>
      <Flex
        gap="xl"
        direction={isMobile ? "column" : "row"}
        justify="space-between"
        align="stretch"
        style={{ maxWidth: "980px", margin: "0 auto" }}
      >
        {steps.map((step, index) => (
          <Flex
            key={index}
            gap="xl"
            direction="column"
            align={isMobile ? "center" : "flex-start"}
            style={{ flex: 1 }}
          >
            <Card shadow="sm" radius="lg" withBorder style={{ width: "100%" }}>
              <div
                ref={index === 0 ? rightyPlayerRef : leftyPlayerRef}
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
                  onClick={index === 0 ? handlePlayRighty : handlePlayLefty}
                  mr="xs"
                  color={
                    (index === 0 && isPlayingRighty) || (index === 1 && isPlayingLefty)
                      ? "red"
                      : "blue"
                  }
                >
                  {(index === 0 && isPlayingRighty) || (index === 1 && isPlayingLefty)
                    ? "Stop"
                    : "Play"}
                </Button>
                <Button
                  radius="md"
                  variant="outline"
                  onClick={() => handleReset(index)}
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

export default RLAlg;
