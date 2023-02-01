const express = require("express");
const natural = require("natural");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/upload", (req, res) => {
	const text = req.body.text;
	const tokenizer = new natural.WordTokenizer();
	const tokens = tokenizer.tokenize(text);
	let nouns = 0,
		verbs = 0,
		adjectives = 0,
		adverbs = 0;

	tokens.forEach((token) => {
		const tag = natural.BROWN_POS_TAGGER.tag([token])[0][1];
		if (tag === "NN" || tag === "NNS" || tag === "NNP" || tag === "NNPS") {
			nouns++;
		} else if (
			tag === "VB" ||
			tag === "VBD" ||
			tag === "VBG" ||
			tag === "VBN" ||
			tag === "VBP" ||
			tag === "VBZ"
		) {
			verbs++;
		} else if (tag === "JJ" || tag === "JJR" || tag === "JJS") {
			adjectives++;
		} else if (tag === "RB" || tag === "RBR" || tag === "RBS") {
			adverbs++;
		}
	});

	const total = nouns + verbs + adjectives + adverbs;
	const nounPercentage = (nouns / total) * 100;
	const verbPercentage = (verbs / total) * 100;
	const adjectivePercentage = (adjectives / total) * 100;
	const adverbPercentage = (adverbs / total) * 100;

	res.send({
		nouns: nounPercentage,
		verbs: verbPercentage,
		adjectives: adjectivePercentage,
		adverbs: adverbPercentage,
	});
});

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
