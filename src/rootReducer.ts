import { combineReducers, createEntityAdapter } from "@reduxjs/toolkit";
import todoListModules from "./features/todoListSlice";
import {
  useSelector as rawUseSelector,
  TypedUseSelectorHook
} from "react-redux";

const rootReducer = combineReducers({
  todoLists: todoListModules
});

export type RootState = ReturnType<typeof rootReducer>;

export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector;

export default rootReducer;
