/**
 * Tiny event bus so that any component (header link, home page CTA, chat
 * message button) can open the customer support widget without prop
 * drilling a context through the whole tree.
 */

const listeners = new Set()

/** Subscribe to "open the support chat" requests. Returns an unsubscribe fn. */
export function onOpenSupport(listener) {
  if (typeof listener !== 'function') return () => {}
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

/** Ask the customer support widget to open. */
export function openSupport() {
  listeners.forEach((listener) => {
    try {
      listener()
    } catch {
      /* a broken subscriber must not break the page */
    }
  })
}

export default { onOpenSupport, openSupport }
