import React from 'react';

const PessoaLista = ({ pessoas, onDeletar, loading }) => {
  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Carregando pessoas...</p>
      </div>
    );
  }

  if (pessoas.length === 0) {
    return (
      <div className="text-center" style={{ padding: '2rem' }}>
        <i className="fas fa-users" style={{ fontSize: '3rem', color: '#999', marginBottom: '1rem' }}></i>
        <p className="text-muted">Nenhuma pessoa cadastrada ainda.</p>
        <small className="text-muted">
          Use o formulário para adicionar a primeira pessoa.
        </small>
      </div>
    );
  }

  return (
    <div>
      {pessoas.map((pessoa) => (
        <div key={pessoa.id} className="pessoa-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h6 className="card-title">
                <i className="fas fa-user"></i>
                {pessoa.nome}
              </h6>
              <p className="card-text">
                <i className="fas fa-birthday-cake"></i>
                {pessoa.idade} anos
              </p>
              <small className="text-muted">
                <i className="fas fa-id-badge"></i>
                ID: {pessoa.id}
              </small>
            </div>
            <div>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => {
                  if (window.confirm(`Tem certeza que deseja deletar ${pessoa.nome}?`)) {
                    onDeletar(pessoa.id);
                  }
                }}
                title={`Deletar ${pessoa.nome}`}
              >
                <i className="fas fa-trash"></i>
                Deletar
              </button>
            </div>
          </div>
        </div>
      ))}
      
      <div style={{ marginTop: '1rem' }}>
        <small className="text-muted">
          <i className="fas fa-info-circle"></i>
          Total de {pessoas.length} pessoa(s) cadastrada(s)
        </small>
      </div>
    </div>
  );
};

export default PessoaLista;
