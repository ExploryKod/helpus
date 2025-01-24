'use client';

import {useRouter} from 'next/navigation';
import {signIn} from 'next-auth/react';
import {useLocale, useTranslations} from 'next-intl';
import {FormEvent, useState} from 'react';
import PageLayout from '@/components/PageLayout';

export default function Login() {
  const locale = useLocale();
  const t = useTranslations('Login');
  const [error, setError] = useState<string>();
  const router = useRouter();

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (error) setError(undefined);

    const formData = new FormData(event.currentTarget);
    signIn('credentials', {
      username: formData.get('username'),
      password: formData.get('password'),
      redirect: false
    }).then((result) => {
      if (result?.error) {
        setError(result.error);
      } else {
        router.push('/' + locale);
      }
    });
  }

  return (
      <PageLayout title={t('title')}>
        <form
            action="/api/auth/callback/credentials"
            method="post"
            onSubmit={onSubmit}
            className="flex flex-col gap-4 w-80 mx-auto bg-white p-6 rounded-lg shadow-md"
        >
          <label className="flex items-center">
      <span className="flex-grow min-w-[100px] text-gray-700 font-medium">
        {t('username')}
      </span>
            <input
                name="username"
                type="text"
                className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
          <label className="flex items-center">
      <span className="flex-grow min-w-[100px] text-gray-700 font-medium">
        {t('password')}
      </span>
            <input
                name="password"
                type="password"
                className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
          {error && <p className="text-red-500 text-sm">{t('error', { error })}</p>}
          <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            {t('submit')}
          </button>
        </form>
      </PageLayout>

  );
}
