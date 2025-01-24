import {ReactNode} from 'react';
import LocaleSwitcher from './LocaleSwitcher';

type Props = {
  children?: ReactNode;
  title: string;
};

export default function PageLayout({children, title}: Props) {
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
        </div>
      </div>
    </>
  );
}
