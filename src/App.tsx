import React from "react";
import * as TodoList from "./features/TodoList";
import "./App.css";

function Component() {
  return (
    <div className="App">
      <h2>ReduxToolKit(React x TypeScript) example todolist</h2>
      <TodoList.Component />
      <div>
        <a href="https://kenjimorita.jp">author</a>
      </div>
    </div>
  );
}

export default Component;
