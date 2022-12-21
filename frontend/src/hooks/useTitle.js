import { useEffect } from 'react';

// set title for component
function useTitle(title = 'Minna no Eigo', isOverride = false) {
  useEffect(() => {
    if (isOverride) {
      document.title = title;
    } else {
      document.title = title !== 'Minna no Eigo' ? `${title} - Minna no Eigo` : title;
    }
  }, []);

  return null;
}

export default useTitle;
