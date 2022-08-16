main()
  async function main() {
    const token = canvas.tokens.controlled
      if ( token.length == 0 || token.length > 1 ) {
        return ui.notifications.error('Token is not selected!')
     }  else {
          const actor = token[0].actor
          const item = actor.items.find(item => item.data.name == 'Inspiração')
            if ( item == null || item == undefined ) {
              return ui.notifications.error("No Inspiration on player's inventory!")
            } else {
                await item.update( { 'data.qtd': item.data.data.qtd - 1 } )
                const inspecActor = actor.items.find( inspecActor => inspecActor.data.name == item.name);
                  ChatMessage.create ({
                    speaker: { alias: actor.name },
                    content: '<h2>Use Inspiration</h2>' + `<h3>${actor.name} its using an @Item[Inspiração].</h3> Roll: [[/r 1d6]] <p>Left: ${inspecActor.data.data.qtd} of 3!</p>`
                  })
                  if ( item.data.data.qtd <= 0 || item.data.data.qtd < 1 ) {
                    return item.delete()
                  }
              }
        }
  }