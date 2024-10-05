import { test, Page } from "@playwright/test";
import { Clientes } from "../../pages/clientes";
import { dadosClientes } from "../../dados-de-teste/dados-de-teste";

let cliente: Clientes;
test.beforeEach("Dado que acedo a sistema", async ({ page }) => {
  cliente = new Clientes(page);
  cliente.acederAoSistema();
});

test(
  "CT-01 - Validar registo de cliente com idade inferior a 18",
  {
    annotation: {
      type: "Funcional",
      description: "O utilizador deve visualizar a mensagem de excessão do registo de cliente",
    },
  },
  async ({ page }) => {
    await test.step("Então valido a mensagem de excessão do campo Idade", async () => {
      await cliente.preencherFormularioDeCadastro(dadosClientes.nome, dadosClientes.email, dadosClientes.idadeInferior);
    });
  },
);
test(
  "CT-02 - Validar registo de cliente com idade igual ou superior a 18",
  {
    annotation: {
      type: "Regressão",
      description: "O utilizador deve ser capaz de registar um cliente com idade susperior a 18 anos",
    },
  },
  async ({ page }) => {
    await test.step("Então registo o cliente com sucesso", async () => {
      await cliente.preencherFormularioDeCadastro(dadosClientes.nome, dadosClientes.email, dadosClientes.idadeMaior);
    });
  },
);
