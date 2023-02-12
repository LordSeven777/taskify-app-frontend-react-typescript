import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Types
import type { UserAttributes } from '@customTypes/user';
import type { LabelAttributes } from '@customTypes/Label';

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
import LabelChip from './LabelChip';
import LabelFormModal from './LabelFormModal';
import DeleteLabelModal from './DeleteLabelModal';

export default function LabelsPage() {
  const { authUser } = useSelector((state: RootState) => state.auth);

  const [getLabels, { data: labels, isLoading }] = useLazyGetLabelsQuery();

  const labelsCount = labels ? labels.length : 0;

  const [modalIsOpen, setModalOpen] = useState(false);
  const [editLabel, setEditLabel] = useState<LabelAttributes | null>(null);
  const [deleteIsOpen, setDeleteOpen] = useState(false);
  const [deleteLabel, setDeleteLabel] = useState<LabelAttributes | null>(null);

  useEffect(() => {
    getLabels((authUser as UserAttributes)._id, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  usePageTitle('Labels');

  function handleLabelEdit(label: LabelAttributes) {
    setEditLabel(label);
    setModalOpen(true);
  }

  function handleModalClose() {
    setEditLabel(null);
    setModalOpen(false);
  }

  function handleDeleteModalDelete(label: LabelAttributes) {
    setDeleteLabel(label);
    setDeleteOpen(true);
  }

  function handleDeleteModalClose() {
    setDeleteLabel(null);
    setDeleteOpen(false);
  }

  return (
    <div>
      <SubsectionNav baseRoute="/tasks" baseTitle="Tasks" title="Labels" />
      <div className="d-flex justify-content-between align-items-start mt-4">
        <h1 className="fs-2">
          <FontAwesomeIcon icon="tags" className="me-3" />
          Labels
        </h1>
        <Button variant="primary" onClick={() => setModalOpen(true)}>
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
      {labels && (
        <ul
          style={{ listStyle: 'none' }}
          className="m-0 p-0 d-flex flex-wrap align-items-start"
        >
          {labels.map((label) => (
            <li key={label._id} className="me-4 mb-3">
              <LabelChip
                label={label}
                onEdit={() => handleLabelEdit(label)}
                onDelete={() => handleDeleteModalDelete(label)}
              />
            </li>
          ))}
        </ul>
      )}
      <LabelFormModal
        show={modalIsOpen}
        editLabel={editLabel}
        onClose={handleModalClose}
      />
      <DeleteLabelModal
        show={deleteIsOpen}
        label={deleteLabel}
        onClose={handleDeleteModalClose}
      />
    </div>
  );
}
