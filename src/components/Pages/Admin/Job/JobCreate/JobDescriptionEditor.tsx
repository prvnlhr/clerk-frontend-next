"use client";
import RichTextEditor from "reactjs-tiptap-editor";

import { BaseKit } from "reactjs-tiptap-editor";
import { BulletList } from "reactjs-tiptap-editor/bulletlist";
import { Heading } from "reactjs-tiptap-editor/heading";
import { Italic } from "reactjs-tiptap-editor/italic";
import { Bold } from "reactjs-tiptap-editor/bold";
import { Link } from "reactjs-tiptap-editor/link";
import { OrderedList } from "reactjs-tiptap-editor/orderedlist";
import { Strike } from "reactjs-tiptap-editor/strike";
import { TextAlign } from "reactjs-tiptap-editor/textalign";
import { TextUnderline } from "reactjs-tiptap-editor/textunderline";
import { HorizontalRule } from "reactjs-tiptap-editor/horizontalrule";
import { Highlight } from "reactjs-tiptap-editor/highlight";
import { Image } from "reactjs-tiptap-editor/image";
import { FontSize } from "reactjs-tiptap-editor/fontsize";
import "react-image-crop/dist/ReactCrop.css";
import "reactjs-tiptap-editor/style.css";
import { useCallback } from "react";

const extensions = [
  // Core functionality first
  BaseKit.configure({
    placeholder: {
      placeholder: "Enter job description...",
      showOnlyCurrent: true,
    },
    characterCount: {
      limit: 5000,
    },
  }),

  // Text formatting
  Bold.configure({}),
  Italic.configure({}),
  TextUnderline.configure({}),
  Strike.configure({}),
  Highlight.configure({
    multicolor: true,
  }),
  FontSize,

  // Structural elements
  Heading.configure({
    levels: [1, 2, 3, 4],
  }),
  BulletList.configure({}),
  OrderedList.configure({}),
  HorizontalRule.configure({}),

  // Alignment
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),

  // Media and links
  Link.configure({
    openOnClick: false,
    HTMLAttributes: {
      class: "text-blue-600 hover:underline",
    },
  }),
  Image.configure({
    upload: (files: File) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(URL.createObjectURL(files));
        }, 500);
      });
    },
  }),
];

export const JobDescriptionEditor = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (htmlValue: string) => void;
}) => {
  
  const onChangeContent = useCallback(
    (htmlValue: string) => {
      onChange(htmlValue);
    },
    [onChange]
  );

  return (
    <div className="w-[100%] h-[100%]">
      <RichTextEditor
        dark={false}
        output="html"
        content={value}
        onChangeContent={onChangeContent}
        extensions={extensions}
        useEditorOptions={{
          immediatelyRender: false,
          onCreate: ({ editor }) => {
            editor.commands.setContent(value);
            onChange(value);
          },
        }}
      />
    </div>
  );
};

export default JobDescriptionEditor;
