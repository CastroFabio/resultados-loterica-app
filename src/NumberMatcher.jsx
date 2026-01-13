import React, { useState, useEffect } from "react";
import "./NumberMatcher.css"; // Estilos opcionais

function NumberMatcher() {
  // Estado para os dois grupos de inputs
  const [listA, setListA] = useState(["", "", "", "", "", "", "", "", "", ""]); // 10 números
  const [listB, setListB] = useState(["", "", "", "", "", ""]); // 5 números
  const [matches, setMatches] = useState([]);

  // Efeito para calcular as coincidências sempre que as listas mudarem
  useEffect(() => {
    findMatches();
  }, [listA, listB]);

  // Função para encontrar números que coincidem
  const findMatches = () => {
    // Filtra apenas valores válidos (números)
    const validNumbersA = listA
      .map((num) => num.trim())
      .filter((num) => num !== "" && !isNaN(num))
      .map((num) => parseFloat(num));

    const validNumbersB = listB
      .map((num) => num.trim())
      .filter((num) => num !== "" && !isNaN(num))
      .map((num) => parseFloat(num));

    // Encontra números que aparecem em ambas as listas
    const foundMatches = [];

    validNumbersA.forEach((numA) => {
      // Verifica se o número existe na lista B
      const existsInB = validNumbersB.some((numB) => numB === numA);

      // Se existe, verifica se já foi adicionado
      if (existsInB && !foundMatches.includes(numA)) {
        foundMatches.push(numA);
      }
    });

    // Verifica também da lista B para lista A (redundante, mas seguro)
    validNumbersB.forEach((numB) => {
      const existsInA = validNumbersA.some((numA) => numA === numB);
      if (existsInA && !foundMatches.includes(numB)) {
        foundMatches.push(numB);
      }
    });

    setMatches(foundMatches.sort((a, b) => a - b));
  };

  // Funções para a Lista A (10 números)
  const handleListAChange = (index, value) => {
    // Permite apenas números e ponto decimal
    const numericValue = value.replace(/[^0-9.-]/g, "");
    const newList = [...listA];
    newList[index] = numericValue;
    setListA(newList);
  };

  const addToListA = () => {
    setListA([...listA, ""]);
  };

  const removeFromListA = (index) => {
    if (listA.length > 1) {
      const newList = listA.filter((_, i) => i !== index);
      setListA(newList);
    }
  };

  // Funções para a Lista B (5 números)
  const handleListBChange = (index, value) => {
    // Permite apenas números e ponto decimal
    const numericValue = value.replace(/[^0-9.-]/g, "");
    const newList = [...listB];
    newList[index] = numericValue;
    setListB(newList);
  };

  const addToListB = () => {
    setListB([...listB, ""]);
  };

  const removeFromListB = (index) => {
    if (listB.length > 1) {
      const newList = listB.filter((_, i) => i !== index);
      setListB(newList);
    }
  };

  // Limpar todas as listas
  const clearAll = () => {
    setListA(Array(10).fill(""));
    setListB(Array(5).fill(""));
  };

  // Gerar números aleatórios para teste
  const generateRandomNumbers = () => {
    // Gera 10 números aleatórios para Lista A (0-100)
    const randomA = Array(10)
      .fill("")
      .map(() => Math.floor(Math.random() * 100).toString());

    // Gera 5 números aleatórios para Lista B (0-100)
    const randomB = Array(5)
      .fill("")
      .map(() => Math.floor(Math.random() * 100).toString());

    // Garante que haja pelo menos 2 coincidências
    randomB[0] = randomA[0]; // Primeiro número igual
    randomB[1] = randomA[3]; // Segundo número igual

    setListA(randomA);
    setListB(randomB);
  };

  // Estatísticas
  const getStatistics = () => {
    const validA = listA.filter(
      (num) => num.trim() !== "" && !isNaN(num)
    ).length;
    const validB = listB.filter(
      (num) => num.trim() !== "" && !isNaN(num)
    ).length;

    return {
      totalA: validA,
      totalB: validB,
      matchesCount: matches.length,
      matchPercentage:
        validA + validB > 0
          ? (((matches.length * 2) / (validA + validB)) * 100).toFixed(1)
          : 0,
    };
  };

  const stats = getStatistics();

  return (
    <div className="number-matcher">
      <h2>🔍 Comparador de Listas de Números</h2>
      <p className="subtitle">
        Adicione números e veja quais coincidem entre as listas
      </p>

      <div className="control-buttons">
        <button onClick={generateRandomNumbers} className="btn-generate">
          🎲 Gerar Números Aleatórios
        </button>
        <button onClick={clearAll} className="btn-clear">
          🗑️ Limpar Tudo
        </button>
      </div>

      <div className="lists-container">
        {/* Lista A - 10 números */}
        <div className="list-section">
          <div className="list-header">
            <h3>📋 Lista A - Números ({listA.length} campos)</h3>
            <span className="list-info">Esperados: 10 números</span>
            <button
              onClick={addToListA}
              className="btn-add-list"
              title="Adicionar mais campos à Lista A"
            >
              + Campo
            </button>
          </div>

          <div className="inputs-grid">
            {listA.map((value, index) => (
              <div key={`a-${index}`} className="input-item">
                <label>Número {index + 1}:</label>
                <div className="input-with-remove">
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => handleListAChange(index, e.target.value)}
                    placeholder="Digite um número"
                    className="number-input"
                  />
                  {listA.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFromListA(index)}
                      className="btn-remove-item"
                      title="Remover este campo"
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="list-summary">Números válidos: {stats.totalA}</div>
        </div>

        {/* Lista B - 5 números */}
        <div className="list-section">
          <div className="list-header">
            <h3>📝 Lista B - Números ({listB.length} campos)</h3>
            <span className="list-info">Esperados: 5 números</span>
            <button
              onClick={addToListB}
              className="btn-add-list"
              title="Adicionar mais campos à Lista B"
            >
              + Campo
            </button>
          </div>

          <div className="inputs-grid">
            {listB.map((value, index) => (
              <div key={`b-${index}`} className="input-item">
                <label>Número {index + 1}:</label>
                <div className="input-with-remove">
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => handleListBChange(index, e.target.value)}
                    placeholder="Digite um número"
                    className="number-input"
                  />
                  {listB.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFromListB(index)}
                      className="btn-remove-item"
                      title="Remover este campo"
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="list-summary">Números válidos: {stats.totalB}</div>
        </div>
      </div>

      {/* Resultados - Coincidências */}
      <div className="results-section">
        <h3>🎯 Números que Coincidem</h3>

        {matches.length > 0 ? (
          <>
            <div className="matches-container">
              <div className="matches-count">
                <span className="count-badge">{matches.length}</span>
                <span>coincidência(s) encontrada(s)</span>
              </div>

              <div className="matches-list">
                {matches.map((match, index) => (
                  <div key={index} className="match-item">
                    <span className="match-number">{match}</span>
                    <span className="match-info">
                      Presente em ambas as listas
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="stats">
              <div className="stat-item">
                <span className="stat-label">Lista A:</span>
                <span className="stat-value">
                  {stats.totalA} números válidos
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Lista B:</span>
                <span className="stat-value">
                  {stats.totalB} números válidos
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Coincidências:</span>
                <span className="stat-value highlight">{matches.length}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Taxa de Coincidência:</span>
                <span className="stat-value">{stats.matchPercentage}%</span>
              </div>
            </div>
          </>
        ) : (
          <div className="no-matches">
            <p>⚠️ Nenhum número coincide entre as listas</p>
            <p className="hint">
              Adicione números iguais em ambas as listas para ver as
              coincidências
            </p>
          </div>
        )}
      </div>

      {/* Visualização dos Dados */}
      <div className="data-preview">
        <h4>📊 Visualização dos Dados</h4>
        <div className="preview-content">
          <div className="preview-list">
            <strong>Lista A (valores):</strong>
            <div className="preview-values">
              {listA.map((num, idx) => (
                <span
                  key={idx}
                  className={`preview-number ${
                    num.trim() === "" ? "empty" : ""
                  }`}
                >
                  {num.trim() === "" ? "vazio" : num}
                </span>
              ))}
            </div>
          </div>
          <div className="preview-list">
            <strong>Lista B (valores):</strong>
            <div className="preview-values">
              {listB.map((num, idx) => (
                <span
                  key={idx}
                  className={`preview-number ${
                    num.trim() === "" ? "empty" : ""
                  }`}
                >
                  {num.trim() === "" ? "vazio" : num}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NumberMatcher;
