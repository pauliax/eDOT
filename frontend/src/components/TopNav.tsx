import { About } from "./About";
import { FAQButton } from "./FAQButton";
import { ThemeButton } from "./ThemeButton";
import { TradeButton } from "./TradeButton";

export function TopNav() {
  return (
    <>
      <FAQButton />
      <TradeButton />
      <About />
      <ThemeButton />
    </>
  );
}
