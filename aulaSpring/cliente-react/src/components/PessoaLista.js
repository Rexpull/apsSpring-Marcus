import React from 'react';

const PessoaLista = ({ pessoas, onDeletar, loading }) => {
  if (loading) {
    return (
      <div className="loading">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
        <p className="mt-2">Carregando pessoas...</p>
      </div>
    );
  }

  if (pessoas.length === 0) {
    return (
      <div className="text-center py-4">
        <i className="fas fa-users fa-3x text-muted mb-3"></i>
        <p className="text-muted">Nenhuma pessoa cadastrada ainda.</p>
        <small className="text-muted">
          Use o formulário ao lado para adicionar a primeira pessoa.
        </small>
      </div>
    );
  }

  return (
    <div className="pessoa-lista">
      {pessoas.map((pessoa) => (
        <div key={pessoa.id} className="pessoa-card card mb-3">
          <div className="card-body">
            <div className="row align-items-center">
              <div className="col-md-8">
                <h6 className="card-title mb-1">
                  <i className="fas fa-user me-2 text-primary"></i>
                  {pessoa.nome}
                </h6>
                <p className="card-text text-muted mb-0">
                  <i className="fas fa-birthday-cake me-2"></i>
                  {pessoa.idade} anos
                </p>
                <small className="text-muted">
                  <i className="fas fa-id-badge me-1"></i>
                  ID: {pessoa.id}
                </small>
              </div>
              <div className="col-md-4 text-end">
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => {
                    if (window.confirm(`Tem certeza que deseja deletar ${pessoa.nome}?`)) {
                      onDeletar(pessoa.id);
                    }
                  }}
                  title={`Deletar ${pessoa.nome}`}
                >
                  <i className="fas fa-trash me-1"></i>
                  Deletar
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      <div className="mt-3">
        <small className="text-muted">
          <i className="fas fa-info-circle me-1"></i>
          Total de {pessoas.length} pessoa(s) cadastrada(s)
        </small>
      </div>
    </div>
  );
};

export default PessoaLista;
