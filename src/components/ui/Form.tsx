import { ReactNode, FormHTMLAttributes, FormEvent } from 'react';

interface IFormProps extends FormHTMLAttributes<HTMLFormElement> {
  children?: ReactNode;
}

const Form = ({ children, onSubmit, ...formAttributes }: IFormProps) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSubmit && onSubmit(e);
  };

  return (
    <form {...formAttributes} onSubmit={handleSubmit}>
      {children}
    </form>
  );
};

export default Form;
