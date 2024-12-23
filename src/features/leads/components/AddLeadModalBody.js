import React, { useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import { addNewLead } from "../leadSlice";
import axios from "../../../utils/axios";
import imageCompression from "browser-image-compression";
import { useAddPaintingsMutation } from  '../../../utils/apiSlice';

const INITIAL_PAINTING_OBJ = {
  painter_name: "",
  painting_name: "",
  base_height: "",
  height: "",
  width: "",
  weight: "",
  microcontroller:"",
  photo: null, // Photo file
};

function AddPaintingModalBody({ closeModal }) {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const [paintingObj, setPaintingObj] = useState(INITIAL_PAINTING_OBJ);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [addPainting,{data,isLoading,isSuccess}] = useAddPaintingsMutation()

  const saveNewPainting = async () => {
    if (paintingObj.painting_name.trim() === "") {
      return setErrorMessage("Painting Name is required!");
    } else if (paintingObj.base_height === "") {
      return setErrorMessage("Base Height is required!");
    } else if (paintingObj.height === "") {
      return setErrorMessage("Height is required!");
    } else if (paintingObj.width === "") {
      return setErrorMessage("Width is required!");
    }
    else if (paintingObj.weight === "") {
      return setErrorMessage("weight is required!");
    }
    

    const newPaintingObj = {
      name: paintingObj.painting_name,
      base_height: paintingObj.base_height,
      height: paintingObj.height,
      width: paintingObj.width,
      painter_name: paintingObj.painter_name,
      photo: paintingObj.photo,
      weight:paintingObj.weight,
      microcontroller: paintingObj.microcontroller,
    };

    setLoading(true);
    try {
      await addPainting(newPaintingObj).unwrap()
        if(!isLoading) {
          dispatch(showNotification({ message: "New Painting Added!", status: 1 }));
          closeModal()
        }
      // const response = await axios.post("/paintings", newPaintingObj);
      // if (response.data.success) {
      //   dispatch(addNewLead({ newLeadObj: response.data }));
        
      //   dispatch(showNotification({ message: "New Painting Added!", status: 1 }));
        
        
      //   closeModal();
        
      // }
    } catch (error) {
      console.error("Error saving painting:", error);
      setErrorMessage("Failed to save painting. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setPaintingObj({
      ...paintingObj,
      [updateType]: value,
    });
  };

  const handleFileInput = async (event) => {
    const file = event.target.files[0];

    if (file) {
      try {
        const options = {
          maxSizeMB: 0.05,
          maxWidthOrHeight: 800,
          useWebWorker: true,
        };

        const compressedFile = await imageCompression(file, options);

        if (compressedFile.size > 50* 1024) {
          alert("The image is still larger than 50KB after compression. Please use a smaller file.");
          return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result); // Set preview image
          updateFormValue({ updateType: "photo", value: reader.result });
        };
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        console.error("Error compressing the image:", error);
        alert("Failed to compress the image. Please try again.");
      }
    }
  };

  return (
    <>
      <div style={{ marginBottom: '10px', fontSize: '14px', color: 'gray' }}>
  <span style={{ color: 'red' }}> You need to fill the fields with * </span>
</div>
      <InputText
  type="text"
  defaultValue={paintingObj.painting_name}
  updateType="painting_name"
  containerStyle="mt-4"
  labelTitle={<span><span style={{ color: 'red' }}>*</span>Painting Name</span>}
  updateFormValue={updateFormValue}
/>
<InputText
  type="text"
  defaultValue={paintingObj.painter_name}
  updateType="painter_name"
  containerStyle="mt-4"
  labelTitle={<span><span style={{ color: 'red' }}>*</span>Painter Name</span>}
  updateFormValue={updateFormValue}
/>
<InputText
  type="number"
  value={paintingObj.base_height}
  updateType="base_height"
  containerStyle="mt-4"
  labelTitle={<span><span style={{ color: 'red' }}>*</span>Base Height (cm)</span>}
  updateFormValue={updateFormValue}
/>
<InputText
  type="number"
  value={paintingObj.height}
  updateType="height"
  containerStyle="mt-4"
  labelTitle={<span><span style={{ color: 'red' }}>*</span>Height (cm)</span>}
  updateFormValue={updateFormValue}
/>
<InputText
  type="number"
  value={paintingObj.width}
  updateType="width"
  containerStyle="mt-4"
  labelTitle={<span><span style={{ color: 'red' }}>*</span>Width (cm)</span>}
  updateFormValue={updateFormValue}
/>
<InputText
  type="number"
  value={paintingObj.weight}
  updateType="weight"
  containerStyle="mt-4"
  labelTitle={<span><span style={{ color: 'red' }}>*</span>Weight (kg)</span>}
  updateFormValue={updateFormValue}
/>
<InputText
  type="text"
  defaultValue={paintingObj.microcontroller}
  updateType="microcontroller"
  containerStyle="mt-4"
  labelTitle={<span>Microcontroller</span>}
  updateFormValue={updateFormValue}
/>


      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">
          Upload Photo
        </label>
        <div className="mt-2 flex items-center">
          <label
            htmlFor="file-upload"
            className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Choose File
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
          />
        </div>
        {previewImage && (
          <div className="mt-4">
            <img src={previewImage} alt="Preview" className="h-32 w-auto rounded shadow" />
          </div>
        )}
      </div>

      {loading ? (
        <div className="mt-16 text-center">
          <p>Saving your painting, please wait...</p>
        </div>
      ) : (
        <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
      )}
      <div className="modal-action">
        <button
          className="btn btn-ghost"
          onClick={() => closeModal()}
          disabled={loading}
        >
          Cancel
        </button>
        <button
          className="btn btn-primary px-6"
          onClick={() => saveNewPainting()}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </>
  );
}

export default AddPaintingModalBody;
