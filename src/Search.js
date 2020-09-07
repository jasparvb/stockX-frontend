import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import StockXApi from "./StockXApi";
import AutoCompleteItem from './AutoCompleteItem';
import './Search.css';

function Search({search}) {
    const INITIAL_STATE = {query: ""};
    const INITIAL_AUTO_STATE = [];
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [autoData, setAutoData] = useState(INITIAL_AUTO_STATE);
    const [selected, setSelected] = useState(1);
    const history = useHistory();

    /** Send {name, quantity} to parent
     *    & clear form. */
  
    const handleSubmit = evt => {
      evt.preventDefault();
      if(autoData.length){
        setAutoData(data => INITIAL_AUTO_STATE);
        setFormData(data => INITIAL_STATE);
        setSelected(1);  
        history.push(`/details/${autoData[selected - 1].ticker}`)
      }
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
      setSelected(1);
    };

    function onKeyDown(evt) {
      if (evt.keyCode === 13) {
        if(selected){
          history.push()
        }
      }
      //when 'up arrow' is pressed
      else if (evt.keyCode === 38) {
        if (selected === 1) {
          setSelected(autoData.length);
        } else {
          setSelected(current => current - 1);
        }
      }
      //when 'down-arrow' is pressed 
      else if (evt.keyCode === 40) {
        if (selected === autoData.length) {
          setSelected(1);
        } else {
          setSelected(current => current + 1);
        }
      }
    }

    function clearForm() {
      setAutoData(INITIAL_AUTO_STATE);
      setFormData(INITIAL_STATE);
      setSelected(1);
    }

    const autoComplete = autoData.map((a, i)=> 
      <AutoCompleteItem 
        key={a.ticker}
        id={i}
        ticker={a.ticker} 
        name={a.name}
        assetType={a.assetType} 
        countryCode={a.countryCode}
        handleSubmit={handleSubmit}
        selected={selected}
        setSelected={setSelected}
      />
    );

    /** render form */
  
    return (
        <div className="Search mb-4">
            <form className="form-inline" autocomplete="off" onSubmit={handleSubmit}>
              <input className="form-control form-control-lg flex-grow-1" 
                  name="query" 
                  placeholder="Search for stock or mutual fund" 
                  value={formData.search}
                  onChange={handleChange}
                  onKeyDown={onKeyDown}
              />
              <div className={`autocomplete ${autoData.length ? "active" : ""}`}>
                { autoData ? autoComplete : ''}
              </div>
            </form>
        </div>
    );
}

export default Search;