export function Rebase() {
  const onRebaseClick = () => {};

  return (
    <div>
      <h4 className="text-center">
        <span className="nes-text is-warning">#</span> Rebase
      </h4>
      <p className="text-center my-4">
        Rebase. <a href="#top">Read more here</a>.
      </p>
      <div className="text-center">
        <button
          type="button"
          className="nes-btn is-success"
          onClick={() => onRebaseClick()}
        >
          Rebase
        </button>
      </div>
    </div>
  );
}
