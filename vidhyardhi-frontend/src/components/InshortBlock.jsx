import "./InshortBlock.css";
import { Lightbulb, CheckCircle, AlertTriangle, XCircle } from "lucide-react";

export default function InshortBlock({ text, variant = "info" }) {
  const icons = {
    info: <Lightbulb className="inshort-icon info" />,
    success: <CheckCircle className="inshort-icon success" />,
    warning: <AlertTriangle className="inshort-icon warning" />,
    danger: <XCircle className="inshort-icon danger" />,
  };

  return (
    <div className={`inshort-block ${variant}`}>
      <div className="inshort-header">
        {icons[variant]}
        <span>In Short</span>
      </div>
      <p className="inshort-text">{text}</p>
    </div>
  );
}
