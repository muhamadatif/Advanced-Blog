export const createPostApi = async (postData) => {
  const res = await fetch("/api/post/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  return data;
};
