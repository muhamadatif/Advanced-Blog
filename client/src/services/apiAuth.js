export const signupApi = async (userData) => {
  if (!userData.username || !userData.email || !userData.password) {
    throw new Error("Please fill out all fields.");
  }
  const res = await fetch("/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  const data = await res.json();
  if (res.ok) {
    return data;
  }
  if (!res.ok) {
    throw new Error(data.message);
  }
};
