export const singleBookLoader = async ({ params }) => {
  const apiUrl = `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/book/${
    params.id
  }`;
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch book details: ${response.statusText}`);
    }

    const book = await response.json();
    console.log("Fetched book:", book); // This will show the book data in the console
    return { book }; // Return the book as an object to be accessed by useLoaderData
  } catch (error) {
    console.error("Error in singleBookLoader:", error);
    throw error;
  }
};
