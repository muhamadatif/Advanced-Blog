export const signupApi = async (signupData) => {
  if (!signupData.username || !signupData.email || !signupData.password) {
    throw new Error("Please fill out all fields.");
  }
  const res = await fetch("/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(signupData),
  });
  const data = await res.json();
  if (res.ok) {
    return data;
  }
  if (!res.ok) {
    throw new Error(data.message);
  }
};

export const signinApi = async (signinData) => {
  if (!signinData.email || !signinData.password) {
    throw new Error("Please fill out all fields.");
  }
  const res = await fetch("/api/auth/signin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(signinData),
  });
  const data = await res.json();
  if (res.ok) {
    return data;
  }
  if (!res.ok) {
    console.log(data);

    throw new Error(data.message);
  }
};
