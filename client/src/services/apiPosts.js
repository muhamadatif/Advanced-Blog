export const createPostApi = async (postData) => {
  try {
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
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updatePostApi = async (postId, userId, updateData) => {
  try {
    const res = await fetch(`/api/post/updatePost/${postId}/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    });

    const data = await res.json();

    if (!res.ok) return data.message;
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getPostsApi = async ({ pageParam = 0, queryKey }) => {
  const limit = queryKey[1];

  try {
    const res = await fetch(
      `/api/post/getposts?startIndex=${pageParam}&limit=${limit}`,
    );
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getPostApi = async (postSlug) => {
  try {
    const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
    const data = await res.json();

    if (!res.ok) throw new Error(data.message);
    return data.posts[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deletePostApi = async (postIdToDelete, userId) => {
  try {
    const res = await fetch(
      `/api/post/deletePost/${postIdToDelete}/${userId}`,
      {
        method: "DELETE",
      },
    );
    const data = await res.json();
    if (!res.ok) throw new Error("There was an error deleting the user");

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
