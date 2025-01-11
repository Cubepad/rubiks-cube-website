import { useNavigate } from "react-router-dom";
import { Title, Text, Container, Group, Pagination } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import ReactPlayer from 'react-player';
import classes from "./CrossStep.module.css";
import video from "./assets/solve-video.mp4";

const SolveVideo = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const navigate = useNavigate();

  return (
    <Container size="md">
      <Title
        order={3}
        mb="xs"
        mt="3rem"
        style={{ fontSize: isMobile ? "1.75rem" : "2.5rem" }}
        className={classes.title}
        ta="center"
        lts="-0.05em"
      >
        Example Solve
      </Title>
      <Group mb="xl" justify="center">
        <Text ta="center" style={{ maxWidth: "800px", textWrap: "balance" }}>
          If if the steps from the tutorial aren't clear, you can watch the
          example solve below to see how it's done.
        </Text>
      </Group>

      <Group justify="center" mb="xl">
        <ReactPlayer
          url={video}
          width="100%"
          height="auto"
          controls={true}
          className={classes.solveVideo}
        />
      </Group>

      <Group justify="center">
        <Pagination
          radius="md"
          total={3}
          value={3}
          mt="xl"
          onChange={(page) => {
            if (page === 1) {
              navigate("/3x3/cross");
            } else if (page === 2) {
              navigate("/3x3/f2l");
            }
          }}
        />
      </Group>
    </Container>
  );
};

export default SolveVideo;
