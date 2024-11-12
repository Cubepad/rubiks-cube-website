import React, { useEffect, useRef } from "react";
import {
  Box,
  Title,
  Text,
  Card,
  Group,
  Container,
  Flex,
  Button,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import classes from "./CubeNotation.module.css";
import { TwistyPlayer } from "cubing/twisty";

interface NotationItem {
  move: string;
  description: string;
}

interface NotationCategory {
  title: string;
  description: string;
  notations: NotationItem[];
}

const notationCategories: NotationCategory[] = [
  {
    title: "Regular Face Turns",
    description: "Basic clockwise rotations of a single face of the cube.",
    notations: [
      { move: "R", description: "Right face clockwise" },
      { move: "L", description: "Left face clockwise" },
      { move: "U", description: "Upper face clockwise" },
      { move: "D", description: "Down face clockwise" },
      { move: "F", description: "Front face clockwise" },
      { move: "B", description: "Back face clockwise" },
    ],
  },
  {
    title: "Prime Moves",
    description: "Counterclockwise rotations of a single face, denoted by an apostrophe (').",
    notations: [
      { move: "R'", description: "Right face counterclockwise" },
      { move: "L'", description: "Left face counterclockwise" },
      { move: "U'", description: "Upper face counterclockwise" },
      { move: "D'", description: "Down face counterclockwise" },
      { move: "F'", description: "Front face counterclockwise" },
      { move: "B'", description: "Back face counterclockwise" },
    ],
  },
  {
    title: "Double Moves",
    description: "180-degree rotations of a single face, denoted by a '2' after the letter.",
    notations: [
      { move: "R2", description: "Right face 180 degrees" },
      { move: "L2", description: "Left face 180 degrees" },
      { move: "U2", description: "Upper face 180 degrees" },
      { move: "D2", description: "Down face 180 degrees" },
      { move: "F2", description: "Front face 180 degrees" },
      { move: "B2", description: "Back face 180 degrees" },
    ],
  },
  {
    title: "Wide Moves",
    description: "Moves that turn two layers of the cube at once.",
    notations: [
      { move: "Rw", description: "Right two layers clockwise" },
      { move: "Lw", description: "Left two layers clockwise" },
      { move: "Uw", description: "Upper two layers clockwise" },
      { move: "Dw", description: "Down two layers clockwise" },
      { move: "Fw", description: "Front two layers clockwise" },
      { move: "Bw", description: "Back two layers clockwise" },
    ],
  },
  {
    title: "Cube Rotations",
    description: "Rotations of the entire cube.",
    notations: [
      { move: "x", description: "Rotate the entire cube on R (Right)" },
      { move: "y", description: "Rotate the entire cube on U (Up)" },
      { move: "z", description: "Rotate the entire cube on F (Front)" },
    ],
  },
  {
    title: "Slice Moves",
    description: "Moves that only turn the middle layer of the cube.",
    notations: [
      { move: "M", description: "Middle slice, direction as L" },
      { move: "E", description: "Equatorial slice, direction as D" },
      { move: "S", description: "Standing slice, direction as F" },
    ],
  },
];

const NotationCard: React.FC<NotationItem> = ({ move, description }) => {
  const playerRef = useRef<HTMLDivElement>(null);
  const twistyPlayerRef = useRef<TwistyPlayer | null>(null);

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.innerHTML = '';
      const player = new TwistyPlayer({
        puzzle: "3x3x3",
        alg: move,
        hintFacelets: "none",
        backView: "none",
        background: "none",
        controlPanel: "none",
        tempoScale: 0.8,
      });
      twistyPlayerRef.current = player;
      playerRef.current.appendChild(player);
    }
  }, [move]);

  const handleReset = () => {
    if (twistyPlayerRef.current) {
      twistyPlayerRef.current.timestamp = 0;
    }
  };

  const handlePlay = () => {
    if (twistyPlayerRef.current) {
      twistyPlayerRef.current.play();
    }
  };

  return (
    <Card shadow="sm" padding="lg" radius="lg" withBorder>
      <Card.Section>
        <div ref={playerRef} style={{ width: '100%', height: '200px' }}></div>
      </Card.Section>
      <Group gap="md" mt="md" mb="xs">
        <Text fw={500} size="lg">{move}</Text>
      </Group>
      <Text size="sm" color="dimmed" mb="md">
        {description}
      </Text>
      <Group gap="sm">
        <Button radius="md" variant="light" color="blue" onClick={handlePlay}>
          Play
        </Button>
        <Button radius="md" variant="outline" color="gray" onClick={handleReset}>
          Reset
        </Button>
      </Group>
    </Card>
  );
};

const CubeNotations: React.FC = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");

  return (
    <Container size="xl" className={classes.container}>
      <Title
        order={2}
        mb="xs"
        mt="3rem"
        style={{ fontSize: isMobile ? "2rem" : "2.75rem" }}
        className={classes.title}
        ta="center"
      >
        Rubik's Cube Move Notations
      </Title>
      <Text className={classes.description} ta="center" mb="xl">
        These notations are used to turn the cube and read algorithms
      </Text>
      {notationCategories.map((category, index) => (
        <Box key={index} mb="xl">
          <Title
            order={3}
            ta="center"
            mb="md"
            style={{ fontSize: isMobile ? "1.75rem" : "2rem" }}
            className={classes.subHeading}
          >
            {category.title}
          </Title>
          <Text mb="lg" ta="center">
            {category.description}
          </Text>
          <Flex mb="8rem" justify="center" align="stretch" wrap="wrap" gap="lg">
            {category.notations.map((item, itemIndex) => (
              <Box
                key={itemIndex}
                style={{
                  width: isMobile ? "100%" : isTablet ? "calc(50% - 0.5rem)" : "calc(33.33% - 0.67rem)",
                  minWidth: "250px",
                  maxWidth: "350px",
                }}
              >
                <NotationCard {...item} />
              </Box>
            ))}
          </Flex>
        </Box>
      ))}
    </Container>
  );
};

export default CubeNotations;