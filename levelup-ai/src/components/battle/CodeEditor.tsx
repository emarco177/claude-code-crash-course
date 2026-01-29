"use client";

import Editor from "@monaco-editor/react";
import { Loader2 } from "lucide-react";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language: string;
  readOnly?: boolean;
}

export function CodeEditor({
  value,
  onChange,
  language,
  readOnly = false,
}: CodeEditorProps) {
  const monacoLanguage = language === "typescript" ? "typescript" : "python";

  return (
    <Editor
      height="100%"
      language={monacoLanguage}
      value={value}
      onChange={(val) => onChange(val ?? "")}
      theme="vs-dark"
      loading={
        <div className="flex items-center justify-center h-full">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      }
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        lineNumbers: "on",
        scrollBeyondLastLine: false,
        wordWrap: "on",
        tabSize: 2,
        automaticLayout: true,
        readOnly,
        padding: { top: 16 },
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        fontLigatures: true,
        cursorBlinking: "smooth",
        smoothScrolling: true,
        contextmenu: false,
        folding: true,
        lineDecorationsWidth: 8,
        renderLineHighlight: "all",
        scrollbar: {
          verticalScrollbarSize: 8,
          horizontalScrollbarSize: 8,
        },
      }}
    />
  );
}
