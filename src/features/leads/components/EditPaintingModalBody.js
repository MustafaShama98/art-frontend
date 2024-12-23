import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import axios from "../../../utils/axios";
import imageCompression from "browser-image-compression";
import {useUpdatePaintingMutation} from '../../../utils/apiSlice'
const INITIAL_PAINTING_OBJ = {
  name: "",
  painter_name: "",
  base_height: "",
  height: "",
  width: "",
  weight:"",
  photo: null,
  microcontroller:"",
  status: "Active", // Default status
};

function EditPaintingModalBody({ closeModal, extraObject }) {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const [paintingObj, setPaintingObj] = useState({ ...extraObject });
  const [loading, setLoading] = useState(false);
  const [updatePainting,{data,isLoading,isSuccess}] = useUpdatePaintingMutation()

  const { name, base_height, height, width, painter_name, photo, status ,weight,microcontroller} = paintingObj;

  useEffect(() => {
    setPaintingObj(extraObject);
  }, [extraObject]);

  const saveEditLead = async () => {
    setLoading(true);
    try {
      const { photo, ...newObj } = paintingObj;

      
      await updatePainting(newObj).unwrap()
      if(!isLoading) {
        dispatch(showNotification({ message: "Painting Updated Successfully!", status: 1 }));
        closeModal()
      }

      // const response = await axios.put(`/paintings/${paintingObj.sys_id}`, newObj);

      // if (response.status === 200) {
      //   dispatch(showNotification({ message: "Painting Updated Successfully!", status: 1 }));
      //   closeModal();
      // } else {
      //   alert("Failed to save changes. Please try again.");
      // }
    } catch (error) {
      console.error("Error updating painting:", error);
      alert(error.response?.data?.error || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setPaintingObj((prev) => ({
      ...prev,
      [updateType]: value,
    }));
  };

  return (
    <>
      {/* Input Fields */}
      <InputText
        type="text"
        defaultValue={name}
        updateType="name"
        containerStyle="mt-4"
        labelTitle="Painting Name"
        updateFormValue={updateFormValue}
      />
      <InputText
        type="text"
        defaultValue={painter_name}
        updateType="painter_name"
        containerStyle="mt-4"
        labelTitle="Painter Name"
        updateFormValue={updateFormValue}
      />
      <InputText
        type="number"
        defaultValue={base_height}
        updateType="base_height"
        containerStyle="mt-4"
        labelTitle="Base Height (cm)"
        updateFormValue={updateFormValue}
      />
      <InputText
        type="number"
        defaultValue={height}
        updateType="height"
        containerStyle="mt-4"
        labelTitle="Height (cm)"
        updateFormValue={updateFormValue}
      />
      <InputText
        type="number"
        defaultValue={width}
        updateType="width"
        containerStyle="mt-4"
        labelTitle="Width (cm)"
        updateFormValue={updateFormValue}
      />
<InputText
        type="number"
        defaultValue={weight}
        updateType="weight"
        containerStyle="mt-4"
        labelTitle="Weight (kg)"
        updateFormValue={updateFormValue}
      />
 <InputText
        type="text"
        defaultValue={microcontroller}
        updateType="microcontroller"
        containerStyle="mt-4"
        labelTitle="Microcontroller"
        updateFormValue={updateFormValue}
      />
      {/* Status Selection Box */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">Change Status</label>
        <div className="mt-2">
          <select
            value={status || "Active"}
            onChange={(e) => updateFormValue({ updateType: "status", value: e.target.value })}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

     

      {loading ? (
        <div className="mt-16 text-center">
          <p>Saving your painting, please wait...</p>
        </div>
      ) : (
        <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
      )}

      {/* Modal Actions */}
      <div className="modal-action">
        <button className="btn btn-ghost" onClick={() => closeModal()} disabled={loading}>
          Cancel
        </button>
        <button className="btn btn-primary px-6" onClick={() => saveEditLead()} disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </>
  );
}

export default EditPaintingModalBody;
