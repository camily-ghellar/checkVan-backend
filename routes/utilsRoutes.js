import { Router } from 'express';

const router = Router();

router.get('/countries', (req, res) => {
  // Lista de países com suas máscaras
  // O caractere '#' será usado pelo Flutter para substituir pelos números
  const countries = [
    { name: 'Brasil', code: 'BR', dial_code: '+55', mask: '(##) #####-####', min_length: 11 },
    { name: 'Estados Unidos', code: 'US', dial_code: '+1', mask: '(###) ###-####', min_length: 10 },
    { name: 'Portugal', code: 'PT', dial_code: '+351', mask: '### ### ###', min_length: 9 },
    { name: 'Argentina', code: 'AR', dial_code: '+54', mask: '(###) ###-####', min_length: 10 },
    // Adicione mais países conforme necessário
  ];

  console.log("countries", countries);
  res.json(countries);
});

export default router;