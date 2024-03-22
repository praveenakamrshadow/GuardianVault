const Footer = () => {
    return (
        <div className="bg-slate-800 text-white flex flex-col justify-center items-center fixed bottom-0 w-full">
            <div className="logo font-bold text-2xl">
                <span className="text-green-700">&lt;</span>
                Password
                <span className="text-green-500">Manager /&gt;</span>
            </div>
            <div className="flex justify-center items-center pb-1">
                Created with{' '}
                <img className="mx-1 w-5" src="icons/heart.png" alt="" /> by
                Praveen Sahu
            </div>
        </div>
    );
};

export default Footer;
