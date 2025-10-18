import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Info() {

    const [details, setDetails] = useState([]);
    
    const getData = async () => {
        try {
            const response = await axios.get("http://localhost:8212/dummyInfo");
            setDetails(response.data);
        } catch (error) {
            console.log("Error fetching data:", error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const deleting = async (data) => {
        
            if (window.confirm('Are You Sure You Want To Delete This Item ?')) {
                await axios.delete(`http://localhost:8212/dummyInfo/${data}`)
                getData();
                // User clicked OK, proceed with deletion logic
            }
            else {
                // User clicked Cancel, do nothing or show a message
                console.log('Deletion cancelled.');
            }
         
    }
    return (
        <>
            <h1>Table Form</h1>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Course</th>
                        <th>Email</th>
                        <th>Contact</th>
                        <th>View Port</th>
                    </tr>
                </thead>
                <tbody>
                    {details.map((value, index) => (
                        <tr key={index}>
                            <td>{value.id}</td>
                            <td>{value.name}</td>
                            <td>{value.course}</td>
                            <td>{value.email}</td>
                            <td>{value.contact}</td>
                            <td>
                                <Link to={`/Read/${value.id}`}>
                                    <button className="bstyle1">Read</button>
                                </Link>
                                <Link to={`/Update/${value.id}`}>
                                    <button className="bstyle2">Update</button>
                                </Link>
                                <button className="bstyle3" onClick={() => {
                                    deleting(value.id)
                                }}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to={"/Form"}>
                <button className="bstyle4">
                    Add User Data
                </button>
            </Link>
        </>
    );
}

export default Info;