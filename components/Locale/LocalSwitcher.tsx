export const LocaleSwitcher = () => {
  const locales = ["en-US", "en-GB"];

  const setLocale = (locale: string) => {
    document.cookie = `locale=${locale}; path=/; max-age=31536000`; // 1 year
    window.location.reload(); // refresh to trigger content reload
  };

  return (
    <div style={{display: "flex", gap: "1rem"}}>
      {locales.map((locale) => (
        <button key={locale} onClick={() => setLocale(locale)}>
          {locale.toUpperCase()}
        </button>
      ))}
    </div>
  );
};
