import { FC, SyntheticEvent } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { loginUser } from '../../services/user/actions';
import { useForm } from '../../hooks/useForm';

export const Login: FC = () => {
  const { values, handleChange } = useForm({
    email: '',
    password: ''
  });

  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.user);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUser(values));
  };

  return (
    <LoginUI
      errorText={error || ''}
      email={values.email}
      setEmail={(email) =>
        handleChange({ target: { name: 'email', value: email } } as any)
      }
      password={values.password}
      setPassword={(password) =>
        handleChange({ target: { name: 'password', value: password } } as any)
      }
      handleSubmit={handleSubmit}
    />
  );
};
