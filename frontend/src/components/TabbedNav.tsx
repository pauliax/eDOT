import { useContext } from "react";
import { Web3Context } from "../contexts/Context";

import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { Transfer } from "./Transfer";
import { Staking } from "./Staking";
import { Farming } from "./Farming";
import { Rebase } from "./Rebase";

import "../styles/tabs.scss";

export const TabbedNav = () => {
  const { balance, transferFunc } = useContext(Web3Context);

  return (
    <>
      {balance && transferFunc && (
        <Tabs defaultActiveKey="transfer" id="tabs">
          <Tab eventKey="transfer" title="📥 Transfer">
            <Transfer transferTokens={transferFunc} />
          </Tab>
          <Tab eventKey="staking" title="🔒 Staking">
            <Staking />
          </Tab>
          <Tab eventKey="farming" title="🌾 Farming">
            <Farming />
          </Tab>
          <Tab eventKey="rebase" title="⚖️ Rebase">
            <Rebase />
          </Tab>
        </Tabs>
      )}
    </>
  );
};
