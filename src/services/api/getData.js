export const getDataAPI = () => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', 'http://192.168.235.188:9081/prototype/docList?clientName=CLIENT1&Q=4&year=2017');

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



