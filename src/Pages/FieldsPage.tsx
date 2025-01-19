import SearchBarComponent from "../Compenents/SearchBarComponent";
import FieldContainer from "../Compenents/FieldContainer.tsx";
import AddBtnComponent from "../Compenents/AddBtnComponent.tsx";
import  {useState} from "react";
import AddFieldModal from "../Compenents/FieldModalComponent/AddFieldModel.tsx";

export default function FieldPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    return (
        <>
            <SearchBarComponent placeholder="Search Field by Location.." onChange={() => {}}/>
            <section className="flex justify-center items-center pt-10 md:pl-20 mx-auto">
                <FieldContainer/>
            </section>
            <div className="flex justify-center items-center pt-10 md:pl-20 mx-auto font-itim ">
                <AddBtnComponent text="Add Field" onClick={openModal}/>
            </div>
            {isModalOpen && <AddFieldModal isOpen={isModalOpen} onClose={closeModal} />}





        </>


    )
}