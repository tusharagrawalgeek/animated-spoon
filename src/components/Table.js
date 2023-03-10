import { useState } from "react";
import * as colors from '../colors.js';
function Table(props){
    return(
        <>
            <table style={{
                    margin:"auto",
                    width:"70%",
                    borderSpacing:"0",
                    boxShadow:"2px 2px 10px 1px black",
                    padding:"20px",
                    background:colors.mid,
                    borderRadius:"10px",
                    color:"white"
                }}> {props.searchBar&&
                    <tr>
                        <td colSpan={8}>
                    <input 
                         type="text"
                         name="searchValue"
                         className="searchbar"
                         value={props.searchValue}
                         placeholder="Search..."

                         onChange={(e)=>props.handleChange(e)}
                         />
                    </td>
                    </tr>
                    }
                    <tr>
                    <th className="th">
                            S.No.
                        </th>
                    <th className="th">
                            Date
                        </th>
                        <th className="th">
                            Particular
                        </th>
                        <th className="th">
                            Received From
                        </th>
                        <th className="th">
                            Quantity
                        </th>
                        <th className="th">
                            Received By
                        </th>
                        <th className="th">
                            Expiry Date
                        </th>
                        <th className="th">
                            Remarks
                        </th>
                    </tr>
                    {props.items.map((i,ind)=>{
                        return(
                                <tr>
                                <td className="td-1">
                                {ind+1}
                               </td>
                                <td className="td-1">
                                {i.date}
                               </td>
                               <td className="td-1">
                                {i.name.charAt(0).toUpperCase() + i.name.slice(1)}
                               </td>
                               <td className="td-1">
                                {i.receivedFrom}
                               </td>
                               <td className="td-1">
                                {i.quantity}
                               </td>
                               <td className="td-1">
                                {i.receivedBy}
                               </td>
                               <td className="td-1">
                                {i.expiry}
                               </td>
                               <td className="td-1">
                                {i.description}
                               </td>
                            </tr>
                        );
                    })}
                </table>
        </>
    );
}
export default Table;