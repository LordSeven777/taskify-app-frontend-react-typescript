import type { PropsWithChildren } from 'react';
import styled from 'styled-components';

export default function AuthPageLayout({ children }: PropsWithChildren<{}>) {
  return (
    <Layout className="w-100 d-flex flex-wrap justify-content-center">
      {children}
    </Layout>
  );
}

/* STYLES **********************************************************/

const Layout = styled.div`
  min-height: calc(100vh - 3.5rem);

  > * {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .illustration-part {
    display: none;
  }

  @media screen and (min-width: 62rem) {
    > * {
      width: 50%;
    }

    .illustration-part {
      display: flex;
    }
  }
`;
