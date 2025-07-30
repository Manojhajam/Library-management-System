export const makeApiRequest = async ({ endpoint, method = "GET", body }) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:5000/api${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: body ? JSON.stringify(body) : undefined
    });

    const responseData = await response.json();

    return { response: responseData };
  } catch (error) {
    console.log(error);
    return { error };
  }
};
