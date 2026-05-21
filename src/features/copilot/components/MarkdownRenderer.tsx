import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

type Props = {
  content: string;
};

export default function MarkdownRenderer({ content }: Props) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeHighlight]}
      components={{
        h1: ({ children }) => (
          <h1 className="text-xl font-bold mt-4 mb-2">{children}</h1>
        ),

        h2: ({ children }) => (
          <h2 className="text-lg font-semibold mt-3 mb-2">{children}</h2>
        ),

        p: ({ children }) => (
          <p className="text-sm leading-relaxed">{children}</p>
        ),

        ul: ({ children }) => (
          <ul className="list-disc pl-5 space-y-1 my-1 [&_ul]:mt-1 [&_ul]:mb-0">
            {children}
          </ul>
        ),

        ol: ({ children }) => (
          <ol className="list-decimal pl-5 space-y-1">{children}</ol>
        ),

        li: ({ children }) => (
          <li className="leading-relaxed [&>p]:m-0 [&>ul]:mt-1">{children}</li>
        ),

        code({ inline, className, children, ...props }: any) {
          const match = /language-(\w+)/.exec(className || "");
          const language = match?.[1];

          return inline ? (
            <code className="bg-slate-700 px-1 py-0.5 rounded text-xs text-white">
              {children}
            </code>
          ) : (
            <pre className="bg-slate-900 p-3 rounded-lg overflow-x-auto text-xs">
              <code className={className} {...props}>
                {children}
              </code>
            </pre>
          );
        },

        strong: ({ children }) => (
          <strong className="font-semibold leading-snug mb-1">
            {children}
          </strong>
        ),

        table: ({ children }) => (
          <table className="table-auto border-collapse border border-slate-700 my-2 text-sm">
            {children}
          </table>
        ),

        th: ({ children }) => (
          <th className="border border-slate-700 px-2 py-1 bg-slate-800 text-white text-left">
            {children}
          </th>
        ),

        td: ({ children }) => (
          <td className="border border-slate-700 px-2 py-1">{children}</td>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
