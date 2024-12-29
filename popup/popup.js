document.getElementById('saveButton').addEventListener('click', () => {
  const data = document.getElementById('dataInput').value;
  chrome.storage.local.set({ key: data }, () => {
    console.log('Data saved:', data);
    document.getElementById('output').innerText = `Saved: ${data}`;
  });
});

document.getElementById('loadButton').addEventListener('click', () => {
  chrome.storage.local.get(['key'], (result) => {
    console.log('Data loaded:', result.key);
    document.getElementById('output').innerText = `Loaded: ${result.key || 'No data found'}`;
  });
});

document.getElementById('deleteButton').addEventListener('click', () => {
  chrome.storage.local.remove('key', () => {
    console.log('Data deleted');
    document.getElementById('output').innerText = 'Deleted!';
  });
});