import { useEffect, useState } from "react"; 
import axios from "axios"; 
 
export default function FeedbackList() { 
  const [feedbacks, setFeedbacks] = useState([]); 
 
  const loadData = async () => { 
    const res = await axios.get("http://localhost:3001/feedback"); 
    setFeedbacks(res.data); 
  }; 
 
  useEffect(() => { 
    loadData(); 
  }, []); 
 
  const deleteFeedback = async (id) => { 
    await axios.delete(`http://localhost:3001/feedback/${id}`); 
    loadData(); 
  }; 
 
  return ( 
    <div className="container mt-5"> 
      <h2 className="mb-4">User Feedback</h2> 
 
      <div className="card shadow-sm p-3"> 
        <table className="table table-bordered table-striped"> 
          <thead className="table-dark"> 
            <tr> 
              <th style={{ width: "10%" }}>#</th> 
              <th style={{ width: "20%" }}>Name</th> 
              <th style={{ width: "50%" }}>Feedback</th> 
              <th style={{ width: "20%" }}>Actions</th> 
            </tr> 
          </thead> 
          <tbody> 
            {feedbacks.map((f, index) => ( 
              <tr key={f.id}> 
                <td>{index + 1}</td> 
                <td>{f.username}</td> 
                <td>{f.message}</td> 
                <td> 
                  <button 
                    className="btn btn-danger btn-sm" 
                    onClick={() => deleteFeedback(f.id)} 
                  > 
                    Delete 
                  </button> 
                </td> 
              </tr> 
            ))} 
 
            {feedbacks.length === 0 && ( 
              <tr> 
                <td colSpan="4" className="text-center text-muted"> 
                  No feedback found. 
                </td> 
              </tr> 
            )} 
          </tbody> 
        </table> 
      </div> 
    </div> 
  ); 
} 