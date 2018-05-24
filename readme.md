## Pipebin CLI

This is the cli for [Pipebin](https://pipeb.in), a service like pastebin, for piping files and content to!

## Installation

```bash
npm install -g pipebin
```

## Usage

To create a new pipe

```bash
whoami | pb
# will return a pipebin id like 'BqStMv'
```

To get the contents of the pipe on another machine, terminal, wherever!

```bash
pb BqStMv
# Will return your pipe contents
```

You can also do things with the contents

```bash
pb BqStMv > /tmp/mydate.txt
# Will pipe your previously piped contents into the file /tmp/mydate.txt
```
