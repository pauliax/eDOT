import { HashLink } from "react-router-hash-link";

export function FAQButton() {
  return (
    <HashLink smooth to="/#faq" className="dark-text mx-4 p-0">
      FAQ
    </HashLink>
  );
}
