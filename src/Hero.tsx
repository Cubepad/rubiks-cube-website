import { Container, Text, Button, Paper, Box, Title, Flex } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useEffect, useRef } from "react";
import { TwistyPlayer } from "cubing/twisty";
import classes from './Hero.module.css';

export function Hero() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const cubeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cubeRef.current) {
      cubeRef.current.innerHTML = "";
      const player = new TwistyPlayer({
        puzzle: "3x3x3",
        alg: "none",
        background: "none",
        controlPanel: "none",
        backView: "none",
      });
      cubeRef.current.appendChild(player);
    }
  }, []);

  return (
    <Container
      size="lg"  
      style={{
        display: "flex",
        alignItems: "center",
        padding: "6rem 2rem",
        flexDirection: "column",
        textAlign: "center",
        gap: "2rem",
      }}
    >
      {/* Left side - Text content */}
      <Box style={{ maxWidth: isMobile ? "100%" : "75%"}}>
        <Title
          className={classes.title}
          order={1}
          fw={700}
          lts="-0.05em"
          lh={1.2}
          style={{
            fontSize: isMobile ? "2.75rem" : "4.5rem",
          }}
        >
          Your{' '}
          <Text
            component="span"
            inherit
            variant="gradient"
            gradient={{ from: "blue", to: "indigo", deg: 90 }}
          >
            Landing Pad
          </Text>{' '}
          For Rubik's Cube Mastery 
        </Title>

        <Title
          order={3}
          fw={400}
          style={{
            fontSize: isMobile ? "1.25rem" : "1.5rem",
            marginTop: "1rem",
            textWrap: "balance",
          }}
        >
          Learn to solve the Rubik's Cube step-by-step with easy-to-follow
          tutorials and tips.
        </Title>

        <Flex
          justify="center"
          style={{
            marginTop: "2rem",
          }}
        >
          <Button
            size="xl"
            radius="lg"
            color="blue"
            variant="gradient"
            gradient={{ from: "blue", to: "indigo", deg: 90 }}
          >
            Get started
          </Button>
        </Flex>
      </Box>

      {/* Right side - Cube display */}
      <Paper
        shadow="md"
        withBorder
        radius="lg"
        style={{
          width: isMobile ? "100%" : "60%",
          height: "300px",
          marginTop: "2rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div ref={cubeRef}/>
      </Paper>
    </Container>
  );
}