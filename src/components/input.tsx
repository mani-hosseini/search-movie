function Input() {
    return (
        <section className="flex justify-center items-center mt-10">
            <div className="w-full  flex bg-white shadow-lg rounded-lg overflow-hidden">
                <input
                    type="text"
                    placeholder="enter movie tittle..."
                    className="w-full px-4 py-5 focus:outline-none"
                />
                <button className="bg-red-600 text-white px-8 py-2 cursor-pointer">
                    Search
                </button>
            </div>
        </section>
    );
}

export default Input;
