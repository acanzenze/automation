import { faker } from "@faker-js/faker/locale/pt_BR";

export const dadosClientes = {
  nome: faker.person.fullName(),
  email: faker.internet.email(),
  idadeInferior: faker.number.int({ min: 0, max: 17 }),
  idadeMaior: faker.number.int({ min: 18, max: 200 }),
};
