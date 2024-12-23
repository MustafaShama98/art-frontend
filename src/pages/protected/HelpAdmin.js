import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../features/common/headerSlice';

function InternalPage() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setPageTitle({ title: "Help" }));
    }, []);

    return (
        <div className="p-6">
            {/* Page Title */}
            <h1 className="text-3xl font-bold mb-6 text-center">How to Use the System</h1>

            {/* Help Section */}
<div className="space-y-8">
    {/* Section 1: Add New Painting */}
    <div className="border p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">1. Add New Painting</h2>
        <p className="mb-4">
            To add a new painting:
        </p>
        <ul className="list-decimal list-inside mb-4">
            <li>Go to the <strong>Manage Paintings</strong> page.</li>
            <li>Click the <strong>"Add New"</strong> button at the top-right corner.</li> 
            <li>Fill in the required fields like <em>Painting Name</em>, <em>Painter Name</em>, dimensions, and upload a photo.</li>
            <li>Click <strong>Save</strong> to add the painting.</li>
            <li>Once saved, a <strong>success message</strong> will appear, confirming the painting has been added.</li>
        </ul>
       {/* <img
            src="path-to-your-add-new-painting-image.png"
            alt="Add New Painting Screenshot"
            className="rounded-lg mx-auto shadow-md mb-4"
        />*/}
        {/* Success Message Image */}
       { /*
        <div className="text-center">
            <p className="text-lg mb-2 font-medium">Success Message Example:</p>
            <img
                src="path-to-your-success-message-image.png"
                alt="Success Message Screenshot"
                className="rounded-lg mx-auto shadow-md"
            />
        </div>*/}
    </div>

    {/* Section 2: Edit Painting */}
    <div className="border p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">2. Edit a Painting</h2>
        <p className="mb-4">
            To edit an existing painting:
        </p>
        <ul className="list-decimal list-inside mb-4">
            <li>Locate the painting on the <strong>Manage Paintings</strong> page.</li>
            <li>Click the <strong>Edit</strong> button below the painting.</li>
            <li>Modify the fields in the form and click <strong>Save</strong>.</li>
            <li>Once saved, a <strong>success message</strong> will appear, confirming the painting has been edited.</li>
        </ul>
       {/* <img
            src="path-to-your-edit-painting-image.png"
            alt="Edit Painting Screenshot"
            className="rounded-lg mx-auto shadow-md"
        />*/}
    </div>

    {/* Section 3: Delete Painting */}
    <div className="border p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">3. Delete a Painting</h2>
        <p className="mb-4">
            To delete a painting:
        </p>
        <ul className="list-decimal list-inside mb-4">
            <li>Locate the painting on the <strong>Manage Paintings</strong> page.</li>
            <li>Click the <strong>Delete</strong> button below the painting.</li>
            <li>Confirm the deletion in the popup modal.</li>
            <li>Once confirming, a <strong>success message</strong> will appear, confirming the painting has been Deleted.</li>
        </ul>
        {/*<img
            src="path-to-your-delete-painting-image.png"
            alt="Delete Painting Screenshot"
            className="rounded-lg mx-auto shadow-md"
        />*/}
    </div>
</div>

        </div>
    );
}

export default InternalPage;
