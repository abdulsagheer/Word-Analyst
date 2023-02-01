import React, { useState } from "react";

const FileUpload = () => {
	const [file, setFile] = useState(null);

	const handleFileChange = (e) => {
		setFile(e.target.files[0]);
	};

	return (
		<div>
			<input type="file" onChange={handleFileChange} />
		</div>
	);
};

export default FileUpload;
