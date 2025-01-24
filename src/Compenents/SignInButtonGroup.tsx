interface Button {
    type?: 'button' | 'submit' | 'reset';
    className?: string;
    onClick: () => void;
    label: string;
}

interface SignInButtonGroupProps {
    buttons: Button[];
}

export default function SignInButtonGroup({ buttons }: SignInButtonGroupProps) {
    return (
        <div className="flex justify-between space-x-4 mt-10">
            {buttons.map((button, index) => (
                <button
                    key={index}
                    type={button.type || 'button'}
                    className={`w-full py-2 rounded-lg font-semibold transition duration-300 hover:scale-105 ${
                        button.className
                    }`}
                    onClick={button.onClick}
                >
                    {button.label}
                </button>
            ))}
        </div>
    );
}