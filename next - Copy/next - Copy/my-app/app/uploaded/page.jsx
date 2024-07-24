"use client"
import Image from 'next/image';
import { useEffect, useState } from 'react';

const ImageGridPage = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        // Retrieve token from localStorage
        const token = localStorage.getItem('token');

        const response = await fetch('/api/post-location', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();

        // Map and modify image URLs
        const modifiedImages = data.Data.map(image => ({
          ...image,
          imageUrl: `http://localhost:3000/public/assets/${image.image}`,
        }));

        setImages(modifiedImages);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (error) return <p className="text-center mt-4 text-red-500">Error: {error}</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4 text-center">Image Grid</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image) => (
          <div key={image.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={`${image.imageUrl}`} // Ensure imageUrl is used correctly
              alt={image.title}
              className="w-full h-40 object-cover object-center"
            />
            <div className="p-4">
              <p className="text-lg font-semibold">{image.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGridPage;
