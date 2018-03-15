import fetch from 'isomorphic-fetch';
export let postFetch = async (url, body) => {
    try {
        let response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(body)
        });
        let json = await response.json();
        return json;
    }
    catch (err) {
        console.log(err)
    }
};

let format = (body) => {
    var str = "";
    let name;
    for (name in body) {
      str += name +'='+ body[name]+'&';
    }
    str = str.substr(0,str.length-1);
    return str;
  };