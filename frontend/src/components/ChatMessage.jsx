import MarkdownWrapper from "./MarkdownWrapper";
import classNames from "classnames"

export default function ChatMessage({ actor, text, timestamp }) {
  const selfMessage = actor === "user";
  const classes = classNames(
    "relative max-w-md mx-4 px-4 py-2 text-gray-700 rounded shadow bg-gray-100 border-gray-500 justify-start text-left",
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
            {selfMessage ? text : <MarkdownWrapper text={text}/>}
        
        </span>
      </div>
    </div>
  );
}
