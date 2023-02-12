import { FC, PropsWithChildren } from 'react';
import {
  faLock,
  faEdit,
  faCheckCircle,
  faInfoCircle,
  faTimesCircle,
  faPlus,
  faTags,
  faAngleLeft,
  faAngleRight,
  faArrowLeft,
  faTimes,
  faPenSquare,
} from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(
  faLock,
  faEdit,
  faCheckCircle,
  faInfoCircle,
  faTimesCircle,
  faPlus,
  faTags,
  faAngleLeft,
  faAngleRight,
  faArrowLeft,
  faTimes,
  faPenSquare
);

const IconsImports: FC<PropsWithChildren<{}>> = ({ children }) => {
  return <>{children}</>;
};

export default IconsImports;
