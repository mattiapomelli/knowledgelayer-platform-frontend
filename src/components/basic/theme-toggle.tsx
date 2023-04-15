import { useTheme } from "next-themes";

import { useHasMounted } from "@hooks/use-has-mounted";
import MoonIcon from "@icons/moon.svg";
import SunIcon from "@icons/sun.svg";

export const ThemeToggle = () => {
  const mounted = useHasMounted();
  const { resolvedTheme, setTheme } = useTheme();

  if (!mounted) return null;

  return (
    <button
      className="rounded-sm p-0.5 focus:outline-none focus:ring-primary/50 focus-visible:ring-4"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      {resolvedTheme === "dark" ? (
        <SunIcon className="h-6 w-6" />
      ) : (
        <MoonIcon className="h-6 w-6" />
      )}
    </button>
  );
};
