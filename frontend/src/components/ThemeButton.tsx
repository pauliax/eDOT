import { useContext, useEffect } from "react";
import { ThemeContext } from "../contexts/Context";

export function ThemeButton() {
  const themeKey = "Theme";
  const darkThemeClass = "dark-theme";
  const dark = "dark";
  const light = "light";

  const { isDarkTheme, setIsDarkTheme } = useContext(ThemeContext);

  useEffect(() => {
    if (!localStorage || !setIsDarkTheme) return;
    const theme = localStorage.getItem(themeKey);
    if (theme === dark) setIsDarkTheme(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps,
  }, []);

  useEffect(() => {
    if (!localStorage || !document?.body) return;

    if (isDarkTheme) {
      localStorage.setItem(themeKey, dark);
      document.body.classList.add(darkThemeClass);
    } else {
      localStorage.setItem(themeKey, light);
      document.body.classList.remove(darkThemeClass);
    }
  }, [isDarkTheme]);

  const toggleTheme = () => {
    if (setIsDarkTheme) setIsDarkTheme(!isDarkTheme);
  };

  return (
    <button
      type="button"
      className="nes-btn is-error scroll-btn active pt-0"
      title="Toggle dark/light theme"
      onClick={toggleTheme}
    >
      {isDarkTheme ? <span>☀️</span> : <span>🌘</span>}
    </button>
  );
}
