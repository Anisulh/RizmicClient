const baseURL = `${import.meta.env.VITE_BASE_URL}/generation/`;

export const generateBlank = async (
  body: { style: string },
  token: string | undefined,
) => {
  try {
    if (!token) return;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    };

    const response = await fetch(baseURL, options);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};
