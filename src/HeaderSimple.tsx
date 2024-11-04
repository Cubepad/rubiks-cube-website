import { useState } from "react";
import { Group, Burger, Drawer, Container } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { MantineLogo } from "@mantinex/mantine-logo";
import classes from "./HeaderSimple.module.css";

const links = [
  { link: "/Home", label: "Home" },
  { link: "/Cube Basics", label: "Cube Basics" },
  { link: "/Tutorials", label: "Tutorials" },
  { link: "/More Resources", label: "More Resources" },
];

export function HeaderSimple() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      data-active={active === link.link || undefined}
      onClick={(event) => {
        event.preventDefault();
        setActive(link.link);
        close(); // Close drawer on link click in mobile view
      }}
      style={{
        textDecoration: "none",
        color: "inherit", // Keep color consistent for all links
        fontWeight: 500,   // Remove bold effect
        fontSize: isMobile ? "1.5rem" : "1rem",
      }}
    >
      {link.label}
    </a>
  ));

  return (
    <header className={classes.header}>
      <Container
        size={1280}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "100%",
        }}
      >
        <MantineLogo size={28} />

        {!isMobile && <Group>{items}</Group>}

        {isMobile && <Burger opened={opened} onClick={toggle} size="sm" />}

        <Drawer
          opened={opened}
          onClose={close}
          padding="xl"
          size="100%"
          position="top"
          transitionProps={{
            transition: "slide-down",
            duration: 200,
            timingFunction: "ease",
          }}
          overlayProps={{
            opacity: 0.5,
            blur: 4,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
              padding: "1.5rem",
            }}
          >
            {items}
          </div>
        </Drawer>
      </Container>
    </header>
  );
}

export default HeaderSimple;
