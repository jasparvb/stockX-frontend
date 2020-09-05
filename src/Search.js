import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import StockXApi from "./StockXApi";

function Search({search}) {
    const INITIAL_STATE = { search: "" };
    const [formData, setFormData] = useState(INITIAL_STATE);
    const history = useHistory();

    /** Send {name, quantity} to parent
     *    & clear form. */
  
    const handleSubmit = evt => {
      evt.preventDefault();
      StockXApi.search({...formData});
      history.push("/search");
    };
  
    /** Update local state w/curr state of input elem */
  
    const handleChange = evt => {
      const { name, value } = evt.target;
      setFormData(fData => ({
        ...fData,
        [name]: value
      }));
    };
  
    /** render form */
  
    return (
        <div className="Search mb-4">
            <form className="form-inline" onSubmit={handleSubmit}>
                <input className="form-control form-control-lg flex-grow-1" 
                    name="search" 
                    placeholder="Enter search term.." 
                    value={formData.search}
                    onChange={handleChange}
                />
            </form>
        </div>
    );
}

export default Search;