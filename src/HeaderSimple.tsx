import { Burger, Container, Flex, Button, ActionIcon, useMantineColorScheme } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconSun, IconMoon } from '@tabler/icons-react';
import classes from './HeaderSimple.module.css';
import { ThemeLogo } from './ThemeLogo';
import { Link } from 'react-router-dom';

const links = [
  { link: "/", label: "Home" },
  { link: "/cube-basics", label: "Cube Basics" },
  { link: "/tutorials", label: "Tutorials" },
  { link: "/timer", label: "Timer" }, 
];

export function HeaderSimple() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const items = links.map((link) => (
    <Link
      key={link.label}
      to={link.link}
      onClick={() => isMobile && close()}  // Close menu on click for mobile
      className={classes.link}
      style={{
        fontWeight: isMobile ? 700 : 500,
        fontSize: isMobile ? "1.5rem" : "1rem",
      }}
    >
      {link.label}
    </Link>
  ));

  return (
    <header
      className={classes.header}
      style={{
        height: isMobile && opened ? "95%" : "4rem",
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
        <Link
          to="/"
          style={{display: "inline-flex"}}
          >
          <ThemeLogo />
        </Link>

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
              component={Link}
              to="/cube-basics"
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
            component={Link}
            to="/cube-basics"
            onClick={close}  // Close menu on click
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
