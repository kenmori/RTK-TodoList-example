import * as React from "react";
import * as ReactRedux from "react-redux";
import * as RTK from "@reduxjs/toolkit";

import * as todoListModule from "./todoListSlice";
import { RootState } from "../rootReducer";
import { v4 as uuidv4 } from "uuid";

export function Component() {
  const dispatch = ReactRedux.useDispatch();
  const [state, setState] = React.useState("");
  const isFeching = ReactRedux.useSelector(todoListModule.isFetchingSelector);
  const entities = ReactRedux.useSelector(todoListModule.selectAll);
  const total = ReactRedux.useSelector(todoListModule.selectTotal);

  React.useEffect(() => {
    dispatch(todoListModule.initalize());
  }, [dispatch]);

  const onClickRemove = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLButtonElement;
    const id = target.dataset.id;
    dispatch(todoListModule.remove({ id }));
  };

  const onChangeRegister = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
  };
  const onClickCreate = () => {
    dispatch(todoListModule.register({ id: uuidv4(), value: state }));
    setState("");
  };
  const onChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(
        todoListModule.update({
          value: e.target.value,
          id: e.target.dataset.id || ""
        })
      );
    },
    [dispatch]
  );

  if (isFeching) return <div>fetching</div>;
  return (
    <React.Fragment>
      <div>{total}</div>
      <input type="text" onChange={onChangeRegister} value={state} />
      <button type="button" onClick={onClickCreate}>
        登録
      </button>

      <hr />
      {entities.map((e) => (
        <div key={e.id}>
          <input onChange={onChange} data-id={e.id} value={e.value} />
          <button onClick={onClickRemove} data-id={e.id}>
            削除
          </button>
        </div>
      ))}
    </React.Fragment>
  );
}
