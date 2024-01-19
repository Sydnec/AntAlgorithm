export class ImageLoader {
	constructor() {
		this.images = {};

		// Récupère tous les fichiers PNG dans le dossier ./images
		fetch('./images')
			.then((response) => response.text())
			.then((data) => {
				const parser = new DOMParser();
				const htmlDoc = parser.parseFromString(data, 'text/html');
				const pngFiles = htmlDoc.querySelectorAll('a[href$=".png"]');

				pngFiles.forEach((ctx = this, file) => {
					const imageName = file.href.split('/').pop().split('.')[0];

					const img = new Image();
					img.onload = function (newCtx = ctx) {
						newCtx.images[imageName] = img;
					};
					img.src = `images/${imageName}.png`;
				});
			});
	}

	getImages() {
		return this.images;
	}
}
