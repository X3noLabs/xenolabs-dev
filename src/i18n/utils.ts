import { ui, defaultLang, type Lang } from './ui';

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as Lang;
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]) {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

export function swapLocale(pathname: string, targetLang: Lang): string {
  const parts = pathname.split('/');
  parts[1] = targetLang;
  return parts.join('/') || `/${targetLang}`;
}
