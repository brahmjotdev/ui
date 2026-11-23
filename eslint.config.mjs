import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const layerZones = [
  {
    target: "./src/package",
    from: "./src/cli",
    message:
      "Headless src/package cannot import src/cli. Styled code imports @cerevialabs/ui.",
  },
  {
    target: "./src/package",
    from: "./src/docs",
    message: "Headless src/package cannot import src/docs.",
  },
  {
    target: "./src/package",
    from: "./src/app",
    message: "Headless src/package cannot import src/app.",
  },
  {
    target: "./src/cli",
    from: "./src/docs",
    message:
      "src/cli cannot import src/docs. Docs compose the CLI; the CLI wraps headless.",
  },
  {
    target: "./src/cli",
    from: "./src/app",
    message: "src/cli cannot import src/app. App routes compose the CLI.",
  },
  {
    target: "./src/docs",
    from: "./src/app",
    except: ["(content)/nav.ts"],
    message:
      "src/docs may import src/app only at src/app/(content)/nav.ts for footer neighbors.",
  },
];

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    settings: {
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json",
        },
      },
    },
    rules: {
      "import/no-restricted-paths": ["error", { zones: layerZones }],
    },
  },
]);

export default eslintConfig;
