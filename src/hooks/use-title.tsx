import { TitleContext } from '@/contexts/title-context';
import { useContext, useEffect } from 'react';

const useTitle = (text: string) => {
  const { title, setTitle } = useContext(TitleContext);

  useEffect(() => {
    setTitle(text)
    document.title = text
  }, [text, setTitle]);

  return title;
};

export default useTitle;