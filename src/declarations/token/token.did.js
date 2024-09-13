export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'SymbolOf' : IDL.Func([], [IDL.Text], ['query']),
    'balanceOf' : IDL.Func([IDL.Principal], [IDL.Nat], ['query']),
    'payOut' : IDL.Func([], [IDL.Text], []),
    'transfer' : IDL.Func([IDL.Principal, IDL.Nat], [IDL.Text], []),
  });
};
export const init = ({ IDL }) => { return []; };
