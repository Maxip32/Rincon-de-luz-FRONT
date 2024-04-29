/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rojosanteria: '#5522CC',
        amarillosanteria: '#fffa89',
        primaryColor: '#e03333',
        secondaryColor: '#e03333',
        ChryslerBlue: "#e03333",
        DarkTextPurple: "#7778B0",
        LightText: "#E2E0FF",
        LightGrayText: "#DFDEF1",
        BackgroundLight: "#dcdce1",
        BackgroundDark: "#e03333",
        HeadingsBlack: "#0D0A2C",
        Color1000: "#5F5C7F",
        Color900: "#7F7CA2",
        Color800: "#A4A2C4",
        Color700: "#B4B2CD",
        Color600: "#CCCAE3",
        Color400: "#EFEEFB",
        Color300: "#F9F9FF",
        Color200: "#F9F9FF",
        White: "#FFFFFF",
        
        // Nuevos tonos
        amarilloIntermedio: '#FFFF00',
        amarilloMasOscuro: '#CCCC00',
        purple: '#800080',
        blanco: '#FFFFFF',
        negro: '#000000',
      },
      boxShadow: {
        // light
        "tremor-input": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        "tremor-card": "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        "tremor-dropdown": "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        // dark
        "dark-tremor-input": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        "dark-tremor-card": "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        "dark-tremor-dropdown": "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      },
      borderRadius: {
        "tremor-small": "0.375rem",
        "tremor-default": "0.5rem",
        "tremor-full": "9999px",
      },
      fontSize: {
        "tremor-label": ["0.75rem"],
        "tremor-default": ["0.875rem", { lineHeight: "1.25rem" }],
        "tremor-title": ["1.125rem", { lineHeight: "1.75rem" }],
        "tremor-metric": ["1.875rem", { lineHeight: "2.25rem" }],
      },
      perspective: {
        '1000': '1000px',
      },
    },
  },
  safelist: [
    {
      pattern:
        /^(bg-(?:amarilloIntermedio|purple|blanco|negro)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(text-(?:amarilloIntermedio|purple|blanco|negro)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(border-(?:amarilloIntermedio|purple|blanco|negro)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(ring-(?:amarilloIntermedio|purple|blanco|negro)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(stroke-(?:amarilloIntermedio|purple|blanco|negro)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(fill-(?:amarilloIntermedio|purple|blanco|negro)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
  ],
  plugins: [
    require('@headlessui/tailwindcss'),
    require('tailwind-scrollbar-hide')
  ],
};