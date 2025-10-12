/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.html", "./components/*.html"],
  theme: {
    extend: {
      colors: {
        // Base colors from Figma
        base: {
          "surface-1": "#ffffff",
          "surface-2": "#fafaf9",
          "fill-1": "#f5f5f4",
          "fill-2": "#e7e5e4",
          "fill-3": "#d6d3d1",
          "fill-4": "#a8a29f",
          "fill-5": "#56524e",
          border: "#e7e5e4",
          disabled: "#1a1a1a2e",
        },
        // Text colors - flattened for proper utility generation
        "text-dark-primary": "#1a1a1a",
        "text-dark-secondary": "#1a1a1ab2",
        "text-dark-tertiary": "#1a1a1a5c",
        "text-light-primary": "#ffffff",

        // State colors - flattened for proper utility generation
        "state-brand-hover": "#f67416",
        "state-brand-active": "#e4570c",
        "state-brand-selected": "#fb923c",
        "state-danger-hover": "#fb657c",
        "state-danger-active": "#cb1a41",
        "state-danger-selected": "#fec3ca",
        // Alpha colors
        alpha: {
          dark: {
            50: "#1a1a1a14", // rgba(26, 26, 26, 0.08)
            100: "#1a1a1a1f", // rgba(26, 26, 26, 0.12)
            200: "#1a1a1a2e", // rgba(26, 26, 26, 0.18)
            300: "#1a1a1a42", // rgba(26, 26, 26, 0.26)
          },
          light: {
            200: "#ffffff2e", // rgba(255, 255, 255, 0.18)
          },
        },
      },
      spacing: {
        // Custom spacing from Figma
        0: "0px",
        3: "4px",
        5: "8px",
        7: "12px",
        8: "16px",
        9: "20px",
        10: "24px",
        15: "44px",
        18: "64px",
        20: "80px",
        21: "96px",
      },
      fontSize: {
        // Complete text styles from Figma design system
        sm: ["14px", { lineHeight: "22px" }],
        base: ["16px", { lineHeight: "24px" }],
        lg: ["18px", { lineHeight: "28px" }],
        xl: ["20px", { lineHeight: "32px" }],
        "3xl": ["30px", { lineHeight: "42px" }],
        "4xl": ["36px", { lineHeight: "52px" }],
      },

      // Text style utilities from Figma
      textStyles: {
        "sm-regular": ["14px", { lineHeight: "22px", fontWeight: "400" }],
        "sm-medium": ["14px", { lineHeight: "22px", fontWeight: "500" }],
        "sm-semibold": ["14px", { lineHeight: "22px", fontWeight: "600" }],
        "sm-bold": ["14px", { lineHeight: "22px", fontWeight: "700" }],

        "base-regular": ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "base-medium": ["16px", { lineHeight: "24px", fontWeight: "500" }],
        "base-semibold": ["16px", { lineHeight: "24px", fontWeight: "600" }],
        "base-bold": ["16px", { lineHeight: "24px", fontWeight: "700" }],

        "lg-regular": ["18px", { lineHeight: "28px", fontWeight: "400" }],
        "lg-medium": ["18px", { lineHeight: "28px", fontWeight: "500" }],
        "lg-semibold": ["18px", { lineHeight: "28px", fontWeight: "600" }],
        "lg-bold": ["18px", { lineHeight: "28px", fontWeight: "700" }],

        "xl-regular": ["20px", { lineHeight: "32px", fontWeight: "400" }],
        "xl-medium": ["20px", { lineHeight: "32px", fontWeight: "500" }],
        "xl-semibold": ["20px", { lineHeight: "32px", fontWeight: "600" }],
        "xl-bold": ["20px", { lineHeight: "32px", fontWeight: "700" }],

        "3xl-regular": ["30px", { lineHeight: "42px", fontWeight: "400" }],
        "3xl-medium": ["30px", { lineHeight: "42px", fontWeight: "500" }],
        "3xl-semibold": ["30px", { lineHeight: "42px", fontWeight: "600" }],
        "3xl-bold": ["30px", { lineHeight: "42px", fontWeight: "700" }],

        "4xl-regular": ["36px", { lineHeight: "52px", fontWeight: "400" }],
        "4xl-medium": ["36px", { lineHeight: "52px", fontWeight: "500" }],
        "4xl-semibold": ["36px", { lineHeight: "52px", fontWeight: "600" }],
        "4xl-bold": ["36px", { lineHeight: "52px", fontWeight: "700" }],
        "4xl-extrabold": ["36px", { lineHeight: "52px", fontWeight: "800" }],
      },
      fontWeight: {
        regular: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
      },
      fontFamily: {
        sans: ["Inter Variable", "Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        3: "4px",
        5: "8px",
        6: "18px",
        7: "12px",
        8: "16px",
        9: "20px",
        10: "24px",
        15: "44px",
        18: "64px",
        20: "80px",
        21: "96px",
      },
      borderWidth: {
        sm: "1px",
        lg: "2px",
        xl: "3px",
      },
      // Icon sizes
      iconSize: {
        md: "20px",
        lg: "24px",
        xl: "28px",
        "2xl": "32px",
      },

      // Effects from Figma
      backdropBlur: {
        0: "0px",
        1: "3px",
        2: "5px",
        3: "7px",
        4: "9px",
        5: "12px",
        6: "16px",
        7: "24px",
        8: "40px",
        9: "64px",
      },

      blur: {
        0: "0px",
        1: "3px",
        2: "5px",
        3: "7px",
        4: "9px",
        5: "12px",
        6: "16px",
        7: "24px",
        8: "40px",
        9: "64px",
      },

      // Box shadows from Figma
      boxShadow: {
        // Elevation shadows
        xs: "0 1px 2px 0 rgba(16, 24, 40, 0.05)",
        sm: "0 1px 3px 0 rgba(16, 24, 40, 0.1), 0 1px 2px 0 rgba(16, 24, 40, 0.06)",
        md: "0 4px 8px -2px rgba(16, 24, 40, 0.1), 0 2px 4px -2px rgba(16, 24, 40, 0.06)",
        lg: "0 12px 16px -4px rgba(16, 24, 40, 0.08), 0 4px 6px -2px rgba(16, 24, 40, 0.03)",
        xl: "0 20px 24px -4px rgba(16, 24, 40, 0.08), 0 8px 8px -4px rgba(16, 24, 40, 0.03)",
        "2xl": "0 24px 48px -12px rgba(16, 24, 40, 0.18)",
        "3xl": "0 32px 64px -12px rgba(16, 24, 40, 0.14)",
        flat: "none",

        // Depth shadows (stronger)
        "depth-xs":
          "0 1px 3px rgba(26, 26, 26, 0.12), 0 1px 2px rgba(26, 26, 26, 0.24)",
        "depth-sm":
          "0 3px 6px rgba(26, 26, 26, 0.16), 0 3px 6px rgba(26, 26, 26, 0.23)",
        "depth-md":
          "0 10px 20px rgba(26, 26, 26, 0.19), 0 6px 6px rgba(26, 26, 26, 0.23)",
        "depth-lg":
          "0 14px 28px rgba(26, 26, 26, 0.25), 0 10px 10px rgba(26, 26, 26, 0.22)",
        "depth-xl":
          "0 19px 38px rgba(26, 26, 26, 0.30), 0 15px 12px rgba(26, 26, 26, 0.22)",
        "depth-2xl": "0 25px 50px rgba(26, 26, 26, 0.25)",
        "depth-3xl": "0 35px 60px rgba(26, 26, 26, 0.30)",
        "depth-flat": "none",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    // Plugin to generate text style utilities from Figma
    function ({ addUtilities, theme }) {
      const textStyles = theme("textStyles") || {};
      const utilities = {};

      Object.entries(textStyles).forEach(([name, [fontSize, options]]) => {
        utilities[`.text-${name}`] = {
          fontSize: fontSize,
          lineHeight: options.lineHeight,
          fontWeight: options.fontWeight,
        };
      });

      addUtilities(utilities);
    },
  ],
};
