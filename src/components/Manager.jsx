import { useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({ site: '', username: '', password: '' });
    const [passwordArray, setPasswordArray] = useState([]);
    const ref = useRef();

    useEffect(() => {
        const passwords = localStorage.getItem('passwords');
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
        if (!form.site || !form.username || !form.password) {
            showErrorToast('Please fill in all fields.');
            return;
        }

        const newPassword = { ...form, id: uuidv4() };
        setPasswordArray((prevPasswords) => [...prevPasswords, newPassword]);
        setForm({ site: '', username: '', password: '' });
        showSuccessToast('Password saved successfully!');
    };

    const deletePassword = (id) => {
        const confirmDelete = window.confirm(
            'Are you sure you want to delete this password?'
        );
        if (confirmDelete) {
            setPasswordArray((prevPasswords) =>
                prevPasswords.filter((p) => p.id !== id)
            );
            showSuccessToast('Password Deleted!');
        }
    };

    const editPassword = (id) => {
        const passwordToEdit = passwordArray.find((p) => p.id === id);
        setForm(passwordToEdit);
        setPasswordArray((prevPasswords) =>
            prevPasswords.filter((p) => p.id !== id)
        );
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const copyText = (text) => {
        navigator.clipboard.writeText(text);
        showSuccessToast('Copied to clipboard!');
    };

    const showErrorToast = (message) => {
        toast.error(message, getToastConfig());
    };

    const showSuccessToast = (message) => {
        toast.success(message, getToastConfig());
    };

    const getToastConfig = () => ({
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
    });

    return (
        <>
            <ToastContainer {...getToastConfig()} />
            <div className="p-3 md:p-0 md:mycontainer min-h-[84vh] md:min-h-[84vh]">
                <h1 className="text-4xl font-bold text-center ">
                    <span className="text-green-500">&lt;</span>
                    Guardian
                    <span className="text-green-500">Vault /&gt;</span>
                </h1>
                <p className="text-green-900 text-lg text-center">
                    Safeguarding Your Digital Keys
                </p>
                <div className="flex flex-col p-4 text-black gap-8 items-center">
                    <input
                        className="rounded-full border border-green-500 w-full px-4 py-1"
                        type="text"
                        name="site"
                        value={form.site}
                        onChange={handleChange}
                        placeholder="Enter Website URL"
                    />
                    <div className="flex w-full gap-8 justify-between">
                        <input
                            type="text"
                            className="rounded-full border border-green-500 w-full px-4 py-1"
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                            placeholder="Enter Username"
                        />
                        <div className="relative flex items-center">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className="rounded-full border border-green-500 w-full px-4 py-1"
                                name="password"
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
                        Save Password
                    </button>
                </div>
                <div className="passwords">
                    <h2 className="font-bold text-2xl py-4 flex justify-center">
                        Your Passwords
                    </h2>
                    {passwordArray.length === 0 && (
                        <div>No Passwords to show</div>
                    )}
                    {passwordArray.length !== 0 && (
                        <table className="table-auto w-[99%] mx-auto rounded-md overflow-hidden mb-10">
                            <thead className="bg-green-800 text-white">
                                <tr>
                                    <th className="py-2">Site</th>
                                    <th className="py-2">Username</th>
                                    <th className="py-2">Password</th>
                                    <th className="py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-green-100">
                                {passwordArray.map((item, index) => (
                                    <tr key={index}>
                                        <td className=" text-center border border-white py-2">
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
                                                    onClick={() =>
                                                        copyText(item.site)
                                                    }
                                                >
                                                    <lord-icon
                                                        style={{
                                                            width: '25px',
                                                            height: '25px',
                                                            paddingTop: '3px',
                                                            paddingLeft: '3px',
                                                        }}
                                                        src="https://cdn.lordicon.com/wzwygmng.json"
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
                                                    onClick={() =>
                                                        copyText(item.username)
                                                    }
                                                >
                                                    <lord-icon
                                                        style={{
                                                            width: '25px',
                                                            height: '25px',
                                                            paddingTop: '3px',
                                                            paddingLeft: '3px',
                                                        }}
                                                        src="https://cdn.lordicon.com/wzwygmng.json"
                                                        trigger="hover"
                                                    ></lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className=" text-center border border-white py-2">
                                            <div className="flex items-center justify-center">
                                                <span>{item.password}</span>
                                                <div
                                                    className="lordiconcopy size-7 cursor-pointer"
                                                    onClick={() =>
                                                        copyText(item.password)
                                                    }
                                                >
                                                    <lord-icon
                                                        style={{
                                                            width: '25px',
                                                            height: '25px',
                                                            paddingTop: '3px',
                                                            paddingLeft: '3px',
                                                        }}
                                                        src="https://cdn.lordicon.com/wzwygmng.json"
                                                        trigger="hover"
                                                    ></lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className=" text-center border border-white py-2">
                                            <span
                                                className="cursor-pointer mx-1"
                                                onClick={() =>
                                                    editPassword(item.id)
                                                }
                                            >
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/wuvorxbv.json"
                                                    trigger="hover"
                                                    style={{
                                                        width: '25px',
                                                        height: '25px',
                                                    }}
                                                ></lord-icon>
                                            </span>
                                            <span
                                                className="cursor-pointer mx-1"
                                                onClick={() =>
                                                    deletePassword(item.id)
                                                }
                                            >
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/drxwpfop.json"
                                                    trigger="hover"
                                                    style={{
                                                        width: '25px',
                                                        height: '25px',
                                                    }}
                                                ></lord-icon>
                                            </span>
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
