import './App.css';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import Input from "./components/input.tsx";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <section className="w-[80%] m-auto py-9">
                <div className="flex flex-col items-center justify-center">
                    <h4 className="text-gray-800 text-md">Movie Search Engine</h4>
                    <div className="flex flex-col items-center justify-center mt-24 gap-y-3">
                        <h1 className="text-3xl text-black font-bold">Movie Search</h1>
                        <h3 className="text-gray-800 text-md">Search for your favorite movies and rate them</h3>
                    </div>
                </div>
                <Input/>
                <h4 className="text-gray-800 text-md flex items-center justify-center mt-24">Powered by OMDb API</h4>

            </section>
        </QueryClientProvider>
    );
}

export default App;
