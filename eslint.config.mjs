import { defineConfig, globalIgnores } from 'eslint/config';
import coreWebVitals from 'eslint-config-next/core-web-vitals';
import typescript from 'eslint-config-next/typescript';

const eslintConfig = defineConfig([
  ...coreWebVitals,
  ...typescript,
  globalIgnores(['coverage/**']),
]);

export default eslintConfig;
