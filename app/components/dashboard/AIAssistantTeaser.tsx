import { useState } from "react";
import { Link } from "react-router";
import { Bot, ChevronDown, ChevronUp, Send } from "lucide-react";
import { aiSuggestedQuestions } from "~/data/mock-data";

export function AIAssistantTeaser() {
  const [expanded, setExpanded] = useState(false);
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
      {/* Header — always visible */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
            <Bot className="h-4 w-4 text-white" />
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-slate-900">Ask OpsPilot AI</p>
            <p className="text-xs text-slate-400">Ask about progress, blockers, risk, or what to fix first</p>
          </div>
        </div>
        {expanded ? (
          <ChevronUp className="h-4 w-4 text-slate-400" />
        ) : (
          <ChevronDown className="h-4 w-4 text-slate-400" />
        )}
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="px-5 pb-5 border-t border-slate-100">
          {/* Suggested questions */}
          <div className="flex flex-wrap gap-2 mt-4 mb-4">
            {aiSuggestedQuestions.map((q) => (
              <button
                key={q}
                onClick={() => setInputValue(q)}
                className="text-xs bg-slate-50 border border-slate-200 text-slate-600 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 rounded-full px-3 py-1.5 transition-colors font-medium"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about any location..."
              className="flex-1 h-9 px-3 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Link
              to="/ai-assistant"
              className="h-9 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-1.5 text-xs font-medium transition-colors"
            >
              <Send className="h-3.5 w-3.5" />
              Ask
            </Link>
          </div>

          <div className="mt-3 flex justify-end">
            <Link
              to="/ai-assistant"
              className="text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors"
            >
              Open Full Assistant →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
