import { useState, useEffect } from 'react';
const Card = ({ cardData, selectedPreference, updatePref, availablePref }) => {
    const imageUrl = cardData.photo

    const prefChangeHandler = ev => {
        const val = parseInt(ev.target.value);
        // val == -1 -> null
        if(val === -1) updatePref(null);
        else updatePref(val);
    }

    return (
        <div className="card shadow-lg rounded-lg overflow-hidden bg-gradient-to-r to-gray-400 flex flex-col">
  {/* Base styles and flexbox layout */}
  <div className='flex flex-col border-r-2'>
  <h2 className='text-black  p-4 text-3xl px-10 text-center my-auto'>  {/* Title, centered and with margins for equal space */}
      {cardData.name}
    </h2> {/* Title */}
    <div className='flex flex-row pb-16'>
    {imageUrl ? 
  <img
    className="w-40 h-40 object-cover rounded-t-lg bg-gray-300 flex-shrink-0" // Fixed size, cover aspect ratio
    src={imageUrl}
    alt={cardData.name}
  /> : <img
  className="w-40 h-40 object-cover rounded-t-lg bg-gray-300 flex-shrink-0" // Fixed size, cover aspect ratio
  src=""
  alt={cardData.name}
/>
}

   
 
  <div className="content flex flex-grow flex-col justify-around px-12"> {/* Content container */}
    <h2 className='text-black text-xl p-4 pb-10 bg-slate-300 max-h-half rounded-lg'> {/* Description, limited height for equal space */}
      {cardData.desc}
    </h2> {/* Title */}
    <div className='flex gap-2 px-8 '>
      <div className='flex flex-col w-56 text-2xl '>
        {/* Preference section remains unchanged */}
        Preference
        <select className='w-full border border-gray-600 h-12' onChange={prefChangeHandler}>
          <option value={-1}>None</option>
          {
            availablePref.map((available, i) => {
              if (!available && i !== selectedPreference) return false;
              return <option key={i} selected={i === selectedPreference} value={i}>{i + 1}</option>
            })
          }
        </select>
      </div>
      </div>
    </div>
  </div>
</div>
</div>

    );
};

export default Card;
