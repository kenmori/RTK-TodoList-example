import * as React from "react";

type Props = {
  text: string;
  onClick: () => void;
};
function Button(props: Props) {
  return <button onClick={props.onClick}>{props.text}</button>;
}

export default Button;
