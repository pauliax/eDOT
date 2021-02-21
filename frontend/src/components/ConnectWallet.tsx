import { NetworkErrorMessage } from "./NetworkErrorMessage";
import Polkadot from "../images/polkadot_64.png";
import Binance from "../images/binance_64.png";

type Props = {
  connectWallet: () => void;
  networkError?: string;
  dismiss: () => void;
};

export function ConnectWallet({ connectWallet, networkError, dismiss }: Props) {
  return (
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col-12 text-center">
          {/* Metamask network should be set to Localhost:8545. */}
          {networkError && (
            <NetworkErrorMessage message={networkError} dismiss={dismiss} />
          )}
        </div>
        <div className="col-12 p-4 text-center">
          <img alt="Binance" src={Binance} />
          <span> &#38; </span>
          <img alt="Polkadot" src={Polkadot} />
        </div>
        <div className="col-12 p-4 text-center">
          <p>Please connect to your wallet.</p>
          <button
            className="btn btn-warning"
            type="button"
            onClick={connectWallet}
          >
            Connect Wallet
          </button>
        </div>
        <div className="col-12 p-4 text-center">
          <section className="nes-container is-rounded">
            <p>⯬ Get started ⯮</p>
            <a
              href="https://docs.binance.org/smart-chain/wallet/metamask.html"
              rel="noopener noreferrer"
              target="_blank"
            >
              Instructions How To Use MetaMask For Binance Smart Chain
            </a>
            <h5 className="text-left mt-4">BSC Testnet:</h5>
            <ul className="text-left nes-list is-circle">
              <li>
                <a
                  href="https://docs.binance.org/smart-chain/developer/rpc.html"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  RPC URLs
                </a>
              </li>
              <li>ChainID: 0x61 or 97 in decimal</li>
              <li>Symbol: BNB</li>
              <li>Block Explorer: https://testnet.bscscan.com</li>
            </ul>
          </section>
        </div>
      </div>
      <p className="text-center">
        Made with <i className="nes-icon heart mb-2"></i> for the Binance
        Hackathon: The Future Is Now{" "}
      </p>
    </div>
  );
}
