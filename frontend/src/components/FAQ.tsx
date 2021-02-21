import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";

export function FAQ() {
  return (
    <Accordion className="text-left">
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="0">
          How To Connect To BST Testnet?
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <a
              href="https://academy.binance.com/en/articles/connecting-metamask-to-binance-smart-chain"
              rel="noopener noreferrer"
              target="_blank"
            >
              Answer
            </a>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="1">
          How To Use Metamask?
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="1">
          <Card.Body>
            <a
              href="https://academy.binance.com/en/articles/how-to-use-metamask"
              rel="noopener noreferrer"
              target="_blank"
            >
              Answer
            </a>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="2">
          What Is Elastic Supply?
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="2">
          <Card.Body>
            <a
              href="https://academy.binance.com/en/articles/elastic-supply-tokens-explained"
              rel="noopener noreferrer"
              target="_blank"
            >
              Answer
            </a>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="3">
          What Is Binance Smart Chain (BSC)?
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="3">
          <Card.Body>
            <a
              href="https://academy.binance.com/en/articles/an-introduction-to-binance-smart-chain-bsc"
              rel="noopener noreferrer"
              target="_blank"
            >
              Answer
            </a>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="4">
          What Is Polkadot (DOT)?
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="4">
          <Card.Body>
            <a
              href="https://academy.binance.com/en/articles/what-is-polkadot-dot"
              rel="noopener noreferrer"
              target="_blank"
            >
              Answer
            </a>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="5">
          What Is Yield Farming?
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="5">
          <Card.Body>
            <a
              href="https://academy.binance.com/en/articles/what-is-yield-farming-in-decentralized-finance-defi"
              rel="noopener noreferrer"
              target="_blank"
            >
              Answer
            </a>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="6">
          What Is ERC-20 Token?
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="6">
          <Card.Body>
            <a
              href="https://academy.binance.com/en/articles/an-introduction-to-erc-20-tokens"
              rel="noopener noreferrer"
              target="_blank"
            >
              Answer
            </a>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="7">
          What Inspired This Project?
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="7">
          <Card.Body>
            <a
              href="https://www.ampleforth.org/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Answer
            </a>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="8">
          What Is Stablecoin?
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="8">
          <Card.Body>
            <a
              href="https://academy.binance.com/en/glossary/stablecoin"
              rel="noopener noreferrer"
              target="_blank"
            >
              Answer
            </a>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="9">
          What Is Ethereum?
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="9">
          <Card.Body>
            <a
              href="https://academy.binance.com/en/articles/what-is-ethereum"
              rel="noopener noreferrer"
              target="_blank"
            >
              Answer
            </a>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}
