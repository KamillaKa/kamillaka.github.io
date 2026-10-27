import { languages, translations, type Language, type TranslationKey } from './translations';

const STORAGE_KEY = 'portfolio-language';

/*
 * HTML attributes that can be translated, e.g.
 *   <button data-i18n-aria-label="nav.menu">  ->  sets aria-label
 *   <img data-i18n-alt="about.portraitAlt">   ->  sets alt
 * Text content uses data-i18n="key".
 */
const attributeBindings = [
  { dataAttribute: 'data-i18n-aria-label', target: 'aria-label' },
  { dataAttribute: 'data-i18n-alt', target: 'alt' },
  { dataAttribute: 'data-i18n-content', target: 'content' },
] as const;

type LanguageListener = (language: Language) => void;

let currentLanguage: Language = 'en';
const listeners = new Set<LanguageListener>();

export function isLanguage(value: unknown): value is Language {
  return typeof value === 'string' && (languages as readonly string[]).includes(value);
}

function isTranslationKey(value: string | null | undefined): value is TranslationKey {
  const isKey = !!value && value in translations.en;
  if (!isKey && import.meta.env.DEV) console.warn(`[i18n] Unknown translation key: "${value}"`);
  return isKey;
}

/** Returns the text for a key in the current language. */
export function t(key: TranslationKey): string {
  return translations[currentLanguage][key];
}

export function getLanguage(): Language {
  return currentLanguage;
}

/** Runs the callback every time the language changes. */
export function onLanguageChange(listener: LanguageListener): void {
  listeners.add(listener);
}

function readStoredLanguage(): Language | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return isLanguage(stored) ? stored : null;
  } catch {
    // localStorage can be blocked (e.g. some private browsing modes).
    return null;
  }
}

function storeLanguage(language: Language): void {
  try {
    localStorage.setItem(STORAGE_KEY, language);
  } catch {
    // Not critical: the choice just won't be remembered.
  }
}

/** Saved choice first, then the browser's preferred languages, then English. */
function detectInitialLanguage(): Language {
  const saved = readStoredLanguage();
  if (saved) return saved;

  const browserLanguages = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const browserLanguage of browserLanguages) {
    const baseLanguage = browserLanguage?.toLowerCase().split('-')[0];
    if (isLanguage(baseLanguage)) return baseLanguage;
  }
  return 'en';
}

/** Translates every element with a data-i18n* attribute inside `root`. */
export function translateElement(root: ParentNode = document): void {
  root.querySelectorAll<HTMLElement>('[data-i18n]').forEach((element) => {
    const key = element.dataset.i18n;
    if (isTranslationKey(key)) element.textContent = t(key);
  });

  for (const { dataAttribute, target } of attributeBindings) {
    root.querySelectorAll<HTMLElement>(`[${dataAttribute}]`).forEach((element) => {
      const key = element.getAttribute(dataAttribute);
      if (isTranslationKey(key)) element.setAttribute(target, t(key));
    });
  }
}

function updateLanguageButtons(): void {
  document.querySelectorAll<HTMLButtonElement>('[data-lang]').forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.lang === currentLanguage));
  });
}

export function setLanguage(language: Language, options: { remember?: boolean } = {}): void {
  currentLanguage = language;
  document.documentElement.lang = language;
  translateElement(document);
  updateLanguageButtons();

  if (options.remember) storeLanguage(language);
  listeners.forEach((listener) => listener(language));
}

/** Detects the starting language and wires up the EN / FI buttons. */
export function initLanguage(): void {
  document.querySelectorAll<HTMLButtonElement>('[data-lang]').forEach((button) => {
    button.addEventListener('click', () => {
      const language = button.dataset.lang;
      if (isLanguage(language) && language !== currentLanguage) {
        setLanguage(language, { remember: true });
      }
    });
  });

  setLanguage(detectInitialLanguage());
}
