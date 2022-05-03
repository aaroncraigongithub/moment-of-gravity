import React, { useState } from "react";
import {
  NativeBaseProvider,
  extendTheme,
  VStack,
  HStack,
  Box,
  View,
  Pressable,
} from "native-base";

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

// extend the theme
export const theme = extendTheme({ config });

type MyThemeType = typeof theme;
declare module "native-base" {
  interface ICustomTheme extends MyThemeType {}
}

const colors = [
  "amber",
  "blue",
  "rose",
  "cyan",
  "red",
  "fuchsia",
  "emerald",
  "green",
  "lime",
  "orange",
  "pink",
  "teal",
];

function getRandomColor() {
  const colorIndex = Math.floor(Math.random() * (colors.length - 1));
  const value = (Math.floor(Math.random() * 8) + 1) * 100;

  return `${colors[colorIndex]}.${value}`;
}

const ColorBox = () => {
  const [boxColor, setBoxColor] = useState<string>(getRandomColor());

  function onPress() {
    let nextColor = boxColor;

    while (nextColor === boxColor) {
      nextColor = getRandomColor();
    }
    setBoxColor(nextColor);
  }

  return (
    <Pressable flex={1} onPress={onPress}>
      <Box m={2} flex={1} bg={boxColor} />
    </Pressable>
  );
};

const Row = () => {
  const boxes = [];

  while (boxes.length < 4) {
    boxes.push(<ColorBox />);
  }

  return <HStack flex={1}>{boxes}</HStack>;
};

const Boxes = () => {
  const columns = [];

  while (columns.length < 6) {
    columns.push(<Row key={columns.length} />);
  }

  return <>{columns}</>;
};

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <VStack _dark={{ bg: "blueGray.900" }} p={2} flex={1}>
        <Boxes />
      </VStack>
    </NativeBaseProvider>
  );
}
