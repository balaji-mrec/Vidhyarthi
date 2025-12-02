// src/components/CodeBlock.jsx
import React from "react";

const CodeBlock = ({ code }) => {
  return (
    <div className="bg-black rounded-lg p-4 overflow-x-auto border border-gray-700 shadow-lg">
      <pre className="text-green-400 text-sm font-mono whitespace-pre-wrap">{code}</pre>
    </div>
  );
};

export default CodeBlock;
