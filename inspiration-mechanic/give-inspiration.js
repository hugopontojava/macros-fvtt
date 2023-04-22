main() ;
async function main() {
  const tToken = canvas.tokens.controlled;
  if ( tToken.length == 0 || tToken.length > 1) {
    return ui.notifications.error('Select only one Token!');
  } else {
    const tActor = tToken[0].actor;
    const item = game.items.getName("ITEMNAME");
    const inspecActor = tActor.items.find( inspecActor => inspecActor.data.name == item.name);
      if ( inspecActor == null || inspecActor == undefined ) {
        await tActor.createEmbeddedDocuments('Item', [ item.toObject() ]);
          ChatMessage.create ({
            speaker: { alias: 'Dungeon Master' },
            content: '<h2>Give Inspiration</h2>' + `<h3> ${tActor.name} its recieving an @Item[ITEMNAME].</h3> <p>Have 1 of a 3 maximum!</p>`
          })
      } else {
          await inspecActor.update( { 'data.qtd': inspecActor.data.data.qtd + 1 } )
          if ( inspecActor.data.data.qtd > 3 || inspecActor.data.data.qtd == 4 ) {
            await inspecActor.update ( { 'data.qtd': inspecActor.data.data.qtd - 1 } )
            ui.notifications.error('This player reached at the maximum Inspiration number.')
          } else {
              ChatMessage.create ({
                speaker: { alias: 'Dungeon Master' },
                content: '<h2>Give Inspiration</h2>' + `<h3> ${tActor.name} its recieving an @Item[ITEMNAME].</h3> <p>Have ${inspecActor.data.data.qtd} of a 3 maximum!</p>`
              })
            }
        }
      }
    }