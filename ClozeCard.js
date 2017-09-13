var BasicCard = require('./BasicCard')

var ClozeCard = function(text, cloze) {
	this.card = [];
	this.cloze = cloze;
	this.partial = function() {
		var array1 = text.split(' ');
		var array2 = cloze.split(' ');
		array1 = array1.filter(function(val) {
			return array2.indexOf(val) == -1;
		});
		array1.unshift('...');
		var clozeArray = array1.join(' ');
		this.card.push(clozeArray);
		console.log(this.card)
	};
	this.fullText = text;

	this.addCard = function(front, back) {
		this.card.push(new BasicCard(front, back));
	};
}

module.exports = ClozeCard;