// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";
import "@mantine/charts/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/nprogress/styles.css";
import "@mantinex/mantine-logo/styles.css";
import "./font.css";

import { theme } from "./Theme";
import { HeaderSimple } from "./HeaderSimple";
import Hero from "./Hero";
import { MantineProvider, AppShell, Container } from "@mantine/core";

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <AppShell padding="md">
        {/* Place HeaderSimple outside of AppShell.Header */}
        <Container style={{ paddingBottom: "3.75rem" }}>
          <HeaderSimple />
        </Container>
        <AppShell.Main>
          <Hero />
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}
