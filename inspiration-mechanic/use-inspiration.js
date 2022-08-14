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
                if ( item.data.data.qtd <= 0 || item.data.data.qtd < 1 ) {
                  return item.delete()
                }
              }
        }
  }
      // TODO: discover where put this code under
  // const actorName = actor.name
  // const itemLeft = item.data.data.qtd
  // const chatContent = '<h2>Use Inspiration</h2>' + `<h3>${actorName} are using an @Item[Inspiração].</h3> [[/r 1d6]] <p>Left: ${itemLeft} Inspirations.</p>`
  //  ChatMessage.create ({
  //    speaker: { alias: actorName },
  //    content: chatContent
  //  })