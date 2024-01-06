import { HttpHeaders } from '@angular/common/http';

// check browser or node server

// if (typeof module === "object" && typeof module.exports === "object") {
//   // node
// }

// if (typeof window !== "undefined" && typeof window.document !== "undefined") {
//   // browser
// }

export function setHeaders() {
  let token;
  if (typeof window !== 'undefined' && typeof window.document !== 'undefined') {
    token = localStorage.getItem('token');
  }

  const headers = new HttpHeaders().append(
    'authorization',
    `Token ${token}`
    // `Token ${this.token}`
  );
  return headers;
}
