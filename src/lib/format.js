import parse from 'date-fns/parse';
import format from 'date-fns/format';

export const formatDate = (dateString, formatString) => {
  const date = parse(dateString);
  return format(date, formatString);
};
