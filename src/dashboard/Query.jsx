import react , {useState , useEffect} from 'react';

import axios from 'axios';

const Query = () =>{

    const [queryData, setQueryData] = useState([]);
    const [replyData, setReplyData] = useState({});
    const [showReply, setShowReply] = useState(false);
     const [replyMessage, setReplyMessage] = useState('');

  useEffect(() => {
    
    const apiUrl = 'http://localhost:8000/api/v1/admin/query';

    const fetchData = async () => {
      try {
        
        const response = await axios.get(apiUrl);

      
        setQueryData(response.data.query);
        console.log(response.data);
        console.log(queryData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

   
    fetchData();
  }, []); 

  const handleReplyClick = (requestId) => {
    
    const selectedRequest = queryData.find((request) => request._id === requestId);
    setReplyData(selectedRequest);

    
    setShowReply(true);
  };

  const handleSendReply = () => {
   
    console.log('Reply Data:', replyData);
    console.log('Reply Message:', replyMessage);

   
    setReplyMessage('');
    setShowReply(false);
  };



    return (
        <>

    <div className="flex justify-center">
      <div className="bg-gray-200 rounded-full px-2 mt-5 mb-4">
         <h1 className="font-bold text-4xl text-black">All Queries</h1>
      </div>
    </div>

    <div className=" mt-4">
       
       {queryData.map((request) => (
         <div key={request._id} className="mb-4 mx-auto py-4 px-2 max-w-md bg-gray-200 rounded-lg shadow-md transition-transform hover:scale-105">
             <div className="flex justify-center">
             <p className="text-black text-xl"><strong>Name :</strong> &nbsp;  </p> 
               <p className="text-black text-xl">{request.firstname} &nbsp;   {request.lastname}</p>
           
           </div>
           <div className="flex justify-center mt-3">
             <p className="text-black text-xl"><strong>Email :</strong> &nbsp;  </p> 
               <p className="text-black text-xl">{request.email}</p>
           
           </div>
           <div className="flex justify-center mt-3">
             <p className="text-black text-xl"><strong>Message :</strong> &nbsp;  </p> 
               <p className="text-black text-xl">{request.message}</p>
           
           </div>
          
           
          

            <div className="mt-3 flex justify-center">
            {showReply && replyData._id === request._id ? (
              // Render Reply Section
              <div className="mx-auto bg-gray-200 p-4 rounded-lg ">
                <textarea
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  className="w-64 h-16 border p-2 bg-gray-200 hover:border-blue-500 focus:border-blue-500"
                  placeholder="Type your reply here..."
                />
                <div className="flex justify-center mt-3">
                  <button
                    onClick={handleSendReply}
                    className="bg-green-500 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded"
                  >
                    Send Reply
                  </button>
                </div>
              </div>
            ) : (
              // Render Reply Button
              <button
                onClick={() => handleReplyClick(request._id)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded mr-2"
              >
                Reply
              </button>
            )}
          </div>
           
          
         </div>
       ))}
       
     </div>
 </>
    )

}

export default Query;
