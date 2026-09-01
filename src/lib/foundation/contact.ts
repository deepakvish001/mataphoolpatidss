export const contactMessageIsValid = (value: string, minimum = 10, maximum = 2_000) => {
  const message = value.trim();
  return message.length >= minimum && message.length <= maximum;
};
