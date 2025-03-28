export default function AddBtnComponent(props) {
    return (
        <button
            onClick={props.onClick}
            className="w-60 h-11 font-bold bg-gradient-to-b from-white to-green-700 backdrop-blur-sm placeholder-gray-700 text-[#274D40]  rounded-lg cursor-pointer transition-all ease-in-out duration-300 shadow-md hover:bg-[#8ad38d] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#274D40] flex items-center justify-center text-xl"
        >
            <i className="fas fa-plus-circle mr-2"></i>
            {props.text}
        </button>
    )
}