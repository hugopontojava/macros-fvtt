main()
async function main() {
   const canvasToken = canvas.tokens.controlled
   if (canvasToken.length == 0 || canvasToken.length > 1) {
      return ui.notifications.error("Selecione apenas um Token ou nenhum está selecionado!")
   } else {
      const tokenActor = canvasToken[0].actor;
      const inspecInvent = tokenActor.inventory.getName("Inspiração");
      if (inspecInvent == null || inspecInvent == undefined) {
         return ui.notifications.error("Nenhuma Inspiração encontrada no inventário!")
      } else {
         await inspecInvent.update({"system.quantity": inspecInvent.quantity - 1})
         ChatMessage.create({
            speaker: { alias: tokenActor.name },
            content: "<h2>Usar Inspiração</h2>" + `<h3>${tokenActor.name} está usando uma @Item[Inspiração].</h3> Rode: [[/r 1d6]] <p>Restam: ${inspecInvent.quantity} de 3!</p>`})
         if (inspecInvent.quantity < 1) {
            return inspecInvent.delete()
         }
      }
   }
}  