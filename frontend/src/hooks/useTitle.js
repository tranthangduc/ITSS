import { useEffect } from 'react';

// set title for component
function useTitle(title = 'ENG_ITSS', isOverride = false) {
  useEffect(() => {
    if (isOverride) {
      document.title = title;
    } else {
      document.title = title !== 'ENG_ITSS' ? `${title} - ENG_ITSS` : title;
    }
  }, []);

  return null;
}

export default useTitle;
