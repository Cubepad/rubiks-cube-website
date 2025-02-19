import { Container, Title, Text, Button, Flex } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mantine/hooks";
import classes from "./CrossStep.module.css";
import { IconArrowLeft } from "@tabler/icons-react";

const NotFoundPage = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const navigate = useNavigate();

  return (
    <Container size="lg">
      <Title
        order={2}
        mb="xs"
        mt="5rem"
        style={{ fontSize: isMobile ? "2.75rem" : "4rem" }}
        className={classes.title}
        ta="center"
        lts="-0.05em"
      >
        404 - Page Not Found
      </Title>
      <Text ta="center" mb="xl">
        Oops! The page you are looking for does not exist.
      </Text>
      <Flex justify="center">
      <Button
          leftSection={<IconArrowLeft size={18} />}
          radius="md"
          variant="light"
          size={isMobile ? "sm" : "md"}
          onClick={() => navigate("/")}
        >
          Go Back Home
        </Button>
      </Flex>
    </Container>
  );
};

export default NotFoundPage;
