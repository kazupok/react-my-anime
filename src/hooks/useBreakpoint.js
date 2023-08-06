import { useState, useEffect } from 'react';

const useBreakpoint = () => {
  const getBreakpoint = () => {
    if (window.innerWidth <= 768) return 'xs';
    if (window.innerWidth <= 992) return 's';
    if (window.innerWidth <= 1200) return 'm';
    if (window.innerWidth <= 1400) return 'l';
    if (window.innerWidth <= 1600) return 'xl';
    if (window.innerWidth <= 1800) return 'll';
    return 'lll';
  };

  const [breakpoint, setBreakpoint] = useState(getBreakpoint());

  useEffect(() => {
    const handleResize = () => {
      setBreakpoint(getBreakpoint());
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return breakpoint;
};

export default useBreakpoint;
