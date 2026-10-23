/**
 * Temporary storage for a service-request draft prepared in the support
 * assistant.
 *
 * The draft lives in `sessionStorage` only — it is scoped to the browser tab
 * and disappears when the tab is closed. Nothing is sent to a server, and the
 * assistant never submits anything on the visitor's behalf: the visitor
 * always reviews and submits the form themselves.
 */

const STORAGE_KEY = 'kbs.serviceRequestDraft.v1'

export function saveRequestDraft(draft) {
  if (!draft || typeof draft !== 'object') return false
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(draft))
    return true
  } catch {
    return false
  }
}

export function readRequestDraft() {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === 'object' ? parsed : null
  } catch {
    return null
  }
}

export function clearRequestDraft() {
  try {
    window.sessionStorage.removeItem(STORAGE_KEY)
  } catch {
    /* ignore */
  }
}

export function hasRequestDraft() {
  return readRequestDraft() !== null
}

export default { saveRequestDraft, readRequestDraft, clearRequestDraft, hasRequestDraft }
