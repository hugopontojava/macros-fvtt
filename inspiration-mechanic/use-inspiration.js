main()
async function main() {
	const canvasToken = canvas.tokens.controlled
	if (canvasToken.length == 0 || canvasToken.length > 1) {
		return ui.notifications.error("Selecione apenas um Token ou nenhum está selecionado!")
	} else {
		const tokenActor = canvasToken[0].actor
		const createdItem = game.items.getName("Inspiração")
		const inspecInvent = tokenActor.inventory.find((item) => tokenActor.inventory.getName("Inspiração"))
		if (inspecInvent == null || inspecInvent == undefined) {
			await tokenActor.createEmbeddedDocuments("Item", [createdItem.toObject()])
			ChatMessage.create({
				speaker: { alias: "Narrador" },
				content: "<h2>Dar Inspiração</h2>" + `<h3> ${tokenActor.name} está recebendo uma @Item[Inspiração].</h3> <p>Tem: 1 de 3!</p>`})
		} else {
			await inspecInvent.update({"system.quantity": inspecInvent.quantity + 1})
			if (inspecInvent.quantity > 3) {
				await inspecInvent.update({"system.quantity": inspecInvent.quantity - 1})
				return ui.notifications.error("Ê jogadore chegou no número máximo de Inspirações!")
			} else {
				ChatMessage.create({
					speaker: { alias: "Narrador" },
					content: "<h2>Dar Inspiração</h2>" + `<h3>${tokenActor.name} está recebendo uma @Item[Inspiração].</h3> <p>Tem: ${inspecInvent.quantity} de 3!</p>`})
			}
		}
	}
}
