import { postRegister } from "../api/cryptoactive.api";

const user1 = {
  name: "Pablo Damian",
  lastname: "Diaz",
  email: "pablo@gmail.com",
  direction: "554",
  password: "12345678",
  cvu: "1234567891123456789121",
  wallet: "12345678",
};

const user2 = {
  name: "Nelson",
  lastname: "Gonzalez",
  email: "nelson@gmail.com",
  direction: "558",
  password: "12345679",
  cvu: "1234567891123456789122",
  wallet: "12345679",
};

const user3 = {
  name: "Jania",
  lastname: "Yenian",
  email: "jania@gmail.com",
  direction: "559",
  password: "12345677",
  cvu: "1234567891123456789123",
  wallet: "12345677",
};

const user4 = {
  name: "David",
  lastname: "Herrera",
  email: "david@gmail.com",
  direction: "560",
  password: "12345676",
  cvu: "1234567891123456789124",
  wallet: "12345676",
};

const users = [user1, user2, user3, user4] ;

const register = (user) => {
  postRegister(user)
    .then((result) => {
      console.log("registrado");
    })
    .catch(console.log);
};

const registerAll = () => {
  users.forEach(element => {
      register(element)
  });
};

export default registerAll;