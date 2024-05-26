import {htmlToMarkdown, markdownToHtml} from "./Parser";
import ReactQuill from "react-quill";

export default function Viewer(props) {
  return <ReactQuill
      value={markdownToHtml(props.value || "")}
      readOnly={true}
      theme="bubble"
  />
}
