import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect } from 'react';
import { useEditorKeys } from './useEditorKeys.tsx';
import './useDragListeners.css';

export const useDragListeners = () => {
   const [editor] = useLexicalComposerContext();
   
   // Get editor node keys (code is below)
   const { keys } = useEditorKeys();

   useEffect(() => {
      const addListeners = () => {
         keys.forEach((key) => {
            
            // Get HTML element by node "key"
            const htmlElement = editor.getElementByKey(key);

            if (!htmlElement) {
               console.warn('[useDragListeners] No html element');
               return;
            }

            // TODO: JUST FOR VISUALIZATION! You can remove it!
            htmlElement.classList.add('draggable-block');

            // event listeners will be added later ...
         });
      };

      addListeners();
   }, [editor, keys]);
};