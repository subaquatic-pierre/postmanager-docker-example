import axios from 'axios';

async function fetchData<T>(
  url: string,
  setData: React.Dispatch<T>,
  key: any = false,
  defaultValue: any = false,
  debug = false,
) {
  try {
    const res = await axios.get(url);
    const data = res.data;
    if (debug) console.log(data);
    if (key) {
      setData(data[key]);
    } else {
      setData(data);
    }
  } catch (e) {
    setData(defaultValue);
  }
}

export { fetchData };
