import React from 'react'
import { ScanSearch } from 'lucide-react';
function Nochat() {
  return (
    <div>
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          
        </div>
        <div className="flex-grow p-4 overflow-y-auto">
          {/* Chat messages */}
          <div className="space-y-4">
            <div className="flex justify-center mt-50 ">
              <div className='rounded-lg mt-50'>
                <ScanSearch size={40}/>
              <h1>No chat selected yet</h1>
              </div>
            </div>
            
            
          </div>
        </div>
    </div>
  )
}
export default Nochat