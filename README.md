**RF** => Requistos Funcionais
**RNF** => Requisitos não funcionais
**RN** => Regras de Negócio


# CADASTRO DE CARRO

**RF**
Deve ser possível cadastrar um novo carro;

**RN**
Não deve ser possível cadastrar um novo carro com uma placa já existente;
Não deve ser possível alterar a placa de um carro já cadastrado;
O carro deve ser cadastrado por padrão como "disponível";
Apenas usuários com perfil de "admin" podem cadastrar os carros;


# Listagem de Carros

**RF**
Deve ser possível listar todos os carros disponíveis;

**RN**
O usuário não precisa estar logado no sistema;


# Cadastro de Especificação de Carros

**RF**
Deve ser possível cadastrar uma especificação para um carro;
Deve ser possível listar todas as especificações;
Deve ser possível listar todos os carros;

**RN**
Não deve ser possível cadastrar uma especificação para um carro não cadastrado; 
Não deve ser possível cadastrar uma especificação já existente para o mesmo carro;
O usuário responsável pelo cadastro deve ser um usuário administrador;

# Cadastro de imagens do carro

**RF**
Deve ser possível cadastrar a imagem do carro;

**RNF**
Utilizar o multer para upload dos arquivos;

**RN**
O usuário deve poder cadastrar mais de uma imagem para o mesmo carro;
Apenas usuários com perfil de "admin' podem cadastrar imagens para o carro;

# Alugel de carro

**RF**
Deve ser possível cadastrar um aluguel;

**RNF**

**RN**
O aluguel deve ter duração mínima de 24 horas.
Não deve ser possível cadastrar um novo aluguel caso já exista um em aberto para o mesmmo usuário.
Não deve ser possível cadastrar um novo aluguel caso já exista um em aberto para o mesmmo carro.


