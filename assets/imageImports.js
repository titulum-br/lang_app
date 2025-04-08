/**
 * Image asset imports mapping
 */

// Create an image map with all available image files
// This allows us to statically import image files at build time

const imageMap = {
  'objeto-acessorio-bolsa-1.png': require('./images/objeto-acessorio-bolsa-1.png'),
  'objeto-acessorio-bolsa-2.png': require('./images/objeto-acessorio-bolsa-2.png'),
  'objeto-acessorio-bolsa-3.png': require('./images/objeto-acessorio-bolsa-3.png'),
  'objeto-acessorio-bolsa-4.png': require('./images/objeto-acessorio-bolsa-4.png'),
  'objeto-acessorio-oculos-1.png': require('./images/objeto-acessorio-oculos-1.png'),
  'objeto-acessorio-oculos-2.png': require('./images/objeto-acessorio-oculos-2.png'),
  'objeto-acessorio-oculos-3.png': require('./images/objeto-acessorio-oculos-3.png'),
  'objeto-acessorio-oculos-4.png': require('./images/objeto-acessorio-oculos-4.png'),
  'objeto-acessorio-relogio-1.png': require('./images/objeto-acessorio-relogio-1.png'),
  'objeto-acessorio-relogio-2.png': require('./images/objeto-acessorio-relogio-2.png'),
  'objeto-acessorio-relogio-3.png': require('./images/objeto-acessorio-relogio-3.png'),
  'objeto-acessorio-relogio-4.png': require('./images/objeto-acessorio-relogio-4.png'),
  'objeto-alimento-batata-1.png': require('./images/objeto-alimento-batata-1.png'),
  'objeto-alimento-batata-cartoon-1.png': require('./images/objeto-alimento-batata-cartoon-1.png'),
  'objeto-animal-abelha-1.png': require('./images/objeto-animal-abelha-1.png'),
  'objeto-animal-abelha-2.png': require('./images/objeto-animal-abelha-2.png'),
  'objeto-animal-abelha-3.png': require('./images/objeto-animal-abelha-3.png'),
  'objeto-animal-abelha-4.png': require('./images/objeto-animal-abelha-4.png'),
  'objeto-animal-abelha-cartoon-1.png': require('./images/objeto-animal-abelha-cartoon-1.png'),
  'objeto-animal-abelha-cartoon-2.png': require('./images/objeto-animal-abelha-cartoon-2.png'),
  'objeto-animal-abelha-cartoon-3.png': require('./images/objeto-animal-abelha-cartoon-3.png'),
  'objeto-animal-abelha-cartoon-4.png': require('./images/objeto-animal-abelha-cartoon-4.png'),
  'objeto-animal-borboleta-1.png': require('./images/objeto-animal-borboleta-1.png'),
  'objeto-animal-borboleta-2.png': require('./images/objeto-animal-borboleta-2.png'),
  'objeto-animal-borboleta-3.png': require('./images/objeto-animal-borboleta-3.png'),
  'objeto-animal-borboleta-4.png': require('./images/objeto-animal-borboleta-4.png'),
  'objeto-animal-borboleta-cartoon-1.png': require('./images/objeto-animal-borboleta-cartoon-1.png'),
  'objeto-animal-borboleta-cartoon-2.png': require('./images/objeto-animal-borboleta-cartoon-2.png'),
  'objeto-animal-borboleta-cartoon-3.png': require('./images/objeto-animal-borboleta-cartoon-3.png'),
  'objeto-animal-borboleta-cartoon-4.png': require('./images/objeto-animal-borboleta-cartoon-4.png'),
  'objeto-animal-cachorro-1.png': require('./images/objeto-animal-cachorro-1.png'),
  'objeto-animal-cachorro-2.png': require('./images/objeto-animal-cachorro-2.png'),
  'objeto-animal-cachorro-cartoon-1.png': require('./images/objeto-animal-cachorro-cartoon-1.png'),
  'objeto-animal-cachorro-cartoon-2.png': require('./images/objeto-animal-cachorro-cartoon-2.png'),
  'objeto-animal-cachorro-cartoon-3.png': require('./images/objeto-animal-cachorro-cartoon-3.png'),
  'objeto-animal-cachorro-cartoon-4.png': require('./images/objeto-animal-cachorro-cartoon-4.png'),
  'objeto-animal-cavalo-1.png': require('./images/objeto-animal-cavalo-1.png'),
  'objeto-animal-cavalo-2.png': require('./images/objeto-animal-cavalo-2.png'),
  'objeto-animal-cavalo-3.png': require('./images/objeto-animal-cavalo-3.png'),
  'objeto-animal-cavalo-4.png': require('./images/objeto-animal-cavalo-4.png'),
  'objeto-animal-cavalo-cartoon-1.png': require('./images/objeto-animal-cavalo-cartoon-1.png'),
  'objeto-animal-cavalo-cartoon-2.png': require('./images/objeto-animal-cavalo-cartoon-2.png'),
  'objeto-animal-cavalo-cartoon-3.png': require('./images/objeto-animal-cavalo-cartoon-3.png'),
  'objeto-animal-cavalo-cartoon-4.png': require('./images/objeto-animal-cavalo-cartoon-4.png'),
  'objeto-animal-coelho-1.png': require('./images/objeto-animal-coelho-1.png'),
  'objeto-animal-coelho-2.png': require('./images/objeto-animal-coelho-2.png'),
  'objeto-animal-galinha-1.png': require('./images/objeto-animal-galinha-1.png'),
  'objeto-animal-galinha-2.png': require('./images/objeto-animal-galinha-2.png'),
  'objeto-animal-galinha-3.png': require('./images/objeto-animal-galinha-3.png'),
  'objeto-animal-gato-1.png': require('./images/objeto-animal-gato-1.png'),
  'objeto-animal-ovelha-2.png': require('./images/objeto-animal-ovelha-2.png'),
  'objeto-animal-ovelha-3.png': require('./images/objeto-animal-ovelha-3.png'),
  'objeto-animal-ovelha-cartoon-1.png': require('./images/objeto-animal-ovelha-cartoon-1.png'),
  'objeto-animal-ovelha-cartoon-2.png': require('./images/objeto-animal-ovelha-cartoon-2.png'),
  'objeto-animal-ovelha-cartoon-3.png': require('./images/objeto-animal-ovelha-cartoon-3.png'),
  'objeto-animal-ovelha-cartoon-4.png': require('./images/objeto-animal-ovelha-cartoon-4.png'),
  'objeto-animal-passaro-1.png': require('./images/objeto-animal-passaro-1.png'),
  'objeto-animal-passaro-2.png': require('./images/objeto-animal-passaro-2.png'),
  'objeto-animal-passaro-3.png': require('./images/objeto-animal-passaro-3.png'),
  'objeto-animal-passaro-cartoon-1.png': require('./images/objeto-animal-passaro-cartoon-1.png'),
  'objeto-animal-passaro-cartoon-2.png': require('./images/objeto-animal-passaro-cartoon-2.png'),
  'objeto-animal-peixe-1.png': require('./images/objeto-animal-peixe-1.png'),
  'objeto-animal-peixe-4.png': require('./images/objeto-animal-peixe-4.png'),
  'objeto-animal-porco-1.png': require('./images/objeto-animal-porco-1.png'),
  'objeto-animal-porco-2.png': require('./images/objeto-animal-porco-2.png'),
  'objeto-animal-porco-3.png': require('./images/objeto-animal-porco-3.png'),
  'objeto-animal-porco-4.png': require('./images/objeto-animal-porco-4.png'),
  'objeto-animal-porco-cartoon-1.png': require('./images/objeto-animal-porco-cartoon-1.png'),
  'objeto-animal-porco-cartoon-2.png': require('./images/objeto-animal-porco-cartoon-2.png'),
  'objeto-animal-porco-cartoon-3.png': require('./images/objeto-animal-porco-cartoon-3.png'),
  'objeto-animal-porco-cartoon-4.png': require('./images/objeto-animal-porco-cartoon-4.png'),
  'objeto-animal-vaca-1.png': require('./images/objeto-animal-vaca-1.png'),
  'objeto-animal-vaca-2.png': require('./images/objeto-animal-vaca-2.png'),
  'objeto-animal-vaca-3.png': require('./images/objeto-animal-vaca-3.png'),
  'objeto-animal-vaca-4.png': require('./images/objeto-animal-vaca-4.png'),
  'objeto-animal-vaca-cartoon-1.png': require('./images/objeto-animal-vaca-cartoon-1.png'),
  'objeto-animal-vaca-cartoon-2.png': require('./images/objeto-animal-vaca-cartoon-2.png'),
  'objeto-animal-vaca-cartoon-3.png': require('./images/objeto-animal-vaca-cartoon-3.png'),
  'objeto-animal-vaca-cartoon-4.png': require('./images/objeto-animal-vaca-cartoon-4.png'),
  'objeto-banheiro-chuveiro-1.png': require('./images/objeto-banheiro-chuveiro-1.png'),
  'objeto-banheiro-chuveiro-2.png': require('./images/objeto-banheiro-chuveiro-2.png'),
  'objeto-banheiro-chuveiro-3.png': require('./images/objeto-banheiro-chuveiro-3.png'),
  'objeto-banheiro-chuveiro-4.png': require('./images/objeto-banheiro-chuveiro-4.png'),
  'objeto-calcado-sapato-1.png': require('./images/objeto-calcado-sapato-1.png'),
  'objeto-calcado-sapato-2.png': require('./images/objeto-calcado-sapato-2.png'),
  'objeto-calcado-sapato-3.png': require('./images/objeto-calcado-sapato-3.png'),
  'objeto-calcado-sapato-4.png': require('./images/objeto-calcado-sapato-4.png'),
  'objeto-ceu-lua-1.png': require('./images/objeto-ceu-lua-1.png'),
  'objeto-ceu-lua-2.png': require('./images/objeto-ceu-lua-2.png'),
  'objeto-ceu-lua-3.png': require('./images/objeto-ceu-lua-3.png'),
  'objeto-ceu-lua-4.png': require('./images/objeto-ceu-lua-4.png'),
  'objeto-ceu-lua-cartoon-1.png': require('./images/objeto-ceu-lua-cartoon-1.png'),
  'objeto-ceu-lua-cartoon-2.png': require('./images/objeto-ceu-lua-cartoon-2.png'),
  'objeto-ceu-lua-cartoon-4.png': require('./images/objeto-ceu-lua-cartoon-4.png'),
  'objeto-container-garrafa-1.png': require('./images/objeto-container-garrafa-1.png'),
  'objeto-container-garrafa-2.png': require('./images/objeto-container-garrafa-2.png'),
  'objeto-container-garrafa-3.png': require('./images/objeto-container-garrafa-3.png'),
  'objeto-container-garrafa-4.png': require('./images/objeto-container-garrafa-4.png'),
  'objeto-cozinha-prato-4.png': require('./images/objeto-cozinha-prato-4.png'),
  'objeto-cozinha-prato-5.png': require('./images/objeto-cozinha-prato-5.png'),
  'objeto-cozinha-prato-6.png': require('./images/objeto-cozinha-prato-6.png'),
  'objeto-cozinha-prato-7.png': require('./images/objeto-cozinha-prato-7.png'),
  'objeto-educativo-livro-1.png': require('./images/objeto-educativo-livro-1.png'),
  'objeto-educativo-livro-2.png': require('./images/objeto-educativo-livro-2.png'),
  'objeto-educativo-livro-3.png': require('./images/objeto-educativo-livro-3.png'),
  'objeto-educativo-livro-4.png': require('./images/objeto-educativo-livro-4.png'),
  'objeto-eletrodomestico-geladeira-1.png': require('./images/objeto-eletrodomestico-geladeira-1.png'),
  'objeto-eletrodomestico-geladeira-2.png': require('./images/objeto-eletrodomestico-geladeira-2.png'),
  'objeto-eletrodomestico-geladeira-3.png': require('./images/objeto-eletrodomestico-geladeira-3.png'),
  'objeto-eletrodomestico-geladeira-4.png': require('./images/objeto-eletrodomestico-geladeira-4.png'),
  'objeto-eletrodomestico-microondas-1.png': require('./images/objeto-eletrodomestico-microondas-1.png'),
  'objeto-eletrodomestico-microondas-2.png': require('./images/objeto-eletrodomestico-microondas-2.png'),
  'objeto-eletrodomestico-microondas-3.png': require('./images/objeto-eletrodomestico-microondas-3.png'),
  'objeto-eletrodomestico-microondas-4.png': require('./images/objeto-eletrodomestico-microondas-4.png'),
  'objeto-eletronico-computador-1.png': require('./images/objeto-eletronico-computador-1.png'),
  'objeto-eletronico-computador-2.png': require('./images/objeto-eletronico-computador-2.png'),
  'objeto-eletronico-computador-3.png': require('./images/objeto-eletronico-computador-3.png'),
  'objeto-eletronico-computador-4.png': require('./images/objeto-eletronico-computador-4.png'),
  'objeto-eletronico-telefone-1.png': require('./images/objeto-eletronico-telefone-1.png'),
  'objeto-eletronico-telefone-2.png': require('./images/objeto-eletronico-telefone-2.png'),
  'objeto-eletronico-telefone-3.png': require('./images/objeto-eletronico-telefone-3.png'),
  'objeto-eletronico-telefone-4.png': require('./images/objeto-eletronico-telefone-4.png'),
  'objeto-escrita-caneta-1.png': require('./images/objeto-escrita-caneta-1.png'),
  'objeto-escrita-caneta-2.png': require('./images/objeto-escrita-caneta-2.png'),
  'objeto-escrita-caneta-3.png': require('./images/objeto-escrita-caneta-3.png'),
  'objeto-escrita-caneta-4.png': require('./images/objeto-escrita-caneta-4.png'),
  'objeto-flor-girassol-1.png': require('./images/objeto-flor-girassol-1.png'),
  'objeto-flor-girassol-2.png': require('./images/objeto-flor-girassol-2.png'),
  'objeto-flor-girassol-3.png': require('./images/objeto-flor-girassol-3.png'),
  'objeto-flor-girassol-cartoon-1.png': require('./images/objeto-flor-girassol-cartoon-1.png'),
  'objeto-flor-girassol-cartoon-2.png': require('./images/objeto-flor-girassol-cartoon-2.png'),
  'objeto-flor-girassol-cartoon-3.png': require('./images/objeto-flor-girassol-cartoon-3.png'),
  'objeto-flor-rosa-1.png': require('./images/objeto-flor-rosa-1.png'),
  'objeto-flor-rosa-2.png': require('./images/objeto-flor-rosa-2.png'),
  'objeto-flor-rosa-3.png': require('./images/objeto-flor-rosa-3.png'),
  'objeto-flor-rosa-4.png': require('./images/objeto-flor-rosa-4.png'),
  'objeto-flor-rosa-cartoon-1.png': require('./images/objeto-flor-rosa-cartoon-1.png'),
  'objeto-flor-rosa-cartoon-2.png': require('./images/objeto-flor-rosa-cartoon-2.png'),
  'objeto-flor-rosa-cartoon-3.png': require('./images/objeto-flor-rosa-cartoon-3.png'),
  'objeto-flor-rosa-cartoon-4.png': require('./images/objeto-flor-rosa-cartoon-4.png'),
  'objeto-flor-tulipa-1.png': require('./images/objeto-flor-tulipa-1.png'),
  'objeto-flor-tulipa-2.png': require('./images/objeto-flor-tulipa-2.png'),
  'objeto-flor-tulipa-3.png': require('./images/objeto-flor-tulipa-3.png'),
  'objeto-flor-tulipa-4.png': require('./images/objeto-flor-tulipa-4.png'),
  'objeto-flor-tulipa-cartoon-1.png': require('./images/objeto-flor-tulipa-cartoon-1.png'),
  'objeto-flor-tulipa-cartoon-2.png': require('./images/objeto-flor-tulipa-cartoon-2.png'),
  'objeto-flor-tulipa-cartoon-3.png': require('./images/objeto-flor-tulipa-cartoon-3.png'),
  'objeto-flor-tulipa-cartoon-4.png': require('./images/objeto-flor-tulipa-cartoon-4.png'),
  'objeto-fruta-banana-cartoon-1.png': require('./images/objeto-fruta-banana-cartoon-1.png'),
  'objeto-fruta-laranja-1.png': require('./images/objeto-fruta-laranja-1.png'),
  'objeto-fruta-laranja-2.png': require('./images/objeto-fruta-laranja-2.png'),
  'objeto-fruta-laranja-3.png': require('./images/objeto-fruta-laranja-3.png'),
  'objeto-fruta-laranja-4.png': require('./images/objeto-fruta-laranja-4.png'),
  'objeto-fruta-laranja-cartoon-1.png': require('./images/objeto-fruta-laranja-cartoon-1.png'),
  'objeto-fruta-laranja-cartoon-2.png': require('./images/objeto-fruta-laranja-cartoon-2.png'),
  'objeto-fruta-maca-2.png': require('./images/objeto-fruta-maca-2.png'),
  'objeto-fruta-maca-3.png': require('./images/objeto-fruta-maca-3.png'),
  'objeto-fruta-maca-4.png': require('./images/objeto-fruta-maca-4.png'),
  'objeto-fruta-maca-5.png': require('./images/objeto-fruta-maca-5.png'),
  'objeto-fruta-maca.png': require('./images/objeto-fruta-maca.png'),
  'objeto-fruta-morango-1.png': require('./images/objeto-fruta-morango-1.png'),
  'objeto-fruta-morango-2.png': require('./images/objeto-fruta-morango-2.png'),
  'objeto-fruta-uvas-cartoon-2.png': require('./images/objeto-fruta-uvas-cartoon-2.png'),
  'objeto-fruta-uvas-cartoon-3.png': require('./images/objeto-fruta-uvas-cartoon-3.png'),
  'objeto-iluminacao-lampada-1.png': require('./images/objeto-iluminacao-lampada-1.png'),
  'objeto-iluminacao-lampada-2.png': require('./images/objeto-iluminacao-lampada-2.png'),
  'objeto-iluminacao-lampada-3.png': require('./images/objeto-iluminacao-lampada-3.png'),
  'objeto-iluminacao-lampada-4.png': require('./images/objeto-iluminacao-lampada-4.png'),
  'objeto-instrumento-bateria-1.png': require('./images/objeto-instrumento-bateria-1.png'),
  'objeto-instrumento-bateria-cartoon-1.png': require('./images/objeto-instrumento-bateria-cartoon-1.png'),
  'objeto-instrumento-bateria-cartoon-2.png': require('./images/objeto-instrumento-bateria-cartoon-2.png'),
  'objeto-instrumento-bateria-cartoon-3.png': require('./images/objeto-instrumento-bateria-cartoon-3.png'),
  'objeto-instrumento-bateria-cartoon-4.png': require('./images/objeto-instrumento-bateria-cartoon-4.png'),
  'objeto-instrumento-piano-1.png': require('./images/objeto-instrumento-piano-1.png'),
  'objeto-instrumento-piano-2.png': require('./images/objeto-instrumento-piano-2.png'),
  'objeto-instrumento-piano-3.png': require('./images/objeto-instrumento-piano-3.png'),
  'objeto-instrumento-piano-4.png': require('./images/objeto-instrumento-piano-4.png'),
  'objeto-instrumento-piano-cartoon-1.png': require('./images/objeto-instrumento-piano-cartoon-1.png'),
  'objeto-instrumento-piano-cartoon-2.png': require('./images/objeto-instrumento-piano-cartoon-2.png'),
  'objeto-instrumento-piano-cartoon-3.png': require('./images/objeto-instrumento-piano-cartoon-3.png'),
  'objeto-instrumento-piano-cartoon-4.png': require('./images/objeto-instrumento-piano-cartoon-4.png'),
  'objeto-instrumento-saxofone-1.png': require('./images/objeto-instrumento-saxofone-1.png'),
  'objeto-instrumento-saxofone-2.png': require('./images/objeto-instrumento-saxofone-2.png'),
  'objeto-instrumento-saxofone-3.png': require('./images/objeto-instrumento-saxofone-3.png'),
  'objeto-instrumento-saxofone-4.png': require('./images/objeto-instrumento-saxofone-4.png'),
  'objeto-instrumento-saxofone-cartoon-1.png': require('./images/objeto-instrumento-saxofone-cartoon-1.png'),
  'objeto-instrumento-saxofone-cartoon-2.png': require('./images/objeto-instrumento-saxofone-cartoon-2.png'),
  'objeto-instrumento-saxofone-cartoon-3.png': require('./images/objeto-instrumento-saxofone-cartoon-3.png'),
  'objeto-instrumento-saxofone-cartoon-4.png': require('./images/objeto-instrumento-saxofone-cartoon-4.png'),
  'objeto-instrumento-violao-1.png': require('./images/objeto-instrumento-violao-1.png'),
  'objeto-instrumento-violao-2.png': require('./images/objeto-instrumento-violao-2.png'),
  'objeto-instrumento-violao-3.png': require('./images/objeto-instrumento-violao-3.png'),
  'objeto-instrumento-violao-4.png': require('./images/objeto-instrumento-violao-4.png'),
  'objeto-instrumento-violao-cartoon-1.png': require('./images/objeto-instrumento-violao-cartoon-1.png'),
  'objeto-instrumento-violino-1.png': require('./images/objeto-instrumento-violino-1.png'),
  'objeto-instrumento-violino-2.png': require('./images/objeto-instrumento-violino-2.png'),
  'objeto-instrumento-violino-3.png': require('./images/objeto-instrumento-violino-3.png'),
  'objeto-instrumento-violino-4.png': require('./images/objeto-instrumento-violino-4.png'),
  'objeto-instrumento-violino-cartoon-1.png': require('./images/objeto-instrumento-violino-cartoon-1.png'),
  'objeto-instrumento-violino-cartoon-2.png': require('./images/objeto-instrumento-violino-cartoon-2.png'),
  'objeto-instrumento-violino-cartoon-3.png': require('./images/objeto-instrumento-violino-cartoon-3.png'),
  'objeto-instrumento-violino-cartoon-4.png': require('./images/objeto-instrumento-violino-cartoon-4.png'),
  'objeto-metalico-chave-1.png': require('./images/objeto-metalico-chave-1.png'),
  'objeto-metalico-chave-2.png': require('./images/objeto-metalico-chave-2.png'),
  'objeto-metalico-chave-3.png': require('./images/objeto-metalico-chave-3.png'),
  'objeto-metalico-chave-4.png': require('./images/objeto-metalico-chave-4.png'),
  'objeto-moveis-almofada-1.png': require('./images/objeto-moveis-almofada-1.png'),
  'objeto-moveis-almofada-2.png': require('./images/objeto-moveis-almofada-2.png'),
  'objeto-moveis-almofada-3.png': require('./images/objeto-moveis-almofada-3.png'),
  'objeto-moveis-almofada-4.png': require('./images/objeto-moveis-almofada-4.png'),
  'objeto-moveis-cadeira-1.png': require('./images/objeto-moveis-cadeira-1.png'),
  'objeto-moveis-cadeira-2.png': require('./images/objeto-moveis-cadeira-2.png'),
  'objeto-moveis-cadeira-3.png': require('./images/objeto-moveis-cadeira-3.png'),
  'objeto-moveis-cadeira-4.png': require('./images/objeto-moveis-cadeira-4.png'),
  'objeto-moveis-mesa-1.png': require('./images/objeto-moveis-mesa-1.png'),
  'objeto-moveis-mesa-2.png': require('./images/objeto-moveis-mesa-2.png'),
  'objeto-moveis-mesa-3.png': require('./images/objeto-moveis-mesa-3.png'),
  'objeto-moveis-mesa-4.png': require('./images/objeto-moveis-mesa-4.png'),
  'objeto-movel-cama-1.png': require('./images/objeto-movel-cama-1.png'),
  'objeto-movel-mesa-1.png': require('./images/objeto-movel-mesa-1.png'),
  'objeto-movel-mesa-2.png': require('./images/objeto-movel-mesa-2.png'),
  'objeto-movel-mesa-3.png': require('./images/objeto-movel-mesa-3.png'),
  'objeto-movel-sofa-1.png': require('./images/objeto-movel-sofa-1.png'),
  'objeto-movel-sofa-2.png': require('./images/objeto-movel-sofa-2.png'),
  'objeto-papelaria-caderno-1.png': require('./images/objeto-papelaria-caderno-1.png'),
  'objeto-papelaria-caderno-2.png': require('./images/objeto-papelaria-caderno-2.png'),
  'objeto-papelaria-caderno-3.png': require('./images/objeto-papelaria-caderno-3.png'),
  'objeto-papelaria-caderno-4.png': require('./images/objeto-papelaria-caderno-4.png'),
  'objeto-talher-colher-1.png': require('./images/objeto-talher-colher-1.png'),
  'objeto-talher-colher-2.png': require('./images/objeto-talher-colher-2.png'),
  'objeto-talher-colher-3.png': require('./images/objeto-talher-colher-3.png'),
  'objeto-talher-colher-4.png': require('./images/objeto-talher-colher-4.png'),
  'objeto-talher-colher-5.png': require('./images/objeto-talher-colher-5.png'),
  'objeto-talher-colher-6.png': require('./images/objeto-talher-colher-6.png'),
  'objeto-talher-colher-7.png': require('./images/objeto-talher-colher-7.png'),
  'objeto-talher-garfo-1.png': require('./images/objeto-talher-garfo-1.png'),
  'objeto-talher-garfo-3.png': require('./images/objeto-talher-garfo-3.png'),
  'objeto-utensilio-tesoura-1.png': require('./images/objeto-utensilio-tesoura-1.png'),
  'objeto-utensilio-tesoura-2.png': require('./images/objeto-utensilio-tesoura-2.png'),
  'objeto-utensilio-tesoura-3.png': require('./images/objeto-utensilio-tesoura-3.png'),
  'objeto-utensilio-tesoura-4.png': require('./images/objeto-utensilio-tesoura-4.png'),
  'objeto-vidro-copo-1.png': require('./images/objeto-vidro-copo-1.png'),
  'objeto-vidro-copo-2.png': require('./images/objeto-vidro-copo-2.png'),
  'objeto-vidro-copo-3.png': require('./images/objeto-vidro-copo-3.png'),
  'objeto-vidro-copo-4.png': require('./images/objeto-vidro-copo-4.png')
};

// Grouped images by type
const groupedImages = {
  'objeto-acessorio-bolsa': [
    'objeto-acessorio-bolsa-1.png',
    'objeto-acessorio-bolsa-2.png',
    'objeto-acessorio-bolsa-3.png',
    'objeto-acessorio-bolsa-4.png'
  ],
  'objeto-acessorio-oculos': [
    'objeto-acessorio-oculos-1.png',
    'objeto-acessorio-oculos-2.png',
    'objeto-acessorio-oculos-3.png',
    'objeto-acessorio-oculos-4.png'
  ],
  'objeto-acessorio-relogio': [
    'objeto-acessorio-relogio-1.png',
    'objeto-acessorio-relogio-2.png',
    'objeto-acessorio-relogio-3.png',
    'objeto-acessorio-relogio-4.png'
  ],
  'objeto-alimento-batata': [
    'objeto-alimento-batata-1.png',
    'objeto-alimento-batata-cartoon-1.png'
  ],
  'objeto-animal-abelha': [
    'objeto-animal-abelha-1.png',
    'objeto-animal-abelha-2.png',
    'objeto-animal-abelha-3.png',
    'objeto-animal-abelha-4.png',
    'objeto-animal-abelha-cartoon-1.png',
    'objeto-animal-abelha-cartoon-2.png',
    'objeto-animal-abelha-cartoon-3.png',
    'objeto-animal-abelha-cartoon-4.png'
  ],
  'objeto-animal-borboleta': [
    'objeto-animal-borboleta-1.png',
    'objeto-animal-borboleta-2.png',
    'objeto-animal-borboleta-3.png',
    'objeto-animal-borboleta-4.png',
    'objeto-animal-borboleta-cartoon-1.png',
    'objeto-animal-borboleta-cartoon-2.png',
    'objeto-animal-borboleta-cartoon-3.png',
    'objeto-animal-borboleta-cartoon-4.png'
  ],
  'objeto-animal-cachorro': [
    'objeto-animal-cachorro-1.png',
    'objeto-animal-cachorro-2.png',
    'objeto-animal-cachorro-cartoon-1.png',
    'objeto-animal-cachorro-cartoon-2.png',
    'objeto-animal-cachorro-cartoon-3.png',
    'objeto-animal-cachorro-cartoon-4.png'
  ],
  'objeto-animal-cavalo': [
    'objeto-animal-cavalo-1.png',
    'objeto-animal-cavalo-2.png',
    'objeto-animal-cavalo-3.png',
    'objeto-animal-cavalo-4.png',
    'objeto-animal-cavalo-cartoon-1.png',
    'objeto-animal-cavalo-cartoon-2.png',
    'objeto-animal-cavalo-cartoon-3.png',
    'objeto-animal-cavalo-cartoon-4.png'
  ],
  'objeto-animal-coelho': [
    'objeto-animal-coelho-1.png',
    'objeto-animal-coelho-2.png'
  ],
  'objeto-animal-galinha': [
    'objeto-animal-galinha-1.png',
    'objeto-animal-galinha-2.png',
    'objeto-animal-galinha-3.png'
  ],
  'objeto-animal-gato': [
    'objeto-animal-gato-1.png'
  ],
  'objeto-animal-ovelha': [
    'objeto-animal-ovelha-2.png',
    'objeto-animal-ovelha-3.png',
    'objeto-animal-ovelha-cartoon-1.png',
    'objeto-animal-ovelha-cartoon-2.png',
    'objeto-animal-ovelha-cartoon-3.png',
    'objeto-animal-ovelha-cartoon-4.png'
  ],
  'objeto-animal-passaro': [
    'objeto-animal-passaro-1.png',
    'objeto-animal-passaro-2.png',
    'objeto-animal-passaro-3.png',
    'objeto-animal-passaro-cartoon-1.png',
    'objeto-animal-passaro-cartoon-2.png'
  ],
  'objeto-animal-peixe': [
    'objeto-animal-peixe-1.png',
    'objeto-animal-peixe-4.png'
  ],
  'objeto-animal-porco': [
    'objeto-animal-porco-1.png',
    'objeto-animal-porco-2.png',
    'objeto-animal-porco-3.png',
    'objeto-animal-porco-4.png',
    'objeto-animal-porco-cartoon-1.png',
    'objeto-animal-porco-cartoon-2.png',
    'objeto-animal-porco-cartoon-3.png',
    'objeto-animal-porco-cartoon-4.png'
  ],
  'objeto-animal-vaca': [
    'objeto-animal-vaca-1.png',
    'objeto-animal-vaca-2.png',
    'objeto-animal-vaca-3.png',
    'objeto-animal-vaca-4.png',
    'objeto-animal-vaca-cartoon-1.png',
    'objeto-animal-vaca-cartoon-2.png',
    'objeto-animal-vaca-cartoon-3.png',
    'objeto-animal-vaca-cartoon-4.png'
  ],
  'objeto-banheiro-chuveiro': [
    'objeto-banheiro-chuveiro-1.png',
    'objeto-banheiro-chuveiro-2.png',
    'objeto-banheiro-chuveiro-3.png',
    'objeto-banheiro-chuveiro-4.png'
  ],
  'objeto-calcado-sapato': [
    'objeto-calcado-sapato-1.png',
    'objeto-calcado-sapato-2.png',
    'objeto-calcado-sapato-3.png',
    'objeto-calcado-sapato-4.png'
  ],
  'objeto-ceu-lua': [
    'objeto-ceu-lua-1.png',
    'objeto-ceu-lua-2.png',
    'objeto-ceu-lua-3.png',
    'objeto-ceu-lua-4.png',
    'objeto-ceu-lua-cartoon-1.png',
    'objeto-ceu-lua-cartoon-2.png',
    'objeto-ceu-lua-cartoon-4.png'
  ],
  'objeto-container-garrafa': [
    'objeto-container-garrafa-1.png',
    'objeto-container-garrafa-2.png',
    'objeto-container-garrafa-3.png',
    'objeto-container-garrafa-4.png'
  ],
  'objeto-cozinha-prato': [
    'objeto-cozinha-prato-4.png',
    'objeto-cozinha-prato-5.png',
    'objeto-cozinha-prato-6.png',
    'objeto-cozinha-prato-7.png'
  ],
  'objeto-educativo-livro': [
    'objeto-educativo-livro-1.png',
    'objeto-educativo-livro-2.png',
    'objeto-educativo-livro-3.png',
    'objeto-educativo-livro-4.png'
  ],
  'objeto-eletrodomestico-geladeira': [
    'objeto-eletrodomestico-geladeira-1.png',
    'objeto-eletrodomestico-geladeira-2.png',
    'objeto-eletrodomestico-geladeira-3.png',
    'objeto-eletrodomestico-geladeira-4.png'
  ],
  'objeto-eletrodomestico-microondas': [
    'objeto-eletrodomestico-microondas-1.png',
    'objeto-eletrodomestico-microondas-2.png',
    'objeto-eletrodomestico-microondas-3.png',
    'objeto-eletrodomestico-microondas-4.png'
  ],
  'objeto-eletronico-computador': [
    'objeto-eletronico-computador-1.png',
    'objeto-eletronico-computador-2.png',
    'objeto-eletronico-computador-3.png',
    'objeto-eletronico-computador-4.png'
  ],
  'objeto-eletronico-telefone': [
    'objeto-eletronico-telefone-1.png',
    'objeto-eletronico-telefone-2.png',
    'objeto-eletronico-telefone-3.png',
    'objeto-eletronico-telefone-4.png'
  ],
  'objeto-escrita-caneta': [
    'objeto-escrita-caneta-1.png',
    'objeto-escrita-caneta-2.png',
    'objeto-escrita-caneta-3.png',
    'objeto-escrita-caneta-4.png'
  ],
  'objeto-flor-girassol': [
    'objeto-flor-girassol-1.png',
    'objeto-flor-girassol-2.png',
    'objeto-flor-girassol-3.png',
    'objeto-flor-girassol-cartoon-1.png',
    'objeto-flor-girassol-cartoon-2.png',
    'objeto-flor-girassol-cartoon-3.png'
  ],
  'objeto-flor-rosa': [
    'objeto-flor-rosa-1.png',
    'objeto-flor-rosa-2.png',
    'objeto-flor-rosa-3.png',
    'objeto-flor-rosa-4.png',
    'objeto-flor-rosa-cartoon-1.png',
    'objeto-flor-rosa-cartoon-2.png',
    'objeto-flor-rosa-cartoon-3.png',
    'objeto-flor-rosa-cartoon-4.png'
  ],
  'objeto-flor-tulipa': [
    'objeto-flor-tulipa-1.png',
    'objeto-flor-tulipa-2.png',
    'objeto-flor-tulipa-3.png',
    'objeto-flor-tulipa-4.png',
    'objeto-flor-tulipa-cartoon-1.png',
    'objeto-flor-tulipa-cartoon-2.png',
    'objeto-flor-tulipa-cartoon-3.png',
    'objeto-flor-tulipa-cartoon-4.png'
  ],
  'objeto-fruta-banana': [
    'objeto-fruta-banana-cartoon-1.png'
  ],
  'objeto-fruta-laranja': [
    'objeto-fruta-laranja-1.png',
    'objeto-fruta-laranja-2.png',
    'objeto-fruta-laranja-3.png',
    'objeto-fruta-laranja-4.png',
    'objeto-fruta-laranja-cartoon-1.png',
    'objeto-fruta-laranja-cartoon-2.png'
  ],
  'objeto-fruta-maca': [
    'objeto-fruta-maca-2.png',
    'objeto-fruta-maca-3.png',
    'objeto-fruta-maca-4.png',
    'objeto-fruta-maca-5.png'
  ],
  'objeto-fruta-maca.png': [
    'objeto-fruta-maca.png'
  ],
  'objeto-fruta-morango': [
    'objeto-fruta-morango-1.png',
    'objeto-fruta-morango-2.png'
  ],
  'objeto-fruta-uvas': [
    'objeto-fruta-uvas-cartoon-2.png',
    'objeto-fruta-uvas-cartoon-3.png'
  ],
  'objeto-iluminacao-lampada': [
    'objeto-iluminacao-lampada-1.png',
    'objeto-iluminacao-lampada-2.png',
    'objeto-iluminacao-lampada-3.png',
    'objeto-iluminacao-lampada-4.png'
  ],
  'objeto-instrumento-bateria': [
    'objeto-instrumento-bateria-1.png',
    'objeto-instrumento-bateria-cartoon-1.png',
    'objeto-instrumento-bateria-cartoon-2.png',
    'objeto-instrumento-bateria-cartoon-3.png',
    'objeto-instrumento-bateria-cartoon-4.png'
  ],
  'objeto-instrumento-piano': [
    'objeto-instrumento-piano-1.png',
    'objeto-instrumento-piano-2.png',
    'objeto-instrumento-piano-3.png',
    'objeto-instrumento-piano-4.png',
    'objeto-instrumento-piano-cartoon-1.png',
    'objeto-instrumento-piano-cartoon-2.png',
    'objeto-instrumento-piano-cartoon-3.png',
    'objeto-instrumento-piano-cartoon-4.png'
  ],
  'objeto-instrumento-saxofone': [
    'objeto-instrumento-saxofone-1.png',
    'objeto-instrumento-saxofone-2.png',
    'objeto-instrumento-saxofone-3.png',
    'objeto-instrumento-saxofone-4.png',
    'objeto-instrumento-saxofone-cartoon-1.png',
    'objeto-instrumento-saxofone-cartoon-2.png',
    'objeto-instrumento-saxofone-cartoon-3.png',
    'objeto-instrumento-saxofone-cartoon-4.png'
  ],
  'objeto-instrumento-violao': [
    'objeto-instrumento-violao-1.png',
    'objeto-instrumento-violao-2.png',
    'objeto-instrumento-violao-3.png',
    'objeto-instrumento-violao-4.png',
    'objeto-instrumento-violao-cartoon-1.png'
  ],
  'objeto-instrumento-violino': [
    'objeto-instrumento-violino-1.png',
    'objeto-instrumento-violino-2.png',
    'objeto-instrumento-violino-3.png',
    'objeto-instrumento-violino-4.png',
    'objeto-instrumento-violino-cartoon-1.png',
    'objeto-instrumento-violino-cartoon-2.png',
    'objeto-instrumento-violino-cartoon-3.png',
    'objeto-instrumento-violino-cartoon-4.png'
  ],
  'objeto-metalico-chave': [
    'objeto-metalico-chave-1.png',
    'objeto-metalico-chave-2.png',
    'objeto-metalico-chave-3.png',
    'objeto-metalico-chave-4.png'
  ],
  'objeto-moveis-almofada': [
    'objeto-moveis-almofada-1.png',
    'objeto-moveis-almofada-2.png',
    'objeto-moveis-almofada-3.png',
    'objeto-moveis-almofada-4.png'
  ],
  'objeto-moveis-cadeira': [
    'objeto-moveis-cadeira-1.png',
    'objeto-moveis-cadeira-2.png',
    'objeto-moveis-cadeira-3.png',
    'objeto-moveis-cadeira-4.png'
  ],
  'objeto-moveis-mesa': [
    'objeto-moveis-mesa-1.png',
    'objeto-moveis-mesa-2.png',
    'objeto-moveis-mesa-3.png',
    'objeto-moveis-mesa-4.png'
  ],
  'objeto-movel-cama': [
    'objeto-movel-cama-1.png'
  ],
  'objeto-movel-mesa': [
    'objeto-movel-mesa-1.png',
    'objeto-movel-mesa-2.png',
    'objeto-movel-mesa-3.png'
  ],
  'objeto-movel-sofa': [
    'objeto-movel-sofa-1.png',
    'objeto-movel-sofa-2.png'
  ],
  'objeto-papelaria-caderno': [
    'objeto-papelaria-caderno-1.png',
    'objeto-papelaria-caderno-2.png',
    'objeto-papelaria-caderno-3.png',
    'objeto-papelaria-caderno-4.png'
  ],
  'objeto-talher-colher': [
    'objeto-talher-colher-1.png',
    'objeto-talher-colher-2.png',
    'objeto-talher-colher-3.png',
    'objeto-talher-colher-4.png',
    'objeto-talher-colher-5.png',
    'objeto-talher-colher-6.png',
    'objeto-talher-colher-7.png'
  ],
  'objeto-talher-garfo': [
    'objeto-talher-garfo-1.png',
    'objeto-talher-garfo-3.png'
  ],
  'objeto-utensilio-tesoura': [
    'objeto-utensilio-tesoura-1.png',
    'objeto-utensilio-tesoura-2.png',
    'objeto-utensilio-tesoura-3.png',
    'objeto-utensilio-tesoura-4.png'
  ],
  'objeto-vidro-copo': [
    'objeto-vidro-copo-1.png',
    'objeto-vidro-copo-2.png',
    'objeto-vidro-copo-3.png',
    'objeto-vidro-copo-4.png'
  ]
};

export { imageMap, groupedImages };
