<template>
  <div class="card-container">
    <div class="card-header">
      <div class="header-content">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
        <h2>Dados Pessoais</h2>
      </div>
    </div>
    
    <div class="card-content">
      <div class="form-grid">
        <div class="form-group">
          <label for="surname">Sobrenome (conforme passaporte) *</label>
          <input
            id="surname"
            v-model="formData.surname"
            type="text"
            placeholder="Sobrenome"
            class="form-input"
            v-on:input="updateData"
          />
        </div>

        <div class="form-group">
          <label for="given_name">Nome (conforme passaporte) *</label>
          <input
            id="given_name"
            v-model="formData.given_name"
            type="text"
            placeholder="Nome"
            class="form-input"
            v-on:input="updateData"
          />
        </div>

        <div class="form-group full-width">
          <label for="other_names">Outros nomes ou nomes anteriores (se houver)</label>
          <input
            id="other_names"
            v-model="formData.other_names"
            type="text"
            placeholder="Nomes anteriores ou outros nomes conhecidos"
            class="form-input"
            v-on:input="updateData"
          />
        </div>

        <div class="form-group">
          <label for="date_of_birth">Data de Nascimento *</label>
          <input
            id="date_of_birth"
            v-model="formData.date_of_birth"
            type="date"
            v-bind:max="today"
            class="form-input"
            v-on:change="updateData"
          />
        </div>

        <div class="form-group">
          <label for="town_city_birth">Cidade de Nascimento *</label>
          <input
            id="town_city_birth"
            v-model="formData.town_city_birth"
            type="text"
            placeholder="Cidade onde nasceu"
            class="form-input"
            v-on:input="updateData"
          />
        </div>

        <div class="form-group">
          <label for="country_birth">País de Nascimento *</label>
          <select
            id="country_birth"
            v-model="formData.country_birth"
            class="form-select"
            v-on:change="updateData"
          >
            <option value="">Selecione o país</option>
            <option value="Brasil">Brasil</option>
            <option value="Argentina">Argentina</option>
            <option value="Estados Unidos">Estados Unidos</option>
            <option value="Portugal">Portugal</option>
            <option value="outros">Outros</option>
          </select>
        </div>

        <div class="form-group">
          <label for="citizenship">Cidadania/Nacionalidade *</label>
          <select
            id="citizenship"
            v-model="formData.citizenship"
            class="form-select"
            v-on:change="updateData"
          >
            <option value="">Selecione a nacionalidade</option>
            <option value="Brasileira">Brasileira</option>
            <option value="Argentina">Argentina</option>
            <option value="Americana">Americana</option>
            <option value="Portuguesa">Portuguesa</option>
            <option value="outros">Outros</option>
          </select>
        </div>

        <div v-if="showNaturalizationField" class="form-group">
          <label for="nationality_residence">Nacionalidade por nascimento ou naturalização *</label>
          <select
            id="nationality_residence"
            v-model="formData.nationality_residence"
            class="form-select"
            v-on:change="updateData"
          >
            <option value="">Selecione</option>
            <option value="nascimento">Por nascimento</option>
            <option value="naturalizacao">Por naturalização</option>
          </select>
        </div>

        <div class="form-group">
          <label>Gênero *</label>
          <div class="radio-group">
            <label class="radio-option">
              <input
                v-model="formData.gender"
                type="radio"
                value="male"
                v-on:change="updateData"
              />
              Masculino
            </label>
            <label class="radio-option">
              <input
                v-model="formData.gender"
                type="radio"
                value="female"
                v-on:change="updateData"
              />
              Feminino
            </label>
            <label class="radio-option">
              <input
                v-model="formData.gender"
                type="radio"
                value="transgender"
                v-on:change="updateData"
              />
              Transgênero
            </label>
          </div>
        </div>

        <div class="form-group">
          <label for="religion">Religião *</label>
          <input
            id="religion"
            v-model="formData.religion"
            type="text"
            placeholder="Sua religião"
            class="form-input"
            v-on:input="updateData"
          />
        </div>

        <div class="form-group">
          <label for="educational_qualification">Qualificação Educacional *</label>
          <select
            id="educational_qualification"
            v-model="formData.educational_qualification"
            class="form-select"
            v-on:change="updateData"
          >
            <option value="">Selecione sua qualificação</option>
            <option value="below_matriculation">Abaixo do Ensino Médio</option>
            <option value="matriculation">Ensino Médio</option>
            <option value="higher_secondary">Ensino Médio Superior</option>
            <option value="diploma">Diploma/Técnico</option>
            <option value="graduate">Graduação</option>
            <option value="post_graduate">Pós-graduação</option>
            <option value="doctorate">Doutorado</option>
            <option value="others">Outros</option>
          </select>
        </div>

        <div class="form-group full-width">
          <label for="visible_identification_marks">Marcas de identificação visíveis</label>
          <input
            id="visible_identification_marks"
            v-model="formData.visible_identification_marks"
            type="text"
            placeholder="Ex: cicatriz no braço direito, tatuagem, etc."
            class="form-input"
            v-on:input="updateData"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PersonalInfoForm',
  props: {
    initialData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      formData: { ...this.initialData },
      today: new Date().toISOString().split('T')[0]
    }
  },
  computed: {
    showNaturalizationField() {
      return this.formData.citizenship && 
             this.formData.citizenship.toLowerCase() !== 'brasileira' && 
             this.formData.country_birth && 
             this.formData.country_birth.toLowerCase() !== 'brasil';
    }
  },
  methods: {
    updateData() {
      this.$emit('update', 'personal_info', this.formData);
    }
  },
  watch: {
    initialData: {
      handler(newData) {
        this.formData = { ...newData };
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
  background: linear-gradient(135deg, #FF6B35, #FF8C42);
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

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-group label {
  font-weight: 500;
  color: #374151;
  font-size: 0.875rem;
}

.form-input,
.form-select {
  padding: 0.75rem;
  border: 1px solid #D1D5DB;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s;
}

.form-input:focus,
.form-select:focus {
  outline: none;
  border-color: #FF6B35;
  box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
}

.radio-group {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.radio-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 0.875rem;
}

.radio-option input[type="radio"] {
  margin: 0;
}

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .card-content {
    padding: 1rem;
  }
}
</style>