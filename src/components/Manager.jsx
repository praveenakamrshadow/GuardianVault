import { useEffect } from 'react';
import { useRef, useState } from 'react';

const Manager = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({ site: '', username: '', password: '' });
    const [passwordArray, setPasswordArray] = useState([]);
    const ref = useRef();

    useEffect(() => {
        let passwords = localStorage.getItem('passwords');
        if (passwords) {
            setPasswordArray(JSON.parse(passwords));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('passwords', JSON.stringify(passwordArray));
    }, [passwordArray]);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const savePassword = () => {
        setPasswordArray((prevPasswords) => {
            if (Array.isArray(prevPasswords)) {
                return [...prevPasswords, form];
            } else {
                return [form];
            }
        });
        setForm({ site: '', username: '', password: '' });
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const copyText = (text) => {
        navigator.clipboard.writeText(text);
    };
    return (
        <>
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
            </div>

            <div className="  mycontainer">
                <h1 className="text-4xl font-bold text-center ">
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
                        name="site"
                        id="site"
                        value={form.site}
                        onChange={handleChange}
                        placeholder="Enter Website URL"
                    />
                    <div className="flex w-full gap-8 justify-between">
                        <input
                            type="text"
                            className="rounded-full border border-green-500 w-full px-4 py-1"
                            name="username"
                            id="username"
                            value={form.username}
                            onChange={handleChange}
                            placeholder="Enter Username"
                        />
                        <div className="relative flex items-center">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className="rounded-full border border-green-500 w-full px-4 py-1"
                                name="password"
                                id="password"
                                value={form.password}
                                onChange={handleChange}
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

                    <button
                        onClick={savePassword}
                        className="gap-2 flex justify-center items-center bg-green-400 hover:bg-green-300 rounded-full w-fit px-6 py-2 border border-green-900"
                    >
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover"
                        ></lord-icon>
                        Add Password
                    </button>
                </div>
                <div className="passwords">
                    <h2 className="font-bold text-2xl py-4">Your Passwords</h2>
                    {passwordArray.length === 0 && (
                        <div>No Passwords to show</div>
                    )}
                    {passwordArray.length != 0 && (
                        <table className="table-auto w-full rounded-md overflow-hidden">
                            <thead className="bg-green-800 text-white">
                                <tr>
                                    <th className="py-2">Site</th>
                                    <th className="py-2">Username</th>
                                    <th className="py-2">Password</th>
                                </tr>
                            </thead>
                            <tbody className="bg-green-100">
                                {passwordArray.map((item, index) => (
                                    <tr key={index}>
                                        <td className="flex items-center justify-center text-center border border-white py-2">
                                            <div className="flex items-center justify-center">
                                                <a
                                                    href={item.site}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <span>{item.site}</span>
                                                </a>
                                                <div
                                                    className="lordiconcopy size-7 cursor-pointer"
                                                    onClick={copyText(
                                                        item.site
                                                    )}
                                                >
                                                    <lord-icon
                                                        style={{
                                                            width: '25px',
                                                            height: '25px',
                                                            paddingTop: '3px',
                                                            paddingLeft: '3px',
                                                        }}
                                                        src="https://cdn.lordicon.com/rbbnmpcf.json"
                                                        trigger="hover"
                                                    ></lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className=" text-center border border-white py-2">
                                            <div className="flex items-center justify-center">
                                                <span>{item.username}</span>
                                                <div
                                                    className="lordiconcopy size-7 cursor-pointer"
                                                    onClick={copyText(
                                                        item.username
                                                    )}
                                                >
                                                    <lord-icon
                                                        style={{
                                                            width: '25px',
                                                            height: '25px',
                                                            paddingTop: '3px',
                                                            paddingLeft: '3px',
                                                        }}
                                                        src="https://cdn.lordicon.com/rbbnmpcf.json"
                                                        trigger="hover"
                                                    ></lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="flex items-center justify-center text-center border border-white py-2">
                                            <div className="flex items-center justify-center">
                                                <span>{item.password}</span>
                                                <div
                                                    className="lordiconcopy size-7 cursor-pointer"
                                                    onClick={copyText(
                                                        item.password
                                                    )}
                                                >
                                                    <lord-icon
                                                        style={{
                                                            width: '25px',
                                                            height: '25px',
                                                            paddingTop: '3px',
                                                            paddingLeft: '3px',
                                                        }}
                                                        src="https://cdn.lordicon.com/rbbnmpcf.json"
                                                        trigger="hover"
                                                    ></lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </>
    );
};

export default Manager;
