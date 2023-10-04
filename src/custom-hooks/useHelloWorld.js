import { useState } from 'react';

const useHelloWorld = () => {
  const [value, setValue] = useState('HelloWorld');

  return { value, setValue };
};

export default useHelloWorld;
