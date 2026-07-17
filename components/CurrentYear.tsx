'use client';

import { useEffect, useState } from 'react';

type CurrentYearProps = {
  initialYear: number;
};

export function CurrentYear({ initialYear }: CurrentYearProps) {
  const [year, setYear] = useState(initialYear);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return year;
}
