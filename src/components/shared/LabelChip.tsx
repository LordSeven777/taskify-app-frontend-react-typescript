import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

// Types
import type { LabelAttributes } from '@customTypes/Label';

interface LabelChipProps extends React.HTMLAttributes<HTMLDivElement> {
  label: LabelAttributes;
  disabled?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function LabelChip({
  label,
  onEdit,
  onDelete,
  className,
  disabled = false,
  ...props
}: LabelChipProps) {
  let _className = 'd-flex align-items-center';
  if (className) _className += ` ${className}`;

  return (
    <div className={_className} {...props}>
      <ChipButton
        className="btn"
        style={{ backgroundColor: label.color, color: '#fff' }}
        onClick={() => onEdit && onEdit(label._id)}
      >
        {label.name}
      </ChipButton>
      <ChipDelete
        className="btn btn-sm text-danger ms-1"
        title="Delete"
        disabled={disabled}
        onClick={() => onDelete && onDelete(label._id)}
      >
        <FontAwesomeIcon icon="times" />
      </ChipDelete>
    </div>
  );
}

/* STYLES **********************************************************/

const ChipButton = styled.button`
  transition: opacity 0.4s;

  &:hover {
    opacity: 0.7;
  }

  &:focus-visible {
    outline: #000 solid 2px;
  }
`;

const ChipDelete = styled.button`
  transition: opacity 0.4s;

  &:focus-visible {
    outline: #000 solid 2px;
  }
`;
