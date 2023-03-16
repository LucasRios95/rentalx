**RF** => Requistos Funcionais
**RNF** => Requisitos não funcionais
**RN** => Regras de Negócio


# CADASTRO DE CARRO

**RF**
- Deve ser possível cadastrar um novo carro;

**RN**
- Não deve ser possível cadastrar um novo carro com uma placa já existente;
- Não deve ser possível alterar a placa de um carro já cadastrado;
- O carro deve ser cadastrado por padrão como "disponível";
- Apenas usuários com perfil de "admin" podem cadastrar os carros;


# Listagem de Carros

**RF**
- Deve ser possível listar todos os carros disponíveis;

**RN**
- O usuário não precisa estar logado no sistema;


# Cadastro de Especificação de Carros

**RF**
- Deve ser possível cadastrar uma especificação para um carro;
- Deve ser possível listar todas as especificações;
- Deve ser possível listar todos os carros;

**RN**
- Não deve ser possível cadastrar uma especificação para um carro não cadastrado; 
- Não deve ser possível cadastrar uma especificação já existente para o mesmo carro;
- O usuário responsável pelo cadastro deve ser um usuário administrador;

# Cadastro de imagens do carro

**RF**
- Deve ser possível cadastrar a imagem do carro;

**RNF**
- Utilizar o multer para upload dos arquivos;

**RN**
- O usuário deve poder cadastrar mais de uma imagem para o mesmo carro;
- Apenas usuários com perfil de "admin' podem cadastrar imagens para o carro;

# Alugel de carro

**RF**
- Deve ser possível cadastrar um aluguel;

**RNF**

**RN**
- O aluguel deve ter duração mínima de 24 horas.
- Não deve ser possível cadastrar um novo aluguel caso já exista um em aberto para o mesmmo usuário.
- Não deve ser possível cadastrar um novo aluguel caso já exista um em aberto para o mesmmo carro.
- O usuário deve estar logado na aplicação
- Ao realizar um aluguel, o status do carro deve ser alterado para indisponível

# Devolução de Carro

**RF**
- Deve ser possível devolver um carro

**RN**
- Se o Carro for devolvido com menos de 24 horas, deve ser cobrada a diária completa.
- Ao realizar a devolução, o carro deverá ser liberado para outro aluguel.
- Ao realizar a devolução, o usuário deverá ser liberado para outro aluguel.
- Ao realizar a devolução, deverá ser calculado o valor do aluguel.
- Caso o horário da devolução seja superior ao horário previsto, deverá ser cobrado uma multa proporcional ao atraso.
- Se tiver multa, deverá ser acrescido ao valor do aluguel.
- O usuário deverá estar logado na aplicação

# Listagem de Alugueis para usuário

**RF**
- Deve ser possível realizar a busca de todos os alugueis para o usuário

**RN**
- O usuário deve estar logado na aplicação

# Recuperar Senha

**RF**
- Deve ser possível o usuário recuperar a senha informando o e-mail
- O usuário deve receber um e-mail com o passo a passo para a recuperação de senha
- O usuário deve conseguir inserir uma nova senha

**RN**
- O Usuário precisa informar uma nova senha
- O link enviado precisa expirar em 1 hora