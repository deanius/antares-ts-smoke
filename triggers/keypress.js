// initialize
const process = require("process")
const keypress = require("keypress")
const { Observable, Subject, interval, of } = require("rxjs")
const { concat, map, mapTo, take } = require("rxjs/operators")

keypress(process.stdin)
process.stdin.setRawMode(true)
process.stdin.resume()

// We want to have this simple API
console.log("Push some number keys! (0-9), x to eXit.")
const keyPresse$ = getNotificationsOf("keypress", process.stdin)
keyPresse$.subscribe(keyPressRenderer)

// This renderer, in typical form is a function called upon not for its
// return value but for its side effects.
// In this case, displaying to the console periodically in response to
// keystrokes. 
// Note: this rendering is async, and non blocking
// Try typing '9', and while that is going press another key (number or letter)
// Multiple renderings can be 'in progress' at once, and the system has no way to know when
// a single rendering is done
function keyPressRenderer (numKey) {
    // interval(N) represents an infinite stream of ascending digits which we
    //  - make strings out of
    //  - take only a few of until we unsubscribe, not wasting computation
    //  - append a string of '!' of which is not delayed 
    // We do this in a pipeline.
    // Then we subscribe a Renderer to it.
    interval(250)
      .pipe(mapTo(`${numKey} `), take(Number(numKey)), concat(of('!')))
      .subscribe({
        next(d) {
          process.stdout.write(d)
        },
        complete() {
          process.stdout.write("\n")
        }
      })
  }
/* END */

// Utility functions
// get a stream - like a promise that keeps emitting events over time
// which you get via subscribing
function getNotificationsOf(event, stream) {
  const s = new Subject()
  // set up handler and return the stream as Observable
  stream.on(event, (ch, key = {}) => {
    if (key.name == "x" || (key && key.ctrl && key.name == "c")) {
      process.stdin.pause()
      return
    }
    if (ch==="0" || Number(ch)) {
      s.next(ch)
    } else {
      console.error("Not a number!")
    }
  })
  return s.asObservable()
}
