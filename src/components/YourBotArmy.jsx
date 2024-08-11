import { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

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
        <p className='bg-blue-400 py-4 px-4 rounded-md text-white'>Bot has been deleted.</p>
      </div>
    );
  }

  return (
    <div>
      <div>
        {/* Display bot details if available */}
        {bot ? (
          <div className=' flex flex-col items-center justify-center bg-white p-4 rounded-md shadow-md m-auto'>
            <img className='w-56 h-56 bg-blue-600 rounded-md py-4 px-4' src={bot.avatar_url} alt="bot avatar" />
            <h2>{bot.name}</h2>
            <p>Health: {bot.health}</p>
            <p>Damage: {bot.damage}</p>
            <p>Armor: {bot.armor}</p>
            <p>Class: {bot.bot_class}</p>
            <p>Catchphrase: {bot.catchphrase}</p>
            <p>Created At: {new Date(bot.created_at).toLocaleString()}</p>
            <p>Updated At: {new Date(bot.updated_at).toLocaleString()}</p>
            <button className='py-4 px-4 bg-red-600 rounded-md text-white' onClick={handleDelete}><DeleteIcon /></button>
          </div>
        ) : (
          <p>No bot information available.</p>
        )}
      </div>
    </div>
  );
}

export default YourBotArmy;
