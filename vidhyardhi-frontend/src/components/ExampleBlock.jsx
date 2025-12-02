import { useState } from "react";
import "./ExampleBlock.css";
import { Copy, Play } from "lucide-react";

export default function ExampleBlock({ code }) {
  const [tab, setTab] = useState("example");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="example-box">
      {/* ===== Tabs & Actions ===== */}
      <div className="tab-header">
        <div className="tabs">
          <button
            className={`tab-btn ${tab === "example" ? "active" : ""}`}
            onClick={() => setTab("example")}
          >
            Example
          </button>
          <button
            className={`tab-btn ${tab === "result" ? "active" : ""}`}
            onClick={() => setTab("result")}
          >
            Result
          </button>
        </div>

        <div className="actions">
          <button className="action-btn" onClick={handleCopy}>
            <Copy size={16} />
            {copied ? "Copied" : "Copy"}
          </button>
          <button className="action-btn run-btn" onClick={() => setTab("result")}>
            <Play size={16} /> Run
          </button>
        </div>
      </div>

      {/* ===== Code View ===== */}
      {tab === "example" && (
        <pre className="code-block">
          <code>
            {code.split("\n").map((line, i) => (
              <span key={i}>{line}</span>
            ))}
          </code>
        </pre>
      )}

      {/* ===== Browser-like Result ===== */}
      {tab === "result" && (
        <div className="browser-frame">
          <div className="browser-bar">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
            <div className="url-bar">http://localhost:5173/demo.html</div>
          </div>
          <div
            className="result-box"
            dangerouslySetInnerHTML={{ __html: code }}
          />
        </div>
      )}
    </div>
  );
}
