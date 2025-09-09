import { AbrigoAnimais } from "./abrigo-animais";

describe("Abrigo de Animais", () => {
  test("Deve rejeitar animal inválido", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "CAIXA,RATO",
      "RATO,BOLA",
      "Lulu"
    );
    expect(resultado.erro).toBe("Animal inválido");
    expect(resultado.lista).toBeFalsy();
  });

  test("Deve rejeitar brinquedo inválido", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "FOGUEIRA,BOLA",
      "RATO,BOLA",
      "Rex"
    );
    expect(resultado.erro).toBe("Brinquedo inválido");
    expect(resultado.lista).toBeFalsy();
  });

  test("Deve rejeitar brinquedo duplicado", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "RATO,RATO,BOLA",
      "RATO,BOLA",
      "Rex"
    );
    expect(resultado.erro).toBe("Brinquedo inválido");
    expect(resultado.lista).toBeFalsy();
  });

  test("Deve encontrar pessoa para um animal", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "RATO,BOLA",
      "RATO,NOVELO",
      "Rex,Fofo"
    );
    expect(resultado.lista).toContain("Fofo - abrigo");
    expect(resultado.lista).toContain("Rex - pessoa 1");
    expect(resultado.lista.length).toBe(2);
    expect(resultado.erro).toBeFalsy();
  });

  test("Deve encontrar pessoa para um animal intercalando brinquedos", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "BOLA,LASER",
      "BOLA,NOVELO,RATO,LASER",
      "Mimi,Fofo,Rex,Bola"
    );

    expect(resultado.lista).toContain("Bola - abrigo");
    expect(resultado.lista).toContain("Fofo - pessoa 2");
    expect(resultado.lista).toContain("Mimi - abrigo");
    expect(resultado.lista).toContain("Rex - abrigo");
    expect(resultado.lista.length).toBe(4);
    expect(resultado.erro).toBeFalsy();
  });

  test("Gato deve ficar no abrigo se os dois podem adotá-lo", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "BOLA,LASER",
      "BOLA,LASER",
      "Mimi"
    );
    expect(resultado.lista[0]).toBe("Mimi - abrigo");
    expect(resultado.erro).toBeFalsy();
  });

  test("Pessoa não pode adotar mais que 3 animais", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "RATO,BOLA,LASER,NOVELO,CAIXA,SKATE",
      "CAIXA",
      "Rex,Bebe,Bola,Mimi,Fofo,Zero"
    );
    const adotadosP1 = resultado.lista.filter(r => r.includes("pessoa 1")).length;
    expect(adotadosP1).toBe(3);
    expect(resultado.lista.some(r => r.includes("abrigo"))).toBeTruthy();
  });

  test("Loco deve ficar no abrigo se for o único", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "SKATE,RATO",
      "SKATE,RATO",
      "Loco"
    );
    expect(resultado.lista[0]).toBe("Loco - abrigo");
  });

  test("Loco pode sair se já houver outro animal adotado", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "RATO,BOLA,SKATE",
      "CAIXA",
      "Rex,Loco"
    );
    expect(resultado.lista).toContain("Rex - pessoa 1");
    expect(resultado.lista).toContain("Loco - pessoa 1");
  });
});
