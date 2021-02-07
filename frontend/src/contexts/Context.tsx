import { createContext } from "react";
import { BigNumber } from "ethers";

type Web3ContextProps = {
  balance?: BigNumber;
  selectedAddress?: string;
  symbol?: string;
  transferFunc?: (to: string, amount: string) => Promise<void>;
};

export const Web3Context = createContext<Partial<Web3ContextProps>>({});
