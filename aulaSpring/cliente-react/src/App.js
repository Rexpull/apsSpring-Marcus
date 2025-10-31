import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import PessoaLista from './components/PessoaLista';
import PessoaFormulario from './components/PessoaFormulario';
import PessoaService from './services/PessoaService';

function App() {
  const [pessoas, setPessoas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('listar');

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
    <div>
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center mb-4">
              
              Sistema de Gerenciamento de Pessoas
            </h1>
          
          {error && (
            <div className="alert alert-danger">
              <i className="fas fa-exclamation-triangle"></i>
              {error}
              <button 
                type="button" 
                onClick={() => setError(null)}
                style={{ background: 'none', border: 'none', float: 'right', cursor: 'pointer' }}
              >
                ×
              </button>
            </div>
          )}

          {activeTab === 'cadastrar' && (
            <div className="row justify-content-center">
              <div className="col-md-8">
                <div className="card">
                  <div className="card-header bg-primary">
                    <h5>
                      <i className="fas fa-plus"></i>
                      Cadastrar Nova Pessoa
                    </h5>
                  </div>
                  <div className="card-body">
                    <PessoaFormulario onAdicionar={adicionarPessoa} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'listar' && (
            <div className="row justify-content-center">
              <div className="col-md-10">
                <div className="card">
                  <div className="card-header bg-info">
                    <h5>
                      <i className="fas fa-list"></i>
                      Lista de Pessoas ({pessoas.length})
                    </h5>
                    <button 
                      className="btn btn-light btn-sm"
                      onClick={carregarPessoas}
                      disabled={loading}
                    >
                      <i className="fas fa-sync-alt"></i>
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
          )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
