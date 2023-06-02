import { useEffect } from 'react';

export interface UsePageTitleOptions {
  title?: string;
}

const DEFAULT_TITLE = 'Taskify';

export default function usePageTitle(
  optionsOrTitle?: UsePageTitleOptions | string
) {
  function setPageTitle(title: string) {
    document.title = title;
  }

  useEffect(() => {
    const title =
      typeof optionsOrTitle === 'string'
        ? optionsOrTitle
        : optionsOrTitle?.title ?? DEFAULT_TITLE;
    setPageTitle(title);
    return () => setPageTitle(DEFAULT_TITLE);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { setPageTitle };
}
