import { useContext } from "react";
import { Web3Context } from "../contexts/Context";

import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { Transfer } from "./Transfer";
import { NoTokensMessage } from "./NoTokensMessage";
import { Staking } from "./Staking";

import "../styles/tabs.scss";

export const TabbedNav = () => {
  const { balance, selectedAddress, symbol, transferFunc } = useContext(
    Web3Context,
  );

  return (
    <Tabs defaultActiveKey="transfer" id="tabs">
      <Tab eventKey="transfer" title="Transfer">
        <div className="row">
          <div className="col-12">
            {!balance && <p>balance</p>}
            {/* If the user has no tokens, we don't show the Transfer form */}
            {balance?.eq(0) && (
              <NoTokensMessage selectedAddress={selectedAddress} />
            )}
            {/*
                        This component displays a form that the user can use to send a 
                        transaction and transfer some tokens.
                        The component doesn't have logic, it just calls the transferTokens
                        callback.
                        */}
            {balance?.gt(0) && transferFunc && (
              <Transfer transferTokens={transferFunc} />
            )}
          </div>
        </div>
      </Tab>
      <Tab eventKey="staking" title="Staking">
        <Staking />
      </Tab>
      <Tab eventKey="farming" title="Farming">
        <p>Farming</p>
      </Tab>
    </Tabs>
  );
};
