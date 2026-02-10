import { FC, SyntheticEvent } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { registerUser } from '../../services/user/actions';
import { useForm } from '../../hooks/useForm';

export const Register: FC = () => {
  const { values, handleChange } = useForm({
    name: '',
    email: '',
    password: ''
  });

  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.user);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(registerUser(values));
  };

  return (
    <RegisterUI
      errorText={error || ''}
      email={values.email}
      userName={values.name}
      password={values.password}
      setEmail={(email) =>
        handleChange({ target: { name: 'email', value: email } } as any)
      }
      setPassword={(password) =>
        handleChange({ target: { name: 'password', value: password } } as any)
      }
      setUserName={(name) =>
        handleChange({ target: { name: 'name', value: name } } as any)
      }
      handleSubmit={handleSubmit}
    />
  );
};
