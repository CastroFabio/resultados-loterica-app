import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [listaA, setListaA] = useState("41 78 71 60 80");
  const [listaB, setListaB] = useState("60 45 71 23 41");
  const [coincidencias, setCoincidencias] = useState([]);

  // Função para converter string de números para array
  const processarLista = (texto) => {
    return texto
      .split(" ") // Divide por espaço
      .map((num) => num.trim()) // Remove espaços extras
      .filter((num) => num !== "") // Remove itens vazios
      .map((num) => parseFloat(num)) // Converte para número
      .filter((num) => !isNaN(num)); // Remove valores inválidos
  };

  // Encontrar números que coincidem
  const encontrarCoincidencias = () => {
    const numerosA = processarLista(listaA);
    const numerosB = processarLista(listaB);

    // Encontrar números em comum
    const comuns = numerosA.filter((num) => numerosB.includes(num));

    // Remover duplicatas
    const unicos = [...new Set(comuns)];

    // Ordenar
    setCoincidencias(unicos.sort((a, b) => a - b));
  };

  // Executar sempre que as listas mudarem
  useEffect(() => {
    encontrarCoincidencias();
  }, [listaA, listaB]);

  // Estatísticas
  const numerosA = processarLista(listaA);
  const numerosB = processarLista(listaB);
  const totalCoincidencias = coincidencias.length;

  return (
    <div className="app">
      <header className="header">
        <h1>🔍 Comparador de Listas</h1>
        <p>Digite números separados por espaço</p>
      </header>

      <div className="container">
        {/* Lista A */}
        <div className="lista-container">
          <h2>Lista A</h2>
          <input
            type="text"
            value={listaA}
            onChange={(e) => setListaA(e.target.value)}
            placeholder="Ex: 41 78 71 60 80"
            className="input-lista"
          />
        </div>

        {/* Lista B */}
        <div className="lista-container">
          <h2>Lista B</h2>
          <input
            type="text"
            value={listaB}
            onChange={(e) => setListaB(e.target.value)}
            placeholder="Ex: 60 45 71 23 41"
            className="input-lista"
          />
        </div>
      </div>

      {/* Resultados */}
      <div className="resultados">
        <h2>Números que Coincidem</h2>

        {totalCoincidencias > 0 ? (
          <>
            <div className="contador">
              {totalCoincidencias} coincidência
              {totalCoincidencias !== 1 ? "s" : ""} encontrada
              {totalCoincidencias !== 1 ? "s" : ""}
            </div>

            <div className="coincidencias-lista">
              {coincidencias.map((num, idx) => (
                <div key={idx} className="coincidencia-item">
                  <span className="indice">#{idx + 1}</span>
                  <span className="numero">{num}</span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="sem-coincidencias">
            Nenhum número coincide entre as listas
          </div>
        )}

        {/* Resumo */}
        <div className="resumo">
          <div className="resumo-item">
            <span>Lista A</span>
            <strong>{numerosA.length}</strong>
          </div>
          <div className="resumo-item">
            <span>Lista B</span>
            <strong>{numerosB.length}</strong>
          </div>
          <div className="resumo-item destaque">
            <span>Coincidências</span>
            <strong>{totalCoincidencias}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
