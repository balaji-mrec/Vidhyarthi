import { useState, useEffect } from "react";
import LanguageLayout from "../../../components/LanguageLayout";
import ExampleBlock from "../../../components/ExampleBlock";
import { Globe } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import "./javascript.css"; // create CSS like html.css, python.css

// Import JSON locales
import en from "../../../data/javascript/js_english.json";
import hi from "../../../data/javascript/js_hindi.json";
import te from "../../../data/javascript/js_telugu.json";

const languageMap = { en, hi, te };

export default function JavaScript() {
  const [selectedLang, setSelectedLang] = useState("en");
  const [data, setData] = useState(languageMap[selectedLang]);

  useEffect(() => {
    setData(languageMap[selectedLang]);
  }, [selectedLang]);

  const jsTopics = data.topics.map((t) => t.title);

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
          <option value="hi">हिंदी</option>
          <option value="te">తెలుగు</option>
        </select>
      </div>

      {/* Layout */}
      <LanguageLayout topics={jsTopics} title="JavaScript">
        {(activeTopic) => {
          const { desc, code } = getTopicContent(activeTopic);

          return (
            <div className="space-y-6">
              <h1 className="text-3xl font-bold text-gray-900">{activeTopic}</h1>
              <div className="prose prose-lg max-w-none text-gray-800">
                <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                  {desc}
                </ReactMarkdown>
              </div>
              {code && <ExampleBlock code={code} />}
            </div>
          );
        }}
      </LanguageLayout>
    </div>
  );
}
