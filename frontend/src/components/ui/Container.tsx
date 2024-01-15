import React, { FC, ReactNode } from 'react';

type ConatinerProps = {
  children: ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

const Container: FC<ConatinerProps> = ({ children, ...props }) => {
  return (
    <div className="mx-auto h-full w-full max-w-2xl px-4" {...props}>
      {children}
    </div>
  );
};

export default Container;
