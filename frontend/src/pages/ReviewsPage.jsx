import { useEffect, useState } from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true;

export default function ReviewsPage() {
  const [movie, setMovie] = useState('');
  const [review, setReview] = useState('');
  const [reviews, setReviews] = useState([]);
  const [editing, setEditing] = useState(null); // For editing

  const fetchReviews = async () => {
    try {
      const res = await axios.get('http://localhost:5000/reviews');
      setReviews(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addReview = async () => {
    if (!movie || !review) return alert('Please fill in both fields.');
    try {
      if (editing) {
        // Edit review
        await axios.put(`http://localhost:5000/reviews/${editing._id}`, { movie, review });
        setEditing(null); // Reset editing state
      } else {
        // Add new review
        await axios.post('http://localhost:5000/reviews', { movie, review });
      }
      setMovie('');
      setReview('');
      fetchReviews();
    } catch (err) {
      alert('Failed to add or edit review');
    }
  };

  const deleteReview = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/reviews/${id}`);
      fetchReviews();
    } catch (err) {
      alert('Failed to delete review');
    }
  };

  const editReview = (r) => {
    setMovie(r.movie);
    setReview(r.review);
    setEditing(r); // Set the review as being edited
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-4">Movie Reviews</h1>
        <input
          type="text"
          placeholder="Movie Name"
          value={movie}
          onChange={(e) => setMovie(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
        />
        <textarea
          placeholder="Your review..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />
        <button
          onClick={addReview}
          className="w-full bg-green-500 text-white py-2 rounded mb-6"
        >
          {editing ? 'Edit Review' : 'Add Review'}
        </button>

        <div>
          {reviews.map((r) => (
            <div key={r._id} className="mb-4 border-b pb-2">
              <p className="font-semibold">{r.movie}</p>
              <p className="text-sm text-gray-700">{r.review}</p>
              <p className="text-xs text-gray-500">By: {r.user}</p>
              <div className="mt-2 flex space-x-2">
                <button
                  onClick={() => editReview(r)}
                  className="bg-yellow-500 text-white py-1 px-3 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteReview(r._id)}
                  className="bg-red-500 text-white py-1 px-3 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
