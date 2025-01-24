import {useLocale, useTranslations} from 'next-intl';
import {Link, usePathname} from '@/i18n/routing';

export default function LocaleSwitcher() {
  const t = useTranslations('LocaleSwitcher');
  const locale = useLocale();
  const otherLocale = locale === 'en' ? 'de' : 'en';
  const pathname = usePathname();

  return (
      <Link
          className="mx-auto bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
          href={pathname}
          locale={otherLocale}
      >
        {t('switchLocale', { locale: otherLocale })}
      </Link>
  );
}
