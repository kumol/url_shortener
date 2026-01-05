import { Link } from "react-router";

const Header = () => {
    return(

        <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-xl border-gray-200">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 sm:h-18 items-center justify-between">

                <Link to = "/" className="flex items-center gap-2.5 font-semibold text-xl tracking-tight">
                <div className="size-8 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md">
                    <i className="fa-solid fa-rocket text-base"></i>
                </div>
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">URL Shortner</span>
                </Link>

                <div className="hidden md:flex items-center gap-10">

                <div className="flex items-center gap-3">
                    <Link to="/user/login"
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg transition">
                    Log in
                    </Link>
                    <Link to="/user/signup"
                    className="px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-md shadow-indigo-200/50 transition">
                    Sign up
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    <Link to="/dashboard"
                    className="px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-md hover:shadow-lg hover:brightness-105 transition">
                    Dashboard
                    </Link>
                    <button className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900">
                    <img src="https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png" className="size-8 rounded-full ring-1 ring-gray-200" alt="User"/>
                    <span className="font-medium hidden lg:inline">Kumol</span>
                    </button>
                </div>

                </div>

                <button className="md:hidden p-2 text-gray-600 hover:text-indigo-600 focus:outline-none">
                <i className="fa-solid fa-bars text-2xl"></i>
                </button>

            </div>
            </div>
        </header>
    )
}

export default Header;