const express = require('express');
const app = express();
require('dotenv').config();

// Configuração do banco de dados (Supabase)
const { Pool } = require('pg'); 
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Middleware
app.use(express.json());

// Rotas
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const addressRoutes = require('./routes/addressRoutes');
const orderRoutes = require('./routes/orderRoutes');
const cartRoutes = require('./routes/cartRoutes');

app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/addresses', addressRoutes);
app.use('/orders', orderRoutes);
app.use('/cart', cartRoutes);

// Rota de teste
app.get('/', (req, res) => {
  res.send('API do E-commerce de Eletrônicos funcionando!');
});

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});