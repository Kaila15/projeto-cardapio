
//mudar dia para data atual
async function fetchCardapios() {
    try {
        //const url = 'https://api-cantina-storage.vercel.app/cardapios'
        const url = './cardapios.json'
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json()
        return data

    } catch (error) {
        console.error('Erro ao buscar cardápios:', error);
    }
}
//tratar data
function organizarRotina(cardapio) {
    
    const hoje = new Date(cardapio.data)


    return {
        dia: hoje.toLocaleDateString('pt-BR', { weekday: 'long' }),
        data: hoje.toLocaleDateString('pt-BR'),
        turno: cardapio.turno
    }

}

function verificarTurnoAtual() {
    const agora = new Date().getHours() * 60 + new Date().getMinutes()

    if (agora > 570 && agora < 720) return 'integral' // 12h
    if (agora >= 720 && agora < 840) return 'tarde' // 14h
    if (agora >= 840 && agora < 1215) return 'noturno' // 20h
    return 'manhã'
}

function mostrarRefeicao(refeicao, titulo) {
    const section = document.createElement('section')

    const h3 = document.createElement('h3')
    h3.textContent = titulo
    main.appendChild(h3)

    const h4 = document.createElement('h4')
    h4.textContent = refeicao.titulo
    section.appendChild(h4)

    const div = document.createElement('div')
    section.appendChild(div)


    const ul = document.createElement('ul')
    div.appendChild(ul)

    for (let i = 0; i < refeicao.itens.length; i++) {
        const li = document.createElement('li')
        li.textContent = refeicao.itens[i]
        ul.appendChild(li)

    }

    const li = document.createElement('li')
    li.textContent = `Bebida: ${refeicao.bebida}`
    ul.appendChild(li)

    const figure = document.createElement('figure')
    div.appendChild(figure)

    for (let i = 0; i < refeicao.img.length; i++) {
        const img = document.createElement('img')
        img.src = refeicao.img[i]
        img.style.padding = '5px'
        figure.appendChild(img)
    }

    return section
}

// formulário

function fieldsetDadosPessoais() {
  // Cria o fieldset e a legend
  const fieldset = document.createElement('fieldset');
  const legend = document.createElement('legend');
  legend.textContent = 'Informações Pessoais';
  fieldset.appendChild(legend);

  // Label e input - Nome
  const labelNome = document.createElement('label');
  labelNome.setAttribute('for', 'nome');
  labelNome.textContent = 'Nome completo:';
  const inputNome = document.createElement('input');
  inputNome.type = 'text';
  inputNome.id = 'nome';
  inputNome.name = 'nome';
  inputNome.placeholder = 'Digite seu nome';
  inputNome.required = true;

  fieldset.appendChild(labelNome);
  fieldset.appendChild(document.createElement('br'));
  fieldset.appendChild(inputNome);
  fieldset.appendChild(document.createElement('br'));
  fieldset.appendChild(document.createElement('br'));

  // Label e input - Idade
  const labelIdade = document.createElement('label');
  labelIdade.setAttribute('for', 'idade');
  labelIdade.textContent = 'Idade:';
  const inputIdade = document.createElement('input');
  inputIdade.type = 'number';
  inputIdade.id = 'idade';
  inputIdade.name = 'idade';
  inputIdade.min = 11;
  inputIdade.max = 50;
  inputIdade.required = true;

  fieldset.appendChild(labelIdade);
  fieldset.appendChild(document.createElement('br'));
  fieldset.appendChild(inputIdade);
  fieldset.appendChild(document.createElement('br'));
  fieldset.appendChild(document.createElement('br'));

  // Label e input - Email
  const labelEmail = document.createElement('label');
  labelEmail.setAttribute('for', 'email');
  labelEmail.textContent = 'Email (opcional):';
  const inputEmail = document.createElement('input');
  inputEmail.type = 'email';
  inputEmail.id = 'email';
  inputEmail.name = 'email';
  inputEmail.placeholder = 'email@exemplo.com';

  fieldset.appendChild(labelEmail);
  fieldset.appendChild(document.createElement('br'));
  fieldset.appendChild(inputEmail);
  fieldset.appendChild(document.createElement('br'));
  fieldset.appendChild(document.createElement('br'));

  // Label e input - Data
  const labelData = document.createElement('label');
  labelData.setAttribute('for', 'data');
  labelData.textContent = 'Data da refeição:';
  const inputData = document.createElement('input');
  inputData.type = 'date';
  inputData.id = 'data';
  inputData.name = 'data';
  inputData.required = true;

  fieldset.appendChild(labelData);
  fieldset.appendChild(document.createElement('br'));
  fieldset.appendChild(inputData);
  fieldset.appendChild(document.createElement('br'));
  fieldset.appendChild(document.createElement('br'));

  return fieldset;
}

function fieldsetAvaliarRefeicao() {
  const fieldset = document.createElement('fieldset');

  const legend = document.createElement('legend');
  legend.textContent = 'Sobre a refeição de hoje';
  fieldset.appendChild(legend);

  // --- Pergunta: Você participou da refeição?
  const perguntaParticipacao = document.createElement('p');
  perguntaParticipacao.textContent = 'Você participou da refeição?';
  fieldset.appendChild(perguntaParticipacao);

  // Radio "Sim"
  const inputSim = document.createElement('input');
  inputSim.type = 'radio';
  inputSim.id = 'sim';
  inputSim.name = 'participacao';
  inputSim.value = 'sim';
  inputSim.required = true;

  const labelSim = document.createElement('label');
  labelSim.setAttribute('for', 'sim');
  
  
  fieldset.appendChild(labelSim);
  labelSim.appendChild(inputSim);
  labelSim.appendChild(document.createTextNode('Sim'))
  fieldset.appendChild(document.createElement('br'));

  // Radio "Não"
  const inputNao = document.createElement('input');
  inputNao.type = 'radio';
  inputNao.id = 'nao';
  inputNao.name = 'participacao';
  inputNao.value = 'nao';

  const labelNao = document.createElement('label');
  labelNao.setAttribute('for', 'nao');
  
  fieldset.appendChild(labelNao);
  labelNao.appendChild(inputNao);
  labelNao.appendChild(document.createTextNode('Não')) ;
  fieldset.appendChild(document.createElement('br'));
  fieldset.appendChild(document.createElement('br'));

  // --- Pergunta: Como estava a refeição?
  const perguntaAvaliacao = document.createElement('p');
  perguntaAvaliacao.textContent = 'Como estava a refeição?';
  fieldset.appendChild(perguntaAvaliacao);

  // Checkboxes
  const opcoesAvaliacao = [
    { id: 'saborosa', texto: 'Saborosa' },
    { id: 'quente', texto: 'Estava quente' },
    { id: 'pouco-salgada', texto: 'Pouco salgada' },
    { id: 'nao-gostei', texto: 'Não gostei' }
  ];

  opcoesAvaliacao.forEach(opcao => {
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.id = opcao.id;
    input.name = 'avaliacao';
    input.value = opcao.id;

    const label = document.createElement('label');
    label.setAttribute('for', opcao.id);
    

    fieldset.appendChild(label);
    label.appendChild(input);
    label.appendChild(document.createTextNode(`${opcao.texto}`))
    fieldset.appendChild(document.createElement('br'));
  });

  fieldset.appendChild(document.createElement('br'));

  // --- Nota de 0 a 10
  const labelNota = document.createElement('label');
  labelNota.setAttribute('for', 'nota');
  labelNota.textContent = 'Dê uma nota de 0 a 10:';
  fieldset.appendChild(labelNota);
  fieldset.appendChild(document.createElement('br'));

  const inputNota = document.createElement('input');
  inputNota.type = 'number';
  inputNota.id = 'nota';
  inputNota.name = 'nota';
  inputNota.min = '0';
  inputNota.max = '10';
  inputNota.step = '1';

  fieldset.appendChild(inputNota);
  fieldset.appendChild(document.createElement('br'));
  fieldset.appendChild(document.createElement('br'));

  // --- Horário da refeição
  const labelHorario = document.createElement('label');
  labelHorario.setAttribute('for', 'horario');
  labelHorario.textContent = 'Que horas você almoçou?';
  fieldset.appendChild(labelHorario);
  fieldset.appendChild(document.createElement('br'));

  const inputHorario = document.createElement('input');
  inputHorario.type = 'time';
  inputHorario.id = 'horario';
  inputHorario.name = 'horario';

  fieldset.appendChild(inputHorario);
  fieldset.appendChild(document.createElement('br'));
  fieldset.appendChild(document.createElement('br'));

  return fieldset;
}

function fieldsetComentario() {
  const fieldset = document.createElement('fieldset');

  const legend = document.createElement('legend');
  legend.textContent = 'Comentário livre';
  fieldset.appendChild(legend);

  // Label para o select
  const labelAssunto = document.createElement('label');
  labelAssunto.setAttribute('for', 'assunto');
  labelAssunto.textContent = 'Deixe sua opinião ou sugestão:';
  fieldset.appendChild(labelAssunto);
  fieldset.appendChild(document.createElement('br'));

  // Select
  const select = document.createElement('select');
  select.id = 'assunto';
  select.name = 'assunto';

  const opcoes = [
    { value: '', texto: '-- Escolha uma opção --' },
    { value: 'reclamacao', texto: 'Reclamação' },
    { value: 'sugestao', texto: 'Sugestão' },
    { value: 'elogios', texto: 'Elogios' },
    { value: 'outros-assuntos', texto: 'Outros Assuntos' }
  ];

  opcoes.forEach(opcao => {
    const option = document.createElement('option');
    option.value = opcao.value;
    option.textContent = opcao.texto;
    select.appendChild(option);
  });

  fieldset.appendChild(select);
  fieldset.appendChild(document.createElement('br'));
  fieldset.appendChild(document.createElement('br'));

  // Textarea
  const textarea = document.createElement('textarea');
  textarea.id = 'mensagem';
  textarea.name = 'mensagem';
  textarea.rows = 5;
  textarea.cols = 40;
  textarea.placeholder = 'Digite aqui...';

  // Inicialmente desabilitado se a primeira opção for "-- Escolha uma opção --"
  textarea.disabled = true;

  fieldset.appendChild(textarea);
  fieldset.appendChild(document.createElement('br'));
  fieldset.appendChild(document.createElement('br'));

  // Evento para habilitar/desabilitar textarea conforme a seleção
  select.addEventListener('change', () => {
    textarea.disabled = (select.value === '');
  });

  return fieldset;
}

function fieldsetAnexarArquivo() {
  const fieldset = document.createElement('fieldset');
  
  const legend = document.createElement('legend');
  legend.textContent = 'Anexar imagem';
  fieldset.appendChild(legend);

  const labelArquivo = document.createElement('label');
  labelArquivo.textContent = '(opcional)';
  fieldset.appendChild(labelArquivo);
  fieldset.appendChild(document.createElement('br'));

  const inputArquivo = document.createElement('input');
  inputArquivo.type = 'file';
  inputArquivo.id = 'arquivo';
  inputArquivo.name = 'arquivo';
  inputArquivo.accept = '.jpg, .jpeg, .png';
  fieldset.appendChild(inputArquivo);
  fieldset.appendChild(document.createElement('br'));
  fieldset.appendChild(document.createElement('br'));

  const inputLinkImagem = document.createElement('input');
  inputLinkImagem.type = 'hidden';
  inputLinkImagem.id = 'imagem-url';
  inputLinkImagem.name = 'imagem-url';
  fieldset.appendChild(inputLinkImagem);

  return fieldset;
}


function capturarDadosFormulario(form) {
  const imgbbAPIKey = '3e7ec12ccf90337425a4ac5bd79965fe'; // Substitua pela sua chave real

  form.addEventListener('submit', async function(event) {
    event.preventDefault();

    const arquivo = form.arquivo.files[0];

    let imagemUrl = '';
    if (arquivo) {
      const formData = new FormData();
      formData.append('image', arquivo);

      try {
        const response = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`, {
          method: 'POST',
          body: formData
        });

        const result = await response.json();

        if (result.success) {
          imagemUrl = result.data.url;
          form.querySelector('#imagem-url').value = imagemUrl;
        } else {
          alert('Erro ao enviar imagem para o ImgBB.');
          return;
        }
      } catch (error) {
        console.error('Erro no upload da imagem:', error);
        alert('Erro ao conectar com o ImgBB.');
        return;
      }
    }

    const dados = {
      nome: form.nome.value,
      idade: form.idade.value,
      email: form.email.value,
      data: form.data.value,
      participacao: form.participacao.value,
      avaliacao: [...form.querySelectorAll('input[name="avaliacao"]:checked')].map(el => el.value),
      nota: form.nota.value,
      horario: form.horario.value,
      assunto: form.assunto.value,
      mensagem: form.mensagem.value,
      imagem: imagemUrl // ou: form['imagem-url'].value
    };

    enviarDadosParaAPI(dados);
  });
}