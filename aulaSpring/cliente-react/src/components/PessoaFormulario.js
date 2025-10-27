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
    
    if (error) setError(null);
    if (success) setSuccess(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
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
      
      setFormData({ nome: '', idade: '' });
      setSuccess('Pessoa adicionada com sucesso!');
      
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
        <div className="alert alert-danger">
          <i className="fas fa-exclamation-triangle"></i>
          {error}
        </div>
      )}
      
      {success && (
        <div className="alert alert-success">
          <i className="fas fa-check-circle"></i>
          {success}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="nome" className="form-label">
          <i className="fas fa-user"></i>
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

      <div className="form-group">
        <label htmlFor="idade" className="form-label">
          <i className="fas fa-birthday-cake"></i>
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
        className="btn btn-primary"
        style={{ width: '100%' }}
        disabled={loading || !formData.nome.trim() || !formData.idade}
      >
        {loading ? (
          <>
            <div className="spinner"></div>
            Adicionando...
          </>
        ) : (
          <>
            <i className="fas fa-plus"></i>
            Adicionar Pessoa
          </>
        )}
      </button>

      <div style={{ marginTop: '1rem' }}>
      </div>
    </form>
  );
};

export default PessoaFormulario;
