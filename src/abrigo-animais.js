class AbrigoAnimais {
  constructor() {
    this.animais = {
      Rex: ["RATO", "BOLA"],
      Mimi: ["BOLA", "LASER"],
      Fofo: ["BOLA", "RATO", "LASER"],
      Zero: ["RATO", "BOLA"],
      Bola: ["CAIXA", "NOVELO"],
      Bebe: ["LASER", "RATO", "BOLA"],
      Loco: ["SKATE", "RATO"],
    };
  }

  verificaOrdem(favoritos, brinquedosPessoa) {
    let pos = 0;
    for (let brinquedo of brinquedosPessoa) {
      if (brinquedo === favoritos[pos]) {
        pos++;
      }
      if (pos === favoritos.length) {
        return true;
      }
    }
    return false;
  }

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    const p1 = brinquedosPessoa1.split(",").map(b => b.trim().toUpperCase());
    const p2 = brinquedosPessoa2.split(",").map(b => b.trim().toUpperCase());
    const ordem = ordemAnimais.split(",").map(a => a.trim());

    let resultado = [];

    for (let animalNome of ordem) {
      const favoritos = this.animais[animalNome];
      if (!favoritos) {
        return { erro: "Animal inválido", lista: null };
      }

      const p1ok = this.verificaOrdem(favoritos, p1);
      const p2ok = this.verificaOrdem(favoritos, p2);

      let dono = "abrigo";

      if (p1ok && !p2ok) {
        dono = "pessoa 1";
      } else if (p2ok && !p1ok) {
        dono = "pessoa 2";
      }

      resultado.push(`${animalNome} - ${dono}`);
    }

    // 🔑 Corrigindo a ordem alfabética no final
    return { erro: null, lista: resultado.sort((a, b) => a.localeCompare(b)) };
  }
}

export { AbrigoAnimais as AbrigoAnimais };
