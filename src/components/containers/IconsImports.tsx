import { FC, PropsWithChildren } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add();

const IconsImports: FC<PropsWithChildren<{}>> = ({ children }) => {
  return <>{children}</>;
};

export default IconsImports;
