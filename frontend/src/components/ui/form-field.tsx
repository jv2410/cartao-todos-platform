import React from 'react';
import Input, { InputProps } from './input';
import Label from './label';
import clsx from 'clsx';

/**
 * FormField Component
 * Combines Label, Input, and Error message into a single component
 * Follows Atomic Design principles (Molecule)
 */

export interface FormFieldProps extends InputProps {
  label: string;
  errorMessage?: string;
  required?: boolean;
  helperText?: string;
}

const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
  (
    {
      label,
      errorMessage,
      required = false,
      helperText,
      id,
      className,
      ...inputProps
    },
    ref
  ) => {
    const inputId = id || `field-${label.toLowerCase().replace(/\s+/g, '-')}`;
    const hasError = !!errorMessage;

    return (
      <div className={clsx('mb-4', className)}>
        <Label htmlFor={inputId} required={required}>
          {label}
        </Label>

        <Input
          ref={ref}
          id={inputId}
          error={hasError}
          aria-invalid={hasError}
          aria-describedby={
            hasError
              ? `${inputId}-error`
              : helperText
              ? `${inputId}-helper`
              : undefined
          }
          {...inputProps}
        />

        {helperText && !hasError && (
          <p
            id={`${inputId}-helper`}
            className="mt-1 text-sm text-secondary-500"
          >
            {helperText}
          </p>
        )}

        {hasError && (
          <p
            id={`${inputId}-error`}
            className="mt-1 text-sm text-red-600"
            role="alert"
          >
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

FormField.displayName = 'FormField';

export default FormField;
