import React, { PureComponent } from "react";
import Utils from "draft-js-plugins-utils";
import PropTypes from "prop-types";
import Draft from "draft-js";

const { RichUtils } = Draft;

const defaultProps = {
  renderButton: ({ children, inlineStyle, isEnabled, onMouseDown }) => (
    <button
      className={isEnabled === true ? "djs-button-active" : ""}
      onMouseDown={onMouseDown}
    >
      {children}
    </button>
  )
};

class InlineEntityButton extends PureComponent {
  render() {
    const { renderButton, children, editorState, entityName } = this.props;

    const isEnabled = Utils.hasEntity(editorState, entityName);

    return renderButton({
      onMouseDown: this.props.onClick,
      children,
      isEnabled
    });
  }
}

class BlockButton extends PureComponent {
  onChange = ev => {
    ev.preventDefault();

    this.props.onChange(
      RichUtils.toggleBlockType(this.props.editorState, this.props.blockType)
    );
  };

  render() {
    const { renderButton, children, editorState, blockType } = this.props;

    const isEnabled = RichUtils.getCurrentBlockType(editorState) === blockType;

    return renderButton({
      onMouseDown: this.onChange,
      children,
      isEnabled
    });
  }
}

class InlineStyleButton extends PureComponent {
  onChange = ev => {
    ev.preventDefault();
    this.props.onChange(
      RichUtils.toggleInlineStyle(
        this.props.editorState,
        this.props.inlineStyle
      )
    );
  };

  render() {
    const {
      editorState,
      blockType,
      inlineStyle,
      children,
      renderButton
    } = this.props;

    const isEnabled = editorState.getCurrentInlineStyle().has(inlineStyle);

    return renderButton({
      onMouseDown: this.onChange,
      children,
      isEnabled
    });
  }
}

InlineStyleButton.defaultProps = defaultProps;
BlockButton.defaultProps = defaultProps;
InlineEntityButton.defaultProps = defaultProps;

export { InlineStyleButton, BlockButton, InlineEntityButton };
