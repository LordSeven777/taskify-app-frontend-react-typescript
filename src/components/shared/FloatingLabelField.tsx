import { useId, ChangeEventHandler, FocusEventHandler } from 'react';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

type FormControlElement = HTMLInputElement | HTMLTextAreaElement;

interface Props {
  type?: 'text' | 'email' | 'password';
  label: string;
  placeholder: string;
  value: string;
  name: string;
  errorMessage?: string;
  isTouched: boolean;
  disabled?: boolean;
  onChange: ChangeEventHandler<FormControlElement>;
  onBlur: FocusEventHandler<FormControlElement>;
}

export default function FloatingLabelField(props: Props) {
  const {
    type = 'text',
    label,
    placeholder,
    value,
    name,
    errorMessage,
    isTouched,
    disabled,
    onChange,
    onBlur,
  } = props;

  const id = useId();

  const isInvalid = !!errorMessage && isTouched;

  return (
    <FloatingLabel controlId={id} label={label} className="mb-3">
      <Form.Control
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        isInvalid={isInvalid}
        disabled={!!disabled}
        onChange={onChange}
        onBlur={onBlur}
      />
      {isInvalid && (
        <Form.Control.Feedback type="invalid">
          {errorMessage}
        </Form.Control.Feedback>
      )}
    </FloatingLabel>
  );
}
