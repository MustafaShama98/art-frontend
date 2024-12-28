import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../features/common/headerSlice';
import TitleCard from "../../components/Cards/TitleCard";
import logo from '../protected/Photos/logo.png';

function ManagerWelcomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: 'Welcome' }));
  }, [dispatch]);

  return (
    <TitleCard
      
    >
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
<div className="text-center mb-8 space-y-4">
  {/* Main Title */}
  <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 dark:text-gray-100 tracking-tight leading-snug">
    Welcome Admin
  </h1>
  
  {/* Subtitle */}
  <h2 className="text-3xl md:text-4xl font-serif font-medium text-gray-700 dark:text-gray-300 tracking-tight">
    To the Hecht Museum Management System
  </h2>
  
  {/* Divider */}
  <div className="flex justify-center mt-4">
    <div className="w-24 h-1 bg-yellow-600 rounded-full"></div>
  </div>
</div>


      {/* About Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          About the System
        </h2>
        <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
          The Hecht Museum Management System is designed to help staff
          efficiently manage paintings integrated into the automated height
          adjustment system. It also provides a detailed analysis of system
          performance and visitor interaction data, making museum operations
          smoother and more insightful.
        </p>
      </section>

      {/* Manager Features Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          What Can You Do as Admin?
        </h2>
        <ul className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed list-disc list-inside">
          <li>
            <strong>Add New Paintings:</strong> Easily integrate new artworks
            into the automated adjustment system.
          </li>
          <li>
            <strong>Edit Artwork Details:</strong> Update dimensions,
            accessibility settings, or other information for paintings.
          </li>
          <li>
            <strong>Delete Paintings:</strong> Remove artworks that are no
            longer in the system.
          </li>
          <li>
            <strong>View Analysis:</strong> Access detailed data, including:
            <ul className="list-disc pl-6">
              <li>Viewing times for each painting.</li>
              <li>Visitor engagement trends.</li>
            </ul>
          </li>
          <li>
            <strong>Enlarge Artwork Photos:</strong> Click on any painting's
            photo to open a larger, detailed view in a modal.
          </li>
        </ul>
      </section>

      {/* Help Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Need Help?
        </h2>
        <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
          Click the Help button for complete guidance on using the system,
          including:
        </p>
        <ul className="list-disc list-inside pl-4 text-gray-700 dark:text-gray-300">
          <li>
            Step-by-step instructions for adding, editing, or deleting
            paintings.
          </li>
          <li>How to access and interpret analysis reports.</li>
        </ul>
      </section>

      {/* Call to Action */}
      <div className="text-center">
        <p className="text-lg text-gray-700 dark:text-gray-300 italic font-semibold mb-4">
          "Manage and analyze effortlessly. Click on a section to get started!"
        </p>
      </div>
    </TitleCard>
  );
}

export default ManagerWelcomePage;
