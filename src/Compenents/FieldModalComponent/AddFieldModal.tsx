import '../../assets/CustomCss/CustomCss.css';
import MapComponent from "./MapComponent.tsx";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useMemo, useState} from "react";
import {Field} from "../../models/Field.ts";
import {addField, updateField} from "../../Features/FieldSlice.ts";

const addFieldModal = ({ isOpen, onClose, field = null }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        fieldId: '',
        fieldname: '',
        fieldsize: 0,
        location: '',
        images: ["",""], // Array to hold image data in base64 format

        }

    );
    useEffect(() => {
        if (field) {
            const imageArray =[field.image1,field.image2];
            setFormData({
                fieldId:field.fieldId,
                fieldname:field.fieldname,
                fieldsize:field.fieldsize,
                location:field.location,
                images:imageArray,
            });
            imageArray.forEach((image, index) => {
                console.log(image);
                const previewElement = document.getElementById(`preview${index + 1}`) as HTMLImageElement;
                if (previewElement && image) {
                    previewElement.src = image;
                    previewElement.classList.remove('hidden');
                }
            });

        }

    }, [field]);



    const fields = useSelector((state: any) => state.field.fields);
    const handleSave = () => {
        if (field) {
           updateFields()

        } else {
            handleAddField(); // Call add handler otherwise
        }
        onClose();
    };

    const handleAddField = () => {
        console.log('Form Data:', formData);
        const payload = new Field(formData.fieldId, formData.fieldname,formData.fieldsize,formData.location,formData.images[0],formData.images[1])

        console.log(payload);

        dispatch(addField(payload));
        console.log('Updated Fields Array:', fields);



        onClose();
    };
    const updateFields = () => {
        const payload = {
            fieldId: formData.fieldId,
            updatedField:new Field(formData.fieldId, formData.fieldname,formData.fieldsize,formData.location,formData.images[0],formData.images[1])
        }
        dispatch(updateField(payload));
        console.log('Updated Fields Array:', fields);


    }
    const handleLocationSelect = (location: string) => {
        setFormData((prev) => ({ ...prev, location }));
    };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const previewImage = (e: React.ChangeEvent<HTMLInputElement>, previewId: string, index: number) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const result = reader.result as string;
                // Update the formData with the selected image
                setFormData((prev) => {
                    const updatedImages = [...prev.images];
                    updatedImages[index] = result; // Store Base64 string
                    return { ...prev, images: updatedImages };
                });
                // Update the image preview
                const previewElement = document.getElementById(previewId) as HTMLImageElement;
                if (previewElement) {
                    previewElement.src = result;
                    previewElement.classList.remove('hidden');
                }
            };
            reader.readAsDataURL(file); // Convert file to Base64
        }
    };
    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50  ">
                    <div className="bg-gradient-to-b from-white to-green-700 backdrop-blur-lg rounded-lg shadow-lg w-full max-w-3xl p-6 relative overflow-y-scroll md:max-h-[700px] max-h-screen">
                        <div className="flex justify-between items-center border-b pb-4">
                            <h4 className="text-2xl font-bold font-itim text-green-700"> {field ? "Update Field" : "Add New Field"}</h4>
                            <button
                                className="text-gray-500 hover:text-gray-700"
                                onClick={onClose}
                            >
                                <i className="fas fa-times text-2xl"></i>
                            </button>
                        </div>
                        <div className="mt-4">
                            <form>
                                <div className="mb-4">
                                    <label htmlFor="Code" className="field-label">
                                        Field Code
                                    </label>
                                    <input
                                        type="text"
                                        id="fieldId"
                                        className="field-input-css"
                                        value={formData.fieldId}
                                        required
                                        onChange={handleInputChange}

                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="Name" className="field-label">
                                        Field Name
                                    </label>
                                    <input
                                        type="text"
                                        id="fieldname"
                                        className="field-input-css"
                                        value={formData.fieldname}
                                        required
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="fieldLocation" className="field-label">
                                        Select Location
                                    </label>
                                    <MapComponent onLocationSelect={handleLocationSelect} />
                                    <input
                                        type="text"
                                        id="location"
                                        className="w-full mt-2 px-4 py-2 border rounded-lg bg-gray-100 field-input-css"
                                        placeholder="Location"
                                        value={formData.location}
                                        readOnly
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="Size" className="field-label">
                                        Extent Size (Sq. m)
                                    </label>
                                    <input
                                        type="number"
                                        id="fieldsize"
                                        className="field-input-css"
                                        value={formData.fieldsize}
                                        required
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {Array.from({ length: 2 }).map((_, index) => (
                                        <div key={index} className="mb-4">
                                            <label
                                                htmlFor={`fieldImage${index + 1}`}
                                                className="block text-sm font-medium cursor-pointer bg-gray-100 px-4 py-2 rounded-lg text-center hover:bg-gray-200"
                                            >
                                                <i className="fas fa-upload"></i> Image {index + 1}
                                            </label>
                                            <input
                                                type="file"
                                                id={`fieldImage${index + 1}`}
                                                className="hidden"
                                                onChange={(e) => previewImage(e, `preview${index + 1}`, index)}
                                            />
                                            <img
                                                id={`preview${index + 1}`}
                                                className="mt-3 w-full h-40 object-cover rounded-lg hidden"
                                                alt="Image Preview"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </form>
                        </div>
                        <div className="flex justify-end space-x-3 mt-6">
                            <button
                                className="bg-gradient-to-b from-[#fcfcfdff] to-[#4472C4] hover:bg-amber-400/60 text-emerald-700 font-semibold py-2 px-4 rounded-lg shadow-lg backdrop-blur-sm transition-all duration-300 ease-in-out transform hover:scale-105"
                                onClick={onClose}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-gradient-to-b from-[#fcfcfdff] to-[#4472C4] hover:bg-amber-400/60 text-emerald-700 font-semibold py-2 px-4 rounded-lg shadow-lg backdrop-blur-sm transition-all duration-300 ease-in-out transform hover:scale-105"
                                onClick={handleSave}
                            >
                                <i className="fas fa-plus mr-2"></i> {field ? "Save Changes" : "Add Field"}
                            </button>

                        </div>
                    </div>
                </div>
            )}
        </>
    );

}
export default addFieldModal