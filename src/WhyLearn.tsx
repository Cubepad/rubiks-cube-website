// WhyLearn.tsx

import {
  Container,
  Title,
  Text,
  SimpleGrid,
  Card,
  ThemeIcon,
  Flex,
  Button,
} from "@mantine/core";
import {
  IconBrain,
  IconPuzzle,
  IconFocusCentered,
  IconInfoCircle,
  IconBulb,
} from "@tabler/icons-react";
import classes from "./WhyLearn.module.css"; // Import CSS module
import { useMediaQuery } from "@mantine/hooks";

export function WhyLearn() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <Container size="md" py="xl" px="md">
      {/* Section Title */}
      <Title
        ta="center"
        order={2}
        mb="lg"
        lts="-0.05em"
        className={classes.heading}
        style={{
          fontSize: isMobile ? "2rem" : "2.75rem",
        }}
      >
        Why Learn to Solve the Rubik's Cube?
      </Title>
      <Text ta="center" size="lg" mx="auto" mb="xl" maw={700}>
        Learning to solve the Rubik's Cube isn't just fun—it strengthens your
        mind, improves memory, and boosts problem-solving skills. Here's a quick
        look at some benefits!
      </Text>

      {/* Benefits Grid */}
      <SimpleGrid
        cols={{ base: 1, sm: 2 }} // 1 column on small screens, 2 columns on larger screens
        spacing="lg"
        mb="xl" // Default spacing
      >
        {/* Benefit 1 */}
        <Card
          shadow="sm"
          padding="lg"
          radius="lg"
          withBorder
          className={classes.benefitBox}
        >
          <Flex align="center" mb="sm" gap="sm">
            <ThemeIcon
              variant="gradient"
              gradient={{ from: "blue", to: "indigo", deg: 90 }}
              size={38}
              radius="xl"
            >
              <IconBrain size={24} />
            </ThemeIcon>
            <Title
              order={4}
              lts="-0.05em"
              className={classes.heading}
              style={{
                fontSize: isMobile ? "1.5rem" : "1.75rem",
              }}
            >
              Cognitive Skills
            </Title>
          </Flex>
          <Text>Boosts analytical thinking and coordination.</Text>
        </Card>

        {/* Benefit 2 */}
        <Card
          shadow="sm"
          padding="lg"
          radius="lg"
          withBorder
          className={classes.benefitBox}
        >
          <Flex align="center" mb="sm" gap="sm">
            <ThemeIcon
              variant="gradient"
              gradient={{ from: "blue", to: "indigo", deg: 90 }}
              size={38}
              radius="xl"
            >
              <IconBulb size={24} />
            </ThemeIcon>
            <Title
              order={4}
              lts="-0.05em"
              className={classes.heading}
              style={{
                fontSize: isMobile ? "1.5rem" : "1.75rem",
              }}
            >
              Memory
            </Title>
          </Flex>
          <Text>Enhances memory and spatial recall.</Text>
        </Card>

        {/* Benefit 3 */}
        <Card
          shadow="sm"
          padding="lg"
          radius="lg"
          withBorder
          className={classes.benefitBox}
        >
          <Flex align="center" mb="sm" gap="sm">
            <ThemeIcon
              variant="gradient"
              gradient={{ from: "blue", to: "indigo", deg: 90 }}
              size={38}
              radius="xl"
            >
              <IconPuzzle size={24} />
            </ThemeIcon>
            <Title
              order={4}
              lts="-0.05em"
              className={classes.heading}
              style={{
                fontSize: isMobile ? "1.5rem" : "1.75rem",
              }}
            >
              Problem-Solving
            </Title>
          </Flex>
          <Text>Builds planning and strategizing abilities.</Text>
        </Card>

        {/* Benefit 4 */}
        <Card
          shadow="sm"
          padding="lg"
          radius="lg"
          withBorder
          className={classes.benefitBox}
        >
          <Flex align="center" mb="sm" gap="sm">
            <ThemeIcon
              variant="gradient"
              gradient={{ from: "blue", to: "indigo", deg: 90 }}
              size={38}
              radius="xl"
            >
              <IconFocusCentered size={24} />
            </ThemeIcon>
            <Title
              order={4}
              lts="-0.05em"
              className={classes.heading}
              style={{
                fontSize: isMobile ? "1.5rem" : "1.75rem",
              }}
            >
              Focus & Confidence
            </Title>
          </Flex>
          <Text>Improves concentration and builds resilience.</Text>
        </Card>
      </SimpleGrid>

      {/* Call-to-Action */}
      <Flex align="center" justify="center">
        <Button
          size="md"
          radius="lg"
          variant="gradient"
          gradient={{ from: "blue", to: "indigo", deg: 90 }}
          leftSection={<IconInfoCircle size={20} />}
        >
          Learn More
        </Button>
      </Flex>
    </Container>
  );
}
