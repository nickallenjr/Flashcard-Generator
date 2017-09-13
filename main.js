var ClozeCard = require('./ClozeCard.js');
var inquire = require('inquirer');

inquire.prompt([
	{
		type: 'list', 
		name: 'cardtype',
		choices: ['Basic', 'Cloze Deleted'],
		message: 'What type of flashcard do you want to make?'
	},
	{
		name: 'question',
		message: 'Enter your question/statement here:'	
	},
	{
		name: 'answer',
		message: 'Enter answer/cloze deletion here:'
	}]).then(function(ans) {
		if (ans.cardtype === 'Basic') {
			console.log(ans);
		} else {
			console.log(ans.question);
		}
	})