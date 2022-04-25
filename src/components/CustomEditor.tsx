import Editor from '@toast-ui/editor';
import { useEffect } from 'react';

const CustomEditor = () => {
  useEffect(() => {
    new Editor({
      el: document.querySelector('#editor') as HTMLElement,
      height: '600px',
      initialEditType: 'markdown',
      previewStyle: 'vertical',
    });
  }, []);

  return <div id="editor"></div>;
};

export default CustomEditor;
