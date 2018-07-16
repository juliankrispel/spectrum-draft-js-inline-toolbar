import React, { PureComponent } from "react";
import { InlineStyleButton, InlineEntityButton, BlockButton } from "./Button";
import _Popover from "react-text-selection-popover";
import Utils from "draft-js-plugins-utils";
import onClickOutside from "react-onclickoutside";
import PropTypes from "prop-types";
import { CHECKABLE_LIST_ITEM } from "draft-js-checkable-list-item";
import styled from "styled-components";

import BoldIcon from "./BoldIcon";
import ListIcon from "./ListIcon";
import CheckIcon from "./CheckIcon";
import H1Icon from "./H1Icon";
import H2Icon from "./H2Icon";
import CodeIcon from "./CodeIcon";
import ItalicIcon from "./ItalicIcon";
import LinkIcon from "./LinkIcon";

const LinkPopoverContent = styled.div`
  display: flex;
  align-items: center;
  input {
    width: auto;
  }
`;

const Popover = styled(_Popover)`
  max-height: 100px;
  overflow: auto;
  background: #000;
  z-index: 1;
  display: flex;
  align-items: center;
  border-radius: 5px;
  color: #fff;

  button, input {
    color: #fff;
    background: none;
    padding: .7em .8em;
    border: none;
    font-size: inherit;
    outline: none;
  }

  button {
    cursor: pointer;
  }

  button.active {
    background: #7B16FF;
  }
`;

const ActiveButton = styled.button`
  background: #7B16FF !important;
`;

const LinkModal = onClickOutside(
  class LinkPopover extends PureComponent<LinkModalProps> {
    handleClickOutside = ev => this.props.onClickOutside(ev);

    handleReturn = ev => {
      if (ev.which === 13) {
        this.props.onPressReturn();
      }
    };

    componentDidMount() {
      if (this.props.value.length < 1) {
        this.inputRef.focus();
        this.inputRef.selectionStart = this.inputRef.selectionEnd = this.inputRef.value.length;
      }
    }

    render() {
      return (
        <LinkPopoverContent>
          <ActiveButton
            onClick={this.props.onClickOutside}
          >
            <LinkIcon />
          </ActiveButton>
          <input
            type="text"
            ref={el => {
              this.inputRef = el;
            }}
            onKeyUp={this.handleReturn}
            onChange={this.props.onChange}
            value={this.props.value}
          />
          <button onClick={this.props.onRemove}>&#10005;</button>
        </LinkPopoverContent>
      );
    }
  }
);

class InlineToolbar extends PureComponent {
  state = {
    isLinkModalOpen: false,
    currentLink: null
  };

  onChangeLinkText = ev =>
    this.setState({
      currentLink: ev.target.value
    });

  onRemoveLink = () => {
    this.setState({
      currentLink: null,
      isLinkModalOpen: false
    });

    this.onChange(
      Utils.collapseToEnd(Utils.removeLinkAtSelection(this.props.editorState))
    );
  };

  getCurrentLink = (editorState = this.props.editorState) => {
    const entity = Utils.getCurrentEntity(editorState);
    return entity ? entity.getData().url : "";
  };

  openLinkModal = e => {
    if (e && e.preventDefault) e.preventDefault();

    this.setState({
      currentLink: this.getCurrentLink(),
      isLinkModalOpen: true
    });
  };

  onChange = editorState => {
    this.props.onChange(editorState);
  };

  closeLinkModal = e => {
    if (e && e.preventDefault) e.preventDefault();

    this.setState({
      currentLink: null,
      isLinkModalOpen: false
    });
  };

  onSubmitLink = () => {
    const { currentLink } = this.state;
    this.setState({
      isLinkModalOpen: false
    });

    this.onChange(
      Utils.collapseToEnd(
        Utils.createLinkAtSelection(this.props.editorState, currentLink)
      )
    );
  };

  render() {
    const isCollapsed = this.props.editorState.getSelection().isCollapsed();

    const isLinkModalOpen =
      (Utils.hasEntity(this.props.editorState, "LINK") && !isCollapsed) ||
      this.state.isLinkModalOpen;

    const currentLink =
      this.state.currentLink != null
        ? this.state.currentLink
        : this.getCurrentLink();

    return (
      <div>
        <Popover
          selectionRef={this.props.selectionRef}
          isOpen={!isCollapsed && !isLinkModalOpen}
          defaultDirection="above"
        >
          <InlineStyleButton
            inlineStyle="BOLD"
            onChange={this.onChange}
            editorState={this.props.editorState}
          >
            <BoldIcon />
          </InlineStyleButton>
          <InlineStyleButton
            inlineStyle="ITALIC"
            onChange={this.onChange}
            editorState={this.props.editorState}
          >
            <ItalicIcon />
          </InlineStyleButton>
          <InlineStyleButton
            inlineStyle="CODE"
            onChange={this.onChange}
            editorState={this.props.editorState}
          >
            <CodeIcon />
          </InlineStyleButton>
          <InlineEntityButton
            entityName="LINK"
            editorState={this.props.editorState}
            onClick={this.openLinkModal}
          >
            <LinkIcon />
          </InlineEntityButton>
          <BlockButton
            blockType={CHECKABLE_LIST_ITEM}
            onChange={this.onChange}
            editorState={this.props.editorState}
          >
            <CheckIcon />
          </BlockButton>
          <BlockButton
            blockType="unordered-list-item"
            onChange={this.onChange}
            editorState={this.props.editorState}
          >
            <ListIcon />
          </BlockButton>

          <BlockButton
            blockType="header-one"
            onChange={this.onChange}
            editorState={this.props.editorState}
          >
            <H1Icon />
          </BlockButton>
          <BlockButton
            blockType="header-two"
            onChange={this.onChange}
            editorState={this.props.editorState}
          >
            <H2Icon />
          </BlockButton>
        </Popover>
        <Popover
          isOpen={isLinkModalOpen}
          selectionRef={this.props.selectionRef}
          defaultDirection="above"
        >
          <LinkModal
            onChange={this.onChangeLinkText}
            onRemove={this.onRemoveLink}
            onPressReturn={this.onSubmitLink}
            onClickOutside={this.onSubmitLink}
            value={currentLink}
          />
        </Popover>
      </div>
    );
  }
}

InlineToolbar.propTypes = {
  editorState: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  selectionRef: PropTypes.shape({
    current: PropTypes.instanceOf(Element)
  })
};

export default InlineToolbar;
