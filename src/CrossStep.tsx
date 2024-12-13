import { useEffect, useRef, useState } from "react";
import {
  Box,
  Title,
  Text,
  Card,
  Container,
  Button,
  Pagination,
  List,
  Grid,
  Group,
} from "@mantine/core";
import { TwistyPlayer } from "cubing/twisty";
import { useMediaQuery } from "@mantine/hooks";
import classes from "./CrossStep.module.css";

interface Step {
  alg: string;
  description: string;
  detailedExplanation: string[];
}

const scramble = "R' F' B2 R2 D' U R B' F2 R' B F B2 D B2 D' R2 B' F2 R2";

const steps: Step[] = [
  {
    alg: "",
    description: "Understanding the Cross",
    detailedExplanation: [
      "Solving the cross is the first step in solving the Rubik's Cube. It involves aligning four edge pieces that share the same color as the center of the bottom face (typically white) with their corresponding center pieces on the sides.",
      "Think of the cross as the foundation for solving the rest of the cube. Once the cross is solved, the cube becomes easier to navigate because key pieces are in their correct positions.",
      "The goal is to form a 'plus' sign with the white edges around the white center on the bottom face while also ensuring the other side colors of these edge pieces match their respective centers.",
      "To achieve this, you'll use simple moves to position and orient the edges one at a time, keeping the cube organized as you go.",
      "Remember, solving the cross efficiently can save you time and effort in later steps, so practice is key!"
    ],
  },
  
  {
    alg: "F L' U",
    description: "Position and insert the first white edge",
    detailedExplanation: [
      "Start by holding the cube with the white center on the top.",
      "Look for the white-blue edge piece. In this case, it's the bottom edge in on the green side",
      "Turn the front face clockwise (F) and then the left side up (L') to align the white-blue edge with the white center.",
      "Finally, turn the top face clockwise (U) to bring the edge to blue center.",
      "Remember, this can be done with any color and doesn’t have to start with blue.",
    ],
  },
  {
    alg: "F' L'",
    description: "Insert the second white edge",
    detailedExplanation: [
      "Now, let's focus on the white-orange edge. It's currently in the top layer.",
      "Turn the front face counterclockwise (F') to bring the edge down to the middle layer.",
      "Turn the left face counterclockwise (L') to align it with the orange and white center.",
    ],
  },
  {
    alg: "U' R U",
    description: "The third white edge",
    detailedExplanation: [
      "Notice how we can move the green white edge up by turning the right face clockwise (R), but the cross won't be in the right order.",
      "We can also see that the order of the cross is orange, then green.",
      "So, we can turn the top layer counterclockwise (U') to make sure the edge can be inserted with the correct orientation.",
      "Then, we insert the green edge by turning the right face clockwise (R)",
      "Finally, we move the top layer back to the right position using by turning it clockwise (U)",
    ],
  },
  {
    alg: "D F' R F",
    description: "Complete the white cross",
    detailedExplanation: [
      "For the last edge (white-red), we need to bring it to the middle layer and then insert it.",
      "First, we can bring in front of us by turning the bottom layer clockwise (D) ",
      "Then, we can bring it to the middle layer by turning the front face counterclockwise (F), this will move one of the white edges but we will reinsert it",
      "We can insert the red edge now using by turning the right face clockwise (R)",
      "Finally, move the white green edge back by turning the front clockwise (F)",
      "Remember, when you're done, flip the cube so that white center is on the bottom, and all the white edges should be forming a cross, and each edge should match the center color on its side.",
    ],
  },
];

const CrossStep = () => {
  const playerRef = useRef<HTMLDivElement>(null);
  const twistyPlayerRef = useRef<TwistyPlayer | null>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [currentStep, setCurrentStep] = useState(0);
  const [stickeringMode, setStickeringMode] = useState<"full" | "Daisy">("full");

  const getSetupAlg = (stepIndex: number) => {
    // Combine all previous steps' algorithms into a setup algorithm.
    return steps.slice(0, stepIndex).map((step) => step.alg).join(" ");
  };

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.innerHTML = "";
      const setupAlg = getSetupAlg(currentStep);
      const player = new TwistyPlayer({
        puzzle: "3x3x3",
        alg: steps[currentStep].alg,
        experimentalSetupAlg: `${scramble} ${setupAlg}`, // Scramble + cumulative setup
        experimentalStickering: stickeringMode,
        hintFacelets: "none",
        backView: "none",
        background: "none",
        controlPanel: "none",
        tempoScale: 0.8,
      });
      twistyPlayerRef.current = player;
      playerRef.current.appendChild(player);
    }
  }, [currentStep, stickeringMode]);

  const handlePlay = () => {
    if (twistyPlayerRef.current) {
      twistyPlayerRef.current.play();
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
        Solving the Cross
      </Title>
      <Text className={classes.description} ta="center" mb="xl">
        Master the foundational step of solving the Rubik's Cube: the white cross.
      </Text>
      <Grid>
        <Grid.Col span={isMobile ? 12 : 6}>
          <Card
            shadow="sm"
            padding="lg"
            radius="lg"
            withBorder
            style={{
              maxWidth: "400px",
              margin: "0 auto",
              position: "relative",
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
                setStickeringMode((prev) => (prev === "full" ? "Daisy" : "full"))
              }
            >
              {stickeringMode === "full" ? "Cross" : "Full"}
            </Button>
            <div
              ref={playerRef}
              style={{
                width: "100%",
                height: "300px",
                display: "flex",
                justifyContent: "center",
              }}
            />
          </Card>
          <Box mt="md" ta="center">
            <Button radius="md" variant="light" onClick={handlePlay} mb="md">
              Play
            </Button>
            <Text>
              Step {currentStep + 1} of {steps.length}
            </Text>
            <Group justify="center" mt="md">
              <Button
                radius="md"
                variant="light"
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
              >
                Previous Step
              </Button>
              <Button
                radius="md"
                variant="light"
                onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                disabled={currentStep === steps.length - 1}
              >
                Next Step
              </Button>
            </Group>
          </Box>
        </Grid.Col>
        <Grid.Col style={{ maxWidth: "500px" }} span={isMobile ? 12 : 6}>
          <Text fw={700} className={classes.stepDescription} size="xl" mb="md">
            {steps[currentStep].description}
          </Text>
          <List type="ordered" mb="xl" spacing="md">
            {steps[currentStep].detailedExplanation.map((point, index) => (
              <List.Item key={index}>{point}</List.Item>
            ))}
          </List>
        </Grid.Col>
      </Grid>
      <Group justify="center">
        <Pagination
          radius="md"
          total={3}
          value={1}
          mt="xl"
          onChange={(page) => {
            if (page === 2) {
              window.location.href = "/f2l";
            } else if (page === 3) {
              window.location.href = "/last-layer";
            }
          }}
        />
      </Group>
    </Container>
  );
};

export default CrossStep;
