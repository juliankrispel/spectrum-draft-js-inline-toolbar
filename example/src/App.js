import React, { Component } from "react";
import { EditorState, DefaultDraftBlockRenderMap } from "draft-js";
import Editor from "draft-js-plugins-editor";
import Popover from "react-text-selection-popover";
import createAnchorPlugin from "draft-js-anchor-plugin";
import {
  blockRenderMap,
  CheckableListItem,
  CheckableListItemUtils,
  CHECKABLE_LIST_ITEM
} from "draft-js-checkable-list-item";

import InlineToolbar from "spectrum-draft-js-inline-toolbar";

const plugins = [createAnchorPlugin()];

class App extends Component {
  state = {
    editorState: EditorState.createEmpty(),
    isLinkModalOpen: false,
    currentLink: "",
    list: []
  };

  onChange = editorState => {
    console.log("on xchange");
    this.setState({
      editorState
    });
  };

  blockRendererFn = block => {
    if (block.getType() === CHECKABLE_LIST_ITEM) {
      return {
        component: CheckableListItem,
        props: {
          onChangeChecked: () =>
            this.onChange(
              CheckableListItemUtils.toggleChecked(
                this.state.editorState,
                block
              )
            ),
          checked: !!block.getData().get("checked")
        }
      };
    }
  };

  blockStyleFn(block) {
    if (block.getType() === CHECKABLE_LIST_ITEM) {
      return CHECKABLE_LIST_ITEM;
    }
  }

  render() {
    return (
      <div className="App">
        <Editor
          blockRendererFn={this.blockRendererFn}
          blockRenderMap={DefaultDraftBlockRenderMap.merge(blockRenderMap)}
          ref={el => {
            this.editorRef = {
              current: el != null ? el.editor.editor : null
            };
          }}
          plugins={plugins}
          blockStyleFn={this.blockStyleFn}
          editorState={this.state.editorState}
          onChange={this.onChange}
        />
        <InlineToolbar
          editorState={this.state.editorState}
          selectionRef={this.editorRef}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

export default App;
