import { useParams } from "react-router-dom";
import javaData from "../../../locales/en/java.json";

export default function JavaTopic() {
  const { slug, subslug } = useParams();
  const { content } = javaData;

  let topicKey = slug;
  if (subslug) {
    topicKey = subslug;
  }

  const topic = content[topicKey];

  if (!topic) {
    return <p>⚠️ Content not found for "{topicKey}"</p>;
  }

  return (
    <div>
      <h1>{topic.title}</h1>
      <p dangerouslySetInnerHTML={{ __html: topic.desc }} />
    </div>
  );
}
