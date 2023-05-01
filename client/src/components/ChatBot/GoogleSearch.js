import axios from 'axios';

const searchData = async (term) => {
  // var res = ""
  // await axios.get(`https://api.monkedev.com/fun/chat?msg=${term}`, {
	// 	method: 'HEAD',
	// 	mode: 'no-cors',
	// }).then(data => {
  //   res = JSON.stringify(data.data.response)
  // })
  const { data } = await axios.get(
    'https://www.googleapis.com/customsearch/v1',
    {
      params: {
        key: 'AIzaSyAznyllgswv4W74jbfS0Wmod_Cr9QS0EHI',
        cx: 'c17a7505231c54984',
        q: term,
      },
    }
  );

  return data;
}

export default searchData