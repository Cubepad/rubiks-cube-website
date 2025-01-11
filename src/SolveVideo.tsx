import { useNavigate } from "react-router-dom";
import {
  Title,
  Text,
  Container,
  Group,
  Pagination,
} from "@mantine/core";
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
        Final Step: Solving the Yellow Corners
      </Title>
      <Group mb="xl" justify="center">
        <Text ta="center" style={{ maxWidth: "800px", textWrap: "balance" }}>
          The last step is to fix the corners and complete the cube! This part
          requires attention to detail—just follow each move carefully, and
          don't worry if the cube appears messy during the process. As long as
          you focus on one corner at a time, everything will fall into place.
        </Text>
      </Group>
      
      <Group justify="center" mb="xl">
          <video width="100%" height="auto" controls>
            <source src="/solve-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
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
