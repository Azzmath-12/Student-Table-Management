import { useRef, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Form() {
    const navigate = useNavigate();

    const [nextId, setNextId] = useState("");
    const [isFirstEntry, setIsFirstEntry] = useState(false);

    const idRef = useRef();
    const nameRef = useRef();
    const courseRef = useRef();
    const emailRef = useRef();
    const contactRef = useRef();

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:8212/dummyInfo");
            const data = response.data;

            if (data.length === 0) {
                setIsFirstEntry(true);
            }
            else {
                const lastId = data[data.length - 1].id;
                const newId = (parseInt(lastId, 10) + 1).toString().padStart(2, "0");
                setNextId(newId);
                setIsFirstEntry(false);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const idValue = isFirstEntry ? idRef.current.value : nextId;

            const formData = {
                id: idValue,
                name: nameRef.current.value,
                course: courseRef.current.value,
                email: emailRef.current.value,
                contact: contactRef.current.value
            };

            await axios.post("http://localhost:8212/dummyInfo", formData);
            alert(`Data Added Successfully ✅ (ID: ${idValue})`);
            navigate("/");
        } catch (error) {
            console.error("Error adding data:", error);
        }
    };

    return (
        <>
            <div className="form-container">
                <h2>Add New Data</h2>
                <form onSubmit={handleSubmit}>
                    <label>ID</label>
                    {isFirstEntry ? (
                        <input
                            type="text"
                            name="id"
                            ref={idRef}
                            placeholder="Enter first ID"
                            required
                        />
                    ) : (
                        <input
                            type="text"
                            name="id"
                            value={nextId}
                            readOnly
                            className="readonly-input"
                        />
                    )}

                    <label>Name</label>
                    <input type="text" name="name" ref={nameRef} required />

                    <label>Course</label>
                    <input type="text" name="course" ref={courseRef} required />

                    <label>Email</label>
                    <input type="email" name="email" ref={emailRef} required />

                    <label>Contact</label>
                    <input type="text" name="contact" ref={contactRef} required />

                    <button type="submit" className="submit-btn">Submit</button>
                </form>
            </div>

            <Link to={"/"}>
                <button className="bstyle5">Back</button>
            </Link>
        </>
    );
}

export default Form;