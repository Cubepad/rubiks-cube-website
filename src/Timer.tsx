import { useState, useEffect, useCallback, useRef } from "react";
import {
  Button,
  Stack,
  Container,
  Title,
  Text,
  CloseButton,
  Group,
  ActionIcon,
  Box,
  Flex,
  Table,
} from "@mantine/core";
import {
  IconRefresh,
  IconChartLine,
  IconList,
  IconMath,
  IconTrash,
} from "@tabler/icons-react";
import { LineChart } from "@mantine/charts";
import { useMediaQuery } from "@mantine/hooks";
import classes from "./Timer.module.css";

const generateScramble = () => {
  const moves = ["R", "L", "U", "D", "F", "B"];
  const modifiers = ["", "'", "2"];
  const scramble = [];

  let lastMove = null;

  for (let i = 0; i < 20; i++) {
    let move, modifier;

    // Keep generating a move until it's valid (not the same as the last move and not the reverse of the last move)
    do {
      move = moves[Math.floor(Math.random() * moves.length)];
      modifier = modifiers[Math.floor(Math.random() * modifiers.length)];
    } while (
      move === lastMove || // Same move as the last one
      (modifier === "'" && lastMove === move) || // Reverse move (like R followed by R')
      (modifier === "2" && lastMove === move) // Double turn of the same move (like R2 followed by R2)
    );

    scramble.push(move + modifier);
    lastMove = move; // Update last move to the current one
  }

  return scramble.join(" ");
};

const calculateAverage = (times: number[], n: number) => {
  if (times.length < n) return null;
  const sortedTimes = [...times].sort((a, b) => a - b).slice(1, -1);
  return sortedTimes.reduce((a, b) => a + b, 0) / (n - 2);
};

interface SolveTime {
  time: number;
  penalty: 'none' | '+2' | 'DNF';
  originalTime: number;
}

export function Timer() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [scramble, setScramble] = useState(generateScramble());
  const [times, setTimes] = useState<SolveTime[]>(() => {
    const savedTimes = localStorage.getItem("cubeTimes");
    return savedTimes ? JSON.parse(savedTimes) : [];
  });
  const [showChart, setShowChart] = useState(true);
  const [showList, setShowList] = useState(true);
  const [showAverages, setShowAverages] = useState(true);
  const [isHolding, setIsHolding] = useState(false);
  const holdTimerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const animationFrameRef = useRef<number>();

  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    localStorage.setItem("cubeTimes", JSON.stringify(times));
  }, [times]);

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = performance.now();
      
      const updateTimer = () => {
        const now = performance.now();
        const elapsed = now - startTimeRef.current;
        setTime(Math.floor(elapsed));
        animationFrameRef.current = requestAnimationFrame(updateTimer);
      };
      
      animationFrameRef.current = requestAnimationFrame(updateTimer);
      
      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }
  }, [isRunning]);

  const startStop = useCallback(() => {
    if (!isRunning) {
      setTime(0);
      setScramble(generateScramble());
      setIsRunning(true);
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      setTimes((prevTimes) => [{ time, penalty: 'none', originalTime: time }, ...prevTimes]);
      setIsRunning(false);
    }
  }, [isRunning, time]);

  // Rest of your code remains the same...

  const reset = useCallback(() => {
    if (isRunning) {
      setIsRunning(false);
    }
    setTime(0);
    setScramble(generateScramble());
  }, [isRunning]);
  
  const hasHeldLongEnough = useRef(false);
  const touchStartTimeRef = useRef<number>(0);
  const hasHeldLongEnoughTouch = useRef(false);
  const holdStartTime = useRef<number>(0);
  
  const handleTouchStart = useCallback((e: TouchEvent) => {
    e.preventDefault();
    if (!isRunning && !isHolding) {
      setIsHolding(true);
      touchStartTimeRef.current = Date.now();
      
      // Start holding detection, this is for a long press
      holdTimerRef.current = window.setTimeout(() => {
        hasHeldLongEnoughTouch.current = true;
      }, 200);
    }
    // If already running and tapped, stop immediately
    if (isRunning) {
      // Stop the timer when already running, as soon as touched
      startStop();
    }
  }, [isRunning, isHolding, startStop]);
  
  const handleTouchEnd = useCallback((e: TouchEvent) => {
    e.preventDefault();
    
    // Cancel long press detection if it hasn't been triggered
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
    }
  
    // If held long enough and timer isn't running, start the timer
    if (hasHeldLongEnoughTouch.current && !isRunning) {
      startStop();
    } else if (isRunning) {
      // If already running and no long press, just stop it
      startStop();
    }
  
    setIsHolding(false);
    hasHeldLongEnoughTouch.current = false;
    touchStartTimeRef.current = 0;
  }, [isRunning, startStop]);
  
  useEffect(() => {
    const timerElement = document.getElementById('timer-display');
    
    if (isMobile && timerElement) {
      timerElement.addEventListener('touchstart', handleTouchStart, { passive: false });
      timerElement.addEventListener('touchend', handleTouchEnd, { passive: false });
      
      // Prevent default touch behavior (scrolling, zooming)
      const preventDefault = (e: TouchEvent) => {
        e.preventDefault();
      };
      
      timerElement.addEventListener('touchmove', preventDefault, { passive: false });
      
      return () => {
        timerElement.removeEventListener('touchstart', handleTouchStart);
        timerElement.removeEventListener('touchend', handleTouchEnd);
        timerElement.removeEventListener('touchmove', preventDefault);
      };
    }
  }, [isMobile, handleTouchStart, handleTouchEnd]);
  

  useEffect(() => {
    // Prevent space scrolling globally
    const preventSpaceScroll = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
      }
    };
  
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space" && !isRunning && !isHolding) {
        event.preventDefault();
        setIsHolding(true);
        holdStartTime.current = Date.now();
        
        holdTimerRef.current = window.setTimeout(() => {
          hasHeldLongEnough.current = true;
        }, 200);
      } else if (event.code === "Escape") {
        event.preventDefault();
        reset();
      } else if (isRunning && !event.code.startsWith("F") && event.code !== "Escape") {
        event.preventDefault();
        startStop();
      }
    };
  
    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        event.preventDefault();
        
        if (holdTimerRef.current) {
          clearTimeout(holdTimerRef.current);
        }
        
        if (hasHeldLongEnough.current && !isRunning) {
          startStop();
        }
        
        setIsHolding(false);
        hasHeldLongEnough.current = false;
        holdStartTime.current = 0;
      }
    };
  
    // Add the global space prevention listener
    window.addEventListener('keydown', preventSpaceScroll, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
  
    return () => {
      window.removeEventListener('keydown', preventSpaceScroll);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [startStop, reset, isRunning, isHolding]);
  
  // Rest of the code remains the same...

  const formatTime = (time: number | null) => {
    if (time === null) return "None";
    const seconds = Math.floor(time / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    return `${seconds}.${milliseconds.toString().padStart(2, "0")}`;
  };

  const deleteTime = (index: number) => {
    setTimes((prevTimes) => prevTimes.filter((_, i) => i !== index));
  };

  const clearAllTimes = () => {
    setTimes([]);
  };

  const togglePenalty = (index: number, penalty: '+2' | 'DNF') => {
    setTimes((prevTimes) =>
      prevTimes.map((t, i) =>
        i === index
          ? {
              ...t,
              penalty: t.penalty === penalty ? 'none' : penalty,
              time: penalty === '+2' && t.penalty !== '+2' ? t.time + 2000 : t.originalTime
            }
          : t
      )
    );
  };

  const refreshScramble = () => {
    setScramble(generateScramble());
  };

  const pb = times.length > 0 ? Math.min(...times.filter(t => t.penalty !== 'DNF').map(t => t.time)) : null;
  const ao5 = calculateAverage(times.slice(0, 5).map(t => t.penalty === 'DNF' ? Infinity : t.time), 5);
  const ao12 = calculateAverage(times.slice(0, 12).map(t => t.penalty === 'DNF' ? Infinity : t.time), 12);
  const ao100 = calculateAverage(times.slice(0, 100).map(t => t.penalty === 'DNF' ? Infinity : t.time), 100);
  const ao5pb = times.length >= 5 ? Math.min(...times.map((_, i, arr) => calculateAverage(arr.slice(i, i + 5).map(t => t.penalty === 'DNF' ? Infinity : t.time), 5) || Infinity)) : null;

  return (
    <Container size="xl" style={{ marginTop: "8rem" }}>
      <Stack align="center" justify="center" style={{ marginBottom: "3.5rem" }}>
        <Text size="xl" fw={700}>
          {scramble}
        </Text>
        <Group>
          <ActionIcon variant="transparent" size="sm" onClick={refreshScramble}>
            <IconRefresh />
          </ActionIcon>
          <ActionIcon variant="transparent" onClick={() => setShowList(!showList)}>
            <IconList />
          </ActionIcon>
          <ActionIcon variant="transparent" onClick={() => setShowAverages(!showAverages)}>
            <IconMath />
          </ActionIcon>
          <ActionIcon
            variant="transparent"
            onClick={() => setShowChart(!showChart)}
          >
            <IconChartLine />
          </ActionIcon>
        </Group>
        <Title id="timer-display" order={1} style={{ fontSize: "6rem", fontFamily: "monospace" }}>
          {formatTime(time)}
        </Title>
        {isHolding && <Text>Hold to start...</Text>}
      </Stack>

      <Flex className={classes.timeSectionContainer} justify="center" gap="xl">
        {showList && (
          <Box className={classes.timerSection} style={{ flex: 1, maxWidth: isMobile ? '100%' : `600px` }}>
  <Flex justify="space-between" mb="md">
    <Title order={3}>Times</Title>
    <Button leftSection={<IconTrash size="1rem" />} variant="light" radius="md" size="sm" onClick={clearAllTimes}>
      Clear All
    </Button>
  </Flex>
  <Stack>
    {times.slice(0, 1000).map((t, index) => {
      const solveNumber = times.length - index; // Calculate solve number based on total solves
      return (
        <Flex key={index} justify="space-between">
          <Text>
            {solveNumber}.{' '}
            {t.penalty === 'DNF' ? (
              <span style={{ color: 'red' }}>DNF ({formatTime(t.originalTime)})</span>
            ) : t.penalty === '+2' ? (
              <span style={{ color: 'orange' }}>{formatTime(t.time)} ({formatTime(t.originalTime)})</span>
            ) : (
              formatTime(t.time)
            )}
          </Text>
          <Group gap="xs">
            <Button variant="subtle" size="xs" radius="md" onClick={() => togglePenalty(index, '+2')}>
              +2
            </Button>
            <Button variant="subtle" size="xs" radius="md" onClick={() => togglePenalty(index, 'DNF')}>
              DNF
            </Button>
            <CloseButton radius="md" onClick={() => deleteTime(index)} />
          </Group>
        </Flex>
      );
    })}
  </Stack>
</Box>

        )}

        {showAverages && (
          <Box className={classes.timerSection} style={{ flex: 1, maxWidth: isMobile ? '100%' : `600px` }}>
            <Title mb="md" order={3}>Statistics</Title>
            <Table>
              <Table.Tbody>
                <Table.Tr>
                  <Table.Td>PB</Table.Td>
                  <Table.Td>{formatTime(pb)}</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>AO5</Table.Td>
                  <Table.Td>{formatTime(ao5)}</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>AO12</Table.Td>
                  <Table.Td>{formatTime(ao12)}</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>AO100</Table.Td>
                  <Table.Td>{formatTime(ao100)}</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>AO5 PB</Table.Td>
                  <Table.Td>{formatTime(ao5pb)}</Table.Td>
                </Table.Tr>
              </Table.Tbody>
            </Table>
          </Box>
        )}

        {showChart && (
          <Box className={classes.timerSection} style={{ flex: 1, maxWidth: isMobile ? '100%' : '600px' }}>
            <Title mb="md" order={3}>Graph</Title>
            <LineChart
              h={300}
              data={times
                .slice(0, 1000)
                .reverse() // Reverse the array so newest items appear last (on the right)
                .map((solve, index) => ({
                  index: index + 1, // Adjust index to start from 1
                  time: solve.penalty === 'DNF' ? null : (solve.time / 1000).toFixed(2), // Format time to 2 decimal places
                }))}
              dataKey="index"
              series={[{ name: 'time', label: 'Solve Time', color: 'blue' }]}
              curveType="natural"
              tooltipAnimationDuration={200}
              unit="s"
              xAxisProps={{
                tick: false, // Hide the x-axis numbers (ticks)
              }}
              yAxisProps={{
                domain: ['auto', 'auto'], // Dynamically adjust y-axis based on data
              }}
            />
          </Box>
        )}
      </Flex>
    </Container>
  );
}