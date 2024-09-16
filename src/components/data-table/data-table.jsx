import React from "react";
import { Table } from "react-bootstrap";


const DataTable = ({data}) => {
    return (
        <Table striped bordered hover>
            <thead className="table-light">
                <tr>
                <th>ID</th>
                <th>UUID</th>
                <th>Name</th>
                <th>Address</th>
                <th>Phone</th>
                </tr>
            </thead>
            <tbody className="table-group-divider">
                {data.map((item) => (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.uuid}</td>
                    <td>{item.name}</td>
                    <td>{item.address}</td>
                    <td>{item.phone}</td>
                </tr>
                ))}
            </tbody>
        </Table>
    )
}

export default DataTable;