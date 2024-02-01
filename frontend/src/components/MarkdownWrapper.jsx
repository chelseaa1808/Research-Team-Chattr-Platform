import ReactMarkdown from "react-markdown"
import gfm from "remark-gfm"
import * as prettier from "https://unpkg.com/prettier@3.2.4/standalone.mjs";
import prettierPluginBabel from "https://unpkg.com/prettier@3.2.4/plugins/babel.mjs"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import {vscDarkPlus} from 'react-syntax-highlighter/dist/esm/styles/prism'
import CopyCodeBlock from "./CodeBlock";


export default function MarkdownWrapper ({ text }) {
    const CustomVscDarkPlus = {
        ...vscDarkPlus,
        'pre[class*="language-"]':{
          ...vscDarkPlus['pre[class*="language-"]'],
          padding: "0 0 0 0",
        }
      }
    return (
        <ReactMarkdown
        children={text}
        remarkPlugins={[gfm]}
        components={{
            code(props) {
                const {children, className, node, ...rest} = props
                const match = /language-(\w+)/.exec(className || '')
                return match ? (
                <>
                    {/* <div class="flex items-center relative text-gray-200 bg-gray-800 gizmo:dark:bg-token-surface-primary px-4 py-2 text-xs font-sans justify-between rounded-t-md"><span>{match[1]}</span><button class="flex ml-auto gizmo:ml-0 gap-2 items-center"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="icon-sm" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>Copy code</button></div> */}
                    <SyntaxHighlighter
                    {...rest}
                    style={CustomVscDarkPlus}
                    language={match[1]}
                    useInlineStyles={true}
                    // PreTag="div"
                    CodeTag={CopyCodeBlock}
                    codeTagProps={{language: match[1]}}
                    >
                      {children}
                    </SyntaxHighlighter>
                </>) 
                : 
                (
                <code {...rest} className={className}>
                    {children}
                </code>
                )
            }
            }}
            />

    )
}