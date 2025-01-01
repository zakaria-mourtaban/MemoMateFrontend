const ImageUploadHandler = async (image: File) => {
	const formData = new FormData();
	formData.append("image", image);
	// send the file to your server and return
	// the URL of the uploaded image in the response
	const response = await fetch("/uploads/new", {
		method: "POST",
		body: formData,
	});
	const json = (await response.json()) as { url: string };
	return json.url;
}

export default ImageUploadHandler