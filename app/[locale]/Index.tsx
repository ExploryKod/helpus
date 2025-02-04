'use client'
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import {useLocale, useTranslations} from 'next-intl';
import PageLayout from '@/components/PageLayout';
import { Button } from "components/Button/Button"
import { LP_GRID_ITEMS } from "lp-items"

const props = {
  session : Session
}

export default function Index(session: any) {
  const t = useTranslations('Index');
  const locale = useLocale();
  function onLogoutClick() {
    signOut().then(r => console.log(r));
  }

  return (
    <PageLayout title={t('title')}>
      {session ? (
        <div className={"flex flex-col items-center"}>
          <div className={"flex flex-col gap-4"}>
          <p className={"text-center text-gray-900 md:text-lg lg:mb-8 lg:text-xl dark:text-gray-400"}>{t('loggedIn', {username: session.data?.user?.name})}</p>
          <Link  className="mx-auto text-gray-800 py-2 px-4 rounded-lg hover:text-gray-500 underline"
                 href={locale + '/secret'}>{t('secret')}</Link>
          <button className={"mx-auto bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400"} onClick={onLogoutClick} type="button">
            {t('logout')}
          </button>
          </div>
        </div>
      ) : (
        <>
            <section className="bg-white dark:bg-gray-900">
              <div className={"mx-auto flex flex-col gap-3 items-center justify-center"}>
                <div className={"mx-auto p-3 shadow-lg rounded-lg flex flex-col gap-3 items-center justify-center"}>
                  <p className={"my-2 max-w-2xl font-light text-gray-500 md:text-lg lg:mb-8 lg:text-xl dark:text-gray-400"}>{t('loggedOut')}</p>
                  <Link className="mb-2 text-green-500 md:text-lg lg:mb-8 lg:text-xl " href={locale + '/login'}>{t('login')}</Link>
                </div>
              </div>

              <div className="mx-auto grid max-w-(--breakpoint-xl) px-4 py-8 text-center lg:py-16">
                <div className="mx-auto place-self-center">
                  <h1 className="mb-4 max-w-2xl text-4xl leading-none font-extrabold tracking-tight md:text-5xl xl:text-6xl dark:text-white">
                    Next.js Enterprise Boilerplate
                  </h1>
                  <p className="mb-6 max-w-2xl font-light text-gray-500 md:text-lg lg:mb-8 lg:text-xl dark:text-gray-400">
                    Jumpstart your enterprise project with our feature-packed, high-performance Next.js boilerplate!
                    Experience rapid UI development, AI-powered code reviews, and an extensive suite of tools for a smooth and
                    enjoyable development process.
                  </p>
                  <Button href="https://github.com/Blazity/next-enterprise" className="mr-3">
                    Get started
                  </Button>
                  <Button
                      href="https://vercel.com/new/git/external?repository-url=https://github.com/Blazity/next-enterprise"
                      intent="secondary"
                  >
                    Deploy Now
                  </Button>
                </div>
              </div>
            </section>
            <section className="bg-white dark:bg-gray-900">
              <div className="mx-auto max-w-(--breakpoint-xl) px-4 py-8 sm:py-16 lg:px-6">
                <div className="justify-center space-y-8 md:grid md:grid-cols-2 md:gap-12 md:space-y-0 lg:grid-cols-3">
                  {LP_GRID_ITEMS.map((singleItem) => (
                      <div key={singleItem.title} className="flex flex-col items-center justify-center text-center">
                        <div className="bg-primary-100 dark:bg-primary-900 mb-4 flex size-10 items-center justify-center rounded-full p-1.5 text-blue-700 lg:size-12">
                          {singleItem.icon}
                        </div>
                        <h3 className="mb-2 text-xl font-bold dark:text-white">{singleItem.title}</h3>
                        <p className="text-gray-500 dark:text-gray-400">{singleItem.description}</p>
                      </div>
                  ))}
                </div>
              </div>
            </section>
        </>
      )}
    </PageLayout>
  );
}
