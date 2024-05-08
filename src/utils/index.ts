export function base64ToBlob(base64, filename) {
  const parts = base64.split(',');
  const mime = parts[0].match(/:(.*?);/)[1];
  const byteCharacters = atob(parts[1]);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, {type: mime});
  const file= new File([blob], filename, {type: mime});
  return file;
}


export function parseUrl(url){
  const args = url.substr(url.indexOf('?')+1)
  const argsArr = args.split('&')
  const obj = {}
  argsArr.map(item=>{
    const [key,value] = item.split('=')
    obj[key] = value
  })
  return obj
}
