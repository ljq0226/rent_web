interface Options {
  headers?: { [key: string]: string };
  body?: any;
}
interface Response<T> {
  code: number;
  data: T;
  msg: string;
}
// const host = process.env.NEXT_PUBLIC_NODE_ENV === 'dev' ? 'http://localhost:8080/' : `${process.env.NEXT_PUBLIC_HOST}`
const host = 'http://localhost:8080/';
async function get<T>(
  url: string,
  options: Options = {}
): Promise<Response<T>> {
  const token = localStorage.getItem('token');
  const response = await fetch(`${host}${url}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
      ...options.headers,
    },
    method: 'GET',
  });

  if (!response.ok) throw new Error(response.statusText);

  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  } else {
    return {
      code: response.status,
      data: response.text(),
      msg: response.statusText,
    } as Response<T>;
  }
}

async function post<T>(
  url: string,
  data: any,
  options: Options = {}
): Promise<Response<T>> {
  const response = await fetch(`${host}${url}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    method: 'POST',
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const text = await response.text();
    const { msg } = JSON.parse(text);
    throw new Error(response.statusText + ' ' + msg);
  }

  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  } else {
    return {
      code: response.status,
      data: response.text(),
      msg: response.statusText,
    } as Response<T>;
  }
}

async function uploadFile<T>(
  url: string,
  file: File,
  options: Options = {}
): Promise<Response<T>> {
  const token = localStorage.getItem('token');
  const formData = new FormData();
  formData.append('file', file, encodeURI(file.name));

  const response = await fetch(`${host}${url}`, {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      ...options.headers,
    },
    method: 'POST',
    body: formData,
  });

  if (!response.ok) throw new Error(response.statusText);

  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  } else {
    return {
      code: response.status,
      data: response.text(),
      msg: response.statusText,
    } as Response<T>;
  }
}

export { get, post, uploadFile };
