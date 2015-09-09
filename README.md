File-Dragger
============

Event Emitter that emits a `'file'` event every time a file is dropped onto the drop target.

Example
-------

```
var FileDragger = require('file-dragger')
var emitter = FileDragger()
emitter.on('file', function (file) {
    // do something
})
```

API
---

#### `FileDragger(target)`

Function that returns an EventEmitter. This EventEmitter will emit `'file'` events when files are dropped onto `target`. `target` is a DOM element or window object. it defaults to `window` if nothing is passed in.