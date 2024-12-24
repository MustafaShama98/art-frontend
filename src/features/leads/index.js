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
import useWebSocketHook from '../../utils/useWebSocketHook';
import  StoppedIcon  from "./icons/stopped.svg";
import  RunningIcon  from "./icons/running.svg";

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
        className="bg-blue-500 text-black  font-medium px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 transition duration-200 ease-in-out flex items-center space-x-2"
        onClick={openAddNewLeadModal}
    >

        <span className="text-sm">Add New</span>
        <PlusIcon className="w-4 h-4 text-black" />
    </button>
</div>


    );
};


function Leads() {
    const [leads, setLeads] = useState([]);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteMessage, setDeleteMessage] = useState("");
    const [confirmDeleteIndex, setConfirmDeleteIndex] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImage, setModalImage] = useState(null);
    const dispatch = useDispatch();
    let {data=[], error, isLoading : loading}= useGetPaintingsQuery()
    const [deletePaintings,{deletedata,isnotLoading,isSuccess}] = useDeletePaintingsMutation()
    const [expandedIndex, setExpandedIndex] = useState(null);
    const { messages, connectionStatus, isLoading: websocketLoading } = useWebSocketHook();
    const [statusByPainting, setStatusByPainting] = useState({}); // Track statuses dynamically by sys_id
    const [badgeStatus, setBadgeStatus] = useState({
        wheelchair: false,
        sensor: false,
        height_adjust: false,
      });

      useEffect(() => {
        if (messages && messages.length > 0) {
          // Get the latest message (assuming messages is an array)
          const latestMessage = messages[messages.length - 1];
                console.log('lastest messages, ', latestMessage)
          // Update the badge status
          setBadgeStatus({
            wheelchair: latestMessage.wheelchair,
            sensor: latestMessage.sensor,
              height_adjust: latestMessage.height_adjust,
          });
            // Update leads state
            setLeads((prevLeads) =>
                prevLeads.map((painting) => {
                    if (painting.sys_id === latestMessage.sys_id) {
                        return {
                            ...painting,
                            wheelchair: latestMessage.wheelchair,
                            sensor: latestMessage.sensor,
                            height_adjust: latestMessage.height_adjust,
                        };
                    }
                    return painting; // Return unchanged painting
                })
            );
        }
      }, [messages]);

    useEffect(() => {
        if (data?.data?.length > 0) {
            setLeads((prev) => {
                // Return the new leads array by combining the previous leads and new data
                return [...prev, ...data.data];
            });
        }
    }, [data]);

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
    

    {/* Define StatusBeacon Inline */}
const Status = ({ icon, label, explanation }) => (
    <div
      className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 shadow border"
      style={{ borderColor: '#ddd' }}
    >
      {/* Icon */}
      <img
        src={icon}
        alt={`${label} Icon`}
        className="w-6 h-6"
      />
      {/* Label and Explanation */}
      <div>
        <p className="font-semibold text-gray-800 text-sm sm:text-base">{label}</p>
        <p className="text-gray-500 text-xs sm:text-sm">{explanation}</p>
      </div>
    </div>
  );

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
                    {leads.map((lead, index) => (
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

 {/* Status  */}
<div className="mt-2 space-y-2 sm:space-y-3">
  {/* System Status */}
  <div className="badge-container flex flex-wrap gap-3">
    <Status
      icon={lead.status === "Active" ? RunningIcon : StoppedIcon}
      label="System Status"
      explanation={
        lead.status === "Active"
          ? "The system is running and fully operational."
          : "The system is shut down and not operational."
      }
    />
  </div>

  {/* Other Status  */}
  <Status
    icon={badgeStatus.sensor ? RunningIcon : StoppedIcon}
    label="Sensor"
    explanation={badgeStatus.sensor ? "A person is being detected by the sensor." : "No person detected by the sensor."}
  />
  <Status
    icon={badgeStatus.wheelchair ? RunningIcon : StoppedIcon}
    label="Wheelchair"
    explanation={badgeStatus.wheelchair ? "A person in a wheelchair has been detected." : "No wheelchair user detected."}
  />
  <Status
    icon={badgeStatus.height ? RunningIcon : StoppedIcon}
    label="Height Adjust"
    explanation={badgeStatus.height ? "Adjusting the height for optimal visibility." : "No height adjustments currently in progress."}
  />
    <span className={`badge ${getLeadStatus(lead.status)}`}>
        {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
    </span>
    <span className={`badge ${lead.sensor ? 'badge-success' : 'badge-error'}`}>
        <img src={getIcon(lead.sensor)} alt="Sensor status" style={{ width: '20px', marginRight: '5px' }} />
        {'Sensor'}
      </span>
      <span className={`badge ${lead.wheelchair ? 'badge-success' : 'badge-error'}`}>
        <img src={getIcon(lead.wheelchair)} alt="Wheelchair status" style={{ width: '20px', marginRight: '5px' }} />
        {'Wheelchair'}
      </span>
      <span className={`badge ${lead.height_adjust ? 'badge-success' : 'badge-error'}`}>
        <img src={getIcon(lead.height_adjust)} alt="Height adjust status" style={{ width: '20px', marginRight: '5px' }} />
        {'Height Adjust'}
      </span>
</div>
</div>

                            </div>
                            <div className="flex justify-between items-center p-4 border-t">
    <div className="border-r pr-4">
        <button
            className="flex items-center space-x-2 text-blue-500 border border-blue-500 rounded-md px-3 py-1 hover:bg-blue-100 transition duration-200 underline"
            onClick={() => handleEditLead(lead)}
        >
            <PencilIcon className="w-5 h-5" />
            <span>Edit</span>
        </button>
    </div>
    <div className="border-r pr-4">
        <button
            className="flex items-center space-x-2 text-red-500 border border-red-500 rounded-md px-3 py-1 hover:bg-red-100 transition duration-200 underline"
            onClick={() => setConfirmDeleteIndex(index)}
            disabled={isDeleting}
        >
            <TrashIcon className="w-5 h-5" />
            <span>{isDeleting ? "Deleting..." : "Delete"}</span>
        </button>
    </div>
    <div className="pl-4">
        <button
            className="flex items-center space-x-2 text-blue-500 border border-blue-500 rounded-md px-35 py-1 hover:bg-blue-100 transition duration-200 underline"
            onClick={() => handleMoreInfo(lead)}
        >

            <span>More Info</span>
        </button>
    </div>
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
          className="border border-gray-300 text-gray-700 py-2 px-6   font-medium rounded-md hover:bg-gray-100 transition duration-200"
          onClick={() => setConfirmDeleteIndex(null)}
        >
          Cancel
        </button>

        {/* Confirm Button */}
        <button
          className="bg-red-500 text-blsck py-2 px-6   font-medium rounded-md hover:bg-red-600 transition duration-200"
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
