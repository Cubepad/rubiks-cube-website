import { useEffect, useRef } from "react";
import {
  Box,
  Title,
  Text,
  Card,
  Container,
  Button,
  Flex,
} from "@mantine/core";
import { useNavigate } from 'react-router-dom';
import { TwistyPlayer } from "cubing/twisty";
import { useMediaQuery } from "@mantine/hooks";
import classes from "./CrossStep.module.css";

const Tutorials = () => {
  const playerRef = useRef<HTMLDivElement>(null);
  const twistyPlayerRef = useRef<TwistyPlayer | null>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const navigate = useNavigate();

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.innerHTML = "";
      const player = new TwistyPlayer({
        puzzle: "3x3x3",
        experimentalSetupAlg: "z2",
        hintFacelets: "none",
        backView: "none",
        background: "none",
        controlPanel: "none",
        experimentalDragInput: "none",
      });
      twistyPlayerRef.current = player;
      playerRef.current.appendChild(player);
    }
  }, []);

  return (
    <Container size="lg">
      <Title
        order={2}
        mb="xs"
        mt="3rem"
        style={{ fontSize: isMobile ? "2rem" : "2.75rem" }}
        className={classes.title}
        ta="center"
        lts="-0.05em"
      >
        Tutorials
      </Title>
      <Flex
        gap="xl"
        direction="column"
        align="center"
        justify="center"
        style={{ maxWidth: "600px", margin: "0 auto" }}
      >
        <Card shadow="sm" radius="lg" withBorder style={{ width: "100%", justifyContent: "center", alignItems: "center" }}>
          <div
            ref={playerRef}
            style={{
              width: "300px",
              display: "flex",
              justifyContent: "center",
            }}
          />
          <Box mt="md" ta="center">
            <Text fw={700} size="xl" mb="md">
              3x3
            </Text>
            <Button
              radius="md"
              variant="light"
              onClick={() => navigate('/3x3/cross')}
            >
              Learn Now
            </Button>
          </Box>
        </Card>
      </Flex>
    </Container>
  );
};

export default Tutorials;
