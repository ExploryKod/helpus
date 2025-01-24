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
          <h1>{title}</h1>
          {children}
          <div className={"flex flex-col gap-4 my-5 place-content-center"}>
            <LocaleSwitcher />
          </div>
        </div>
      </div>
    </>
  );
}
