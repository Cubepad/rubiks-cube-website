// Hero.tsx

import { Container, Text, Button, Box, Title, Flex } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import classes from './Hero.module.css'; // Import CSS module

export function Hero() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Container
      size="lg"  // Expand to full viewport width
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
      <Box style={{ maxWidth: isMobile ? "100%" : "75%"}}>  {/* Allow text content to use full width */}
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
          }}
        >
          Learn to solve the Rubik’s Cube step-by-step with easy-to-follow
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

      {/* Right side - Placeholder div */}
      <Box
        style={{
          width: isMobile ? "100%" : "60%", // Increased width for larger screens
          height: "300px",
          borderRadius: "16px",
          backgroundColor: "#d9e2ec", // Light placeholder color
          marginTop: "2rem", // Add spacing below text
        }}
      />
    </Container>
  );
}
