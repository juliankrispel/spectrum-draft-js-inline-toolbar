# spectrum-draft-js-inline-toolbar

Spectrums inline toolbar for rich text editors based on draft js

[![NPM](https://img.shields.io/npm/v/react-text-selection-popover.svg)](https://www.npmjs.com/package/react-text-selection-popover) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save spectrum-draft-js-inline-toolbar
```

## Usage

```jsx
import React, { Component } from 'react'

import InlineToolbar from 'spectrum-draft-js-inline-toolbar'

class Example extends Component {
  render () {
    return (
      <InlineToolbar
        onChange={(editorState) => this.setState({ editorState })}
        editorState={this.state.editorState}
        selectionRef={{ current: this.editorRef }}
      />
    )
  }
}
```

## License

MIT © [juliankrispel](https://github.com/juliankrispel)
