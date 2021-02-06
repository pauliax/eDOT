type Props = {
  transferTokens: (to: string, amount: string) => {};
  tokenSymbol?: string;
};

export function Transfer({ transferTokens, tokenSymbol }: Props) {
  return (
    <div>
      <h4>Transfer</h4>
      <form
        onSubmit={(event) => {
          // This function just calls the transferTokens callback with the
          // form's data.
          event.preventDefault();

          const target = event.target as HTMLFormElement; // try to avoid casting
          const formData = new FormData(target);
          const to = formData.get("to");
          const amount = formData.get("amount");

          if (to && amount) {
            transferTokens(to.toString(), amount.toString());
          }
        }}
      >
        <div className="form-group nes-field">
          <label htmlFor="amount_field">Amount of {tokenSymbol}</label>
          <input
            id="amount_field"
            className="nes-input"
            type="number"
            step="1"
            name="amount"
            placeholder="1"
            required
          />
        </div>
        <div className="form-group nes-field">
          <label htmlFor="recipient_field">Recipient address</label>
          <input
            id="recipient_field"
            className="nes-input"
            type="text"
            name="to"
            placeholder="0x12345..."
            required
          />
        </div>
        <div className="form-group">
          <input
            className="btn nes-btn is-primary"
            type="submit"
            value="Transfer"
          />
        </div>
      </form>
    </div>
  );
}
