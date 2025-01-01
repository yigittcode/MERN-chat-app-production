import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";
import { Send } from "lucide-react";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! *waves* Welcome to RetroChat! Choose a theme that matches your style!", isSent: false },
  { id: 2, content: "omg this is so cool! (y) brings back memories of MSN messenger days :)", isSent: true },
  { id: 3, content: "*nudge* Don't forget to check out all the themes!", isSent: false },
  { id: 4, content: "brb changing my display pic and status message <3", isSent: true },
];

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="h-screen container mx-auto px-4 pt-20 max-w-5xl bg-base-200">
      <div className="space-y-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold text-base-content">Theme</h2>
          <p className="text-sm text-base-content/70">Choose a theme for your chat interface</p>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
          {THEMES.map((t) => (
            <button
              key={t}
              className={`
                group flex flex-col items-center gap-1.5 p-2 rounded border-2 border-t-white border-l-white border-r-[#808080] border-b-[#808080]
                ${theme === t ? "bg-[#000080] text-white" : "bg-[#c0c0c0] hover:bg-[#d4d4d4]"}
              `}
              onClick={() => setTheme(t)}
            >
              <div className="relative h-8 w-full rounded overflow-hidden border-2 border-t-[#808080] border-l-[#808080] border-r-white border-b-white" data-theme={t}>
                <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                  <div className="rounded bg-primary"></div>
                  <div className="rounded bg-secondary"></div>
                  <div className="rounded bg-accent"></div>
                  <div className="rounded bg-neutral"></div>
                </div>
              </div>
              <span className={`text-[11px] font-medium truncate w-full text-center ${theme === t ? "text-white" : "text-black"}`}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </span>
            </button>
          ))}
        </div>

        {/* Preview Section */}
        <h3 className="text-lg font-semibold mb-3 text-base-content">Preview</h3>
        <div className="rounded-lg border border-base-300 overflow-hidden bg-base-100">
          <div className="p-4">
            <div className="max-w-lg mx-auto">
              {/* Mock Chat UI */}
              <div className="rounded-lg overflow-hidden border border-base-300">
                {/* Chat Header */}
                <div className="px-4 py-3 border-b border-base-300 bg-base-300">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-primary-content font-medium">
                      J
                    </div>
                    <div>
                      <h3 className="font-medium text-sm text-base-content">John Doe</h3>
                      <p className="text-xs text-base-content/70">Online</p>
                    </div>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="p-4 space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto bg-base-100">
                  {PREVIEW_MESSAGES.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`
                          max-w-[80%] rounded-lg p-3
                          ${message.isSent 
                            ? "bg-primary text-primary-content" 
                            : "bg-base-200 text-base-content"}
                        `}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className="text-[10px] mt-1.5 opacity-70">
                          12:00 PM
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chat Input */}
                <div className="p-4 border-t border-base-300 bg-base-200">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      className="flex-1 text-sm h-10 px-3 rounded-md border border-base-300 bg-base-100 text-base-content"
                      placeholder="Type a message..."
                      value="This is a preview"
                      readOnly
                    />
                    <button className="px-4 h-10 bg-primary text-primary-content rounded-md hover:bg-primary/90 transition-colors">
                      <Send size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SettingsPage;