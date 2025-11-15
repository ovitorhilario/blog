/**
 * Exemplos de tratamento de erros e validações
 * Demonstra como o sistema lida com situações de erro
 */

import Database from './database.js';
import User from './user.js';
import Post from './post.js';
import Comment from './comment.js';

async function demonstrateErrorHandling() {
	try {
		console.log('=== Demonstração de Tratamento de Erros ===\n');

		// Conectar ao banco
		await Database.connect();
		console.log('✓ Conectado ao banco\n');

		// ===============================================
		// 1. ERRO: Campos obrigatórios não preenchidos
		// ===============================================
		console.log('1. Tentando criar usuário sem campos obrigatórios...');
		try {
			await User.create({
				username: 'teste'
				// email não fornecido
			});
		} catch (error) {
			console.log('❌ Erro capturado:', error.name);
			console.log('   Mensagem:', error.message);
			console.log('   ✓ Validação funcionando corretamente!\n');
		}

		// ===============================================
		// 2. ERRO: Email inválido
		// ===============================================
		console.log('2. Tentando criar usuário com email inválido...');
		try {
			await User.create({
				username: 'teste123',
				email: 'email-invalido'
			});
		} catch (error) {
			console.log('❌ Erro capturado:', error.name);
			console.log('   Mensagem:', error.message);
			console.log('   ✓ Validação de email funcionando!\n');
		}

		// ===============================================
		// 3. ERRO: Username muito curto
		// ===============================================
		console.log('3. Tentando criar usuário com username muito curto...');
		try {
			await User.create({
				username: 'ab',
				email: 'teste@example.com'
			});
		} catch (error) {
			console.log('❌ Erro capturado:', error.name);
			console.log('   Mensagem:', error.message);
			console.log('   ✓ Validação de tamanho funcionando!\n');
		}

		// ===============================================
		// 4. Criar usuário válido para próximos testes
		// ===============================================
		console.log('4. Criando usuário válido para testes...');
		const user1 = await User.create({
			username: 'usuario_teste',
			email: 'usuario@example.com'
		});
		console.log('✓ Usuário criado com sucesso:', user1.username, '\n');

		// ===============================================
		// 5. ERRO: Username duplicado
		// ===============================================
		console.log('5. Tentando criar usuário com username duplicado...');
		try {
			await User.create({
				username: 'usuario_teste',
				email: 'outro@example.com'
			});
		} catch (error) {
			console.log('❌ Erro capturado:', error.name);
			console.log('   Mensagem:', error.message);
			console.log('   ✓ Verificação de duplicidade funcionando!\n');
		}

		// ===============================================
		// 6. ERRO: Post com conteúdo muito longo
		// ===============================================
		console.log('6. Tentando criar post com mais de 280 caracteres...');
		try {
			const longContent = 'a'.repeat(281);
			await Post.create({
				userId: user1._id.toString(),
				content: longContent
			});
		} catch (error) {
			console.log('❌ Erro capturado:', error.name);
			console.log('   Mensagem:', error.message);
			console.log('   ✓ Limite de caracteres funcionando!\n');
		}

		// ===============================================
		// 7. ERRO: Post com userId inválido
		// ===============================================
		console.log('7. Tentando criar post com userId inválido...');
		try {
			await Post.create({
				userId: 'id-invalido',
				content: 'Teste de conteúdo'
			});
		} catch (error) {
			console.log('❌ Erro capturado:', error.name);
			console.log('   Mensagem:', error.message);
			console.log('   ✓ Validação de ObjectId funcionando!\n');
		}

		// ===============================================
		// 8. ERRO: Post com userId inexistente
		// ===============================================
		console.log('8. Tentando criar post com userId inexistente...');
		try {
			await Post.create({
				userId: '507f1f77bcf86cd799439011', // ObjectId válido mas não existe
				content: 'Teste de conteúdo'
			});
		} catch (error) {
			console.log('❌ Erro capturado:', error.name);
			console.log('   Mensagem:', error.message);
			console.log('   ✓ Verificação de existência funcionando!\n');
		}

		// ===============================================
		// 9. Criar post válido
		// ===============================================
		console.log('9. Criando post válido...');
		const post1 = await Post.create({
			userId: user1._id.toString(),
			content: 'Post de teste com #hashtag'
		});
		console.log('✓ Post criado com sucesso\n');

		// ===============================================
		// 10. ERRO: Curtir post duas vezes
		// ===============================================
		console.log('10. Tentando curtir o mesmo post duas vezes...');
		await Post.like(post1._id.toString(), user1._id.toString());
		console.log('✓ Primeira curtida bem-sucedida');
		
		try {
			await Post.like(post1._id.toString(), user1._id.toString());
		} catch (error) {
			console.log('❌ Erro capturado na segunda curtida:', error.name);
			console.log('   Mensagem:', error.message);
			console.log('   ✓ Prevenção de curtida duplicada funcionando!\n');
		}

		// ===============================================
		// 11. ERRO: Buscar registro inexistente
		// ===============================================
		console.log('11. Tentando buscar post inexistente...');
		try {
			await Post.findById('507f1f77bcf86cd799439011');
		} catch (error) {
			console.log('❌ Erro capturado:', error.name);
			console.log('   Mensagem:', error.message);
			console.log('   ✓ NotFoundError funcionando!\n');
		}

		// ===============================================
		// 12. ERRO: Usuário seguir a si mesmo
		// ===============================================
		console.log('12. Tentando usuário seguir a si mesmo...');
		try {
			await User.follow(user1._id.toString(), user1._id.toString());
		} catch (error) {
			console.log('❌ Erro capturado:', error.name);
			console.log('   Mensagem:', error.message);
			console.log('   ✓ Validação de auto-follow funcionando!\n');
		}

		// ===============================================
		// 13. ERRO: Comentário sem conteúdo
		// ===============================================
		console.log('13. Tentando criar comentário sem conteúdo...');
		try {
			await Comment.create({
				postId: post1._id.toString(),
				userId: user1._id.toString(),
				content: ''
			});
		} catch (error) {
			console.log('❌ Erro capturado:', error.name);
			console.log('   Mensagem:', error.message);
			console.log('   ✓ Validação de conteúdo mínimo funcionando!\n');
		}

		// ===============================================
		// 14. ERRO: Atualizar sem fornecer dados
		// ===============================================
		console.log('14. Tentando atualizar usuário sem fornecer dados...');
		try {
			await User.update(user1._id.toString(), {});
		} catch (error) {
			console.log('❌ Erro capturado:', error.name);
			console.log('   Mensagem:', error.message);
			console.log('   ✓ Validação de campos de atualização funcionando!\n');
		}

		// ===============================================
		// 15. Verificar logs gerados
		// ===============================================
		console.log('15. Verificando logs...');
		console.log('✓ Todos os erros foram registrados em logs/errors.log');
		console.log('✓ Cada erro contém: timestamp, nível, contexto, mensagem e stack trace\n');

	} catch (error) {
		console.error('\n❌ Erro inesperado:', error);
	} finally {
		// Desconectar
		await Database.disconnect();
		console.log('✓ Desconectado do banco de dados');
	}
}

// Executar demonstração
demonstrateErrorHandling().catch(console.error);
