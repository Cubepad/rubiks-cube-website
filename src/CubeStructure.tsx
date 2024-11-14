import { useEffect, useRef, useState } from "react";
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

interface CubePart {
  name: string;
  description: string;
  stickering: string;
}

const cubeParts: CubePart[] = [
  {
    name: "Center Pieces",
    description:
      "The 6 center pieces, one on each face, determine the color of the entire face when solved.",
    stickering: "centers-only",
  },
  {
    name: "Edge and Corner Pieces",
    description:
      "The 12 edge pieces connect the centers and have two colors each. The 8 corner pieces are at the intersections of three faces and have three colors each.",
    stickering: "Void Cube",
  },
];

const CubePartCard = ({ name, description, stickering }: CubePart) => {
  const playerRef = useRef<HTMLDivElement>(null);
  const twistyPlayerRef = useRef<TwistyPlayer | null>(null);
  const [isRotating, setIsRotating] = useState(false);

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.innerHTML = "";
      const player = new TwistyPlayer({
        puzzle: "3x3x3",
        alg: "",
        hintFacelets: "none",
        backView: "none",
        background: "none",
        controlPanel: "none",
        experimentalStickering: stickering,
        tempoScale: 0.8,
      });
      twistyPlayerRef.current = player;
      playerRef.current.appendChild(player);
    }
  }, [stickering]);

  const handleRotate = () => {
    if (twistyPlayerRef.current) {
      const rotationSequence = "y y y y x x x x";
      twistyPlayerRef.current.alg = rotationSequence;
      twistyPlayerRef.current.play();
      setIsRotating(true);
      twistyPlayerRef.current.tempoScale = 1.25;
    }
  };

  const handleStop = () => {
    if (twistyPlayerRef.current) {
      twistyPlayerRef.current.pause();
      twistyPlayerRef.current.alg = "";
      setIsRotating(false);
    }
  };

  return (
    <Card shadow="sm" padding="lg" radius="lg" withBorder h="100%">
      <Card.Section>
        <div
          ref={playerRef}
          style={{
            width: "100%",
            height: "200px",
            display: "flex",
            justifyContent: "center",
          }}
        ></div>
      </Card.Section>
      <Group gap="md" mt="md" mb="xs">
        <Text className={classes.notationMove} fw={500} size="xl">
          {name}
        </Text>
      </Group>
      <Text size="sm" mb="md">
        {description}
      </Text>
      <Group gap="sm" mt="auto">
        {isRotating ? (
          <Button radius="md" variant="light" color="red" onClick={handleStop}>
            Stop
          </Button>
        ) : (
          <Button
            radius="md"
            variant="light"
            color="blue"
            onClick={handleRotate}
          >
            Rotate
          </Button>
        )}
      </Group>
    </Card>
  );
};

const CubeStructure = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Container size="lg" className={classes.container}>
      <Title
        order={2}
        mb="xs"
        mt="3rem"
        style={{ fontSize: isMobile ? "2rem" : "2.75rem" }}
        className={classes.title}
        ta="center"
        lts="-0.05em"
      >
        Rubik's Cube Structure
      </Title>
      <Text className={classes.description} ta="center" mb="xl">
        These are the different parts of a Rubik's Cube
      </Text>
      <Flex
        direction={isMobile ? "column" : "row"}
        gap="lg"
        mb="6rem"
        justify="center"
        align="stretch"
      >
        {cubeParts.map((part, index) => (
          <Box
            key={index}
            style={{
              flex: 1,
              minWidth: 0,
              maxWidth: "500px",
            }}
          >
            <CubePartCard {...part} />
          </Box>
        ))}
      </Flex>
    </Container>
  );
};

export default CubeStructure;
