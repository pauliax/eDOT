import "../styles/progress.scss";

type Props = {
  isProcessing?: boolean;
};

export function ProgressBar({ isProcessing }: Props) {
  const max = 100;

  if (!isProcessing) return null;

  return (
    <div>
      <progress
        className="nes-progress is-pattern m-0 progress-container"
        value={max}
        max={max}
        title="Processing"
      ></progress>
      <span className="text-center progress-container progress-text">
        Processing...
      </span>
    </div>
  );
}
