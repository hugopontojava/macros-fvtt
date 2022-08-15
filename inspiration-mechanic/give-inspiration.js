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
            ChatMessage.create ({
              speaker: { alias: 'Dungeon Master' },
              content: '<h2>Give Inspiration</h2>' + `<h3> ${actor.name} its recieving an @Item[Inspiração].</h3> <p>Have 1 of a 3 maximum!</p> [[/r 1d6]]`
            })
        } else {
            await inspecActor.update( { 'data.qtd': inspecActor.data.data.qtd + 1 } )
            if ( inspecActor.data.data.qtd > 3 || inspecActor.data.data.qtd == 4 ) {
              await inspecActor.update ( { 'data.qtd': inspecActor.data.data.qtd - 1 } )
              ui.notifications.error('This player reached at the maximum Inspiration number.')
            } else {
                ChatMessage.create ({
                  speaker: { alias: 'Dungeon Master' },
                  content: '<h2>Give Inspiration</h2>' + `<h3> ${actor.name} its recieving an @Item[Inspiração].</h3> <p>Have ${inspecActor.data.data.qtd} of a 3 maximum!</p> [[/r 1d6]]`
                })
              }
          }
        }
      }