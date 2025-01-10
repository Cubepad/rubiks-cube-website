import { Text, Container, Button, CopyButton, Anchor } from "@mantine/core";
import { IconCopy, IconCheck } from "@tabler/icons-react";
import { ThemeLogo } from "./ThemeLogo";
import classes from "./Footer.module.css";
import { useNavigate } from "react-router-dom";

const data = [
  {
    title: "General",
    links: [
      { label: "Cube Basics", link: "/cube-basics" },
      { label: "Why Learn", link: "/why-learn" },
    ],
  },
  {
    title: "Tutorials",
    links: [
      { label: "Cross", link: "/3x3/cross" },
      { label: "LBL", link: "/3x3/lbl" },
      { label: "Last Layer", link: "/3x3/last-layer" },
    ],
  },
  {
    title: "Tools",
    links: [{ label: "Solve Timer", link: "/timer" }],
  },
];

export function Footer() {
  const navigate = useNavigate();

  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <Text<"a">
        key={index}
        className={classes.link}
        component="a"
        onClick={(e) => {
          e.preventDefault();
          navigate(link.link);
        }}
        style={{ cursor: "pointer" }}
      >
        {link.label}
      </Text>
    ));

    return (
      <div className={classes.wrapper} key={group.title}>
        <Text className={classes.title}>{group.title}</Text>
        {links}
      </div>
    );
  });

  return (
    <div className={classes.footer}>
      <Container size="lg" className={classes.inner}>
        <div className={classes.logo}>
          <ThemeLogo />
          <Text size="xs" c="dimmed" className={classes.description}>
            Learn to solve the Rubik's Cube from beginner to advanced. Free
            tutorials, tips, and algorithms for speedcubing.
          </Text>
        </div>
        <div className={classes.groups}>{groups}</div>
      </Container>
      <Container size="lg" className={classes.afterFooter}>
        <Text c="dimmed" size="sm">
          © 2025{" "}
          <Anchor href="https://davidolaniyan.pages.dev" target="_blank">
            David Olaniyan.
          </Anchor>{" "}
          All rights reserved.
        </Text>

        <CopyButton value="davideniola108@gmail.com" timeout={2000}>
          {({ copied, copy }) => (
            <Button
              leftSection={
                copied ? <IconCheck size={14} /> : <IconCopy size={14} />
              }
              radius="md"
              variant="light"
              onClick={copy}
              color={copied ? "teal" : "blue"}
            >
              {copied ? "Copied!" : "davideniola108@gmail.com"}
            </Button>
          )}
        </CopyButton>
      </Container>
    </div>
  );
}
