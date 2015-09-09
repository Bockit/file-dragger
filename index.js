module.exports = FileDragger

var EventEmitter = require('events').EventEmitter

/**
 * Returns and event emitter that emits `'file'` events whenever files are
 * dropped into the window.
 *
 * For the purposes of this codebase it only emits the file at position [0]
 * so mutli file drops won't emit for each file, but that should ideally be
 * removed.
 *
 * It takes one argument, `element`, the element to attach drag and drop events
 * to.
 *
 * `emitter.cleanup` will release all event handlers.
 */
function FileDragger (element) {
    element = element || window
    var emitter = new EventEmitter()

    // dragover and dragenter make the element a drag target, without which
    // drop won't fire and the page will redirect to the dropped file
    element.addEventListener('dragover', cancel, false)
    element.addEventListener('dragenter', cancel, false)
    element.addEventListener('drop', drop, false)

    emitter.cleanup = cleanup

    return emitter

    function drop (e) {
        cancel(e)

        for (var i = 0; i < e.dataTransfer.files.length; i++) {
            emitter.emit('file', e.dataTransfer.files[i])
        }
    }

    /**
     * Prevent the browser from redirecting to the file dropped in.
     */
    function cancel (e) {
        e.preventDefault()
        e.stopPropagation()
    }

    function cleanup () {
        element.removeEventListener('dragover', cancel)
        element.removeEventListener('dragenter', cancel)
        element.removeEventListener('drop', drop)
    }
}