import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Utils
import { getStrictDateISO } from '@utils/dates';

// Query params keys
const DATE_QUERY = 'date';

export default function TasksPage() {
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
  /* const dateISO = getStrictDateISO(date); */
  // Getting the ISO date for the previous date
  date.setDate(date.getDate() - 1);
  const previousDateISO = getStrictDateISO(date);
  // Getting the ISO date for the next date
  date.setDate(date.getDate() + 2);
  const nextDateISO = getStrictDateISO(date);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-start mb-3">
        <h1>Tasks</h1>
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
    </div>
  );
}
