import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Update() {
    const { id } = useParams();
    
    const navigate = useNavigate();

    const [getdetails, setgetDetails] = useState({
        id: "",
        name: "",
        course: "",
        email: "",
        contact: ""
    });

    // Fetch single user data
    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:8212/dummyInfo/${id}`);
            setgetDetails(response.data);
        } catch (error) {
            console.log("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Handle input changes
    const handleChange = (e) => {
        setgetDetails({ ...getdetails, [e.target.name]: e.target.value });
    };

    // Update data
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8212/dummyInfo/${id}`, getdetails);
            alert("Data updated successfully ✅");
            navigate("/"); // redirect to home after update
        } catch (error) {
            console.log("Error updating data:", error);
        }
    };

    return (
        <>
            <div className="form-container">
                <h2>Update Data</h2>
                <form onSubmit={handleSubmit}>
                    <label>Id</label>
                    <input
                        type="text"
                        name="id"
                        value={getdetails.id}
                        onChange={handleChange}
                        className="readonly-input"
                        readOnly
                    />

                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={getdetails.name}
                        onChange={handleChange}
                        required
                    />

                    <label>Course</label>
                    <input
                        type="text"
                        name="course"
                        value={getdetails.course}
                        onChange={handleChange}
                        required
                    />

                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={getdetails.email}
                        onChange={handleChange}
                        required
                    />

                    <label>Contact</label>
                    <input
                        type="text"
                        name="contact"
                        value={getdetails.contact}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit" className="submit-btn">
                        Update
                    </button>
                </form>
            </div>

            <Link to={"/"}>
                <button className="bstyle5">Back</button>
            </Link>
        </>
    );
}

export default Update;