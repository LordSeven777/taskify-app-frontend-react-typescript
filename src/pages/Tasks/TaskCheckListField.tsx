import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

interface TaskCheckListFieldProps {
  read?: boolean;
  items: string[];
  onItemsChange(items: string[]): void;
}

type CheckListItemModalAction = 'add' | 'update' | null;

export default function TaskCheckListField({
  read = false,
  items,
  onItemsChange,
}: TaskCheckListFieldProps) {
  const [showModal, setShowModal] = useState(false);
  const [modalItem, setModalItem] = useState('');
  const [modalAction, setModalAction] =
    useState<CheckListItemModalAction>(null);
  const [itemToUpdate, setItemToUpdate] = useState<string | null>(null);

  const count = items.length;

  const listClassName = read ? '' : 'list-unstyled p-0';

  function handleModalOpen(action: CheckListItemModalAction, item?: string) {
    if (action === 'update' && item) setItemToUpdate(item);
    setModalAction(action);
    setModalItem(item ?? '');
    setShowModal(true);
  }

  function handleModalClose() {
    itemToUpdate && setItemToUpdate(null);
    setModalItem('');
    setShowModal(false);
  }

  function handleModalItemSave() {
    let itemsSet: Set<string>;
    if (modalAction === 'add') itemsSet = new Set([...items, modalItem]);
    else {
      const _items = [...items];
      const i = items.indexOf(itemToUpdate as string);
      _items[i] = modalItem;
      itemsSet = new Set(_items);
    }
    const updatedItems: string[] = [];
    itemsSet.forEach((item) => updatedItems.push(item));
    onItemsChange(updatedItems);
    handleModalClose();
  }

  function handleItemDelete(item: string) {
    onItemsChange(items.filter((_item) => _item !== item));
  }

  return (
    <div className="mb-3">
      <span className="mb-2" style={{ display: 'inline-block' }}>
        Check list:
      </span>
      {count > 0 && (
        <ul className={listClassName}>
          {items.map((item) => (
            <li key={item}>
              {read ? (
                item
              ) : (
                <EditableListItem className="d-flex justify-content-between align-items-center mb-2">
                  <div
                    className="flex-fill overflow-hidden"
                    style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
                  >
                    <FontAwesomeIcon icon="caret-right" className="me-2" />
                    {item}
                  </div>
                  <div className="d-flex align-items-center">
                    <Button
                      variant="secondary"
                      size="sm"
                      title="Edit"
                      className="me-2"
                      onClick={() => handleModalOpen('update', item)}
                    >
                      <FontAwesomeIcon icon="pen" />
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      title="Delete"
                      onClick={() => handleItemDelete(item)}
                    >
                      <FontAwesomeIcon icon="trash" />
                    </Button>
                  </div>
                </EditableListItem>
              )}
            </li>
          ))}
        </ul>
      )}
      {count === 0 && (
        <p className="text-secondary fst-italic">No check list items</p>
      )}
      {!read && (
        <Button
          variant="primary"
          size="sm"
          onClick={() => handleModalOpen('add')}
        >
          <FontAwesomeIcon icon="plus" className="me-2" />
          Add an item
        </Button>
      )}
      <Modal show={showModal} centered onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <FontAwesomeIcon
              icon={modalAction === 'update' ? 'pen' : 'plus'}
              className="me-3"
            />
            {modalAction === 'add' ? 'Add a' : 'Edit the'} check list item
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="checklist-item">
            <Form.Label>
              Item<span className="text-danger">*</span> :
            </Form.Label>
            <Form.Control
              value={modalItem}
              placeholder="The check list item"
              onChange={(e) => setModalItem(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex flex-row-reverse">
            <Button
              variant="primary"
              className="ms-3"
              onClick={handleModalItemSave}
            >
              Save
            </Button>
            <Button variant="outline-secondary" onClick={handleModalClose}>
              Cancel
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

/* STYLES **********************************************************/

const EditableListItem = styled.div`
  transition: 0.4s;

  &:hover {
    background-color: #f1f1f1;
  }

  &:focus-within {
    box-shadow: 0 0 0.25rem var(--bs-primary);
  }
`;
