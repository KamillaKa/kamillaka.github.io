import { onLanguageChange, t } from './i18n';
import type { TranslationKey } from './translations';

/*
 * ✏️ The form does NOT send anything until you add an endpoint here.
 * GitHub Pages can't run a backend, so use a form service such as
 * Formspree (https://formspree.io): create a form and paste its URL, e.g.
 *   const FORM_ENDPOINT = 'https://formspree.io/f/abcdwxyz';
 * When this is empty, the form shows an honest "not connected" message.
 */
const FORM_ENDPOINT = '';

type FormField = HTMLInputElement | HTMLTextAreaElement;
type StatusType = 'info' | 'success' | 'error';

/** Which error message to show for each field. Empty string = valid. */
function getErrorKey(field: FormField): TranslationKey | '' {
  const value = field.value.trim();
  switch (field.name) {
    case 'name':
      return value ? '' : 'form.nameRequired';
    case 'email':
      if (!value) return 'form.emailRequired';
      return field.validity.typeMismatch ? 'form.emailInvalid' : '';
    case 'message':
      return value ? '' : 'form.messageRequired';
    default:
      return '';
  }
}

export function initContactForm(): void {
  const form = document.querySelector<HTMLFormElement>('#contact-form');
  if (!form) return;

  const status = form.querySelector<HTMLElement>('.form-status')!;
  const submitButton = form.querySelector<HTMLButtonElement>('button[type="submit"]')!;
  const fields = Array.from(form.querySelectorAll<FormField>('input, textarea'));
  let hasTriedSubmitting = false;
  let statusKey: TranslationKey | null = null;

  // The form only makes sense with JavaScript, so it's hidden in the HTML by default.
  form.hidden = false;
  form.noValidate = true; // We show our own translated, accessible error messages.
  form.querySelector<HTMLElement>('.form-notice')!.hidden = FORM_ENDPOINT !== '';

  function showFieldError(field: FormField): boolean {
    const errorKey = getErrorKey(field);
    const errorElement = document.getElementById(`${field.id}-error`)!;
    field.dataset.errorKey = errorKey;
    field.setAttribute('aria-invalid', String(errorKey !== ''));
    errorElement.textContent = errorKey ? t(errorKey) : '';
    return errorKey === '';
  }

  function showStatus(key: TranslationKey | null, type: StatusType = 'info'): void {
    statusKey = key;
    status.dataset.type = type;
    status.textContent = key ? t(key) : '';
  }

  // Re-check a field while typing, but only after the first submit attempt.
  fields.forEach((field) => {
    field.addEventListener('input', () => {
      if (hasTriedSubmitting) showFieldError(field);
    });
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    hasTriedSubmitting = true;

    const invalidFields = fields.filter((field) => !showFieldError(field));
    if (invalidFields.length > 0) {
      showStatus('form.fixErrors', 'error');
      invalidFields[0].focus();
      return;
    }

    if (!FORM_ENDPOINT) {
      // Keep the typed message so the visitor can copy it into an email.
      showStatus('form.notConnected', 'info');
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = t('form.sending');
    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) throw new Error(`Form service responded with ${response.status}`);
      form.reset();
      hasTriedSubmitting = false;
      showStatus('form.success', 'success');
    } catch (error) {
      console.error(error);
      showStatus('form.failure', 'error');
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = t('form.submit');
    }
  });

  // Keep visible error and status messages in the selected language.
  onLanguageChange(() => {
    fields.forEach((field) => {
      const errorKey = field.dataset.errorKey as TranslationKey | '' | undefined;
      if (errorKey) document.getElementById(`${field.id}-error`)!.textContent = t(errorKey);
    });
    if (statusKey) status.textContent = t(statusKey);
  });
}
