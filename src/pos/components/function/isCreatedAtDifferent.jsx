export const isCreatedAtDifferent = (data) => {
  if (data !== undefined) {
    const currentTime = new Date();
    const entriesWithinSeconds = [];

    for (const item of data) {
      const createdAtTime = new Date(item.created_at);
      const timeDifferenceInSeconds = Math.abs(
        (currentTime - createdAtTime) / 1000
      );

      if (timeDifferenceInSeconds <= 3) {
        // entriesWithinSeconds.push({ id: item.id, name: item.name });
        entriesWithinSeconds.push(item);
      }
    }

    return entriesWithinSeconds;
  }
};
