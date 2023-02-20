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

interface TaskListItemProps {
  task: PartialTaskAttributes;
}

export default function TaskListItem({ task }: TaskListItemProps) {
  const startDate = useMemo(() => new Date(task.startsAt), [task.startsAt]);
  const finishDate = useMemo(() => new Date(task.endsAt), [task.endsAt]);

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
          title={task.isCompleted ? 'Completed' : 'Uncompleted'}
          onChange={() => {}}
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
          <Button variant="danger" title="Delete">
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
