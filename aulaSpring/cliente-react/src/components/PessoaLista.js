import React from 'react';

const PessoaLista = ({ pessoas, onDeletar, loading }) => {
  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
          <span className="visually-hidden">Carregando...</span>
        </div>
        <p className="mt-3 text-muted">Carregando registros...</p>
      </div>
    );
  }

  if (pessoas.length === 0) {
    return (
      <div className="text-center py-5" style={{ padding: '3rem 2rem' }}>
        <i className="fas fa-inbox" style={{ fontSize: '4rem', color: '#dee2e6', marginBottom: '1.5rem' }}></i>
        <h5 className="text-muted mb-2">Nenhum registro encontrado</h5>
        <p className="text-muted mb-0" style={{ fontSize: '0.95rem' }}>
          Comece adicionando seu primeiro registro usando o formulário acima.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0" style={{ color: '#495057', fontWeight: '600' }}>
          <i className="fas fa-list-ul me-2 text-primary"></i>
          Registros Encontrados
        </h5>
        <span className="badge bg-secondary" style={{ fontSize: '0.9rem', padding: '0.5rem 0.75rem' }}>
          {pessoas.length} {pessoas.length === 1 ? 'item' : 'itens'}
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {pessoas.map((pessoa) => (
          <div 
            key={pessoa.id} 
            className="pessoa-card"
            style={{ 
              borderRadius: '10px',
              padding: '1.25rem',
              border: '1px solid #e9ecef',
              transition: 'all 0.3s',
              backgroundColor: '#fff'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <h6 className="mb-2" style={{ color: '#212529', fontWeight: '600', fontSize: '1.1rem' }}>
                  <i className="fas fa-user-circle me-2 text-primary"></i>
                  {pessoa.nome}
                </h6>
                <div className="mb-2" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                  <span className="text-muted">
                    <i className="fas fa-calendar-check me-1"></i>
                    <strong>{pessoa.idade}</strong> anos
                  </span>
                  <span className="text-muted" style={{ fontSize: '0.85rem' }}>
                    <i className="fas fa-hashtag me-1"></i>
                    Código: <strong>{pessoa.id}</strong>
                  </span>
                </div>
              </div>
              <div className="ms-3">
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => {
                    if (window.confirm(`Deseja realmente excluir o registro de ${pessoa.nome}?`)) {
                      onDeletar(pessoa.id);
                    }
                  }}
                  title={`Excluir ${pessoa.nome}`}
                  style={{ 
                    borderRadius: '6px',
                    padding: '0.4rem 0.8rem',
                    fontSize: '0.875rem'
                  }}
                >
                  <i className="fas fa-trash-alt me-1"></i>
                  Excluir
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PessoaLista;
