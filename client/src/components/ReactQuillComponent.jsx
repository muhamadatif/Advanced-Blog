import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // or 'quill.bubble.css' for the bubble theme
import hljs from "highlight.js";
import "highlight.js/styles/monokai.css"; // Choose a theme you like
import { Alert } from "flowbite-react";

const modules = {
  syntax: {
    highlight: (text) => hljs.highlightAuto(text).value, // Enable syntax highlighting
  },
  toolbar: [
    ["bold", "italic", "underline", "strike", "copy"], // Basic text styling
    [{ header: [1, 2, 3, false] }], // Headers
    ["blockquote", "code-block", "code"], // Code block support
    [{ list: "ordered" }, { list: "bullet" }], // Lists
    [{ script: "sub" }, { script: "super" }], // Superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // Indentation
    [{ direction: "rtl" }], // Text direction
    [{ size: ["small", false, "large", "huge"] }], // Font sizes
    [{ color: [] }, { background: [] }], // Text color and background color
    [{ font: [] }], // Fonts
    [{ align: [] }], // Text alignment
    ["clean"], // Remove formatting
    ["link"], // Adds the link button
  ],
  clipboard: true,
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "copy",
  "blockquote",
  "code-block",
  "code",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  "color",
  "background",
  "align",
];
/*eslint-disable*/
const ReactQuillComponent = ({
  placeholder,
  onChange,
  id,
  onBlur,
  error,
  value,
  defaultValue,
}) => {
  return (
    <>
      <ReactQuill
        modules={modules}
        formats={formats}
        theme="snow" // Or "bubble"
        className="mb-12 h-72"
        placeholder={placeholder}
        id={id}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        defaultValue={defaultValue}
      />
      {error?.message && (
        <Alert className="mt-5" color="failure">
          {error.message}
        </Alert>
      )}
    </>
  );
};

export default ReactQuillComponent;
