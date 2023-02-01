import React, { useState, useEffect } from "react";

const Results = () => {
	const [result, setResult] = useState({});

	useEffect(() => {
		fetch("http://localhost:3000/upload", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				text: file,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				setResult(data);
			})
			.catch((err) => console.error(err));
	}, [file]);

	return (
		<div>
			{result.nouns && <p>Nouns: {result.nouns}%</p>}
			{result.verbs && <p>Verbs: {result.verbs}%</p>}
			{result.adjectives && <p>Adjectives: {result.adjectives}%</p>}
			{result.adverbs && <p>Adverbs: {result.adverbs}%</p>}
		</div>
	);
};

export default Results;
