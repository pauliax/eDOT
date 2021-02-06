import "../styles/loading.scss";

export function Loading() {
  return (
    <div className="loading-container">
      <div className="loading-inner">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  );
}
