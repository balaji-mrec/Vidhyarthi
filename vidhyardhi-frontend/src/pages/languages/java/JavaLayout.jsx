import { useState, useEffect } from "react";
import LanguageLayout from "../../../components/LanguageLayout";
import ExampleBlock from "../../../components/ExampleBlock";
import InshortBlock from "../../../components/InshortBlock";
import MainContentBlock from "../../../components/MainContentBlock";
import QuizBlock from "../../../components/QuizBlock";

import { Globe } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import "./java.css";

// ✅ import JSON locales
import javaEn from "../../../locales/en/java.json";
// import te from "../../../locales/te/java.json";
// import hi from "../../../locales/hi/java.json";

const languageMap = { en: javaEn /*, te, hi */ };

export default function JavaLayout() {
  const [selectedLang, setSelectedLang] = useState("en");
  const [data, setData] = useState(languageMap[selectedLang]);

  useEffect(() => {
    setData(languageMap[selectedLang]);
  }, [selectedLang]);

  const javaTopics = data.topics.map((t) => t.title);

  const getTopicContent = (topic) => {
    return (
      data.topics.find((t) => t.title === topic) || {
        desc: "📖 Select a topic from the left sidebar to begin learning Java.",
        code: "",
        subtopics: [],
        inshort: "",
        quiz: [],
        image: null,
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
      <LanguageLayout topics={javaTopics} title="Java">
        {(activeTopic) => {
          const { desc, code, subtopics, inshort, quiz, title, image } =
            getTopicContent(activeTopic);

          return (
            <div className="space-y-8 java-main">
              {/* ✅ Main Content Block */}
              <MainContentBlock title={activeTopic}>
                <div className="content-layout">
                  {/* Left → Text */}
                  <div className="content-text">
                    {desc && (
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw]}
                      >
                        {desc}
                      </ReactMarkdown>
                    )}
                  </div>

                  {/* Right → Image (from JSON) */}
                  {image && (
                    <div className="content-image">
                      <img src={image} alt={activeTopic} />
                    </div>
                  )}
                </div>
              </MainContentBlock>

              {/* ✅ Inshort Block */}
              {inshort && <InshortBlock text={inshort} />}

              {/* ✅ Subtopics */}
              {subtopics &&
                subtopics.map((s, i) => (
                  <MainContentBlock key={i} title={s.title}>
                    <div className="content-layout">
                      <div className="content-text">
                        {s.desc && (
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeRaw]}
                          >
                            {s.desc}
                          </ReactMarkdown>
                        )}
                      </div>

                      {s.image && (
                        <div className="content-image">
                          <img src={s.image} alt={s.title} />
                        </div>
                      )}
                    </div>

                    {/* Example block if code present */}
                    {s.code && <ExampleBlock code={s.code} />}
                  </MainContentBlock>
                ))}

              {/* Example for main topic */}
              {code && <ExampleBlock code={code} />}

              {/* ✅ Quiz for Main Topic */}
              {quiz && quiz.length > 0 && (
                <div className="quiz-section">
                  <h3 className="quiz-title">📝 Quiz Time</h3>
                  <QuizBlock quiz={quiz} />
                </div>
              )}
            </div>
          );
        }}
      </LanguageLayout>
    </div>
  );
}
