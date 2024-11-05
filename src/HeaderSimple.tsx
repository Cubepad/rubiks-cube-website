import { useState } from "react";
import { Burger, Container, Button } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { MantineLogo } from "@mantinex/mantine-logo";
import classes from './HeaderSimple.module.css'; // Import CSS module

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
      style={{
        position: "fixed",
        top: "1rem",
        left: "50%",
        transform: "translateX(-50%)",
        width: "calc(100% - 2rem)",
        maxWidth: "1280px",
        border: "1px solid var(--mantine-color-gray-3)",
        borderRadius: "12px",
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
        <MantineLogo size={28} />

        {/* Desktop Navigation */}
        {!isMobile && (
          <div style={{ display: "flex", gap: "1.5rem" }}>{items}</div>
        )}

        {/* Start Learning Button */}
        {!isMobile && (
          <Button
            size="sm"
            radius="lg"
            color="blue"
            variant="gradient"
            gradient={{ from: "blue", to: "indigo", deg: 90 }}
          >
            Start Learning
          </Button>
        )}

        {/* Mobile Burger Menu */}
        {isMobile && (
          <Burger
            opened={opened}
            onClick={toggle}
            size="sm"
            aria-label="Toggle navigation"
          />
        )}
      </Container>

      {/* Mobile Expanded Navigation */}
      {isMobile && opened && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1.5rem",
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
        </div>
      )}
    </header>
  );
}

export default HeaderSimple;
