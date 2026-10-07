// ===== Captura de elementos =====
const form = document.getElementById('cadastroForm');
const campoNome = document.getElementById('nome');
const campoEmail = document.getElementById('email');
const campoSenha = document.getElementById('senha');
const campoConfirma = document.getElementById('confirmaSenha');
const campoPerfil = document.getElementById('perfil');
const campoTermos = document.getElementById('termos');
const mensagem = document.getElementById('mensagem');

const painelVazio = document.getElementById('painel-vazio');
const painelDados = document.getElementById('painel-dados');

// ===== Funções auxiliares =====

// Mostra a mensagem de erro abaixo do campo
function mostrarErro(campo, texto) {
  document.getElementById('erro-' + campo.id).textContent = texto;
  campo.closest('.campo').classList.add('invalido');
}

// Remove o erro de um campo
function limparErro(campo) {
  document.getElementById('erro-' + campo.id).textContent = '';
  campo.closest('.campo').classList.remove('invalido');
}

function emailValido(valor) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
}

// Valida todos os campos. Retorna true se estiver tudo correto.
function validar(dados) {
  let valido = true;

  [campoNome, campoEmail, campoSenha, campoConfirma, campoPerfil, campoTermos].forEach(limparErro);

  if (dados.nome === '') {
    mostrarErro(campoNome, 'Informe seu nome completo.');
    valido = false;
  } else if (dados.nome.split(/\s+/).length < 2) {
    mostrarErro(campoNome, 'Digite nome e sobrenome.');
    valido = false;
  }

  if (dados.email === '') {
    mostrarErro(campoEmail, 'Informe seu e-mail institucional.');
    valido = false;
  } else if (!emailValido(dados.email)) {
    mostrarErro(campoEmail, 'Formato de e-mail inválido. Exemplo: nome@escola.edu.br');
    valido = false;
  }

  if (dados.senha === '') {
    mostrarErro(campoSenha, 'Crie uma senha de acesso.');
    valido = false;
  } else if (dados.senha.length < 6) {
    mostrarErro(campoSenha, 'A senha deve ter no mínimo 6 caracteres.');
    valido = false;
  }

  if (dados.confirma === '') {
    mostrarErro(campoConfirma, 'Confirme a senha.');
    valido = false;
  } else if (dados.senha !== dados.confirma) {
    mostrarErro(campoConfirma, 'As senhas não conferem.');
    valido = false;
  }

  if (dados.perfil === '') {
    mostrarErro(campoPerfil, 'Selecione um perfil técnico.');
    valido = false;
  }

  if (!dados.termos) {
    mostrarErro(campoTermos, 'Você precisa aceitar os termos de uso.');
    valido = false;
  }

  return valido;
}

// ===== Evento de envio =====
form.addEventListener('submit', function (evento) {
  // Impede o recarregamento da página (submissão padrão)
  evento.preventDefault();

  const dados = {
    nome: campoNome.value.trim(),
    email: campoEmail.value.trim(),
    senha: campoSenha.value,
    confirma: campoConfirma.value,
    perfil: campoPerfil.value,
    termos: campoTermos.checked
  };

  mensagem.textContent = '';
  mensagem.className = 'mensagem';

  if (!validar(dados)) {
    mensagem.textContent = 'Corrija os campos destacados e tente novamente.';
    mensagem.classList.add('falha');
    return;
  }

  // Atualização dinâmica do painel (a senha nunca é exibida)
  document.getElementById('saidaNome').innerText = dados.nome;
  document.getElementById('saidaEmail').innerText = dados.email;
  document.getElementById('saidaPerfil').innerText = dados.perfil;
  document.getElementById('saidaTermos').innerText = 'Aceito';

  painelVazio.classList.add('oculto');
  painelDados.classList.remove('oculto');

  form.reset();
  mensagem.textContent = 'Cadastro realizado com sucesso!';
  mensagem.classList.add('sucesso');
});

// Limpa o erro de cada campo assim que o usuário corrige
[campoNome, campoEmail, campoSenha, campoConfirma].forEach(function (campo) {
  campo.addEventListener('input', function () { limparErro(campo); });
});
campoPerfil.addEventListener('change', function () { limparErro(campoPerfil); });
campoTermos.addEventListener('change', function () { limparErro(campoTermos); });
