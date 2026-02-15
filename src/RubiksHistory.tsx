import { Container, Title, Text, Timeline } from "@mantine/core";
import { IconClock, IconWorld, IconRocket, IconTrophy, IconCube, IconBolt, IconMagnet } from "@tabler/icons-react";
import { useMediaQuery } from "@mantine/hooks";
import classes from "./RubiksHistory.module.css";

export function RubiksHistory() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Container size="md" py="xl" px="md">
      <Title
        ta="center"
        order={2}
        mb="xl"
        lts="-0.05em"
        className={classes.mainTitle}
        style={{ fontSize: isMobile ? "2rem" : "2.75rem" }}
      >
        History of the Rubik's Cube
      </Title>
      <Container size="sm">
        <Timeline active={9} bulletSize={44} lineWidth={4}>
          <Timeline.Item
            bullet={<IconClock size={28} />}
            title={<Title order={3} className={classes.timelineTitle}>1974 - Invention</Title>}
          >
            <Text className={classes.timelineText}>The Rubik's Cube was invented by Hungarian architect Ernő Rubik to teach spatial relationships to his students.</Text>
          </Timeline.Item>

          <Timeline.Item
            bullet={<IconWorld size={28} />}
            title={<Title order={3} className={classes.timelineTitle}>1980 - Global Success</Title>}
          >
            <Text className={classes.timelineText}>The Rubik's Cube became an international sensation, with over 100 million cubes sold worldwide by 1982.</Text>
          </Timeline.Item>

          <Timeline.Item
            bullet={<IconTrophy size={28} />}
            title={<Title order={3} className={classes.timelineTitle}>1982 - First World Championship</Title>}
          >
            <Text className={classes.timelineText}>The first Rubik's Cube World Championship was held in Budapest, Hungary. Minh Thai won with a time of 22.95 seconds.</Text>
          </Timeline.Item>

          <Timeline.Item
            bullet={<IconRocket size={28} />}
            title={<Title order={3} className={classes.timelineTitle}>1985 - In Space</Title>}
          >
            <Text className={classes.timelineText}>Astronauts took a Rubik's Cube to space, making it one of the first puzzles ever solved in zero gravity.</Text>
          </Timeline.Item>

          <Timeline.Item
            bullet={<IconBolt size={28} />}
            title={<Title order={3} className={classes.timelineTitle}>2003 - Speedcubes Emerge</Title>}
          >
            <Text className={classes.timelineText}>The first speedcubes designed for competition started to appear, revolutionizing the sport.</Text>
          </Timeline.Item>

          <Timeline.Item
            bullet={<IconMagnet size={28} />}
            title={<Title order={3} className={classes.timelineTitle}>2016 - Magnetic Cubes</Title>}
          >
            <Text className={classes.timelineText}>The first magnetic speedcubes were introduced, further improving solve times.</Text>
          </Timeline.Item>

          <Timeline.Item
            bullet={<IconCube size={28} />}
            title={<Title order={3} className={classes.timelineTitle}>2018 - Sub-4 Second Solve</Title>}
          >
            <Text className={classes.timelineText}>Yusheng Du set a world record of 3.47 seconds on November 24th, 2018, breaking the 4-second barrier.</Text>
          </Timeline.Item>

          <Timeline.Item
            bullet={<IconTrophy size={28} />}
            title={<Title order={3} className={classes.timelineTitle}>2026 - Current World Record</Title>}
          >
            <Text className={classes.timelineText}>Teodor Zajder set the current world record for single solve at 2.76 seconds on February 8th, 2026.</Text>
          </Timeline.Item>
        </Timeline>
      </Container>
    </Container>
  );
}
