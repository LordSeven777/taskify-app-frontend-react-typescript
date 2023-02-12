import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Types
import type { UserAttributes } from '@customTypes/user';

// Utils
import { pluralize } from '@utils/strings';

// Store
import type { RootState } from '@/store';

// Services
import { useLazyGetLabelsQuery } from '@services/labels';

// Hooks
import usePageTitle from '@hooks/usePageTitle';

// Components
import SubsectionNav from '@components/shared/SubsectionNav';

export default function LabelsPage() {
  const { authUser } = useSelector((state: RootState) => state.auth);

  const [getLabels, { data: labels, isLoading }] = useLazyGetLabelsQuery();

  const labelsCount = labels ? labels.length : 0;

  useEffect(() => {
    getLabels((authUser as UserAttributes)._id, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  usePageTitle('Labels');

  return (
    <div>
      <SubsectionNav baseRoute="/tasks" baseTitle="Tasks" title="Labels" />
      <div className="d-flex justify-content-between align-items-start mt-4">
        <h1 className="fs-2">
          <FontAwesomeIcon icon="tags" className="me-3" />
          Labels
        </h1>
        <Button variant="primary">
          <FontAwesomeIcon icon="plus" className="me-2" />
          New label
        </Button>
      </div>
      <div className="my-4">
        {labels && (
          <p>
            <Badge bg="secondary" className="me-2">
              {labelsCount}
            </Badge>
            {pluralize('label', labelsCount)}
          </p>
        )}
        {(isLoading || labelsCount > 0) && <hr />}
      </div>
    </div>
  );
}
