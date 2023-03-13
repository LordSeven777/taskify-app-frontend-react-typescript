import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Switch from 'react-bootstrap/Switch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

// Types
import type { PartialTaskAttributes } from '@customTypes/Task';

// Utils
import { getStrictDateISO, getHourAndMinutes } from '@utils/dates';

// Services
import { useUpdateTaskCompletionMutation } from '@services/tasks';

interface TaskListItemProps {
  task: PartialTaskAttributes;
  onDelete?: (task: PartialTaskAttributes) => void;
}

export default function TaskListItem({ task, onDelete }: TaskListItemProps) {
  const [updateTaskCompletion, { isLoading: isUpdatingTaskCompletion }] =
    useUpdateTaskCompletionMutation();

  const startDate = useMemo(() => new Date(task.startsAt), [task.startsAt]);
  const finishDate = useMemo(() => new Date(task.endsAt), [task.endsAt]);

  function handleTaskCompletionToggle() {
    updateTaskCompletion({
      id: task._id,
      isCompleted: !task.isCompleted,
    });
  }

  return (
    <Row>
      <td className="task-list-name">{task.name}</td>
      <td className="text-center">
        <small className="font-bold">
          <FontAwesomeIcon icon="calendar" className="me-2" />
          {getStrictDateISO(startDate)}
        </small>
        <br />
        <strong>
          <FontAwesomeIcon icon="clock" className="me-2" />
          {getHourAndMinutes(startDate)}
        </strong>
      </td>
      <td className="text-center">
        <small className="font-bold">
          <FontAwesomeIcon icon="calendar" className="me-2" />
          {getStrictDateISO(finishDate)}
        </small>
        <br />
        <strong>
          <FontAwesomeIcon icon="clock" className="me-2" />
          {getHourAndMinutes(finishDate)}
        </strong>
      </td>
      <td className="text-center">
        <Switch
          checked={task.isCompleted}
          disabled={isUpdatingTaskCompletion}
          title={task.isCompleted ? 'Completed' : 'Uncompleted'}
          onChange={handleTaskCompletionToggle}
        />
      </td>
      <td>
        {task.labels.map((label) => (
          <span
            key={label._id}
            className="me-2 badge"
            style={{ backgroundColor: label.color }}
          >
            {label.name}
          </span>
        ))}
        {task.labels.length === 0 && (
          <p className="text-secondary fst-italic text-center">No labels</p>
        )}
      </td>
      <td>
        <div className="d-flex justify-content-center align-items-start">
          <Link
            to={task._id}
            title="View"
            className="mb-2 me-2 btn btn-primary"
          >
            <FontAwesomeIcon icon="eye" />
          </Link>
          <Link
            to={`${task._id}?edit`}
            title="Edit"
            className="mb-2 me-2 btn btn-secondary"
          >
            <FontAwesomeIcon icon="pen" />
          </Link>
          <Button
            variant="danger"
            title="Delete"
            onClick={() => onDelete && onDelete(task)}
          >
            <FontAwesomeIcon icon="trash" />
          </Button>
        </div>
      </td>
    </Row>
  );
}

/* STYLED **********************************************************/

const Row = styled.tr`
  td.task-list-name {
    max-width: 20.9375rem;
  }
`;
