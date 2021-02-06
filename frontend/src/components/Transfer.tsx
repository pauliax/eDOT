import React from "react";

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
        <div className="form-group">
          <label>Amount of {tokenSymbol}</label>
          <input
            className="form-control"
            type="number"
            step="1"
            name="amount"
            placeholder="1"
            required
          />
        </div>
        <div className="form-group">
          <label>Recipient address</label>
          <input className="form-control" type="text" name="to" required />
        </div>
        <div className="form-group">
          <input className="btn btn-primary" type="submit" value="Transfer" />
        </div>
      </form>
    </div>
  );
}
