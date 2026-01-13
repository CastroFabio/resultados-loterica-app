import React from "react";
import "./ResultsPanel.css";

function ResultsPanel({ matches, stats }) {
  const { totalA, totalB, matchesCount, matchPercentage } = stats;

  return (
    <div className="results-panel">
      <div className="panel-header">
        <h2>🎯 Resultados</h2>
        <div className="header-stats">
          <div className="stat-item">
            <span className="stat-label">Coincidências</span>
            <span className="stat-value highlight">{matchesCount}</span>
          </div>
        </div>
      </div>

      {/* Cards de estatísticas */}
      <div className="stats-cards">
        <div className="stat-card">
          <div className="card-icon" style={{ background: "#e3f2fd" }}>
            📋
          </div>
          <div className="card-content">
            <span className="card-label">Lista A</span>
            <span className="card-value">{totalA} números</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="card-icon" style={{ background: "#f3e5f5" }}>
            📝
          </div>
          <div className="card-content">
            <span className="card-label">Lista B</span>
            <span className="card-value">{totalB} números</span>
          </div>
        </div>

        <div className="stat-card highlight">
          <div className="card-icon" style={{ background: "#e8f5e9" }}>
            🎯
          </div>
          <div className="card-content">
            <span className="card-label">Match %</span>
            <span className="card-value">{matchPercentage}%</span>
          </div>
        </div>
      </div>

      {/* Lista de coincidências */}
      <div className="matches-section">
        <h3>Números que coincidem:</h3>

        {matches.length > 0 ? (
          <div className="matches-list">
            {matches.map((match, index) => (
              <div key={index} className="match-item">
                <div className="match-header">
                  <span className="match-index">#{index + 1}</span>
                  <span className="match-badge">COMUM</span>
                </div>
                <div className="match-number">{match}</div>
                <div className="match-footer">Aparece em ambas as listas</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-matches">
            <div className="no-matches-icon">🔍</div>
            <h4>Nenhuma coincidência</h4>
            <p>Não há números em comum entre as listas</p>
          </div>
        )}
      </div>

      {/* Análise */}
      <div className="analysis">
        <h3>📊 Análise</h3>
        <div className="analysis-content">
          {matchesCount === 0 ? (
            <p>
              As listas não compartilham nenhum número em comum. Para encontrar
              coincidências, adicione alguns números iguais em ambas as listas.
            </p>
          ) : (
            <p>
              <strong>
                {matchesCount} número{matchesCount !== 1 ? "s" : ""}
              </strong>{" "}
              aparece{matchesCount === 1 ? "" : "m"} em ambas as listas,
              representando uma taxa de coincidência de{" "}
              <strong>{matchPercentage}%</strong>.
            </p>
          )}

          <div className="progress-container">
            <div className="progress-label">
              <span>Taxa de Coincidência</span>
              <span>{matchPercentage}%</span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${Math.min(matchPercentage, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultsPanel;
