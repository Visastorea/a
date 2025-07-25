<template>
  <div class="card-container">
    <div class="card-header">
      <div class="header-content">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"></path>
          <polyline points="7,10 12,15 17,10"></polyline>
          <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg>
        <h2>Upload de Documentos</h2>
      </div>
    </div>
    
    <div class="card-content">
      <div class="upload-grid">
        <div class="upload-card">
          <div class="upload-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21,15 16,10 5,21"></polyline>
            </svg>
          </div>
          
          <h3>Sua Foto 3x4</h3>
          <p>Foto recente, com fundo branco, estilo passaporte.</p>
          
          <div class="requirements">
            <p>• Formato: JPEG ou PNG</p>
            <p>• Tamanho: 10KB a 1MB</p>
            <p>• Dimensões mínimas: 350x350 pixels</p>
            <p>• Rosto nítido e centralizado</p>
          </div>

          <div v-if="photoPreview || documents.photo_url" class="preview-container">
            <div class="preview-header">
              <div class="success-indicator">
                <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polyline points="20,6 9,17 4,12"></polyline>
                </svg>
                <span>Arquivo carregado</span>
              </div>
              <div class="preview-actions">
                <button v-if="photoPreview" v-on:click="viewPhoto" class="preview-btn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </button>
                <button v-on:click="removePhoto" class="remove-btn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <polyline points="3,6 5,6 21,6"></polyline>
                    <path d="M19,6v14a2,2 0,0,1-2,2H7a2,2 0,0,1-2-2V6m3,0V4a2,2 0,0,1,2-2h4a2,2 0,0,1,2,2v2"></path>
                  </svg>
                </button>
              </div>
            </div>
            <img v-if="photoPreview" v-bind:src="photoPreview" alt="Pré-visualização" class="preview-image">
          </div>

          <div class="upload-button-container">
            <input
              ref="photoInput"
              type="file"
              accept="image/jpeg,image/png"
              v-on:change="handlePhotoUpload"
              class="hidden-input"
            >
            <button
              v-on:click="$refs.photoInput.click()"
              v-bind:disabled="uploadingPhoto"
              class="upload-button"
              v-bind:class="{ 'secondary': documents.photo_url }"
            >
              <div v-if="uploadingPhoto" class="spinner"></div>
              <svg v-else class="upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"></path>
                <polyline points="7,10 12,15 17,10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              {{ uploadingPhoto ? 'Enviando...' : (documents.photo_url ? 'Substituir Arquivo' : 'Selecionar Arquivo') }}
            </button>
          </div>
        </div>

        <div class="upload-card">
          <div class="upload-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"></path>
            </svg>
          </div>
          
          <h3>Cópia do Passaporte</h3>
          <p>Página com seus dados pessoais (foto, nome, etc).</p>
          
          <div class="requirements">
            <p>• Formato: PDF, JPEG ou PNG</p>
            <p>• Tamanho: 10KB a 300KB</p>
            <p>• Digitalização nítida e legível</p>
            <p>• Todas as informações visíveis</p>
          </div>

          <div v-if="passportPreview || documents.passport_copy_url" class="preview-container">
            <div class="preview-header">
              <div class="success-indicator">
                <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polyline points="20,6 9,17 4,12"></polyline>
                </svg>
                <span>Arquivo carregado</span>
              </div>
              <div class="preview-actions">
                <button v-if="passportPreview" v-on:click="viewPassport" class="preview-btn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </button>
                <button v-on:click="removePassport" class="remove-btn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <polyline points="3,6 5,6 21,6"></polyline>
                    <path d="M19,6v14a2,2 0,0,1-2,2H7a2,2 0,0,1-2-2V6m3,0V4a2,2 0,0,1,2-2h4a2,2 0,0,1,2,2v2"></path>
                  </svg>
                </button>
              </div>
            </div>
            <img v-if="passportPreview" v-bind:src="passportPreview" alt="Pré-visualização" class="preview-image">
          </div>

          <div class="upload-button-container">
            <input
              ref="passportInput"
              type="file"
              accept="image/jpeg,image/png,application/pdf"
              v-on:change="handlePassportUpload"
              class="hidden-input"
            >
            <button
              v-on:click="$refs.passportInput.click()"
              v-bind:disabled="uploadingPassport"
              class="upload-button"
              v-bind:class="{ 'secondary': documents.passport_copy_url }"
            >
              <div v-if="uploadingPassport" class="spinner"></div>
              <svg v-else class="upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"></path>
                <polyline points="7,10 12,15 17,10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              {{ uploadingPassport ? 'Enviando...' : (documents.passport_copy_url ? 'Substituir Arquivo' : 'Selecionar Arquivo') }}
            </button>
          </div>
        </div>
      </div>

      <div class="info-box">
        <h4>Requisitos Importantes:</h4>
        <ul>
          <li>Todos os documentos devem estar em formato digital.</li>
          <li>As imagens precisam ter boa qualidade e ser legíveis.</li>
          <li>Não são aceitos documentos com marcas d'água ou edições.</li>
          <li>A foto deve seguir os padrões internacionais para documentos.</li>
          <li>Você pode substituir os arquivos até o envio final do pedido.</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DocumentUpload',
  props: {
    initialData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      documents: { ...this.initialData },
      uploadingPhoto: false,
      uploadingPassport: false,
      photoPreview: null,
      passportPreview: null
    }
  },
  methods: {
    async handlePhotoUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      if (!this.validateFile(file, 'photo')) return;

      this.uploadingPhoto = true;
      this.showToast('Iniciando upload da foto...', 'info');

      try {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.photoPreview = e.target.result;
        };
        reader.readAsDataURL(file);

        const fileUrl = await this.uploadFile(file);
        
        this.documents.photo_url = fileUrl;
        this.updateData();
        
        this.showToast('Foto enviada com sucesso!', 'success');
      } catch (error) {
        this.showToast('Erro ao enviar foto. Tente novamente.', 'error');
      }
      
      this.uploadingPhoto = false;
    },

    async handlePassportUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      if (!this.validateFile(file, 'passport')) return;

      this.uploadingPassport = true;
      this.showToast('Iniciando upload do passaporte...', 'info');

      try {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.passportPreview = e.target.result;
          };
          reader.readAsDataURL(file);
        }

        const fileUrl = await this.uploadFile(file);
        
        this.documents.passport_copy_url = fileUrl;
        this.updateData();
        
        this.showToast('Documento do passaporte enviado com sucesso!', 'success');
      } catch (error) {
        this.showToast('Erro ao enviar documento. Tente novamente.', 'error');
      }
      
      this.uploadingPassport = false;
    },

    validateFile(file, type) {
      const allowedTypes = {
        photo: ['image/jpeg', 'image/jpg', 'image/png'],
        passport: ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf']
      };
      
      const maxSizes = {
        photo: 1 * 1024 * 1024,
        passport: 300 * 1024
      };

      if (!allowedTypes[type].includes(file.type)) {
        this.showToast(
          `Formato inválido para ${type === 'photo' ? 'foto' : 'passaporte'}. Use apenas: ${allowedTypes[type].map(t => t.split('/')[1].toUpperCase()).join(', ')}`,
          'error'
        );
        return false;
      }

      if (file.size > maxSizes[type]) {
        this.showToast(
          `Arquivo muito grande. Máximo permitido: ${type === 'photo' ? '1MB' : '300KB'}`,
          'error'
        );
        return false;
      }

      return true;
    },

    async uploadFile(file) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(`https://example.com/uploads/${file.name}`);
        }, 2000);
      });
    },

    removePhoto() {
      this.documents.photo_url = null;
      this.photoPreview = null;
      this.updateData();
      this.showToast('Foto removida com sucesso.', 'info');
    },

    removePassport() {
      this.documents.passport_copy_url = null;
      this.passportPreview = null;
      this.updateData();
      this.showToast('Documento do passaporte removido com sucesso.', 'info');
    },

    viewPhoto() {
      if (this.photoPreview) {
        window.open(this.photoPreview, '_blank');
      }
    },

    viewPassport() {
      if (this.passportPreview) {
        window.open(this.passportPreview, '_blank');
      }
    },

    updateData() {
      this.$emit('update', 'documents', this.documents);
    },

    showToast(message, type = 'info') {
      this.$emit('toast', { message, type });
    }
  },
  watch: {
    initialData: {
      handler(newData) {
        this.documents = { ...newData };
      },
      deep: true
    }
  }
}
</script>

<style scoped>
.card-container {
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 2rem;
}

.card-header {
  background: linear-gradient(135deg, #6366F1, #8B5CF6);
  color: white;
  padding: 1.5rem;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.icon {
  width: 1.25rem;
  height: 1.25rem;
}

.header-content h2 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
}

.card-content {
  padding: 2rem;
}

.upload-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.upload-card {
  border: 2px dashed #E5E7EB;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.upload-card:hover {
  border-color: #FF6B35;
  background-color: #FFF7F0;
}

.upload-icon {
  width: 3rem;
  height: 3rem;
  margin: 0 auto 1rem;
  color: #9CA3AF;
}

.upload-card h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.5rem;
}

.upload-card p {
  color: #6B7280;
  font-size: 0.875rem;
  margin-bottom: 1rem;
}

.requirements {
  text-align: left;
  margin-bottom: 1.5rem;
}

.requirements p {
  font-size: 0.75rem;
  color: #6B7280;
  margin: 0.25rem 0;
}

.preview-container {
  background: #F9FAFB;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.success-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #10B981;
  font-size: 0.875rem;
  font-weight: 500;
}

.check-icon {
  width: 1rem;
  height: 1rem;
}

.preview-actions {
  display: flex;
  gap: 0.5rem;
}

.preview-btn,
.remove-btn {
  padding: 0.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.preview-btn {
  background: #E5E7EB;
  color: #6B7280;
}

.preview-btn:hover {
  background: #D1D5DB;
}

.remove-btn {
  background: #FEE2E2;
  color: #EF4444;
}

.remove-btn:hover {
  background: #FECACA;
}

.preview-btn svg,
.remove-btn svg {
  width: 1rem;
  height: 1rem;
}

.preview-image {
  max-height: 8rem;
  max-width: 100%;
  border-radius: 6px;
  object-fit: cover;
}

.upload-button-container {
  margin-top: auto;
}

.hidden-input {
  display: none;
}

.upload-button {
  width: 100%;
  padding: 0.75rem 1.5rem;
  background: #FF6B35;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.upload-button:hover:not(:disabled) {
  background: #E55A2B;
}

.upload-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.upload-button.secondary {
  background: #6B7280;
}

.upload-button.secondary:hover:not(:disabled) {
  background: #4B5563;
}

.upload-icon {
  width: 1rem;
  height: 1rem;
}

.spinner {
  width: 1rem;
  height: 1rem;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.info-box {
  background: #EBF8FF;
  border: 1px solid #BEE3F8;
  border-radius: 8px;
  padding: 1.5rem;
}

.info-box h4 {
  color: #2B6CB0;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.info-box ul {
  list-style: disc;
  padding-left: 1.5rem;
  color: #2C5282;
}

.info-box li {
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
}

@media (max-width: 768px) {
  .upload-grid {
    grid-template-columns: 1fr;
  }
  
  .card-content {
    padding: 1rem;
  }
  
  .upload-card {
    padding: 1.5rem;
  }
}
</style>