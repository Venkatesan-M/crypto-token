import type { Principal } from '@dfinity/principal';
export interface _SERVICE {
  'SymbolOf' : () => Promise<string>,
  'balanceOf' : (arg_0: Principal) => Promise<bigint>,
  'payOut' : () => Promise<string>,
  'transfer' : (arg_0: Principal, arg_1: bigint) => Promise<string>,
}
