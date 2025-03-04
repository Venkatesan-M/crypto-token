import React, { useState } from "react";
import {Principal} from "@dfinity/principal";
import { token } from "../../../declarations/token";

function Balance() {

  const [inputValue, setInputValue] = useState("");
  const [balanceResult, setBalanceResult] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  
  async function handleClick() {
    const principal = Principal.fromText(inputValue);
    const balance = await token.balanceOf(principal);
    const symbol = await token.SymbolOf();
    setBalanceResult(balance.toLocaleString());
    setTokenSymbol(symbol);
  }


  return (
    <div className="window white">
      <label>Check account token balance:</label>
      <p>
        <input
          id="balance-principal-id"
          type="text"
          placeholder="Enter a Principal ID"
          value={inputValue}
          onChange={(e)=> setInputValue(e.target.value)}
        />
      </p>
      <p className="trade-buttons">
        <button
          id="btn-request-balance"
          onClick={handleClick}
        >
          Check Balance
        </button>
      </p>
      <p>{balanceResult === "" ? '' : 'This account has a balance of'} {balanceResult} {tokenSymbol}.</p>

    </div>
  );
}

export default Balance;
