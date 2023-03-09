export const getRootUrl = () => {
  return process.env.REACT_APP_API_URL;
};

// format date into  Wed Mar 08 2023 this format
export const formatDate = (date) => {
  const newDate = new Date(date);
  const options = { weekday: 'short', month: 'short', day: 'numeric' };
  const formattedDate = newDate.toLocaleDateString('en-US', options);
  return formattedDate;
};
