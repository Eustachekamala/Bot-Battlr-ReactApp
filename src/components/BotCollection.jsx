import { useState, useEffect } from 'react';
import YourBotArmy from './YourBotArmy';

function BotCollection() {
  const [bots, setBots] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/bots')
      .then(res => res.json())
      .then(data => {
        
        setBots(data);
      })
      .catch(err => console.error('Error fetching bots:', err));
  }, []); 

  return (
    <div className='flex flex-col items-center justify-center'>
      <h1 className='text-white text-center text-4xl font-bold bg-blue-600 w-full py-4 px-4'>Bot Collection</h1>
      <div className='grid grid-cols-3 gap-4 w-full'>
        {bots.map(bot => (
          <YourBotArmy className="h-80" key={bot.id} botId={bot.id} />
        ))}
      </div>
    </div>
  );
}

export default BotCollection;
