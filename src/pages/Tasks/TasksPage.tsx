import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Badge from 'react-bootstrap/Badge';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import styled from 'styled-components';

// Types
import type { UserAttributes } from '@customTypes/user';
import type { PartialTaskAttributes } from '@customTypes/Task';

// Utils
import { getStrictDateISO } from '@utils/dates';
import { pluralize } from '@utils/strings';

// Store
import type { RootState } from '@/store';

// Services
import { useGetTasksQuery } from '@services/tasks';
import { useGetLabelsQuery } from '@services/labels';

// Hooks
import usePageTitle from '@hooks/usePageTitle';

// Components
import RoundRectLoader from '@components/shared/RoundRectLoader';
import DeleteTaskModal from '@components/shared/DeleteTaskModal';
import TaskListItem from './TaskListItem';

// Query params keys
const DATE_QUERY = 'date';

export default function TasksPage() {
  const { authUser } = useSelector((state: RootState) => state.auth);
  const authUserId = (authUser as UserAttributes)._id;

  // The tasks page initializes the fetch of labels
  useGetLabelsQuery(authUserId);

  const [searchParams] = useSearchParams();

  const dateParam = searchParams.get(DATE_QUERY);
  const date = useMemo<Date>(
    () => (dateParam ? new Date(dateParam) : new Date()),
    [dateParam]
  );
  const readableDate = useMemo<string>(() => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  }, [date]);
  // ISO date for the current date
  const dateISO = dateParam || getStrictDateISO(date);
  // Getting the ISO date for the previous date
  date.setDate(date.getDate() - 1);
  const previousDateISO = getStrictDateISO(date);
  // Getting the ISO date for the next date
  date.setDate(date.getDate() + 2);
  const nextDateISO = getStrictDateISO(date);
  // Resetting the date to the current date
  date.setDate(date.getDate() - 1);

  const { data: apiTasks, isFetching } = useGetTasksQuery({
    date: dateISO,
    userId: authUserId,
  });

  const tasksCount = useMemo<number>(() => {
    return apiTasks ? apiTasks.length : 0;
  }, [apiTasks]);

  // FILTER: Only show uncompleted tasks
  const [onlyUncompleted, setOnlyUncompleted] = useState(false);

  // The tasks to display depend on whether the only uncompleted filter is applied
  const tasks = useMemo<PartialTaskAttributes[] | undefined>(() => {
    if (apiTasks) {
      return onlyUncompleted
        ? apiTasks.filter((task) => !task.isCompleted)
        : apiTasks;
    }
  }, [apiTasks, onlyUncompleted]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] =
    useState<PartialTaskAttributes | null>(null);

  usePageTitle('Tasks');

  function handleTaskDelete(task: PartialTaskAttributes) {
    setTaskToDelete(task);
    setShowDeleteModal(true);
  }

  function handleDeleteModalClose() {
    setShowDeleteModal(false);
    setTaskToDelete(null);
  }

  return (
    <PageWrapper>
      <div className="d-flex justify-content-between align-items-start mb-3">
        <h1>
          <FontAwesomeIcon icon="tasks" className="me-3" />
          Tasks
        </h1>
        <Link to="new-task" className="text-center btn btn-primary">
          <FontAwesomeIcon icon="plus" className="me-2" />
          New task
        </Link>
      </div>
      <div className="mb-5">
        <Link to="labels" className="hoverable-link">
          <FontAwesomeIcon icon="tags" className="me-2" />
          View labels
        </Link>
      </div>
      <nav className="d-flex justify-content-between align-items-start">
        <Link
          to={`?${DATE_QUERY}=${previousDateISO}`}
          className="btn btn-outline-primary"
        >
          <FontAwesomeIcon icon="angle-left" className="me-2" />
          Previous day
        </Link>
        <p className="text-center px-2">
          <strong>{readableDate}</strong>
        </p>
        <Link
          to={`?${DATE_QUERY}=${nextDateISO}`}
          className="btn btn-outline-primary"
        >
          Next day
          <FontAwesomeIcon icon="angle-right" className="ms-2" />
        </Link>
      </nav>
      <hr />
      <p className="text-center mb-4">
        {isFetching && (
          <RoundRectLoader
            rectWidth={100}
            rectHeight={24}
            width="6.25rem"
            height="1.5rem"
          />
        )}
        {!isFetching && (
          <>
            {tasksCount === 0 ? (
              <em className="text-secondary font-italic">No tasks</em>
            ) : (
              <>
                <Badge bg="primary" className="me-2">
                  {tasksCount}
                </Badge>
                {pluralize('task', tasksCount)}
              </>
            )}
          </>
        )}
      </p>
      <div className="mb-3">
        <Form.Check
          type="checkbox"
          checked={onlyUncompleted}
          label="Only show uncompleted tasks"
          id="only-show-uncompleted-checkbox"
          onChange={() => setOnlyUncompleted(!onlyUncompleted)}
        />
      </div>
      <Table id="tasks-list" responsive striped bordered hover>
        <thead className="table-dark text-center">
          <tr>
            <th>Name</th>
            <th>Start time</th>
            <th>Finish time</th>
            <th>Is completed</th>
            <th>Labels</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {isFetching && (
            <tr>
              <td colSpan={6} className="text-center">
                <RoundRectLoader
                  rectWidth={200}
                  rectHeight={24}
                  width="12.5rem"
                  height="1.5rem"
                  backgroundColor="#bbb"
                />
              </td>
            </tr>
          )}
          {!isFetching && tasks && (
            <>
              {tasksCount > 0 ? (
                tasks.map((task) => (
                  <TaskListItem
                    key={task._id}
                    task={task}
                    onDelete={(task) => handleTaskDelete(task)}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center">
                    <em className="text-secondary font-italic">No tasks</em>
                  </td>
                </tr>
              )}
            </>
          )}
        </tbody>
      </Table>
      <DeleteTaskModal
        show={showDeleteModal}
        task={taskToDelete}
        onClose={handleDeleteModalClose}
      />
    </PageWrapper>
  );
}

/* STYLES **********************************************************/

const PageWrapper = styled.div`
  table#tasks-list {
    th {
      vertical-align: middle;
    }
  }
`;
