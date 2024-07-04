export const handleFormattedDate = () => {
  const currentDate = new Date();
  const formattedDate = currentDate
    .toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    })
    .replace(/[\s,]/g, "-")
    .replace(/-+/g, "-");
  return formattedDate;
};
