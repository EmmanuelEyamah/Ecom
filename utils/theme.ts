const primary = "#4426D9";
const tintColorLight = primary;
const tintColorDark = primary;

const text = "#9C9C9C";
const background = "#fff";

export type ITheme = "light" | "dark";
export type IVariant = "primary" | "secondary" | "accent";
interface IColor extends Record<IVariant, string> {
  text: string;
  background: string;
  tint: string;
  tabIconDefault: string;
  tabIconSelected: string;
}
export const colors: Record<ITheme, IColor> = {
  light: {
    primary,
    secondary: "",
    accent: "",
    text,
    background,
    tint: tintColorLight,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorLight,
  },
  dark: {
    primary,
    secondary: "",
    accent: "",
    text,
    background,
    tint: tintColorDark,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorDark,
  },
};
export const getColor = (theme: "light" | "dark" = "light") => {
  return colors[theme];
};
export default colors;
