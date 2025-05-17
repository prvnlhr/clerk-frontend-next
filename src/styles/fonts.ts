import localFont from "next/font/local";

const satoshi = localFont({
  src: [
    // Static fonts
    ...["Light", "Regular", "Medium", "Bold", "Black"].flatMap((weight) => [
      {
        path: `../../public/fonts/satoshi/Satoshi-${weight}.woff2`,
        weight:
          weight === "Light"
            ? "300"
            : weight === "Regular"
            ? "400"
            : weight === "Medium"
            ? "500"
            : weight === "Bold"
            ? "700"
            : "900",
        style: "normal",
      },
      {
        path: `../../public/fonts/satoshi/Satoshi-${weight}Italic.woff2`,
        weight:
          weight === "Light"
            ? "300"
            : weight === "Regular"
            ? "400"
            : weight === "Medium"
            ? "500"
            : weight === "Bold"
            ? "700"
            : "900",
        style: "italic",
      },
    ]),

    // Variable fonts
    {
      path: "../../public/fonts/satoshi/Satoshi-Variable.woff2",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "../../public/fonts/satoshi/Satoshi-VariableItalic.woff2",
      weight: "100 900",
      style: "italic",
    },
  ],
  display: "swap", // Optional: improves loading behavior
  variable: "--font-satoshi", // CSS variable name
});

export default satoshi;
