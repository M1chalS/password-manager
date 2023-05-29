import {useEffect, useState} from "react";
import passwd from "../api/passwd.js";
import {Container} from "react-bootstrap";
import PasswdTable from "./PasswdTable.jsx";

const SharesAdmin = () => {
    const [shares, setShares] = useState([]);

    const getShares = async () => {
        try {
            const response = await passwd.get("/shares-admin");
            setShares(response.data);
        } catch (e) {
            console.log(e);
        }
    }

    const handleDelete = async (id) => {
        try {
            await passwd.delete(`/shares/${id}`);
            await getShares();
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getShares();
    }, []);

    const sharesTableConfig = [
        {
            label: "ID",
            render: (data) => data.id,
        },
        {
            label: "Password ID",
            render: (data) => data.password.id,
        },
        {
            label: "Password name",
            render: (data) => data.password.name,
        },
        {
            label: "Receiver",
            render: (data) => data.user.email,
        },
        {
            label: "Shared by",
            render: (data) => data.shared_by.email,
        },
        {
            label: "Created at",
            render: (data) => `${new Date(data.created_at).toLocaleTimeString()} on ${new Date(data.created_at).toLocaleDateString()}`,
        },
        {
            label: "Updated at",
            render: (data) => `${new Date(data.updated_at).toLocaleTimeString()} on ${new Date(data.created_at).toLocaleDateString()}`,
        }
    ];

    const keyFn = (data) => data.id;

    return (<Container className="my-5 text-center">
            <PasswdTable data={shares} config={sharesTableConfig} keyFn={keyFn} onDelete={handleDelete} editOn={false}/>
        </Container>
    )
}

export default SharesAdmin;