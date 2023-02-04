import { FC, PropsWithChildren } from 'react';
import {
  faLock,
  faEdit,
  faCheckCircle,
  faInfoCircle,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faLock, faEdit, faCheckCircle, faInfoCircle, faTimesCircle);

const IconsImports: FC<PropsWithChildren<{}>> = ({ children }) => {
  return <>{children}</>;
};

export default IconsImports;
