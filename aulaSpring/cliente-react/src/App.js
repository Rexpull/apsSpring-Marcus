import React, { useState, useEffect } from 'react';
import PessoaLista from './components/PessoaLista';
import PessoaFormulario from './components/PessoaFormulario';
import PessoaService from './services/PessoaService';

function App() {
  const [pessoas, setPessoas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Carregar pessoas ao inicializar o componente
  useEffect(() => {
    carregarPessoas();
  }, []);

  const carregarPessoas = async () => {
    setLoading(true);
    setError(null);
    try {
      const pessoasData = await PessoaService.listarPessoas();
      setPessoas(pessoasData);
      console.log('Pessoas carregadas via React:', pessoasData);
    } catch (err) {
      setError('Erro ao carregar pessoas. Verifique se o backend está rodando na porta 8080.');
      console.error('Erro ao carregar pessoas:', err);
    } finally {
      setLoading(false);
    }
  };

  const adicionarPessoa = async (novaPessoa) => {
    try {
      const pessoaCriada = await PessoaService.criarPessoa(novaPessoa);
      setPessoas([...pessoas, pessoaCriada]);
      console.log('Nova pessoa criada via React:', pessoaCriada);
      return pessoaCriada;
    } catch (err) {
      setError('Erro ao criar pessoa.');
      console.error('Erro ao criar pessoa:', err);
      throw err;
    }
  };

  const deletarPessoa = async (id) => {
    try {
      await PessoaService.deletarPessoa(id);
      setPessoas(pessoas.filter(p => p.id !== id));
      console.log(`Pessoa com ID ${id} deletada via React`);
    } catch (err) {
      setError('Erro ao deletar pessoa.');
      console.error('Erro ao deletar pessoa:', err);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <h1 className="text-center mb-4">
            <i className="fas fa-users me-2"></i>
            Cliente React - API REST Pessoas
          </h1>
          
          {error && (
            <div className="alert alert-danger" role="alert">
              <i className="fas fa-exclamation-triangle me-2"></i>
              {error}
              <button 
                type="button" 
                className="btn-close ms-2" 
                onClick={() => setError(null)}
                aria-label="Close"
              ></button>
            </div>
          )}

          <div className="row">
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <h5 className="mb-0">
                    <i className="fas fa-plus me-2"></i>
                    Adicionar Nova Pessoa
                  </h5>
                </div>
                <div className="card-body">
                  <PessoaFormulario onAdicionar={adicionarPessoa} />
                </div>
              </div>
            </div>
            
            <div className="col-md-6">
              <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">
                    <i className="fas fa-list me-2"></i>
                    Lista de Pessoas ({pessoas.length})
                  </h5>
                  <button 
                    className="btn btn-outline-primary btn-sm"
                    onClick={carregarPessoas}
                    disabled={loading}
                  >
                    <i className="fas fa-sync-alt me-1"></i>
                    {loading ? 'Carregando...' : 'Atualizar'}
                  </button>
                </div>
                <div className="card-body">
                  <PessoaLista 
                    pessoas={pessoas} 
                    onDeletar={deletarPessoa}
                    loading={loading}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <div className="alert alert-info" role="alert">
              <h6><i className="fas fa-info-circle me-2"></i>Informações da Aplicação</h6>
              <p className="mb-1"><strong>Backend:</strong> Spring Boot (Porta 8080)</p>
              <p className="mb-1"><strong>Frontend:</strong> React (Porta 3000)</p>
              <p className="mb-0"><strong>Banco:</strong> PostgreSQL via Docker</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
