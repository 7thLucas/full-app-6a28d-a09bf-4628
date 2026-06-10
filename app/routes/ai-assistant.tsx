import { useState } from "react";
import { Bot, Send, Sparkles } from "lucide-react";
import { PageLayout, PageContent, TopHeader } from "~/components/layout/PageLayout";
import { aiSuggestedQuestions } from "~/data/mock-data";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const aiResponses: Record<string, string> = {
  "Which location is falling behind?":
    "BloomFit New York SoHo is the most critical location right now. It's at 57% readiness with 11 open blockers, 15 missing evidence items, and only 49% staff training completion. Chicago West Loop is the second most concerning at 61% readiness, with 9 blockers and training at only 54%. Both locations are flagged as Delayed with High audit risk.",
  "What should we fix first?":
    "Based on current data, I recommend this priority order: 1) Complete front desk and coach certifications at New York SoHo — training is the single biggest opening blocker. 2) Upload the 15 missing evidence items at SoHo before the July 10 opening. 3) Resolve Chicago West Loop's equipment setup blocker, which is delaying the entire location. 4) Approve Austin Downtown's front desk script — it's been pending for 2 days.",
  "Are we ready for audit?":
    "Not fully. Two locations — New York SoHo and Chicago West Loop — have High audit risk and are not audit-ready. Five other locations have medium risk. Miami Brickell (94%) and Nashville Gulch (91%) are in excellent shape. Overall readiness across 18 locations is 78%, up from 72% last week. I estimate 6 locations are fully audit-ready today.",
  "What changed today?":
    "Here's what happened today: Miami Brickell uploaded cleaning checklist evidence (35 min ago), Sarah Mitchell approved Nashville Gulch front desk readiness (1 hr ago), Los Angeles Silver Lake submitted retail display evidence (1 hr ago), Austin Downtown completed 4 training modules (2 hrs ago), Denver RiNo submitted facility setup photos (4 hrs ago), and Seattle Capitol Hill submitted their front desk greeting checklist (3 hrs ago).",
};

function getAIResponse(input: string): string {
  const exact = aiResponses[input.trim()];
  if (exact) return exact;
  if (input.toLowerCase().includes("soho") || input.toLowerCase().includes("new york")) {
    return "BloomFit New York SoHo is currently your highest-risk location. It has 57% readiness, 11 open blockers, 15 missing evidence items, and only 49% staff training — well below the 80% opening requirement. The opening date is July 10, which means the team has very limited time to close these gaps. I recommend escalating to Claire Bennett immediately.";
  }
  if (input.toLowerCase().includes("chicago")) {
    return "Chicago West Loop is at 61% readiness and is flagged as Delayed. The main issues are 9 open blockers, 12 missing evidence items, and staff training at only 54%. The opening is scheduled for July 12. Manager Olivia Hayes needs to prioritize equipment setup and staff certification in the next 48 hours.";
  }
  return "Based on current operations data across all 18 BloomFit Studios locations, overall readiness is at 78% — up 6% from last week. Five locations need manager attention. Would you like me to focus on a specific location, blocker type, or region?";
}

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hi Sarah! I'm OpsPilot AI. I can help you understand the current state of all BloomFit Studios locations, identify the highest risks, and tell you exactly what to prioritize. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    await new Promise((r) => setTimeout(r, 800 + Math.random() * 600));
    const response = getAIResponse(text);
    setIsTyping(false);
    setMessages((prev) => [
      ...prev,
      { id: (Date.now() + 1).toString(), role: "assistant", content: response },
    ]);
  };

  return (
    <PageLayout>
      <TopHeader
        title="AI Assistant"
        subtitle="Ask OpsPilot AI about progress, blockers, risk, or what to fix first."
      />
      <PageContent className="flex flex-col h-full p-0">
        <div className="flex-1 flex flex-col max-h-[calc(100vh-120px)]">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
            {/* Suggested questions at top */}
            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2 mb-2">
                {aiSuggestedQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="text-xs bg-white border border-slate-200 text-slate-600 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 rounded-full px-3 py-1.5 transition-colors font-medium"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "assistant" && (
                  <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0 mr-3 mt-0.5">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-xl rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white rounded-br-sm"
                      : "bg-white border border-slate-200 text-slate-700 rounded-bl-sm"
                  }`}
                >
                  {msg.role === "assistant" && (
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <Sparkles className="h-3 w-3 text-blue-500" />
                      <span className="text-[10px] font-semibold text-blue-600">OpsPilot AI</span>
                    </div>
                  )}
                  {msg.content}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0 mr-3 mt-0.5">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-sm px-4 py-3">
                  <div className="flex items-center gap-1">
                    <div className="h-1.5 w-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0ms]" />
                    <div className="h-1.5 w-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:150ms]" />
                    <div className="h-1.5 w-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input bar */}
          <div className="px-6 py-4 border-t border-slate-200 bg-white">
            <div className="flex gap-3 max-w-3xl">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage(input);
                  }
                }}
                placeholder="Ask about any location, blocker, or risk..."
                className="flex-1 h-11 px-4 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || isTyping}
                className="h-11 px-5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl flex items-center gap-2 text-sm font-semibold transition-colors"
              >
                <Send className="h-4 w-4" />
                Ask
              </button>
            </div>
          </div>
        </div>
      </PageContent>
    </PageLayout>
  );
}
