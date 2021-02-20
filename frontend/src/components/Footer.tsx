import { SocialLink } from "./SocialLink";

type Props = {
  footerText?: string;
};

export function Footer({ footerText }: Props) {
  return (
    <>
      <p>
        Let's be friends! <i className="nes-icon heart mb-2"></i>
      </p>
      <div className="d-flex justify-content-around my-4">
        <SocialLink name="twitter" url="https://twitter.com/" />
        <SocialLink name="github" url="https://github.com/" />
        <SocialLink name="medium" url="https://medium.com/" />
        <SocialLink name="youtube" url="https://youtube.com/" />
      </div>
      <p className="mt-5 mb-0">
        &copy; {new Date().getFullYear()} {footerText}
      </p>
    </>
  );
}
