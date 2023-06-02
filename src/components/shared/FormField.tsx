import { useId } from 'react';
import Form from 'react-bootstrap/Form';
import { type FormControlProps } from 'react-bootstrap/FormControl';

type FormFieldProps = {
  label: string;
  name: string;
  required?: boolean;
  errorMessage?: string;
  isTouched: boolean;
  rows?: number;
} & FormControlProps;

export default function FormField(props: FormFieldProps) {
  const {
    required = false,
    type = 'text',
    as = 'input',
    label,
    placeholder,
    value,
    name,
    errorMessage,
    isTouched,
    disabled,
    rows,
    onChange,
    onBlur,
  } = props;

  const id = useId();

  const isInvalid = errorMessage !== undefined && isTouched;

  return (
    <Form.Group controlId={id} className="mb-3">
      <Form.Label>
        {label}
        {required && <span className="text-danger">*</span>} :
      </Form.Label>
      <Form.Control
        as={as}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        isInvalid={isInvalid}
        disabled={!!disabled}
        rows={rows}
        onChange={onChange}
        onBlur={onBlur}
      />
      {isInvalid && (
        <Form.Control.Feedback type="invalid">
          {errorMessage}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
}
