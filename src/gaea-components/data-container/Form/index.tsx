import React from 'react';
import { createForm } from 'rc-form';
import Form from '@/components/Form';
import { FormConsumer } from './FormContext';
import { Props, State } from './type';

function FormComponent({
  form,
  header,
  buttonText,
  setFormItems,
  onSubmit,
}: any) {
  return (
    <Form
      form={form}
      header={header}
      items={setFormItems(form)}
      buttonText={buttonText}
      onSubmit={onSubmit}
    />
  );
}

const WrappedForm = createForm()(FormComponent);

export default class extends React.Component<Props, State> {
  public static defaultProps = new Props();
  public state = new State();

  public render() {
    return (
      <FormConsumer>
        {form => {
          if (form) {
            return <FormComponent form={form} {...this.props} />
          } else {
            return <WrappedForm {...this.props} />
          }
        }}
      </FormConsumer>
    )
  }
}
