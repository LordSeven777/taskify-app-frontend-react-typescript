import React from 'react';
import Form from 'react-bootstrap/Form';
import styled from 'styled-components';

// Types
import type { LabelCheckOption, LabelAttributes } from '@customTypes/Label';

interface SelectLabelsModalListCheckProps {
  option: LabelCheckOption;
  onCheckChange(label: LabelAttributes, chekcked: boolean): void;
}

export default function SelectLabelsModalListCheck({
  option,
  onCheckChange,
}: SelectLabelsModalListCheckProps) {
  function handleCheckChange() {
    onCheckChange(option.label, !option.checked);
  }

  return (
    <Wrapper
      className="d-flex justify-content-between align-items-center"
      onClick={handleCheckChange}
    >
      <Form.Check
        checked={option.checked}
        label={option.label.name}
        onChange={handleCheckChange}
      />
      <span
        style={{
          display: 'inline-block',
          backgroundColor: option.label.color,
          height: '0.5rem',
          width: '1rem',
          marginRight: '0.5rem',
        }}
      ></span>
    </Wrapper>
  );
}

/* STYLES **********************************************************/

const Wrapper = styled.div`
  transition: 0.3s;
  background-color: #fff;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }

  &:focus-within {
    box-shadow: 0 0 0.25rem var(--bs-primary);
  }
`;
