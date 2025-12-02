import { useState, useEffect } from "react";
import LanguageLayout from "../../components/LanguageLayout";
import ExampleBlock from "../../components/ExampleBlock";
import { Globe } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import "./html.css";

// import JSON locales
import en from "../../locales/en.json";
import te from "../../locales/te.json";
import hi from "../../locales/hi.json";

const languageMap = { en, te, hi };

export default function HTML() {
  const [selectedLang, setSelectedLang] = useState("en");
  const [data, setData] = useState(languageMap[selectedLang]);

  useEffect(() => {
    setData(languageMap[selectedLang]);
  }, [selectedLang]);

  const HtmlTopics = data.topics.map((t) => t.title);

  const getTopicContent = (topic) => {
    return (
      data.topics.find((t) => t.title === topic) || {
        desc: "📖 Select a topic from the left sidebar to begin learning.",
        code: "",
      }
    );
  };

  return (
    <div className="relative">
      {/* 🌐 Language Switcher */}
      <div className="language-switcher">
        <Globe className="icon" />
        <select
          value={selectedLang}
          onChange={(e) => setSelectedLang(e.target.value)}
        >
          <option value="en">English</option>
          <option value="te">తెలుగు</option>
          <option value="hi">हिंदी</option>
        </select>
      </div>

      {/* Layout */}
      <LanguageLayout topics={HtmlTopics} title="HTML">
        {(activeTopic) => {
          const { desc, code } = getTopicContent(activeTopic);

          return (
            <div className="space-y-6">
              {/* Title */}
              <h1 className="text-3xl font-bold text-gray-900">{activeTopic}</h1>

              {/* Description (Markdown Renderer) */}
              <div className="prose prose-lg max-w-none text-gray-800">
                <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                  {desc}
                </ReactMarkdown>
              </div>

              {/* Example + Result */}
              {code && <ExampleBlock code={code} />}
            </div>
          );
        }}
      </LanguageLayout>
    </div>
  );
}
