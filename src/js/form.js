document.addEventListener('DOMContentLoaded', function () {
  // 1. Seleciona o formulário pelo ID (Certifique-se que o ID no HTML é 'formContato')
  const form = document.getElementById('formContato');

  // 2. Verifica se o formulário existe na página
  if (form) {
    // Seleciona o botão de submit (pode ser necessário ajustar a classe se o nome for diferente)
    const submitButton = form.querySelector('button[type="submit"]');
    // Seleciona o elemento para feedback (Status Message)
    // Você precisa ter um <p id="statusMessage"></p> dentro do seu form ou logo após ele no HTML.
    const statusMessage = document.getElementById('statusMessage');

    // Adiciona o listener de evento para quando o formulário for submetido
    form.addEventListener("submit", function (event) {
      // Impede o comportamento padrão de recarregar a página
      event.preventDefault();

      // --- Feedback de Processamento ---
      submitButton.disabled = true;
      submitButton.textContent = 'Enviando...';

      if (statusMessage) {
        statusMessage.textContent = 'Processando sua solicitação...';
        statusMessage.style.color = '#013440'; // Cor do texto principal (ajuste conforme seu CSS)
      }

      // Coleta os dados do formulário
      const data = new FormData(event.target);

      // 3. Faz a requisição AJAX usando o método fetch para o Formspree
      fetch(event.target.action, {
        method: form.method,
        body: data,
        // O header Accept é crucial para que o Formspree retorne JSON em vez de redirecionar
        headers: {
          'Accept': 'application/json'
        }
      })
        .then(response => {
          // Habilita o botão e reseta o texto
          submitButton.disabled = false;
          submitButton.textContent = 'Enviar'; // Ou "Solicitar Diagnóstico", ajuste o texto

          if (response.ok) {
            // 4. Sucesso: Mostra mensagem, limpa o formulário
            if (statusMessage) {
              statusMessage.textContent = 'Diagnóstico solicitado com sucesso! Entraremos em contato em breve.';
              statusMessage.style.color = '#00A8A8'; // Cor de sucesso (principal)
            }
            form.reset(); // Limpa os campos
          } else {
            // 5. Erro: Trata a resposta de erro
            if (statusMessage) {
              response.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                  // Erros específicos do Formspree
                  statusMessage.textContent = data["errors"].map(error => error["message"]).join(", ");
                } else {
                  statusMessage.textContent = 'Oops! Não foi possível enviar sua mensagem. Tente novamente ou use o WhatsApp.';
                }
                statusMessage.style.color = '#6A00F4'; // Cor de erro (secundária/hover)
              })
            }
          }
        })
        .catch(error => {
          // 6. Erro de rede/conexão
          submitButton.disabled = false;
          submitButton.textContent = 'Enviar';
          if (statusMessage) {
            statusMessage.textContent = 'Erro de conexão. Por favor, verifique sua rede ou tente mais tarde.';
            statusMessage.style.color = '#6A00F4';
          }
        });
    });
  }
});