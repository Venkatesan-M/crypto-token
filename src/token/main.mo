import Principal "mo:base/Principal";
import Nat "mo:base/Nat";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";


actor Token{

    let owner : Principal = Principal.fromText("2pmsn-zoxrb-ug4ic-ewo4e-fucbp-dhd5k-niwbo-zpleo-nwxmi-2624n-kqe");
    let totalSupply : Nat = 1000000000;
    let symbol : Text = "VEN";

    private stable var balanceEnteries: [(Principal, Nat)] = [];

    private var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);

    if(balances.size() < 1){
        balances.put(owner, totalSupply);
    };

    public query func balanceOf(who: Principal) : async Nat {
        let balance : Nat = switch (balances.get(who)){
            case null 0;
            case (?result) result;
        };
        return balance;

    };

    public query func SymbolOf() : async Text {
        return symbol;
    };

    public shared(msg) func payOut() : async Text {
        // Debug.print(debug_show(msg.caller));
        if (balances.get(msg.caller)==null){
            let amount = 10000;         
            return await transfer(msg.caller, amount);
        }else{
            return "Already Claimed";
        }

    };

    public shared(msg) func transfer(to: Principal, amount: Nat) : async Text{
        let fromBalance = await balanceOf(msg.caller);
        if(fromBalance > amount){

            let newFromBalance: Nat = fromBalance - amount;
            balances.put(msg.caller, newFromBalance);

            let toBalance = await balanceOf(to);
            let newToBalance = toBalance + amount;
            balances.put(to, newToBalance);

            return "Success";
        }else{
            return "Insufficient Balance";
        }       
    };

    system func preupgrade(){
        balanceEnteries := Iter.toArray(balances.entries());
    };

    system func postupgrade(){
        balances := HashMap.fromIter<Principal, Nat>(balanceEnteries.vals(),1, Principal.equal, Principal.hash);
        if(balances.size() < 1){
            balances.put(owner, totalSupply);
        }
    };
}