import {Outlet} from "react-router-dom";

export function AuthLayout() {
    return (
        /*<section className="min-h-screen flex justify-center items-center bg-LogoSectionGreen">
            <Outlet/>
        </section>*/
        <section
            className="min-h-screen flex justify-center items-center bg-[url('src/assets/images/background.jpg')] bg-cover bg-center">
            {/*<img
                src="src/assets/images/logo.png"
                alt="Green Shadow Logo"
                className="w-6/10 mb-2"
            />*/}
            <Outlet/>
        </section>
    )
}