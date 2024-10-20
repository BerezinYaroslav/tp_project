import React, { useState, useEffect, useContext } from 'react';
import './TagCreate.css'; // Reuse the styles for consistency
import API_BASE_URL from '../../config.js';
import { UserContext } from "../App/UserContext.jsx";

function TagManagement({ onTagRemoved, onClose }) {
  const { userId } = useContext(UserContext);
  const { creds } = useContext(UserContext);
  const [tags, setTags] = useState([]);

  // Fetch all tags when the component mounts
  useEffect(() => {
    if (creds) {
      fetch(`${API_BASE_URL}/tags?ownerId=${userId}`, {
        headers: {
          'Authorization': `Basic ${btoa(creds)}`
        }
      })
        .then((response) => response.json())
        .then((data) => setTags(data))
        .catch((error) => console.error('Error fetching tags:', error));
    }
  }, [creds, userId]);

  const handleDeleteTag = async (tagId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tags/${tagId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Basic ${btoa(creds)}`
        }
      });

      if (response.ok) {
        // Remove the deleted tag from local state
        const updatedTags = tags.filter((tag) => tag.id !== tagId);
        setTags(updatedTags);
        onTagRemoved(tagId); // Notify the parent about the tag removal
      } else {
        console.error('Error deleting tag');
      }
    } catch (error) {
      console.error('Error deleting tag:', error);
    }
  };

  return (
    <div className="tag-popup-overlay-man">
      <div className="tag-popup-man">
        <h2>Manage Tags</h2>
        <div className="tags-container">
          {tags.map((tag) => (
            <div key={tag.id} className="task-tag" style={{ backgroundColor: tag.color }}>
              #{tag.name}
              <button
                type="button"
                className="tags-delete-button"
                onClick={() => handleDeleteTag(tag.id)}
              >
                💀
              </button>
            </div>
          ))}
        </div>
        <button className="submit-button" onClick={onClose}>Back to Task View</button>
      </div>
    </div>
  );
}

export default TagManagement;
