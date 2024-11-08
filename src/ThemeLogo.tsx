import { useMantineColorScheme } from '@mantine/core';
import logoLight from './assets/text-logo-light.svg';
import logoDark from './assets/text-logo-dark.svg';

interface ThemeLogoProps {
  width?: string | number;
  height?: string | number;
}

export function ThemeLogo({ width = 110, height = 33 }: ThemeLogoProps) {
  const { colorScheme } = useMantineColorScheme();
  const logo = colorScheme === 'dark' ? logoDark : logoLight;

  return (
    <img 
      src={logo} 
      alt="Cubepad Logo" 
      style={{ width, height }}
    />
  );
}