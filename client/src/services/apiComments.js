export const getCommentsApi = async ({ pageParam = 0, queryKey }) => {
  const limit = queryKey[1];
  console.log(queryKey[1]);

  try {
    const res = await fetch(
      `/api/comment/getComments?startIndex=${pageParam}&limit=${limit}`,
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

export const deleteCommentApi = async (commentId) => {
  try {
    console.log(commentId);

    const res = await fetch(`/api/comment/deleteComment/${commentId}`, {
      method: "DELETE",
    });
    const data = await res.json();

    if (!res.ok) throw new Error("There was an error deleting the comment");
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
