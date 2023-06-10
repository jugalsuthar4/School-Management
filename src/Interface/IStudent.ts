interface IStudent {
  _id?: string;
  username: string;
  first_name: string;
  last_name: string;
  date_of_birth: Date;
  address: string;
  email: string;
  phone_number: string;
  guardian_name: string;
  guardian_phone: string;
}

export default IStudent;
