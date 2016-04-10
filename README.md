# dport

A small command line utility to clear a port.

It's as simple as `dport 3000`.

## Installation

`npm install -g dport`

## Usage

`dport [portNumber]`

If `dport` sees something running on that port, it will tell you which process
it is and ask before termination.

## Development and Contribution

Contribution is happily accepted! Please open issues to confirm what you are
wanting to work on.

I'd love help with things like cross-platform support or better messaging around
what's currently running on the port.

Clone it. Install the dependences with `npm install`. And run the tests with
`npm test`.

To test changes I suggest doing `DEBUG=* node index.js` to get a more verbose
explanation of what's going on.

## License

MIT License

Copyright (c) [2016] [ryan labouve]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

