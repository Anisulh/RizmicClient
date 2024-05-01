function deepEqual(a: any, b: any): boolean {
  if (a === b) {
    return true;
  }

  if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) {
    return false;
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i])) return false;
    }
    return true;
  }

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (const key of keysA) {
    if (!keysB.includes(key) || !deepEqual(a[key], b[key])) {
      return false;
    }
  }

  return true;
}


export const filterData = <T extends object, U extends object>(originalData: T, newData: U): Partial<U> => {
  const changes: Partial<U> = {};

  // Iterate over keys in newData since we're considering these for potential updates
  Object.keys(newData).forEach(key => {
    if (key in originalData) {
      const originalValue = (originalData as any)[key];
      const newValue = (newData as any)[key];

      // Use the deepEqual function to check if values are different
      if (!deepEqual(originalValue, newValue)) {
        changes[key as keyof U] = newValue;
      }
    }
  });

  return changes;
};
