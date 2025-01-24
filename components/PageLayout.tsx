import {ReactNode} from 'react';
import LocaleSwitcher from './LocaleSwitcher';
import Link from "next/link";
import {useLocale, useTranslations} from "next-intl";

type Props = {
  children?: ReactNode;
  title: string;
};

export default function PageLayout({children, title}: Props) {
    const t = useTranslations('Login');
    const locale = useLocale();
  return (
    <>
      <div
      >
        <div>
            <div className="w-full flex flex-col justify-center my-3">
                 <h1 className={"ms-2 text-xl font-bold text-gray-700 dark:text-white"}>{title}</h1>
            </div>
          {children}
          <div className={"flex flex-col gap-4 my-5 place-content-center"}>
            <LocaleSwitcher />
          </div>
            <div className={"flex flex-col gap-4 my-5 place-content-center"}>
                <Link className="mx-auto mb-2 text-gray-800 font-bold hover:text-gray-600 text-lg" href={locale + '/'}>{t('back')}</Link>
            </div>
        </div>
      </div>
    </>
  );
}
