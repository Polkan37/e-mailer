import React, { useState }  from 'react'
import { languages } from '../../constants/languages'
import { showTools } from '../../utils/showTools';
import toolsIcon from '../../assets/tools.png'

import './tools.css'

export function Tools(props) {
    const selectedLangs = [];
    const [langs, setLangs] = useState(localStorage.getItem('selectedLangs')?.split(','));
    const [checkedState, setCheckedState] = useState(setCheckers());
    
    function setCheckers() {
      let array = new Array(languages.length).fill(false)
  
      if (langs?.length) {
        langs.forEach((el, index) => {
          array[languages.findIndex(lang => lang === el)] = true
        })
      }
      return array
    }
  
    const setActiveLangs = () => {
      localStorage.setItem('selectedLangs', langs);
      showTools();
    }
  
    const handleOnChange = (position) => {
      const updatedCheckersState = checkedState.map((item, index) =>
        index === position ? !item : item
      );
      
      setCheckedState(updatedCheckersState);
      updatedCheckersState.forEach((el, index) => el ? selectedLangs.push(languages[index]) : '')
      setLangs(selectedLangs)
    };
    

    return (
        <div className="tools__modal">
        <button onClick={() => showTools()}>
          <img className="tools__modal-icon" src={toolsIcon} width={30} alt='' />
        </button>
        <div className="tools__container">
          <p className="tools__container-header">Select languages for template previews</p>
          <div className="tools__container-table">
            {languages.map((lang, index) => {
              return (
                <div key={index} className="tools__checkbox">
                  <input type="checkbox" name={lang} value={lang} checked={checkedState[index]} onChange={() => handleOnChange(index)} />
                  <label htmlFor={lang}>{lang}</label>
                </div>
              )
            })}
          </div>
          <button onClick={() => setActiveLangs()} className="tools__button-save button-save">Save</button>
        </div>
      </div>
    )
}
