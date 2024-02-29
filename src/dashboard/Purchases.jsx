import react, { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import BasicBars from './Chart';
import BasicLineChart from './LineCharts';
import { LineChart } from "recharts";

const Purchases = () => {
  const theme = useTheme();
  const [teachers, setTeachers] = useState([]);
  const [purchaseData , setPurchaseData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    
    const fetchPurchaseData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8000/api/v1/admin/getpurchases`
          );
        
        setPurchaseData(response.data.purchases);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchPurchaseData();
    
  }, [searchQuery]);
   // {purchase.courseId.title}

  return (
    <>
      <div className="flex justify-center">
        <h1 className="font-bold text-4xl text-white">Sales </h1>
      </div>

    <div className="display flex">
        <BasicBars />
        <BasicLineChart />
    </div>


    <div className="flex justify-center">
        <h1 className="font-bold text-4xl text-white">Transaction History </h1>
      </div>
      <TableContainer
        component={Paper}
        sx={{
          marginTop: theme.spacing(4),
          backgroundColor: "#1d2634",
          marginBottom: 5,
        }}
      >
        <Table sx={{ color: "white" }}>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ fontSize: "5xl", fontWeight: "bolder", color: "white" }}
              >
                Student Name
              </TableCell>
              <TableCell
                sx={{ fontSize: "3xl", fontWeight: "bolder", color: "white" }}
              >
                Course Name
              </TableCell>
              <TableCell
                sx={{ fontSize: "3xl", fontWeight: "bolder", color: "white" }}
              >
                Teacher Name
              </TableCell>
              <TableCell
                sx={{ fontSize: "3xl", fontWeight: "bolder", color: "white" }}
              >
                Date
              </TableCell>
            
            </TableRow>
          </TableHead>
          <TableBody>
            {purchaseData.map((purchase) => (
              <TableRow key={purchase._id}>
                
                <TableCell sx={{ color: "white" }}>
                 {purchase.userId.firstName} &nbsp; {purchase.userId.lastName}
                </TableCell>
                
                <TableCell sx={{ color: "white" }}> {purchase.courseId ? purchase.courseId.title : 'Learn Piano'}</TableCell>
                
                <TableCell sx={{ color: "white" }}>
                  {purchase.teachers[0].firstName} &nbsp; {purchase.teachers[0].lastName}
                </TableCell>
                
                
                <TableCell sx={{ color: "white" }}>
                {purchase.updatedAt.substring(0, 10)}
                </TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Purchases;
