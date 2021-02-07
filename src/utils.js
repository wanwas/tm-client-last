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

function getMessage(e) {
  console.log(e);
  const messages = {
    "auth/user-not-found": "Пользователь с таким email не найден",
    "auth/wrong-password": "Email или Пароль не верные",
    "auth/email-already-in-use": "Введеный Вами email уже зарегестрирован",
  };
  return messages[e] || "Ошибка, что-то пошло не так";
}

export { postRequestToApi, getMessage };
