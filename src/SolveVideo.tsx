import { useNavigate } from "react-router-dom";
import { Title, Text, Container, Group, Pagination, Box } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import classes from "./CrossStep.module.css";

const FinalStep = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const navigate = useNavigate();

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
        Example Solve
      </Title>
      <Group mb="xl" justify="center">
        <Text ta="center" style={{ maxWidth: "800px", textWrap: "balance" }}>
        If the steps from the tutorial aren't clear, you can watch the
        example solve below to see how it's done.
        </Text>
      </Group>

      <Group justify="center" mb="xl">
        <Box
          style={{ width: "100%", maxWidth: "800px", aspectRatio: "16 / 9", border: "none" }}
        >
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/q67D8J4ynkk`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Solve Video"
            className={classes.solveVideo}
          />
        </Box>
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

export default FinalStep;
