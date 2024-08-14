import { useState, useEffect } from 'react';
import YourBotArmy from './YourBotArmy';

function BotCollection() {
  const [bots, setBots] = useState([]);
  const [botArmy, setBotArmy] = useState([]);

  // Fetch bots from the backend
  useEffect(() => {
    fetch('http://localhost:3000/bots')
      .then(res => res.json())
      .then(data => setBots(data))
      .catch(err => console.error('Error fetching bots:', err));
  }, []);

  // Handle bot army functions
  const handleAddBot = (bot) => {
    // Check if the bot is already in the army
    if (!botArmy.some(b => b.id === bot.id)) {
      setBotArmy([...botArmy, bot]);
    }
  };

  // Remove the bot from the army
  const handleReleaseBot = (botId) => {
    setBotArmy(botArmy.filter(bot => bot.id !== botId));
  };

  // Delete the bot from the backend and local state
  const handleDeleteBot = (botId) => {
    fetch(`http://localhost:3000/bots/${botId}`, {
      method: 'DELETE',
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to delete bot');
        // Remove the bot from both the backend and the local state
        setBots(bots.filter(bot => bot.id !== botId));
        setBotArmy(botArmy.filter(bot => bot.id !== botId));
      })
      .catch(err => console.error('Error deleting bot:', err));
  };

  return (
    <div className='flex flex-col  items-center justify-center w-full'>
      <h1 className='text-white text-center text-4xl font-bold bg-blue-600 w-full py-4 px-4'>Bot Collection</h1>
      <div className='flex flex-row sm:justify-center w-full'>
        <div className='flex flex-wrap justify-center w-1/2 h-96 overflow-y-scroll'>
          <h1 className='text-gray-900 text-center text-2xl font-bold w-full py-4 px-4'>Bots List</h1>
          {bots.map(bot => (
            <YourBotArmy
              key={bot.id}
              botId={bot.id}
              onAddBot={handleAddBot}
              onReleaseBot={handleReleaseBot}
              onDeleteBot={handleDeleteBot}
              isInArmy={botArmy.some(b => b.id === bot.id)}
            />
          ))}
        </div>
        <div className='flex flex-wrap justify-center w-1/2 h-screen overflow-y-scroll'>
          <h1 className='text-gray-900 text-center text-2xl font-bold w-full py-4 px-4'>My Bot Army</h1>
          <div className='flex flex-wrap justify-center'>
            {botArmy.map(bot => (
              <YourBotArmy
                key={bot.id}
                botId={bot.id}
                onReleaseBot={handleReleaseBot}
                onDeleteBot={handleDeleteBot}
                isInArmy={true}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BotCollection;
