import { useEffect } from "react";
import { useState } from "react";
import * as colors from '../colors.js';
import filtercontrast from '../filter54.png';
import filterlight from '../filter55.png';
import FilterPopup from "./FilterPopup.js";
import dateFilterUtil from '../functions/dateFilterUtil.js';
import searchQuery from "./searchQuery.js";
function Table(props){
    const [state,setState]=useState(
        {
            showFilterPopup:false,
            items:props.items,
            dateFilteredItems:props.items,
            searchFilteredItems:props.items,
            dataToDisplay:props.items,
            from:"",
            to:"",
            searchValue:""
        }
    );
    // useEffect(()=>{
        console.log(state.items,props.items);
        if(state.items!==props.items){
            console.log(true);
            setState(p=>({
                ...p,
                items:props.items,
                dateFilteredItems:props.items,
                searchFilteredItems:props.items,
                dataToDisplay:props.items,
                from:"",
            to:"",
            searchValue:""
            }))
        }
    // },[])
    // useEffect(()=>{
    //     setState(p=>(
    //         {
    //             ...p,
    //             dateFilteredItems:state.items,
    //             searchFilteredItems:state.items,
    //             dataToDisplay:props.items,
    //         }
    //     ))
    // })
    //callback for date filter popup
    function closeCallback(){
        setState(p=>({
            ...p,
            showFilterPopup:false
        }))
    }
    function clearDateFilter(){
        console.log("cleared");
        setState(p=>({
            ...p,
            showFilterPopup:false,
            from:"",
            to:""
        }))
    }
    //date changed
    function handleDateChange(e){
        const obj=e.target;
        console.log(obj.name,obj.value);
        setState(p=>({
            ...p,
            [obj.name]:obj.value
        }))
    }
    function handleFilter(){
        // console.log(from,to);
        setState(p=>({
            ...p,
            showFilterPopup:false,
            // from:from,
            // to:to
        }))
    }
    useEffect(()=>{
        const data=dateFilterUtil(state.from,state.to,state.items);
        console.log(data);
        setState(p=>({
            ...p,
            searchValue:"",
            dateFilteredItems:data,
            dataToDisplay:data,
            //change filter img logo
        }))
    },[state.from,state.to])
    // useEffect(()=>{
    //     console.log("searchquery");
        
    // },[state.searchValue])
    function handleChange(e){
        const obj=e.target;
        const data=searchQuery(obj.value,state.dateFilteredItems);
        console.log(data);
        setState(p=>({
            ...p,
            searchFilteredItems:data,
            dataToDisplay:data,
            searchValue:obj.value,
            //change filter img logo
        }))
        setState(p=>({
            ...p,
            
        }))
    }
    if(state.items!=undefined&&state.items!==null&&state.items!=[])
    return(
        <>{console.log(state.dataToDisplay,state.items)}
            <FilterPopup handleDateChange={handleDateChange} from={state.from} to={state.to} show={state.showFilterPopup} handleFilter={handleFilter} closeCallback={closeCallback} clearDateFilter={clearDateFilter}/>
            {DisplayTable(true,state.dataToDisplay)}
        </>
    );
    else return <>{DisplayTable(true,[])}</>


    function DisplayTable(searchBar,items){
        return(
            <>
             <div style={{
                    // margin:"auto",
                    width:"fit-content",
                    margin:"1rem auto",
                    borderSpacing:"0",
                    boxShadow:"2px 2px 10px 1px black",
                    padding:"20px",
                    background:colors.mid,
                    borderRadius:"10px",
                    color:"white",
                   
                }}>
                    {/* table1 */}
                <table style={{
                    width:"100%",
                    borderSpacing:"0",
                    background:colors.mid,
                    borderRadius:"10px",
                    color:"white",
                }}> 
                
                {searchBar&&
                    <tr style={{padding:"1rem"}}>
                        <td style={{padding:"1rem"}}     colSpan={8}>
                    <input 
                         type="text"
                         name="searchValue"
                         className="searchbar"
                         value={state.searchValue}
                         placeholder="Search..."

                         onChange={handleChange}
                         />
                    </td>
                    </tr>
                    }
                    {/* table2 */}
                    </table>
            <table style={{
                    borderSpacing:"0",
                      margin:"5px auto",
                    background:colors.mid,
                    color:"white",
                   overflowY:"auto",
                   maxHeight:"20rem",
                   display:"block",
                   textAlign:"center"
                }}> 
                    <tr>
                    <th className="th">
                            S.No.
                        </th>
                    <th className="th">
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                            }}>
                            <div style={{verticalAlign:"center",display:"inline-block"}}>
                            Date
                            </div>
                                <img className="btn-add" src={state.from!==""&& state.to!==""?filtercontrast:filterlight} width="20px" height="20px"
                                    onClick={()=>setState(p=>({...p,showFilterPopup:true}))}
                                    style={{margin:"5px 0px 5px 15px",padding:"2px",verticalAlign:"center",backgroundColor:"transparent"}}
                                />
                                </div>
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
                    {items.map((i,ind)=>{
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
                </div>
            </>
        );
    }
}
export default Table;