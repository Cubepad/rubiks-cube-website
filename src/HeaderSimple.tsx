import { useState, useRef, useEffect } from "react";
import {
  Burger,
  Container,
  Flex,
  Button,
  ActionIcon,
  useMantineColorScheme,
  Tooltip,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconSun, IconMoon } from "@tabler/icons-react";
import classes from "./HeaderSimple.module.css";
import { ThemeLogo } from "./ThemeLogo";
import { Link, useLocation } from "react-router-dom";

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
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location]);

  useEffect(() => {
    const activeIndex = links.findIndex((link) => link.link === activeTab);
    if (
      activeIndex !== -1 &&
      indicatorRef.current &&
      linksRef.current[activeIndex]
    ) {
      const activeLink = linksRef.current[activeIndex];
      indicatorRef.current.style.width = `${activeLink?.offsetWidth}px`;
      indicatorRef.current.style.height = `${activeLink?.offsetHeight}px`;
      indicatorRef.current.style.left = `${activeLink?.offsetLeft}px`;
      indicatorRef.current.style.top = `${activeLink?.offsetTop}px`;
    }
  }, [activeTab]);

  const items = links.map((link, index) => (
    <Link
      key={link.label}
      to={link.link}
      ref={(el) => (linksRef.current[index] = el)}
      onClick={() => {
        if (isMobile) close();
        setActiveTab(link.link);
      }}
      className={classes.link}
      style={{
        fontWeight: isMobile ? 700 : 500,
        fontSize: isMobile ? "2rem" : "1rem",
        color:
          activeTab === link.link
            ? "var(--mantine-color-blue-light-color)"
            : "inherit",
      }}
    >
      {link.label}
    </Link>
  ));

  return (
    <header
      className={classes.header}
      style={{
        height: isMobile && opened ? "96.5%" : "4rem",
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
        {isMobile ? (
          <>
            <ActionIcon
              variant="default"
              onClick={() => toggleColorScheme()}
              radius="md"
              title="Toggle color scheme"
              size="lg"
            >
              {colorScheme === "dark" ? (
                <IconSun size={18} />
              ) : (
                <IconMoon size={18} />
              )}
            </ActionIcon>

            <Link to="/" style={{ display: "inline-flex" }}>
              <ThemeLogo />
            </Link>

            <Burger
              opened={opened}
              onClick={toggle}
              size="sm"
              aria-label="Toggle navigation"
            />
          </>
        ) : (
          <>
            <Link to="/" style={{ display: "inline-flex" }}>
              <ThemeLogo />
            </Link>
            <Flex gap="sm" style={{ position: "relative" }}>
              {items}
              <div ref={indicatorRef} className={classes.floatingIndicator} />
            </Flex>
            <Flex align="center" gap="sm">
              <Tooltip zIndex={1001} label="Color Scheme">
                <ActionIcon
                  variant="default"
                  onClick={() => toggleColorScheme()}
                  radius="md"
                  size="lg"
                >
                  {colorScheme === "dark" ? (
                    <IconSun size={22} />
                  ) : (
                    <IconMoon size={22} />
                  )}
                </ActionIcon>
              </Tooltip>
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
          </>
        )}
      </Container>

      {isMobile && opened && (
        <Flex
          direction="column"
          align="center"
          gap="xl"
          style={{
            paddingTop: "1.5rem",
            letterSpacing: "-0.05em",
          }}
        >
          {items}
          <Button
            component={Link}
            to="/cube-basics"
            onClick={() => close()}
            size="xl"
            radius="lg"
            color="blue"
            variant="gradient"
            gradient={{ from: "indigo", to: "blue", deg: 90 }}
            style={{
              marginBottom: "1rem",
              fontWeight: "700",
              letterSpacing: "0",
            }}
          >
            Start Learning
          </Button>
        </Flex>
      )}
    </header>
  );
}

export default HeaderSimple;
