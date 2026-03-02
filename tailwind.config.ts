import type { Config } from "tailwindcss";
// Kita gunakan import, bukan require, untuk menghindari typo
import typography from "@tailwindcss/typography";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                emerald: {
                    50: "#ecfdf5",
                    100: "#d1fae5",
                    600: "#059669",
                    700: "#047857",
                    800: "#065f46",
                }
            },
        },
    },
    plugins: [
        typography, // Plugin yang kita import di atas
    ],
};
export default config;