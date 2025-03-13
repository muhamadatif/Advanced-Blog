export const updateUserApi = async (userId, userData) => {
  try {
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
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteUserApi = async (userId) => {
  try {
    const res = await fetch(`/api/user/delete/${userId}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    } else return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getUsersApi = async ({ pageParam = 0, queryKey }) => {
  const limit = queryKey[1];
  try {
    const res = await fetch(
      `/api/user/getUsers?startIndex=${pageParam}&limit=${limit}`,
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
