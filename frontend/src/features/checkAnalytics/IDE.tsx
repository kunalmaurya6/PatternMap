
import Editor, { type OnMount } from "@monaco-editor/react";
import {
  BadgeAlert,
  Check,
  CheckCircle2,
  Code2,
  Copy,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import type { editor as MonacoEditor } from "monaco-editor";
import { MarkerSeverity } from "monaco-editor";

interface IdeProps {
  selectedLang: {
    id: string;
    name: string;
    fileName: string;
    boilerplate: string;
    setData: (value: string) => void;
    data: string;
  };
}

type ValidationStatus = "checking" | "valid" | "errors";

const IDE = ({ selectedLang }: IdeProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const [lastSaved, setLastSaved] = useState("Auto-saved");
  const [cursorPos, setCursorPos] = useState({
    ln: 1,
    col: 1,
  });
  const [validationStatus, setValidationStatus] =
    useState<ValidationStatus>("valid");

  const handleChange = useCallback(
    (value: string | undefined) => {
      selectedLang.setData(value ?? "");
      setValidationStatus("checking");
    },
    [selectedLang.setData],
  );

  const handleValidation = useCallback(
    (markers: MonacoEditor.IMarker[]) => {
      const hasErrors = markers.some(
        (marker) => marker.severity === MarkerSeverity.Error,
      );

      setValidationStatus(hasErrors ? "errors" : "valid");
    },
    [],
  );

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(selectedLang.data);
      setIsCopied(true);
      window.setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy code:", error);
    }
  };

  const handleEditorMount: OnMount = (editor) => {
    const updateCursor = () => {
      const position = editor.getPosition();

      if (position) {
        setCursorPos({
          ln: position.lineNumber,
          col: position.column,
        });
      }
    };

    updateCursor();

    editor.onDidChangeCursorPosition(updateCursor);
  };

  const status =
    validationStatus === "valid"
      ? {
          text: "No errors detected",
          color: "text-emerald-400",
          icon: <CheckCircle2 className="h-3.5 w-3.5" />,
        }
      : validationStatus === "errors"
        ? {
            text: "Fix errors before submitting",
            color: "text-red-400",
            icon: <BadgeAlert className="h-3.5 w-3.5" />,
          }
        : {
            text: "Checking code...",
            color: "text-amber-400",
            icon: (
              <span className="h-3 w-3 animate-spin rounded-full border-2 border-amber-400 border-t-transparent" />
            ),
          };

  return (
    <div className="overflow-hidden rounded-2xl border border-[#1b2230] bg-[#0c1017] shadow-xl">
      {/* Editor header */}
      <div className="flex items-center justify-between border-b border-[#171f2c] bg-[#0e131d] px-4 py-2.5">
        <div className="flex items-center gap-2 rounded-lg border border-[#222c3d] bg-[#151c28] px-3 py-1 text-xs font-medium text-slate-200">
          <Code2 className="h-3.5 w-3.5 text-cyan-400" />
          <span>{selectedLang.fileName}</span>
        </div>

        <div className="flex items-center gap-3 text-[11px] text-slate-400">
          <button
            type="button"
            onClick={handleCopyCode}
            className="flex items-center gap-1 rounded-md px-2 py-0.5 transition-colors hover:bg-[#161d2b] hover:text-slate-200"
            title="Copy code"
          >
            {isCopied ? (
              <Check className="h-3 w-3 text-emerald-400" />
            ) : (
              <Copy className="h-3 w-3" />
            )}
            <span>{isCopied ? "Copied" : "Copy"}</span>
          </button>

          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>{lastSaved}</span>
          </div>

          <span className="text-slate-600">UTF-8</span>
        </div>
      </div>

      {/* Monaco Editor */}
      <Editor
        height="50vh"
        language={selectedLang.id}
        value={selectedLang.data}
        path={selectedLang.fileName}
        theme="vs-dark"
        onChange={handleChange}
        onValidate={handleValidation}
        onMount={handleEditorMount}
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          lineNumbers: "on",
          automaticLayout: true,
          tabSize: 2,
          wordWrap: "on",
          scrollBeyondLastLine: false,
          renderValidationDecorations: "on",
          suggestOnTriggerCharacters: true,
          quickSuggestions: true,
        }}
      />

      {/* Editor footer */}
      <div className="flex items-center justify-between border-t border-[#151d2a] bg-[#090d14] px-4 py-2 text-xs">
        <div
          className={`flex items-center gap-2 font-medium ${status.color}`}
          role="status"
          aria-live="polite"
        >
          {status.icon}
          <span>{status.text}</span>
        </div>

        <div className="font-mono text-[11px] text-slate-400">
          Ln {cursorPos.ln}, Col {cursorPos.col}
        </div>
      </div>
    </div>
  );
};

export default IDE;
