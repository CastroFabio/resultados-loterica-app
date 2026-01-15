import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [inputsJogados, setInputsJogados] = useState([""]);
  const [inputsResultado, setInputsResultado] = useState([""]);
  const [numerosJogados, setNumerosJogados] = useState([]);
  const [numerosResultado, setNumerosResultado] = useState([]);
  const [coincidencias, setCoincidencias] = useState([]);
  const [linhasAgrupadas, setLinhasAgrupadas] = useState([]);

  // Processar números jogados
  useEffect(() => {
    const processarLinha = (texto) => {
      return texto
        .split(/[\s,]+/)
        .map((num) => num.trim())
        .filter((num) => num !== "")
        .map((num) => parseFloat(num))
        .filter((num) => !isNaN(num));
    };

    const linhas = inputsJogados.map(processarLinha);
    const todosNumeros = linhas.flat();
    setNumerosJogados(todosNumeros);

    // Agrupar coincidências por linha (mantendo a estrutura original)
    if (coincidencias.length > 0) {
      const agrupadas = linhas.map((linha) =>
        linha.filter((num) => coincidencias.includes(num))
      );
      setLinhasAgrupadas(agrupadas);
    }
  }, [inputsJogados, coincidencias]);

  // Processar resultado e encontrar coincidências
  useEffect(() => {
    const processarResultado = (inputs) => {
      return inputs
        .map((input) =>
          input
            .split(/[\s,]+/)
            .map((num) => num.trim())
            .filter((num) => num !== "")
            .map((num) => parseFloat(num))
            .filter((num) => !isNaN(num))
        )
        .flat();
    };

    const resultadoNumeros = processarResultado(inputsResultado);
    setNumerosResultado(resultadoNumeros);

    // Encontrar números em comum
    const comuns = numerosJogados.filter((num) =>
      resultadoNumeros.includes(num)
    );
    setCoincidencias(comuns);
  }, [inputsResultado, numerosJogados]);

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

  // Limpar todos os campos
  const limparTudo = () => {
    setInputsJogados([""]);
    setInputsResultado([""]);
  };

  // Estatísticas
  const totalCoincidencias = coincidencias.length;

  return (
    <div className="app">
      <header className="header">
        <h1>Lotérica</h1>
        <p>
          Digite seus números jogados e depois o resultado para ver os acertos.
        </p>
      </header>

      {/* Botão Limpar Tudo no topo */}
      <div className="top-controls">
        <button onClick={limparTudo} className="btn-limpar">
          🗑️ Limpar Tudo
        </button>
      </div>
      <br />

      <div className="container">
        {/* Números Jogados */}
        <div className="lista-container">
          <div className="lista-header">
            <h2>Números Jogados</h2>
            <button onClick={adicionarInputJogados} className="btn-adicionar">
              + Adicionar Linha
            </button>
          </div>
          <p className="instrucao">
            Digite números separados por espaço ou vírgula
          </p>
          <div className="inputs-container">
            {inputsJogados.map((input, index) => (
              <div key={index} className="input-group">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => handleJogadosChange(index, e.target.value)}
                  placeholder={`Linha ${index + 1}: Ex: 65 86 24 63 96`}
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
          <div className="contador">
            {numerosJogados.length} número
            {numerosJogados.length !== 1 ? "s" : ""} jogado
            {numerosJogados.length !== 1 ? "s" : ""}
          </div>
        </div>

        {/* Resultado */}
        <div className="lista-container">
          <div className="lista-header">
            <h2>Resultado</h2>
            <button onClick={adicionarInputResultado} className="btn-adicionar">
              + Adicionar Linha
            </button>
          </div>
          <p className="instrucao">
            Digite os números sorteados (uma ou mais linhas)
          </p>
          <div className="inputs-container">
            {inputsResultado.map((input, index) => (
              <div key={index} className="input-group">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => handleResultadoChange(index, e.target.value)}
                  placeholder={`Linha ${index + 1} do resultado`}
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
          <div className="contador">
            {numerosResultado.length} número
            {numerosResultado.length !== 1 ? "s" : ""} no resultado
          </div>
        </div>
      </div>

      {/* Visualização dos Números Jogados com Destaque */}
      <div className="resultados">
        <h2>
          Acertos: {totalCoincidencias} de {numerosJogados.length} número
          {numerosJogados.length !== 1 ? "s" : ""} jogado
          {numerosJogados.length !== 1 ? "s" : ""}
          {totalCoincidencias > 0 && (
            <span className="taxa-acerto">
              (
              {numerosJogados.length > 0
                ? ((totalCoincidencias / numerosJogados.length) * 100).toFixed(
                    1
                  )
                : "0"}
              %)
            </span>
          )}
        </h2>

        {numerosJogados.length > 0 ? (
          <div className="visualizacao-jogados">
            <h3>Seus números jogados (acertos em destaque):</h3>

            {/* Exibir acertos mantendo a estrutura das linhas */}
            <div className="linhas-acertos">
              {inputsJogados.map((input, linhaIndex) => {
                const numerosNaLinha = input
                  .split(/[\s,]+/)
                  .map((num) => num.trim())
                  .filter((num) => num !== "")
                  .map((num) => parseFloat(num))
                  .filter((num) => !isNaN(num));

                if (numerosNaLinha.length === 0) return null;

                return (
                  <div key={linhaIndex} className="linha-container">
                    <div className="linha-header">
                      <span className="linha-numero">
                        Linha {linhaIndex + 1}
                      </span>
                      <span className="linha-stats">
                        {linhasAgrupadas[linhaIndex]?.length || 0} acerto
                        {(linhasAgrupadas[linhaIndex]?.length || 0) !== 1
                          ? "s"
                          : ""}
                      </span>
                    </div>
                    <div className="numeros-linha">
                      {numerosNaLinha.map((num, numIndex) => {
                        const isAcerto = coincidencias.includes(num);
                        return (
                          <div
                            key={`${linhaIndex}-${numIndex}`}
                            className={`numero-item ${
                              isAcerto ? "acerto" : "normal"
                            }`}
                          >
                            <span className="numero">{num}</span>
                            {isAcerto && (
                              <span className="badge-acerto">✓</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="sem-numeros">Digite seus números jogados acima</div>
        )}

        {/* Resumo Estatístico */}
        <div className="resumo">
          <div className="resumo-item">
            <span>Linhas Jogadas</span>
            <strong>{inputsJogados.length}</strong>
          </div>
          <div className="resumo-item">
            <span>Números Jogados</span>
            <strong>{numerosJogados.length}</strong>
          </div>
          <div className="resumo-item">
            <span>Números no Resultado</span>
            <strong>{numerosResultado.length}</strong>
          </div>
          <div className="resumo-item destaque">
            <span>Total de Acertos</span>
            <strong>{totalCoincidencias}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
