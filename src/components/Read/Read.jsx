import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Read() {

    const { id } = useParams();

    const [getdetails, setgetDetails] = useState([]);

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

    return (
        <>
            <div className="form-container">
                <h2>Student Data</h2>
                <form >
                    <label>Id</label>
                    <input type="text" value={getdetails.id} />

                    <label>Name</label>
                    <input type="text" value={getdetails.name} />

                    <label>Course</label>
                    <input type="text" value={getdetails.course} />

                    <label>Email</label>
                    <input type="email" value={getdetails.email} />

                    <label>Contact</label>
                    <input type="text" value={getdetails.contact} />

                </form>
            </div>
            <Link to={"/"}>
                <button className="bstyle5">
                    Back
                </button>
            </Link>
        </>
    );
}

export default Read