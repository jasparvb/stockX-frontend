import React, { useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import StockXApi from "./StockXApi";
import AutoCompleteItem from './AutoCompleteItem';
import './Search.css';
import debounce from 'lodash/debounce';
import { useClickOutside } from 'react-click-outside-hook';

//Search bar that appears in the top nav

function Search() {
    const INITIAL_STATE = {query: ""};
    const INITIAL_AUTO_STATE = [];
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [autoData, setAutoData] = useState(INITIAL_AUTO_STATE);
    const [selected, setSelected] = useState(1);
    const [ref, hasClickedOutside] = useClickOutside();
    const history = useHistory();
    //use debounce to limit API calls when typing fast
    const limitCalls = useCallback(debounce(setAutoComplete, 400), []);

    //reset state data and redirect to correct ticker page
    function handleSubmit(evt) {
      evt.preventDefault();
      if(autoData.length){
        setFormData(INITIAL_STATE);
        setAutoData(INITIAL_AUTO_STATE);
        history.push(`/${autoData[selected - 1].ticker}`)
        setSelected(1);  
      }
    };
  
    //Make API call to get search results and save in state
    async function setAutoComplete(value) {
      if(value) {
        const res = await StockXApi.search(value);
        setAutoData(res);
      } else {
        setAutoData(INITIAL_AUTO_STATE);
      }
    }

    //Set form value, make API call, and reset selected to first item
    function handleChange(evt) {
      const { value } = evt.target;
      setFormData({query: value});
      limitCalls(value);
      setSelected(1);
    };

    function onKeyDown(evt) {
      //when 'up arrow' is pressed
      if (evt.keyCode === 38) {
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

    /** render form */
  
    return (
        <div ref={ref} className="Search">
            <form className="form-inline" autoComplete="off" onSubmit={handleSubmit}>
              <input className="form-control form-control-lg flex-grow-1" 
                  name="query" 
                  placeholder="Search for stock or mutual fund" 
                  value={formData.query}
                  onChange={handleChange}
                  onKeyDown={onKeyDown}
              />
              {!hasClickedOutside &&
                <div onClick={handleSubmit} className={`autocomplete ${autoData.length ? "active" : ""}`}>
                  {autoData.map((a, i)=> 
                    <AutoCompleteItem 
                      key={a.ticker}
                      id={i}
                      ticker={a.ticker} 
                      name={a.name}
                      assetType={a.assetType} 
                      countryCode={a.countryCode}
                      selected={selected}
                      setSelected={setSelected}
                    />
                  )}
                </div>
              }
            </form>
        </div>
    );
}

export default Search;