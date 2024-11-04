// Hero.tsx

import { Container, Text, Group, Button, Box } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

export default function Hero() {
  const isMobile = useMediaQuery("(max-width: 768px)"); // Media query hook

  return (
    <Container
      size="lg"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "4rem 2rem",
        flexDirection: isMobile ? "column" : "row", // Apply column on mobile
        textAlign: isMobile ? "center" : "left", // Center text on mobile
        gap: "2rem",
      }}
    >
      {/* Left side - Text content */}
      <Box style={{ maxWidth: isMobile ? "100%" : "60%" }}>
      <Text
        component="h1"
        style={{
          fontSize: isMobile ? "2.75rem" : "4rem",
          fontWeight: 700,
          lineHeight: 1.2,
          letterSpacing: "-0.05em",
          color: "#000", // Main color
        }}
      >
        A{' '}
        <Text
          component="span"
          inherit
          variant="gradient"
          gradient={{ from: "blue", to: "indigo", deg: 90 }}
        >
          fully featured
        </Text>{' '}
        Rubik's Cube Guide
      </Text>

        <Text
          style={{
            fontSize: "1.25rem",
            fontWeight: 400,
            color: "#555",
            marginTop: "1rem",
          }}
        >
          Learn to solve the Rubik’s Cube step-by-step with easy-to-follow
          tutorials and tips.
        </Text>

        <Group
          style={{
            marginTop: "2rem",
            justifyContent: isMobile ? "center" : "left",
          }}
        >
          <Button
            size="lg"
            radius="lg"
            color="blue"
            variant="gradient"
            gradient={{ from: "blue", to: "indigo", deg: 90 }}
          >
            Get started
          </Button>
        </Group>
      </Box>

      {/* Right side - Placeholder div */}
      <Box
        style={{
          width: isMobile ? "100%" : "40%", // Adjust width for mobile view
          height: "300px",
          borderRadius: "16px",
          backgroundColor: "#d9e2ec", // Light placeholder color
        }}
      />
    </Container>
  );
}
