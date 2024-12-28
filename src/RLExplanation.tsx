import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@mantine/hooks";
import { Container, Title, Text, Card, Flex, Box, List, Button } from "@mantine/core";
import { TwistyPlayer } from "cubing/twisty";
import classes from "./F2LStep.module.css";

const scramble = "R' F' B2 R2 D' U R B' F2 R' B F B2 D B2 D' R2 B' F2 R2 F L' U F' L' U' R U D F' R F z2 y2 L' U' L y2";

const steps = [
  {
    alg: "U' R U R' U'",
    setupAlg: scramble,
    description: "Case 1: White faces right",
    detailedExplanation: [
      "Hold the corner to the right (in this case it's the orange green corner).",
      "Perform one Righty Algorithm to solve the corner.",
    ],
  },
  {
    alg: "U' L' U' L U",
    setupAlg: scramble,
    description: "Case 2: White faces left",
    detailedExplanation: [
      "Hold the corner to the left (in this case it's the red green corner).",
      "Perform one Lefty Algorithm to solve the corner.",
    ],
  },
  {
    alg: "R U R' U' R U R' U' R U R' U'",
    setupAlg: "R' F' B2 R2 D' U R B' F2 R' B F B2 D B2 D' R2 B' F2 R2 F L' U F' L' U' R U D F' R F z2 y2 U", // Different setup alg for the third case
    description: "Case 3: White faces up",
    detailedExplanation: [
      "Hold the corner to the right (in this case it's the red blue corner).",
      "Perform the Righty Algorithm three times to solve the corner.",
    ],
  },
];
const RLExplanation = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const playerRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];
  const twistyPlayerRefs = [useRef<TwistyPlayer | null>(null), useRef<TwistyPlayer | null>(null), useRef<TwistyPlayer | null>(null)];
  const [isPlaying, setIsPlaying] = useState([false, false, false]);

  const initializePlayers = () => {
    playerRefs.forEach((ref, index) => {
      if (ref.current) {
        ref.current.innerHTML = "";
        const player = new TwistyPlayer({
          puzzle: "3x3x3",
          alg: steps[index].alg,
          experimentalSetupAlg: steps[index].setupAlg,
          hintFacelets: "none",
          backView: "none",
          background: "none",
          controlPanel: "none",
          tempoScale: 0.8,
        });
        twistyPlayerRefs[index].current = player;
        ref.current.appendChild(player);
      }
    });
  };

  useEffect(() => {
    initializePlayers();
  }, []);

  const handlePlay = (index: number) => {
    if (twistyPlayerRefs[index].current) {
      if (isPlaying[index]) {
        twistyPlayerRefs[index].current.pause();
      } else {
        twistyPlayerRefs[index].current.play();
      }
      setIsPlaying((prev) => {
        const newPlaying = [...prev];
        newPlaying[index] = !newPlaying[index];
        return newPlaying;
      });
    }
  };

  const handleReset = (index: number) => {
    if (twistyPlayerRefs[index].current) {
      twistyPlayerRefs[index].current.timestamp = 0;
      setIsPlaying((prev) => {
        const newPlaying = [...prev];
        newPlaying[index] = false;
        return newPlaying;
      });
    }
  };

  return (
    <Container size="lg" className={classes.container}>
      <Title
        order={3}
        mb="xs"
        mt="3rem"
        style={{ fontSize: isMobile ? "1.75rem" : "2.5rem" }}
        className={classes.title}
        ta="center"
        lts="-0.05em"
      >
        Using Righty and Lefty Algorithms
      </Title>
      <Text className={classes.description} ta="center" mb="xl">
        Learn how to position the white corners correctly using the righty and lefty algorithms.
      </Text>
      <Flex
        gap="xl"
        wrap="wrap"
        justify="center"
        align="stretch"
        style={{ maxWidth: "100%", margin: "0 auto" }}
      >
        {steps.map((step, index) => (
          <Box key={index} style={{ flex: '1 1 300px', maxWidth: '400px', marginBottom: '2rem' }}>
            <Card shadow="sm" radius="lg" withBorder>
              <div
                ref={playerRefs[index]}
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
                  onClick={() => handlePlay(index)}
                  mr="xs"
                  color={isPlaying[index] ? "red" : "blue"}
                >
                  {isPlaying[index] ? "Stop" : "Play"}
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
            <Box mt="md" ta="left">
              <Text fw={700} size="xl" mb="md">
                {step.description}
              </Text>
              <List type="ordered" mb="xl" spacing="md">
                {step.detailedExplanation.map((point, pointIndex) => (
                  <List.Item key={pointIndex}>{point}</List.Item>
                ))}
              </List>
            </Box>
          </Box>
        ))}
      </Flex>
      <Text className={classes.description} ta="center" mt="sm">
        If no white corners are in the top layer, find a white corner in the bottom layer, hold it to the right, and perform a Righty Algorithm.
      </Text>
    </Container>
  );  
};

export default RLExplanation;
