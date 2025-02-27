import { Transaction } from "../../data/interfaces/Transactions";
import { DataInterface, initialDataInterfaceState } from "../global.selectors";
import { createReducer, on } from "@ngrx/store";
import { getTransactionsSuccess } from "./transactions.actions";

export interface TransactionsState extends DataInterface {
  transactions: {[key: number]: Transaction[]}
}

export const initialTransactionsState: TransactionsState = {
  ...initialDataInterfaceState,
  transactions: {}
}

export const transactionsReducer = createReducer(
  initialTransactionsState,
  on(getTransactionsSuccess, (state, action) => ({
    ...state,
    transactions: {
      ...state.transactions,
      [action.week]: action.transactions
    }
  }))
);
