import { useRef, useState } from 'react';

const Manager = () => {
    const [showPassword, setShowPassword] = useState(false);
    const ref = useRef();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
            </div>

            <div className="  mycontainer">
                <h1 className="text-4xl font-bold text-center">
                    <span className="text-green-500">&lt;</span>
                    Password
                    <span className="text-green-500">Manager /&gt;</span>
                </h1>
                <p className="text-green-900 text-lg text-center">
                    Your own Password Manager
                </p>
                <div className=" flex flex-col p-4 text-black gap-8 items-center">
                    <input
                        className="rounded-full border border-green-500 w-full px-4 py-1"
                        type="text"
                        name=""
                        id=""
                        placeholder="Enter Website URL"
                    />
                    <div className="flex w-full gap-8 justify-between">
                        <input
                            type="text"
                            className="rounded-full border border-green-500 w-full px-4 py-1"
                            name=""
                            id=""
                            placeholder="Enter Username"
                        />
                        <div className="relative flex items-center">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className="rounded-full border border-green-500 w-full px-4 py-1"
                                name=""
                                id=""
                                placeholder="Enter Password"
                                ref={ref}
                            />
                            <span
                                className="absolute right-[3px] top-[3px] cursor-pointer"
                                onClick={togglePasswordVisibility}
                            >
                                <img
                                    className="p-1"
                                    width={36}
                                    src={
                                        showPassword
                                            ? 'icons/eyeCross.png'
                                            : 'icons/eye.png'
                                    }
                                    alt=""
                                />
                            </span>
                        </div>
                    </div>

                    <button className="gap-2 flex justify-center items-center bg-green-400 hover:bg-green-300 rounded-full w-fit px-6 py-2 border border-green-900">
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover"
                        ></lord-icon>
                        Add Password
                    </button>
                </div>
            </div>
        </>
    );
};

export default Manager;
