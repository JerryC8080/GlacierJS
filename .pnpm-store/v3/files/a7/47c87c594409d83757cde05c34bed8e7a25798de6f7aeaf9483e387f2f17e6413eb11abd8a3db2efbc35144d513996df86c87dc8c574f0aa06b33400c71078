# ansi-diff

A module that diffs an input buffer with the previous one provided to it and outputs the diff as ANSI.
If you write out the diff to the terminal it will update the previous output with minimal changes

```
npm install ansi-diff
```

[![Build Status](https://travis-ci.org/mafintosh/ansi-diff.svg?branch=master)](https://travis-ci.org/mafintosh/ansi-diff)

## Usage

``` js
var diff = require('ansi-diff')({
  // if you want to support word wrapping, provide the terminal width
  width: process.stdout.columns
})

// render now
render()

// render every 1s
setInterval(render, 1000)

function render () {
  // will update the terminal with minimal changes
  process.stdout.write(diff.update('hello world...\n' + new Date()))
}
```

It also has terminal resize support

``` js
process.stdout.on('resize', function () {
  diff.resize({width: process.stdout.columns})
  render()
})
```

## API

#### `var diff = ansiDiff([options])`

Create a new differ. Options include:

``` js
{
  width: terminalWidth,
  height: terminalHeight
}
```

If you provide the terminal width ansi-diff will be able to support word wrapping
done by the terminal. That means that if you print out a line that is too long to fit in the terminal
the diff will still work.

#### `var changes = diff.update(buffer, opts)`

Update the buffer and return the diff between this and the previous one.
The diff is returned in ANSI as a buffer so you can write it out to the terminal.

* `opts.moveTo` - array of `[column,row]` to move the cursor after diffing the
  screen (in absolute coordinates)

#### `diff.resize([options])`

Update the terminal width / height. If you are writing to stdout
you should update the width when `process.stdout.on('resize')` is fired.

Options should look like this:

``` js
{
  width: terminalWidth,
  height: terminalHeight
}
```

#### `diff.toString()`

Returns the last diffed string.

#### `diff.width`

Property containing the last set terminal width.

#### `diff.height`

Property containing the last set terminal height.

## License
