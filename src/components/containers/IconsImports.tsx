import { FC, PropsWithChildren } from 'react';
import { faLock, faEdit } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faLock, faEdit);

const IconsImports: FC<PropsWithChildren<{}>> = ({ children }) => {
  return <>{children}</>;
};

export default IconsImports;
