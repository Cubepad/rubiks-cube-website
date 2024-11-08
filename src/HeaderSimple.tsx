import { useState } from "react";
import { Burger, Container, Flex, Button, ActionIcon, useMantineColorScheme } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconSun, IconMoon } from '@tabler/icons-react';
import classes from './HeaderSimple.module.css';
import { ThemeLogo } from './ThemeLogo';

const links = [
  { link: "/Home", label: "Home" },
  { link: "/Cube Basics", label: "Cube Basics" },
  { link: "/Tutorials", label: "Tutorials" },
  { link: "/More Resources", label: "More Resources" },
];

export function HeaderSimple() {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  // Get color scheme functions from Mantine
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const handleLinkClick = (link: string) => {
    setActive(link);
    if (isMobile) toggle();
  };

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      onClick={(event) => {
        event.preventDefault();
        handleLinkClick(link.link);
      }}
      className={`${classes.link} ${active === link.link ? classes.active : ''}`}
      style={{
        fontWeight: isMobile ? 700 : 500,
        fontSize: isMobile ? "1.5rem" : "1rem",
      }}
    >
      {link.label}
    </a>
  ));

  return (
    <header
      className={classes.header}
      style={{
        position: "fixed",
        top: "1rem",
        left: "50%",
        transform: "translateX(-50%)",
        width: "calc(100% - 2rem)",
        maxWidth: "1280px",
        borderRadius: "20px",
        zIndex: 1000,
        backgroundColor: "var(--mantine-color-body)",
        height: isMobile && opened ? "95%" : "4rem",
        overflow: "hidden",
        transition: "height 0.3s ease",
      }}
    >
      <Container
        size={1280}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "4rem",
        }}
      >
        <ThemeLogo />

        {/* Desktop Navigation */}
        {!isMobile && (
          <Flex gap={"sm"}>{items}</Flex>
        )}

        {/* Theme Toggle and Start Learning Buttons in a Flex Group */}
        {!isMobile ? (
          <Flex align="center" gap="sm">
            <ActionIcon
              variant="default"
              onClick={() => toggleColorScheme()}
              radius="md"
              title="Toggle color scheme"
              size="lg"
            >
              {colorScheme === "dark" ? <IconSun size={22} /> : <IconMoon size={22} />}
            </ActionIcon>

            <Button
              component="a"
              size="sm"
              radius="lg"
              color="blue"
              variant="gradient"
              gradient={{ from: "blue", to: "indigo", deg: 90 }}
            >
              Start Learning
            </Button>
          </Flex>
        ) : (
          // Mobile: Burger and Theme Toggle in a Flex container
          <Flex align="center" gap="sm">
            <ActionIcon
              variant="default"
              onClick={() => toggleColorScheme()}
              radius="md"
              title="Toggle color scheme"
              size="lg"
            >
              {colorScheme === "dark" ? <IconSun size={18} /> : <IconMoon size={18} />}
            </ActionIcon>

            <Burger
              opened={opened}
              onClick={toggle}
              size="sm"
              aria-label="Toggle navigation"
            />
          </Flex>
        )}
      </Container>

      {/* Mobile Expanded Navigation */}
      {isMobile && opened && (
        <Flex
          direction="column"
          align="center"
          gap="xl"
          style={{
            paddingTop: "1.5rem",
          }}
        >
          {items}
          <Button
            size="xl"
            radius="lg"
            color="blue"
            variant="gradient"
            gradient={{ from: "indigo", to: "blue", deg: 90 }}
            style={{ marginBottom: "1rem" }}
          >
            Start Learning
          </Button>
        </Flex>
      )}
    </header>
  );
}

export default HeaderSimple;
