async function postRequestToApi(
  url,
  data,
  headers = { "Content-Type": "application/json" }
) {
  return new Promise((resolve, reject) => {
    const requestOptions = {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    };

    fetch(url, requestOptions)
      .then(async (response) => {
        const data = await response.json();

        if (!response.ok) {
          const error = (data && data.message) || response.status;
          reject(error);
        }

        resolve(data);
      })
      .catch((error) => {
        reject(error.message);
      });
  });
}

export { postRequestToApi };
