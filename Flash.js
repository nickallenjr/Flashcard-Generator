var ClozeCard = require('./ClozeCard.js');
var BasicCard = require('./BasicCard.js');
var inquire = require('inquirer');
var fs = require('fs');
var cards = [];
var counter = 0;

inquire.prompt([
	{
		name: 'inquire',
		type: 'list',
		choices: ['Yes', 'No'],
		message: 'Would you like to create a card?'
	}
]).then(function(ans) {
	if (ans.inquire === 'Yes') {
		inquire.prompt([
			{
				name: 'amount',
				type: 'input',
				message: 'How many do you want to create?',
				validate: function (value) {
			      var valid = !isNaN(parseFloat(value));
			      return valid || 'Please enter a number';
		    	},
		    	filter: Number
			}
		]).then(function(ans) {
			function addCards() {
				if (counter < ans.amount) {
					inquire.prompt([
						{
							type: 'list', 
							name: 'cardtype',
							choices: ['Basic', 'Cloze Deleted'],
							message: 'What type of flashcard do you want to make?'
						}
					]).then(function(ans) {
						if (ans.cardtype === 'Basic') {
							inquire.prompt([
								{	
									name: 'question',
									message: 'Enter question here: '
								},
								{
									name: 'answer',
									message: 'Enter answer here: '
								}
							]).then(function(ans) {
								cards.push(ans);
								console.log('Your flashcard has been added.');
								counter++;
								addCards();
							});	
						}else {
							inquire.prompt([
								{
									name: 'question',
									message: 'Enter statement here: '
								},
								{
									name: 'answer',
									message: 'Enter cloze deleted text here: '
								}
							]).then(function(ans) {
								var cloze = new ClozeCard(ans.question, ans.answer);
								console.log(JSON.stringify(cloze.card, null, 2) + "\n");
								console.log('Your flashcard has been added.');
								counter++;
								addCards();
							})	
						}
					})			
				}else {
					fs.appendFile('flashcards.txt', JSON.stringify(cards) , 'utf8', function(err) {
						if (err) {
							console.log(err);
						}
						console.log('Your flashcards has been added.');
					});
					return;
				}
			}
			addCards();	
		})
	}else {
		inquire.prompt([
			{
				name: 'inquire',
				type: 'list',
				choices: ['Yes', 'No'],
				message: 'Would you like to study your cards?'
			}
		]).then(function(ans) {
			if (ans.inquire === 'Yes') {
				fs.readFile('flashcards.txt', 'utf8', function(err, data) {
					if (err) {
						console.log(err);
					}
					console.log(JSON.parse(data));
				})
			}else {
				return;
			}
		})
	}
})

