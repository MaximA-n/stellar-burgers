import { useState, ChangeEvent } from 'react';

interface UseFormReturn<T> {
  values: T;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  setValues: (values: T) => void;
}

export function useForm<T>(inputValues: T): UseFormReturn<T> {
  const [values, setValues] = useState<T>(inputValues);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return { values, handleChange, setValues };
}
