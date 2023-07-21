const fetchFile = async (url) => {
  try {
      const response = await fetch(url);

      // Check if the request was successful
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      // If you're fetching a JSON file, you can convert the response to JSON like so
      const data = await response.json();

      return data;
  } catch (error) {
      console.error("There has been a problem with your fetch operation:", error);
  }
};

export default fetchFile;