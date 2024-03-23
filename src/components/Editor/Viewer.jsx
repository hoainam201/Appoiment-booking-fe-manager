import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw";

export default function Viewer(props) {
  return <ReactMarkdown children={props.value} rehypePlugins={[rehypeRaw]}></ReactMarkdown>
}
