import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import StockXApi from "./StockXApi";
import AutoCompleteItem from './AutoCompleteItem';

function Search({search}) {
    const INITIAL_STATE = { query: "" };
    const INITIAL_AUTO_STATE = [];
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [autoData, setAutoData] = useState(INITIAL_AUTO_STATE);
    const history = useHistory();

    /** Send {name, quantity} to parent
     *    & clear form. */
  
    const handleSubmit = evt => {
      evt.preventDefault();      
    };
  
    /** Update local state w/curr state of input elem */
  
    async function handleChange(evt) {
      const { name, value } = evt.target;
      setFormData(fData => ({
        ...fData,
        [name]: value
      }));
      if(value) {
        const res = await StockXApi.search(value);
        setAutoData(res);
        console.log(res);
      } else {
        setAutoData(INITIAL_AUTO_STATE);
      }
    };
    
    function clearForm() {
      setAutoData(INITIAL_AUTO_STATE);
      setFormData(INITIAL_STATE);
    }

    const autoComplete = autoData.map(a => 
      <AutoCompleteItem 
        key={a.ticker}
        ticker={a.ticker} 
        name={a.name}
        assetType={a.assetType} 
        countryCode={a.countryCode}
        clearForm={clearForm}
      />
    );

    /** render form */
  
    return (
        <div className="Search mb-4">
            <form className="form-inline" onSubmit={handleSubmit}>
                <input className="form-control form-control-lg flex-grow-1" 
                    name="query" 
                    placeholder="Enter search term.." 
                    value={formData.search}
                    onChange={handleChange}
                />
            </form>
            <div className="autocomplete">
              { autoData ? autoComplete : ''}
            </div>
        </div>
    );
}

export default Search;