import { LocateIcon, Mail, MapPin } from "lucide-react"

const Footer = () => {
    return (
        <footer className="block bg-blue-100">
            {/* Container */}
            <div className="py-16 pt-8 pb-2 mx-auto w-full max-w-7xl px-5 md:px-10">
                {/* Component */}
                <div className="sm:flex-row flex justify-between flex-col">
                    <h2 className="font-bold text-3xl md:text-3xl text-blue-500 w-full max-w-xl">
                        Securely manage all your social events
                    </h2>
                    <div className="mt-8 md:mt-0 text-gray-500">
                        <div className="mb-4 flex max-w-72 items-center justify-start gap-2">
                            <MapPin className="w-5 h-5" />
                            <p className="text-sm sm:text-base">
                                Mirpur, Dhaka, Bangladesh
                            </p>
                        </div>
                        <div className="mb-4 flex max-w-72 items-center justify-start gap-2">
                            <Mail className="w-5 h-5" />
                            <p className=" text-sm sm:text-base">
                                support@flowspark.co
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mt-4 mb-4 w-full border-b border-black"></div>
                <div className="md:flex-row flex justify-between sm:items-center sm:flex-col items-start flex-col-reverse">
                    <div className="font-semibold mb-4 sm:mb-0 py-1 text-center sm:text-center">
                        <a
                            href="#"
                            className="inline-block font-normal text-gray-500 transition hover:text-blue-600 sm:pr-6 lg:pr-12 py-1.5 sm:py-2 pr-6"
                        >
                            About
                        </a>
                        <a
                            href="#"
                            className="inline-block font-normal text-gray-500 transition hover:text-blue-600 sm:pr-6 lg:pr-12 py-1.5 sm:py-2 pr-6"
                        >
                            Features
                        </a>
                        <a
                            href="#"
                            className="inline-block font-normal text-gray-500 transition hover:text-blue-600 sm:pr-6 lg:pr-12 py-1.5 sm:py-2 pr-6"
                        >
                            Works
                        </a>
                        <a
                            href="#"
                            className="inline-block font-normal text-gray-500 transition hover:text-blue-600 sm:pr-6 lg:pr-12 py-1.5 sm:py-2 pr-6"
                        >
                            Support
                        </a>
                        <a
                            href="#"
                            className="inline-block font-normal text-gray-500 transition hover:text-blue-600 sm:pr-6 lg:pr-12 py-1.5 sm:py-2 pr-6"
                        >
                            Help
                        </a>
                    </div>
                    <p className="text-gray-500 text-sm sm:text-base">
                        © Copyright 2021. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer