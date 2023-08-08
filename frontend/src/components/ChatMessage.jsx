import classNames from "classnames";
import { Fragment } from "react";

export default function ChatMessage({ actor, text, timestamp }) {
  const selfMessage = actor === "user";

  const classes = classNames(
    "relative flex max-w-md mx-4 px-4 py-2 text-gray-700 rounded shadow bg-gray-100 border-gray-500 justify-start text-left",
    {
      "bg-lime-100": selfMessage,
      "justify-end": selfMessage,
      "float-right": selfMessage,
      "float-left": !selfMessage,
      "text-right": selfMessage,
    }
  );
  return (
    <div className="flow-root">
      <div className={classes}>
        <span className="block">
          {/* Split newlines */}
          {text.split("\n").map((line, index) => (
            <Fragment key={index}>
              {line} 
              <br />
            </Fragment>
          ))}  
        </span>
      </div>
    </div>
  );
}
