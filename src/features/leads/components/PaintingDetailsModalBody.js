import React from "react";

const PaintingDetailsModalBody = ({ closeModal, extraObject }) => {
    return (
        <div className="space-y-3">
            <p>
    
    <img
        src={extraObject.photo || "placeholder.jpg"}
        alt={extraObject.photo ? `${extraObject.name}'s painting` : "No photo available"}
        style={{
            height: "200px",
            objectFit: "cover",
            borderRadius: "8px",
            cursor: extraObject.photo ? "pointer" : "default",
            margin: "0 auto",
            display: "block",
        }}
    />
</p>
<div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
    <p>
        <strong>Id:</strong> {extraObject.sys_id || "N/A"}
    </p>
    <p>
        <strong>Painter:</strong> {extraObject.painter_name || "N/A"}
    </p>
    <p>
        <strong>Base Height:</strong> {extraObject.base_height} cm
    </p>
    <p>
        <strong>Height:</strong> {extraObject.height} cm
    </p>
    <p>
        <strong>Width:</strong> {extraObject.width} cm
    </p>
    <p>
        <strong>Weight:</strong> {extraObject.weight || "N/A"} kg
    </p>
    <p>
        <strong>Height Adjustment:</strong> {extraObject.base_height - ((extraObject.height / 2) + 122)} cm
    </p>
    <p>
        <strong>Optimal Viewing Distance:</strong>{" "}
        {Math.round(Math.sqrt(Math.pow(extraObject.width, 2) + Math.pow(extraObject.height, 2)) * 1.5)} cm
    </p>
    <p>
        <strong>Microcontroller:</strong> {extraObject.microcontroller} 
    </p>
    <p>
        <strong>Status:</strong>{" "}
        <span
            className={`badge ${
                extraObject.status === "Active" ? "badge-success" : "badge-error"
            }`}
        >
            {extraObject.status}
        </span>
    </p>
</div>

            <div className="text-right mt-4">
                <button className="btn btn-primary" onClick={closeModal}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default PaintingDetailsModalBody;
