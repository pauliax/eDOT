import { SocialLink } from "./SocialLink";

type Props = {
  footerText?: string;
};

export function Footer({ footerText }: Props) {
  return (
    <>
      <div className="d-flex justify-content-around my-4">
        <SocialLink name="twitter" url="https://twitter.com/" />
        <SocialLink name="github" url="https://github.com/" />
        <SocialLink name="medium" url="https://medium.com/" />
        <SocialLink name="youtube" url="https://youtube.com/" />
      </div>
      <p>
        &copy; {new Date().getFullYear()} {footerText}
      </p>
    </>
  );
}
