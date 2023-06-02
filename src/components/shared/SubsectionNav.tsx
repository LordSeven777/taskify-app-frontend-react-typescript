import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

interface SubsectionNavProps {
  isLoading?: boolean;
  baseRoute: string;
  baseTitle: string;
  title: string;
  notFoundMessage?: string;
}

export default function SubsectionNav({
  isLoading,
  baseRoute,
  baseTitle,
  title,
  notFoundMessage,
}: SubsectionNavProps) {
  const navigate = useNavigate();

  return (
    <Wrapper className="app-breadcrumb-nav d-flex align-items-center py-2">
      <Button
        type="button"
        title="Go back"
        variant="light"
        className="text-secondary fw-bolder me-3"
        onClick={() => navigate(-1)}
      >
        <FontAwesomeIcon icon="arrow-left" />
      </Button>
      <Breadcrumb
        className="text-nowrap overflow-hidden"
        listProps={{ className: 'mb-0 nowrap flex-nowrap' }}
      >
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: baseRoute }}>
          {baseTitle}
        </Breadcrumb.Item>
        <Breadcrumb.Item
          linkAs={title ? 'strong' : 'em'}
          active={false}
          linkProps={{
            className: `text-decoration-none text-${
              title ? 'dark' : 'secondary'
            }`,
          }}
        >
          {isLoading ? '...' : title ? title : notFoundMessage}
        </Breadcrumb.Item>
      </Breadcrumb>
    </Wrapper>
  );
}

/* STYLES **********************************************************/

const Wrapper = styled.nav`
  border-bottom: 1px solid #ddd;
  position: sticky;
  top: 3.5rem; /* 56px: The height of the app navbar */
  background-color: #fff;
  z-index: 10;
`;
