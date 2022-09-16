import Swal from "sweetalert2";

export class Alerts {
  message?: string;
  title?: string;
  type: 'success' | 'error';

  constructor(type:'success'|'error', title?:string, message?:string){
    this.type = type;
    this.title = title;
    this.message = message;
  }

  showSuccess(){
    Swal.fire(
      this.title,
      this.message,
      'success'
    )
  }

  showErrorMissing(){
    Swal.fire(
      'Form Invalid!',
      'Some value is missing',
      'error'
    )
  }

  showError(){
    Swal.fire({
      icon: 'error',
      title: 'Oops, something went wrong.',
      showConfirmButton: false,
      timer: 1500
    })
  }
}