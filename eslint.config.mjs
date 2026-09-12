import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = defineConfig([
  ...nextVitals,
  {
    rules: {
      // Aplikasi ini membaca localStorage, location.hash, dan sessionStorage di dalam
      // useEffect agar render pertama di server dan klien tetap identik (bebas
      // hydration error). Pola ini memang butuh setState di dalam effect.
      "react-hooks/set-state-in-effect": "off",
    },
  },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
