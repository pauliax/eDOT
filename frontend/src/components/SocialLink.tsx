type Props = {
  name?: string;
  url?: string;
};

export function SocialLink({ name, url }: Props) {
  return (
    <>
      <a href={url} target="_blank" rel="noreferrer noopener">
        <i className={"nes-icon is-large " + name}></i>
      </a>
    </>
  );
}
