import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import { openModal } from "../common/modalSlice";
import { showNotification } from "../common/headerSlice";
import axios from "../../utils/axios";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import PencilIcon from "@heroicons/react/24/outline/PencilIcon";
import { MODAL_BODY_TYPES } from "../../utils/globalConstantUtil";
import { addNewLead } from "../leads/leadSlice";
import {useGetPaintingsQuery} from '../../utils/apiSlice'
import {useDeletePaintingsMutation} from '../../utils/apiSlice'
import InformationCircleIcon from "@heroicons/react/24/outline/InformationCircleIcon";
import PlusIcon from '@heroicons/react/24/outline/PlusIcon';
const TopSideButtons = ({ fetchLeads }) => {
    const dispatch = useDispatch();

    const openAddNewLeadModal = () => {
        dispatch(
            openModal({
              title: "Add New Painting",
              bodyType: MODAL_BODY_TYPES.LEAD_ADD_NEW,
             
            })
          );
    };

    return (
        <div className="inline-block float-right">
    <button
        className="bg-gradient-to-r from-blue-400 to-blue-600 text-white px-3 py-1 rounded shadow hover:from-blue-500 hover:to-blue-700 flex items-center space-x-1 transition duration-200 ease-in-out transform hover:scale-105"
        onClick={openAddNewLeadModal}
    >
        <span className="text-sm">Add New</span>
        <PlusIcon className="w-4 h-4 text-white" />
        
    </button>
</div>


    );
};


function Leads() {
    const [leads, setLeads] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteMessage, setDeleteMessage] = useState("");
    const [confirmDeleteIndex, setConfirmDeleteIndex] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImage, setModalImage] = useState(null);
    const dispatch = useDispatch();
    const {data=[], error, isLoading : loading}= useGetPaintingsQuery()
    const [deletePaintings,{deletedata,isnotLoading,isSuccess}] = useDeletePaintingsMutation()
    const [expandedIndex, setExpandedIndex] = useState(null);

    useEffect(() => {
        if(data.length >0)

            setLeads(data.data)

    }, [ data]);
    function editModalOpen(data){
        console.log(data)
        dispatch(openModal({ title: "Edit Painting", bodyType: MODAL_BODY_TYPES.PAINTING_EDIT , 
            extraObject: data
        }));
       
        closeModal();
    }

    
    
   /*const fetchLeads = async () => {
    console.log("Fetching leads..."); // Debug log
    setIsLoading(true);

    try {
        const response = await axios.get("/paintings");
        if (response.data.success) {
            // Add a new 'statusColor' property based on the status
            const updatedLeads = response.data.data.map((lead) => ({
                ...lead,
                statusColor: getLeadStatus(lead.status),
            }));
            setLeads(updatedLeads); // Set the leads state
        }
    } catch (error) {
        console.error("Error fetching leads:", error);
        alert("Failed to fetch leads. Please try again.");
    } finally {
        setIsLoading(false);
    }
};*/

    // useEffect(() => {
    //     fetchLeads();
    // }, []);
    
    // Handle deletion of a lead
    const handleDeleteLead = async (index) => {
        setDeleteMessage("");
        setIsDeleting(true);
        try {
            const leadToDelete = data.data[index];
            await deletePaintings({ _id: leadToDelete.sys_id }).unwrap();
      if(!isnotLoading) {
        dispatch(showNotification({ message: "Painting Deleted Successfully!", status: 1 }));
        closeModal()
      }
           
        closeModal()
      }
         /*   const response = await axios.delete(`/paintings/${leadToDelete.sys_id}`);
            if (response.status === 200) {
                // setLeads((prevLeads) => prevLeads.filter((_, i) => i !== index));
                dispatch(showNotification({ message: "Painting Deleted Successfully!", status: 1 }));
            }
        }*/ catch (error) {
            //setDeleteMessage("Failed to delete painting. Please try again.");
            dispatch(showNotification({ message: "Failed to delete painting. Please try again.", status: 1 }));
        } finally {
            setIsDeleting(false);
            setConfirmDeleteIndex(null); // Reset confirmation
        }
    };

    // Handle editing a lead
    const handleEditLead = (data) => {
        editModalOpen(data)
        // setEditData(leadToEdit); // Open the Edit Modal with the selected painting's data
    };

    // Save the edited painting
    
    // Handle image click for modal
    const handleImageClick = (photo) => {
        setModalImage(photo);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalImage(null);
    };

    const getLeadStatus = (status) => {
        switch (status) {
            case "Active":
                return "badge-success";
            case "Inactive":
                return "badge-error";
        }
    };
    const handleMoreInfo = (lead) => {
        dispatch(
            openModal({
                title: lead.name, // Set the painting name as the modal title
                bodyType: MODAL_BODY_TYPES.PAINTING_DETAILS, // Custom modal type
                extraObject: lead, // Pass the full painting object
            })
        );
    };
    

    return (
        <>
            <TitleCard
                title="Current Paintings"
                topMargin="mt-2"
                TopSideButtons={<TopSideButtons />}
            >
                
                {loading ? (
                    <p>Loading paintings...</p>
                    
                ) : (
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.data.map((lead, index) => (
                        <div
                            key={index}
                            className="card bg-base-100 shadow-xl p-4 flex flex-col justify-between
                             p-4 bg-white rounded-lg shadow-md space-y-2"
                        >
                            <div>
                                <img
                                    src={lead.photo || "placeholder.jpg"}
                                    alt={lead.photo ? `${lead.name}'s painting` : "No photo available"}
                                    style={{
                                        height: "200px",
                                        objectFit: "cover",
                                        borderRadius: "8px",
                                        cursor: lead.photo ? "pointer" : "default",
                                        margin: "0 auto",
                                        display: "block",
                                    }}
                                    onClick={() =>
                                         {lead.photo && handleImageClick(lead.photo)}
                                       
                                        }
                                />
                                <h1 className="card-title text-center mt-2 font-bold">{lead.name} 
                                    <span style ={{fontSize : 'medium'}} className="font-normal ">{lead.painter_name}</span></h1>

                              {/* <div className="p-4 bg-white rounded-lg shadow-md space-y-2"></div> */}

                              <div className="badge-container" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
    <span className={`badge ${getLeadStatus(lead.status)}`}>
        {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
    </span>
    <span className="badge badge-success">
        {'Sensor'}
    </span>
    <span className="badge badge-error">
        {'Wheelchair'}
    </span>
    <span className="badge badge-error">
        {'Height Adjust'}
    </span>
</div>

                            </div>
                            <div className="flex justify-between mt-4">
                                <button 
                                className="btn btn-outline border-blue-500 text-blue-500 hover:bg-blue-100"
                                onClick={() => handleEditLead(lead)}
                                >
                                    <PencilIcon className="w-5 text-blue-500" />
                                    <span className="text-blue-500 ml-2">Edit</span>
                                </button>
                    <button
                                className={`btn ${
                                isDeleting ? "bg-red-500 text-white border-red-500" : "btn-outline btn-error"}`}
                                onClick={() => setConfirmDeleteIndex(index)}
                                disabled={isDeleting}>
                               {isDeleting ? ("Deleting..." ) : ( 
                                <>
                               <TrashIcon className="w-5 text-red-500" />
                               <span className="ml-2 text-red-500">Delete</span>
                               </>
                               
                            )}
                            </button>
                             <button
        className="text-blue-500 underline cursor-pointer hover:text-blue-700"
        onClick={() => handleMoreInfo(lead)}
    >
       More Info
    </button>
                        </div>
                    </div>
                    ))}
                </div>
                )}
                {deleteMessage && (
                    <div className="text-center text-red-500 mt-4">
                        <p>{deleteMessage}</p>
                    </div>
                )}
            </TitleCard>

            
{/* Confirmation Modal for Deletion */}
{confirmDeleteIndex !== null && (
    <div className="modal modal-open">
        <div className="modal-box text-center">
            {/* Close Button */}
            <button
                className="btn btn-sm btn-circle absolute right-2 top-2"
                onClick={() => setConfirmDeleteIndex(null)}
            >
                ✕
            </button>

            {/* Modal Title */}
            <h3 className="font-semibold text-2xl pb-4">Confirm Deletion</h3>

            {/* Modal Content */}
            <p className="text-lg mb-6">Are you sure you want to delete this painting?</p>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4">
                {/* Cancel Button */}
                <button
                    className="btn btn-outline btn-error"
                    onClick={() => setConfirmDeleteIndex(null)}
                >
                    Cancel
                </button>

                {/* Confirm Button */}
                <button
                    className="btn btn-primary"
                    onClick={() => handleDeleteLead(confirmDeleteIndex)}
                >
                    Confirm
                </button>
            </div>
        </div>
    </div>
)}




{isModalOpen && modalImage && (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.9)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    }}
  >
    {/* Close Button */}
    <button
      className="btn btn-sm btn-circle absolute right-2 top-2"
      onClick={closeModal}
      style={{
        position: "absolute",
        top: "10px",
        right: "10px",
        zIndex: 1001, // Ensure button is above the image
      }}
    >
      ✕
    </button>

    {/* Larger Image */}
    <img
      src={modalImage}
      alt="Larger painting view"
      style={{
        width: "auto",       // Original aspect ratio
        height: "90vh",      // Make it nearly as tall as the viewport
        maxWidth: "90vw",    // Fit inside viewport width
        objectFit: "contain",
        borderRadius: "8px",
      }}
    />
  </div>
)}


                        
              
        
        </>
    );
}

export default Leads;
