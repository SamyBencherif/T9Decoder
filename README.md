# T9Decoder

Converts sequences of digits entered into a flip-phone into english text using T9 text prediction.

## Setup

1. Install [Node.JS](https://nodejs.org/en/).
1. Clone `git clone https://github.com/SamyBencherif/T9Decoder.git`.

## Usage

Run the program with node.

```
$ node T9Converter.js
```

Copy & paste the example message,

```
$ node T9Converter.js
Ex message: '43556 96753'
T9 Message: 43556 96753
Decoded Message: hello world
```

or decode your own message,

```
$ node T9Converter.js
Ex message: '43556 96753'
T9 Message: 968027302064230737766
```

## Implementation Notes

* 0 and ' ' can be used interchangeably to represent _space_.
* 1 ambiguously represents punctuation
* This implementation always chooses the most common word that fits

## Caveats

Since it always chooses the most common words, some translations will be incorrect. I.E.

"2 4663 329 86 343 4273"
