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
        <div className="alert alert-danger" style={{ borderRadius: '8px', border: 'none' }}>
          <i className="fas fa-times-circle me-2"></i>
          <strong>Erro:</strong> {error}
        </div>
      )}
      
      {success && (
        <div className="alert alert-success" style={{ borderRadius: '8px', border: 'none' }}>
          <i className="fas fa-check me-2"></i>
          <strong>Sucesso!</strong> {success}
        </div>
      )}

      <div className="mb-3">
        <label htmlFor="nome" className="form-label fw-semibold" style={{ color: '#495057', marginBottom: '0.5rem' }}>
          <i className="fas fa-id-card me-2 text-primary"></i>
          Nome Completo <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          className="form-control"
          id="nome"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          placeholder="Informe o nome completo"
          disabled={loading}
          style={{ borderRadius: '6px', padding: '0.75rem' }}
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="idade" className="form-label fw-semibold" style={{ color: '#495057', marginBottom: '0.5rem' }}>
          <i className="fas fa-calendar-alt me-2 text-primary"></i>
          Idade <span className="text-danger">*</span>
        </label>
        <input
          type="number"
          className="form-control"
          id="idade"
          name="idade"
          value={formData.idade}
          onChange={handleChange}
          placeholder="Informe a idade"
          min="1"
          max="150"
          disabled={loading}
          style={{ borderRadius: '6px', padding: '0.75rem' }}
          required
        />
        <small className="form-text text-muted" style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}>
          Idade deve ser um valor entre 1 e 150 anos
        </small>
      </div>

      <button
        type="submit"
        className="btn btn-primary w-100"
        style={{ 
          borderRadius: '8px',
          padding: '0.75rem',
          fontSize: '1rem',
          fontWeight: '600',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}
        disabled={loading || !formData.nome.trim() || !formData.idade}
      >
        {loading ? (
          <>
            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            Salvando...
          </>
        ) : (
          <>
            <i className="fas fa-save me-2"></i>
            Salvar Registro
          </>
        )}
      </button>

      <div style={{ marginTop: '1rem' }}>
      </div>
    </form>
  );
};

export default PessoaFormulario;
