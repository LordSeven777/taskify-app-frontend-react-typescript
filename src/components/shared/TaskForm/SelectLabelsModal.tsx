import { useState, useEffect, useMemo, useTransition } from 'react';
import { useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Types
import type { LabelAttributes, LabelCheckOption } from '@customTypes/Label';
import type { UserAttributes } from '@customTypes/user';

// Store
import type { RootState } from '@/store';

// Services
import { useGetLabelsQuery } from '@services/labels';

// Components
import SelectLabelsModalListCheck from './SelectLabelsModalListCheck';

interface SelectLabelsModalProps {
  show?: boolean;
  selectedLabels: LabelAttributes[];
  onSelectedChange(labels: LabelAttributes[]): void;
  onClose(): void;
}

function getLabelsChecksFromSelectedLabels(
  labels: LabelAttributes[],
  selectedLabelsMap: Map<string, LabelAttributes>
): LabelCheckOption[] {
  const labelsChecks = labels.map<LabelCheckOption>((label) => ({
    checked: selectedLabelsMap.has(label._id),
    label,
  }));
  labelsChecks.sort(
    (check, prevCheck) => -(Number(check.checked) - Number(prevCheck.checked))
  );
  return labelsChecks;
}

export default function SelectLabelsModal({
  show = false,
  selectedLabels,
  onClose,
  onSelectedChange,
}: SelectLabelsModalProps) {
  const { authUser } = useSelector((state: RootState) => state.auth);

  const {
    data: labels,
    isSuccess,
    isLoading,
  } = useGetLabelsQuery((authUser as UserAttributes)._id);

  const selectedLabelsMap = useMemo(() => {
    const map = new Map<string, LabelAttributes>();
    for (const label of selectedLabels) {
      map.set(label._id, label);
    }
    return map;
  }, [selectedLabels]);

  const [search, setSearch] = useState('');

  const [labelsChecks, setLabelsChecks] = useState<LabelCheckOption[]>([]);
  const labelsChecksCount = labelsChecks.length;

  const [, startDisplayLabelsCheckTransition] = useTransition();

  const [displayableLabelsChecks, setDisplayableLabelsChecks] = useState<
    LabelCheckOption[]
  >([]);

  // Syncs the selected labels map with the selected labels
  useEffect(() => {
    if (labels) {
      setLabelsChecks(
        getLabelsChecksFromSelectedLabels(labels, selectedLabelsMap)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [labels, selectedLabelsMap]);

  useEffect(() => {
    startDisplayLabelsCheckTransition(() => {
      if (labels) {
        setDisplayableLabelsChecks(
          search
            ? labelsChecks.filter((labelCheck) =>
                new RegExp(search, 'i').test(labelCheck.label.name)
              )
            : labelsChecks
        );
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, labelsChecks]);

  function handleLabelCheckChange(label: LabelAttributes, checked: boolean) {
    // Updating the labels checks
    const _labelsChecks = [...labelsChecks];
    const i = _labelsChecks.findIndex(
      (labelCheck) => label._id === labelCheck.label._id
    );
    _labelsChecks[i] = { checked, label };
    setLabelsChecks(_labelsChecks);
  }

  function handleSelectedSave() {
    onSelectedChange(
      labelsChecks
        .filter((labelCheck) => labelCheck.checked)
        .map((labelCheck) => labelCheck.label)
    );
    onClose();
  }

  function handleClose() {
    if (labels) {
      setLabelsChecks(
        getLabelsChecksFromSelectedLabels(labels, selectedLabelsMap)
      );
    }
    onClose();
  }

  return (
    <Modal show={show} centered scrollable onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <FontAwesomeIcon icon="list" className="me-3" />
          Select labels
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup className="mb-3">
          <span className="input-group-text">
            <FontAwesomeIcon icon="search" />
          </span>
          <Form.Control
            type="search"
            value={search}
            placeholder="Search a label"
            onChange={(e) => setSearch(e.target.value)}
          />
        </InputGroup>
        {isLoading && (
          <div className="text-center">
            <Spinner variant="primary" animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        )}
        {!isLoading && isSuccess && (
          <>
            {labelsChecksCount > 0 && (
              <ul className="list-unstyled m-0 p-0">
                {displayableLabelsChecks.map((labelCheck) => (
                  <li key={labelCheck.label._id} className="mb-2">
                    <SelectLabelsModalListCheck
                      option={labelCheck}
                      onCheckChange={handleLabelCheckChange}
                    />
                  </li>
                ))}
              </ul>
            )}
            {labelsChecksCount === 0 && (
              <p className="fst-italic text-secondary">No labels</p>
            )}
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <div className="d-flex flex-row-reverse">
          <Button variant="primary" onClick={handleSelectedSave}>
            Save
          </Button>
          <Button
            variant="outline-secondary"
            className="me-3"
            onClick={handleClose}
          >
            Cancel
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
