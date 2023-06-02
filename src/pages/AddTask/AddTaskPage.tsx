import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Types
import type { TaskAttributes } from '@customTypes/Task';

// Utils
import { getStrictDateISO } from '@utils/dates';

// Components
import SubsectionNav from '@components/shared/SubsectionNav';
import TaskForm from '../../components/shared/TaskForm/TaskForm';

export default function AddTaskPage() {
  const navigate = useNavigate();

  function handleTaskAdded(task: TaskAttributes) {
    navigate(`/tasks?date=${getStrictDateISO(new Date(task.startsAt))}`);
  }

  return (
    <div>
      <SubsectionNav
        baseRoute="/tasks"
        baseTitle="Tasks"
        title="Add a new task"
      />
      <h1 className="fs-2 mt-4 mb-5">
        <FontAwesomeIcon icon="plus" className="me-3" />
        Add a new task
      </h1>
      <TaskForm onSubmitted={handleTaskAdded} />
    </div>
  );
}
