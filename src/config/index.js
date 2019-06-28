const host = window.location.host;
let baseUrl = '';
if(/127.0.0.1/g.test(host) || /localhost/g.test(host)) {
  baseUrl = 'http://api.com';
}else{
  baseUrl = 'http://api.com';
}

export default {
  baseUrl
}