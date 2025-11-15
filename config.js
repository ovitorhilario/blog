/**
 * Configurações do banco de dados
 */

import 'dotenv/config';

export const databaseConfig = {
  uri: process.env.MONGODB_URI || 'mongodb://localhost:27017',
  dbName: process.env.DB_NAME || 'blog',
  // Opções de conexão do MongoDB
  options: {}
};
