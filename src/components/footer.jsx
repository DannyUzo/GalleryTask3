import { Logo } from "./logo";
import { GrGithub } from "react-icons/gr";

export const Footer = () => {
  return (
    <footer className="flex-center">
      <Logo />
      <a href="https://github.com/DannyUzo"><GrGithub /></a>
    </footer>
  );
};
