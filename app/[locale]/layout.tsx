import {notFound} from 'next/navigation';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {ReactNode} from 'react';
import {getLangDir} from 'rtl-detect';
import {routing} from '@/i18n/routing';

type Props = {
  children: ReactNode;
  params: Promise<{locale: string}>;
};



export default async function LocaleLayout(props: Props) {
  const params = await props.params;

  const {
    locale
  } = params;

  const {
    children
  } = props;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as string)) {
    notFound();
  }

  const direction = getLangDir(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} dir={direction} >
      <head>
        <title>next-intl & next-auth</title>
      </head>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
