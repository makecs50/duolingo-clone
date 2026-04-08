export const BUTTON_FACE_RIM_COLORS = {
  green: { rim: "#E5A000", face: "#58CC00" },
  purple: { rim: "#1792CC", face: "#1CB0F5" },
  blue: { rim: "#A32A71", face: "#CC348D" },
  gray: { rim: "#b7b7b7", face: "#E5E5E5" },
  yellow: { rim: "#CB7801", face: "#FEB142" },
} as const;

export type ButtonThemeColorKey = keyof typeof BUTTON_FACE_RIM_COLORS;
