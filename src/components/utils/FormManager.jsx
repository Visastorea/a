// Sistema de gerenciamento de formulário para base44
export class VisaFormManager {
  constructor() {
    this.currentStep = 1;
    this.totalSteps = 11;
    this.formData = {
      personal_info: {},
      parents_info: {},
      present_address: {},
      passport_info: {},
      profession_details: {},
      applicant_details: {},
      previous_visa_info: {},
      other_info: {},
      reference_india: {},
      reference_own_country: {},
      documents: {}
    };
    this.isLoading = false;
  }

  // Salvar dados automaticamente
  async autoSave() {
    try {
      localStorage.setItem('visa_form_draft', JSON.stringify(this.formData));
      console.log('Dados salvos automaticamente');
    } catch (error) {
      console.error('Erro ao salvar:', error);
    }
  }

  // Recuperar dados salvos
  loadSavedData() {
    try {
      const saved = localStorage.getItem('visa_form_draft');
      if (saved) {
        this.formData = { ...this.formData, ...JSON.parse(saved) };
        return true;
      }
    } catch (error) {
      console.error('Erro ao carregar dados salvos:', error);
    }
    return false;
  }

  // Atualizar dados de uma seção
  updateSection(section, data) {
    this.formData[section] = { ...this.formData[section], ...data };
    this.autoSave();
  }

  // Formatação de dados para email
  formatForEmail() {
    const { personal_info, present_address, passport_info, applicant_details } = this.formData;
    
    return `
NOVO PEDIDO DE E-VISA PARA ÍNDIA

DADOS PESSOAIS:
Nome: ${personal_info.given_name || 'N/A'} ${personal_info.surname || 'N/A'}
Data de Nascimento: ${personal_info.date_of_birth || 'N/A'}
Nacionalidade: ${personal_info.citizenship || 'N/A'}
Gênero: ${personal_info.gender || 'N/A'}

CONTATO:
Email: ${present_address.email || 'N/A'}
Celular: ${present_address.mobile || 'N/A'}
Endereço: ${present_address.house_no_street || 'N/A'}, ${present_address.village_town_city || 'N/A'}, ${present_address.state_province || 'N/A'}

PASSAPORTE:
Número: ${passport_info.passport_number || 'N/A'}
Tipo: ${passport_info.passport_type || 'N/A'}
Validade: ${passport_info.date_of_expiry || 'N/A'}
Local de Emissão: ${passport_info.place_of_issue || 'N/A'}

VIAGEM:
Tipo de Visto: ${applicant_details.visa_type || 'N/A'}
Porto de Chegada: ${applicant_details.port_of_arrival || 'N/A'}
Data de Chegada: ${applicant_details.expected_date_of_arrival || 'N/A'}
Data de Saída: ${applicant_details.expected_date_of_departure || 'N/A'}

Data do Pedido: ${new Date().toLocaleString('pt-BR')}
    `;
  }

  // Enviar formulário final
  async submitForm() {
    this.isLoading = true;
    
    try {
      const emailData = {
        to: 'suporte@visastore.tur.br',
        subject: `Novo Pedido de e-Visa Índia - ${this.formData.personal_info.given_name || 'Cliente'}`,
        body: this.formatForEmail(),
        attachments: [
          this.formData.documents.photo_url,
          this.formData.documents.passport_copy_url
        ].filter(Boolean)
      };

      await this.sendEmail(emailData);
      localStorage.removeItem('visa_form_draft');
      
      return { success: true, message: 'Pedido enviado com sucesso!' };
    } catch (error) {
      console.error('Erro ao enviar pedido:', error);
      return { success: false, message: 'Erro ao enviar pedido. Tente novamente.' };
    } finally {
      this.isLoading = false;
    }
  }

  async sendEmail(data) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Email enviado:', data);
        resolve(true);
      }, 2000);
    });
  }
}

// Formatadores para campos brasileiros
export const formatters = {
  phone: (value) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length <= 10) {
      return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  },

  cep: (value) => {
    const cleaned = value.replace(/\D/g, '');
    return cleaned.replace(/(\d{5})(\d{3})/, '$1-$2');
  },

  cpf: (value) => {
    const cleaned = value.replace(/\D/g, '');
    return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  },

  passport: (value) => {
    return value.toUpperCase().replace(/[^A-Z0-9]/g, '');
  }
};

// Validadores
export const validators = {
  email: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  },

  phone: (value) => {
    const cleaned = value.replace(/\D/g, '');
    return cleaned.length >= 10 && cleaned.length <= 11;
  },

  cep: (value) => {
    const cleaned = value.replace(/\D/g, '');
    return cleaned.length === 8;
  },

  passport: (value) => {
    const passportRegex = /^[A-Z]{2}\d{6}$/;
    return passportRegex.test(value);
  },

  date: (value, minDate = null, maxDate = null) => {
    const date = new Date(value);
    
    if (isNaN(date.getTime())) return false;
    
    if (minDate && date < new Date(minDate)) return false;
    if (maxDate && date > new Date(maxDate)) return false;
    
    return true;
  }
};