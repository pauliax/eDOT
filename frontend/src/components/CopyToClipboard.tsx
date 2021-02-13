type Props = {
  copyText?: string;
};

export function CopyToClipboard({ copyText }: Props) {
  return (
    <button
      type="button"
      className="btn btn-link p-0 m-0"
      title="Copy to clipboard"
      onClick={() => {
        navigator.clipboard.writeText(copyText || "");
      }}
    >
      <p>❏</p>
    </button>
  );
}
