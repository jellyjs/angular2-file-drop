interface iFileAPI {
  readAsDataURL(file: File, cb: Function): void;
  readAsBinaryString(file: File, cb: Function): void;
  readAsArrayBuffer(file: File, cb: Function): void;
  readAsText(file: File, cb: Function): void;
}

declare var FileAPI: iFileAPI;
