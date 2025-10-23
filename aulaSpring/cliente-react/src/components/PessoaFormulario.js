import React, { useState } from 'react';

const PessoaFormulario = ({ onAdicionar }) => {
  const [formData, setFormData] = useState({
    nome: '',
    idade: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpar mensagens de erro/sucesso quando o usuário digita
    if (error) setError(null);
    if (success) setSuccess(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validação básica
    if (!formData.nome.trim()) {
      setError('Nome é obrigatório');
      return;
    }
    
    if (!formData.idade || formData.idade <= 0) {
      setError('Idade deve ser um número positivo');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const novaPessoa = {
        nome: formData.nome.trim(),
        idade: parseInt(formData.idade)
      };
      
      await onAdicionar(novaPessoa);
      
      // Limpar formulário após sucesso
      setFormData({ nome: '', idade: '' });
      setSuccess('Pessoa adicionada com sucesso!');
      
      // Limpar mensagem de sucesso após 3 segundos
      setTimeout(() => setSuccess(null), 3000);
      
    } catch (err) {
      setError('Erro ao adicionar pessoa. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="alert alert-danger" role="alert">
          <i className="fas fa-exclamation-triangle me-2"></i>
          {error}
        </div>
      )}
      
      {success && (
        <div className="alert alert-success" role="alert">
          <i className="fas fa-check-circle me-2"></i>
          {success}
        </div>
      )}

      <div className="mb-3">
        <label htmlFor="nome" className="form-label">
          <i className="fas fa-user me-2"></i>
          Nome *
        </label>
        <input
          type="text"
          className="form-control"
          id="nome"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          placeholder="Digite o nome da pessoa"
          disabled={loading}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="idade" className="form-label">
          <i className="fas fa-birthday-cake me-2"></i>
          Idade *
        </label>
        <input
          type="number"
          className="form-control"
          id="idade"
          name="idade"
          value={formData.idade}
          onChange={handleChange}
          placeholder="Digite a idade"
          min="1"
          max="150"
          disabled={loading}
          required
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary w-100"
        disabled={loading || !formData.nome.trim() || !formData.idade}
      >
        {loading ? (
          <>
            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            Adicionando...
          </>
        ) : (
          <>
            <i className="fas fa-plus me-2"></i>
            Adicionar Pessoa
          </>
        )}
      </button>

      <div className="mt-3">
        <small className="text-muted">
          <i className="fas fa-info-circle me-1"></i>
          Os dados serão salvos no banco PostgreSQL via API REST
        </small>
      </div>
    </form>
  );
};

export default PessoaFormulario;
