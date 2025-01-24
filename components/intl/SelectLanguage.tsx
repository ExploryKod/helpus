'use client';

import {useLocale } from "next-intl";
import React from "react";
import { usePathname, useRouter } from '@/i18n/routing';

export default function SelectLanguage() {
    const router = useRouter();
    const pathname = usePathname();
    const locale = useLocale();

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        router.push(pathname, { locale: e.target.value });
    };


    return (
        <div className="mx-auto flex flex-col items-center">
            <select
                value={locale}
                onChange={handleChange}
                className="cursor-pointer block w-full bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 px-2 py-4"
            >
                <option value="en">English</option>
                <option value="de">Deutsch</option>
            </select>
        </div>
    );
}