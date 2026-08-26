const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const getEvents = async (queryString = "") => {
  const res = await fetch(`${baseUrl}/event?${queryString}`);

  return res.json();
};
