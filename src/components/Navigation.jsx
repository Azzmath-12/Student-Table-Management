import { BrowserRouter, Route, Routes } from "react-router-dom";
import Info from "./Informations/Info";
import Form from "./Form/Form";
import Read from "./Read/Read"
import Update from "./Update/Update";

function Navigation() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Info />}></Route>
                    <Route path="/Form" element={<Form />}></Route>
                    <Route path="/Read/:id" element={<Read />} />
                    <Route path="/Update/:id" element={<Update/>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Navigation