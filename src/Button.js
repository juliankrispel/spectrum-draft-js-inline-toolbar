import React, { PureComponent } from "react";
import Utils from "draft-js-plugins-utils";
import PropTypes from "prop-types";
import Draft from "draft-js";

const { RichUtils } = Draft;

function Button({ activeClassName, children, isEnabled, onMouseDown }) {
  return <button
    className={isEnabled === true ? activeClassName : ""}
    onMouseDown={onMouseDown}
  >
    {children}
  </button>;
}

Button.propTypes = {
  activeClassName: PropTypes.string.isRequired,
  isEnabled: PropTypes.bool.isRequired,
  onMouseDown: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

const defaultProps = {
  renderButton: Button,
  activeClassName: 'active'
};

class InlineEntityButton extends PureComponent {
  render() {
    const { activeClassName, renderButton, children, editorState, entityName } = this.props;

    const isEnabled = Utils.hasEntity(editorState, entityName);

    return renderButton({
      activeClassName,
      onMouseDown: this.props.onClick,
      children,
      isEnabled
    });
  }
}

InlineEntityButton.defaultProps = defaultProps;

InlineEntityButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  editorState: PropTypes.object.isRequired,
  activeClassName: PropTypes.string.isRequired,
  entityName: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  renderButton: PropTypes.func,
};

class BlockButton extends PureComponent {
  onChange = ev => {
    ev.preventDefault();

    this.props.onChange(
      RichUtils.toggleBlockType(this.props.editorState, this.props.blockType)
    );
  };

  render() {
    const { renderButton, activeClassName, children, editorState, blockType } = this.props;

    const isEnabled = RichUtils.getCurrentBlockType(editorState) === blockType;

    return renderButton({
      activeClassName,
      onMouseDown: this.onChange,
      children,
      isEnabled
    });
  }
}

BlockButton.defaultProps = defaultProps;

BlockButton.propTypes = {
  onChange: PropTypes.func.isRequired,
  editorState: PropTypes.object.isRequired,
  activeClassName: PropTypes.string.isRequired,
  blockType: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  renderButton: PropTypes.func,
};

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
      activeClassName,
      inlineStyle,
      children,
      renderButton
    } = this.props;

    const isEnabled = editorState.getCurrentInlineStyle().has(inlineStyle);

    return renderButton({
      activeClassName,
      onMouseDown: this.onChange,
      children,
      isEnabled
    });
  }
}

InlineStyleButton.defaultProps = defaultProps;

InlineStyleButton.propTypes = {
  onChange: PropTypes.func.isRequired,
  editorState: PropTypes.object.isRequired,
  activeClassName: PropTypes.string.isRequired,
  inlineStyle: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  renderButton: PropTypes.func,
};

export { InlineStyleButton, BlockButton, InlineEntityButton };
