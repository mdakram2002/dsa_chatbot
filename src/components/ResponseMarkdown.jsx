
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function MessageBubble({ text }) {
  return (
    <div className="markdown p-2 rounded-lg shadow-sm">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code(props) {
            const { children, inline, node, ...rest } = props;
            const match =
              node.properties?.className?.[0]?.match(/language-(\w+)/);

            return !inline && match ? (
              <SyntaxHighlighter
                style={oneDark}
                language={match[1]}
                PreTag="div"
                customStyle={{
                  backgroundColor: "#0f172a",
                  borderRadius: "6px",
                  padding: "12px",
                }}
                {...rest}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code
                style={{
                  backgroundColor: "#334155",
                  padding: "2px 6px",
                  borderRadius: "4px",
                }}
                {...rest}
              >
                {children}
              </code>
            );
          },
        }}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
}
