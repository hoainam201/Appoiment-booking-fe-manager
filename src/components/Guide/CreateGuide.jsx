/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import {AutoFocusPlugin} from '@lexical/react/LexicalAutoFocusPlugin';
import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin';
import {$generateHtmlFromNodes, $generateNodesFromDOM} from '@lexical/html';
import * as React from 'react';

import ExampleTheme from './ExampleTheme';
import ToolbarPlugin from './plugins/ToolbarPlugin';
import TreeViewPlugin from './plugins/TreeViewPlugin';
import {useEffect, useState} from "react";
import {HeadingNode, QuoteNode} from "@lexical/rich-text";
import {CodeHighlightNode, CodeNode} from "@lexical/code";
import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import {OnChangePlugin} from "@lexical/react/LexicalOnChangePlugin";
import {$insertNodes} from "lexical";
import {ListPlugin} from "@lexical/react/LexicalListPlugin";
import {LinkPlugin} from "@lexical/react/LexicalLinkPlugin";
import {AutoLinkPlugin} from "@lexical/react/LexicalAutoLinkPlugin";
import {ListItemNode, ListNode} from "@lexical/list";
import {TableCellNode, TableNode, TableRowNode} from "@lexical/table";
import {AutoLinkNode, LinkNode} from "@lexical/link";

function Placeholder() {
  return <div className="editor-placeholder">Enter some rich text...</div>;
}

const editorConfig = {
  namespace: 'React.js Demo',
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode,
  ],
  // Handling of errors during update
  onError(error) {
    throw error;
  },
  // The editor theme
  theme: ExampleTheme,
};

function HtmlPlugin({initialHtml, onHtmlChanged}) {
  const [editor] = useLexicalComposerContext();
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    if (!initialHtml || !isFirstRender) return;

    setIsFirstRender(false);

    editor.update(() => {
      const parser = new DOMParser();
      const dom = parser.parseFromString(initialHtml, "text/html");
      const nodes = $generateNodesFromDOM(editor, dom);
      $insertNodes(nodes);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <OnChangePlugin
      onChange={(editorState) => {
        editorState.read(() => {
          onHtmlChanged($generateHtmlFromNodes(editor));
        });
      }}
    />
  );
}


export default function App() {
  const [editorState, setEditorState] = useState();
  const [html, setHtml] = useState('');

  function onChange(editorState) {
    console.log(editorState)
    const editorStateJSON = editorState.toJSON();
    setEditorState(JSON.stringify(editorStateJSON));
  }

  return (
    <div className={`outline max-h-96 overflow-y-scroll w-1/2 scroll-smooth h-auto`}>
      <LexicalComposer initialConfig={editorConfig}>
        <div className="editor-container mx-auto w-full">
          <ToolbarPlugin/>
          {/*<ImageToolbar/>*/}
          <div className="editor-inner">
            <RichTextPlugin
              contentEditable={<ContentEditable className="editor-input"/>}
              placeholder={<Placeholder/>}
              ErrorBoundary={LexicalErrorBoundary}
            />
            <HtmlPlugin onHtmlChanged={(html) => {
              setHtml(html);
              console.log(html);
            }}
                        initialHtml="<h1>Test</h1><p>abc</p>"/>
            <HistoryPlugin/>
            <ListPlugin />
            <LinkPlugin />
            <AutoFocusPlugin />
          </div>
        </div>
      </LexicalComposer>
    </div>
  );
}
