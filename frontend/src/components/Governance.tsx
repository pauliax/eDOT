export function Governance() {
  return (
    <div>
      <h4 className="text-center">
        <span className="nes-text">#</span> Governance
      </h4>
      <p className="text-center my-4">
        Use your govDOT tokens to vote and create new governance proposals.{" "}
        <a href="#top">Read more here</a>.
      </p>
      <div className="nes-badge w-100 my-5">
        <span className="is-error w-100">COMING SOON!</span>
      </div>
      {/* <div className="container">
        <div className="row justify-content-around">
          <button
            type="button"
            className="nes-btn is-large is-disabled gov-btn"
            disabled={true}
          >
            Propose
          </button>
          <button
            type="button"
            className="nes-btn is-large is-disabled gov-btn"
            disabled={true}
          >
            Vote
          </button>
        </div>
      </div> */}
    </div>
  );
}
