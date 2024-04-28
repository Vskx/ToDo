import { Bookmark } from 'lucide-react';
import Link from 'next/link';
import 'animate.css';
import { Button } from "@/components/ui/button"




export default function Home() {
  return (
    <div>
      <nav className="flex justify-between items-center my-10 mx-20  text-white">
        <div className="flex items-center space-x-6">
          <Bookmark size={40} strokeWidth={1.90} className=" " />
          <h1 className="text-2xl">/</h1>
          <h1 className="text-xl">ToDo</h1>
        </div>
      </nav>
      <header className="items-center mt-64">
        <div className="text-center">
          <h1 className="animate__animated animate__fadeInLeftBig text-5xl font-bold my-20">
            ToDo
          </h1>
          <div className="">
            <Button className="animate__animated animate__fadeInRightBig">Start Planning</Button>
          </div>
          
        </div>
        
      </header>
      
    </div>
  );
}
