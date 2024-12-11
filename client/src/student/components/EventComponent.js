import React, { useState } from 'react';

const EventsComponent = () => {
  const [events, setEvents] = useState([]);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventDescription, setNewEventDescription] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editEventId, setEditEventId] = useState(null);
  const [editEventTitle, setEditEventTitle] = useState('');
  const [editEventDescription, setEditEventDescription] = useState('');

  const addEvent = () => {
    const newEvent = {
      id: events.length + 1,
      title: newEventTitle,
      date: new Date().toLocaleDateString(),
      description: newEventDescription
    };
    setEvents([...events, newEvent]);
    setNewEventTitle('');
    setNewEventDescription('');
  };

  const deleteEvent = (id) => {
    const updatedEvents = events.filter(event => event.id !== id);
    setEvents(updatedEvents);
  };

  const handleEdit = (event) => {
    setEditEventId(event.id);
    setEditEventTitle(event.title);
    setEditEventDescription(event.description);
    setEditMode(true);
  };

  const saveEdit = () => {
    const updatedEvents = events.map(event =>
      event.id === editEventId ? { ...event, title: editEventTitle, description: editEventDescription } : event
    );
    setEvents(updatedEvents);
    setEditMode(false);
    setEditEventId(null);
    setEditEventTitle('');
    setEditEventDescription('');
  };

  const cancelEdit = () => {
    setEditMode(false);
    setEditEventId(null);
    setEditEventTitle('');
    setEditEventDescription('');
  };

  return (
    <div className=' bg-green-300 place-content-center rounded-lg h-full '>
    <div className='bg-[rgba(122,161,245,0.8)] max-w-[600px] p-5 border rounded-md m-auto h-80'>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333', fontSize: '25px', fontStyle: 'italic' }}>Events Component</h2>
      {editMode ? (
        <div style={{ marginBottom: '20px' }}>
          <input type="text" placeholder="Enter title" style={{ width: '100%', padding: '10px', marginBottom: '10px' }} value={editEventTitle} onChange={(e) => setEditEventTitle(e.target.value)} />
          <textarea placeholder="Enter description" style={{ width: '100%', padding: '10px', marginBottom: '10px' }} value={editEventDescription} onChange={(e) => setEditEventDescription(e.target.value)}></textarea>
          <button style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '4px', marginRight: '10px', cursor: 'pointer' }} onClick={saveEdit}>Save</button>
          <button style={{ backgroundColor: '#dc3545', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer' }} onClick={cancelEdit}>Cancel</button>
        </div>
      ) : (
        <div style={{ marginBottom: '20px' }}>
          <input type="text" placeholder="Enter title" style={{ width: '100%', padding: '10px', marginBottom: '10px' }} value={newEventTitle} onChange={(e) => setNewEventTitle(e.target.value)} />
          <textarea placeholder="Enter description" style={{ width: '100%', padding: '10px', marginBottom: '10px' }} value={newEventDescription} onChange={(e) => setNewEventDescription(e.target.value)}></textarea>
          <button style={{ backgroundColor: '#28a745', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer' }} onClick={addEvent}>Add Event</button>
        </div>
      )}

      <div>
        <ul className='list-none p-0 overflow-auto scroll-auto'>
          {events.map(event => (
            <li key={event.id} style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '4px' }}>
              <strong style={{ display: 'block', fontSize: '1.2em', marginBottom: '10px', color: '#333' }}>{event.title}</strong>
              <p style={{ marginBottom: '5px', color: '#666' }}>Date: {event.date}</p>
              <p style={{ marginBottom: '5px', color: '#666' }}>{event.description}</p>
              <button style={{ backgroundColor: '#dc3545', color: '#fff', padding: '5px 10px', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '10px' }} onClick={() => deleteEvent(event.id)}>Delete</button>
              <button style={{ backgroundColor: '#007bff', color: '#fff', padding: '5px 10px', border: 'none', borderRadius: '4px', cursor: 'pointer' }} onClick={() => handleEdit(event)}>Edit</button>
            </li>
          ))}
        </ul>
      </div>

    </div>
    </div>
    

  );
};

export default EventsComponent;
