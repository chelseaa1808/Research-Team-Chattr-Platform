import React from "react";
import { useState } from "react";
export default function CopyCodeBlock ({children, language}) {

    const [copyMessage, setCopyMessage] = useState("Copy code");

    const extractedText = React.Children.map(children, (child) => {
        if (typeof child === 'string') {
          return child;
        } else if (React.isValidElement(child) && child.props.children) {
          return React.Children.map(child.props.children, (nestedChild) => {
            return typeof nestedChild === 'string' ? nestedChild : '';
          }).join('');
        } else {
          return '';
        }
      }).join('');

    const handleCopyClick = () => {
        navigator.clipboard.writeText(extractedText)
        setCopyMessage("Copied!")
        setTimeout(()=>{
            setCopyMessage("Copy Code")
        }, "3000")
    }
    
    return (
        <div>
            <div className="flex items-center mb-2 relative text-gray-200 bg-gray-800 gizmo:dark:bg-token-surface-primary px-4 py-2 text-xs font-sans justify-between rounded-t-md">
                <span>{language}</span>
                <button
                    id="CopyButton"
                    className="flex ml-auto gizmo:ml-0 gap-2 items-center btn focus:outline-none"
                    onClick={handleCopyClick}
                >
                    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="icon-sm" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                        <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                    </svg>{copyMessage}
                </button>
            </div>
            <code className="">
               <div className="pl-4 overflow-x-auto">
                    {children}
               </div>
            </code>

        </div>
        

    )

}