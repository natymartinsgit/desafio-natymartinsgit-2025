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

    // Lista oficial de brinquedos permitidos
    this.brinquedosValidos = [
      "RATO", "BOLA", "LASER", "CAIXA", "NOVELO", "SKATE"
    ];
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

    // Valida se há brinquedos inválidos
    const todosBrinquedos = [...p1, ...p2];
    for (let b of todosBrinquedos) {
      if (!this.brinquedosValidos.includes(b)) {
        return { erro: "Brinquedo inválido", lista: null };
      }
    }
    
    // Valida se há brinquedos duplicados em cada pessoa separadamente
    const p1Set = new Set(p1);
    const p2Set = new Set(p2);
    if (p1Set.size !== p1.length || p2Set.size !== p2.length) {
      return { erro: "Brinquedo inválido", lista: null };
    }

    // Valida se há animais duplicados
    const animalSet = new Set(ordem);
    if (animalSet.size !== ordem.length) {
      return { erro: "Animal inválido", lista: null };
    }

    let resultado = [];
    let adotadosP1 = 0;
    let adotadosP2 = 0;
    
    // Definir quais animais são gatos
    const gatos = ["Mimi", "Fofo", "Zero"];

    for (let animalNome of ordem) {
      const favoritos = this.animais[animalNome];
      if (!favoritos) {
        return { erro: "Animal inválido", lista: null };
      }

      const p1ok = this.verificaOrdem(favoritos, p1);
      const p2ok = this.verificaOrdem(favoritos, p2);
      const ehGato = gatos.includes(animalNome);

      let dono = "abrigo";

      // Regra especial do Loco: não se importa com ordem se tiver companhia
      if (animalNome === "Loco") {
        const jaTemAnimal = resultado.some(r => !r.includes("abrigo"));
        if (jaTemAnimal) {
          // Se já tem animal adotado, Loco pode ir com qualquer pessoa que tenha seus brinquedos
          const p1TemBrinquedos = favoritos.every(brinquedo => p1.includes(brinquedo));
          const p2TemBrinquedos = favoritos.every(brinquedo => p2.includes(brinquedo));
          
          if (p1TemBrinquedos && !p2TemBrinquedos && adotadosP1 < 3) {
            dono = "pessoa 1";
            adotadosP1++;
          } else if (p2TemBrinquedos && !p1TemBrinquedos && adotadosP2 < 3) {
            dono = "pessoa 2";
            adotadosP2++;
          } else if (p1TemBrinquedos && p2TemBrinquedos) {
            dono = "abrigo"; // Ambos podem, então fica no abrigo
          }
        }
        // Se não tem companhia, fica no abrigo (dono já é "abrigo")
      } else {
        // Lógica normal para outros animais
        if (p1ok && p2ok) {
          // Se ambos podem adotar, o animal fica no abrigo
          dono = "abrigo";
        } else if (p1ok && !p2ok && adotadosP1 < 3) {
          dono = "pessoa 1";
          adotadosP1++;
        } else if (p2ok && !p1ok && adotadosP2 < 3) {
          dono = "pessoa 2";
          adotadosP2++;
        }
      }

      resultado.push(`${animalNome} - ${dono}`);
    }

    return { erro: null, lista: resultado.sort((a, b) => a.localeCompare(b)) };
  }
}

const abrigo = new AbrigoAnimais();
// Mostrar no console
console.log("Lista de animais no abrigo:");
console.log(abrigo.animais);
export { AbrigoAnimais as AbrigoAnimais };
