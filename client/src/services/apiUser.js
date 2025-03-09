export const updateUserApi = async (userId, userData) => {
  console.log(userData, userId);

  const res = await fetch(`/api/user/update/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  } else {
    return data;
  }
};

export const deleteUserApi = async (userId) => {
  const res = await fetch(`/api/user/delete/${userId}`, {
    method: "DELETE",
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  } else return data;
};
