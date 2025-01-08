import React, { useState, useEffect, useRef } from "react";
import { Container, Title, Text, List, Grid, Card, Paper } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import {
  IconBrain,
  IconPuzzle,
  IconMoodSmile,
  IconTarget,
  IconProps
} from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { TwistyPlayer } from "cubing/twisty";
import classes from "./WhyLearn.module.css";

interface BenefitCardProps {
  title: string;
  icon: React.ComponentType<IconProps>;
  color: string;
  onClick: () => void;
  isActive: boolean;
}

const BenefitCard: React.FC<BenefitCardProps> = ({
  title,
  icon: Icon,
  color,
  onClick,
  isActive,
}) => (
  <Card
    shadow="sm"
    padding="lg"
    radius="lg"
    withBorder
    style={{ cursor: "pointer", height: "100%" }}
    onClick={onClick}
  >
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Icon
        size={32}
        color={isActive ? `var(--mantine-color-${color}-6)` : "gray"}
      />
      <Text fw={500} mt="md">
        {title}
      </Text>
    </motion.div>
  </Card>
);

const WhyLearnExtended: React.FC = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const cubeRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<number>(0);

  useEffect(() => {
    if (cubeRef.current) {
      cubeRef.current.innerHTML = "";
      const player = new TwistyPlayer({
        puzzle: "3x3x3",
        alg: "",
        background: "none",
        controlPanel: "none",
        hintFacelets: "none",
      });
      cubeRef.current.appendChild(player);
    }
  }, []);

  const benefits = [
    { title: "Cognitive Benefits", icon: IconBrain, color: "blue" },
    { title: "Memory Benefits", icon: IconPuzzle, color: "green" },
    { title: "Problem-Solving Benefits", icon: IconMoodSmile, color: "orange" },
    { title: "Other Benefits", icon: IconTarget, color: "grape" },
  ];

  const benefitDetails = [
    {
      title: "Cognitive Benefits",
      details: [
        {
          subtitle: "Develops Analytical Thinking",
          content:
            "Solving the cube requires analyzing and planning efficient moves, training your brain to see patterns and break challenges into smaller parts. By planning the first moves, the cube trains your brain to see patterns and analyze which moves would be most efficient for solving the puzzle.",
        },
        {
          subtitle: "Maps Out Steps",
          content:
            "Planning and mapping out steps to solve the puzzle quickly trains the brain in strategic thinking applicable to real-life challenges. This skill can be applied to plan steps and constructively overcome challenges in various aspects of life.",
        },
        {
          subtitle: "Enhances Brain-Hand-Eye Coordination",
          content:
            "The process improves coordination between brain, hands, and eyes, enhancing overall reflexes and dexterity. Solving the cube requires alertness, concentration, and hand movement, resulting in the brain working at a good pace, strong vision, and increased finger dexterity. These improved reflexes can even help with tasks like reading by making eye movements faster.",
        },
      ],
    },
    {
      title: "Memory Benefits",
      details: [
        {
          subtitle: "Improves Overall Memory",
          content:
            "Solving the Rubik's Cube enhances memory by requiring the memorization of complex patterns and solving methods. This improves both spatial and sequential memory, boosting your ability to recall spatial patterns and remember a series of steps in order.",
        },
        {
          subtitle: "Improves Sequential Memory",
          content:
            "The repetition of steps helps improve sequential memory, which is the ability to remember and repeat a series of steps in order. This can be beneficial in learning and performing complex tasks in various fields.",
        },
      ],
    },
    {
      title: "Problem-Solving Benefits",
      details: [
        {
          subtitle: "Builds Strategizing Abilities",
          content:
            "Solving a Rubik's Cube is more than trial and error; it requires exploring possibilities and creating strategies. This enhances overall problem-solving skills applicable to various life situations.",
        },
        {
          subtitle: "Develops Planning Skills",
          content:
            "Planning is an essential skill for solving the cube. Your mind learns to plan and execute strategies that can be applied to other areas of life, improving your ability to tackle complex problems systematically.",
        },
        {
          subtitle: "Enhances Creative Thinking",
          content:
            "The cube encourages you to think outside the box and come up with innovative solutions, fostering creativity in problem-solving approaches.",
        },
      ],
    },
    {
      title: "Other Benefits",
      details: [
        {
          subtitle: "Improves Concentration",
          content:
            "The puzzle requires focus and attention to solve it quickly. Solving the cube trains your brain to filter out distractions and maintain attention on a single task, a skill that's valuable in many areas of life.",
        },
        {
          subtitle: "Builds Patience and Perseverance",
          content:
            "You never know how long it will take to solve the puzzle, and will face many challenges along the way. This process teaches patience and perseverance, preparing your mind to not give up when faced with difficult tasks.",
        },
        {
          subtitle: "Stress Reduction",
          content:
            "Solving the cube can be a meditative process, helping to reduce stress and promote relaxation. It helps declutter the mind by focusing on strategies and methods, distracting your mind from sources of stress and promoting calmness.",
        },
        {
          subtitle: "Entertainment and Boredom Relief",
          content:
            "Solving the cube can be an engaging form of entertainment, effectively eliminating boredom and providing a productive way to pass time.",
        },
      ],
    },
  ];

  return (
    <Container size="lg" py="xl" px="md">
      <Title
        ta="center"
        order={2}
        mb="xl"
        lts="-0.05em"
        className={classes.heading}
        style={{ fontSize: isMobile ? "2rem" : "2.75rem" }}
      >
        Benefits of Solving a Rubik's Cube
      </Title>

      <Grid mb="xl">
        {benefits.map((benefit, index) => (
          <Grid.Col span={{ base: 6, md: 3 }} key={index}>
            <BenefitCard
              {...benefit}
              onClick={() => setActiveSection(index)}
              isActive={activeSection === index}
            />
          </Grid.Col>
        ))}
      </Grid>

      <Grid gutter={{ base: "md", md: "xl" }}>
        <Grid.Col span={{ base: 12, md: 9 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Paper p="lg" style={{ width: "100%" }}>
                <Title
                  order={3}
                  mb="md"
                  className={classes.subHeading}
                  lts="-0.05em"
                >
                  {benefitDetails[activeSection].title}
                </Title>
                <List type="ordered" spacing="md">
                  {benefitDetails[activeSection].details.map(
                    (detail, index) => (
                      <List.Item key={index}>
                        <Text fw={700}>{detail.subtitle}:</Text>
                        <Text>{detail.content}</Text>
                      </List.Item>
                    )
                  )}
                </List>
              </Paper>
            </motion.div>
          </AnimatePresence>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 3 }}>
          <Paper
            shadow="md"
            withBorder
            radius="lg"
            style={{
              width: "100%",
              height: "400px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div ref={cubeRef} />
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default WhyLearnExtended;
