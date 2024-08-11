import { useState } from 'react'

function BotCollection() {
  const [bots, setBots] = useState([])

  return (
    <div>
      <h1>Bot Collection</h1>
      <div>
        <button onClick={() => setBots([...bots, { id: bots.length + 1 }])}>
          Add Bot
        </button>
      </div>
      {bots.map((bot, index) => (
        <div key={index}>
          <h2>{bot.id}</h2>
          <button onClick={() => setBots(bots.filter((_, i) => i !== index))}>
            Remove Bot
          </button>
        </div>
      ))}
    </div>
  )
}

export default BotCollection