import React, { useState } from "react";
import {Principal} from "@dfinity/principal";
import {canisterId, createActor } from "../../../declarations/token";
import { AuthClient } from '@dfinity/auth-client';

function Transfer() {
  const [isDisabled, setDisabled] = useState(false);
  const [buttonText, setButtonText] = useState("Transfer");
  const [recipientId, setId ] = useState("");
  const [amount, setAmount] = useState("");
  
  async function handleClick() {
    setDisabled(true);

    const authClient = await AuthClient.create();
    const identity = await authClient.getIdentity();

    const authenticatedCanister = createActor(canisterId, {
      agentOptions: {
        identity,
      },
    });

    const recipient = Principal.fromText(recipientId);
    const amt = Number(amount)
    const res = await authenticatedCanister.transfer(recipient, amt);
    setButtonText(res);
    setTimeout(()=>{setButtonText("Transfer"); setDisabled(false);}, 1000);
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                value={recipientId}
                onChange={(e)=>{setId(e.target.value)}}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e)=>{setAmount(e.target.value)}}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button 
          id="btn-transfer" 
          onClick={handleClick}
          disabled = {isDisabled}
           >
            {buttonText}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Transfer;
