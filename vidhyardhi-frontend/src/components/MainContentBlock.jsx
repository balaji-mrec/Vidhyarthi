import { useEffect, useRef } from "react";
import "./MainContentBlock.css";

export default function MainContentBlock({ title, children }) {
  const contentRef = useRef(null);

  // Scroll to top whenever topic changes
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [title]);

  return (
    <section className="main-content" ref={contentRef}>
      <h1 className="content-title">{title}</h1>
      <div className="content-body">
        {children}
      </div>
    </section>
  );
}
