'use client';

import {useTranslations} from 'next-intl';
import PageLayout from '@/components/PageLayout';

export default function Secret() {
  const t = useTranslations('Secret');

  return (
    <PageLayout title={t('title')}>
        <div className="flex flex-col items-center justify-center text-center">
            <div className="bg-primary-100 p-5 dark:bg-primary-900 mb-4 flex items-center justify-center rounded-full p-1.5 text-blue-700">
                <p className={"text-gray-500 dark:text-gray-400"}>{t('description')}</p>
            </div>
        </div>
    </PageLayout>
  );
}
