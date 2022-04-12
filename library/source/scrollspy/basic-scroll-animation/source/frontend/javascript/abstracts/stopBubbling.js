/**
 * StoppingBubbling
 * When an event happens on an element, it first runs the handlers on it, then on its parent, then all the way up on other ancestors
 * 
 * 1. Tell the browser you do not want it to act as default
 * 2. Decide that the event has been fully processed and stop the bubbling - stops the move upwards, but on the current element all other handlers will run
 * 3. To stop the bubbling and prevent handlers on the current element from running
 * 
 * => NOTE - This function should be used with caution - READ this https://css-tricks.com/dangers-stopping-event-propagation/
 * 
 * @param {*} event 
 * @param {*} callback 
 */

export const stopBubbling = (event, callback) => {
  if (event) {
    event.preventDefault(); /* 1 */
    event.stopPropagation(); /* 2 */
    event.stopImmediatePropagation(); /* 3 */
  }

  if (callback) callback(event);
}