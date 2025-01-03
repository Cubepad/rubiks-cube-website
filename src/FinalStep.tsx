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
  Group,
  Pagination,
} from "@mantine/core";
import { TwistyPlayer } from "cubing/twisty";
import { useMediaQuery } from "@mantine/hooks";
import classes from "./CrossStep.module.css";

interface FinalStep {
  alg: string;
  description: string;
  detailedExplanation: string[];
}

const finalScramble =
  "z2 y x' R U' R' D R U R' D' R U R' D R U' R' D' x U F R U R' U' R U R' U' R U R' U' F'";

const finalSteps: FinalStep[] = [
  {
    alg: "z2 R U R' U' R U R' U' R U R' U' R U R' U' D R U R' U' R U R' U' D R U R' U' R U R' U' R U R' U' R U R' U' D R U R' U' R U R' U'",
    description: "Righty Algorithm",
    detailedExplanation: [
      "Flip the cube over so the yellow face is at the bottom.",
      "Position an unsolved yellow corner in the bottom-right slot.",
      "Perform the Righty Algorithm (either 2 or 4 times) until that yellow corner is correctly oriented.",
      "Turn the bottom layer (not the entire cube!) to bring the next unsolved yellow corner to the bottom-right position.",
      "Repeat this process for all four corners until the yellow face is complete.",
    ],
  },
];

const FinalStep = () => {
  const finalPlayerRef = useRef<HTMLDivElement>(null);
  const finalTwistyPlayerRef = useRef<TwistyPlayer | null>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isPlayingFinal, setIsPlayingFinal] = useState(false);

  const initializeFinalPlayer = () => {
    if (finalPlayerRef.current) {
      finalPlayerRef.current.innerHTML = "";

      const finalPlayer = new TwistyPlayer({
        puzzle: "3x3x3",
        alg: finalSteps[0].alg,
        experimentalSetupAlg: finalScramble,
        hintFacelets: "none",
        backView: "none",
        background: "none",
        controlPanel: "none",
        tempoScale: 1.2,
      });
      finalTwistyPlayerRef.current = finalPlayer;
      finalPlayerRef.current.appendChild(finalPlayer);
    }
  };

  useEffect(() => {
    initializeFinalPlayer();
  }, []);

  const handlePlayFinal = () => {
    if (finalTwistyPlayerRef.current) {
      if (isPlayingFinal) {
        finalTwistyPlayerRef.current.pause();
      } else {
        finalTwistyPlayerRef.current.play();
      }
      setIsPlayingFinal(!isPlayingFinal);
    }
  };

  const handleResetFinal = () => {
    if (finalTwistyPlayerRef.current) {
      finalTwistyPlayerRef.current.timestamp = 0;
      setIsPlayingFinal(false);
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
        Final Step: Solving the Yellow Corners
      </Title>
      <Group mb="xl" justify="center">
        <Text
          ta="center"
          style={{ maxWidth: "800px", textWrap: "balance" }}
        >
          The last step is to fix the corners and complete the cube! This part
          requires attention to detail—just follow each move carefully, and
          don’t worry if the cube appears messy during the process. As long as
          you focus on one corner at a time, everything will fall into place.
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
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <div
              ref={finalPlayerRef}
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
                onClick={handlePlayFinal}
                mr="xs"
                color={isPlayingFinal ? "red" : "blue"}
              >
                {isPlayingFinal ? "Stop" : "Play"}
              </Button>
              <Button radius="md" variant="outline" onClick={handleResetFinal}>
                Reset
              </Button>
            </Box>
          </Card>
          <Box style={{ maxWidth: "500px" }}>
            <Text fw={700} size="xl">
              {finalSteps[0].description}
            </Text>
            <List type="ordered" mb="xl" spacing="md">
              {finalSteps[0].detailedExplanation.map((point, pointIndex) => (
                <List.Item key={pointIndex}>{point}</List.Item>
              ))}
            </List>
          </Box>
        </Flex>
      </Flex>
      <Group justify="center">
        <Pagination
          radius="md"
          total={3}
          value={3}
          mt="xl"
          onChange={(page) => {
            if (page === 1) {
              window.location.href = "/cross";
            } else if (page === 2) {
              window.location.href = "/f2l";
            }
          }}
        />
      </Group>
    </Container>
  );
};

export default FinalStep;
