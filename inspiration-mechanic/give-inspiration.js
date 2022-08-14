main() 
  async function main() {
    const token = canvas.tokens.controlled
    if ( token.length == 0 || token.length > 1) {
      return ui.notifications.error('Select only one Token!')
    } else {
      const actor = token[0].actor;
      const item = game.items.getName("Inspiração");
      const inspecActor = actor.items.find( inspecActor => inspecActor.data.name == item.name);
        if ( inspecActor == null || inspecActor == undefined ) {
          await actor.createEmbeddedDocuments('Item', [ item.toObject() ])
        } else {
            await inspecActor.update( { 'data.qtd': inspecActor.data.data.qtd + 1 } )
              if ( inspecActor.data.data.qtd > 3 || inspecActor.data.data.qtd == 4 ) {
                await inspecActor.update ( { 'data.qtd': inspecActor.data.data.qtd - 1 } )
                ui.notifications.error('This player reached at the maximum Inspiration number.')
              }
          }
        }
      }
      // TODO: discover where put this code under
    // let getActorName = canvas.tokens.controlled[0].actor.name
    // let getLeftItem = item.data.data.qtd
    // let chatContent = `<h2>Usa Inspiração</h2>` + `<h3>${getActorName} está usando uma @Item[Inspiração].<h3> Resta(m): ${getLeftItem} inspirações. [[/r 1d6]]`
    //   ChatMessage.create ({
    //     speaker: {alias: getActorName},
    //     content: chatContent 
    //   })