/**
 * Exemplos de uso da biblioteca de micro-blogging
 */

import Database from './database.js';
import User from './user.js';
import Post from './post.js';
import Comment from './comment.js';

async function runExamples() {
	try {
		console.log('=== Iniciando exemplos de uso ===\n');

		// 1. Conectar ao banco de dados
		console.log('1. Conectando ao banco de dados...');
		await Database.connect();
		console.log('✓ Conectado com sucesso!\n');

		// 2. Criar usuários
		console.log('2. Criando usuários...');
		const user1 = await User.create({
			username: 'joao_silva',
			email: 'joao@example.com',
			bio: 'Desenvolvedor Node.js'
		});
		console.log('✓ Usuário 1 criado:', user1.username);

		const user2 = await User.create({
			username: 'maria_santos',
			email: 'maria@example.com',
			bio: 'Designer e entusiasta de tecnologia'
		});
		console.log('✓ Usuário 2 criado:', user2.username);

		const user3 = await User.create({
			username: 'pedro_tech',
			email: 'pedro@example.com'
		});
		console.log('✓ Usuário 3 criado:', user3.username, '\n');

		// 3. Seguir usuários
		console.log('3. Estabelecendo conexões (follows)...');
		await User.follow(user1._id.toString(), user2._id.toString());
		console.log('✓ user1 seguiu user2');
		
		await User.follow(user1._id.toString(), user3._id.toString());
		console.log('✓ user1 seguiu user3');
		
		await User.follow(user2._id.toString(), user1._id.toString());
		console.log('✓ user2 seguiu user1\n');

		// 4. Criar postagens
		console.log('4. Criando postagens...');
		const post1 = await Post.create({
			userId: user1._id.toString(),
			content: 'Minha primeira postagem sobre #nodejs e #mongodb! 🚀'
		});
		console.log('✓ Post 1 criado:', post1.content.substring(0, 50) + '...');

		const post2 = await Post.create({
			userId: user2._id.toString(),
			content: 'Adorando aprender sobre bancos de dados #mongodb #database'
		});
		console.log('✓ Post 2 criado:', post2.content.substring(0, 50) + '...');

		const post3 = await Post.create({
			userId: user3._id.toString(),
			content: 'Hoje aprendi sobre padrões de projeto em #javascript #nodejs'
		});
		console.log('✓ Post 3 criado:', post3.content.substring(0, 50) + '...');

		const post4 = await Post.create({
			userId: user1._id.toString(),
			content: 'Segunda postagem falando sobre #nodejs, é incrível!'
		});
		console.log('✓ Post 4 criado:', post4.content.substring(0, 50) + '...\n');

		// 5. Buscar posts por hashtag
		console.log('5. Buscando posts por hashtag #nodejs...');
		const nodejsPosts = await Post.findByHashtag('nodejs');
		console.log(`✓ Encontrados ${nodejsPosts.length} posts com #nodejs`);
		nodejsPosts.forEach((post, index) => {
			console.log(`  ${index + 1}. ${post.content.substring(0, 60)}...`);
		});
		console.log();

		// 6. Curtir posts
		console.log('6. Curtindo posts...');
		await Post.like(post1._id.toString(), user2._id.toString());
		console.log('✓ user2 curtiu post1');
		
		await Post.like(post1._id.toString(), user3._id.toString());
		console.log('✓ user3 curtiu post1');
		
		await Post.like(post2._id.toString(), user1._id.toString());
		console.log('✓ user1 curtiu post2\n');

		// 7. Criar comentários
		console.log('7. Criando comentários...');
		const comment1 = await Comment.create({
			postId: post1._id.toString(),
			userId: user2._id.toString(),
			content: 'Ótima postagem! Também sou fã de Node.js!'
		});
		console.log('✓ Comentário 1 criado');

		const comment2 = await Comment.create({
			postId: post1._id.toString(),
			userId: user3._id.toString(),
			content: 'Muito bom! MongoDB é realmente poderoso.'
		});
		console.log('✓ Comentário 2 criado');

		// Comentário como resposta a outro comentário
		const reply1 = await Comment.create({
			postId: post1._id.toString(),
			userId: user1._id.toString(),
			content: 'Obrigado pelo feedback!',
			parentCommentId: comment1._id.toString()
		});
		console.log('✓ Resposta ao comentário 1 criada\n');

		// 8. Buscar comentários de um post
		console.log('8. Buscando comentários do post1...');
		const comments = await Comment.findByPost(post1._id.toString());
		console.log(`✓ Encontrados ${comments.length} comentários principais`);
		for (const comment of comments) {
			console.log(`  - ${comment.content.substring(0, 50)}...`);
			
			// Buscar respostas deste comentário
			const replies = await Comment.findReplies(comment._id.toString());
			if (replies.length > 0) {
				console.log(`    └─ ${replies.length} resposta(s)`);
				replies.forEach(reply => {
					console.log(`       └─ ${reply.content.substring(0, 40)}...`);
				});
			}
		}
		console.log();

		// 9. Buscar timeline do usuário
		console.log('9. Buscando timeline de user1 (posts de quem ele segue)...');
		const timeline = await Post.findTimeline(user1._id.toString());
		console.log(`✓ Timeline tem ${timeline.length} posts`);
		timeline.forEach((post, index) => {
			console.log(`  ${index + 1}. ${post.content.substring(0, 60)}...`);
		});
		console.log();

		// 10. Buscar posts de um usuário específico
		console.log('10. Buscando posts de user1...');
		const user1Posts = await Post.findByUser(user1._id.toString());
		console.log(`✓ user1 tem ${user1Posts.length} posts`);
		user1Posts.forEach((post, index) => {
			console.log(`  ${index + 1}. ${post.content.substring(0, 60)}...`);
		});
		console.log();

		// 11. Atualizar dados do usuário
		console.log('11. Atualizando bio de user1...');
		const updatedUser = await User.update(user1._id.toString(), {
			bio: 'Desenvolvedor Node.js e MongoDB - Amante de tecnologia!'
		});
		console.log('✓ Bio atualizada:', updatedUser.bio, '\n');

		// 12. Buscar usuário por username
		console.log('12. Buscando usuário por username...');
		const foundUser = await User.findByUsername('maria_santos');
		console.log('✓ Usuário encontrado:', foundUser.username, '-', foundUser.email, '\n');

		// 13. Retweet
		console.log('13. Fazendo retweet...');
		await Post.retweet(post2._id.toString(), user1._id.toString());
		console.log('✓ user1 retweetou post2\n');

		// 14. Curtir comentário
		console.log('14. Curtindo comentário...');
		await Comment.like(comment1._id.toString(), user3._id.toString());
		console.log('✓ user3 curtiu comment1\n');

		// 15. Estatísticas finais
		console.log('15. Estatísticas finais:');
		const finalPost1 = await Post.findById(post1._id.toString());
		console.log(`✓ Post 1 tem ${finalPost1.likes.length} curtidas`);
		
		const finalComment1 = await Comment.findById(comment1._id.toString());
		console.log(`✓ Comentário 1 tem ${finalComment1.likes.length} curtidas`);
		
		const allUsers = await User.list();
		console.log(`✓ Total de usuários: ${allUsers.length}`);

		console.log('\n=== Exemplos concluídos com sucesso! ===');

	} catch (error) {
		console.error('\n❌ Erro durante execução dos exemplos:');
		console.error('Tipo:', error.name);
		console.error('Mensagem:', error.message);
		if (error.stack) {
			console.error('Stack:', error.stack);
		}
	} finally {
		// Desconectar do banco
		console.log('\nDesconectando do banco de dados...');
		await Database.disconnect();
		console.log('✓ Desconectado!');
	}
}

// Executar exemplos
runExamples().catch(console.error);
