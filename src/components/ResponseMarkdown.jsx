import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark, oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function MessageBubble({ text }) {
  const isDarkMode =
    document.documentElement.classList.contains("dark") ||
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  return (
    <div className="markdown-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Remove all text color styling - let parent handle it
          p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
          li: ({ children }) => <li>{children}</li>,
          h1: ({ children }) => <h1 className="text-xl font-bold my-2">{children}</h1>,
          h2: ({ children }) => <h2 className="text-lg font-bold my-2">{children}</h2>,
          h3: ({ children }) => <h3 className="text-base font-bold my-1">{children}</h3>,
          strong: ({ children }) => <strong className="font-bold">{children}</strong>,
          em: ({ children }) => <em className="italic">{children}</em>,

          // Code blocks
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            const style = isDarkMode ? oneDark : oneLight;

            return !inline && match ? (
              <SyntaxHighlighter
                style={style}
                language={match[1]}
                PreTag="div"
                customStyle={{
                  backgroundColor: isDarkMode ? "#1e293b" : "#f3f4f6",
                  borderRadius: "6px",
                  padding: "12px",
                  fontSize: "0.9em",
                  margin: "8px 0",
                }}
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code
                className="rounded px-1 py-0.5"
                style={{
                  backgroundColor: isDarkMode ? "#374151" : "#e5e7eb",
                  color: isDarkMode ? "#f3f4f6" : "#1f2937",
                  fontSize: "0.9em",
                }}
                {...props}
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