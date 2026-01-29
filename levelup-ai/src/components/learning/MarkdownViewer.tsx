"use client";

/**
 * Markdown Viewer Component
 * Renders markdown content with syntax highlighting
 */

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

interface MarkdownViewerProps {
  content: string;
  className?: string;
}

export function MarkdownViewer({ content, className = "" }: MarkdownViewerProps) {
  return (
    <div
      className={`prose prose-invert prose-lg max-w-none
        prose-headings:font-bold
        prose-h1:text-3xl prose-h1:mb-4 prose-h1:mt-8
        prose-h2:text-2xl prose-h2:mb-3 prose-h2:mt-6
        prose-h3:text-xl prose-h3:mb-2 prose-h3:mt-4
        prose-p:mb-4 prose-p:leading-7
        prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-800
        prose-code:text-cyan-400 prose-code:bg-gray-900 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
        prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:underline
        prose-strong:text-gray-100 prose-strong:font-semibold
        prose-ul:list-disc prose-ul:ml-6 prose-ul:mb-4
        prose-ol:list-decimal prose-ol:ml-6 prose-ol:mb-4
        prose-li:mb-2
        prose-blockquote:border-l-4 prose-blockquote:border-cyan-500 prose-blockquote:pl-4 prose-blockquote:italic
        prose-table:border-collapse prose-table:w-full
        prose-th:border prose-th:border-gray-700 prose-th:px-4 prose-th:py-2 prose-th:bg-gray-800
        prose-td:border prose-td:border-gray-700 prose-td:px-4 prose-td:py-2
        ${className}`}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          // Custom component rendering
          code({ node, inline, className, children, ...props }) {
            return inline ? (
              <code className={className} {...props}>
                {children}
              </code>
            ) : (
              <code className={`${className} block`} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
