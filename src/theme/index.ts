import { createSystem, defineConfig, defaultConfig } from "@chakra-ui/react";
import { tokens } from "./tokens";
import { globalStyles } from "./global-styles";
import { semanticTokens } from "./semantic-tokens";
import { breakpoints } from "./break-points";

const config = defineConfig({
  globalCss: globalStyles,
  theme: {
    tokens,
    semanticTokens,
    breakpoints,
  },
});

export const system = createSystem(defaultConfig, config);
