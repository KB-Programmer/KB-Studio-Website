/**
 * Formspree submission helper.
 *
 * The site talks to Formspree's official AJAX endpoint
 * (`https://formspree.io/f/<FORM_ID>`) — the same endpoint used by
 * `@formspree/react` — so the submission states can be distinguished
 * precisely:
 *
 *   success        -> the provider accepted the submission (2xx)
 *   rejected       -> the provider refused it (4xx), e.g. validation error
 *   network-error  -> the provider could not be reached at all
 *   not-configured -> no form ID has been configured yet, so nothing is sent
 *
 * IMPORTANT: no success message is shown unless the provider actually
 * accepted the submission. The forms never claim an email was delivered.
 */

const FORMSPREE_ENDPOINT = "https://formspree.io/f/";

export const SERVICE_FORM_ID = (
  import.meta.env.VITE_FORMSPREE_SERVICE_FORM_ID ?? ""
).trim();
export const CONTACT_FORM_ID = (
  import.meta.env.VITE_FORMSPREE_CONTACT_FORM_ID ?? ""
).trim();

/** A form ID is considered configured when it is a non-empty alphanumeric id. */
export function isFormConfigured(formId) {
  return (
    typeof formId === "string" && /^[A-Za-z0-9_-]{3,}$/.test(formId.trim())
  );
}

export const serviceFormConfigured = isFormConfigured(SERVICE_FORM_ID);
export const contactFormConfigured = isFormConfigured(CONTACT_FORM_ID);

/** Builds the payload expected by Formspree. */
export function buildFormspreePayload(data = {}) {
  const body = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;
    if (Array.isArray(value)) {
      value.forEach((item) => {
        if (item !== undefined && item !== null && item !== "")
          body.append(key, item);
      });
      return;
    }
    body.append(key, value);
  });

  return body;
}

/**
 * Submits a form to Formspree.
 *
 * @param {{ formId: string, data: Record<string, unknown> }} options
 * @returns {Promise<{ status: 'success'|'rejected'|'network-error'|'not-configured', ok: boolean, errors: string[], data?: object }>}
 */
export async function submitToFormspree({ formId, data = {} }) {
  if (!isFormConfigured(formId)) {
    return { status: "not-configured", ok: false, errors: [], data: null };
  }

  const body = buildFormspreePayload(data);

  try {
    const response = await fetch(`${FORMSPREE_ENDPOINT}${formId}`, {
      method: "POST",
      body,
      headers: { Accept: "application/json" },
    });

    let payload = null;
    try {
      payload = await response.json();
    } catch {
      payload = null;
    }

    if (!response.ok) {
      const errors = Array.isArray(payload?.errors)
        ? payload.errors.map((entry) => entry?.message ?? String(entry))
        : [];
      return {
        status: "rejected",
        ok: false,
        errors,
        data: payload,
        statusCode: response.status,
      };
    }

    return {
      status: "success",
      ok: true,
      errors: [],
      data: payload,
      statusCode: response.status,
    };
  } catch (error) {
    return {
      status: "network-error",
      ok: false,
      errors: [],
      data: null,
      error,
    };
  }
}

export default submitToFormspree;
