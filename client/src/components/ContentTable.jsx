import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const columns = [
    { id: "city", label: "City", minWidth: 100 },
    { id: "temp", label: "Temperature", minWidth: 100 },
];

function createData(sr, city, temp) {
    return { sr, city, temp };
}

export const ContentTable = ({ data }) => {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        if (data && Object.keys(data).length > 0) {
            setRows(
                Object.entries(data).map(([city, temperature], index) =>
                    createData(index + 1, city, temperature)
                )
            );
        } else {
            setRows([]);
        }
    }, [data]);

    return (
        <>
            <div className="w-full sm:w-[80%] md:w-[60%]">
                <Paper sx={{ width: "100%", overflow: "hidden" }}>
                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            style={{
                                                minWidth: column.minWidth,
                                            }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={row.sr}
                                    >
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                align="left"
                                            >
                                                {row[column.id]}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </div>
        </>
    );
};
