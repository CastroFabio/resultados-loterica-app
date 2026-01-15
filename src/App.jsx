import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [inputsJogados, setInputsJogados] = useState([""]);
  const [inputsResultado, setInputsResultado] = useState([""]);
  const [coincidencias, setCoincidencias] = useState([]);

  // Função para processar string de números
  const processarString = (texto) => {
    return texto
      .split(/[\s,]+/) // Divide por espaço ou vírgula
      .map((num) => num.trim())
      .filter((num) => num !== "")
      .map((num) => parseFloat(num))
      .filter((num) => !isNaN(num));
  };

  // Processar todos os inputs de uma seção
  const processarLista = (inputs) => {
    return inputs
      .map((input) => processarString(input))
      .flat()
      .filter((num, index, self) => self.indexOf(num) === index); // Remove duplicatas
  };

  // Encontrar números que coincidem
  useEffect(() => {
    const numerosA = processarLista(inputsJogados);
    const numerosB = processarLista(inputsResultado);

    // Encontrar números em comum
    const comuns = numerosA.filter((num) => numerosB.includes(num));

    // Ordenar
    const unicos = [...new Set(comuns)].sort((a, b) => a - b);
    setCoincidencias(unicos);
  }, [inputsJogados, inputsResultado]);

  // Estatísticas
  const numerosA = processarLista(inputsJogados);
  const numerosB = processarLista(inputsResultado);
  const totalCoincidencias = coincidencias.length;

  // Manipular Números Jogados
  const handleJogadosChange = (index, value) => {
    const novosInputs = [...inputsJogados];
    novosInputs[index] = value;
    setInputsJogados(novosInputs);
  };

  const adicionarInputJogados = () => {
    setInputsJogados([...inputsJogados, ""]);
  };

  const removerInputJogados = (index) => {
    if (inputsJogados.length > 1) {
      const novosInputs = inputsJogados.filter((_, i) => i !== index);
      setInputsJogados(novosInputs);
    }
  };

  // Manipular Resultado
  const handleResultadoChange = (index, value) => {
    const novosInputs = [...inputsResultado];
    novosInputs[index] = value;
    setInputsResultado(novosInputs);
  };

  const adicionarInputResultado = () => {
    setInputsResultado([...inputsResultado, ""]);
  };

  const removerInputResultado = (index) => {
    if (inputsResultado.length > 1) {
      const novosInputs = inputsResultado.filter((_, i) => i !== index);
      setInputsResultado(novosInputs);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>🔍 Comparador de Números</h1>
        <p>
          Digite números separados por espaço ou vírgula. Cada linha pode conter
          múltiplos números.
        </p>
        <p className="exemplo">Exemplo: "65 86 24 63 96" ou "12,69,02,30,45"</p>
      </header>

      <div className="container">
        {/* Números Jogados */}
        <div className="lista-container">
          <div className="lista-header">
            <h2>Números Jogados</h2>
            <button onClick={adicionarInputJogados} className="btn-adicionar">
              + Adicionar Linha
            </button>
          </div>
          <div className="inputs-container">
            {inputsJogados.map((input, index) => (
              <div key={index} className="input-group">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => handleJogadosChange(index, e.target.value)}
                  placeholder={`Linha ${
                    index + 1
                  }: Digite números separados por espaço ou vírgula`}
                  className="input-texto"
                />
                {inputsJogados.length > 1 && (
                  <button
                    onClick={() => removerInputJogados(index)}
                    className="btn-remover"
                    title="Remover esta linha"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>
          <div className="contador">Números únicos: {numerosA.length}</div>
        </div>

        {/* Resultado */}
        <div className="lista-container">
          <div className="lista-header">
            <h2>Resultado</h2>
            <button onClick={adicionarInputResultado} className="btn-adicionar">
              + Adicionar Linha
            </button>
          </div>
          <div className="inputs-container">
            {inputsResultado.map((input, index) => (
              <div key={index} className="input-group">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => handleResultadoChange(index, e.target.value)}
                  placeholder={`Linha ${
                    index + 1
                  }: Digite números separados por espaço ou vírgula`}
                  className="input-texto"
                />
                {inputsResultado.length > 1 && (
                  <button
                    onClick={() => removerInputResultado(index)}
                    className="btn-remover"
                    title="Remover esta linha"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>
          <div className="contador">Números únicos: {numerosB.length}</div>
        </div>
      </div>

      {/* Resultados */}
      <div className="resultados">
        <h2>
          Acertos: {totalCoincidencias} número
          {totalCoincidencias !== 1 ? "s" : ""}
        </h2>

        {totalCoincidencias > 0 ? (
          <div className="coincidencias-lista">
            {coincidencias.map((num, idx) => (
              <div key={idx} className="coincidencia-item">
                <span className="indice">Acerto #{idx + 1}</span>
                <span className="numero">{num}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="sem-coincidencias">Nenhum acerto encontrado</div>
        )}

        {/* Resumo */}
        <div className="resumo">
          <div className="resumo-item">
            <span>Números Jogados</span>
            <strong>{numerosA.length}</strong>
          </div>
          <div className="resumo-item">
            <span>Números Resultado</span>
            <strong>{numerosB.length}</strong>
          </div>
          <div className="resumo-item destaque">
            <span>Acertos</span>
            <strong>{totalCoincidencias}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
