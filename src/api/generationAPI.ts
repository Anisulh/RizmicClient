const baseURL = `${import.meta.env.VITE_BASE_URL}/generation/`;

export const generateBlank = async (body: { style: string }) => {
  try {
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(body),
    };

    const response = await fetch(baseURL, options);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};
