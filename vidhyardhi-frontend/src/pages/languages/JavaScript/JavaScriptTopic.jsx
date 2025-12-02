// src/pages/languages/javascript/JavaScriptTopic.jsx
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import ExampleBlock from "../../../components/ExampleBlock.jsx";
import jsData from "../../../data/javascript/js_english.json"; // 👈 using English JSON for now

export default function JavaScriptTopic() {
  const { slug } = useParams();

  const topic = jsData.topics.find((t) => t.slug === slug);

  if (!topic) {
    return <p className="text-gray-500">⚠️ Topic not found</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{topic.title}</h1>
      <div className="prose">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
          {topic.desc}
        </ReactMarkdown>
      </div>
      {topic.code && <ExampleBlock code={topic.code} />}
    </div>
  );
}
