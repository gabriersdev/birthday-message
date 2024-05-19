# Birthday Message
Projeto criado com ferramentas WEB que carrega mensagens de aniversário personalizadas (ou não) em uma página.

Veja o **Birthday Message** publicado no [GitHub Pages][github_pages] ou o [protótipo na Behance][behance].

## Funcionalidades do Projeto

- **Armazenar ID em `localStorage()`** <br>
  No carregamento da página, um ID é definido baseado no índice do nome da pessoa daquela página, por exemplo: caso acesse a [página de exemplo](https://gabriersdev.github.io/birthday-message/exemplo), o método `retornarIDPessoa(nomePessoa)` é chamado e o argumento 'Exemplo' é passado. O índice de 'Exemplo' no objeto `pessoas` é retornado e é armazenado em `localStorage()`. **Esse índice é muito importante para o funcionamento correto da página.**

- **Embaralhar e armazenar mensagens** <br>
  No primeiro acesso à página, as mensagens definidas são embaralhadas através da função `shuffle()`. As mensagens embaralhadas são armazenadas em `localStorage()`.

- **Acionar funções por atalho de tecla** <br>
  Os botões "Bora lá", "Agora não", "Voltar" e "Próxima Mensagem" possuem atalhos de tecla (S, N, V e P, respectivamente) que acionam as mesmas funções caso um desses botões tivessem sido clicados.

- **Exibir ou ocultar seções** <br>
  Conforme a interação do usuário com os botões da página, as seções são exibidas ou ocultas. Por exemplo, ao clicar em "Bora lá" a seção de mensagens é exibida. 

- **Carregar última mensagem**<br>
  No carregamento da página, caso o valor armazenado para a última mensagem não tenha sido definido ou esse valor seja inválido, a primeira mensagem será carregada e exibida. Caso contrário, a última mensagem será exibida.

- **Carregar mensagens** <br>
  O click no botão "Próxima Mensagem" faz com que a função `carregarMensagem()` seja acionada, e esta função busca a próxima mensagem embaralhada (armazenada em `localStorage()`) para ser exibida na tela. Caso o índice da próxima mensagem seja maior que a quantidade de mensagens sorteadas, a primeira mensagem será exibida, iniciando a lista novamente. <br>
  Toda mensagem carregada com sucesso tem o índice armazenado em `localStorage()`. <br>

[github_pages]: https://gabriersdev.github.io/birthday-message/
[behance]: https://www.behance.net/gallery/164660859/Birthday-Message
