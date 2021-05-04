import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  createEntityAdapter,
  EntityState,
  createSelector
} from "@reduxjs/toolkit";

import { RootState } from "../rootReducer";

type Todo = { value: string; id: string };

export interface TodoState extends EntityState<Todo> {
  isFetching: boolean;
  selectedId: string | null;
}

const featurekey = "todoLists";

export const listAdapter = createEntityAdapter<Todo>();

export const {
  selectTotal,
  selectEntities,
  selectAll,
  selectIds
} = listAdapter.getSelectors<RootState>((state) => state.todoLists);

const featureStateSelector = createSelector(
  (state: RootState) => state[featurekey],
  (todoList) => {
    return todoList;
  }
);

export const isFetchingSelector = createSelector(
  featureStateSelector,
  (state) => state.isFetching
);

export const entitiesSelector = createSelector(featureStateSelector, (state) =>
  Object.entries(state.entities).map(([id, e]) => {
    return {
      id,
      value: e.value
    };
  })
);

export const totalSelector = createSelector(
  featureStateSelector,
  (state) => state.ids.length
);

export const initialState: TodoState = listAdapter.getInitialState({
  isFetching: true
});

export const initalize = createAsyncThunk<Todo[]>(
  "initilaize",
  async (_, thunkAPI) => {
    try {
      const result = await fetch(
        "https://jsondata.okiba.me/v1/json/j3pHO210411104707"
      );
      const json = await result.json();
      return json.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

const todoList = createSlice({
  name: "todoList",
  initialState,
  reducers: {
    remove: (state, action) => listAdapter.removeOne(state, action.payload.id),
    register: (state, action: PayloadAction<{ id: string; value: string }>) =>
      listAdapter.addOne(state, action.payload),
    update: (state, action: PayloadAction<{ id: string; value: string }>) => {
      return listAdapter.updateOne(state, {
        id: action.payload.id,
        changes: action.payload
      });
    },
    submit: () => {}
  },
  extraReducers(builder) {
    builder
      .addCase(initalize.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(initalize.fulfilled, (state, action) => {
        listAdapter.setAll(state, action.payload);
        state.isFetching = false;
      })
      .addDefaultCase(() => {});
  }
});

export const { update, remove, register, submit } = todoList.actions;
export default todoList.reducer;
