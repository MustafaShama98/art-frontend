import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../features/common/headerSlice';
import logo from '../protected/Photos/logo.png';

function ManagerWelcomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: '' }));
  }, [dispatch]);

  return (
    <div
      className="hero min-h-screen bg-gradient-to-b from-beige-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 flex items-center justify-center"
      style={{
        backgroundImage: "url('/protected/parchment-texture.png')",
        backgroundSize: 'cover',
        backgroundBlendMode: 'soft-light',
      }}
    >
      <div className="relative w-full max-w-4xl bg-white dark:bg-gray-800 shadow-2xl rounded-lg p-8">
        {/* Logo Section */}
        <div className="flex justify-center mb-6">
          <div
            className="p-2 rounded-full border-4 border-yellow-500 bg-gray-50 dark:bg-gray-700 shadow-lg"
            style={{ width: "160px", height: "160px" }}
          >
            <img
              src={logo}
              alt="Hecht Museum Logo"
              className="w-full h-full object-contain rounded-full"
            />
          </div>
        </div>

    {/* Title Section */}
<div className="text-center mb-8">
  <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 dark:text-gray-100 tracking-tight leading-snug">
     <span className="text-black-600">Welcome Worker</span>
  </h1>
  <p className="text-2xl md:text-3xl font-medium text-gray-700 dark:text-gray-300 mt-2">
    <span className="font-extrabold text-yellow-600">To the Hecht Museum Management System</span>
  </p>
  <div className="flex justify-center mt-4">
    <div className="w-16 h-1 bg-yellow-600 rounded-full"></div>
  </div>
</div>



        

        {/* About Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">About the System</h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
            The Hecht Museum Management System is designed to help staff efficiently manage paintings integrated into the automated height adjustment system. It also provides a detailed analysis of system performance and visitor interaction data, making museum operations smoother and more insightful.
          </p>
        </section>

        {/* Manager Features Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">What Can You Do as Worker?</h2>
          <ul className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed list-disc list-inside">
            <li><strong>Add New Paintings:</strong> Easily integrate new artworks into the automated adjustment system.</li>
            <li><strong>Edit Artwork Details:</strong> Update dimensions, accessibility settings, or other information for paintings.</li>
            <li><strong>Delete Paintings:</strong> Remove artworks that are no longer in the system.</li>
          </ul>
        </section>

        {/* Help Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Need Help?</h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
            Click the Help button for complete guidance on using the system, including:
          </p>
          <ul className="list-disc list-inside pl-4 text-gray-700 dark:text-gray-300">
            <li>Step-by-step instructions for adding, editing, or deleting paintings.</li>
            
          </ul>
        </section>

        {/* Call to Action */}
        <div className="text-center">
          <p className="text-lg text-gray-700 dark:text-gray-300 italic font-semibold mb-4">
            "Manage effortlessly. Click on a section to get started!"
          </p>
        </div>
      </div>
    </div>
  );
}

export default ManagerWelcomePage;
