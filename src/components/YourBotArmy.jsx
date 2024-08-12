import { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { Add } from '@mui/icons-material';

function YourBotArmy({ botId }) {
  const [bot, setBot] = useState(null); 
  const [botDeleted, setBotDeleted] = useState(false);

  useEffect(() => {
    if (botId && !botDeleted) { // Only fetch bot if botId and botDeleted are not null
      fetch(`http://localhost:3000/bots/${botId}`)
        .then(res => {
          if (!res.ok) throw new Error('Failed to fetch bot');
          return res.json();
        })
        .then(botData => setBot(botData))
        .catch(err => console.error('Error fetching bot:', err));
    }
  }, [botId, botDeleted]); // Re-run if botId or botDeleted changes

  const handleDelete = () => {
    if (botId) {
      fetch(`http://localhost:3000/bots/${botId}`, {
        method: 'DELETE',
      })
        .then(res => {
          if (!res.ok) throw new Error('Failed to delete bot');
          setBot(null); // Clear bot details after deletion
          setBotDeleted(true); // Set botDeleted state to true
        })
        .catch(err => console.error('Error deleting bot:', err));
    }
  };

  if (botDeleted) {
    return (
      <div>
        <p className='bg-blue-400 py-4 px-4 rounded-md text-white shadow-gray-300'>Bot has been deleted.</p>
      </div>
    );
  }

  return (
      <>
          {/* Display bot details if available */}
          {bot ? (
            <div className='flex flex-col items-center justify-center bg-white p-3 rounded-md w-full shadow m-2 mx-auto'>
              <img className='w-32 h-32 bg-blue-600 rounded-md py-4 px-4' src={bot.avatar_url} alt="bot avatar" />
              <h2 className='text-2xl font-bold'>{bot.name}</h2>
              <div className='grid grid-cols-2  w-4/5 justify-center text-center'>
                <p>Health: {bot.health}</p>
                <p>Damage: {bot.damage}</p>
                <p>Armor: {bot.armor}</p>
                <p>Class: {bot.bot_class}</p>
              </div>
              
              <p className='text-xs text-bold text-gray-500'>{bot.catchphrase}</p>
              <p>Created At: {new Date(bot.created_at).toLocaleString()}</p>
              <p>Updated At: {new Date(bot.updated_at).toLocaleString()}</p>
              <div className='flex flex-row justify-between w-24'>
                <button className='py-2 px-2 bg-red-600 rounded-md text-white' onClick={handleDelete}><DeleteIcon /></button>
                <button className='py-2 px-2 bg-blue-600 rounded-md text-white' ><Add /></button>
              </div>
            </div>
          ) : (
            <p>No bot information available.</p>
          )}
      </>
  );
}

export default YourBotArmy;
