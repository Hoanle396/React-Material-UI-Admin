import React from 'react';
import type {
  FieldValues,
  SubmitHandler,
  UseFormReturn,
} from 'react-hook-form';
import { FormProvider } from 'react-hook-form';

interface Props<T extends FieldValues> {
  methods: UseFormReturn<T, any>;
  onSubmit: SubmitHandler<T>;
  children?: React.ReactNode;
  formId?: string;
  className?: string;
}

const FormWrapper = <TFormValue extends FieldValues>({
  methods,
  onSubmit,
  children,
  formId = 'form-submit-wrapper',
  className,
}: Props<TFormValue>) => {
  return (
    <FormProvider {...methods}>
      <form
        className={className}
        id={formId}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        {children}
      </form>
    </FormProvider>
  );
};

export default FormWrapper;
