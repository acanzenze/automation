import { expect, Locator, Page, test } from "@playwright/test";

export class Clientes {
  readonly page: Page;
  readonly navFormulario: Locator;
  readonly nome: Locator;
  readonly email: Locator;
  readonly idade: Locator;
  readonly botaoRegistar: Locator;
  readonly mensagemValidação: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navFormulario = page.locator("#showFormLink");
    this.nome = this.page.locator("#name");
    this.email = this.page.locator("#email");
    this.idade = this.page.locator("#age");
    this.botaoRegistar = this.page.getByRole("button", { name: "Registar" });
    this.mensagemValidação = this.page.locator("#message");
  }

  async acederAoSistema() {
    const url = "C:/Users/alexandre.canzenze/Documents/Registo de Cliente/index.html";
    await this.page.goto(url);
  }
  async preencherFormularioDeCadastro(nome: string, email: string, idade: number) {
    await test.step("Ir para formulario de registo de cliente", async () => {
      await this.navFormulario.click();
    });
    await this.nome.fill(nome);
    await this.email.fill(email);
    await this.idade.fill(idade.toString());
    let mensagem = "";
    if (idade < 18) {
      await this.botaoRegistar.click();
      mensagem = "A idade requerida deve ser superior ou igua a 18 anos";
      await expect(this.mensagemValidação).toContainText(mensagem);
      console.log("Mensagem: ", mensagem);
    } else {
      await this.botaoRegistar.click();
      mensagem = "Cliente registado com sucesso";
      await expect(this.mensagemValidação).toContainText(mensagem);
      console.log("Mensagem: ", mensagem);
    }
    console.log("Nome Completo: ", nome);
    console.log("Email: ", email);
    console.log("Idade: ", idade);
  }
}
