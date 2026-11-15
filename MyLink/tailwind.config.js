/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './src/pages/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/app/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: [
          '"Pretendard Variable"',
          'Pretendard',
          '-apple-system',
          'BlinkMacSystemFont',
          'system-ui',
          'Roboto',
          '"Helvetica Neue"',
          '"Segoe UI"',
          '"Apple SD Gothic Neo"',
          '"Noto Sans KR"',
          'sans-serif',
        ],
      },
      colors: {
        // shadcn standard semantic mapping
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },

        // Toss Design System (TDS) Direct Tokens from design.md
        toss: {
          blue: {
            50: "#e8f3ff",
            500: "#3182f6",
            600: "#1b64da",
            700: "#134cb2",
          },
          grey: {
            50: "#f9fafb",
            100: "#f2f4f6",
            200: "#e5e8eb",
            300: "#d1d6db",
            400: "#b0b8c1",
            500: "#8b95a1",
            600: "#6b7684",
            700: "#4e5968",
            800: "#333d4b",
            900: "#191f28",
          },
          green: {
            500: "#04b068",
          },
          red: {
            500: "#f04452",
          },
        },
      },
      borderRadius: {
        // TDS Radii
        "tds-xs": "4px",
        "tds-s": "8px",
        "tds-m": "12px",
        "tds-l": "14px",
        "tds-xl": "16px",
        "tds-2xl": "20px",
        "tds-3xl": "24px",
        "tds-4xl": "32px",
        "tds-full": "999px",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        card: "0 4px 20px rgba(0, 0, 0, 0.04)",
        dialog: "0 12px 32px rgba(25, 31, 40, 0.10), 0 2px 6px rgba(25, 31, 40, 0.06)",
        toast: "0 8px 24px rgba(25, 31, 40, 0.16)",
        btn: "0 4px 12px rgba(49, 130, 246, 0.25)",
        "tds-card": "0 4px 20px rgba(0, 0, 0, 0.04)",
        "tds-dialog": "0 12px 32px rgba(25, 31, 40, 0.10), 0 2px 6px rgba(25, 31, 40, 0.06)",
        "tds-toast": "0 8px 24px rgba(25, 31, 40, 0.16)",
        "tds-btn": "0 4px 12px rgba(49, 130, 246, 0.25)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
