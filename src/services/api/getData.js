export const getDataAPI = () => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', './data.json');

    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(xhr.responseText);
      } else {
        reject(Error(xhr.statusText));
      }
    };

    xhr.onerror = () => {
      reject(Error('Network error'));
    };

    xhr.send();
  });
};

export const getDataUsers = () => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open('GET', './userdata.json');

        xhr.onload = () => {
            if (xhr.status === 200) {
                resolve(xhr.responseText);
            } else {
                reject(Error(xhr.statusText));
            }
        };

        xhr.onerror = () => {
            reject(Error('Network error'));
        };

        xhr.send();
    });
};

