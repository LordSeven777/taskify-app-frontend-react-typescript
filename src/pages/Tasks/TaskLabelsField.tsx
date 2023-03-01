import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Types
import type { LabelAttributes } from '@customTypes/Label';

// Components
import LabelChip from './LabelChip';
import SelectLabelsModal from './SelectLabelsModal';

interface TaskLabelsFieldProps {
  read: boolean;
  labels: LabelAttributes[];
  onSelectedChange: (ids: string[]) => void;
}

export default function TaskLabelsField({
  read,
  labels,
  onSelectedChange,
}: TaskLabelsFieldProps) {
  const [selectedLabels, setSelectedLabels] = useState(labels);
  const labelsCount = selectedLabels.length;

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    onSelectedChange(selectedLabels.map((label) => label._id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLabels]);

  function handleLabelUnselected(id: string) {
    setSelectedLabels(selectedLabels.filter((label) => label._id !== id));
  }

  return (
    <div>
      <span style={{ display: 'inline-block' }} className="mb-2">
        Labels:
      </span>
      {labelsCount > 0 && (
        <ul className="list-unstyled p-0 d-flex flex-wrap">
          {selectedLabels.map((label) => (
            <li key={label._id} className="me-2 mb-2">
              {!read ? (
                <LabelChip label={label} onDelete={handleLabelUnselected} />
              ) : (
                <span
                  className="badge"
                  style={{ backgroundColor: label.color }}
                >
                  {label.name}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
      {labelsCount === 0 && (
        <p className="text-secondary fst-italic">No selected labels</p>
      )}
      {!read && (
        <Button size="sm" variant="primary" onClick={() => setShowModal(true)}>
          <FontAwesomeIcon icon="list" className="me-2" />
          Select labels
        </Button>
      )}
      <SelectLabelsModal
        show={showModal}
        selectedLabels={selectedLabels}
        onSelectedChange={(labels) => setSelectedLabels(labels)}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
}
